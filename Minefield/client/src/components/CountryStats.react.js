// @flow

/* Module imports */
import React, { PropTypes, PureComponent, Element } from 'react';
import type { Map as ImmutableMap } from 'immutable';

import '../css/App.css';

type Props = {
  country: string,
  data: ImmutableMap<string, any>
};

export default class CountryStats extends PureComponent<void, Props, void> {
  props: Props;

  render(): Element<any> {
    let key = 1;
    const country = this.props.country;
    const data = this.props.data;
    return (
      <div className="App-Content-Secondary">
        Country: {country}
        <ul>
          <li><strong>Transactions:</strong> {data.get('transactionCount')}</li>
          <li><strong>Average rate:</strong> {data.get('avgExchangeRate')}</li>
          <li><strong>Average size:</strong> {data.get('avgTransactionSize')}</li>
        </ul>
      </div>
    );
  }
};
