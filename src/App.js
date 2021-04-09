import './App.css';
import Jumbotron from "./components/Jumbotron/Jumbotron";
import Table from './components/Table/Table';

function App() {
  return (
    <div className="App">
      <Jumbotron />
      <div class="table">
      <Table />
      </div>
    </div>
  );
}

export default App;
