/// <reference types="@kitajs/html/htmx.d.ts" />

namespace JSX {
  interface HtmlTag {
    // Hyperscript tag to insert JS
    ["_"]?: string;
    /**
     * Preload extension attribute.
     * string indicates a strategy ('mousedown','mouseover')
     * default (true) is 'mousedown'
     */
    ["preload"]?: true | string;
  }
}
