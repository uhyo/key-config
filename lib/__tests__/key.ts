import { expect } from 'chai';
import { keyStringify } from '../key';

describe('IKey', () => {
    it('stringifies a plain key Object', () => {
        const res = keyStringify({
            altKey: false,
            ctrlKey: false,
            key: 'H',
            metaKey: false,
            shiftKey: false,
        });
        expect(res).to.equal('H');
    });
    it('stringifies a shift-key object', () => {
        const res = keyStringify({
            altKey: false,
            ctrlKey: false,
            key: 'RightArrow',
            metaKey: false,
            shiftKey: true,
        });
        expect(res).to.equal('Shift+RightArrow');
    });
    it('stringifies a ctrl-key object', () => {
        const res = keyStringify({
            altKey: false,
            ctrlKey: true,
            key: '3',
            metaKey: false,
            shiftKey: false,
        });
        expect(res).to.equal('Ctrl+3');
    });
    it('stringifies an alt-key object', () => {
        const res = keyStringify({
            altKey: true,
            ctrlKey: false,
            key: 'Y',
            metaKey: false,
            shiftKey: false,
        });
        expect(res).to.equal('Alt+Y');
    });
    it('stringifies a meta-key object', () => {
        const res = keyStringify({
            altKey: false,
            ctrlKey: false,
            key: 'P',
            metaKey: true,
            shiftKey: false,
        });
        expect(res).to.equal('Meta+P');
    });
    it('stringifies a combined key object', () => {
        const res = keyStringify({
            altKey: true,
            ctrlKey: true,
            key: 'A',
            metaKey: true,
            shiftKey: true,
        });
        expect(res).to.equal('Meta+Ctrl+Alt+Shift+A');
    });
    it('stringifies a space key', () => {
        const res = keyStringify({
            altKey: false,
            ctrlKey: true,
            key: ' ',
            metaKey: false,
            shiftKey: false,
        });
        expect(res).to.equal('Ctrl+Space');
    });
});
