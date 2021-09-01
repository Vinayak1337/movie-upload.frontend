import { FC } from 'react';
import { Header } from '../Components/Header';
import './App.scss';
import { Route, Switch } from 'react-router-dom'
import { ErrorPage, Home } from '../Pages';

const App: FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={ErrorPage} />
      </Switch>
    </>
  );
}

export default App;
