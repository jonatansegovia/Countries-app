import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SearchBar from './components/SearchBar/SearchBar';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import CountryDetail from './components/CountryDetail/CountryDetail';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <SearchBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/countries" component={Home} />
          <Route path="/countries/:idPais" component={CountryDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
