/**
 * External dependencies
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

/**
 * Internal dependencies
 */
import joinClasses from '../lib/join-classes';
import { getPaymentMethods } from '../lib/payment-methods';
import RadioButton from './radio-button';

export default function CheckoutPaymentMethods( {
	summary,
	isActive,
	isComplete,
	className,
	availablePaymentMethods,
	paymentMethod,
	onChange,
} ) {
	const paymentMethods = getPaymentMethods();
	const paymentMethodsToDisplay = availablePaymentMethods
		? paymentMethods.filter( method => availablePaymentMethods.includes( method.id ) )
		: paymentMethods;

	if ( summary && isComplete && paymentMethod ) {
		return (
			<div className={ joinClasses( [ className, 'checkout-payment-methods' ] ) }>
				<PaymentMethod { ...paymentMethod } checked={ true } />
			</div>
		);
	}
	if ( summary ) {
		return null;
	}

	return (
		<div className={ joinClasses( [ className, 'checkout-payment-methods' ] ) }>
			<RadioButtons>
				{ paymentMethodsToDisplay.map( method => (
					<PaymentMethod
						{ ...method }
						isActive={ isActive }
						isComplete={ isComplete }
						key={ method.id }
						checked={ paymentMethod.id === method.id }
						onClick={ onChange }
					/>
				) ) }
			</RadioButtons>
		</div>
	);
}

CheckoutPaymentMethods.propTypes = {
	summary: PropTypes.bool,
	isComplete: PropTypes.bool.isRequired,
	isActive: PropTypes.bool.isRequired,
	className: PropTypes.string,
	availablePaymentMethods: PropTypes.arrayOf( PropTypes.string ),
	paymentMethod: PropTypes.object,
	onChange: PropTypes.func.isRequired,
};

function PaymentMethod( { id, LabelComponent, PaymentMethodComponent, checked, onClick } ) {
	return (
		<RadioButton
			name="paymentMethod"
			value={ id }
			id={ id }
			checked={ checked }
			onChange={ onClick ? () => onClick( id ) : null }
			label={ <LabelComponent /> }
		>
			{ PaymentMethodComponent && <PaymentMethodComponent isActive={ checked } /> }
		</RadioButton>
	);
}

PaymentMethod.propTypes = {
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	checked: PropTypes.bool.isRequired,
	PaymentMethodComponent: PropTypes.func,
	LabelComponent: PropTypes.func,
};

export const RadioButtons = styled.div`
	margin-bottom: 16px;
`;
