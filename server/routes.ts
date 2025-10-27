import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertCartItemSchema, insertOrderSchema, insertChatSessionSchema, insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";

// Admin authentication middleware
function adminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  
  const token = authHeader.substring(7);
  // Simple token validation (in production, use JWT or session)
  if (!token || token.length < 10) {
    return res.status(401).json({ error: "Invalid token" });
  }
  
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // GET /api/products - Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // GET /api/products/:id - Get single product by ID
  app.get("/api/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const product = await storage.getProductById(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // GET /api/products/category/:category - Get products by category
  app.get("/api/products/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const products = await storage.getProductsByCategory(category);
      res.json(products);
    } catch (error) {
      console.error("Error fetching products by category:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // GET /api/cart - Get cart items for session
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = req.query.sessionId as string || "default";
      const items = await storage.getCartItems(sessionId);
      res.json(items);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  // POST /api/cart - Add item to cart
  app.post("/api/cart", async (req, res) => {
    try {
      const validatedData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(validatedData);
      res.json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid cart item data", details: error.errors });
      }
      console.error("Error adding to cart:", error);
      res.status(500).json({ error: "Failed to add to cart" });
    }
  });

  // PUT /api/cart/:id - Update cart item quantity
  app.put("/api/cart/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ error: "Invalid quantity" });
      }

      const updatedItem = await storage.updateCartItemQuantity(id, quantity);

      if (!updatedItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  // DELETE /api/cart/:id - Remove item from cart
  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.removeFromCart(id);

      if (!success) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error removing from cart:", error);
      res.status(500).json({ error: "Failed to remove from cart" });
    }
  });

  // POST /api/orders - Create new order
  app.post("/api/orders", async (req, res) => {
    try {
      const validatedData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(validatedData);
      res.json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid order data", details: error.errors });
      }
      console.error("Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // GET /api/orders - Get all orders (admin only)
  app.get("/api/orders", adminAuth, async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // GET /api/orders/:id - Get single order by ID (admin only)
  app.get("/api/orders/:id", adminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const order = await storage.getOrderById(id);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  // GET /api/chat/sessions - Get all chat sessions with unread counts (admin only)
  app.get("/api/chat/sessions", adminAuth, async (req, res) => {
    try {
      const sessions = await storage.getAllChatSessions();
      
      // Add unread count to each session
      const sessionsWithUnread = await Promise.all(
        sessions.map(async (session) => {
          const unreadCount = await storage.getUnreadMessageCount(session.id);
          return { ...session, unreadCount };
        })
      );
      
      res.json(sessionsWithUnread);
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
      res.status(500).json({ error: "Failed to fetch chat sessions" });
    }
  });

  // GET /api/chat/sessions/:id - Get chat session with messages (admin only)
  app.get("/api/chat/sessions/:id", adminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      const session = await storage.getChatSessionWithMessages(id);

      if (!session) {
        return res.status(404).json({ error: "Chat session not found" });
      }

      res.json(session);
    } catch (error) {
      console.error("Error fetching chat session:", error);
      res.status(500).json({ error: "Failed to fetch chat session" });
    }
  });

  // POST /api/chat/sessions/:id/close - Close chat session (admin only)
  app.post("/api/chat/sessions/:id/close", adminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.closeChatSession(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error closing chat session:", error);
      res.status(500).json({ error: "Failed to close chat session" });
    }
  });

  // POST /api/chat/sessions/:id/mark-read - Mark messages as read (admin only)
  app.post("/api/chat/sessions/:id/mark-read", adminAuth, async (req, res) => {
    try {
      const { id } = req.params;
      await storage.markMessagesAsRead(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking messages as read:", error);
      res.status(500).json({ error: "Failed to mark messages as read" });
    }
  });

  // POST /api/admin/login - Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      const adminPassword = process.env.ADMIN_PASSWORD || "admin123"; // Default password for development

      if (password === adminPassword) {
        // Generate a simple token (in production, use JWT)
        const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
        res.json({ success: true, token });
      } else {
        res.status(401).json({ error: "Invalid password" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Failed to log in" });
    }
  });

  const httpServer = createServer(app);

  // WebSocket server for real-time chat
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Store active connections: sessionId -> Set<WebSocket>
  const connections = new Map<string, Set<WebSocket>>();
  
  // Store pending customer info for connections without session yet
  const pendingCustomerInfo = new Map<WebSocket, { customerName?: string; customerEmail?: string }>();

  wss.on('connection', (ws: WebSocket) => {
    let currentSessionId: string | null = null;
    console.log('[WebSocket] New connection established');

    ws.on('message', async (data: Buffer) => {
      try {
        const message = JSON.parse(data.toString());
        console.log('[WebSocket] Received:', message.type, message);

        // Handle different message types
        switch (message.type) {
          case 'join':
            // Client joins a chat session
            const joinSessionId = message.sessionId as string | undefined;
            
            // For admin or existing session, join immediately
            if (message.sender === 'admin' || joinSessionId) {
              let session = joinSessionId ? await storage.getChatSession(joinSessionId) : null;
              
              if (session) {
                currentSessionId = session.id;

                // Add connection to session
                if (!connections.has(currentSessionId)) {
                  connections.set(currentSessionId, new Set());
                }
                connections.get(currentSessionId)!.add(ws);

                // Send session info back to client
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({
                    type: 'session',
                    sessionId: currentSessionId,
                    session,
                  }));

                  // Send chat history
                  const messages = await storage.getChatMessages(currentSessionId);
                  ws.send(JSON.stringify({
                    type: 'history',
                    messages,
                  }));
                }
              }
            } else {
              // For new customer connections, save customer info but don't create session yet
              // Session will be created when they send first message
              pendingCustomerInfo.set(ws, {
                customerName: message.customerName || undefined,
                customerEmail: message.customerEmail || undefined,
              });
              console.log('[WebSocket] Customer info saved, waiting for first message to create session');
            }
            break;

          case 'message':
            // Client sends a message
            console.log('[WebSocket] Received message:', { 
              currentSessionId, 
              sender: message.sender, 
              message: message.message 
            });
            
            // If no session yet and this is a customer, create session now
            if (!currentSessionId && message.sender === 'customer') {
              // Use customerName from message (sent with first message) or from pending info
              const customerInfo = pendingCustomerInfo.get(ws);
              const finalCustomerName = message.customerName || customerInfo?.customerName || null;
              
              const session = await storage.createChatSession({
                customerName: finalCustomerName,
                customerEmail: customerInfo?.customerEmail || null,
                status: "active",
              });
              
              currentSessionId = session.id;
              
              // Add connection to session
              if (!connections.has(currentSessionId)) {
                connections.set(currentSessionId, new Set());
              }
              connections.get(currentSessionId)!.add(ws);
              
              // Clean up pending info
              pendingCustomerInfo.delete(ws);
              
              // Send session info back to client
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                  type: 'session',
                  sessionId: currentSessionId,
                  session,
                }));
              }
              
              console.log('[WebSocket] Session created on first message:', currentSessionId);
            }
            
            if (!currentSessionId) {
              ws.send(JSON.stringify({ type: 'error', message: 'Not joined to a session' }));
              return;
            }

            const chatMessage = await storage.createChatMessage({
              sessionId: currentSessionId,
              sender: message.sender, // "customer" or "admin"
              message: message.message,
            });
            
            console.log('[WebSocket] Message saved to storage:', chatMessage);

            // Update last message timestamp
            await storage.updateChatSessionLastMessage(currentSessionId);

            // Broadcast to all clients in this session
            const sessionConnections = connections.get(currentSessionId);
            if (sessionConnections) {
              const broadcastMessage = JSON.stringify({
                type: 'message',
                message: chatMessage,
              });

              sessionConnections.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(broadcastMessage);
                }
              });
            }
            break;

          case 'typing':
            // Broadcast typing indicator
            if (currentSessionId) {
              const sessionConnections = connections.get(currentSessionId);
              if (sessionConnections) {
                const typingMessage = JSON.stringify({
                  type: 'typing',
                  sender: message.sender,
                  isTyping: message.isTyping,
                });

                sessionConnections.forEach(client => {
                  if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(typingMessage);
                  }
                });
              }
            }
            break;
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
        }
      }
    });

    ws.on('close', () => {
      // Remove connection from all sessions
      if (currentSessionId) {
        const sessionConnections = connections.get(currentSessionId);
        if (sessionConnections) {
          sessionConnections.delete(ws);
          if (sessionConnections.size === 0) {
            connections.delete(currentSessionId);
          }
        }
      }
      // Clean up pending customer info
      pendingCustomerInfo.delete(ws);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  return httpServer;
}
