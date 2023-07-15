import React, {useState} from 'react';
import {Header, Flag, Button, Form, TextArea, Divider} from 'semantic-ui-react';
import {Wrapper, ButtonBar, TextAreaBar} from './styled';
import GlobalStyle from './globalStyle';
import {handleTranslate, handleTranslateToBBCode, handleTranslateToMarkdown} from './translators';

function App() {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const handleTextChange = ({target: {value}}) => {
        setText(value);
    };

    return (
        <Wrapper>
            <GlobalStyle />
            <Header as="h1">Useless Internet translator</Header>
            <Form>
                <ButtonBar>
                    <Button onClick={handleTranslate(text, setTranslatedText)} name="RU">
                        <Flag name="ru" />
                        Translate to RU
                    </Button>
                    <Button onClick={handleTranslate(text, setTranslatedText)} name="EN">
                        <Flag name="gb" />
                        Translate to EN
                    </Button>
                    <Button onClick={handleTranslateToBBCode(text, setTranslatedText)}>Translate to BBCode</Button>
                    <Button onClick={handleTranslateToMarkdown(text, setTranslatedText)}>Translate to Markdown</Button>
                </ButtonBar>
                <Divider />
                <TextAreaBar>
                    <TextArea rows="5" onChange={handleTextChange} placeholder="Type text..." value={text} />
                    <Divider />
                    <TextArea rows="5" placeholder="Translation will be shown here..." value={translatedText} />
                </TextAreaBar>
            </Form>
        </Wrapper>
    );
}
export default App;
