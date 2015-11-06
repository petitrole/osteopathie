<?php
  $errors = form_get_errors();
  $fields = array('name', 'prenom', 'mail', 'message');
  foreach ($fields as $field) {
    if (isset($errors[$field])) {
      $form[$field]['#attributes']['aria-describedby'] = "error-$field";
    }
  }
  global $base_url;
?>

<div class="container">
<div class='row top-mid-buffer'>
<div id="bloc-footer-info" class="col-xs-12 col-sm-4  pull-right">
  <?php  $block = module_invoke('block', 'block_view', '2');
    print render($block['content']);
  ?>
<!--  <div id="social-icon" class="col-xs-12 col-sm-4 col-md-8  ">-->
<!--    <img class="vcenter" src="--><?php //print $base_url . '/sites/all/themes/osteopathie/images/viadeo.png'; ?><!--"/>-->
<!--    <img class="vcenter" src="--><?php //print $base_url . '/sites/all/themes/osteopathie/images/facebook.png'; ?><!--"/>-->
<!--    <img class="vcenter" src="--><?php //print $base_url . '/sites/all/themes/osteopathie/images/google.png'; ?><!--"/>-->
<!--    <img class="vcenter" src="--><?php //print $base_url . '/sites/all/themes/osteopathie/images/linkedin.png'; ?><!--"/>-->
<!-- </div>-->
</div>





    <div class='col-xs-12 col-sm-4 col-md-6 contact-element name'>
      <?php print drupal_render($form['name']); ?>
    </div>
    <?php if (isset($errors['name'])): ?>
      <div class='col-xs-12 col-sm-4 contact-error'>
        <span class='form-control span-error' id="error-name"><?php print $errors['name']; ?></span>
      </div>
    <?php endif; ?>



  <div class=''>
    <div class='col-xs-12 col-sm-4 col-md-6 contact-element'>
      <?php print drupal_render($form['prenom']); ?>
    </div>
    <?php if (isset($errors['prenom'])): ?>
      <div class='col-xs-12 col-sm-4 contact-error'>
        <span class='form-control span-error' id="error-prenom"><?php print $errors['prenom']; ?></span>
      </div>
    <?php endif; ?>
  </div>

  <div class=''>
    <div class='col-xs-12 col-sm-4 col-md-6 contact-element'>
      <?php print drupal_render($form['mail']); ?>
    </div>
    <?php if (isset($errors['mail'])): ?>
      <div class='col-xs-12 col-sm-4 col-md-8 contact-error'>
        <span class='form-control span-error' id="error-mail"><?php print $errors['mail']; ?></span>
      </div>
    <?php else : ?>
      <div class='col-xs-12 col-sm-4 col-md-8 contact-error div-error-vide'>
		<span id='email-error' class='form-control span-error span-error-vide'>

		</span>
      </div>
    <?php endif; ?>
  </div>

  <div class=''>
    <div class='col-xs-12 col-sm-4 col-md-6 contact-element'>
      <?php print drupal_render($form['cabinet']); ?>
    </div>
  </div>

  <div class=''>
    <div class='col-xs-12 col-sm-4  col-md-6 contact-element'>
      <?php print drupal_render($form['message']); ?>
    </div>
    <?php if (isset($errors['message'])): ?>
      <div class='col-xs-12 col-sm-4 col-md-8 contact-error'>
        <span class='form-control span-error' id="error-message"><?php print $errors['message']; ?></span>
      </div>
    <?php endif; ?>
  </div>
  <div class=''>
    <div class='col-xs-12 col-sm-4  col-md-12 contact-element'>
      <?php print drupal_render( $form['osteo_captcha_element']);?>

    </div>

</div>
  <div class='row'>
    <div class='col-xs-8 col-sm-4 col-md-6'>
      <?php print drupal_render($form['actions']['submit']); ?>
    </div>
  </div>
<?php print drupal_render_children($form); ?>
</div>
