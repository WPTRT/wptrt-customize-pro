
wp.customize.sectionConstructor['wptrt-button'] = wp.customize.Section.extend( {

	// No events for this type of section.
	attachEvents: function () {},

	// Always make the section active.
	isContextuallyActive: function () {
		return true;
	}
} );
