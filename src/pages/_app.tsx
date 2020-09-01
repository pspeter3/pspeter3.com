import { ComponentType, FC, useEffect } from "react";
import Router from "next/router";
import "../styles/style.css";
import { google } from "../config/analytics.json";

declare var gtag: UniversalAnalytics.ga;

export interface Props<T = {}> {
  Component: ComponentType<T>;
  pageProps: T;
}

const App: FC<Props> = ({ Component, pageProps }) => {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag("config", google, {
        page_path: url,
      });
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);
  return <Component {...pageProps} />;
};

export default App;
