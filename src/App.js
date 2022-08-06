import './App.css';
import 'react-simple-keyboard/build/css/index.css';

import { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import CangjieLibrary from './Odessa/index.js';
import CangJieKeyBinding from './CangJieKeyBinding.json'
import CangJieToogleKeyBinding from './CangJieKeyBinding.json'

const CangJieKeyboard = () => {
  return <Keyboard mergeDisplay display={CangJieKeyBinding} physicalKeyboardHighlight />
};

function App() {
  const library = CangjieLibrary.default;
  let [Text, setText] = useState("");
  let runtime = 0;
  let phrase = "";

  const onChange = (e) => {
    e.preventDefault();

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      setText(Text.slice(0, Text.lenght - 1)[0]);
    } else if (e.nativeEvent.inputType === "insertText") {
      if (Text === "") {
        setText(library[e.nativeEvent.data][0]);
      } else {
        let text = Text += library[e.nativeEvent.data][0];
        setText(text);
      }
    }

    
    runtime++;
  };

  return (
    <div className="App">
      <header className="App-header">
        <textarea className="App-textbox" onChange={onChange} value={Text}>
        </textarea>
      </header>
      <CangJieKeyboard />
    </div>
  );
}

export default App;
