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
    this.setState({ Text: text });
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
    this.setup(); // Toogle setup

    window.addEventListener('keydown', (e) => {
      if (CangJieToogleKeyBinding[e.key]) {
        document.querySelector(`div.hg-button.hg-standardBtn[data-skbtn="${e.key}"]`).classList.add('toogle');
      }
    });

    window.addEventListener('keyup', (e) => {
      if (CangJieToogleKeyBinding[e.key]) {
        let button = document.querySelector(`div.hg-button.hg-standardBtn.toogle[data-skbtn="${e.key}"]`);
        if (button) button.classList.remove('toogle');
      }
    });
  }

  render() {
    const library = CangjieLibrary.default;
    let runtime = 0;
    let phrase = "";

    const CangJieKeyboard = () => {
      return <Keyboard mergeDisplay display={CangJieKeyBinding} physicalKeyboardHighlight />
    };

    const onChange = (e) => {
      e.preventDefault();

      if (e.nativeEvent.inputType === "deleteContentBackward") {
        if (this.state.Text) this.setText(this.state.Text.slice(0, this.state.Text.lenght - 1)[0]);
      } else if (e.nativeEvent.inputType === "insertText") {  
          if (runtime >= 4 && e.nativeEvent.data === " ") {
            let phrase = this.state.Text.slice(this.state.Text.lenght - runtime, this.state.Text.lenght)[0];

            if (phrase) {
              this.setText(this.state.Text.slice(this.state.Text.lenght)[0], this.state.Text.lenght - runtime);
              this.setText(this.state.Text + library[phrase][0]);
              phrase = "";
            } else {
              this.setText(this.state.Text + " ");
            }
          } else {
            if (e.nativeEvent.data === " ") {
              this.setText(this.state.Text + " ");
            } else {
              let text = this.state.Text += library[e.nativeEvent.data][0];
              phrase += library[e.nativeEvent.data][0];

              this.setText(text);
              runtime++;
            }
          }
      }
    };

    return (
      <div className="App">
        <header className="App-header">
          <textarea className="App-textbox" value={this.state.Text} onChange={onChange}>
          </textarea>
        </header>
        <CangJieKeyboard />
      </div>
    );
  }
}

export default App;
