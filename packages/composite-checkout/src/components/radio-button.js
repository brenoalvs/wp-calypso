/**
 * External dependencies
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default function RadioButton( { checked, name, value, onChange, children, label, id } ) {
	const [ isFocused, changeFocus ] = useState( false );
	return (
		<RadioButtonWrapper isFocused={ isFocused } checked={ checked }>
			<Radio
				type="radio"
				name={ name }
				id={ id }
				value={ value }
				checked={ checked }
				onChange={ onChange }
				onFocus={ () => {
					changeFocus( true );
				} }
				onBlur={ () => {
					changeFocus( false );
				} }
				readOnly={ ! onChange }
			/>
			<Label checked={ checked } htmlFor={ id }>
				{ label }
			</Label>
			{ children }
		</RadioButtonWrapper>
	);
}

RadioButton.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	label: PropTypes.node.isRequired,
	checked: PropTypes.bool,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func,
};

const RadioButtonWrapper = styled.div`
	position: relative;
	margin-top: 8px;
	border-radius: 3px;
	box-sizing: border-box;
	width: 100%;
	outline: ${getOutline};

	:first-child {
		margin: 0;
	}

	:before {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		content: '';
		border: ${getBorderWidth} solid ${getBorderColor};
		border-radius: 3px;
		box-sizing: border-box;
	}

	:hover:before {
		border: 3px solid ${props => props.theme.colors.highlight};
	}

	svg {
		filter: grayscale( ${getGrayscaleValue} );
	}

	:hover svg {
		filter: grayscale( 0 );
	}
`;

const Radio = styled.input`
	position: absolute;
	opacity: 0;
`;

const Label = styled.label`
	position: relative;
	padding: 16px 14px 16px 40px;
	border-radius: 3px;
	box-sizing: border-box;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;

	:hover {
		cursor: pointer;
	}

	:after {
		display: block;
		width: 16px;
		height: 16px;
		content: '';
		border: ${getRadioBorderWidth} solid ${getBorderColor};
		border-radius: 100%;
		top: 50%;
		transform: translateY( -50% );
		left: 16px;
		position: absolute;
		background: ${props => props.theme.colors.surface};
		box-sizing: border-box;
		z-index: 2;
	}
`;

function getBorderColor( { checked, theme } ) {
	return checked ? theme.colors.highlight : theme.colors.borderColor;
}

function getBorderWidth( { checked } ) {
	return checked ? '3px' : '1px';
}

function getRadioBorderWidth( { checked } ) {
	return checked ? '5px' : '1px';
}

function getGrayscaleValue( { checked } ) {
	return checked ? 0 : '100%';
}

function getOutline( { isFocused, theme } ) {
	if ( isFocused ) {
		return theme.colors.outline + ' auto 5px';
	}
	return '0';
}
