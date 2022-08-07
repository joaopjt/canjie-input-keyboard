import './App.css';
import 'simple-keyboard/build/css/index.css';

import React from 'react';
import Keyboard from 'react-simple-keyboard';
import CangjieLibrary from './Odessa/index.js';
import CangJieKeyBinding from './CangJieKeyBinding.json';
import CangJieToogleKeyBinding from './CangJieKeySoundBinding.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Text: ""
    };
  }

  setText(text) {
    this.state.Text = text;
  }

  setup() {
    Object.keys(CangJieKeyBinding).forEach((k) => {
      let button = document.querySelector(`div.hg-button.hg-standardBtn[data-skbtn="${k}"]`);
      
      if (button) {
        let toogle = document.createElement('span');
        toogle.classList.add('toogle');
        toogle.innerHTML = CangJieToogleKeyBinding[k];

        button.appendChild(toogle);  
      }
    });
  };

  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      let button = null;
      if (e.isComposing && CangJieToogleKeyBinding[e.key]) {
        button = document.querySelector(`div.hg-button.hg-standardBtn[data-skbtn="${e.key}"]`);
        button.classList.add('toogle');
      }
    });

    window.addEventListener('keyup', (e) => {
      let button = document.querySelector(`div.hg-button.hg-standardBtn[data-skbtn="${e.key}"]`);

      if (button) button.removeClass('toogle');
    })

    this.setup();
  }

  render() {
    const library = CangjieLibrary.default;
    const CangJieKeyboard = () => {
      return <Keyboard mergeDisplay display={CangJieKeyBinding} physicalKeyboardHighlight />
    };

    let runtime = 0;
    let phrase = "";

    const onChange = (e) => {
      e.preventDefault();

      if (e.nativeEvent.inputType === "deleteContentBackward") {
        if (this.state.Text) this.setText(Text.slice(0, Text.lenght - 1)[0]);
      } else if (e.nativeEvent.inputType === "insertText") {
        if (this.state.Text === "") {
          this.setText(library[e.nativeEvent.data][0]);
        } else {
          if (runtime === 4 && library[phrase][0]) {
            console.log('dictionary word');
          } else {
            let text = Text += library[e.nativeEvent.data][0];
            this.setText(text);
            runtime++;
          }
        }
      }
      
    };

    return (
      <div className="App">
        <header className="App-header">
          <textarea className="App-textbox" onChange={onChange}>
            {this.state.Text}
          </textarea>
        </header>
        <CangJieKeyboard />
      </div>
    );
  }
}

export default App;
