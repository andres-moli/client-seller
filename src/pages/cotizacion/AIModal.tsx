import { useState, useRef, useEffect } from "react";
import {
  Bot,
  X,
  Send,
  Loader2,
  Plus,
  ChevronDown,
  Mic,
} from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "../../lib/utils";
import { ItemCotizacionProcesado, procesarCotizacionConIA } from "../../domain/aiService";
import axios from "axios";

interface Message {
  role: "user" | "assistant";
  content: string;
  type?: "text" | "product-list";
  data?: ItemCotizacionProcesado[];
}

interface ParsedInput {
  searchTerm: string;
  quantity: number;
  profit: number;
}

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemsAdded: (items: any[]) => void;
  items?: any[];
}

export const AIModal = ({ isOpen, onClose, onItemsAdded, items = [] }: AIModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem("openai_api_key") || "");
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Speech to text
  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast.error('Tu navegador no soporta reconocimiento de voz');
      return;
    }
    let SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'es-ES';
      recognitionRef.current.interimResults = true;
      recognitionRef.current.maxAlternatives = 1;
    }
    const recognition = recognitionRef.current;
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      return;
    }
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (e: any) => {
      setIsListening(false);
      toast.error('Error al reconocer voz');
    };
    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      if (finalTranscript) {
        setAiInput(prev => (prev ? prev + ' ' : '') + finalTranscript);
      } else if (interimTranscript) {
        setAiInput(prev => (prev ? prev + ' ' : '') + interimTranscript);
      }
    };
    recognition.start();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        role: "assistant",
        content: "¡Hola! 👋 Soy tu asistente IA para cotizaciones de cableado estructurado.\n\nDime qué necesitas cotizar (por ejemplo: 'Quiero 10 cajas de cable UTP con 25% utilidad', '5 patch panels 30% margen', '3 racks 20%').\n\n¿Qué producto de cableado estructurado buscas?",
        type: "text"
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  // Usar procesarCotizacionConIA para manejar el input del usuario y buscar productos

  const handleSelectProduct = (product: ItemCotizacionProcesado, quantity: number, profit: number) => {
    // Asegura que todos los campos relevantes se agregan al item
    const newItem = {
      referencia: product.referencia,
      descripcion: product.descripcion,
      costo: product.costo,
      utilidad: profit,
      cantidad: quantity,
      venta: product.costo + product.costo * (profit / 100),
      subtotal: (product.costo + product.costo * (profit / 100)) * quantity,
      iva: ((product.costo + product.costo * (profit / 100)) * quantity) * 0.19,
      subtotalConIva: ((product.costo + product.costo * (profit / 100)) * quantity) * 1.19,
      stock: product.stock,
      entrega: product.stock > 0 ? "Inmediata" : "",
      unidad: product.unidad || "UN"
    };

    onItemsAdded([newItem]);

    const assistantMessage: Message = {
      role: "assistant",
      content: `✅ Agregado: ${quantity}x ${product.referencia} (${product.descripcion})\nCosto: ${formatCurrency(product.costo)}\nUtilidad: ${profit}%\nStock: ${product.stock}\nMedida: ${product.unidad || "UN"}\n💰 Venta unitaria: ${formatCurrency(newItem.venta)}\n\n¿Necesitas agregar más?`,
      type: "text"
    };
    setMessages(prev => [...prev, assistantMessage]);
  };

  // Nueva función para buscar productos por nombre (trae todas las coincidencias)
  const buscarTodosProductos = async (nombre: string) => {
    try {
      const res = await axios.get(
        `https://intranet.cytech.net.co:3003/ventas/buscar/tienda/${encodeURIComponent(nombre)}`
      );
      if (Array.isArray(res.data)) return res.data;
      return [];
    } catch (e) {
      return [];
    }
  };

  const enviarMensaje = async () => {
    if (!aiInput.trim()) {
      toast.error("Por favor escribe tu solicitud");
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: aiInput,
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setAiInput("");
    setAiLoading(true);

    try {
      // 1. Usa ChatGPT para extraer productos, cantidad y utilidad
      if (!apiKey.trim()) {
        toast.error("Configura tu API key de OpenAI primero");
        setShowApiKeyInput(true);
        setAiLoading(false);
        return;
      }
      const itemsIA = await procesarCotizacionConIA(aiInput, apiKey);
      if (!itemsIA || !Array.isArray(itemsIA) || itemsIA.length === 0) {
        const assistantMessage: Message = {
          role: "assistant",
          content: `No entendí bien. Intenta así:\n'Quiero 5 smartphones 25%'\n'3 tablets con 30% utilidad'`,
          type: "text"
        };
        setMessages(prev => [...prev, assistantMessage]);
        setAiLoading(false);
        return;
      }
      // 2. Buscar en el backend para cada producto extraído
      let allProductos = itemsIA;

      if (allProductos.length === 0) {
        const assistantMessage: Message = {
          role: "assistant",
          content: `No encontré productos para tu solicitud. Intenta con otro producto o revisa tu solicitud.`,
          type: "text"
        };
        setMessages(prev => [...prev, assistantMessage]);
        setAiLoading(false);
        return;
      }

      // 3. Mostrar todas las opciones encontradas agrupadas
      const assistantMessage: Message = {
        role: "assistant",
        content: `Encontré ${allProductos.length} opción(es). Selecciona una para agregarla a la cotización:`,
        type: "product-list",
        data: allProductos
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Error:", error);
      const assistantMessage: Message = {
        role: "assistant",
        content: error?.message || "Ocurrió un error. Intenta de nuevo.",
        type: "text"
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setAiLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] z-40 w-[min(700px,50vw)] bg-white shadow-2xl flex flex-col border-l border-gray-200 rounded-tl-xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-tl-xl">
        <div className="flex items-center gap-2">
          <Bot size={22} />
          <div>
            <h3 className="font-bold text-base">Asistente IA</h3>
            <p className="text-xs text-blue-100">Inteligente y rápido</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-blue-600 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Chat Area - con overflow-y-auto para scroll */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`w-full px-4 py-2.5 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-900 rounded-bl-none border border-gray-200 shadow-sm"
              }`}
            >
              {msg.type === "product-list" && msg.data ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium text-sm">{msg.content}</p>
                    <button onClick={onClose} className="ml-2 p-1 rounded hover:bg-gray-200 transition-colors" title="Cerrar">
                      <X size={18} />
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-[60vh] overflow-y-auto">
                    {msg.data.map((p, i: number) => {
                      // Normaliza y asegura valores correctos
                      const referencia = typeof p.referencia === 'string' ? p.referencia : '';
                      const descripcion = typeof p.descripcion === 'string' ? p.descripcion : '';
                      const costo = typeof p.costo === 'number' ? p.costo : (p.costo ? Number(p.costo) : 0);
                      const stock = typeof p.stock === 'number' ? p.stock : (p.stock ? Number(p.stock) : 0);
                      const medida = typeof p.unidad === 'string' ? p.unidad   : '';
                      return (
                        <button
                          key={i}
                          onClick={() => handleSelectProduct(p, p.cantidad, p.utilidad)}
                          className="w-full text-left p-2.5 rounded bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-150 border border-blue-200 transition-all group hover:shadow-md"
                        >
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-xs text-blue-900">{referencia}</span>
                              <span className="text-gray-700 text-xs">{descripcion}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs mt-1">
                              <span className="text-blue-700 font-bold">Costo: {formatCurrency(costo)}</span>
                              <span className="text-gray-600">Stock: {stock}</span>
                              <span className="text-gray-600">Medida: {medida}</span>
                            </div>
                          </div>
                          <div className="flex justify-end mt-1">
                            <Plus size={16} className="text-blue-600 group-hover:text-blue-700 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="border-t bg-white p-4 space-y-3 rounded-bl-xl">
        {showApiKeyInput ? (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Configura tu API Key de OpenAI
            </p>
            <div className="relative">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                autoFocus
              />
            </div>
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline block"
            >
              Obtén tu API key aquí
            </a>
            <button
              onClick={() => {
                if (apiKey.trim()) {
                  localStorage.setItem("openai_api_key", apiKey);
                  setShowApiKeyInput(false);
                  toast.success("API key guardada");
                } else {
                  toast.error("Ingresa una API key válida");
                }
              }}
              className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
            >
              Guardar
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !aiLoading && enviarMensaje()}
                placeholder="Ej: 5 smartphones 25% utilidad"
                disabled={aiLoading}
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-gray-50 placeholder:text-gray-500"
                autoFocus
              />
              <button
                onClick={handleMicClick}
                type="button"
                className={`p-2.5 rounded-lg border border-gray-300 bg-white text-blue-600 hover:bg-blue-50 transition-colors ${isListening ? 'bg-blue-100 animate-pulse' : ''}`}
                title={isListening ? 'Escuchando...' : 'Hablar'}
                disabled={aiLoading}
              >
                <Mic size={18} />
              </button>
              <button
                onClick={enviarMensaje}
                disabled={aiLoading || !aiInput.trim()}
                className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:shadow-lg"
              >
                {aiLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>

            {/* Hint */}
            <div className="text-xs text-gray-500 px-1 flex items-center gap-1">
              <ChevronDown size={14} />
              <span>ChatGPT interpreta tu solicitud</span>
            </div>

            {/* Quick Summary */}
            {/* {items && items.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                <p className="text-xs font-semibold text-blue-900 mb-2">
                  📋 Cotización ({items.length})
                </p>
                <div className="space-y-1 max-h-16 overflow-y-auto">
                  {items.map((item, idx) => (
                    <div key={idx} className="p-1.5 bg-white rounded border border-blue-100 text-xs">
                      <p className="font-medium text-gray-900">{item.referencia}</p>
                      <p className="text-gray-600">{item.cantidad}x • {item.utilidad}% • {formatCurrency(item.venta)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            <button
              onClick={() => setShowApiKeyInput(true)}
              className="w-full text-xs text-blue-600 hover:text-blue-700 py-1"
            >
              Cambiar API Key
            </button>
          </>
        )}
      </div>
    {/* Botón flotante cerrar modal */}
    <button
      onClick={onClose}
      className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
      style={{ display: isOpen ? 'block' : 'none' }}
      title="Cerrar chat"
    >
      <X size={28} />
    </button>
  </div>
  );
};
