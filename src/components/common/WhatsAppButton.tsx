// WhatsAppButton.tsx
import React, { useState } from 'react';
import { Modal } from '../ui/modal';
import Button from '../ui/button/Button';
import { toast } from 'sonner';

interface WhatsAppButtonProps {
  onSend: (phoneNumber: string) => void;
}
export function validatePhoneNumber(input: string): { valid: boolean; error?: string } {
  // Elimina espacios, guiones y paréntesis
  const cleaned = input.replace(/[\s\-\(\)]/g, '');

  // Verifica que solo tenga números
  if (!/^\d+$/.test(cleaned)) {
    return { valid: false, error: 'El número solo debe contener dígitos.' };
  }

  // Verifica longitud
  if (cleaned.length !== 10) {
    return { valid: false, error: 'El número debe tener exactamente 10 dígitos.' };
  }

  return { valid: true };
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ onSend }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSend = () => {
    const result = validatePhoneNumber(phoneNumber);
    if (!result.valid) {
        toast.error(result.error); // o usa un estado para mostrar el error dentro del modal
        return;
    }
    onSend(phoneNumber);
    setIsOpen(false);
    setPhoneNumber('');
  };

  const handleCancel = () => {
    setIsOpen(false);
    setPhoneNumber('');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
        aria-label="Open WhatsApp Modal"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.04 2.003a9.994 9.994 0 00-8.696 15.133l-1.35 4.947 5.07-1.33A9.993 9.993 0 1012.04 2.003zm.066 18.198a8.189 8.189 0 01-4.172-1.158l-.3-.178-3.012.79.808-2.937-.195-.305a8.19 8.19 0 118.871 3.788zm4.35-6.144c-.24-.12-1.416-.7-1.637-.779-.22-.08-.38-.12-.54.12s-.62.779-.76.939c-.14.16-.28.18-.52.06-.24-.12-1.016-.374-1.938-1.19-.716-.637-1.198-1.422-1.338-1.662-.14-.24-.015-.37.105-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.298-.74-1.78-.2-.48-.4-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3s-.84.82-.84 2c0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.155 1.52.09.46-.07 1.416-.58 1.616-1.142.2-.56.2-1.042.14-1.142-.06-.1-.22-.16-.46-.28z" />
        </svg>
      </button>

      {/* Modal */}
      {isOpen && (
        <Modal
            isOpen={isOpen}
            onClose={handleCancel}
            className="max-w-[700px] p-6 lg:p-10"
        >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Ingresa el número de teléfono a enviar la cotizacion
            </h2>
            <input
              type="tel"
              placeholder="1234567890"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-green-400"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div className="mt-6 flex justify-end space-x-3">
              <Button
                onClick={handleCancel}
                className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleSend}
              >
                Enviar
              </Button>
            </div>
        </Modal>
      )}
    </>
  );
};

export default WhatsAppButton;
