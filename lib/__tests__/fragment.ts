import { expect, use } from 'chai';
import { matchSnapshot } from 'chai-karma-snapshot';

import { fragment } from '../fragment';

use(matchSnapshot);

describe('fragment', () => {
    it('generates a correct HTML tree', () => {
        const tree = fragment`
            <div><p>Hey!</p></div>
        `;

        expect(tree.nodeType).to.be.equal(Node.DOCUMENT_FRAGMENT_NODE);
        expect(wrap(tree)).to.matchSnapshot();
    });
    it('can handle placeholders', () => {
        const foo = 'foo';
        const bar = 'bar';
        const tree = fragment`
            <div>
                <p>${foo}</p>
                <div>${bar}</div>
            </div>`;

        expect(wrap(tree)).to.matchSnapshot();
    });
    it('Generates new DocumentFragments for same input', () => {
        const tree1 = fragment`
            <div><p>Hey!3</p></div>
        `;
        const tree2 = fragment`
            <div><p>Hey!3</p></div>
        `;

        expect(wrap(tree1)).to.matchSnapshot();
        expect(wrap(tree2)).to.matchSnapshot();
    });
});

/**
 * Wrap a documentfragment by div.
 */
function wrap(f: DocumentFragment): HTMLElement {
    const div = document.createElement('div');
    div.appendChild(f);
    return div;
}
