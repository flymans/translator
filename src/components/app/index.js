import React, {useState} from 'react';
import {Header, Flag, Button, Form, TextArea, Divider} from 'semantic-ui-react';
import {Wrapper, ButtonBar, TextAreaBar} from './styled';
import GlobalStyle from './globalStyle';
import dictionary from './dictionary';

const App = () => {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleTextChange = ({target: {value}}) => {
        setText(value);
    };

    const handleTranslate = ({target: {name: lang}}) => {
        setTranslatedText(
            text
                .split('')
                .map(
                    char =>
                        dictionary[lang][0][char] ||
                        dictionary[lang][1][char] ||
                        char
                )
                .join('')
        );
    };

    return (
        <Wrapper>
            <GlobalStyle />
            <Header as="h1">Useless Internet translator</Header>
            <Form>
                <ButtonBar>
                    <Button onClick={handleTranslate} name="RU">
                        <Flag name="ru" />
                        Translate to RU
                    </Button>
                    <Button onClick={handleTranslate} name="EN">
                        <Flag name="gb" />
                        Translate to EN
                    </Button>
                </ButtonBar>
                <Divider />
                <TextAreaBar>
                    <TextArea
                        rows="5"
                        onChange={handleTextChange}
                        placeholder="Type text..."
                        value={text}
                    />
                    <Divider />
                    <TextArea
                        rows="5"
                        placeholder="Translation will be shown here..."
                        value={translatedText}
                    />
                </TextAreaBar>
            </Form>
        </Wrapper>
    );
};
export default App;
