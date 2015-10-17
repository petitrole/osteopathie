<?php

/**
 * @file
 * Functions that are only called on the admin pages.
 */

/**
 * Overriding system settings form.
 */
function bootstrap_carousel_blocks_system_settings_form($form, $automatic_defaults = TRUE) {
  $form['actions']['#type'] = 'container';
  $form['actions']['#attributes']['class'][] = 'form-actions';
  $form['actions']['#weight'] = 100;
  $form['actions']['submit'] = array('#type' => 'submit', '#value' => t('Save configuration'));

  if ($automatic_defaults) {
    $form = _system_settings_form_automatic_defaults($form);
  }

  if (!empty($_POST) && form_get_errors()) {
    drupal_set_message(t('The settings have not been saved because of the errors.'), 'error');
  }
  $form['#submit'][] = 'system_settings_form_submit';
  // By default, render the form using theme_system_settings_form().
  if (!isset($form['#theme'])) {
    $form['#theme'] = 'system_settings_form';
  }
  return $form;
}

/**
 * Module settings form.
 */
function bootstrap_carousel_blocks_admin_settings() {
  $form['bootstrap_carousel_blocks_number'] = array(
    '#type' => 'select',
    '#title' => t('Number of blocks'),
    '#multiple' => FALSE,
    '#options' => drupal_map_assoc(range(1, 50)),
    '#description' => t('The number of Superfish menu blocks.'),
    '#default_value' => variable_get('bootstrap_carousel_blocks_number', 4),
  );
  $form['bootstrap_carousel_blocks_unique_carousels'] = array(
    '#type' => 'checkbox',
    '#title' => t('Unique carousels'),
    '#description' => t('If enabled each carousel can be assigned to one block only.'),
    '#default_value' => variable_get('bootstrap_carousel_blocks_unique_carousels', FALSE),
  );
  return system_settings_form($form);
//  return bootstrap_carousel_blocks_system_settings_form($form, FALSE);
}
