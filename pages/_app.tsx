import "antd/dist/antd.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "../utils/queryClient";
import App from "../components/App";
import { appWithI18Next } from "ni18n";
import { ni18nConfig } from "../ni18n.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <App>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </App>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default appWithI18Next(MyApp, ni18nConfig);
