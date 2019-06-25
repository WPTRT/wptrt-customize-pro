
wp.customize.sectionConstructor['wptrt-customize-pro'] = wp.customize.Section.extend( {

	// No events for this type of section.
	attachEvents: function () {},

	// Always make the section active.
	isContextuallyActive: function () {
		return true;
	}
} );
