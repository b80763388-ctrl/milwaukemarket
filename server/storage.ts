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
        sku: "M18FPD3-0",
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
        image: "/attached_assets/generated_images/Milwaukee_cordless_drill_product_f5b6aa57.png",
        sku: "M12FPD-0",
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
        image: "",
        sku: "M12FUEL-2505-20",
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
        image: "/attached_assets/generated_images/Milwaukee_impact_wrench_product_0a592840.png",
        sku: "M18ONEFHIWF12-0",
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
        image: "",
        sku: "M12FUEL-2563-20",
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
        image: "",
        sku: "M12FUEL-2562-20",
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
        image: "/attached_assets/generated_images/Milwaukee_rotary_hammer_product_8706618f.png",
        sku: "M18FHX-0X",
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
        image: "",
        sku: "M18FHM-0C",
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
        name: "M12 Młotowiertarka SDS-Plus Compact",
        slug: "m12-mlotowiertarka-sds-plus",
        category: "mloty",
        description:
          "Kompaktowa młotowiertarka M12 SDS-Plus. Energia udaru 1.1J, wiercenie w betonie do 13mm, prędkość 0-800 obr/min. 2 tryby pracy. Idealna do prac instalacyjnych i montażowych w trudno dostępnych miejscach.",
        originalPrice: "649.00",
        exhibitionPrice: "399.00",
        image: "",
        sku: "M12CH-0",
        voltage: "12V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Energia udaru: 1.1 J",
          "Maks. beton: 13 mm",
          "Prędkość: 0-800 obr/min",
          "2 tryby pracy",
          "Ultra kompaktowa",
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
        image: "/attached_assets/generated_images/Cordless_circular_saw_tool_2d9dd3d9.png",
        sku: "M18FCS552-0",
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
        image: "",
        sku: "M18FHS20-0",
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
        image: "",
        sku: "M18FCHS35-0",
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
        image: "",
        sku: "M18FSZ-0",
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
        image: "",
        sku: "M12CHZ-0",
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
      
      // SZLIFIERKI
      {
        name: "M18 FUEL Szlifierka kątowa 6\" z podwójnym spustem",
        slug: "m18-fuel-szlifierka-katowa-6-podwojny-spust",
        category: "szlifierki",
        description:
          "Szlifierka kątowa M18 FUEL 6\" (152mm) z moc równą przewodowej 13A. Prędkość 9000 RPM. Wydajność: do 135 cięć w pręcie zbrojeniowym 1/2\" na jedno ładowanie. Bezpieczeństwo: AutoStop (ochrona przed odrzutem), RapidStop (hamulec tarczy), wymagany podwójny spust. Integracja ONE-KEY do zarządzania sprzętem.",
        originalPrice: "999.00",
        exhibitionPrice: "629.00",
        image: "/attached_assets/generated_images/Milwaukee_angle_grinder_product_73120ad4.png",
        sku: "M18FUEL-3676-20",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Moc: równowartość 13A przewodowej",
          "Prędkość: 9000 RPM",
          "Tarcza: 6\" (152mm)",
          "Wydajność: 135 cięć pręt 1/2\"",
          "AutoStop + RapidStop",
          "Podwójny spust",
          "ONE-KEY",
        ],
      },
      {
        name: "M18 FUEL Szlifierka kątowa 125mm",
        slug: "m18-fuel-szlifierka-katowa-125mm",
        category: "szlifierki",
        description:
          "Bezprzewodowa szlifierka kątowa M18 FUEL 125mm z silnikiem bezszczotkowym POWERSTATE™. Prędkość 8500 obr/min. System RAPIDSTOP™ zatrzymuje tarczę w mniej niż 3 sekundy. Blokada wrzeciona, osłona przeciwpyłowa.",
        originalPrice: "749.00",
        exhibitionPrice: "459.00",
        image: "/attached_assets/generated_images/Milwaukee_angle_grinder_product_73120ad4.png",
        sku: "M18CAG125XPD-0",
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
        image: "",
        sku: "M12FUEL-2486-20",
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
        image: "",
        sku: "M18FPP2A2-502X",
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
        image: "",
        sku: "M18FPP3A-503B",
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
          "Zestaw startowy M18: akumulator REDLITHIUM 5.0Ah + ładowarka M12-18FC. System REDLITHIUM zapewnia najdłuższy czas pracy, najwyższą moc i najlepszą żywotność baterii. Kompatybilny ze wszystkimi narzędziami M18.",
        originalPrice: "649.00",
        exhibitionPrice: "409.00",
        image: "",
        sku: "M18NRG-501",
        voltage: "18V",
        batteryIncluded: true,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Akumulator M18 5.0Ah",
          "Ładowarka M12-18FC",
          "System REDLITHIUM",
          "Kompatybilny ze wszystkimi M18",
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
        image: "",
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
        image: "",
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
        image: "",
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
        image: "",
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
