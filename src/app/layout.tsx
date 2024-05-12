import Script from 'next/script';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="keywords" content="Design, Software, Web, Website, Studio, Agency, Responsive" />
        <meta name="author" content="Mobe Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Coming soon - Mobe Studio</title>
        <meta property="og:title" content="Mobe Studio" />
        <meta property="twitter:title" content="Mobe Studio" />
        <meta property="og:locale" content="en_US" />
        <meta name="description" content="Digital Experience studio based in Bergamo (Italy)" />
        <meta property="og:description" content="Digital Experience studio based in Bergamo (Italy)" />
        <meta property="twitter:description" content="Digital Experience studio based in Bergamo (Italy)" />
        <link rel="canonical" href="https://mobestudio.com/" />
        <meta property="og:url" content="https://mobestudio.com/" />
        <meta property="og:site_name" content="Mobe Studio" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:image" content="https://mobestudio.com/images/logo.png" />
        <meta prefix="og: http://ogp.me/ns#" name="og:title" property="og:title" content="Mobe Studio" />
        <meta prefix="og: http://ogp.me/ns#" name="og:type" property="og:type" content="website" />
        <meta
          prefix="og: http://ogp.me/ns#"
          name="og:image"
          property="og:image"
          content="https://mobestudio.com/images/logo.png"
        />
        <meta prefix="og: http://ogp.me/ns#" name="og:url" property="og:url" content="https://mobestudio.com/" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#505fec" />
        <meta name="msapplication-TileColor" content="#505fec" />
        <meta name="theme-color" content="#ffffff" />
        <Script
          id="microsoft-clarity-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "maw84uxpjh");
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
