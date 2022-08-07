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
    const library = CangjieLibrary.default;

    let runtime = 0;
    let phrase = "";

    this.setup(); // Toogle setup

    document.querySelector('textarea.App-textbox').addEventListener('change', (e) => {
      e.preventDefault();

      console.log(e);

      if (e.nativeEvent.inputType === "deleteContentBackward") {
        if (this.state.Text) this.setText(this.state.Text.slice(0, this.state.Text.lenght - 1)[0]);
      } else if (e.nativeEvent.inputType === "insertText") {
        if (!this.state.Text) {
          this.setText(library[e.nativeEvent.data][0]);
        } else {
          if (runtime === 4 && library[phrase][0]) {
            // this.setText(this.state.Text.slice(0, this.state.Text.lenght - 1)[0]);
          } else {
            let text = this.state.Text += library[e.nativeEvent.data][0];
            phrase += library[e.nativeEvent.data][0];

            this.setText(text);
            runtime++;
          }
        }
      }
      
    });

    window.addEventListener('keydown', (e) => {
      if (CangJieToogleKeyBinding[e.key]) {
        document.querySelector(`div.hg-button.hg-standardBtn[data-skbtn="${e.key}"]`).classList.add('toogle');
      }
    });

    window.addEventListener('keyup', (e) => {
      if (CangJieToogleKeyBinding[e.key]) {
        document.querySelector(`div.hg-button.hg-standardBtn.toogle[data-skbtn="${e.key}"]`).classList.remove('toogle');
      }
    });
  }

  render() {
    const CangJieKeyboard = () => {
      return <Keyboard mergeDisplay display={CangJieKeyBinding} physicalKeyboardHighlight />
    };

    return (
      <div className="App">
        <header className="App-header">
          <textarea className="App-textbox" value={this.state.Text}>
          </textarea>
        </header>
        <CangJieKeyboard />
      </div>
    );
  }
}

export default App;
