import {
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type CartItemWithProduct,
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
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;

  constructor() {
    this.products = new Map();
    this.cartItems = new Map();
    this.seedProducts();
  }

  private seedProducts() {
    const productsData: Omit<Product, 'id'>[] = [
      {
        name: "M18 FUEL Wiertarko-wkrętarka udarowa",
        slug: "m18-fuel-wiertarko-wkretarka",
        category: "wiertarki",
        description:
          "Profesjonalna wiertarko-wkrętarka udarowa M18 FUEL z silnikiem bezszczotkowym POWERSTATE™. Maksymalny moment obrotowy 135 Nm, kompaktowa konstrukcja idealna do pracy w ograniczonych przestrzeniach.",
        originalPrice: "899.00",
        exhibitionPrice: "549.00",
        image: "/attached_assets/generated_images/Milwaukee_cordless_drill_product_f5b6aa57.png",
        sku: "M18FPD2-0",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Silnik bezszczotkowy POWERSTATE™",
          "Maksymalny moment obrotowy: 135 Nm",
          "Prędkość obrotowa: 0-550/0-2000 obr/min",
          "Uchwyt szybkozaciskowy 13mm",
          "Podświetlenie LED",
          "Kompaktowa długość: 181mm",
        ],
      },
      {
        name: "M18 FUEL Szlifierka kątowa 125mm",
        slug: "m18-fuel-szlifierka-katowa-125mm",
        category: "szlifierki",
        description:
          "Bezprzewodowa szlifierka kątowa M18 FUEL 125mm z silnikiem bezszczotkowym. System RAPIDSTOP™ zatrzymuje tarczę w mniej niż 3 sekundy dla bezpieczeństwa.",
        originalPrice: "749.00",
        exhibitionPrice: "459.00",
        image: "/attached_assets/generated_images/Milwaukee_angle_grinder_product_73120ad4.png",
        sku: "M18CAG125XPD-0",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Średnica tarczy: 125mm",
          "Prędkość obrotowa: 8500 obr/min",
          "System RAPIDSTOP™",
          "Silnik bezszczotkowy POWERSTATE™",
          "Blokada wrzeciona",
          "Osłona przeciwpyłowa",
        ],
      },
      {
        name: "M18 FUEL Klucz udarowy 1/2\"",
        slug: "m18-fuel-klucz-udarowy",
        category: "klucze",
        description:
          "Najwydajniejszy klucz udarowy akumulatorowy 1/2\". Moment obrotowy do 1356 Nm w trybie Nut-Busting, idealny do prac warsztatowych i napraw samochodowych.",
        originalPrice: "1299.00",
        exhibitionPrice: "799.00",
        image: "/attached_assets/generated_images/Milwaukee_impact_wrench_product_0a592840.png",
        sku: "M18FHIWF12-0",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Maksymalny moment obrotowy: 1356 Nm",
          "Moment dokręcania: 1017 Nm",
          "4 tryby pracy z kontrolą momentu",
          "Napęd kwadratowy 1/2\"",
          "Technologia DRIVE CONTROL™",
          "Pierścień ochrony TRI-LED",
        ],
      },
      {
        name: "M18 FUEL Młot udarowo-obrotowy SDS-Plus",
        slug: "m18-fuel-mlot-udarowo-obrotowy",
        category: "mloty",
        description:
          "Bezprzewodowy młot udarowo-obrotowy M18 FUEL z systemem SDS-Plus. Energia uderzenia 2.1J, idealny do wiercenia w betonie do 26mm.",
        originalPrice: "1099.00",
        exhibitionPrice: "679.00",
        image: "/attached_assets/generated_images/Milwaukee_rotary_hammer_product_8706618f.png",
        sku: "M18CHX-0",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Energia uderzenia: 2.1J",
          "Wiercenie w betonie: do 26mm",
          "3 tryby pracy: wiercenie, wiercenie z udarem, kucie",
          "System SDS-Plus",
          "Sprzęgło bezpieczeństwa",
          "Wibracje: 13.5 m/s²",
        ],
      },
      {
        name: "M18 FUEL Zestaw Combo 2-częściowy",
        slug: "m18-fuel-zestaw-combo",
        category: "zestawy",
        description:
          "Profesjonalny zestaw M18 FUEL zawierający wiertarko-wkrętarkę udarową oraz wkrętarkę udarową. W zestawie 2 akumulatory 5.0Ah i ładowarka.",
        originalPrice: "1799.00",
        exhibitionPrice: "1099.00",
        image: "/attached_assets/generated_images/Milwaukee_combo_kit_product_07de6d5a.png",
        sku: "M18FPP2A2-502X",
        voltage: "18V",
        batteryIncluded: true,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Wiertarko-wkrętarka M18 FPD2: 135 Nm",
          "Wkrętarka udarowa M18 FID2: 203 Nm",
          "2x Akumulator M18 B5 (5.0Ah)",
          "Ładowarka wielonapięciowa M12-18FC",
          "Walizka HD Box",
          "Silniki bezszczotkowe w obu maszynach",
        ],
      },
      {
        name: "M18 FUEL Wiertarko-wkrętarka 13mm",
        slug: "m18-fuel-wiertarka-13mm",
        category: "wiertarki",
        description:
          "Kompaktowa wiertarko-wkrętarka M18 FUEL z uchwytem 13mm. Moment obrotowy 60 Nm, idealna do precyzyjnych prac montażowych i instalacyjnych.",
        originalPrice: "699.00",
        exhibitionPrice: "429.00",
        image: "/attached_assets/generated_images/Milwaukee_cordless_drill_product_f5b6aa57.png",
        sku: "M18FDD2-0",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Moment obrotowy: 60 Nm",
          "Prędkość obrotowa: 0-450/0-1800 obr/min",
          "Uchwyt metalowy 13mm",
          "Długość: 169mm",
          "Waga: 1.6kg z akumulatorem",
          "Podświetlenie LED",
        ],
      },
      {
        name: "M18 Szlifierka kątowa 230mm",
        slug: "m18-szlifierka-230mm",
        category: "szlifierki",
        description:
          "Mocna szlifierka kątowa 230mm do wymagających zastosowań. Idealna do cięcia i szlifowania dużych powierzchni.",
        originalPrice: "899.00",
        exhibitionPrice: "559.00",
        image: "/attached_assets/generated_images/Milwaukee_angle_grinder_product_73120ad4.png",
        sku: "M18CAG230XPD-0",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Średnica tarczy: 230mm",
          "Prędkość obrotowa: 6600 obr/min",
          "Blokada wrzeciona",
          "Osłona metalowa",
          "Uchwyt dodatkowy",
          "System AVS - redukcja wibracji",
        ],
      },
      {
        name: "M18 FUEL Klucz udarowy kompaktowy 1/4\"",
        slug: "m18-fuel-klucz-udarowy-kompaktowy",
        category: "klucze",
        description:
          "Kompaktowy klucz udarowy 1/4\" hex idealny do prac montażowych. Moment obrotowy do 220 Nm w niewielkiej obudowie.",
        originalPrice: "599.00",
        exhibitionPrice: "369.00",
        image: "/attached_assets/generated_images/Milwaukee_impact_wrench_product_0a592840.png",
        sku: "M18FID2-0",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Maksymalny moment: 220 Nm",
          "Napęd hex 1/4\"",
          "Prędkość uderzenia: do 3600 uderzeń/min",
          "Długość: tylko 137mm",
          "4 tryby pracy",
          "Podświetlenie LED",
        ],
      },
      {
        name: "M18 FUEL Pilarka tarczowa 184mm",
        slug: "m18-fuel-pilarka-tarczowa",
        category: "wiertarki",
        description:
          "Bezprzewodowa pilarka tarczowa M18 FUEL z tarczą 184mm. Moc i precyzja cięcia porównywalna z pilarkami sieciowymi.",
        originalPrice: "899.00",
        exhibitionPrice: "559.00",
        image: "/attached_assets/generated_images/Cordless_circular_saw_tool_2d9dd3d9.png",
        sku: "M18CCS66-0",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Średnica tarczy: 184mm",
          "Prędkość obrotowa: 5800 obr/min",
          "Głębokość cięcia 90°: 66mm",
          "Głębokość cięcia 45°: 48mm",
          "Silnik bezszczotkowy POWERSTATE™",
          "Prowadnica laserowa",
        ],
      },
      {
        name: "M18 FUEL Piła szablasta",
        slug: "m18-fuel-pila-szablasta",
        category: "wiertarki",
        description:
          "Profesjonalna piła szablasta M18 FUEL z skokiem ostrza 32mm. Idealna do prac rozbiórkowych i cięcia różnych materiałów.",
        originalPrice: "749.00",
        exhibitionPrice: "469.00",
        image: "/attached_assets/generated_images/Reciprocating_saw_power_tool_93c2b8bb.png",
        sku: "M18FSX-0",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Skok ostrza: 32mm",
          "Prędkość skoku: 0-3000 skoków/min",
          "Silnik bezszczotkowy",
          "System szybkiej wymiany ostrza",
          "Uchwyt gumowany antywibracyjny",
          "Funkcja FIXTEC™",
        ],
      },
      {
        name: "M18 FUEL Multi-Tool",
        slug: "m18-fuel-multi-tool",
        category: "szlifierki",
        description:
          "Uniwersalne narzędzie oscylacyjne M18 FUEL. Szeroki zakres zastosowań - cięcie, szlifowanie, usuwanie fug.",
        originalPrice: "649.00",
        exhibitionPrice: "399.00",
        image: "/attached_assets/generated_images/Multi-tool_oscillating_tool_be255d0e.png",
        sku: "M18FMT-0",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Częstotliwość oscylacji: 10000-20000 obr/min",
          "Kąt oscylacji: 4.2°",
          "Regulacja prędkości",
          "System szybkiej wymiany akcesoriów",
          "Podświetlenie LED",
          "Silnik bezszczotkowy",
        ],
      },
      {
        name: "M18 FUEL Wyrzynarka",
        slug: "m18-fuel-wyrzynarka",
        category: "wiertarki",
        description:
          "Precyzyjna wyrzynarka M18 FUEL do krzywoliniowego cięcia drewna, metalu i tworzyw sztucznych.",
        originalPrice: "699.00",
        exhibitionPrice: "439.00",
        image: "/attached_assets/generated_images/Cordless_jigsaw_power_tool_8528d658.png",
        sku: "M18FBJS-0",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Skok ostrza: 26mm",
          "Prędkość ruchu: 0-3500 skoków/min",
          "Głębokość cięcia w drewnie: 135mm",
          "Funkcja wahadła (4 pozycje)",
          "Podświetlenie LED",
          "Mocowanie ostrza bez narzędzi",
        ],
      },
      {
        name: "M18 Szlifierka taśmowa",
        slug: "m18-szlifierka-tasmowa",
        category: "szlifierki",
        description:
          "Bezprzewodowa szlifierka taśmowa M18 z taśmą 10x330mm. Idealna do szlifowania powierzchni drewnianych.",
        originalPrice: "849.00",
        exhibitionPrice: "529.00",
        image: "/attached_assets/generated_images/Belt_sander_power_tool_90c20a1d.png",
        sku: "M18FBS10-0",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Wymiar taśmy: 10x330mm",
          "Prędkość taśmy: 350 m/min",
          "Regulacja prędkości",
          "Worek na pył",
          "System szybkiej wymiany taśmy",
          "Silnik bezszczotkowy",
        ],
      },
      {
        name: "M18 FUEL Frezarka",
        slug: "m18-fuel-frezarka",
        category: "wiertarki",
        description:
          "Uniwersalna frezarka M18 FUEL do obróbki drewna. Moc i precyzja w kompaktowej bezprzewodowej obudowie.",
        originalPrice: "799.00",
        exhibitionPrice: "499.00",
        image: "/attached_assets/generated_images/Cordless_router_power_tool_333a6c73.png",
        sku: "M18FTR-0",
        voltage: "18V",
        batteryIncluded: false,
        inStock: true,
        condition: "Bardzo dobry - produkt powystawowy",
        warranty: "12 miesięcy gwarancji producenta",
        features: [
          "Prędkość obrotowa: 10000-31000 obr/min",
          "Chwyty: 6mm i 8mm",
          "Regulacja głębokości: 0-51mm",
          "Silnik bezszczotkowy POWERSTATE™",
          "Elektroniczna kontrola prędkości",
          "Mocna płyta bazowa",
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
      warranty: insertProduct.warranty ?? "12 miesięcy gwarancji producenta",
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
}

export const storage = new MemStorage();
