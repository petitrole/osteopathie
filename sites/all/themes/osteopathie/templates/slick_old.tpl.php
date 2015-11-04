<?php
  /**
   * @file
   * Default theme implementation for the Slick carousel template.
   *
   * Available variables:
   * - $items: The array of items containing main image/video/audio, and optional
   *     image/video/audio overlay and captions.
   * - $settings: A cherry-picked settings that mostly defines the slide HTML or
   *     layout, and none of JS settings/options which are defined at data-slick.
   * - $attributes: The array of attributes to hold the container classes, and id.
   * - $content_attributes: The array of attributes to hold the slick-slider and
   *     data-slick containing JSON object aka JS settings the Slick expects to
   *     override default options. We don't store these JS settings in the normal
   *     <head>, but inline within data-slick attribute instead.
   */
  global $base_url;
?>
<div<?php print $attributes; ?>>
  <?php if (empty($settings['unslick'])): ?>
  <div<?php print $content_attributes; ?>>
    <?php endif; ?>

    <?php
      $items = array();

      $items[] = array(
        '#markup'  => '<span class="caption"><img title="test titre 1" src="' . $base_url . '/sites/all/themes/osteopathie/images/carousel_images/consultation1.png"   /></span>',
        '#caption' => 'test caption 1',
      );
      $items[] = array(
        '#markup'  => '<span class="caption"><img title="test titre 2" src="' . $base_url . '/sites/all/themes/osteopathie/images/carousel_images/consultation2.png" /></span>',
        '#caption' => 'test caption 2',
      );
      $items[] = array(
        '#markup'  => '<img title="test titre 3" src="' . $base_url . '/sites/all/themes/osteopathie/images/carousel_images/osteopathie1.png" />',
        '#caption' => 'test caption 3',
      );
      $items[] = array(
        '#markup'  => '<img src="' . $base_url . '/sites/all/themes/osteopathie/images/carousel_images/osteopathie2.png" />',
        '#caption' => 'test caption 4',
      );
      $items[] = array(
        '#markup'  => '<img src="' . $base_url . '/sites/all/themes/osteopathie/images/carousel_images/osteopathie3.png" />',
        '#caption' => 'test caption 5',
      );


      foreach ($items as $delta => $item):
        print render($item);
        ?>

      <?php endforeach; ?>


    <?php if (empty($settings['unslick'])): ?>
  </div>
  <nav<?php print $arrow_attributes; ?>>
    <?php print $settings['prev_arrow']; ?>
    <?php isset($arrow_down) && print $arrow_down; ?>
    <?php print $settings['next_arrow']; ?>
  </nav>
<?php endif; ?>
</div>

