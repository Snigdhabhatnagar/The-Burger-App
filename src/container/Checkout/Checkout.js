import React, {Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
	state={
		ingredients: null,
		Price:0
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact');
	}

	componentWillMount () {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients ={};
		let price=0;
		for (let param of query.entries()) {
			if(param[0] === 'price' ){
				price=param[0];

			}
			else{
			ingredients[param[0]] = +param[1];
		}
		}
		this.setState({ingredients: ingredients,
			Price:price})
	}
	render() {
		return (
			<div>
			<CheckoutSummary 
			ingredients={this.state.ingredients}
			checkoutCancelled={this.checkoutCancelledHandler}
			checkoutContinued={this.checkoutContinuedHandler}/>
			<Route path={this.props.match.path + '/contact'} 
			render={(() => (<ContactData ingredients={this.state.ingredients} Price={this.state.Price}/>))}/>
			</div>
			);

	}

}

export default Checkout
