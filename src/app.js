const {html, render} = require('../node_modules/lit-html/lit-html.js'); 

const MyComponentTemplate = (name, foo) => html`
  <div>Hello, ${name}! (${foo})</div>
`;

class MyComponent extends HTMLElement {
  constructor() {
    super();
    this.renderCallback();
  }

  static get observedAttributes() {
    return ['name', 'foo'];
  }

  get name() {
    return this._name === undefined ? 'Benjamin' : this._name;
  }

  get foo() {
    return this._foo === undefined ? 2 : this._foo;
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    switch(attrName) {
      case 'name': this._name = newValue; break;
      case 'foo': this._foo = parseInt(newValue, 10); break;
    }

    this.renderCallback();
  }

  renderCallback() {
    render(MyComponentTemplate(this.name, this.foo), this);
  }
}

customElements.define('my-component', MyComponent);