/**
 * Create and reuse a documentfragment from an HTML string.
 */
export function fragment(strings: TemplateStringsArray, ...values: string[]): DocumentFragment {
    if ((strings as any).fragment) {
        // If this fragment has a cache, clone and return it.
        return (strings as any).fragment.cloneNode();
    }
    let html = '';
    const l = strings.length;
    for (let i = 0; i < l; i++) {
        html += strings[i];
        html += values[i];
    }
    html += strings[l];

    // Parse HTML using insertAdjacentHTML.
    const div = document.createElement('div');
    div.insertAdjacentHTML('afterbegin', html);
    const f = document.createDocumentFragment();
    while (div.firstChild) {
        f.appendChild(div.firstChild);
    }

    (strings as any).fragment = f;
    return f.cloneNode() as DocumentFragment;
}
