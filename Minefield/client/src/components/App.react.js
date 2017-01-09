// @flow

/* Module imports */
import React, { Component, Element } from 'react';
import AppHeader from './AppHeader.react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import  * as actionCreators from '../redux/Actions';

import type { Dispatch } from '../redux/Actions';
import type { State, TransactionStats } from '../redux/Store';

import CurrencyPairStats from './CurrencyPairStats.react'

import '../css/App.css';

class App extends Component {

  props: {
    state: State,
    store: Object,
    actions: Object,
  };

  componentDidMount(): void {
    const { getTransactionStream } = this.props.actions;
    getTransactionStream();
  }

  render(): Element<any> {
    const { state } = this.props;
    const data: TransactionStats = state.data;
    let content: any = "Waiting for data stream...";

    if (data.size > 0) {
      content = data.map(
        (stats, cp) => <CurrencyPairStats currencyPair={cp} data={stats} />
      );
    }

    return (
      <div className="App">
        <AppHeader className="App-Header" animate={true}>
          <div style={{fontSize: '24pt', order: 1}}>
            Welcome to minefield. Helmets on!
          </div>
          <div style={{fontSize: '12pt', order: 2, color: "#C3C3C3"}}>
            Transaction streamer front-end
          </div>
        </AppHeader>
        <div className="App-Content-Container">
          {content}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: State): Object {
  return { state: state };
}

function mapDispatchToProps(dispatch: Dispatch): Object {
  const actions = bindActionCreators({ ...actionCreators }, dispatch);
  return { actions: actions };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
