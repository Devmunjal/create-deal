import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApolloProvider } from "@apollo/client";
import client from "@/utils /apolloClient";
import { AppContextType, Customer, Deal } from "@/utils /types";
import React from "react";

const AppContext = createContext<AppContextType | undefined>(undefined);

export default function App({ Component, pageProps }: AppProps) {
  const [title, setTitle] = useState<string>("Dashboard");

  const [customers, setCustomers] = useState([] as Customer[]);
  const [deals, setDeals] = useState([] as Deal[]);

  return (
    <ApolloProvider client={client}>
      <AppContext.Provider
        value={{ title, setTitle, customers, setCustomers, setDeals, deals }}
      >
        <Layout title={title}>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </AppContext.Provider>
    </ApolloProvider>
  );
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};
