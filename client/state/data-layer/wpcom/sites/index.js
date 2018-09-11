/** @format */

/**
 * Internal dependencies
 */

import { mergeHandlers } from 'state/action-watchers/utils';
import config from 'config';
import automatedTransfer from './automated-transfer';
import blogStickers from './blog-stickers';
import commentCounts from './comment-counts';
import comments from './comments';
import commentsTree from './comments-tree';
import jitm from './jitm';
import media from './media';
import memberships from './memberships';
import nudges from './nudges';
import planTransfer from './plan-transfer';
import plugins from './plugins';
import postTypes from './post-types';
import posts from './posts';
import simplePayments from './simple-payments';
import users from './users';
import statsGoogleMyBusiness from './stats/google-my-business';

export default mergeHandlers(
	automatedTransfer,
	blogStickers,
	commentCounts,
	comments,
	commentsTree,
	config.isEnabled( 'jitms' ) ? jitm : null,
	media,
	nudges,
	config.isEnabled( 'memberships' ) ? memberships : null,
	planTransfer,
	plugins,
	postTypes,
	posts,
	simplePayments,
	users,
	statsGoogleMyBusiness
);
