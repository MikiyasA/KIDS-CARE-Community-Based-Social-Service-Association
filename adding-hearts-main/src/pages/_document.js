import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function MyDocument() {
  return (
    <Html
      lang="en"
      className="fontawesome-i2svg-active fontawesome-i2svg-complete">
      <Head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "m9u021q3zv");`,
          }}
        />
      </Head>
      <Script
        src="https://unpkg.com/swiper/swiper-bundle.min.js"
        strategy="beforeInteractive"
      />
      <body data-aos-easing="ease" data-aos-duration="1000" data-aos-delay="0">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
