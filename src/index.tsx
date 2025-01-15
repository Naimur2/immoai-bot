import * as ReactDOM from "react-dom/client";
import Chatbot from "./components/ChatBot";
import "./index.css";
import React from "react";
import chatStyles from "./styles/tailwind.css";



class ChatbotElement extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getProps();
    this.root = ReactDOM.createRoot(this.shadowRoot!); // Use createRoot
    this.root.render(<Chatbot {...props} />);

    const style = document.createElement("style");
    const css = chatStyles.toString();
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
