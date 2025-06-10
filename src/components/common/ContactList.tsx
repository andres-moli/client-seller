import React from 'react';
import { PhoneCall, User2 } from 'lucide-react';
import { WsCell } from '../../domain/graphql';

type ContactListProps = {
  contacts: WsCell[];
  onCallClick: (phone: WsCell) => void;
};

export const ContactList: React.FC<ContactListProps> = ({ contacts, onCallClick }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow transition hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                <User2 className="w-5 h-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {contact.nombre} {contact.apellido}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {contact.celular}
                </p>
              </div>
            </div>
            <button
              onClick={() => onCallClick(contact)}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition"
              aria-label="Llamar"
            >
              <PhoneCall className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
