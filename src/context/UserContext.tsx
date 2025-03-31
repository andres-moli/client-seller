// UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { User } from "../domain/graphql";

// Definir el tipo para el contexto
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// Crear el contexto con un valor inicial
const UserContext = createContext<UserContextType | undefined>(undefined);
const resolverToUser = (user: string | undefined) => {
  if(!user) return {} as User
  try {
    return JSON.parse(user) as User
  } catch {
    return {} as User
  }
}
// Proveedor del contexto
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Leer los datos del usuario desde las cookies
  useEffect(() => {
    const userData = Cookies.get("user"); // Obtener la cookie "user"
    if (userData) {
      try {
        const stringUser = Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_USER);
        const user = resolverToUser(stringUser)
        setUser(user); // Guardar los datos en el estado
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};