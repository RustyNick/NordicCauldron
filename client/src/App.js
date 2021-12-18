import './App.css';
import Header from './components/header';
import Customers from './components/customers/customers';
import Button from '@material-ui/core/Button'

function App() {
  return (
    <div className="App">
      <Header />
      <Customers />

    </div>
  );
}

export default App;
