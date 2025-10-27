import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage, ChatSession } from "@shared/schema";

interface UseChatReturn {
  messages: ChatMessage[];
  sendMessage: (message: string, nameForFirstMessage?: string) => void;
  isConnected: boolean;
  sessionId: string | null;
  isTyping: boolean;
}

export function useChat(
  sender: "customer" | "admin", 
  sessionId?: string,
  customerName?: string
): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(sessionId || null);
  const [isTyping, setIsTyping] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const currentSessionIdRef = useRef<string | null>(currentSessionId);

  // Keep ref in sync with state
  useEffect(() => {
    currentSessionIdRef.current = currentSessionId;
  }, [currentSessionId]);

  // Update currentSessionId when sessionId prop changes (for admin switching sessions)
  useEffect(() => {
    if (sessionId !== undefined && sessionId !== currentSessionId) {
      setCurrentSessionId(sessionId);
      setMessages([]); // Clear messages when switching sessions
      
      // Reconnect with new session for admin
      if (wsRef.current) {
        wsRef.current.close();
      }
    }
  }, [sessionId]);

  const connect = useCallback(() => {
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);

      // Join session using ref to avoid dependency
      ws.send(JSON.stringify({
        type: 'join',
        sessionId: currentSessionIdRef.current,
        sender,
        customerName: sender === 'customer' ? customerName : undefined,
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
  }, [sender]); // Only depend on sender, not currentSessionId

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
  }, [connect]); // Only reconnect when connect function changes, not when sessionId changes

  const sendMessage = useCallback((message: string, nameForFirstMessage?: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        sender,
        message,
        customerName: sender === 'customer' && !currentSessionIdRef.current ? (nameForFirstMessage || customerName) : undefined,
      }));
    } else {
      console.error('WebSocket is not connected');
    }
  }, [sender, customerName]); // Use ref for currentSessionId to avoid dependency

  return {
    messages,
    sendMessage,
    isConnected,
    sessionId: currentSessionId,
    isTyping,
  };
}
