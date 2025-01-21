import { handleTranslate } from '../components/app/translators';

describe('English-to-Russian Keyboard Mapping', () => {
  test('should convert the given transliterated input to the expected Russian string', () => {
    const input =
      "C lheujq cnjhjys? z gj ct,t ce;e? njn BBgthtdjlxbr xnj ,sk gfhe ktn yfpfl b ctqxfc - yt,j b ptvkz///gjnjve yt ,eltv njhjgbnmcz///";
    const expected =
      "С другой стороны, я по себе сужу, тот ИИпереводчик что был пару лет назад и сейчас - небо и земля...потому не будем торопиться...";
    
    const setter = jest.fn();
    
    handleTranslate(input, setter)({ target: { name: 'RU' } });

    expect(setter).toHaveBeenCalledWith(expected);
  });
});
