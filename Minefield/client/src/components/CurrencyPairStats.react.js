// @flow

/* Module imports */
import React, { PropTypes, PureComponent, Element } from 'react';
import type { Map as ImmutableMap } from 'immutable';

import CountryStats from './CountryStats.react'

import '../css/App.css';

type Props = {
  currencyPair: string,
  data: ImmutableMap<string, ImmutableMap<string, string>>
};

export default class CurrencyPairStats extends PureComponent<void, Props, void> {
  props: Props;

  render(): Element<any> {
    let key = 1;
    const cp = this.props.currencyPair;
    const stats: Array<Element<any>> = [];
    this.props.data.forEach((data, country) => {
      const reactKey: string = cp + ":" + country + ":" + key++;
      stats.push(<CountryStats key={reactKey} country={country} data={data} />);
    });
    return (
      <div className="App-Content-Main">
        Currency Pair: {cp}
        <div>
          {stats}
        </div>
      </div>
    );
  }
};
