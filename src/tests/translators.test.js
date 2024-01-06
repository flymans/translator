import {handleTranslateToBBCode, handleTranslateToMarkdown} from '../components/app/translators';

describe('handleTranslateToBBCode', () => {
    it('should convert Markdown-like syntax to BBCode', () => {
        const mockSetter = jest.fn();
        const text = '# Header\n*italic* **bold**';

        handleTranslateToBBCode(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('[size=2]Header[/size]\n[i]italic[/i] [b]bold[/b]');
    });

    it('should handle nested bold within italic Markdown syntax', () => {
        const mockSetter = jest.fn();
        const text = 'This is **bold and *italic* text**';

        handleTranslateToBBCode(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('This is [b]bold and [i]italic[/i] text[/b]');
    });

    it('should handle combined bold and italic Markdown syntax', () => {
        const mockSetter = jest.fn();
        const text = 'This is ***bold and italic*** text';

        handleTranslateToBBCode(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('This is [i][b]bold and italic[/b][/i] text');
    });

    it('should correctly convert headers combined with bold or italic', () => {
        const mockSetter = jest.fn();
        const text = '# This is a **bold** header\n## This is an *italic* header';

        handleTranslateToBBCode(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('[size=2]This is a [b]bold[/b] header[/size]\n[size=3]This is an [i]italic[/i] header[/size]');
    });

    it('should correctly convert links and images from Markdown to BBCode', () => {
        const mockSetter = jest.fn();
        const text = '[Link text](https://example.com) and ![Image Alt](https://example.com/image.jpg)';

        handleTranslateToBBCode(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('[url=https://example.com]Link text[/url] and [img]https://example.com/image.jpg[/img]');
    });

    it('should handle complex nested Markdown structures', () => {
        const mockSetter = jest.fn();
        const text = 'Normal, *Italic, **Bold, ***Bold & Italic***, Bold**, Italic*';

        handleTranslateToBBCode(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('Normal, [i]Italic, [b]Bold, [i][b]Bold & Italic[/b][/i], Bold[/b], Italic[/i]');
    });

    it('should handle unordered lists from Markdown to BBCode', () => {
        const mockSetter = jest.fn();
        const text = '* Item 1\n* Item 2';

        handleTranslateToBBCode(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('[*]Item 1\n[*]Item 2');
    });
});

describe('handleTranslateToMarkdown', () => {
    let mockSetter;

    beforeEach(() => {
        mockSetter = jest.fn();
    });

    it('should convert basic BBCode to Markdown', () => {
        const text = '[b]Bold[/b] [i]Italic[/i]';
        handleTranslateToMarkdown(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('**Bold** *Italic*');
    });

    it('should handle nested formatting', () => {
        const text = '[b][i]Bold and Italic[/i][/b]';
        handleTranslateToMarkdown(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('***Bold and Italic***');
    });

    it('should not convert escaped BBCode tags', () => {
        const text = '\\[b\\]Not Bold\\[\\/b\\]';
        handleTranslateToMarkdown(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('[b]Not Bold[/b]');
    });

    it('should handle multiple instances of the same tag', () => {
        const text = '[b]Bold[/b] and [b]More Bold[/b]';
        handleTranslateToMarkdown(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('**Bold** and **More Bold**');
    });

    it('should correctly handle empty tags', () => {
        const text = '[b][/b]';
        handleTranslateToMarkdown(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('');
    });

    it('should handle mixed content', () => {
        const text = 'Plain [b]Bold[/b] Plain';
        handleTranslateToMarkdown(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('Plain **Bold** Plain');
    });

    it('should convert links', () => {
        const text = '[url=http://example.com]Example[/url]';
        handleTranslateToMarkdown(text, mockSetter)();
        expect(mockSetter).toHaveBeenCalledWith('[Example](http://example.com)');
    });
});
