import './App.css';
import ButtonAppBar from './Menu/Menu';
import AddQuestion from './Add/Add.js';
import CreatePaper from './CreatePaper/CreatePaper.js';
function App() {
  return (<div>
    <ButtonAppBar></ButtonAppBar>
    <div className='row' style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
      <AddQuestion className="col-md-6"></AddQuestion>
      <CreatePaper className="col-md-6"></CreatePaper>
    </div>
  </div>
  );
}

export default App;
