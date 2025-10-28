import { useLanguage } from "@/contexts/LanguageContext";

export function PrivacyPage() {
  const { language } = useLanguage();

  const content = {
    pl: {
      title: "Polityka Prywatności",
      lastUpdate: "Ostatnia aktualizacja: 25 października 2025",
      sections: [
        {
          title: "1. Informacje Ogólne",
          content: "Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem przez nich z usług dostępnych w sklepie internetowym Tools Shop. Administratorem danych osobowych jest Tools Shop Sp. z o.o. z siedzibą w Warszawie, ul. Przykładowa 123, 00-001 Warszawa."
        },
        {
          title: "2. Podstawa Prawna Przetwarzania Danych",
          content: "Przetwarzanie danych osobowych odbywa się na podstawie zgody wyrażonej przez Użytkownika oraz w przypadkach, w których przepisy prawa upoważniają Administratora do przetwarzania danych osobowych na podstawie przepisów prawa lub w celu realizacji zawartej pomiędzy stronami umowy. Podstawą prawną przetwarzania danych jest Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO)."
        },
        {
          title: "3. Cel Przetwarzania Danych",
          content: "Dane osobowe są przetwarzane w celu:\n• Realizacji zamówień złożonych przez Użytkownika\n• Komunikacji z Użytkownikiem, w tym obsługi pytań i reklamacji\n• Prowadzenia newslettera (po wyrażeniu odrębnej zgody)\n• Wypełnienia obowiązków prawnych ciążących na Administratorze, w szczególności wystawiania faktur\n• Prowadzenia działań marketingowych (po wyrażeniu odrębnej zgody)\n• Zapewnienia bezpieczeństwa usług i wykrywania nadużyć\n• Analizy statystycznej i optymalizacji usług sklepu"
        },
        {
          title: "4. Rodzaj Przetwarzanych Danych",
          content: "Administrator przetwarza następujące kategorie danych osobowych:\n• Dane identyfikacyjne (imię, nazwisko)\n• Dane kontaktowe (adres e-mail, numer telefonu)\n• Dane adresowe (adres dostawy, adres zamieszkania)\n• Dane związane z zamówieniami i transakcjami\n• Dane techniczne (adres IP, informacje o przeglądarce, logi dostępu)\n• Dane dotyczące zachowań w sklepie (historia zakupów, przeglądane produkty)"
        },
        {
          title: "5. Okres Przechowywania Danych",
          content: "Dane osobowe będą przechowywane przez okres niezbędny do realizacji celów, dla których zostały zebrane:\n• Dane dotyczące realizacji umowy - przez okres wymagany przepisami prawa podatkowego i rachunkowego (5 lat)\n• Dane dotyczące marketingu bezpośredniego - do czasu wyrażenia sprzeciwu lub cofnięcia zgody\n• Dane dotyczące newslettera - do czasu wypisania się lub cofnięcia zgody\n• Dane techniczne i logi - do 12 miesięcy"
        },
        {
          title: "6. Udostępnianie Danych Osobowych",
          content: "Dane osobowe mogą być przekazywane:\n• Podmiotom przetwarzającym dane osobowe na zlecenie Administratora (np. firmom kurierskim, dostawcom systemów płatności, hostingu)\n• Organom uprawnionym do otrzymania danych na podstawie przepisów prawa\n• Partnerom handlowym w zakresie niezbędnym do realizacji umowy\n\nAdministrator nie przekazuje danych osobowych do państw trzecich ani organizacji międzynarodowych, z wyjątkiem korzystania z narzędzi firmy Google (Google Analytics) i Meta (Facebook Pixel), które mogą przekazywać dane do USA."
        },
        {
          title: "7. Prawa Użytkownika",
          content: "Użytkownikowi przysługują następujące prawa:\n• Prawo dostępu do swoich danych osobowych\n• Prawo do sprostowania danych\n• Prawo do usunięcia danych (\"prawo do bycia zapomnianym\")\n• Prawo do ograniczenia przetwarzania\n• Prawo do przenoszenia danych\n• Prawo do wniesienia sprzeciwu wobec przetwarzania\n• Prawo do cofnięcia zgody w dowolnym momencie\n• Prawo do wniesienia skargi do organu nadzorczego (Prezes Urzędu Ochrony Danych Osobowych)\n\nW celu realizacji powyższych praw należy skontaktować się z Administratorem pod adresem: rodo@tools-shop.pl"
        },
        {
          title: "8. Pliki Cookies",
          content: "Strona internetowa używa plików cookies (ciasteczka) w celu:\n• Zapewnienia prawidłowego działania strony\n• Zapamiętywania preferencji użytkownika (język, waluta)\n• Analizy ruchu na stronie\n• Personalizacji treści reklamowych\n\nUżytkownik może w dowolnym momencie zmienić ustawienia dotyczące plików cookies w swojej przeglądarce internetowej. Wyłączenie cookies może spowodować trudności w korzystaniu z niektórych funkcji strony."
        },
        {
          title: "9. Bezpieczeństwo Danych",
          content: "Administrator stosuje środki techniczne i organizacyjne zapewniające ochronę przetwarzanych danych osobowych odpowiednią do zagrożeń oraz kategorii danych objętych ochroną. W szczególności Administrator zabezpiecza dane przed ich udostępnieniem osobom nieupoważnionym, utratą czy uszkodzeniem poprzez:\n• Szyfrowanie połączenia SSL/TLS\n• Stosowanie bezpiecznych metod uwierzytelniania\n• Regularne tworzenie kopii zapasowych\n• Ograniczenie dostępu do danych tylko dla upoważnionych osób\n• Szkolenie pracowników w zakresie ochrony danych osobowych"
        },
        {
          title: "10. Zmiany Polityki Prywatności",
          content: "Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Prywatności. O wszelkich zmianach Użytkownicy będą informowani poprzez publikację nowej wersji Polityki Prywatności na stronie internetowej sklepu. Zmiany wchodzą w życie z dniem publikacji. Zalecamy regularne zapoznawanie się z treścią Polityki Prywatności."
        },
        {
          title: "11. Kontakt",
          content: "W sprawach dotyczących ochrony danych osobowych można kontaktować się z Administratorem:\n• E-mail: rodo@tools-shop.pl\n• Pisemnie: Tools Shop Sp. z o.o., ul. Przykładowa 123, 00-001 Warszawa\n• Telefonicznie: +48 22 123 45 67 (poniedziałek-piątek, 9:00-17:00)"
        }
      ]
    },
    en: {
      title: "Privacy Policy",
      lastUpdate: "Last update: October 25, 2025",
      sections: [
        {
          title: "1. General Information",
          content: "This Privacy Policy defines the rules for processing and protecting personal data provided by Users in connection with their use of services available in the Tools Shop online store. The personal data controller is Tools Shop Sp. z o.o. with its registered office in Warsaw, ul. Przykładowa 123, 00-001 Warsaw, Poland."
        },
        {
          title: "2. Legal Basis for Data Processing",
          content: "Personal data processing is carried out on the basis of consent expressed by the User and in cases where legal provisions authorize the Administrator to process personal data on the basis of legal provisions or for the purpose of implementing an agreement concluded between the parties. The legal basis for data processing is Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 (GDPR)."
        },
        {
          title: "3. Purpose of Data Processing",
          content: "Personal data is processed for the purpose of:\n• Fulfilling orders placed by the User\n• Communicating with the User, including handling inquiries and complaints\n• Conducting newsletter (after separate consent)\n• Fulfilling legal obligations incumbent on the Administrator, in particular issuing invoices\n• Conducting marketing activities (after separate consent)\n• Ensuring service security and detecting fraud\n• Statistical analysis and optimization of store services"
        },
        {
          title: "4. Type of Processed Data",
          content: "The Administrator processes the following categories of personal data:\n• Identification data (name, surname)\n• Contact data (email address, phone number)\n• Address data (delivery address, residential address)\n• Data related to orders and transactions\n• Technical data (IP address, browser information, access logs)\n• Data regarding behavior in the store (purchase history, viewed products)"
        },
        {
          title: "5. Data Retention Period",
          content: "Personal data will be stored for the period necessary to achieve the purposes for which it was collected:\n• Data regarding contract fulfillment - for the period required by tax and accounting regulations (5 years)\n• Data regarding direct marketing - until objection is raised or consent is withdrawn\n• Newsletter data - until unsubscription or withdrawal of consent\n• Technical data and logs - up to 12 months"
        },
        {
          title: "6. Sharing Personal Data",
          content: "Personal data may be transferred to:\n• Entities processing personal data on behalf of the Administrator (e.g., courier companies, payment system providers, hosting)\n• Authorities entitled to receive data under legal provisions\n• Business partners to the extent necessary to fulfill the contract\n\nThe Administrator does not transfer personal data to third countries or international organizations, except for using tools from Google (Google Analytics) and Meta (Facebook Pixel), which may transfer data to the USA."
        },
        {
          title: "7. User Rights",
          content: "The User has the following rights:\n• Right of access to their personal data\n• Right to rectify data\n• Right to erasure (\"right to be forgotten\")\n• Right to restrict processing\n• Right to data portability\n• Right to object to processing\n• Right to withdraw consent at any time\n• Right to lodge a complaint with a supervisory authority (President of the Personal Data Protection Office)\n\nTo exercise the above rights, please contact the Administrator at: rodo@tools-shop.pl"
        },
        {
          title: "8. Cookies",
          content: "The website uses cookies for the purpose of:\n• Ensuring proper operation of the site\n• Remembering user preferences (language, currency)\n• Analyzing site traffic\n• Personalizing advertising content\n\nThe User can change cookie settings in their web browser at any time. Disabling cookies may cause difficulties in using some website features."
        },
        {
          title: "9. Data Security",
          content: "The Administrator applies technical and organizational measures ensuring the protection of processed personal data appropriate to the threats and categories of data covered by protection. In particular, the Administrator secures data against disclosure to unauthorized persons, loss, or damage through:\n• SSL/TLS connection encryption\n• Using secure authentication methods\n• Regular backup creation\n• Restricting data access only to authorized persons\n• Training employees in personal data protection"
        },
        {
          title: "10. Privacy Policy Changes",
          content: "The Administrator reserves the right to make changes to the Privacy Policy. Users will be informed about all changes through the publication of a new version of the Privacy Policy on the store's website. Changes take effect from the date of publication. We recommend regularly reviewing the Privacy Policy."
        },
        {
          title: "11. Contact",
          content: "Regarding personal data protection matters, you can contact the Administrator:\n• Email: rodo@tools-shop.pl\n• In writing: Tools Shop Sp. z o.o., ul. Przykładowa 123, 00-001 Warsaw, Poland\n• By phone: +48 22 123 45 67 (Monday-Friday, 9:00-17:00)"
        }
      ]
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen py-12 bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold font-heading mb-2 text-white">{t.title}</h1>
            <p className="text-sm text-gray-400">{t.lastUpdate}</p>
          </div>

          <div className="space-y-8">
            {t.sections.map((section, index) => (
              <div key={index} className="space-y-3">
                <h2 className="text-2xl font-semibold font-heading text-white">{section.title}</h2>
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-slate-800/50 border border-slate-700 rounded-lg">
            <h3 className="font-semibold mb-2 text-white">
              {language === 'pl' ? 'Inspektor Ochrony Danych' : 'Data Protection Officer'}
            </h3>
            <p className="text-sm text-gray-300">
              Tools Shop Sp. z o.o.<br />
              Email: rodo@tools-shop.pl<br />
              Tel: +48 22 123 45 67
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
