'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Styles from './app.scss';
import Header from './header/';
import Room from './room/';

const initialState = {
	room: {
		image: 'images/plan.svg',
		items: [
			{
				id: 'place1'
			},
			{
				id: 'place2'
			},
			{
				id: 'place3'
			},
			{
				id: 'place4'
			},
			{
				id: 'place5'
			},
			{
				id: 'place6'
			},
			{
				id: 'place7'
			},
			{
				id: 'place8'
			},
			{
				id: 'place9'
			},
			{
				id: 'place10'
			},
			{
				id: 'place11'
			},
			{
				id: 'place12'
			},
			{
				id: 'place13'
			},
			{
				id: 'place14'
			},
			{
				id: 'place15'
			},
			{
				id: 'place16'
			}
		],
	},
	nav: [
		{
			id: 'home',
			text: 'Home',
			href: '#',
			active: true
		},
		{
			id: 'about',
			text: 'About',
			href: '#'
		},
		{
			id: 'contact',
			text: 'Contact',
			href: '#'
		},
		{
			id: 'settings',
			text: 'Settings',
			href: '#'
		}
	],
	navActive: false
};

const appState = (state = initialState, action) => {
	let obj = Object.assign({}, state);

	if (action.type === 'ToggleNav') {
		obj.navActive = action.active;
		return obj;
	}

	if (action.type === 'SwitchNavItems') {
		obj.nav = action.nav;
		return obj;
	}

	return state;
};

const store = createStore(appState);

const App = () => (
	<Provider store={store}>
		<div className={Styles.wrapper}>
			<Header/>
			<Room/>
		</div>
	</Provider>
);

ReactDOM.render(<App/>, document.getElementById('app'));
