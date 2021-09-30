import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import CountryDetail from './components/CountryDetail/CountryDetail';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
