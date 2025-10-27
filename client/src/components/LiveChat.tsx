import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/hooks/useChat";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/lib/i18n";

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check if chat is currently active
  // TESTOWO: zawsze aktywny
  const isActive = true;
  
  // PRODUKCJA: odkomentować poniżej aby ograniczyć do 12:00-20:00
  // const now = new Date();
  // const currentHour = now.getHours();
  // const isActive = currentHour >= 12 && currentHour < 20;

  // Check if user has previously provided their name
  useEffect(() => {
    const savedName = localStorage.getItem('chat-customer-name');
    if (savedName) {
      setCustomerName(savedName);
      setNameSubmitted(true);
    }
  }, []);

  const { messages, sendMessage, isConnected, sessionId } = useChat("customer", undefined, customerName);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim() && isConnected && nameSubmitted && customerName.trim()) {
      sendMessage(messageText.trim(), customerName);
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNameSubmit = () => {
    if (customerName.trim()) {
      localStorage.setItem('chat-customer-name', customerName.trim());
      setNameSubmitted(true);
    }
  };

  const handleNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNameSubmit();
    }
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-24 right-4 md:right-6 w-80 md:w-96 shadow-2xl z-50 overflow-hidden flex flex-col" style={{ height: '500px' }}>
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Live Chat</h3>
                <div className="flex items-center gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full ${isConnected && isActive ? 'bg-green-400' : 'bg-gray-400'}`} />
                  <span>{isConnected && isActive ? 'Online' : 'Offline'}</span>
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

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-3">
              {/* Name Form - shown if name not submitted */}
              {!nameSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4 py-8">
                  <div className="bg-primary/10 rounded-full p-4 mb-2">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center space-y-2 px-4">
                    <h3 className="font-semibold text-lg">
                      {language === 'pl' ? 'Witamy w Live Chat!' : 'Welcome to Live Chat!'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {language === 'pl'
                        ? 'Podaj swoje imię, aby rozpocząć rozmowę'
                        : 'Enter your name to start the conversation'}
                    </p>
                  </div>
                  <div className="w-full px-4 space-y-3">
                    <Input
                      placeholder={language === 'pl' ? "Twoje imię" : "Your name"}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      onKeyPress={handleNameKeyPress}
                      autoFocus
                      data-testid="input-customer-name"
                    />
                    <Button
                      onClick={handleNameSubmit}
                      disabled={!customerName.trim()}
                      className="w-full"
                      data-testid="button-submit-name"
                    >
                      {language === 'pl' ? 'Rozpocznij czat' : 'Start chat'}
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Welcome Message */}
                  {messages.length === 0 && (
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
                        <MessageCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">
                          {language === 'pl' ? `Witaj ${customerName}!` : `Hello ${customerName}!`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isActive
                            ? language === 'pl' 
                              ? "Jesteśmy dostępni i chętnie pomożemy. Napisz do nas!" 
                              : "We're available and happy to help. Write to us!"
                            : language === 'pl'
                              ? "Aktualnie jesteśmy niedostępni. Wrócimy wkrótce!"
                              : "We're currently unavailable. We'll be back soon!"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Chat Messages */}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                      data-testid={`chat-message-${msg.id}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-lg px-3 py-2 ${
                          msg.sender === 'customer'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(msg.createdAt).toLocaleTimeString(language, {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </ScrollArea>

          {/* Hours Info */}
          {!isActive && (
            <div className="bg-muted/50 p-3 flex-shrink-0">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">
                  {language === 'pl' ? 'Godziny dostępności:' : 'Availability hours:'}
                </span>
              </div>
              <div className="text-sm text-muted-foreground pl-6">
                <div className="flex justify-between">
                  <span>{language === 'pl' ? 'Poniedziałek - Niedziela:' : 'Monday - Sunday:'}</span>
                  <span className="font-medium text-foreground">12:00 - 20:00</span>
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          {isActive && nameSubmitted ? (
            <div className="p-4 border-t flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  placeholder={language === 'pl' ? "Napisz wiadomość..." : "Write a message..."}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!isConnected}
                  data-testid="input-chat-message"
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!messageText.trim() || !isConnected}
                  data-testid="button-send-message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {!isConnected && (
                <p className="text-xs text-muted-foreground mt-2">
                  {language === 'pl' ? 'Łączenie...' : 'Connecting...'}
                </p>
              )}
            </div>
          ) : !nameSubmitted && isActive ? (
            <div className="p-4 border-t flex-shrink-0">
              <p className="text-sm text-center text-muted-foreground">
                {language === 'pl' ? 'Podaj swoje imię powyżej aby rozpocząć czat' : 'Enter your name above to start chatting'}
              </p>
            </div>
          ) : (
            <div className="p-4 border-t flex-shrink-0">
              <Badge variant="secondary" className="w-full justify-center py-2">
                {language === 'pl' ? 'Chat niedostępny' : 'Chat unavailable'}
              </Badge>
              <p className="text-xs text-center text-muted-foreground mt-2">
                {language === 'pl'
                  ? 'Możesz wysłać nam wiadomość e-mail na sklep@tools-shop.pl'
                  : 'You can send us an email at shop@tools-shop.pl'}
              </p>
            </div>
          )}
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
