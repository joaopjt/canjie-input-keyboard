import './App.css';
import 'react-simple-keyboard/build/css/index.css';

import Keyboard from 'react-simple-keyboard'
import CangJieKeyBinding from './CangJieKeyBinding.json'

const CangJieKeyboard = () => {
  return <Keyboard mergeDisplay display={CangJieKeyBinding} physicalKeyboardHighlight />
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <CangJieKeyboard />
    </div>
  );
}

export default App;
