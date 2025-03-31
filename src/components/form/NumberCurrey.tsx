import { useState } from "react";

export const CurrencyInput: React.FC<{ className?: string; onChange?: (value: string) => void; defaultValue?: string }> = ({ className = "", onChange, defaultValue = "" }) => {
    const [value, setValue] = useState<string>(defaultValue);
  
    const handleBlur = () => {
      if (!value) return;
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
      if (!isNaN(numericValue)) {
        const formattedValue = numericValue.toLocaleString("es-CO", { style: "currency", currency: "COP" });
        setValue(formattedValue);
        onChange && onChange(formattedValue);
      }
    };
  
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        className={`h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${className}`}
        placeholder="Ingrese un número"
      />
    );
};