<?php

  /**
   * @file
   * template.php
   */
  function osteopathie_preprocess_html (&$vars){
    // Bugfix : &amp;#039; dans les titres
    if (isset($vars['head_title'])) {
      $vars['head_title'] = str_replace('&amp;#039;', "'", $vars['head_title']);
      $vars['head_title'] = str_replace('&#039;', "'", $vars['head_title']);
    }
    if (isset($vars['head_title_array']['title'])) {
      $vars['head_title_array']['title'] = str_replace('&amp;#039;', "'", $vars['head_title_array']['title']);
      $vars['head_title_array']['title'] = str_replace('&#039;', "'", $vars['head_title_array']['title']);
    }
    if (isset($vars['head_array']['title'])) {
      $vars['head_array']['title'] = str_replace('&amp;#039;', "'", $vars['head_array']['title']);
      $vars['head_array']['title'] = str_replace('&#039;', "'", $vars['head_array']['title']);
    }
    // Setup IE meta tag to force IE rendering mode
    $meta_ie_render_engine = array(
      '#type'       => 'html_tag',
      '#tag'        => 'meta',
      '#attributes' => array(
        'content'    => 'IE=edge,chrome=1',
        'http-equiv' => 'X-UA-Compatible',
      )
    );
    //  Mobile viewport optimized: h5bp.com/viewport
    $meta_viewport = array(
      '#type'       => 'html_tag',
      '#tag'        => 'meta',
      '#attributes' => array(
        'content' => 'width=device-width',
        'name'    => 'viewport',
      )
    );

    // Add header meta tag for IE to head
    drupal_add_html_head($meta_ie_render_engine, 'meta_ie_render_engine');
    drupal_add_html_head($meta_viewport, 'meta_viewport');
  }
  function osteopathie_preprocess_page(&$vars, $hook) {
    // Adaptive design -> détection téléphone vs pc
    include_once(drupal_get_path('theme', 'osteopathie') . '/libraries/Mobile_Detect.php');
    $GLOBALS['is_phone'] = FALSE;
    $detect              = new Mobile_Detect;
    // PC
    if ($detect->isMobile() && !$detect->isTablet()) {
      $GLOBALS['is_phone'] = TRUE;
    }
    // IE fix -> tous les IE
    if (preg_match('~MSIE|Internet Explorer~i', $_SERVER['HTTP_USER_AGENT']) || (strpos($_SERVER['HTTP_USER_AGENT'], 'Trident/7.0;') !== FALSE)) {
      drupal_add_css(drupal_get_path('theme', 'cnsa_institutionnel') . '/css/ie_fix.css');
    }
    // Suggestion pour les type de contenu
    if (!drupal_is_front_page() && isset($vars['node'])) {
      $vars['theme_hook_suggestions'][] = 'page__node__' . $vars['node']->type;
    }
  }

  /**
   * Implement HOOK_preprocess_node()
   *   */
  function osteopathie_preprocess_node(&$vars) {
    $node = $vars['node'];
  }

    function osteopathie_preprocess_field(&$vars) {
   //   dsm($vars , 'preprocess field 1');
      $element = $vars['element'];
      $function = 'osteopathie_preprocess_field__' . $vars['element']['#field_name'];
      if (function_exists($function)) {
        $vars = $function($vars);
      }
    }

 function osteopathie_field(&$variables) {
   // dsm($variables, 'hook field');
    $output = '';

    // Render the label, if it's not hidden.
    if (!$variables ['label_hidden']) {
      $output .= '<div class="field-label"' . $variables ['title_attributes'] . '>' . $variables ['label'] . ':&nbsp;</div>';
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

  function osteopathie_form_alter(&$form, &$form_state, $form_id) {
    if($form_id == 'contact_site_form'){
     $form['#theme']= 'contact-site-form';
    }
  }
  function osteopathie_theme($existing, $type, $theme, $path) {
    return array(
      'contact-site-form' => array(
        'render element' => 'form',
        'template'       => 'templates/contact-site-form',
      )
    );
  }


