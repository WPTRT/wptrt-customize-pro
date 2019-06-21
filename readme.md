# WPTRT Customize Section Button

This is a custom section class for the WordPress customizer, which allows theme authors to build a section that has a "button."  It's primary purpose is for providing a standardized method of creating a "pro" or "upsell" section in the customizer.  However, it can technically be used to link to anywhere.

## Usage

The following code should be integrated within your theme's existing customizer code.

```php
use WPTRT\Customize\Section\Button;

// Register the "button" section.

add_action( 'customize_register', function( $manager ) {

	$manager->register_section_type( Button::class );

	$manager->add_section(
		new Button( $manager, 'themeslug_pro', [
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
		'wptrt-customize-section-button',
		get_theme_file_uri( 'path/to/customize-section-button/public/js/customize-controls.js' ),
		[ 'customize-controls' ],
		$version,
		true
	);

	wp_enqueue_style(
		'wptrt-customize-section-button',
		get_theme_file_uri( 'path/to/customize-section-button/public/css/customize-controls.css' ),
		[ 'customize-controls' ],
 		$version
	);

} );
```

### Arguments

The `Button` section accepts all the same arguments as a normal `WP_Customize_Section`.  However, two additional arguments have been added.

- `'button_text'` - The text to display for the section button.  Defaults to the active theme name.
- `'button_url'` - The URL to use for the section button.  Falls back to the `Theme URI` or the `Author URI`.

## Autoloading

You'll need to use an autoloader with this. Ideally, this would be [Composer](https://getcomposer.org).  However, we have a [basic autoloader](https://github.com/WPTRT/autoload) available to include with themes if needed.

### WPTRT Autoloader

If using the WPTRT autoloader, use the following code:

```php
include get_theme_file_path( 'path/to/autoload/src/Loader.php' );

$loader = new \WPTRT\Autoload\Loader();

$loader->add( 'WPTRT\\Customize\\Section', get_theme_file_path( 'path/to/customize-section-button/src' ) );

$loader->register();
```
