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
      text: "",
      phrase: "",
      runtime: 0
    };
  }

  setText(t) {
    this.setState({ text: t });
  }

  setPhrase(p) {
    this.setState({ phrase: p });
  }

  setRuntime(r) {
    this.setState({ runtime: r });
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
    document.querySelector('html').addEventListener('keydown', (e) => {
      if (CangJieToogleKeyBinding[e.key]) {
        document.querySelector(`div.hg-button.hg-standardBtn[data-skbtn="${e.key}"]`).classList.add('toogle');
      }
    });

    document.querySelector('html').addEventListener('keyup', (e) => {
      if (CangJieToogleKeyBinding[e.key]) {
        let button = document.querySelector(`div.hg-button.hg-standardBtn.toogle[data-skbtn="${e.key}"]`);

        if (button) button.classList.remove('toogle');
      }
    });

    this.setup();
  }

  render() {
    const onChange = (e) => {
      if (e.nativeEvent.inputType === "deleteContentBackward") {
        if (this.state.text && this.state.phrase.length) {
          let t = "";
          
          Object(String(this.state.text)).values().forEach(text => {
            Object(this.library).values().map((v) => v === text).forEach(vv => {
              t += vv;
            });  
          });
          
          this.setPhrase(t);
        } else {
          this.setPhrase("");
        }

        if (this.state.text && this.state.runtime >= 1) {
          this.setRuntime(this.state.runtime - 1);
        } else {
          this.setRuntime(0);
        }
      } else if (e.nativeEvent.inputType === "insertText") {
        e.preventDefault();

        if (this.state.runtime >= 1 && e.nativeEvent.data === " " && this.library[this.state.phrase]) {
          let start = this.state.text.length - this.state.runtime;
          let pattern = this.state.text.slice(start, this.state.text.length);
          
          this.setText(this.state.text.replace(pattern, this.library[this.state.phrase][0]));
          this.setPhrase("");
          this.setRuntime(0);
        } else {
          if (e.nativeEvent.data === " ") {
            let text = this.state.text || "";

            this.setText(text + " ");
            this.setPhrase("");
            this.setRuntime(0);
          } else {
            let text = this.state.text || "";

            this.setText(text += this.library[e.nativeEvent.data]);
            this.setPhrase(this.state.phrase += e.nativeEvent.data);
            this.setRuntime(this.state.runtime + 1);
          }
        }
      }
    };

    /* 
    <header className="App-header">
      <textarea className="App-textbox" value={this.state.text} onChange={onChange}>
      </textarea>
    </header>
    */

    return (
      <div className="App">    
        <Keyboard mergeDisplay display={CangJieKeyBinding} physicalKeyboardHighlight />
      </div>
    );
  }
}

export default App;
