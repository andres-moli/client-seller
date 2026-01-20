import { useState } from "react";
import {
  Bot,
  X,
  Eye,
  EyeOff,
  Send,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { procesarCotizacionConIA } from "../../domain/aiService";

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemsAdded: (items: any[]) => void;
}

export const AIModal = ({ isOpen, onClose, onItemsAdded }: AIModalProps) => {
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem("openai_api_key") || "");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);

  const procesarConIA = async () => {
    if (!apiKey.trim()) {
      toast.error("Debes configurar tu API key de OpenAI");
      setShowApiKeyInput(true);
      return;
    }

    if (!aiInput.trim()) {
      toast.error("Por favor escribe las instrucciones");
      return;
    }

    setAiLoading(true);
    try {
      const itemsAgregados = await procesarCotizacionConIA(aiInput, apiKey);
      onItemsAdded(itemsAgregados);
      toast.success(
        `${itemsAgregados.length} producto(s) agregado(s) exitosamente`
      );
      setAiInput("");
      onClose();
    } catch (error) {
      console.error("Error con IA:", error);
      toast.error(
        error instanceof Error ? error.message : "Error procesando con IA"
      );
    } finally {
      setAiLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={(e) => {
          if (e.target === e.currentTarget && !aiLoading) {
            onClose();
          }
        }}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-100">
              <Bot className="text-blue-600" size={20} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              Asistente de IA
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={aiLoading}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {aiLoading ? (
            // Estado de cargando
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <Loader2 className="animate-spin text-blue-600" size={48} />
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-900">
                  Procesando tu solicitud...
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Analizando productos y agregándolos a la cotización
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Configurar API Key */}
              {showApiKeyInput && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
                  <p className="text-sm font-semibold text-yellow-900">
                    Configura tu API Key de OpenAI
                  </p>
                  <p className="text-xs text-yellow-800">
                    Necesitas una API key de OpenAI para usar el asistente de IA.
                    <a
                      href="https://platform.openai.com/api-keys"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline ml-1"
                    >
                      Obtén tu API key aquí
                    </a>
                  </p>
                  <div className="relative">
                    <input
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      autoFocus
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showApiKey ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
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
                    Guardar API Key
                  </button>
                </div>
              )}

              {!showApiKeyInput && (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <span className="font-semibold">💡 Ejemplo:</span> "Quiero 10
                      smartphones Samsung con 25% de utilidad y 5 tablets con 30%
                      de utilidad"
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      ¿Qué deseas agregar?
                    </label>
                    <textarea
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Escribe tus instrucciones aquí..."
                      className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      autoFocus
                    />
                  </div>

                  <button
                    onClick={() => setShowApiKeyInput(true)}
                    className="w-full text-xs text-blue-600 hover:text-blue-700 py-1"
                  >
                    Cambiar API Key
                  </button>
                </>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!aiLoading && !showApiKeyInput && (
          <div className="border-t p-6 space-y-3">
            <button
              onClick={procesarConIA}
              disabled={!aiInput.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              <Send size={18} />
              Procesar con IA
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </>
  );
};
