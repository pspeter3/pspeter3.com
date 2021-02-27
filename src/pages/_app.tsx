import { ComponentType, FC, useEffect } from "react";
import Router from "next/router";
import "tailwindcss/tailwind.css";
import { google } from "../config/analytics.json";
import { NextWebVitalsMetric } from "next/dist/next-server/lib/utils";

declare let gtag: UniversalAnalytics.ga;

// eslint-disable-next-line  @typescript-eslint/ban-types
export interface Props<T = {}> {
    Component: ComponentType<T>;
    pageProps: T;
}

export function reportWebVitals({
    id,
    name,
    label,
    value,
}: NextWebVitalsMetric): void {
    gtag("send", "event", {
        eventCategory:
            label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
        eventAction: name,
        eventValue: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
        eventLabel: id, // id unique to current page load
        nonInteraction: true, // avoids affecting bounce rate.
    });
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
