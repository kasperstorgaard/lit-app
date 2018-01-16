const {html, render} = require('../node_modules/lit-html/lit-html.js'); 

const MyComponentTemplate = (name, foo) => html`
  <div>Hello, ${name}! (${foo})</div>
`;

class MyComponent extends HTMLElement {
  constructor() {
    super();

    // Defaults
    this.name = 'Benjamin';
    this.foo = 2;

    this.renderCallback();
  }

  static get observedAttributes() {
    return ['name', 'foo'];
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    switch(attrName) {
      case 'name': this.name = newValue; break;
      case 'foo': this.foo = parseInt(newValue, 10); break;
    }

    this.renderCallback();
  }

  renderCallback() {
    render(MyComponentTemplate(this.name, this.foo), this);
  }
}

customElements.define('my-component', MyComponent);