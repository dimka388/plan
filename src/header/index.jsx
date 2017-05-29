'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Styles from './header.scss';

class Header extends Component {
	openerClickHandler = () => {
		this.props.onToggleNav(!this.props.store.navActive);
	};

	itemClickHandler = (e, item) => {
		e.preventDefault();
		if (!item.active) {
			this.props.store.nav.forEach((obj) => {
				if (obj.id === item.id) {
					item.active = true;
				} else {
					delete obj['active'];
				}
			});
			this.props.onSwitchNavItems(this.props.store.nav);
		}
	};

	outsideClickHandler (event) {
		const target = event.target;
		const nav = ReactDOM.findDOMNode(this.nav);
		const opener = ReactDOM.findDOMNode(this.opener);
		if ((!nav || !nav.contains(event.target)) && (!opener || !opener.contains(event.target)) && this.props.store.navActive) {
			this.props.onToggleNav(false);
		}
	};

	componentWillMount() {
		window.addEventListener('click', this.outsideClickHandler.bind(this), false);
	}

	render() {
		return (
			<header className={Styles.header + ' ' + (this.props.store.navActive ? Styles.active : '')}>
				<button className={Styles.button}
					ref={(opener) => { this.opener = opener; }}
					onClick={this.openerClickHandler.bind(this) }>Menu</button>
				<nav className={Styles.nav}
					ref={(nav) => { this.nav = nav; }} >
					<ul>
						{this.props.store.nav.map((item, index) => (
							<li className={item.active ? Styles.active : ''} key={`item-${index}`} >
								<a href={item.href}
									onClick={e => this.itemClickHandler(e, item)} >{item.text}</a>
							</li>
						))}
					</ul>
				</nav>
			</header>
		)
	}
}

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({
		onToggleNav: (active) => {
			dispatch({ type: 'ToggleNav', active: active});
		},
		onSwitchNavItems: (nav) => {
			dispatch({ type: 'SwitchNavItems', nav: nav});
		}
	})
)(Header);