
import './App.css';
import Header from './components/Header';
import {Routes, Route} from "react-router";
import Home from './pages/home';
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';
import SalonPage from './pages/salonPage';
import SearchResult from './components/SearchResult';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route exact path={"/"} element={<Home/>}/>
        <Route exact path={"/connexion"} element={<Connexion/>}/>
        <Route exact path={"/inscription"} element={<Inscription/>}/>
        <Route exact path ={"/salonPage/:id"} element={<SalonPage/>}/>
        <Route exact path={"/searchResult"} element={<SearchResult/>}/>
      </Routes>
    </div>
  );
}

export default App;
