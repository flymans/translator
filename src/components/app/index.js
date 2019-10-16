import React, {useState} from 'react';
import {Form, Input} from 'semantic-ui-react';
import Wrapper from './styled';
import {dictionaryEnToRu, dictionaryEnToRuUpperCase} from './dictionary';

const App = () => {
    const translate = text =>
        text
            .split('')
            .map(
                char =>
                    dictionaryEnToRu[char] ||
                    dictionaryEnToRuUpperCase[char] ||
                    char
            )
            .join('');

    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const handleTextChange = ({target: {value}}) => {
        setText(value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setTranslatedText(translate(text));
        setText('');
    };
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <Input
                        onChange={handleTextChange}
                        placeholder="Type text..."
                        action="Translate"
                        value={text}
                    />
                </Form.Field>
            </Form>
            {translatedText}
        </Wrapper>
    );
};

export default App;
