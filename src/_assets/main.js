import "./style.css";

window.addEventListener(
  "load",
  () => {
    const id = "UA-42476212-1";
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      `https://www.googletagmanager.com/gtag/js?id=${id}`,
    );
    document.body.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", id);
  },
  { once: true },
);
