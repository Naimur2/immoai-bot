import React from "react";
import * as ReactDOM from "react-dom/client";
import ChatbotContent from "./components";
import chatStyles from "./styles/tailwind.txt";

class ChatbotElement extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getProps();
    this.root = ReactDOM.createRoot(this.shadowRoot!); // Use createRoot
    this.root.render(<ChatbotContent {...props} />);

    const style = document.createElement("style");
    const css = chatStyles;
    style.textContent = css;
    this.shadowRoot?.appendChild(style);
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount(); // Clean up on disconnect
    }
  }

  getProps() {
    return {
      apiKey: this.getAttribute("apiKey") ?? "",
      theme: this.getAttribute("theme") ?? "light",
    };
  }
}

customElements.define("chat-bot", ChatbotElement);
