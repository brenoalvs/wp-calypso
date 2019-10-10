/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Internal dependencies
 */
import canCurrentUser from 'state/selectors/can-current-user';
import getSiteOptions from 'state/selectors/get-site-options';
import isEligibleForDotcomChecklist from 'state/selectors/is-eligible-for-dotcom-checklist';
import { getSelectedSiteId } from 'state/ui/selectors';
import getSite from './get-site';

/**
 * Returns true if the current should be able to use the customer home screen
 *
 * @param  {Object}   state  Global state tree
 * @param  {Number}   siteId Site ID
 * @return {?Boolean}        Whether the site can use the customer home screen
 */
export default function canCurrentUserUseCustomerHome( state, siteId = null ) {
	if ( ! siteId ) {
		siteId = getSelectedSiteId( state );
	}

	if ( ! isEligibleForDotcomChecklist( state, siteId ) ) {
		return false;
	}

	const siteOptions = getSiteOptions( state, siteId );
	const createdAt = get( siteOptions, 'created_at', '' );

	if (
		! createdAt ||
		createdAt.substr( 0, 4 ) === '0000' ||
		new Date( createdAt ) < new Date( '2019-08-06' )
	) {
		return false;
	}

	const site = getSite( state, siteId );
	return site && !! canCurrentUser( state, siteId, 'manage_options' );
}
