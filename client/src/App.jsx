import './App.css';
import Header from './components/Header';
import SideBar from './components/SideBar';
function App() {
  return (
    <div className="App">
      <div>
        <Header></Header>
        <div className='d-flex'>
          <SideBar></SideBar>
          <div style={{width:'80vw', backgroundColor:'pink'}}>Main Area</div>
        </div>
      </div>
    </div>
  );
}

export default App;