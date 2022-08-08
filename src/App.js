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

    this.library = CangjieLibrary.default;
    this.state = {
      Text: "",
      phrase: "",
      runtime: 0
    };
  }

  setText(text) {
    this.setState({ Text: text });
  }

  setPhrase(phrase) {
    this.setState({ phrase: phrase });
  }

  setRuntime(runtime) {
    this.setState({ runtime: runtime });
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
    const CangJieKeyboard = () => {
      return (<Keyboard mergeDisplay display={CangJieKeyBinding} physicalKeyboardHighlight />)
    };

    const onChange = (e) => {
      e.preventDefault();

      if (e.nativeEvent.inputType === "deleteContentBackward") {
        if (this.state.Text) this.setText(this.state.Text.slice(0, this.state.Text.lenght - 1)[0]);
      } else if (e.nativeEvent.inputType === "insertText") {  
          if (this.state.runtime >= 1 && e.nativeEvent.data === " ") {
            console.log(`${this.state.runtime}/${this.state.phrase}`);
            if (this.state.phrase) {
              let pattern = this.state.Text.slice(this.state.Text.lenght - this.state.runtime, this.state.Text.lenght)[0];
              console.log(pattern);
              console.log(this.state.Text.replace(pattern, this.library[this.state.phrase][0]));
              this.setText(this.state.Text.replace(pattern, this.library[this.state.phrase][0]));
              this.setPhrase("");
              this.setRuntime(0);
            } else {
              this.setText(this.state.Text + " ");
            }
          } else {
            if (e.nativeEvent.data === " ") {
              this.setText(this.state.Text + " ");
              this.setPhrase("");
              this.setRuntime(0);
            } else {
              this.setText(this.state.Text += this.library[e.nativeEvent.data][0]);
              this.setPhrase(this.state.phrase += e.nativeEvent.data);
              this.setRuntime(this.state.runtime + 1);

              console.log(this.state.runtime);
              console.log(this.state.phrase);
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
