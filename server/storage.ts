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
        image: "/attached_assets/generated_images/M12_installation_drill_4-in-1_286d290a.png",
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
        image: "/attached_assets/generated_images/M12_stubby_impact_wrench_7058c6e4.png",
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
        image: "/attached_assets/generated_images/M12_stubby_3/8_wrench_7a19d4d0.png",
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
        image: "/attached_assets/generated_images/M18_SDS-Max_demolition_hammer_6828073f.png",
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
        image: "/attached_assets/generated_images/M12_compact_hammer_drill_aeda1ce0.png",
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
      {
        name: "M12 FUEL Młotowiertarka SDS-Plus",
        slug: "m12-fuel-mlotowiertarka-sds-plus",
        category: "mloty",
        description:
          "Młotowiertarka M12 FUEL SDS-Plus z silnikiem bezszczotkowym POWERSTATE™. Energia udaru 1.1J, wiercenie w betonie do 16mm, prędkość 0-1150 obr/min. 3 tryby: wiercenie/wiercenie udarowe/kucie. Idealna do instalacji elektrycznych, hydraulicznych i HVAC.",
        originalPrice: "799.00",
        exhibitionPrice: "499.00",
        image: "/attached_assets/generated_images/M12_FUEL_SDS-Plus_hammer_eb9efcf5.png",
        sku: "M12FUEL-CH-0",
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
        image: "/attached_assets/generated_images/M18_HATCHET_chainsaw_20cm_e328cccd.png",
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
        image: "/attached_assets/generated_images/M18_chainsaw_35cm_bar_dbbeabb6.png",
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
        image: "/attached_assets/generated_images/M18_SAWZALL_reciprocating_saw_dbaf995f.png",
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
        image: "/attached_assets/generated_images/M12_HACKZALL_compact_saw_7e3feb47.png",
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
      {
        name: "M12 FUEL Pilarka tarczowa 140mm",
        slug: "m12-fuel-pilarka-tarczowa-140mm",
        category: "pily",
        description:
          "Kompaktowa pilarka tarczowa M12 FUEL z tarczą 140mm. Głębokość cięcia przy 90°: 47mm, przy 45°: 34mm. Prędkość 5000 obr/min, waga 2.3 kg bez akumulatora. Idealna do cięcia desek, sklejki i paneli. LED, dmuchawa pyłu, regulacja kąta do 50°.",
        originalPrice: "749.00",
        exhibitionPrice: "469.00",
        image: "/attached_assets/generated_images/M12_circular_saw_140mm_82727f1f.png",
        sku: "M12FUEL-CS140-0",
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
        image: "/attached_assets/generated_images/M12_die_grinder_tool_dda5701e.png",
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
      {
        name: "M12 FUEL Szlifierka kątowa 100mm",
        slug: "m12-fuel-szlifierka-katowa-100mm",
        category: "szlifierki",
        description:
          "Kompaktowa szlifierka kątowa M12 FUEL 100mm z silnikiem bezszczotkowym POWERSTATE™. Prędkość 8000 obr/min. Ultra kompaktowa konstrukcja idealnie sprawdza się w ciasnych przestrzeniach. Blokada wrzeciona, regulacja ochrony.",
        originalPrice: "699.00",
        exhibitionPrice: "439.00",
        image: "/attached_assets/generated_images/M12_angle_grinder_100mm_3d1f9280.png",
        sku: "M12FUEL-CAG100-0",
        voltage: "12V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Średnica tarczy: 100 mm",
          "Prędkość: 8000 obr/min",
          "POWERSTATE Brushless",
          "Ultra kompaktowa",
          "Blokada wrzeciona",
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
        image: "/attached_assets/generated_images/M18_FUEL_2-tool_combo_5df7cf36.png",
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
        image: "/attached_assets/generated_images/M18_FUEL_3-tool_combo_f7892dcf.png",
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
        image: "/attached_assets/generated_images/M18_battery_charger_starter_8c94b420.png",
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
      {
        name: "Zestaw combo M12 FUEL 2 narzędzia",
        slug: "zestaw-combo-m12-fuel-2-narzedzia",
        category: "zestawy",
        description:
          "Zestaw M12 FUEL zawierający wiertarkę 1/2\" + zakrętarkę udarową. W zestawie: 2× akumulator M12 REDLITHIUM 2.0Ah, ładowarka M12, torba narzędziowa. Kompletne rozwiązanie do prac instalacyjnych i montażowych.",
        originalPrice: "1499.00",
        exhibitionPrice: "949.00",
        image: "/attached_assets/generated_images/M12_FUEL_2-tool_combo_0c1d28a0.png",
        sku: "M12FPP2A-202B",
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
        image: "/attached_assets/generated_images/HSS-G_drill_bit_set_57d93d65.png",
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
        image: "/attached_assets/generated_images/SHOCKWAVE_56-piece_bit_set_6ade9dd4.png",
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
        image: "/attached_assets/generated_images/PACKOUT_modular_toolbox_system_8d180663.png",
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
        image: "/attached_assets/generated_images/SDS-Plus_drill_bit_set_d062e20c.png",
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
        name: "Mobilny stolik roboczy 72\" High Capacity 18 szuflad",
        slug: "mobilny-stolik-roboczy-72-18-szuflad",
        category: "wozki",
        description:
          "Wózek roboczy Milwaukee High Capacity 72\" łączy mobilność, funkcjonalność i organizację narzędzi w jednym rozwiązaniu. Odwracany drewniany blat 1.2\" pokryty poliuretanem z 6 stron zapewnia dodatkową ochronę. Powierzchnia robocza 22\" zapewnia dużo miejsca, wysokość 42.3\" dla ergonomicznej pozycji. Korpus spawany z blachy 18-gauge na ramie z kątownika 6-gauge wytrzymuje 3,500 lbs. Szuflady z prowadnicami kulkowymi 150 lbs soft-close. Wymiary: 183cm × 56cm × 107cm. Pojemność: 31,629 cali sześciennych. Centrum zasilania 6 gniazd + 2 USB do ładowania akumulatorów i urządzeń.",
        originalPrice: "7999.00",
        exhibitionPrice: "5499.00",
        image: "/attached_assets/generated_images/72\"_workbench_18_drawers_475ab9ef.png",
        sku: "48-22-8572",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 183 × 56 × 107 cm",
          "18 szuflad soft-close 150 lbs",
          "Wytrzymałość: 3,500 lbs",
          "Blat drewniany 1.2\" odwracany",
          "Pojemność: 31,629 cali³",
          "Centrum zasilania 6+2USB",
          "Kompatybilny z PACKOUT",
        ],
      },
      {
        name: "Mobilny stolik roboczy 52\" High Capacity 12 szuflad",
        slug: "mobilny-stolik-roboczy-52-12-szuflad",
        category: "wozki",
        description:
          "Wózek roboczy Milwaukee High Capacity 52\" Industrial z 12 szufladami łączy mobilność, funkcjonalność i organizację. Odwracany drewniany blat 1.2\" pokryty poliuretanem. Powierzchnia robocza 22\" głębokości, wysokość 41.3\" dla ergonomii. Korpus spawany z blachy 18-gauge na ramie z kątownika 6-gauge wytrzymuje 2,500 lbs. Wymiary: 132cm × 56cm × 105cm. Pojemność: 23,543 cali sześciennych. Prowadnice 120 lbs soft-close. Centrum zasilania 6 gniazd + 2 USB. Organizer na narzędzia akumulatorowe. Miejsce na ładowarki Milwaukee na ścianie bocznej.",
        originalPrice: "6999.00",
        exhibitionPrice: "4699.00",
        image: "/attached_assets/generated_images/52\"_workbench_12_drawers_51665ec6.png",
        sku: "48-22-8559",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 132 × 56 × 105 cm",
          "12 szuflad soft-close 120 lbs",
          "Wytrzymałość: 2,500 lbs",
          "Blat drewniany 1.2\" odwracany",
          "Pojemność: 23,543 cali³",
          "Centrum zasilania 6+2USB",
          "Organizer narzędzi",
        ],
      },
      {
        name: "Mobilna stacja robocza 40\" z blatem stalowym",
        slug: "mobilna-stacja-robocza-40-blat-stalowy",
        category: "wozki",
        description:
          "Mobilna stacja robocza Milwaukee 40\" z 6 szufladami i blatem ze stali nierdzewnej to najlepsze wyposażenie w swojej klasie. Rama z kątownika, kółka przemysłowe 5\" i udźwig 1,800 lbs zapewniają trwałość. Stacja z szufladami posiada 100 lbs prowadnice soft-close i stalowy blat roboczy. Wymiary: 102cm × 56cm × 97cm. Pojemność: 17,642 cali³. Centrum zasilania 6 gniazd + 2 USB. Organizer narzędzi. Składana półka boczna. Otwieracz do butelek. Zamek baryłkowy.",
        originalPrice: "3599.00",
        exhibitionPrice: "2399.00",
        image: "/attached_assets/generated_images/40\"_stainless_steel_workstation_a5311712.png",
        sku: "48-22-8540",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 102 × 56 × 97 cm",
          "6 szuflad soft-close 100 lbs",
          "Blat stalowy nierdzewny",
          "Wytrzymałość: 1,800 lbs",
          "Pojemność: 17,642 cali³",
          "Centrum zasilania 6+2USB",
          "Półka składana",
        ],
      },
      {
        name: "Combo szafa narzędziowa 46\" Steel Storage",
        slug: "combo-szafa-narzędziowa-46",
        category: "wozki",
        description:
          "Combo Milwaukee 46\" Steel Storage to najlepiej wyposażone rozwiązanie w swojej klasie. Kombinacja szafy i skrzyni zapewnia wzmocnioną ramę z kątownika, prowadnice 100 lbs soft-close, udźwig 1,800 lbs i kółka przemysłowe 5\". Wymiary: 117cm × 56cm × 147cm. Pojemność magazynowa dla najlepszej organizacji wszystkich rozmiarów narzędzi. Centrum zasilania MILWAUKEE® i organizer narzędzi elektrycznych. Zintegrowana ścianka pegboard do maksymalizacji produktywności.",
        originalPrice: "7699.00",
        exhibitionPrice: "5199.00",
        image: "/attached_assets/generated_images/46\"_steel_storage_combo_2c6da826.png",
        sku: "48-22-8500",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 117 × 56 × 147 cm",
          "Combo szafa + skrzynia",
          "Prowadnice 100 lbs soft-close",
          "Wytrzymałość: 1,800 lbs",
          "Centrum zasilania",
          "Pegboard zintegrowany",
          "Kółka 5\" przemysłowe",
        ],
      },
      {
        name: "Szafa narzędziowa 46\" 8 szuflad Steel Storage",
        slug: "szafa-narzędziowa-46-8-szuflad",
        category: "wozki",
        description:
          "Szafa Milwaukee 46\" z 8 szufladami to najlepiej wyposażone mobilne rozwiązanie w swojej klasie. Wzmocniona rama z kątownika, prowadnice 100 lbs soft-close, udźwig 1,800 lbs i kółka przemysłowe 5\". Wymiary: 117cm × 46cm × 95cm. Waga: 100kg. Szafa mobilna zapewnia innowacyjne funkcje jak centrum zasilania MILWAUKEE® i organizer narzędzi elektrycznych.",
        originalPrice: "5499.00",
        exhibitionPrice: "3699.00",
        image: "/attached_assets/generated_images/46\"_cabinet_8_drawers_856ca0fe.png",
        sku: "48-22-8520",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 117 × 46 × 95 cm",
          "8 szuflad soft-close 100 lbs",
          "Wytrzymałość: 1,800 lbs",
          "Waga: 100 kg",
          "Centrum zasilania",
          "Organizer narzędzi",
          "Kółka 5\" przemysłowe",
        ],
      },
      {
        name: "Mobilna stacja robocza 60\" z pegboard",
        slug: "mobilna-stacja-robocza-60-pegboard",
        category: "wozki",
        description:
          "Stacja robocza Milwaukee 60\" to najbardziej trwałe i najlepiej wyposażone rozwiązanie w swojej klasie. Wzmocniona rama z kątownika, prowadnice 100 lbs soft-close i kółka 5\" (6szt). Wymiary: 161cm × 61cm × 96cm. Waga: 182kg. Udźwig: 2,200 lbs. Posiada wbudowane centrum zasilania z 6 gniazdami i portami USB. Pegboard metalowy 22\" wielopozycyjny, uchwyt na narzędzia i regulowany uchwyt długich narzędzi. Odwracany blat twardy 1\" zapewnia maksymalną uniwersalność.",
        originalPrice: "3199.00",
        exhibitionPrice: "2099.00",
        image: "/attached_assets/generated_images/60\"_pegboard_workstation_96d11203.png",
        sku: "48-22-8560",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 161 × 61 × 96 cm",
          "Wytrzymałość: 2,200 lbs",
          "Pegboard 22\" regulowany",
          "Blat twardy 1\" odwracany",
          "6 kółek 5\" przemysłowych",
          "Centrum zasilania 6+USB",
          "11 szuflad + szafka",
        ],
      },
      {
        name: "Mobilna stacja robocza 40\" z drewnianym blatem",
        slug: "mobilna-stacja-robocza-40-drewniany-blat",
        category: "wozki",
        description:
          "Mobilna stacja robocza Milwaukee 40\" z 6 szufladami to najlepsze wyposażenie w swojej klasie. Wzmocniona rama z kątownika, kółka 5\" i udźwig 1,800 lbs. Wymiary: 102cm × 56cm × 97cm. Stacja posiada 100 lbs prowadnice soft-close i odwracany blat twardy 1\" zapewniający uniwersalność i przestrzeń. Wbudowane centrum zasilania i organizer narzędzi elektrycznych maksymalizują produktywność.",
        originalPrice: "2799.00",
        exhibitionPrice: "1899.00",
        image: "/attached_assets/generated_images/40\"_wood_top_workstation_b8456b5b.png",
        sku: "48-22-8539",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 102 × 56 × 97 cm",
          "6 szuflad soft-close 100 lbs",
          "Blat drewniany 1\" odwracany",
          "Wytrzymałość: 1,800 lbs",
          "Centrum zasilania 6+2USB",
          "Organizer narzędzi",
          "Kółka 5\" przemysłowe",
        ],
      },
      {
        name: "Combo szafa narzędziowa 36\" High Capacity",
        slug: "combo-szafa-narzędziowa-36-high-capacity",
        category: "wozki",
        description:
          "Combo Milwaukee 36\" High Capacity Steel Storage to najlepiej wyposażone rozwiązanie w swojej klasie. Kombinacja szafy i skrzyni zapewnia wzmocnioną ramę z kątownika, udźwig 1,800 lbs, konstrukcję 18-gauge i kółka przemysłowe 5\". Wymiary: 91cm × 56cm × wysokość combo. Szafa mobilna posiada 12 szuflad z prowadnicami 100 lbs soft-close. Pojemność: 27,326 cali³. Centrum zasilania z 6 gniazdami + 2 ładowarkami USB. Organizer narzędzi elektrycznych dla maksymalnej organizacji.",
        originalPrice: "6799.00",
        exhibitionPrice: "4599.00",
        image: "/attached_assets/generated_images/36\"_high_capacity_combo_e9468014.png",
        sku: "48-22-8536",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 91 × 56 cm (combo)",
          "12 szuflad soft-close 100 lbs",
          "Wytrzymałość: 1,800 lbs",
          "Pojemność: 27,326 cali³",
          "Konstrukcja 18-gauge",
          "Centrum zasilania 6+2USB",
          "Organizer narzędzi",
        ],
      },
      {
        name: "Mobilny stolik roboczy 52\" High Capacity 11 szuflad",
        slug: "mobilny-stolik-roboczy-52-11-szuflad",
        category: "wozki",
        description:
          "Mobilny stolik roboczy Milwaukee 52\" High Capacity to najbardziej trwałe i najlepiej wyposażone rozwiązanie. Korpus 18Ga z wzmocnioną ramą z kątownika. Wymiary: 132cm × 56cm × 104cm. Odwracany powierzchnia drewniana 1.2\" do dociskania na 3 stronach. Powierzchnia robocza 22\" na wysokości 41\" dla ergonomii. 11 szuflad z prowadnicami 100 lbs. Wbudowane centrum zasilania z 6 gniazdami i portami USB. Półka stalowa przykręcana, uchwyt na narzędzia i regulowany uchwyt długich narzędzi.",
        originalPrice: "4599.00",
        exhibitionPrice: "3099.00",
        image: "/attached_assets/generated_images/52\"_workbench_11_drawers_d6c37894.png",
        sku: "48-22-8553",
        voltage: null,
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Wymiary: 132 × 56 × 104 cm",
          "11 szuflad soft-close 100 lbs",
          "Blat drewniany 1.2\" odwracany",
          "Wysokość robocza: 41\"",
          "Centrum zasilania 6+USB",
          "Półka stalowa przykręcana",
          "Uchwyt długich narzędzi",
        ],
      },

      // OŚWIETLENIE
      {
        name: "MX FUEL ROCKET Lampa wieżowa Dual Power",
        slug: "mx-fuel-rocket-lampa-wiezowa-dual-power",
        category: "oswietlenie",
        description:
          "Lampa wieżowa MX FUEL ROCKET Dual Power to najmocniejsza lampa wieżowa dostarczająca wyjątkowe możliwości oświetlenia w kompaktowym rozmiarze. Zapewnia do 15,000 lumenów oświetlenia obszaru roboczego. Pokrywa ponad 2,300 stóp kwadratowych i zapewnia ponad 5-krotnie większe użyteczne oświetlenie niż lampa wieżowa M18 ROCKET. Kompaktowa konstrukcja wymaga 75% mniej miejsca do przechowywania i transportu. Wymiary: składana 127cm wysokości. Odporna na uderzenia obudowa modułowa z możliwością podłączenia do systemu PACKOUT. Maszt składany 7\" wdraża się w sekundach. Zasilanie baterią MX FUEL REDLITHIUM XC406 lub AC (kabel w zestawie). Funkcja Dual Power do użytku całodobowego. Bluetooth ONE-KEY do zdalnej kontroli.",
        originalPrice: "4999.00",
        exhibitionPrice: "3299.00",
        image: "/attached_assets/image_1761443400249.png",
        sku: "MXF040-1XC",
        voltage: "MX FUEL",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Jasność: 15,000 lumenów",
          "Zasięg: 2,300 stóp kwadratowych",
          "Maszt składany 7\"",
          "75% oszczędność miejsca",
          "Dual Power (bateria/AC)",
          "Bluetooth ONE-KEY",
          "Kompatybilny PACKOUT",
        ],
      },
      {
        name: "M18 ROVER Lampa robocza potrójny panel",
        slug: "m18-rover-lampa-robocza-potrojny-panel",
        category: "oswietlenie",
        description:
          "Lampa robocza M18 ROVER z potrójnym panelem LED zapewnia wszechstronne oświetlenie obszaru roboczego. Trzy składane panele LED o łącznej mocy 3000 lumenów. Każdy panel można niezależnie regulować dla maksymalnej kontroli kierunku światła. Wymiary: kompaktowa konstrukcja, waga 2.3 kg bez baterii. Wytrzymała obudowa odporna na uderzenia IP54 do ochrony przed wodą i kurzem. 2 opcje montażu: stojak i uchwyt magnetyczny. Kompatybilna ze wszystkimi bateriami M18. Czas pracy: do 10 godzin na M18 REDLITHIUM XC5.0.",
        originalPrice: "899.00",
        exhibitionPrice: "599.00",
        image: "/attached_assets/image_1761443480174.png",
        sku: "2368-20",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "gwarancja 12 miesięcy",
        features: [
          "Jasność: 3000 lumenów",
          "3 niezależne panele LED",
          "Składana konstrukcja",
          "IP54 (woda i kurz)",
          "Montaż: stojak + magnes",
          "Czas pracy: 10h (XC5.0)",
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
