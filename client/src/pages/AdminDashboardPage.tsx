import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Package, ShoppingCart, MessageCircle, LogOut, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Order } from "@shared/schema";

export default function AdminDashboardPage() {
  const [, setLocation] = useLocation();
  const { language } = useLanguage();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: orders, isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
  });

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setLocation("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <Skeleton className="h-12 w-64" />
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalOrders = orders?.length || 0;
  const totalRevenue = orders?.reduce((sum, order) => sum + Number(order.totalAmount), 0) || 0;
  const recentOrders = orders?.slice(0, 10) || [];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {language === 'pl' ? 'Panel Administracyjny' : 'Admin Panel'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {language === 'pl' ? 'Tools Shop - Zarządzanie sklepem' : 'Tools Shop - Store Management'}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
            <LogOut className="h-4 w-4 mr-2" />
            {language === 'pl' ? 'Wyloguj' : 'Logout'}
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'pl' ? 'Łączna liczba zamówień' : 'Total Orders'}
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-orders">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                {language === 'pl' ? 'Wszystkie zamówienia w systemie' : 'All orders in the system'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'pl' ? 'Łączny przychód' : 'Total Revenue'}
              </CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-revenue">
                {totalRevenue.toLocaleString(language, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} zł
              </div>
              <p className="text-xs text-muted-foreground">
                {language === 'pl' ? 'Suma wszystkich zamówień' : 'Sum of all orders'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {language === 'pl' ? 'Live Chat' : 'Live Chat'}
              </CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Link href="/admin/chat">
                <Button className="w-full" data-testid="button-open-chat">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {language === 'pl' ? 'Otwórz czat' : 'Open chat'}
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'pl' ? 'Ostatnie zamówienia' : 'Recent Orders'}
            </CardTitle>
            <CardDescription>
              {language === 'pl'
                ? `Wyświetlanie ${recentOrders.length} najnowszych zamówień`
                : `Showing ${recentOrders.length} most recent orders`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>{language === 'pl' ? 'Brak zamówień' : 'No orders'}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border hover-elevate"
                    data-testid={`order-${order.id}`}
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {order.firstName} {order.lastName}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {order.courier.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.address}, {order.postalCode} {order.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {language === 'pl' ? 'Suma' : 'Total'}
                        </p>
                        <p className="text-lg font-bold">
                          {Number(order.totalAmount).toLocaleString(language, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })} zł
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString(language)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleTimeString(language, {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
