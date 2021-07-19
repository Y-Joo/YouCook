import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from './pages/LandingPage/LandingPage';
import ResultPage from './pages/ResultPage/ResultPage';
import DetailPage from './pages/DetailPage/DetailPage';
import Header from './configs/Header/Header';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/result" component={ResultPage} />
          <Route exact path="/detail/:videoId" component={DetailPage} />
        </Switch>
    </Suspense>
  );
}

export default App;