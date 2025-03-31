import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { QueryClientProvider } from "react-query";
import { ApolloProvider } from '@apollo/client';
import { apolloClient, queryClient } from "./main.config.tsx";
import { Toaster } from "sonner";
import { UserProvider } from "./context/UserContext.tsx";
// import { AlertRoot } from "./composables/AlertRoot.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
      <UserProvider>
        <ThemeProvider>
          <AppWrapper>
            <App />
            {/* <AlertRoot /> */}
            <Toaster richColors theme='light' />
          </AppWrapper>
        </ThemeProvider>
      </UserProvider>
      </ApolloProvider>
    </QueryClientProvider>
  </StrictMode>
);
