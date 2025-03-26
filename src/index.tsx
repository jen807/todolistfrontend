import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./Router";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
