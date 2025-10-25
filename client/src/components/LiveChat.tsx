import { useState } from "react";
import { MessageCircle, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);

  // Check if chat is currently active (12:00 - 20:00)
  const now = new Date();
  const currentHour = now.getHours();
  const isActive = currentHour >= 12 && currentHour < 20;

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-24 right-4 md:right-6 w-80 md:w-96 shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <div className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-gray-400'}`} />
                  <span>{isActive ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
              data-testid="button-close-chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4 bg-card">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Witamy w Tools Shop!</p>
                <p className="text-sm text-muted-foreground">
                  {isActive
                    ? "Jesteśmy dostępni i chętnie pomożemy. Napisz do nas!"
                    : "Aktualnie jesteśmy niedostępni. Wrócimy wkrótce!"}
                </p>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Godziny dostępności:</span>
              </div>
              <div className="text-sm text-muted-foreground pl-6">
                <div className="flex justify-between">
                  <span>Poniedziałek - Piątek:</span>
                  <span className="font-medium text-foreground">12:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sobota - Niedziela:</span>
                  <span className="font-medium text-foreground">12:00 - 20:00</span>
                </div>
              </div>
            </div>

            {isActive ? (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Masz pytania o produkty powystawowe? Skontaktuj się z nami:
                </p>
                <div className="flex flex-col gap-2">
                  <Button className="w-full" data-testid="button-start-chat">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Rozpocznij rozmowę
                  </Button>
                  <Button variant="outline" className="w-full" data-testid="button-email-chat">
                    Napisz e-mail
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Badge variant="secondary" className="w-full justify-center py-2">
                  Chat niedostępny
                </Badge>
                <p className="text-xs text-center text-muted-foreground">
                  Możesz wysłać nam wiadomość e-mail na sklep@tools-shop.pl
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        size="icon"
        className="h-14 w-14 rounded-full shadow-lg"
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          zIndex: 9999,
        }}
        onClick={() => setIsOpen(!isOpen)}
        data-testid="button-toggle-chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" />
            {isActive && (
              <span className="absolute top-0 right-0 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            )}
          </>
        )}
      </Button>
    </>
  );
}
