import React, { Component } from 'react';
import { BrowserRouter ,Route, Switch ,Redirect} from 'react-router-dom';
import Layout from './hocs/Layout';
import Auctions from './containers/Auctions/Auctions'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path='/auctions' component={Auctions} /> 
            <Redirect from="/" to="/auctions" />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}


export default App;