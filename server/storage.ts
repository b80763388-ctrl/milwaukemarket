import {
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type CartItemWithProduct,
  type Order,
  type InsertOrder,
  type ChatSession,
  type InsertChatSession,
  type ChatMessage,
  type InsertChatMessage,
  type ChatSessionWithMessages,
} from "@shared/schema";
import { randomUUID } from "crypto";

// Storage interface
export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cart
  getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: string): Promise<boolean>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | undefined>;

  // Chat
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  getChatSession(id: string): Promise<ChatSession | undefined>;
  getAllChatSessions(): Promise<ChatSession[]>;
  updateChatSessionLastMessage(id: string): Promise<void>;
  closeChatSession(id: string): Promise<void>;
  
  createChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatMessages(sessionId: string): Promise<ChatMessage[]>;
  getChatSessionWithMessages(sessionId: string): Promise<ChatSessionWithMessages | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;
  private chatSessions: Map<string, ChatSession>;
  private chatMessages: Map<string, ChatMessage>;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.chatSessions = new Map();
    this.chatMessages = new Map();
    this.seedProducts();
  }

  private seedProducts() {
    const productsData: Omit<Product, 'id'>[] = [
      // WIERTARKI M18 FUEL
      {
        name: "M18 FUEL Wiertarko-wkrętarka udarowa FPD3",
        slug: "m18-fuel-fpd3-wiertarko-wkretarka",
        category: "wiertarki",
        description:
          "Profesjonalna wiertarko-wkrętarka udarowa M18 FUEL z silnikiem bezszczotkowym POWERSTATE™. Maksymalny moment obrotowy 158 Nm, 2-biegowa przekładnia, kompaktowa długość 175 mm. Wiercenie: drewno do 89mm, stal do 16mm, mur do 16mm. Częstotliwość udaru: 0-33000 udarów/min.",
        originalPrice: "899.00",
        exhibitionPrice: "549.00",
        image: "/attached_assets/image_1761428426765.png",
        images: null,
        sku: "2804-20",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Moment obrotowy max: 158 Nm",
          "Długość: 175 mm",
          "Maks. wiercenie drewno: 89 mm",
          "Maks. wiercenie stal: 16 mm",
          "Uchwyt metalowy 13 mm",
          "Prędkość bieg 1: 0-500 obr/min",
          "Prędkość bieg 2: 0-2100 obr/min",
          "Częstotliwość udaru: 0-33000 ud/min",
        ],
      },
      {
        name: "M12 FUEL Wiertarka 1/2\" Drill Driver",
        slug: "m12-fuel-wiertarka-drill-driver",
        category: "wiertarki",
        description:
          "Kompaktowa wiertarka M12 FUEL z uchwytem 1/2\" i silnikiem bezszczotkowym POWERSTATE™. Długość tylko 15-17 cm, waga 1-1.1 kg z akumulatorem. Metalowy uchwyt 13mm, sprzęgło mechaniczne, kompatybilność z bateriami M12 REDLITHIUM 2.0Ah i 4.0Ah.",
        originalPrice: "649.00",
        exhibitionPrice: "399.00",
        image: "/attached_assets/image_1761512541599.png",
        images: null,
        sku: "2504-20",
        voltage: "12V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Długość: 15-17 cm",
          "Waga: 1-1.1 kg z akumulatorem",
          "Uchwyt metalowy 1/2\"",
          "Sprzęgło mechaniczne",
          "POWERSTATE Brushless Motor",
          "Kompatybilność z M12 2.0Ah i 4.0Ah",
        ],
      },
      {
        name: "M12 FUEL Installation Drill/Driver 4-w-1",
        slug: "m12-fuel-installation-drill-4w1",
        category: "wiertarki",
        description:
          "Unikalna wiertarka M12 FUEL 4-w-1 z 4 wymiennymi głowicami: uchwyt 3/8\", offset driver, 1/4\" hex, right angle. 16 pozycji montażu głowic. Moment obrotowy 300 in-lbs, prędkość 1600 RPM. Idealna dla elektryków, monterów HVAC, szafkarzy i mechaników.",
        originalPrice: "899.00",
        exhibitionPrice: "569.00",
        image: "/attached_assets/image_1761512457573.png",
        images: ["/attached_assets/image_1761512471871.png"],
        sku: "2505-20",
        voltage: "12V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "4 głowice: 3/8\" Chuck, Offset, 1/4\" Hex, Right Angle",
          "16 pozycji montażu głowic",
          "Moment obrotowy: 300 in-lbs",
          "Prędkość: 1600 RPM",
          "Aplikacje: elektryk, HVAC, motoryzacja",
        ],
      },
      
      // KLUCZE UDAROWE
      {
        name: "M18 FUEL Klucz udarowy 1/2\" High Torque",
        slug: "m18-fuel-klucz-udarowy-12",
        category: "klucze",
        description:
          "Najwydajniejszy klucz udarowy M18 FUEL z gniazdem 1/2\". Moment dokręcania do 1100 ft-lbs (1492 Nm), 4 personalizowalne tryby momentu dokręcania. Funkcja ONE-KEY do śledzenia narzędzi przez Bluetooth. Idealny do serwisu opon samochodów osobowych i ciężarowych.",
        originalPrice: "1399.00",
        exhibitionPrice: "899.00",
        image: "/attached_assets/image_1761512625203.png",
        images: ["/attached_assets/image_1761512635983.png"],
        sku: "2967-20",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Moment dokręcania: do 1100 ft-lbs",
          "4 tryby personalizowalne",
          "ONE-KEY Bluetooth",
          "Gniazdo 1/2\"",
          "Serwis opon osobowe i ciężarowe",
        ],
      },
      {
        name: "M12 FUEL Stubby 1/2\" Impact Wrench Gen 2",
        slug: "m12-fuel-stubby-12-gen2",
        category: "klucze",
        description:
          "Kompaktowy klucz udarowy M12 FUEL Stubby generacji 2 z gniazdem 1/2\". Moment dokręcania 400 ft-lbs, zrywanie 550 ft-lbs. Prędkość 0-3000 RPM, uderzenia 0-3300 IPM. Ultra kompaktowa długość 12.5 cm, waga tylko 1 kg. Ponad 2x więcej mocy niż poprzednia generacja.",
        originalPrice: "799.00",
        exhibitionPrice: "499.00",
        image: "/attached_assets/image_1761512737875.png",
        images: ["/attached_assets/image_1761512780593.png"],
        sku: "2563-20",
        voltage: "12V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Dokręcanie: 400 ft-lbs",
          "Zrywanie: 550 ft-lbs",
          "Obroty: 0-3000 RPM",
          "Uderzenia: 0-3300 IPM",
          "Długość: 12.5 cm",
          "Waga: 1 kg",
        ],
      },
      {
        name: "M12 FUEL Stubby 3/8\" Impact Wrench Gen 2",
        slug: "m12-fuel-stubby-38-gen2",
        category: "klucze",
        description:
          "Kompaktowy klucz udarowy M12 FUEL Stubby 3/8\" generacji 2. Moment dokręcania i zrywania 400/550 ft-lbs. Prędkość 0-3000 RPM, 0-3300 IPM. Długość 12.2 cm, waga 1 kg. Ideał do prac w ciasnych przestrzeniach.",
        originalPrice: "749.00",
        exhibitionPrice: "469.00",
        image: "/attached_assets/image_1761512788985.png",
        images: null,
        sku: "2562-20",
        voltage: "12V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Gniazdo 3/8\"",
          "Moment: 400/550 ft-lbs",
          "RPM: 0-3000",
          "IPM: 0-3300",
          "Długość: 12.2 cm",
          "Ultra kompaktowy",
        ],
      },
      
      // MŁOTY SDS-PLUS i SDS-MAX
      {
        name: "M18 FUEL Młot udarowo-obrotowy SDS-Plus FHX",
        slug: "m18-fuel-mlot-sds-plus-fhx",
        category: "mloty",
        description:
          "Młotowiertarka M18 FUEL SDS-Plus z energią udaru 2.5J. Wiercenie w betonie do 26mm, prędkość obrotowa 0-1330 obr/min, 4 tryby pracy. Wibracje tylko 12.9 m/s². Wydajność: do 125 otworów Ø10×50mm na akumulatorze M18 HIGH OUTPUT 5.5Ah. Technologie POWERSTATE, REDLINK PLUS, AVS.",
        originalPrice: "1199.00",
        exhibitionPrice: "749.00",
        image: "/attached_assets/image_1761512848416.png",
        images: ["/attached_assets/image_1761512856202.png"],
        sku: "2912-20",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Energia udaru: 2.5 J",
          "Maks. beton: 26 mm",
          "Prędkość: 0-1330 obr/min",
          "Wibracje: 12.9 m/s²",
          "4 tryby: wiercenie/udar/kucie/Variolock",
          "Wydajność: 125 otworów Ø10×50mm",
        ],
      },
      {
        name: "M18 FUEL Młot wyburzeniowy SDS-Max FHM",
        slug: "m18-fuel-mlot-sds-max-fhm",
        category: "mloty",
        description:
          "Najwydajniejszy akumulatorowy młot wyburzeniowy M18 FUEL SDS-Max. Energia udaru 11J, wiercenie do 45mm w betonie, wiercenie tunelowe 65mm, koronka rdzeniowa do 150mm. Prędkość 0-380 obr/min, częstotliwość 0-2900 ud/min. Wibracje: 9.4 m/s² (wiercenie) / 7.8 m/s² (kucie). Waga 8 kg, z akumulatorem 10.2 kg. Technologie: ONE-KEY, AUTOSTOP, AVS.",
        originalPrice: "2799.00",
        exhibitionPrice: "1799.00",
        image: "/attached_assets/image_1761512909265.png",
        images: ["/attached_assets/image_1761512915580.png"],
        sku: "2718-20",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Energia udaru: 11 J",
          "Maks. beton: 45 mm",
          "Wiercenie tunelowe: 65 mm",
          "Koronka: 150 mm",
          "Częstotliwość: 0-2900 ud/min",
          "ONE-KEY + AUTOSTOP + AVS",
          "Waga: 8 kg (10.2 kg z baterii)",
        ],
      },
      {
        name: "M12 FUEL Młotowiertarka SDS-Plus",
        slug: "m12-fuel-mlotowiertarka-sds-plus",
        category: "mloty",
        description:
          "Młotowiertarka M12 FUEL SDS-Plus z silnikiem bezszczotkowym POWERSTATE™. Energia udaru 1.1J, wiercenie w betonie do 16mm, prędkość 0-1150 obr/min. 3 tryby: wiercenie/wiercenie udarowe/kucie. Idealna do instalacji elektrycznych, hydraulicznych i HVAC.",
        originalPrice: "799.00",
        exhibitionPrice: "499.00",
        image: "/attached_assets/image_1761513077121.png",
        images: ["/attached_assets/image_1761513082935.png"],
        sku: "2416-20",
        voltage: "12V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Energia udaru: 1.1 J",
          "Maks. beton: 16 mm",
          "Prędkość: 0-1150 obr/min",
          "3 tryby pracy",
          "POWERSTATE Brushless",
          "SDS-Plus",
        ],
      },
      
      // PIŁY
      {
        name: "M18 FUEL Pilarka tarczowa 165mm FCS552",
        slug: "m18-fuel-pilarka-tarczowa-165mm",
        category: "pily",
        description:
          "Kompaktowa pilarka tarczowa M18 FUEL z tarczą 165mm. Głębokość cięcia przy 90°: 57mm, przy 45°: 44mm. Prędkość max 6000 obr/min, waga 2.8 kg bez akumulatora. Regulacja kąta skośnego do 50°. Wydajność: 200 kawałków drewna 90×35mm (akumulator 3.0 Ah HIGH OUTPUT). Adapter odkurzacza, LED, dmuchawa pyłu, osłona magnezowa, stopa z magnesem, hak.",
        originalPrice: "849.00",
        exhibitionPrice: "529.00",
        image: "/attached_assets/image_1761513269900.png",
        images: ["/attached_assets/image_1761513277335.png"],
        sku: "2732-20",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Średnica tarczy: 165 mm",
          "Głębokość 90°: 57 mm",
          "Głębokość 45°: 44 mm",
          "Prędkość max: 6000 obr/min",
          "Waga: 2.8 kg",
          "Regulacja kąta: 50°",
          "Wydajność: 200 cięć drewna 90×35mm",
        ],
      },
      {
        name: "M18 FUEL Pilarka łańcuchowa HATCHET 20cm",
        slug: "m18-fuel-pilarka-lancuchowa-20cm",
        category: "pily",
        description:
          "Kompaktowa pilarka łańcuchowa M18 FUEL HATCHET z prowadnicą 20cm. Prędkość łańcucha 5.0 m/s, waga 2.4 kg bez akumulatora. Wydajność: 180 cięć w twardym drewnie 10×10 cm (akumulator HIGH OUTPUT 5.5 Ah). Napinacz łańcucha łatwo dostępny, metalowe kolce, automatyczne smarowanie.",
        originalPrice: "899.00",
        exhibitionPrice: "569.00",
        image: "/attached_assets/image_1761513326785.png",
        images: ["/attached_assets/image_1761513335560.png"],
        sku: "2826-20",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Prowadnica: 20 cm",
          "Prędkość łańcucha: 5.0 m/s",
          "Waga: 2.4 kg",
          "Wydajność: 180 cięć 10×10 cm",
          "Kompaktowa konstrukcja",
          "Automatyczne smarowanie",
        ],
      },
      {
        name: "M18 FUEL Pilarka łańcuchowa 35cm FCHS",
        slug: "m18-fuel-pilarka-lancuchowa-35cm",
        category: "pily",
        description:
          "Pilarka łańcuchowa M18 FUEL z prowadnicą 35cm. Wydajność: 150 cięć drewna sosnowego 100×100 mm (akumulator 12.0 Ah). Wysoki moment obrotowy, regulacja prędkości spustem, reakcja silnika <1 sekunda. Szczelny zbiornik oleju z okienkiem podglądowym, automatyczne smarowanie łańcucha.",
        originalPrice: "1199.00",
        exhibitionPrice: "749.00",
        image: "/attached_assets/image_1761513392632.png",
        images: ["/attached_assets/image_1761513399224.png"],
        sku: "2727-20",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Prowadnica: 35 cm",
          "Wydajność: 150 cięć 100×100 mm",
          "Reakcja silnika: <1s",
          "Regulacja prędkości spustem",
          "Zbiornik oleju z okienkiem",
          "Auto smarowanie",
        ],
      },
      {
        name: "M18 FUEL Piła szablasta SAWZALL FSZ",
        slug: "m18-fuel-pila-szablasta-sawzall",
        category: "pily",
        description:
          "Piła szablasta M18 FUEL SAWZALL z silnikiem POWERSTATE™ (do 5× dłuższa żywotność). Wydajność do 30% szybsze cięcie. System FIXTEC™ - wymiana ostrza bez narzędzi. Opatentowana ochrona przekładni zębatej. Idealna do wymagających zastosowań budowlanych i rozbiórkowych.",
        originalPrice: "899.00",
        exhibitionPrice: "569.00",
        image: "/attached_assets/image_1761513451622.png",
        images: ["/attached_assets/image_1761513458673.png"],
        sku: "2720-20",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Silnik POWERSTATE (5× żywotność)",
          "30% szybsze cięcie",
          "System FIXTEC (bez narzędzi)",
          "Ochrona przekładni",
          "Regulacja prędkości",
        ],
      },
      {
        name: "M12 FUEL Piła szablasta HACKZALL",
        slug: "m12-fuel-pila-hackzall",
        category: "pily",
        description:
          "Ultra kompaktowa piła szablasta M12 FUEL HACKZALL. Skok 19mm, waga tylko 1.4 kg. Szybkomocowanie ostrza bez narzędzi. Idealna do prac w ciasnych przestrzeniach gdzie większe piły się nie zmieszczą.",
        originalPrice: "649.00",
        exhibitionPrice: "399.00",
        image: "/attached_assets/image_1761513563978.png",
        images: ["/attached_assets/image_1761513570539.png"],
        sku: "2520-20",
        voltage: "12V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Skok: 19 mm",
          "Waga: 1.4 kg",
          "Ultra kompaktowa",
          "Szybkomocowanie ostrza",
          "Ciasne przestrzenie",
        ],
      },
      {
        name: "M12 FUEL Pilarka tarczowa 140mm",
        slug: "m12-fuel-pilarka-tarczowa-140mm",
        category: "pily",
        description:
          "Kompaktowa pilarka tarczowa M12 FUEL z tarczą 140mm. Głębokość cięcia przy 90°: 47mm, przy 45°: 34mm. Prędkość 5000 obr/min, waga 2.3 kg bez akumulatora. Idealna do cięcia desek, sklejki i paneli. LED, dmuchawa pyłu, regulacja kąta do 50°.",
        originalPrice: "749.00",
        exhibitionPrice: "469.00",
        image: "/attached_assets/image_1761513650939.png",
        images: ["/attached_assets/image_1761513657524.png"],
        sku: "2530-20",
        voltage: "12V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Średnica tarczy: 140 mm",
          "Głębokość 90°: 47 mm",
          "Głębokość 45°: 34 mm",
          "Prędkość: 5000 obr/min",
          "Waga: 2.3 kg",
          "Regulacja kąta: 50°",
        ],
      },
      
      // SZLIFIERKI
      {
        name: "M18 FUEL Szlifierka kątowa 125mm",
        slug: "m18-fuel-szlifierka-katowa-125mm",
        category: "szlifierki",
        description:
          "Bezprzewodowa szlifierka kątowa M18 FUEL 125mm z silnikiem bezszczotkowym POWERSTATE™. Prędkość 8500 obr/min. System RAPIDSTOP™ zatrzymuje tarczę w mniej niż 3 sekundy. Blokada wrzeciona, osłona przeciwpyłowa.",
        originalPrice: "749.00",
        exhibitionPrice: "459.00",
        image: "/attached_assets/image_1761513775669.png",
        images: ["/attached_assets/image_1761513781781.png"],
        sku: "2980-20",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Średnica tarczy: 125 mm",
          "Prędkość: 8500 obr/min",
          "System RAPIDSTOP (<3s)",
          "POWERSTATE Brushless",
          "Blokada wrzeciona",
          "Osłona przeciwpyłowa",
        ],
      },
      {
        name: "M12 FUEL Szlifierka prosta 1/4\" Die Grinder",
        slug: "m12-fuel-szlifierka-prosta-14",
        category: "szlifierki",
        description:
          "Szlifierka prosta M12 FUEL 1/4\" z mocą 0.3 HP - o 20% więcej mocy niż narzędzia pneumatyczne. 3-Mode RPM Control + regulowany spust. Zaprojektowana do zastąpienia narzędzi pneumatycznych. Bezprzewodowa wolność bez kompromisów.",
        originalPrice: "649.00",
        exhibitionPrice: "409.00",
        image: "/attached_assets/image_1761513915075.png",
        images: ["/attached_assets/image_1761513923914.png"],
        sku: "2486-20",
        voltage: "12V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Moc: 0.3 HP (20% > pneumatyczne)",
          "Chwyt: 1/4\"",
          "3-Mode RPM Control",
          "Regulowany spust",
          "Zastępuje pneumatyczne",
        ],
      },
      
      // ZESTAWY
      {
        name: "Zestaw combo M18 FUEL 2 narzędzia",
        slug: "zestaw-combo-m18-fuel-2-narzedzia",
        category: "zestawy",
        description:
          "Zestaw M18 FUEL zawierający wiertarko-wkrętarkę udarową FPD3 + zakrętarkę udarową kompaktową. W zestawie: 2× akumulator M18 REDLITHIUM 5.0Ah, ładowarka M12-18FC, walizka HD Box. Kompletne rozwiązanie do prac budowlanych i montażowych.",
        originalPrice: "1899.00",
        exhibitionPrice: "1199.00",
        image: "/attached_assets/image_1761514144172.png",
        images: null,
        sku: "2997-22",
        voltage: "18V",
        batteryIncluded: true,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wiertarko-wkrętarka FPD3",
          "Zakrętarka udarowa kompaktowa",
          "2× akumulator 5.0Ah",
          "Ładowarka M12-18FC",
          "Walizka HD Box",
        ],
      },
      {
        name: "Zestaw combo M18 FUEL 3 narzędzia",
        slug: "zestaw-combo-m18-fuel-3-narzedzia",
        category: "zestawy",
        description:
          "Rozszerzony zestaw M18 FUEL: wiertarko-wkrętarka + zakrętarka udarowa + szlifierka kątowa 125mm. W zestawie: 3× akumulator 5.0Ah, ładowarka szybka, walizka systemowa. Idealny zestaw dla profesjonalistów.",
        originalPrice: "2599.00",
        exhibitionPrice: "1649.00",
        image: "/attached_assets/image_1761514222853.png",
        images: null,
        sku: "2997-23",
        voltage: "18V",
        batteryIncluded: true,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "3 narzędzia M18 FUEL",
          "Wiertarka + Zakrętarka + Szlifierka",
          "3× akumulator 5.0Ah",
          "Ładowarka szybka",
          "Walizka systemowa",
        ],
      },
      {
        name: "Zestaw startowy M18 bateria + ładowarka",
        slug: "zestaw-startowy-m18-bateria-ladowarka",
        category: "zestawy",
        description:
          "Zestaw startowy M18: 2× akumulator REDLITHIUM 5.0Ah + ładowarka M12-18FC. System REDLITHIUM zapewnia najdłuższy czas pracy, najwyższą moc i najlepszą żywotność baterii. Kompatybilny ze wszystkimi narzędziami M18.",
        originalPrice: "649.00",
        exhibitionPrice: "409.00",
        image: "/attached_assets/image_1761514286998.png",
        images: null,
        sku: "48-59-1850",
        voltage: "18V",
        batteryIncluded: true,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "2× akumulator M18 5.0Ah",
          "Ładowarka M12-18FC",
          "System REDLITHIUM",
          "Kompatybilny ze wszystkimi M18",
        ],
      },
      {
        name: "Zestaw combo M12 FUEL 2 narzędzia",
        slug: "zestaw-combo-m12-fuel-2-narzedzia",
        category: "zestawy",
        description:
          "Zestaw M12 FUEL zawierający wiertarkę 1/2\" + zakrętarkę udarową. W zestawie: 2× akumulator M12 REDLITHIUM 2.0Ah, ładowarka M12, torba narzędziowa. Kompletne rozwiązanie do prac instalacyjnych i montażowych.",
        originalPrice: "1499.00",
        exhibitionPrice: "949.00",
        image: "/attached_assets/image_1761514383361.png",
        images: null,
        sku: "2598-22",
        voltage: "12V",
        batteryIncluded: true,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wiertarka M12 FUEL 1/2\"",
          "Zakrętarka udarowa M12 FUEL",
          "2× akumulator 2.0Ah",
          "Ładowarka M12",
          "Torba narzędziowa",
        ],
      },
      
      // AKCESORIA
      {
        name: "Zestaw wierteł HSS-G Milwaukee 19szt",
        slug: "zestaw-wiertel-hss-g-19szt",
        category: "akcesoria",
        description:
          "Profesjonalny zestaw 19 wierteł HSS-G w zakresie 1-10mm w metalowej kasecie. Precyzyjnie szlifowane, nadają się do wiercenia w stali, żeliwie i metalu kolorowym.",
        originalPrice: "199.00",
        exhibitionPrice: "129.00",
        image: "/attached_assets/image_1761514474836.png",
        images: null,
        sku: "4932352374",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "19 wierteł 1-10mm",
          "Materiał: HSS-G",
          "Kaseta metalowa",
          "Precyzyjnie szlifowane",
        ],
      },
      {
        name: "Zestaw bitów SHOCKWAVE 56szt",
        slug: "zestaw-bitow-shockwave-56szt",
        category: "akcesoria",
        description:
          "Kompletny zestaw 56 bitów udarowych SHOCKWAVE w modułowym futerale. Technologia SHOCKWAVE zapewnia dłuższą żywotność i lepszą wydajność. Zawiera bity płaskie, krzyżakowe, Torx, sześciokątne i inne.",
        originalPrice: "349.00",
        exhibitionPrice: "229.00",
        image: "/attached_assets/image_1761514592976.png",
        images: null,
        sku: "4932430904",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "56 elementów",
          "Technologia SHOCKWAVE",
          "Futerał modułowy",
          "Bity udarowe",
          "Różne profile",
        ],
      },
      {
        name: "Walizka systemowa PACKOUT",
        slug: "walizka-systemowa-packout",
        category: "akcesoria",
        description:
          "Duża walizka systemowa PACKOUT z organizerami wewnętrznymi. System stackowania pozwala na łączenie z innymi modułami PACKOUT. Wytrzymała konstrukcja, metalowe zamki, odporna na uderzenia i warunki atmosferyczne.",
        originalPrice: "649.00",
        exhibitionPrice: "409.00",
        image: "/attached_assets/image_1761514676459.png",
        images: ["/attached_assets/image_1761514690998.png"],
        sku: "4932464078",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "System stackowania PACKOUT",
          "Organizery wewnętrzne",
          "Zamki metalowe",
          "Wytrzymała konstrukcja",
          "Odporna na warunki",
        ],
      },
      {
        name: "Wiertła SDS-Plus SHOCKWAVE 7szt",
        slug: "wiertla-sds-plus-shockwave-7szt",
        category: "akcesoria",
        description:
          "Zestaw 7 wierteł SDS-Plus SHOCKWAVE do betonu w zakresie 5-12mm. Głowica z węglików spiekanych, 4-ostrzowa geometria zapewnia szybkie wiercenie i długą żywotność.",
        originalPrice: "269.00",
        exhibitionPrice: "169.00",
        image: "/attached_assets/image_1761514758857.png",
        images: ["/attached_assets/image_1761514766513.png"],
        sku: "4932471085",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "7 wierteł 5-12mm",
          "System SDS-Plus",
          "Głowica węglikowa",
          "4-ostrze",
          "Do betonu",
        ],
      },

      // WÓZKI NARZĘDZIOWE
      {
        name: "Mobilny stół warsztatowy 72\" Industrial z 18 szufladami",
        slug: "mobilny-stol-warsztatowy-72-industrial-18-szuflad",
        category: "wozki",
        description:
          "Profesjonalny mobilny stół warsztatowy Milwaukee 72\" High Capacity Industrial z 18 szufladami. Wzmocniona konstrukcja stalowa z prowadnicami 150 lbs soft-close. Drewniany blat roboczy pokryty poliuretanem zapewnia dużą powierzchnię roboczą. Udźwig: 3,500 lbs. Centrum zasilania z 6 gniazdami i 2 portami USB. Przemysłowe kółka 6\" z hamulcami nożnymi. Idealne rozwiązanie dla warsztatów samochodowych, przemysłowych i produkcyjnych.",
        originalPrice: "4199.00",
        exhibitionPrice: "2799.00",
        image: "/attached_assets/image_1761504642717.png",
        images: ["/attached_assets/image_1761504775419.png", "/attached_assets/image_1761504807150.png"],
        sku: "MIL-72-18DRW",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 182.9 × 55.9 × 107.4 cm",
          "18 szuflad soft-close 150 lbs",
          "Blat drewniany pokryty poliuretanem",
          "Udźwig: 3,500 lbs",
          "Centrum zasilania 6 gniazd + 2 USB",
          "Kółka przemysłowe 6\" z hamulcami",
          "Konstrukcja stalowa wzmocniona",
        ],
      },
      {
        name: "Szafa stalowa 41\" Industrial z 18 szufladami",
        slug: "szafa-stalowa-41-industrial-18-szuflad",
        category: "wozki",
        description:
          "Szafa stalowa Milwaukee 41\" High Capacity Industrial to kombinacja szafy górnej i dolnej z łącznie 18 szufladami. Prowadnice kulkowe 100 lbs soft-close we wszystkich szufladach. Wzmocniona konstrukcja stalowa z ramą z kątownika. Górna skrzynia narzędziowa z kołnierzem zabezpieczającym i zamkiem. Mobilna szafa dolna z kółkami 5\". Idealny system przechowywania dla profesjonalistów wymagających maksymalnej organizacji narzędzi.",
        originalPrice: "1999.00",
        exhibitionPrice: "1299.00",
        image: "/attached_assets/image_1761504885330.png",
        images: ["/attached_assets/image_1761504897602.png", "/attached_assets/image_1761504905551.png"],
        sku: "MIL-41-18DRW",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 102.9 × 56.1 × 160 cm",
          "18 szuflad soft-close 100 lbs",
          "Kombinacja szafy górnej i dolnej",
          "Konstrukcja stalowa wzmocniona",
          "Kółka mobilne 5\" w dolnej szafie",
          "Zamek w górnej skrzyni",
          "Idealna organizacja narzędzi",
        ],
      },
      {
        name: "Mobilny stół warsztatowy 52\" Industrial z 12 szufladami",
        slug: "mobilny-stol-warsztatowy-52-industrial-12-szuflad",
        category: "wozki",
        description:
          "Mobilny stół warsztatowy Milwaukee 52\" High Capacity Industrial z 12 szufladami. Drewniany blat roboczy 1.2\" pokryty poliuretanem dla maksymalnej ochrony. Prowadnice 120 lbs soft-close w każdej szufladzie. Korpus spawany z blachy 18-gauge na ramie z kątownika 6-gauge wytrzymuje 2,500 lbs. Centrum zasilania z 6 gniazdami i 2 portami USB. Organizer na narzędzia akumulatorowe i miejsca na ładowarki Milwaukee. Kółka przemysłowe 5\" z hamulcami.",
        originalPrice: "3199.00",
        exhibitionPrice: "2199.00",
        image: "/attached_assets/image_1761504956393.png",
        images: ["/attached_assets/image_1761504962721.png", "/attached_assets/image_1761504984256.png"],
        sku: "MIL-52-12DRW",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 132.1 × 55.9 × 104.9 cm",
          "12 szuflad soft-close 120 lbs",
          "Blat drewniany 1.2\" z poliuretanem",
          "Udźwig: 2,500 lbs",
          "Centrum zasilania 6+2 USB",
          "Organizer narzędzi akumulatorowych",
          "Kółka 5\" z hamulcami",
        ],
      },
      {
        name: "Mobilna stacja robocza 40\" z blatem stalowym i 6 szufladami",
        slug: "mobilna-stacja-robocza-40-blat-stalowy-6-szuflad",
        category: "wozki",
        description:
          "Mobilna stacja robocza Milwaukee 40\" z 6 szufladami i blatem ze stali nierdzewnej. Prowadnice 100 lbs soft-close zapewniają płynne działanie szuflad. Rama z kątownika i kółka przemysłowe 5\" gwarantują trwałość przy udźwigu 1,800 lbs. Blat roboczy ze stali nierdzewnej odporny na uszkodzenia. Centrum zasilania 6 gniazd + 2 USB. Organizer narzędzi, składana półka boczna i zamek baryłkowy. Idealna stacja dla elektryków, hydraulików i mechaników.",
        originalPrice: "1499.00",
        exhibitionPrice: "999.00",
        image: "/attached_assets/image_1761505026761.png",
        images: ["/attached_assets/image_1761505032672.png", "/attached_assets/image_1761505042969.png"],
        sku: "MIL-40-6DRW-SS",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 114.3 × 56.1 × 99.1 cm",
          "6 szuflad soft-close 100 lbs",
          "Blat stalowy nierdzewny",
          "Udźwig: 1,800 lbs",
          "Centrum zasilania 6+2 USB",
          "Składana półka boczna",
          "Kółka przemysłowe 5\"",
        ],
      },
      {
        name: "Mobilna stacja robocza 60\"",
        slug: "mobilna-stacja-robocza-60",
        category: "wozki",
        description:
          "Mobilna stacja robocza Milwaukee 60\" to najbardziej trwałe i najlepiej wyposażone rozwiązanie. Wzmocniona rama z kątownika, prowadnice 100 lbs soft-close i 6 kółek przemysłowych 5\". Udźwig: 2,200 lbs. Pegboard metalowy 22\" wielopozycyjny do zawieszania narzędzi. Centrum zasilania z 6 gniazdami i portami USB. Odwracany blat twardy 1\" zapewnia maksymalną uniwersalność powierzchni roboczej. Uchwyt na narzędzia i regulowany uchwyt długich narzędzi. Idealna dla profesjonalistów wymagających dużej przestrzeni roboczej.",
        originalPrice: "3699.00",
        exhibitionPrice: "2499.00",
        image: "/attached_assets/image_1761505080445.png",
        images: ["/attached_assets/image_1761505086472.png", "/attached_assets/image_1761505092939.png"],
        sku: "MIL-60-WS",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 175.8 × 62 × 97 cm",
          "Udźwig: 2,200 lbs",
          "Pegboard 22\" wielopozycyjny",
          "Blat twardy 1\" odwracany",
          "6 kółek przemysłowych 5\"",
          "Centrum zasilania 6+USB",
          "Uchwyty na narzędzia długie",
        ],
      },
      {
        name: "Combo szafa stalowa 46\" High Capacity",
        slug: "combo-szafa-stalowa-46-high-capacity",
        category: "wozki",
        description:
          "Combo Milwaukee 46\" High Capacity Steel Storage to najlepiej wyposażone rozwiązanie łączące szafę górną i dolną. Kombinacja zapewnia wzmocnioną ramę z kątownika, prowadnice 100 lbs soft-close i udźwig 1,800 lbs. Kółka przemysłowe 5\" w dolnej szafie. Zintegrowana ścianka pegboard do maksymalizacji produktywności. Centrum zasilania MILWAUKEE i organizer narzędzi elektrycznych. Pojemność magazynowa dla najlepszej organizacji wszystkich rozmiarów narzędzi. System zamków chroniący przed kradzieżą.",
        originalPrice: "2399.00",
        exhibitionPrice: "1599.00",
        image: "/attached_assets/image_1761505145830.png",
        images: ["/attached_assets/image_1761505150936.png", "/attached_assets/image_1761505156326.png"],
        sku: "MIL-46-COMBO",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 116.8 × 55.9 × 150 cm",
          "Combo szafa górna + dolna",
          "Prowadnice 100 lbs soft-close",
          "Udźwig: 1,800 lbs",
          "Pegboard zintegrowany",
          "Centrum zasilania",
          "Kółka przemysłowe 5\"",
        ],
      },
      {
        name: "Mobilny stół warsztatowy 52\" High Capacity",
        slug: "mobilny-stol-warsztatowy-52-high-capacity",
        category: "wozki",
        description:
          "Mobilny stół warsztatowy Milwaukee 52\" High Capacity to trwałe i najlepiej wyposażone rozwiązanie dla profesjonalistów. Korpus 18Ga z wzmocnioną ramą z kątownika zapewnia wyjątkową wytrzymałość. Odwracana powierzchnia drewniana 1.2\" do dociskania na 3 stronach. Powierzchnia robocza 22\" na wysokości 41\" dla optymalnej ergonomii. Prowadnice 100 lbs we wszystkich szufladach. Wbudowane centrum zasilania z 6 gniazdami i portami USB. Półka stalowa przykręcana, uchwyt na narzędzia i regulowany uchwyt długich narzędzi. Kółka przemysłowe z hamulcami.",
        originalPrice: "2799.00",
        exhibitionPrice: "1899.00",
        image: "/attached_assets/image_1761505187082.png",
        images: ["/attached_assets/image_1761505194234.png"],
        sku: "MIL-52-HC",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 132.1 × 55.9 × 104.1 cm",
          "Blat drewniany 1.2\" odwracany",
          "Wysokość robocza ergonomiczna 41\"",
          "Prowadnice soft-close 100 lbs",
          "Centrum zasilania 6+USB",
          "Półka stalowa przykręcana",
          "Uchwyt regulowany na długie narzędzia",
        ],
      },

      // LASERY
      {
        name: "M12™ Zielony laser 3-płaszczyznowy 360° z automatycznym wypoziomowaniem i odbiornikiem",
        slug: "m12-zielony-laser-3-plaszczyznowy-360-auto-alignment",
        category: "lasery",
        description:
          "Profesjonalny laser M12™ Green 360° 3-Plane z automatycznym wypoziomowaniem to idealne rozwiązanie dla profesjonalistów. Zapewnia 3 pełne płaszczyzny lasera zielonego 360° dla maksymalnej wydajności pracy. Automatyczne wypoziomowanie z dokładnością ±3mm na 10m. W zestawie odbiornik laserowy i zacisk montażowy. Bateria M12™ REDLITHIUM™ XC4.0 zapewnia do 10 godzin pracy. Walizka transportowa w komplecie chroni sprzęt podczas przechowywania i transportu. Klasa lasera: 2, długość fali 515-530nm (zielony).",
        originalPrice: "2499.00",
        exhibitionPrice: "1699.00",
        image: "/attached_assets/image_1761506455987.png",
        images: ["/attached_assets/image_1761506525287.png"],
        sku: "3642-21",
        voltage: "12V",
        batteryIncluded: true,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "3 płaszczyzny lasera 360°",
          "Automatyczne wypoziomowanie",
          "Dokładność: ±3mm/10m",
          "Odbiornik + zacisk w zestawie",
          "Bateria M12 XC4.0 w komplecie",
          "Czas pracy: do 10h",
          "Walizka transportowa",
        ],
      },
      {
        name: "M18™ Zielony laser obrotowy wewnętrzny z pilotem/odbiornikiem i uchwytem ściennym",
        slug: "m18-zielony-laser-obrotowy-wewnetrzny-kit",
        category: "lasery",
        description:
          "Zaawansowany laser obrotowy M18™ Green Interior Rotary Laser zapewnia precyzyjne wypoziomowanie wewnątrz pomieszczeń. Zielony laser obrotowy o zwiększonej widoczności, idealny do prac wykończeniowych. Pilot zdalnego sterowania z odbiornikiem laserowym dla maksymalnej wygody pracy. Uchwyt ścienny umożliwia montaż na ścianie do aplikacji pionowych. Bateria M18™ REDLITHIUM™ XC3.0 zapewnia długi czas pracy. Wytrzymała walizka transportowa chroni sprzęt. Zakres roboczy: do 600m z odbiornikiem. Dokładność ±1.5mm na 30m.",
        originalPrice: "3299.00",
        exhibitionPrice: "2199.00",
        image: "/attached_assets/image_1761506550003.png",
        images: ["/attached_assets/image_1761506558070.png"],
        sku: "2940-20",
        voltage: "18V",
        batteryIncluded: true,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Laser obrotowy zielony",
          "Pilot zdalnego sterowania",
          "Odbiornik + uchwyt ścienny",
          "Zakres: do 600m z odbiornikiem",
          "Dokładność: ±1.5mm/30m",
          "Bateria M18 XC3.0 + ładowarka",
          "Walizka transportowa",
        ],
      },
      {
        name: "M12™ Zielony laser 3-płaszczyznowy 360° - zestaw",
        slug: "m12-zielony-laser-3-plaszczyznowy-360-kit",
        category: "lasery",
        description:
          "Kompletny zestaw M12™ Green 360° 3-Plane Laser Kit do profesjonalnych zastosowań budowlanych i wykończeniowych. Laser 3-płaszczyznowy 360° z zielonym widzialnym promieniem o zwiększonej jasności. Target laserowy w zestawie do łatwego przenoszenia linii. Bateria M12™ REDLITHIUM™ XC4.0 zapewnia pełny dzień pracy. Ładowarka M12™ w komplecie. Wytrzymała walizka transportowa Milwaukee. Zakres roboczy: do 45m (bez odbiornika), dokładność ±3mm na 10m. Klasa lasera 2, IP54.",
        originalPrice: "1899.00",
        exhibitionPrice: "1299.00",
        image: "/attached_assets/image_1761506600779.png",
        images: ["/attached_assets/image_1761506606270.png"],
        sku: "3640-21",
        voltage: "12V",
        batteryIncluded: true,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "3 płaszczyzny lasera 360°",
          "Target laserowy w zestawie",
          "Zakres: do 45m",
          "Dokładność: ±3mm/10m",
          "Bateria M12 XC4.0 + ładowarka",
          "IP54 (woda i kurz)",
          "Walizka Milwaukee",
        ],
      },

      // BATERIE I ŁADOWARKI (dodane do kategorii akcesoria)
      {
        name: "M18 REDLITHIUM FORGE HD12.0 Zestaw startowy",
        slug: "m18-redlithium-forge-hd12-zestaw-startowy",
        category: "akcesoria",
        description:
          "Zestaw startowy M18 REDLITHIUM FORGE HD12.0 zapewnia 50% więcej mocy niż HIGH OUTPUT 12.0 i najdłuższą żywotność baterii REDLITHIUM. Technologia FORGE to najmocniejsze, najszybsze ładowanie i najdłuższa żywotność baterii Milwaukee. Bateria M18 FORGE HD12.0 zapewnia 12 Ah przy 50% większej mocy niż HIGH OUTPUT 12.0, optymalizując moc i czas pracy dla wymagających zastosowań. Litowo-jonowa bateria ma najdłuższą żywotność, najlepszą wydajność i najbardziej wytrzymałą obudowę odporną na oleje, smary i rozpuszczalniki. Wbudowana inteligencja REDLINK chroni baterię przed przeciążeniami. Bateria HD12.0 kompatybilna z 275+ rozwiązaniami M18. Ładowarka M18 & M12 Rapid Charger ładuje do 40% szybciej.",
        originalPrice: "1499.00",
        exhibitionPrice: "999.00",
        image: "/attached_assets/image_1761443542963.png",
        images: null,
        sku: "48-59-1300",
        voltage: "18V",
        batteryIncluded: true,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Pojemność: 12.0 Ah",
          "50% więcej mocy vs HIGH OUTPUT",
          "Najdłuższa żywotność baterii",
          "Obudowa odporna na oleje",
          "REDLINK Intelligence",
          "Ładowarka Rapid 40% szybsza",
          "Kompatybilny 275+ M18",
        ],
      },
      {
        name: "M18 REDLITHIUM FORGE XC8.0 Bateria",
        slug: "m18-redlithium-forge-xc8-bateria",
        category: "akcesoria",
        description:
          "Bateria M18 REDLITHIUM FORGE XC8.0 zapewnia 50% więcej mocy i działa 50% chłodniej niż baterie M18 REDLITHIUM XC. Zoptymalizowana kombinacja rozmiaru i zwiększonej mocy - doskonałe rozwiązanie dla całej gamy produktów M18. Zapewnia zanikającą moc i działa znacznie dłużej niż kiedykolwiek przez aplikacje wymagające dużych obciążeń, pozwalając profesjonalistom pchać baterie XC dalej i dłużej. Bateria M18 REDLITHIUM FORGE XC8.0 zapewnia zwiększoną moc w ekstremalnie zimnych warunkach (poniżej 0F / -18C) i zapewnia więcej pracy na jedno ładowanie, napędzając zastąpienie przewodowe na placu budowy. W pełni kompatybilna z ponad 150+ rozwiązaniami M18.",
        originalPrice: "699.00",
        exhibitionPrice: "469.00",
        image: "/attached_assets/image_1761443570819.png",
        images: null,
        sku: "48-11-1881",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Pojemność: 8.0 Ah",
          "50% więcej mocy",
          "50% chłodniejsza praca",
          "Ekstremalny zimno <0F/-18C",
          "Technologia FORGE",
          "Kompatybilny 150+ M18",
        ],
      },
      {
        name: "M18 REDLITHIUM HIGH OUTPUT XC6.0 Baterie (2 szt)",
        slug: "m18-redlithium-high-output-xc6-baterie-2szt",
        category: "akcesoria",
        description:
          "Zestaw 2 baterii M18 REDLITHIUM HIGH OUTPUT XC6.0 zapewnia 50% więcej mocy i działa 50% chłodniej niż baterie M18 REDLITHIUM XC. Zoptymalizowana kombinacja rozmiaru i zwiększonej mocy zapewnia doskonałe rozwiązanie dla całej gamy produktów M18. Zapewnia zanikającą moc wolną i działa znacznie dłużej przez ciężkie aplikacje, pozwalając profesjonalistom pchać baterie XC dalej i dłużej niż wcześniej. Bateria M18 REDLITHIUM HIGH OUTPUT XC6.0 zapewnia zwiększoną moc w ekstremalnie zimnych warunkach pogodowych (poniżej 0F / -18C) i zapewnia więcej pracy na ładowanie. W pełni kompatybilna z ponad 150+ rozwiązaniami M18.",
        originalPrice: "1199.00",
        exhibitionPrice: "799.00",
        image: "/attached_assets/image_1761443593037.png",
        images: null,
        sku: "48-11-1862",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Pojemność: 6.0 Ah (2 szt)",
          "50% więcej mocy",
          "50% chłodniejsza praca",
          "HIGH OUTPUT technologia",
          "Ekstremalny zimno <0F/-18C",
          "Kompatybilny 150+ M18",
        ],
      },

      // ZESTAWY MAKITA
      {
        name: "Makita DLX2283TJ Zestaw Combo 18V LXT 2-częściowy",
        slug: "makita-dlx2283tj-zestaw-combo-2-czesciowy",
        category: "makita",
        description:
          "Profesjonalny zestaw Makita 18V LXT zawierający wiertarko-wkrętarkę DHP485 z momentem 62 Nm i maksymalną prędkością 2000 obr/min oraz zakrętarkę udarową DTD153 o momencie dokręcania 175 Nm. W zestawie 2 akumulatory BL1850B 5.0Ah zapewniające długą pracę, szybka ładowarka DC18RC oraz walizka transportowa Makpac 4. System 18V LXT oferuje ponad 325 narzędzi i akcesoriów. Idealny zestaw startowy dla profesjonalistów i zaawansowanych użytkowników.",
        originalPrice: "2599.00",
        exhibitionPrice: "1799.00",
        image: "/attached_assets/image_1761422132503.png",
        images: null,
        sku: "DLX2283TJ",
        voltage: "18V",
        batteryIncluded: true,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wiertarko-wkrętarka DHP485 62Nm",
          "Zakrętarka DTD153 175Nm",
          "2x akumulator BL1850B 5.0Ah",
          "Ładowarka DC18RC",
          "Walizka Makpac 4",
          "Kompatybilny 325+ narzędzi",
        ],
      },
      {
        name: "Makita DLX2153TJ1 Zestaw Combo Młot + Szlifierka 18V",
        slug: "makita-dlx2153tj1-zestaw-mlot-szlifierka",
        category: "makita",
        description:
          "Uniwersalny zestaw narzędzi Makita 18V LXT łączący młot udarowy DHR241 SDS-Plus z energią udaru 2.0J i prędkością 0-1200 obr/min oraz szlifierkę kątową DGA504 125mm z regulacją prędkości. W zestawie 2 akumulatory BL1850B 5.0Ah, ładowarka DC18RC i wytrzymała walizka transportowa. Młot wyposażony w system antywibracyjny AVT, szlifierka posiada zabezpieczenie przed przypadkowym włączeniem. Doskonały zestaw do prac budowlanych i remontowych.",
        originalPrice: "2799.00",
        exhibitionPrice: "1899.00",
        image: "/attached_assets/image_1761441357465.png",
        images: null,
        sku: "DLX2153TJ1",
        voltage: "18V",
        batteryIncluded: true,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Młot DHR241 SDS+ 2.0J",
          "Szlifierka DGA504 125mm",
          "2x akumulator BL1850B 5.0Ah",
          "Ładowarka DC18RC",
          "System AVT antywibracyjny",
          "Walizka transportowa",
        ],
      },
      {
        name: "Makita DLX4084T Zestaw Combo 18V LXT 4-częściowy",
        slug: "makita-dlx4084t-zestaw-combo-4-czesciowy",
        category: "makita",
        description:
          "Kompletny zestaw 4 narzędzi Makita 18V LXT dla profesjonalistów: wiertarko-wkrętarka DDF486 z bezszczotkowym silnikiem BL Motor (50 Nm), zakrętarka udarowa DTD153 (175 Nm), szlifierka kątowa DGA504 (125mm, regulacja prędkości) oraz młot udarowy DHR243 SDS-Plus (2.0J). W zestawie 3 akumulatory BL1850B 5.0Ah zapewniające cały dzień pracy, szybka ładowarka DC18RC oraz 2 walizki Makpac do wygodnego transportu i przechowywania. Technologia LXT gwarantuje wydajność i niezawodność.",
        originalPrice: "5499.00",
        exhibitionPrice: "3799.00",
        image: "/attached_assets/image_1761441155692.png",
        images: null,
        sku: "DLX4084T",
        voltage: "18V",
        batteryIncluded: true,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wiertarka DDF486 BL 50Nm",
          "Zakrętarka DTD153 175Nm",
          "Szlifierka DGA504 125mm",
          "Młot DHR243 SDS+ 2.0J",
          "3x akumulator BL1850B 5.0Ah",
          "Ładowarka DC18RC + 2 Makpac",
        ],
      },
    ];

    productsData.forEach((productData) => {
      const id = randomUUID();
      const product: Product = { ...productData, id };
      this.products.set(id, product);
    });
  }

  // Products
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find((p) => p.slug === slug);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter((p) => p.category === category);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      images: insertProduct.images ?? null,
      voltage: insertProduct.voltage ?? null,
      batteryIncluded: insertProduct.batteryIncluded ?? false,
      inStock: insertProduct.inStock ?? true,
      condition: insertProduct.condition ?? "Bardzo dobry - produkt powystawowy",
      warranty: insertProduct.warranty ?? "gwarancja 12 miesięcy",
    };
    this.products.set(id, product);
    return product;
  }

  // Cart
  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );

    const itemsWithProducts: CartItemWithProduct[] = [];
    for (const item of items) {
      const product = await this.getProductById(item.productId);
      if (product) {
        itemsWithProducts.push({ ...item, product });
      }
    }
    return itemsWithProducts;
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists
    const existing = Array.from(this.cartItems.values()).find(
      (item) =>
        item.sessionId === insertItem.sessionId && item.productId === insertItem.productId
    );

    if (existing) {
      // Update quantity
      existing.quantity += (insertItem.quantity || 1);
      this.cartItems.set(existing.id, existing);
      return existing;
    }

    // Create new item
    const id = randomUUID();
    const cartItem: CartItem = { 
      ...insertItem, 
      id,
      quantity: insertItem.quantity || 1
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    item.quantity = quantity;
    this.cartItems.set(id, item);
    return item;
  }

  async removeFromCart(id: string): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  // Orders
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getAllOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  // Chat
  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const id = randomUUID();
    const now = new Date();
    const session: ChatSession = {
      id,
      customerName: insertSession.customerName ?? null,
      customerEmail: insertSession.customerEmail ?? null,
      status: insertSession.status || "active",
      createdAt: now,
      lastMessageAt: now,
    };
    this.chatSessions.set(id, session);
    return session;
  }

  async getChatSession(id: string): Promise<ChatSession | undefined> {
    return this.chatSessions.get(id);
  }

  async getAllChatSessions(): Promise<ChatSession[]> {
    return Array.from(this.chatSessions.values()).sort((a, b) => 
      b.lastMessageAt.getTime() - a.lastMessageAt.getTime()
    );
  }

  async updateChatSessionLastMessage(id: string): Promise<void> {
    const session = this.chatSessions.get(id);
    if (session) {
      session.lastMessageAt = new Date();
      this.chatSessions.set(id, session);
    }
  }

  async closeChatSession(id: string): Promise<void> {
    const session = this.chatSessions.get(id);
    if (session) {
      session.status = "closed";
      this.chatSessions.set(id, session);
    }
  }

  async createChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const id = randomUUID();
    const message: ChatMessage = {
      ...insertMessage,
      id,
      isRead: false, // New messages start as unread
      createdAt: new Date(),
    };
    this.chatMessages.set(id, message);
    
    // Update session's lastMessageAt
    await this.updateChatSessionLastMessage(insertMessage.sessionId);
    
    return message;
  }

  async markMessagesAsRead(sessionId: string): Promise<void> {
    // Mark all customer messages in this session as read
    Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId && msg.sender === "customer" && !msg.isRead)
      .forEach(msg => {
        msg.isRead = true;
        this.chatMessages.set(msg.id, msg);
      });
  }

  async getUnreadMessageCount(sessionId: string): Promise<number> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId && msg.sender === "customer" && !msg.isRead)
      .length;
  }

  async getChatMessages(sessionId: string): Promise<ChatMessage[]> {
    return Array.from(this.chatMessages.values())
      .filter(msg => msg.sessionId === sessionId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async getChatSessionWithMessages(sessionId: string): Promise<ChatSessionWithMessages | undefined> {
    const session = await this.getChatSession(sessionId);
    if (!session) return undefined;

    const messages = await this.getChatMessages(sessionId);
    return {
      ...session,
      messages,
    };
  }
}

export const storage = new MemStorage();
