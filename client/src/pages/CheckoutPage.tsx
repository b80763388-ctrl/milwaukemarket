import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/lib/i18n";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { insertOrderSchema, type CartItemWithProduct } from "@shared/schema";
import { CheckCircle2, Clock, Package, Truck, CreditCard, Building2, ArrowRightLeft } from "lucide-react";
import { z } from "zod";
import inpostLogo from "@assets/image_1761430943388.png";
import dpdLogo from "@assets/image_1761430962953.png";
import dhlLogo from "@assets/image_1761430977890.png";
import blikLogo from "@assets/image_1761428175926.png";
import visaLogo from "@assets/image_1761428208056.png";
import mastercardLogo from "@assets/image_1761428253613.png";
import googlePayLogo from "@assets/image_1761521226301.png";
import applePayLogo from "@assets/image_1761521274408.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Frontend form schema (without orderItems and totalAmount which are added in onSubmit)
const frontendOrderSchema = insertOrderSchema.omit({
  orderItems: true,
  totalAmount: true,
}).extend({
  companyName: z.string().optional(),
  nip: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof frontendOrderSchema>;

function getSessionId(): string {
  const STORAGE_KEY = "milwaukee-session-id";
  return localStorage.getItem(STORAGE_KEY) || "";
}

export function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { language, currency, formatPriceSync, t } = useLanguage();
  const [sessionId, setSessionId] = useState<string>("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customerType, setCustomerType] = useState<"individual" | "company">("individual");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "transfer">("online");
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [orderId, setOrderId] = useState<string>("");
  
  // Create schema with localized error messages
  const checkoutFormSchema = frontendOrderSchema.extend({
    firstName: z.string().min(2, translate("checkout.validation.minLength", language)),
    lastName: z.string().min(2, translate("checkout.validation.minLength", language)),
    email: z.string().email(translate("checkout.validation.emailInvalid", language)),
    phone: z.string().min(9, translate("checkout.validation.phoneMin", language)),
    address: z.string().min(5, translate("checkout.validation.minLength", language)),
    city: z.string().min(2, translate("checkout.validation.minLength", language)),
    postalCode: z.string().regex(/^\d{2}-\d{3}$/, translate("checkout.validation.postalCodeFormat", language)),
    courier: z.enum(["inpost", "dpd", "dhl"], {
      errorMap: () => ({ message: translate("checkout.validation.courierRequired", language) }),
    }),
    companyName: customerType === "company" 
      ? z.string().min(2, "Nazwa firmy jest wymagana")
      : z.string().optional(),
    nip: customerType === "company"
      ? z.string().regex(/^\d{10}$/, "NIP musi zawierać 10 cyfr")
      : z.string().optional(),
  });

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  const { data: cartItems = [] } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart", sessionId],
    queryFn: async () => {
      if (!sessionId) return [];
      const response = await fetch(`/api/cart?sessionId=${sessionId}`);
      if (!response.ok) throw new Error("Failed to fetch cart");
      return response.json();
    },
    enabled: !!sessionId,
  });

  // Large items that cannot be shipped via InPost paczkomaty
  const hasLargeItems = cartItems.some(
    (item) => 
      item.product.category === "wozki" || 
      item.product.category === "zestawy" || 
      item.product.category === "zestawy-specjalistyczne"
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.exhibitionPrice) * item.quantity,
    0
  );

  const FREE_SHIPPING_THRESHOLD = 500;
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 29.99;
  const total = subtotal + shippingCost;
  
  // High value orders require bank transfer
  const requiresTransfer = total > 10000;

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      courier: hasLargeItems ? "dpd" : undefined,
      companyName: "",
      nip: "",
    },
  });

  const selectedCourier = form.watch("courier");

  useEffect(() => {
    if (hasLargeItems && selectedCourier === "inpost") {
      form.setValue("courier", "dpd");
    }
  }, [hasLargeItems, selectedCourier, form]);

  // Force transfer payment for high value orders
  useEffect(() => {
    if (requiresTransfer && paymentMethod === "online") {
      setPaymentMethod("transfer");
    }
  }, [requiresTransfer, paymentMethod]);

  const createOrderMutation = useMutation({
    mutationFn: async (data: CheckoutFormData) => {
      const orderItems = cartItems.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.exhibitionPrice,
      }));

      return apiRequest("POST", "/api/orders", {
        ...data,
        orderItems,
        totalAmount: total.toFixed(2),
        language,
        currency,
      });
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
      
      if (paymentMethod === "transfer") {
        // Generate order ID (simplified - in production would come from backend)
        const newOrderId = `ZAM/${new Date().getFullYear()}/${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
        setOrderId(newOrderId);
        setTransferModalOpen(true);
      } else {
        setOrderSuccess(true);
      }
      
      window.scrollTo(0, 0);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: translate("error.title", language),
        description: translate("error.createOrder", language),
      });
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    if (cartItems.length === 0) {
      toast({
        variant: "destructive",
        title: translate("error.title", language),
        description: "Koszyk jest pusty",
      });
      return;
    }
    createOrderMutation.mutate(data);
  };

  if (orderSuccess) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-16">
        <Card className="text-center">
          <CardContent className="pt-12 pb-12 space-y-6">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-6">
                <CheckCircle2 className="h-16 w-16 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold font-heading">
                {translate("checkout.thankYou", language)}
              </h1>
              <p className="text-lg text-muted-foreground">
                {translate("checkout.success", language)}
              </p>
              <p className="text-sm text-muted-foreground">
                {translate("checkout.orderConfirmation", language)}
              </p>
            </div>
            <div className="pt-4">
              <Button
                onClick={() => setLocation("/")}
                size="lg"
                data-testid="button-back-to-shop"
              >
                {translate("checkout.backToShop", language)}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-16 text-center">
        <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-bold mb-2">Koszyk jest pusty</h2>
        <p className="text-muted-foreground mb-6">
          Dodaj produkty do koszyka aby kontynuować
        </p>
        <Button onClick={() => setLocation("/")} data-testid="button-go-shopping">
          Wróć do sklepu
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-4 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold font-heading mb-4 md:mb-8" data-testid="heading-checkout">
        {translate("checkout.title", language)}
      </h1>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                {translate("checkout.shippingDetails", language)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  {/* Customer Type Toggle */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold">Typ klienta</label>
                    <RadioGroup 
                      value={customerType} 
                      onValueChange={(value) => setCustomerType(value as "individual" | "company")}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer ${customerType === "individual" ? "border-primary bg-primary/5" : "border-border"}`}>
                        <RadioGroupItem value="individual" id="individual" data-testid="radio-individual" />
                        <label htmlFor="individual" className="font-medium cursor-pointer flex-1">
                          {t('checkout.customerTypeIndividual')}
                        </label>
                      </div>
                      <div className={`flex items-center space-x-2 border rounded-lg p-3 cursor-pointer ${customerType === "company" ? "border-primary bg-primary/5" : "border-border"}`}>
                        <RadioGroupItem value="company" id="company" data-testid="radio-company" />
                        <label htmlFor="company" className="font-medium cursor-pointer flex-1">
                          {t('checkout.customerTypeCompany')}
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Company Fields (conditional) */}
                  {customerType === "company" && (
                    <>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nazwa firmy</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Nazwa Sp. z o.o."
                                  {...field}
                                  data-testid="input-companyName"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="nip"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>NIP</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="1234567890"
                                  maxLength={10}
                                  {...field}
                                  data-testid="input-nip"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* VAT Invoice Info */}
                      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="font-semibold text-sm text-blue-900 dark:text-blue-100">
                            Faktura VAT
                          </p>
                          <p className="text-sm text-blue-700 dark:text-blue-300">
                            Faktura VAT zostanie dołączona do przesyłki z towarem
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator className="my-4" />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{translate("checkout.firstName", language)}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Jan"
                              {...field}
                              data-testid="input-firstName"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{translate("checkout.lastName", language)}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Kowalski"
                              {...field}
                              data-testid="input-lastName"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{translate("checkout.email", language)}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="jan.kowalski@example.com"
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{translate("checkout.phone", language)}</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="123456789"
                              {...field}
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{translate("checkout.address", language)}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ul. Przykładowa 123/45"
                            {...field}
                            data-testid="input-address"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{translate("checkout.city", language)}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Warszawa"
                              {...field}
                              data-testid="input-city"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{translate("checkout.postalCode", language)}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="00-000"
                              {...field}
                              data-testid="input-postalCode"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator className="my-4" />

                  <FormField
                    control={form.control}
                    name="courier"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-base font-semibold">
                          {translate("checkout.courier", language)}
                        </FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            value={field.value}
                            className="space-y-2"
                          >
                            <div
                              className={`flex items-center space-x-3 border rounded-lg p-3 hover-elevate ${
                                hasLargeItems ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                            >
                              <RadioGroupItem
                                value="inpost"
                                id="inpost"
                                disabled={hasLargeItems}
                                data-testid="radio-inpost"
                              />
                              <label
                                htmlFor="inpost"
                                className="flex items-center gap-3 flex-1 cursor-pointer"
                              >
                                <img
                                  src={inpostLogo}
                                  alt="InPost"
                                  className="h-8 w-auto object-contain"
                                />
                                <div className="flex-1">
                                  <p className="font-medium">
                                    {translate("checkout.courierInpost", language)}
                                  </p>
                                  {hasLargeItems && (
                                    <p className="text-xs text-muted-foreground">
                                      {translate("checkout.courierNotAvailable", language)}
                                    </p>
                                  )}
                                </div>
                              </label>
                            </div>

                            <div className="flex items-center space-x-3 border rounded-lg p-3 hover-elevate">
                              <RadioGroupItem
                                value="dpd"
                                id="dpd"
                                data-testid="radio-dpd"
                              />
                              <label
                                htmlFor="dpd"
                                className="flex items-center gap-3 flex-1 cursor-pointer"
                              >
                                <img
                                  src={dpdLogo}
                                  alt="DPD"
                                  className="h-8 w-auto object-contain"
                                />
                                <p className="font-medium">
                                  {translate("checkout.courierDpd", language)}
                                </p>
                              </label>
                            </div>

                            <div className="flex items-center space-x-3 border rounded-lg p-3 hover-elevate">
                              <RadioGroupItem
                                value="dhl"
                                id="dhl"
                                data-testid="radio-dhl"
                              />
                              <label
                                htmlFor="dhl"
                                className="flex items-center gap-3 flex-1 cursor-pointer"
                              >
                                <img
                                  src={dhlLogo}
                                  alt="DHL"
                                  className="h-8 w-auto object-contain"
                                />
                                <p className="font-medium">
                                  {translate("checkout.courierDhl", language)}
                                </p>
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Fulfillment time info */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">
                        {translate("checkout.fulfillmentTime", language)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {translate("checkout.fulfillmentInfo", language)}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Payment Method */}
                  <div className="space-y-3">
                    <label className="text-base font-semibold">{t('checkout.paymentMethod')}</label>
                    
                    {requiresTransfer && (
                      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex items-start gap-3 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <p className="font-semibold text-sm text-amber-900 dark:text-amber-100">
                            Wymagany przelew tradycyjny
                          </p>
                          <p className="text-sm text-amber-700 dark:text-amber-300">
                            Przy wartości zamówienia powyżej 10 000 zł obsługujemy wyłącznie płatności przelewem bankowym
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <RadioGroup 
                      value={paymentMethod} 
                      onValueChange={(value) => setPaymentMethod(value as "online" | "transfer")}
                      className="space-y-3"
                    >
                      {/* Online Payment */}
                      <div className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer transition-all ${
                        paymentMethod === "online" ? "border-primary bg-primary/5" : "border-border"
                      } ${requiresTransfer ? "opacity-50 cursor-not-allowed" : "hover-elevate"}`}>
                        <RadioGroupItem 
                          value="online" 
                          id="payment-online" 
                          disabled={requiresTransfer}
                          className="mt-1"
                          data-testid="radio-payment-online" 
                        />
                        <label htmlFor="payment-online" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="h-5 w-5 text-primary" />
                            <span className="font-medium">{t('checkout.paymentOnline')}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <div className="h-8 px-2 bg-white border border-slate-200 dark:border-slate-700 rounded flex items-center justify-center">
                              <img src={visaLogo} alt="Visa" className="h-4 w-auto object-contain" />
                            </div>
                            <div className="h-8 px-2 bg-white border border-slate-200 dark:border-slate-700 rounded flex items-center justify-center">
                              <img src={mastercardLogo} alt="Mastercard" className="h-4 w-auto object-contain" />
                            </div>
                            <div className="h-8 px-2 bg-white border border-slate-200 dark:border-slate-700 rounded flex items-center justify-center">
                              <img src={blikLogo} alt="BLIK" className="h-4 w-auto object-contain" />
                            </div>
                            <div className="h-8 px-2 bg-white border border-slate-200 dark:border-slate-700 rounded flex items-center justify-center">
                              <img src={googlePayLogo} alt="Google Pay" className="h-6 w-auto object-contain" />
                            </div>
                            <div className="h-8 px-2 bg-white border border-slate-200 dark:border-slate-700 rounded flex items-center justify-center">
                              <img src={applePayLogo} alt="Apple Pay" className="h-4 w-auto object-contain" />
                            </div>
                          </div>
                          {requiresTransfer && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Niedostępne dla zamówień powyżej 10 000 zł
                            </p>
                          )}
                        </label>
                      </div>

                      {/* Bank Transfer */}
                      <div className={`flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover-elevate transition-all ${
                        paymentMethod === "transfer" ? "border-primary bg-primary/5" : "border-border"
                      }`}>
                        <RadioGroupItem 
                          value="transfer" 
                          id="payment-transfer"
                          className="mt-1"
                          data-testid="radio-payment-transfer" 
                        />
                        <label htmlFor="payment-transfer" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-2 mb-2">
                            <ArrowRightLeft className="h-5 w-5 text-primary" />
                            <span className="font-medium">{t('checkout.paymentBankTransfer')}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Dane do przelewu zostaną wyświetlone po złożeniu zamówienia
                          </p>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={createOrderMutation.isPending}
                      data-testid="button-place-order"
                    >
                      {createOrderMutation.isPending
                        ? translate("checkout.processing", language)
                        : translate("checkout.placeOrder", language)}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="lg:sticky lg:top-20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{t('checkout.summary.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-2" data-testid={`summary-item-${item.id}`}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded bg-muted"
                    />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-tight line-clamp-2">
                        {language === 'en' && item.product.nameEn ? item.product.nameEn : item.product.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t('checkout.summary.quantity')} {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-primary">
                        {formatPriceSync(
                          parseFloat(item.product.exhibitionPrice) * item.quantity
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('checkout.summary.subtotal')}</span>
                  <span className="font-medium">{formatPriceSync(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('checkout.summary.shipping')}</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? (
                      <span className="text-primary font-semibold">{t('checkout.summary.free')}</span>
                    ) : (
                      formatPriceSync(shippingCost)
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>{t('checkout.summary.total')}</span>
                  <span className="text-primary" data-testid="text-checkout-total">
                    {formatPriceSync(total)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Transfer Payment Modal */}
      <Dialog open={transferModalOpen} onOpenChange={setTransferModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="rounded-full bg-primary/10 p-6">
                <Building2 className="h-12 w-12 text-primary" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">
              {t('checkout.transfer.title')}
            </DialogTitle>
            <DialogDescription className="text-center">
              {t('checkout.transfer.description')}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t('checkout.transfer.recipient')}</p>
                <p className="font-semibold">Tools Shop Sp. z o.o.</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t('checkout.transfer.accountNumber')}</p>
                <p className="font-mono font-semibold text-sm">
                  PL 12 3456 7890 1234 5678 9012 3456
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t('checkout.transfer.amount')}</p>
                <p className="font-bold text-lg text-primary">
                  {formatPriceSync(total)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">{t('checkout.transfer.title2')}</p>
                <p className="font-semibold">{orderId}</p>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-semibold text-sm text-blue-900 dark:text-blue-100">
                  {t('checkout.transfer.confirmationTitle')}
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {t('checkout.transfer.confirmationText')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => {
                setTransferModalOpen(false);
                setOrderSuccess(true);
              }}
              className="flex-1"
              data-testid="button-confirm-transfer"
            >
              {t('checkout.transfer.understand')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
