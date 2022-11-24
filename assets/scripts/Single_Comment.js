// Single_Comment.js

class SingleComment extends HTMLElement {
    constructor() {
      super(); // Inheret everything from HTMLElement
    }
  }
  

  customElements.get('the-element')||customElements.define("the-element",SingleComment);