(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
!function(s,e){"use strict";"function"!=typeof s.fn.prop&&(s.fn.prop=function(s,e){return"undefined"==typeof e?this.attr(s):this.attr(s,e)}),e.behaviors.slickAdmin={attach:function(e){s("html").hasClass("js")||s("html").addClass("js");var t=s(".form--slick").removeClass("no-js");s(".fieldset-legend-prefix",t).removeClass("element-invisible"),s(".form-checkboxes .form-checkbox",t).removeClass("is-tooltip"),s(".form-checkbox",t).once("slick-checkbox",function(){var e=s(this);e.next(".field-suffix").length||e.after("<span class='field-suffix'></span>"),e.click(function(){var e=s(this);e.prop("checked")?e.addClass("on"):e.removeClass("on")})}),s(".is-tooltip",t).once("slick-tooltip",function(){var e=s(this),t=s("<span class='hint'>?</span>"),o=e.closest(".form-item"),i=s(".description",o);e.closest(".form-item").find("> .hint").length||e.closest(".form-item").append(t),t.hover(function(){s(this).closest(".form-item").addClass("hover")},function(){s(this).closest(".form-item").removeClass("hover")}),t.click(function(){s(".form--slick .form-item.selected").removeClass("selected"),s(this).parent().toggleClass("selected")}),i.click(function(){s(this).parent().removeClass("selected")})}),s(".form--slick",e).once("slick-admin",function(){var e=s(this);s(".form-type-textfield > .form-text.js-expandable",e).focus(function(){s(this).parent().addClass("js-on-focus")}).blur(function(){s(this).parent().removeClass("js-on-focus")})})}}}(jQuery,Drupal);;
