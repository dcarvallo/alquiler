import './App.css';
import Header from './Components/Header'
import Contenido from './Components/Contenido';
import CreateForm from './Components/CreateForm';
import {Routes,Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Header />
      <div className='max-w-2xl md:max-w-7xl mx-auto'>

      <Routes>
        <Route path="/" element={<Contenido />} />
        <Route path="/createForm" element={<CreateForm />} />
      </Routes>
      </div>

      {/* <Contenido /> */}
    </div>
  );
}

export default App;
