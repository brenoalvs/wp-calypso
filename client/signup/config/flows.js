/** @format */

/**
 * External dependencies
 */
import { assign, get, includes, indexOf, reject } from 'lodash';
import { abtest } from 'lib/abtest';

/**
 * Internal dependencies
 */
import config from 'config';
import stepConfig from './steps';
import userFactory from 'lib/user';
import { generateFlows } from 'signup/config/flows-pure';

const user = userFactory();

function getCheckoutUrl( dependencies ) {
	return `/checkout/${ dependencies.siteSlug }?signup=1`;
}

function dependenciesContainCartItem( dependencies ) {
	return dependencies.cartItem || dependencies.domainItem || dependencies.themeItem;
}

function getSiteDestination( dependencies ) {
	let protocol = 'https';

	/**
	 * It is possible that non-wordpress.com sites are not HTTPS ready.
	 *
	 * Redirect them
	 */
	if ( ! dependencies.siteSlug.match( /wordpress\.[a-z]+$/i ) ) {
		protocol = 'http';
	}

	return protocol + '://' + dependencies.siteSlug;
}

function getRedirectDestination( dependencies ) {
	if (
		dependencies.oauth2_redirect &&
		dependencies.oauth2_redirect.startsWith( 'https://public-api.wordpress.com' )
	) {
		return dependencies.oauth2_redirect;
	}

	return '/';
}

function getSignupDestination( dependencies ) {
	return `/checklist/${ dependencies.siteSlug }`;
}

function getThankYouNoSiteDestination() {
	return `/checkout/thank-you/no-site`;
}

function getChecklistThemeDestination( dependencies ) {
	return `/checklist/${ dependencies.siteSlug }?d=theme`;
}

const flows = generateFlows( {
	getSiteDestination,
	getRedirectDestination,
	getSignupDestination,
	getThankYouNoSiteDestination,
	getChecklistThemeDestination,
} );

if ( flows.onboarding && 'variant' === abtest( 'prefillSiteTitleWithDomainQuery' ) ) {
	flows.onboarding.steps = [
		'user',
		'site-type',
		'site-topic-with-preview',
		'domains-with-preview',
		'site-title-with-preview',
		'plans',
	];
}

function removeUserStepFromFlow( flow ) {
	if ( ! flow ) {
		return;
	}

	return assign( {}, flow, {
		steps: reject( flow.steps, stepName => stepConfig[ stepName ].providesToken ),
	} );
}

function filterDestination( destination, dependencies ) {
	if ( dependenciesContainCartItem( dependencies ) ) {
		return getCheckoutUrl( dependencies );
	}

	return destination;
}

function getDefaultFlowName() {
	return config.isEnabled( 'signup/onboarding-flow' ) ? 'onboarding' : 'main';
}

const Flows = {
	filterDestination,

	defaultFlowName: getDefaultFlowName(),
	excludedSteps: [],

	/**
	 * Get certain flow from the flows configuration.
	 *
	 * The returned flow is modified according to several filters.
	 *
	 * @param {String} flowName The name of the flow to return
	 * @returns {Object} A flow object
	 */
	getFlow( flowName ) {
		let flow = Flows.getFlows()[ flowName ];

		// if the flow couldn't be found, return early
		if ( ! flow ) {
			return flow;
		}

		if ( user && user.get() ) {
			flow = removeUserStepFromFlow( flow );
		}

		return Flows.filterExcludedSteps( flow );
	},

	getNextStepNameInFlow( flowName, currentStepName = '' ) {
		const flow = Flows.getFlows()[ flowName ];

		if ( ! flow ) {
			return false;
		}
		const flowSteps = flow.steps;
		const currentStepIndex = indexOf( flowSteps, currentStepName );
		const nextIndex = currentStepIndex + 1;
		const nextStepName = get( flowSteps, nextIndex );

		return nextStepName;
	},

	/**
	 * Make `getFlow()` call to exclude the given steps.
	 * The main usage at the moment is to serve as a quick solution to remove steps that have been pre-fulfilled
	 * without explicit user inputs, e.g. query arguments.
	 *
	 * @param {String} step Name of the step to be excluded.
	 */
	excludeStep( step ) {
		step && Flows.excludedSteps.push( step );
	},

	filterExcludedSteps( flow ) {
		if ( ! flow ) {
			return;
		}

		return assign( {}, flow, {
			steps: reject( flow.steps, stepName => includes( Flows.excludedSteps, stepName ) ),
		} );
	},

	resetExcludedSteps() {
		Flows.excludedSteps = [];
	},

	getFlows() {
		return flows;
	},
};

export default Flows;
