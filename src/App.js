import './App.css';
import 'react-simple-keyboard/build/css/index.css';

import { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import CangjieLibrary from './Odessa/index.js';
import CangJieKeyBinding from './CangJieKeyBinding.json'
import CangJieToogleKeyBinding from './CangJieKeyBinding.json'

const handleKeyDown = (e) => {
  console.log(e);
};

const CangJieKeyboard = () => {
  return <Keyboard mergeDisplay display={CangJieKeyBinding} physicalKeyboardHighlight />
};

function App() {
  const [Text, setText] = useState("");
  let runtime = 0;
  let phrase = "";

  const onChange = (e) => {
    e.preventDefault();
    setText(CangjieLibrary.default[e.nativeEvent.data][0]);
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
