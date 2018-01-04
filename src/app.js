const {html, render} = require('../node_modules/lit-html/lit-html.js'); 

class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.renderCallback();
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback() {
    this.renderCallback();
  }

  getAttributes() {
    return {
      name: this.getAttribute('name')
    };
  }

  renderCallback({name} = this.getAttributes()) {
    render(html`Hello, ${name}!`, this);
  }
}

customElements.define('my-component', MyComponent);