import React, { useState } from 'react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { Bold, Italic, Strikethrough, Code, Smile, ChevronDown } from 'lucide-react';
import Button from '../../components/ui/button/Button';

interface WhatsAppMessageEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const VARIABLES = [
  { label: 'Nombre', value: '{nombre}' },
  { label: 'Dirección', value: '{direccion}' },
  { label: 'Celular', value: '{celular}' },
  { label: 'NIT', value: '{nit}' },
  { label: 'Ciudad', value: '{ciudad}' },
  { label: 'Tipo de Cliente', value: '{tipoCliente}' },
  { label: 'Email', value: '{email}' },
  { label: 'Estado', value: '{status}' },
];


export const WhatsAppMessageEditor: React.FC<WhatsAppMessageEditorProps> = ({
  value,
  onChange,
  ...props
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showVariableDropdown, setShowVariableDropdown] = useState(false);

  const insertAtCursor = (textToInsert: string) => {
    const textarea = document.getElementById('whatsapp-message-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = value.slice(0, start) + textToInsert + value.slice(end);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + textToInsert.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  const addEmoji = (emojiData: EmojiClickData) => {
    insertAtCursor(emojiData.emoji);
  };

  const handleVariableClick = (variable: string) => {
    insertAtCursor(variable);
    setShowVariableDropdown(false);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <Button onClick={() => insertAtCursor('*')}>
          <Bold size={16} />
        </Button>
        <Button onClick={() => insertAtCursor('_')}>
          <Italic size={16} />
        </Button>
        <Button onClick={() => insertAtCursor('~')}>
          <Strikethrough size={16} />
        </Button>
        <Button onClick={() => insertAtCursor('```')}>
          <Code size={16} />
        </Button>

        <div className="relative inline-block">
          <Button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <Smile size={16} />
          </Button>
          {showEmojiPicker && (
            <div className="absolute z-50 mt-2 bg-white dark:bg-gray-900 border rounded shadow-md">
              <EmojiPicker onEmojiClick={addEmoji} height={350} />
            </div>
          )}
        </div>

        <div className="relative inline-block">
          <Button onClick={() => setShowVariableDropdown(!showVariableDropdown)}>
            Variables <ChevronDown size={14} className="ml-1" />
          </Button>
          {showVariableDropdown && (
            <div className="absolute z-50 mt-2 w-48 bg-white dark:bg-gray-900 border rounded shadow-md max-h-60 overflow-auto">
              {VARIABLES.map((v) => (
                <button
                  key={v.value}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  onClick={() => handleVariableClick(v.value)}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <textarea
        id="whatsapp-message-textarea"
        className="w-full p-2 border rounded-md resize-none h-40 dark:bg-gray-900 dark:text-white/90 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escribe tu mensaje de WhatsApp con formato y variables..."
        {...props}
      />
    </div>
  );
};
