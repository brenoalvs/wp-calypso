=== Full Site Editing ===
Contributors: alexislloyd, allancole, automattic, codebykat, copons, dmsnell, get_dave, glendaviesnz, gwwar, iamtakashi, Joen, kwight, marekhrabe, mattwiebe, mmtr86, mppfeiffer, nrqsnchz, obenland, okenobi, vindl, noahtallen, owolski
Tags: block, blocks, editor, gutenberg, page
Requires at least: 5.0
Tested up to: 5.3
Stable tag: 0.12
Requires PHP: 5.6.20
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Enhances your page creation workflow within the Block Editor.


== Description ==

This plugin comes with a custom block to display a list of your most recent blog posts, as well as a template selector
to give you a head start on creating new pages for your site.


== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/full-site-editing` directory, or install the plugin through the WordPress plugins screen directly.
1. Activate the plugin through the 'Plugins' screen in WordPress.
1. Create a new page and select a template that best suits your needs.
1. Place the "Blog Posts Listing" block anywhere you want inside the block editor.


== Frequently Asked Questions ==

= Can I use this plugin in production? =

We'll be making frequent updates to the plugin as we flesh out its feature set. You're welcome to try it, just be aware that it is only designed to work on the WordPress.com environment and could break after an update.

= How is the Blog Posts Listing block different from the Latest Posts block in Core? =

It adds an excerpt! And meta information! It really is much more useful, especially if your looking for a block that gives readers a better idea about your latest posts than just the title.

= Do you provide support for this plugin? =

This plugin is experimental, so we don't provide any support for it outside of websites hosted on WordPress.com at this time.


== Changelog ==

= 0.12 =

* Change menu order of default pages that FSE creates to 1.

= 0.11 =
* Add color, background color, font size, and text alignment support to the Site Title, Site Description, and Navigation Menu blocks.

= 0.10 =
* Update page template selector with template preview.

= 0.9 =
* Rename wp_template CPT to wp_template_part.

= 0.7 =
* Change theme support to Maywood instead of Modern Business.
* Improve style support and UX issues.
* Remove featured image support for pages.
* No longer load FSE editor if theme is unsupported.
* Improve autosave support.
* Add embed/shortcode support to header and footer.
* Several other high priority fixes for the FSE editor.

= 0.6.1 =
* Updates priority of filter so classnames are added properly to the template blocks.

= 0.6 =
* Fix issues with Edit template and Back to Page functionality.

= 0.5 =
* Fetch templates data from the API.
* Improve UX flows and fix styling issues.

= 0.4 =
* Move template data initialization out of the plugin and delegate it to themes.

= 0.3 =
* Update modal UI.

= 0.2.2 =
* Posts List Block - fixes Edit link to only display for users with appropriate permissions.

= 0.2.1 =
* Starter Page Templates - bug fix with sub-locales.
* Starter Page Templates - fix momentum scrolling on Modal on iOS.
* Starter Page Templates - improve comprehension of Templates listing by forcing 2col layout on small viewports.
* Starter Page Templates - introduced version constant for cache busting purposes.

= 0.2 =
* Bug fixes and performance improvements.

= 0.1.1 =
* Latest round of updates

= 0.1 =
* Initial Release
