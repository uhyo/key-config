import {
    keyStringify,
} from '../key';

describe('IKey', ()=>{
    it('stringifies a plain key Object', ()=>{
        const res = keyStringify({
            altKey: false,
            ctrlKey: false,
            key: 'H',
            metaKey: false,
            shiftKey: false,
        });
        expect(res).toBe('H');
    });
    it('stringifies a shift-key object', ()=>{
        const res = keyStringify({
            altKey: false,
            ctrlKey: false,
            key: 'RightArrow',
            metaKey: false,
            shiftKey: true,
        });
        expect(res).toBe('Shift+RightArrow');
    });
    it('stringifies a ctrl-key object', ()=>{
        const res = keyStringify({
            altKey: false,
            ctrlKey: true,
            key: '3',
            metaKey: false,
            shiftKey: false,
        });
        expect(res).toBe('Ctrl+3');
    });
    it('stringifies an alt-key object', ()=>{
        const res = keyStringify({
            altKey: true,
            ctrlKey: false,
            key: 'Y',
            metaKey: false,
            shiftKey: false,
        });
        expect(res).toBe('Alt+Y');
    });
    it('stringifies a meta-key object', ()=>{
        const res = keyStringify({
            altKey: false,
            ctrlKey: false,
            key: 'P',
            metaKey: true,
            shiftKey: false,
        });
        expect(res).toBe('Meta+P');
    });
    it('stringifies a combined key object', ()=>{
        const res = keyStringify({
            altKey: true,
            ctrlKey: true,
            key: 'A',
            metaKey: true,
            shiftKey: true,
        });
        expect(res).toBe('Meta+Ctrl+Alt+Shift+A');
    });
});
