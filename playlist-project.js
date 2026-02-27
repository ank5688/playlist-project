/**
 * Copyright 2026 Amelia Karamanos
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `playlist-project`
 * 
 * @demo index.html
 * @element playlist-project
 */
export class PlaylistProject extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "playlist-project";
  }

  constructor() {
    super();
    this.title = "";
    this.bodyText = "";
    this.slides = [
      {title: "Slide 1, subheading", bodyText: "Content for slide 1"},
      {title: "Slide 2", bodyText: "Content for slide 2"},
      {title: "Slide 3", bodyText: "Content for slide 3"},
      {title: "Slide 4", bodyText: "Content for slide 4"}
    ];
    this.currentIndex = 0;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
      bodyText: "Body text",
    };
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      bodyText: { type: String},
      slides: { type: Array },
      currentIndex: { type: Number }
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-default-beaver70);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--playlist-project-label-font-size, var(--ddd-font-size-s));
      }
      .demo {
        width: 300px;
        padding: var(--ddd-spacing-2);
        border: 1px solid var(--ddd-theme-primary);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 1);
      }
    `];
  }

  // Lit render the HTML
  render() {
    const slide = this.slides[this.currentIndex];
    return html`
<div class="wrapper">
  <h3><span>${slide.title}:</span> ${this.title}</h3>
  <p><span>${slide.bodyText}:</span> ${this.bodyText}</p>

  <button @click=${this._prevSlide}
    ?disabled="${this.currentIndex === 0}">
    < Prev
  </button>

  <button @click=${this._nextSlide}
    ?disabled="${this.currentIndex === this.slides.length - 1}">
    Next >
  </button>
  <slot></slot>
</div>`;
  }

  _nextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
    }
  }

  _prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}

globalThis.customElements.define(PlaylistProject.tag, PlaylistProject);