import React, { Component } from "react";
import ReactDOM from "react-dom";
import Details from "./components/Details";
import Home from "./components/Home";
import TransitionList from "./components/TransitionList";
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
// require("bootstrap/less/bootstrap.less");

export default class App extends Component {

  render() {
    return (
      <div>{this.props.children}</div>
    )
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="pokemon" component={Details} />
      <Route path="list" component={TransitionList} />
    </Route>
  </Router>

), document.getElementById('root'))
