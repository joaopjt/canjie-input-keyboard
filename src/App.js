import './App.css';
import 'simple-keyboard/build/css/index.css';

import { useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import CangjieLibrary from './Odessa/index.js';
import CangJieKeyBinding from './CangJieKeyBinding.json';
import CangJieToogleKeyBinding from './CangJieKeySoundBinding.json';

const setup = () => {
  Object.keys(CangJieToogleKeyBinding).forEach((key) => {
    let button = document.querySelector(`div.hg-button.hg-standardBtn[data-skbtn="${key}"]`);

    let toogle = document.createElement('span');
    toogle.innerHTML = ` ${CangJieToogleKeyBinding[key]}`;

    button.appendChild(toogle);
  });
};

const CangJieKeyboard = () => {
  return <Keyboard mergeDisplay display={CangJieKeyBinding} physicalKeyboardHighlight />
};

// window.addEventListener('keydown', (e) => {
//   let button = null;
//   if (e.isComposing && CangJieToogleKeyBinding[e.key]) {
//     button = document.querySelector(`div.hg-button.hg-standardBtn[data-skbtn="${e.key}"]`);
//     button.addClass('toogle');
//   } else {
//     if (button) button.removeClass('toogle');
//   }
// });

// setup();

function App() {
  const library = CangjieLibrary.default;
  let [Text, setText] = useState("");
  let runtime = 0;
  let phrase = "";

  const onChange = (e) => {
    e.preventDefault();

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      if (Text) setText(Text.slice(0, Text.lenght - 1)[0]);
    } else if (e.nativeEvent.inputType === "insertText") {
      if (Text === "") {
        setText(library[e.nativeEvent.data][0]);
      } else {
        if (runtime) {

        } else {
          let text = Text += library[e.nativeEvent.data][0];
          setText(text);
          runtime++;
        }
      }
    }
    
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
