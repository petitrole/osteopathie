<?php

/**
 * @file
 * template.php
 */
  function osteopathie_preprocess_page(&$vars, $hook) {
	// Adaptive design -> détection téléphone vs pc
	include_once(drupal_get_path('theme', 'osteopathie') . '/libraries/Mobile_Detect.php');
	$GLOBALS['is_phone'] = false;
	$detect              = new Mobile_Detect;
	// PC
	if ($detect->isMobile() && !$detect->isTablet()) {
	  $GLOBALS['is_phone'] = true;
	}
	// IE fix -> tous les IE
	if (preg_match('~MSIE|Internet Explorer~i', $_SERVER['HTTP_USER_AGENT']) || (strpos($_SERVER['HTTP_USER_AGENT'], 'Trident/7.0;') !== false)) {
	  drupal_add_css(drupal_get_path('theme', 'cnsa_institutionnel') . '/css/ie_fix.css');
	}
	// Suggestion pour les type de contenu
	if (!drupal_is_front_page() && isset($vars['node'])) {
	  $vars['theme_hook_suggestions'][] = 'page__node__' . $vars['node']->type;
	}
  }

  function osteopathie_preprocess_node(&$variables) {
//dsm($variables , 'node variables');
	if($variables['field_image'][0]['filemime'] == 'image/jpeg' ) {
	 // dsm('jsdklfdslkfjlksdjfopsdl');
	 // dsm($variables['field_image'] , 'node field image');
	  $classes =  'class="img-responsive"';
	  foreach (array('width', 'height', 'alt', 'title', 'class') as $key) {

		if (isset($variables [$key])) {
		  $attributes [$key] = $variables [$key];
		}
	  }
	  return '<img' . drupal_attributes($attributes) . $classes  . ' />';
	}

  }
  function osteopathie_image($variables) {
	//dsm($variables , 'variable image');
	$attributes = $variables ['attributes'];
	$attributes ['src'] = file_create_url($variables ['path']);
	$classes =  'class="img-responsive"';

	foreach (array('width', 'height', 'alt', 'title', 'class') as $key) {

	  if (isset($variables [$key])) {
		$attributes [$key] = $variables [$key];
	  }
	}

	return '<img' . drupal_attributes($attributes) . $classes  . ' />';
  }
  function osteopathie_preprocess_field(&$vars, $hook) {
	//dsm($vars);
	//$element = $vars['element'];
	$function = 'osteopathie_preprocess_field__'. $vars['element']['#field_name'];
	if(function_exists($function)) {
	  $vars = $function($vars);
	}
	if($vars['element']['#fiel_name'] == 'field_image'){
	 // dsm($vars ,'preprocess field');
	  $classes =  'class="img-responsive"';
	}
	//dsm($vars ,'vars in preprocess field');
  }
  function osteopathie_field(&$variables, $hook) {
//	dsm ($variables , 'hook field');
	$output = '';

	// Render the label, if it's not hidden.
	if (!$variables ['label_hidden']) {
	  $output .= '<div class="field-label"' . $variables ['title_attributes'] . '>' . $variables ['label'] . ':&nbsp;</div>';
	}
	//field image
	if(!$variables['element']['#object']->field_image['und'][0]['filemime'] == 'image/jpeg'  ){
	//  dsm('tatat');
	}

	// Render the items.
	$output .= '<div class="field-items"' . $variables ['content_attributes'] . '>';
	foreach ($variables ['items'] as $delta => $item) {
	  $classes = 'field-item ' . ($delta % 2 ? 'odd' : 'even');
	  $output .= '<div class="' . $classes . '"' . $variables ['item_attributes'][$delta] . '>' . drupal_render($item) . '</div>';
	}
	$output .= '</div>';

	// Render the top-level DIV.
	$output = '<div class="' . $variables ['classes'] . '"' . $variables ['attributes'] . '>' . $output . '</div>';

	return $output;
  }
  function costeopathie_form_alter(&$form, &$form_state, $form_id) {

  }