// @flow

/* Module imports */
import React, { PureComponent, Element } from 'react';
import PropTypes from 'prop-types';

/* Media imports */
import logo from '../images/logo.svg';
import '../css/App.css';


class AppHeader extends PureComponent {
  render(): Element<any> {
    let logoClasses = ['App-Header-Logo', 'App-Logo'];
    let {animate, children, ...props} = this.props;

    if (animate) {
      logoClasses.push('App-Logo-Animated');
    }

    return (
      <div {...props}>
        <img src={logo} className={logoClasses.join(" ")} alt="logo" />
        <div className="App-Header-Text">
          {children}
        </div>
      </div>
    );
  }
};

AppHeader.propTypes = {
  ...PureComponent.propTypes,
    animate: PropTypes.bool,
};

export default AppHeader
