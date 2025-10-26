import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { MessageCircle, ArrowLeft, Send, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useChat } from "@/hooks/useChat";
import { useLanguage } from "@/contexts/LanguageContext";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { ChatSession, ChatMessage } from "@shared/schema";

export default function AdminChatPage() {
  const [, setLocation] = useLocation();
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const { language } = useLanguage();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  type ChatSessionWithUnread = ChatSession & { unreadCount: number };

  const { data: sessions, isLoading } = useQuery<ChatSessionWithUnread[]>({
    queryKey: ["/api/chat/sessions"],
    refetchInterval: 5000, // Refresh every 5 seconds
  });

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="icon" data-testid="button-back">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">
                {language === 'pl' ? 'Live Chat' : 'Live Chat'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {language === 'pl' ? 'Czaty z klientami' : 'Customer chats'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Sessions List */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="text-sm">
                {language === 'pl' ? 'Sesje czatu' : 'Chat Sessions'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                {isLoading ? (
                  <div className="p-4 space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-20" />
                    ))}
                  </div>
                ) : sessions && sessions.length > 0 ? (
                  <div className="divide-y">
                    {sessions.map((session) => (
                      <button
                        key={session.id}
                        className={`w-full p-4 text-left hover-elevate ${
                          selectedSessionId === session.id ? 'bg-muted' : ''
                        }`}
                        onClick={() => setSelectedSessionId(session.id)}
                        data-testid={`session-${session.id}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">
                              {session.customerName || (language === 'pl' ? 'Anonim' : 'Anonymous')}
                            </p>
                            {session.unreadCount > 0 && (
                              <Badge variant="destructive" className="text-xs h-5 min-w-5 flex items-center justify-center rounded-full px-1.5">
                                {session.unreadCount}
                              </Badge>
                            )}
                          </div>
                          <Badge variant={session.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                            {session.status}
                          </Badge>
                        </div>
                        {session.customerEmail && (
                          <p className="text-xs text-muted-foreground mb-1">{session.customerEmail}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {new Date(session.lastMessageAt).toLocaleString(language, {
                            day: '2-digit',
                            month: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">
                      {language === 'pl' ? 'Brak aktywnych czatów' : 'No active chats'}
                    </p>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="md:col-span-2">
            {selectedSessionId ? (
              <ChatWindow sessionId={selectedSessionId} />
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>
                    {language === 'pl'
                      ? 'Wybierz sesję czatu aby rozpocząć'
                      : 'Select a chat session to begin'}
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

function ChatWindow({ sessionId }: { sessionId: string }) {
  const [messageText, setMessageText] = useState("");
  const { language } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, isConnected } = useChat("admin", sessionId);

  // Mark messages as read when admin opens this session
  const markAsReadMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", `/api/chat/sessions/${sessionId}/mark-read`, {});
    },
    onSuccess: () => {
      // Invalidate sessions list to update unread counts
      queryClient.invalidateQueries({ queryKey: ["/api/chat/sessions"] });
    },
  });

  // Mark as read when session is opened (only once)
  useEffect(() => {
    // Only mark as read once when session is first opened with messages
    if (sessionId) {
      // Small delay to ensure messages are loaded
      const timer = setTimeout(() => {
        markAsReadMutation.mutate();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [sessionId]); // Only depend on sessionId, not messages.length

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (messageText.trim() && isConnected) {
      sendMessage(messageText.trim());
      setMessageText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">
            {language === 'pl' ? 'Konwersacja' : 'Conversation'}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-xs text-muted-foreground">
              {isConnected ? (language === 'pl' ? 'Połączono' : 'Connected') : (language === 'pl' ? 'Rozłączono' : 'Disconnected')}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-[calc(100%-5rem)]">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-3">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <p className="text-sm">
                  {language === 'pl' ? 'Brak wiadomości' : 'No messages'}
                </p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  data-testid={`chat-message-${msg.id}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 ${
                      msg.sender === 'admin'
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
              ))
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder={language === 'pl' ? "Napisz odpowiedź..." : "Write a reply..."}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!isConnected}
              data-testid="input-admin-message"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!messageText.trim() || !isConnected}
              data-testid="button-send-admin-message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </>
  );
}
