import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom" 
import Header from "./Components/Header";
import Home from "./Pages/Home"
import CoinPage from './Pages/CoinPage';
function App() {

  return (
      <BrowserRouter>
        <div className="App">
          <Header /> 
          <Routes>
            <Route path='/' element={ <Home />} exact/>
            <Route path='/coins/:id' element={ <CoinPage/> } />
          </Routes>
        </div>
      </BrowserRouter>

  )
}

export default App
