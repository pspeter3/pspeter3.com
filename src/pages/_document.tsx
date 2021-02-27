import Document, { Html, Head, Main, NextScript } from "next/document";
import { google } from "../config/analytics.json";

export default class CustomDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang="en">
                <Head>
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${google}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${google}', {
              page_path: window.location.pathname,
            });
          `,
                        }}
                    />
                </Head>
                <body className="antialiased dark:bg-gray-900 bg-white">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
