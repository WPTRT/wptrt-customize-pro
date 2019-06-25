/**
 * Button Customize Section.
 *
 * @package   CustomizeSectionButton
 * @author    WPTRT <themes@wordpress.org>
 * @copyright 2019 WPTRT
 * @license   https://www.gnu.org/licenses/gpl-2.0.html GPL-2.0-or-later
 * @link      https://github.com/WPTRT/customize-section-button
 */

wp.customize.sectionConstructor['wptrt-button'] = wp.customize.Section.extend( {

	// No events for this type of section.
	attachEvents: () => {},

	// Always make the section active.
	isContextuallyActive: () => {
		return true;
	}
} );
