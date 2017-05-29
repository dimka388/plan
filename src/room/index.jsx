'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Styles from './room.scss';

class Room extends Component {
	itemClickHandler = (item) => {
		console.log('test')
	};
	render() {
		const image = new Image();
		image.onload = () => {
			console.log(image);
		};
		image.src = this.props.store.room.image;
		return (
			<div className={Styles.room}>
				<ul className={Styles.list}>
					{this.props.store.room.items.map((item, index) => (
						<li key={`item-${index}`} onClick={e => this.itemClickHandler(item)}></li>
					))}
				</ul>
			</div>
		)
	}
}

export default connect(
	state => ({
		store: state
	}),
	dispatch => ({})
)(Room);