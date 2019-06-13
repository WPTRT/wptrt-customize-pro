# WPTRT Customize Pro

This is a module for theme authors to use for creating a "pro" or "upsell" section in the customizer.

You'll need to use an autoloader with this. Ideally, this would be [Composer](https://getcomposer.org).  However, we have a [basic autoloader](https://github.com/WPTRT/wptrt-autoload) available to include with themes if needed.

## Usage

The following code should be integrated within your theme's existing customizer code.

```php
use WP_Customize_Manager;
use WPTRT\CustomizePro\Sections\Pro;

// Register the "pro" section.

add_action( 'customize_register', function( WP_Customize_Manager $manager ) {

	$manager->register_section_type( Pro::class );

	$manager->add_section(
		new Pro( $manager, 'themeslug_pro', [
			'title'       => __( 'ThemeName Pro', 'themeslug' ),
			'button_text' => __( 'Go Pro',        'themeslug' ),
			'button_url'  => 'http://example.com'
		] )
	);

} );

// Load the JS and CSS.

add_action( 'customize_controls_enqueue_scripts', function() {

	$version = wp_get_theme()->get( 'Version' );

	wp_enqueue_script(
		'wptrt-customize-pro',
		get_theme_file_uri( 'path/to/wptrt-customize-pro/public/js/customize-controls.js' ),
		[ 'customize-controls' ],
		$version,
		true
	);

	wp_enqueue_style(
		'wptrt-customize-pro',
		get_theme_file_uri( 'path/to/wptrt-customize-pro/public/css/customize-controls.css' ),
		$version,
		null
	);

} );
```

### Arguments

The `Pro` section accepts all the same arguments as a normal `WP_Customize_Section`.  However, two additional arguments have been added.

- `'button_text'` - The text to display for the section button.  Defaults to the active theme name.
- `'button_url'` - The URL to use for the section button.  Defaults to the theme URI.
