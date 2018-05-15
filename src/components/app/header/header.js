// Copyright (c) Microsoft. All rights reserved.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumbs } from './breadcrumbs';
import { Svg } from 'components/shared';
import { svgs } from 'utilities';
import ProfileImagePath from 'assets/images/profile.png';

import './header.css';

const docsDropdown = 'docsDropdown';
const profileDropdown = 'profileDropdown';

const parentHasClass = (element, ...searchClasses) => {
  if (
    typeof element.className === 'string'
    && element.className
        .split(' ')
        .some(classname =>
          searchClasses.some(searchClass => searchClass === classname)
        )
  ) return true;
  return element.parentNode && parentHasClass(element.parentNode, ...searchClasses);
};

/** The header component for the top of the page */
class Header extends Component {

  constructor(props) {
    super(props);

    this.state = { openDropdown: '' };
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.handleWindowMousedown);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.handleWindowMousedown);
  }

  handleWindowMousedown = ({ target }) => {
    const isMenuTrigger = parentHasClass(target, 'menu-item', 'menu-trigger');
    if (!isMenuTrigger && this.state.openDropdown) {
      this.setState({ openDropdown: '' });
    }
  }

  logout = () => {
    this.setState({ openDropdown: '' });
    this.props.logout();
  }

  toggleDropdown = (openDropdown) => () => this.setState({ openDropdown });

  render() {
    return (
      <header className="app-header" role="banner">
        <div className="breadcrumbs">
          <Breadcrumbs t={this.props.t} />
        </div>
        <div className="label">{ this.props.t('header.appName') }</div>
        <div className="items-container">
          <div className="menu-container">
            <button className="menu-trigger" onClick={this.toggleDropdown(docsDropdown)}>
              <Svg path={svgs.questionMark} className="item-icon" />
            </button>
            {
              this.state.openDropdown === docsDropdown &&
              <div className="menu">
                <Link className="menu-item"
                  target="_blank"
                  to="https://docs.microsoft.com/en-us/azure/iot-suite/iot-suite-remote-monitoring-monitor">
                  { this.props.t('header.getStarted') }
                </Link>
                <Link className="menu-item"
                  target="_blank"
                  to="https://docs.microsoft.com/en-us/azure/iot-suite/">
                  { this.props.t('header.documentation') }
                </Link>
                <Link className="menu-item"
                  target="_blank"
                  to="https://feedback.azure.com/forums/321918-azure-iot ">
                  { this.props.t('header.sendSuggestion') }
                </Link>
              </div>
            }
          </div>
          <button onClick={this.props.openSettings}>
            <Svg path={svgs.settings} className="item-icon" />
          </button>
          <div className="menu-container">
            <button className="item-icon profile menu-trigger" onClick={this.toggleDropdown(profileDropdown)}>
              <img src={ProfileImagePath} alt={ this.props.t('header.logout') } />
            </button>
            {
              this.state.openDropdown === profileDropdown &&
              <div className="menu">
                <button className="menu-item" onClick={this.logout}>{ this.props.t('header.logout') }</button>
              </div>
            }
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
