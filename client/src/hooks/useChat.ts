import { useState, useEffect, useRef, useCallback } from "react";
import type { ChatMessage, ChatSession } from "@shared/schema";

interface UseChatReturn {
  messages: ChatMessage[];
  sendMessage: (message: string, nameForFirstMessage?: string) => void;
  isConnected: boolean;
  sessionId: string | null;
  isTyping: boolean;
  isChatClosed: boolean;
  resetChat: () => void;
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
  const [isChatClosed, setIsChatClosed] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const manualReconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const currentSessionIdRef = useRef<string | null>(currentSessionId);
  const isManualResetRef = useRef(false);

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

          case 'chat_closed':
            console.log('Chat closed by admin');
            setIsChatClosed(true);
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

      // Only auto-reconnect if not a manual reset
      if (!isManualResetRef.current) {
        reconnectTimeoutRef.current = setTimeout(() => {
          connect();
        }, 3000);
      } else {
        // Reset the flag after handling
        isManualResetRef.current = false;
      }
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
      if (manualReconnectTimeoutRef.current) {
        clearTimeout(manualReconnectTimeoutRef.current);
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

  const resetChat = useCallback(() => {
    setCurrentSessionId(null);
    setMessages([]);
    setIsChatClosed(false);
    currentSessionIdRef.current = null; // Clear ref to prevent rejoining closed session
    
    // Clear any pending auto-reconnect
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    // Clear any pending manual reconnect to prevent duplicates
    if (manualReconnectTimeoutRef.current) {
      clearTimeout(manualReconnectTimeoutRef.current);
    }
    
    // Set flag to prevent auto-reconnect on close
    isManualResetRef.current = true;
    
    // Close existing WebSocket
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    // Schedule manual reconnect with clean state
    manualReconnectTimeoutRef.current = setTimeout(() => {
      manualReconnectTimeoutRef.current = undefined;
      connect();
    }, 100);
  }, [connect]);

  return {
    messages,
    sendMessage,
    isConnected,
    sessionId: currentSessionId,
    isTyping,
    isChatClosed,
    resetChat,
  };
}
