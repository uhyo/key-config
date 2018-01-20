/**
 * Registory of DocumentFragments corresponding to each template.
 */
const registory = new WeakMap<TemplateStringsArray, DocumentFragment>();

/**
 * Create and reuse a documentfragment from an HTML string.
 */
export function fragment(strings: TemplateStringsArray, ...values: string[]): DocumentFragment {
    const cache = registory.get(strings);
    if (cache != null){
        return cache.cloneNode(true) as DocumentFragment;
    }
    let html = '';
    const l = strings.length;
    if (l > 0){
        html += strings[0];
    }
    for (let i = 1; i < l; i++) {
        html += values[i-1];
        html += strings[i];
    }

    // Parse HTML using insertAdjacentHTML.
    const div = document.createElement('div');
    div.insertAdjacentHTML('afterbegin', html);
    const f = document.createDocumentFragment();
    while (div.firstChild) {
        f.appendChild(div.firstChild);
    }
    registory.set(strings, f);
    return f.cloneNode(true) as DocumentFragment;
}
