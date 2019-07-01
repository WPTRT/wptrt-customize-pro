# WPTRT Customize Section Button

This is a custom section class for the WordPress customizer, which allows theme authors to build a section that has a "button."  Its primary purpose is for providing a standardized method of creating a "pro" or "upsell" section in the customizer.  However, it can technically be used to link to anywhere.

## Usage

The following code should be integrated within your theme's existing customizer code.

```php
// Use statements must come after the `namespace` statement at the top of the
// file but before any other code.

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
```

### Arguments

The `Button` section accepts all the same arguments as a normal `WP_Customize_Section`.  However, two additional arguments have been added.

- `'button_text'` - The text to display for the section button.  Defaults to the active theme name.
- `'button_url'` - The URL to use for the section button.  Falls back to the `Theme URI` or the `Author URI`.

### Loading Required CSS and JS

Both the development and production versions of the CSS and JS files are available.

To avoid loading additional resources, we encourage theme authors to import the following files into their own build processes for their customize CSS and JS:

- `/path/to/customize-section-button/resources/js/customize-controls.js`
- `/path/to/customize-section-button/resources/scss/customize-controls.scss`.

However, if you decide to enqueue the production assets directly, integrate the following into your customizer code.

```php
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

## Autoloading

You'll need to use an autoloader with this. Ideally, this would be [Composer](https://getcomposer.org).  However, we have a [basic autoloader](https://github.com/WPTRT/autoload) available to include with themes if needed.

### Composer

From the command line:

```sh
composer require wptrt/customize-section-button
```

### WPTRT Autoloader

If using the WPTRT autoloader, use the following code:

```php
include get_theme_file_path( 'path/to/autoload/src/Loader.php' );

$loader = new \WPTRT\Autoload\Loader();

$loader->add( 'WPTRT\\Customize\\Section', get_theme_file_path( 'path/to/customize-section-button/src' ) );

$loader->register();
```
