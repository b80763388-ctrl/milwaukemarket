import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage, ChatSession } from "@shared/schema";

interface UseChatReturn {
  messages: ChatMessage[];
  sendMessage: (message: string) => void;
  isConnected: boolean;
  sessionId: string | null;
  isTyping: boolean;
}

export function useChat(sender: "customer" | "admin", sessionId?: string): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(sessionId || null);
  const [isTyping, setIsTyping] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  // Update currentSessionId when sessionId prop changes (for admin switching sessions)
  useEffect(() => {
    if (sessionId !== undefined && sessionId !== currentSessionId) {
      setCurrentSessionId(sessionId);
      setMessages([]); // Clear messages when switching sessions
    }
  }, [sessionId, currentSessionId]);

  const connect = useCallback(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);

      // Join session
      ws.send(JSON.stringify({
        type: 'join',
        sessionId: currentSessionId,
        sender,
      }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'session':
            setCurrentSessionId(data.sessionId);
            break;

          case 'history':
            setMessages(data.messages);
            break;

          case 'message':
            setMessages(prev => [...prev, data.message]);
            break;

          case 'typing':
            if (data.sender !== sender) {
              setIsTyping(data.isTyping);
            }
            break;

          case 'error':
            console.error('Chat error:', data.message);
            break;
        }
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);

      // Reconnect after 3 seconds
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, 3000);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }, [currentSessionId, sender]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect, currentSessionId]); // Reconnect when sessionId changes

  const sendMessage = useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN && currentSessionId) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        sender,
        message,
      }));
    } else {
      console.error('WebSocket is not connected or no session');
    }
  }, [sender, currentSessionId]);

  return {
    messages,
    sendMessage,
    isConnected,
    sessionId: currentSessionId,
    isTyping,
  };
}
