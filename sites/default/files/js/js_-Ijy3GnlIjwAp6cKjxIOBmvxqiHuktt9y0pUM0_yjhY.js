(function ($) {

/**
 * Attaches double-click behavior to toggle full path of Krumo elements.
 */
Drupal.behaviors.devel = {
  attach: function (context, settings) {

    // Add hint to footnote
    $('.krumo-footnote .krumo-call').once().before('<img style="vertical-align: middle;" title="Click to expand. Double-click to show path." src="' + settings.basePath + 'misc/help.png"/>');

    var krumo_name = [];
    var krumo_type = [];

    function krumo_traverse(el) {
      krumo_name.push($(el).html());
      krumo_type.push($(el).siblings('em').html().match(/\w*/)[0]);

      if ($(el).closest('.krumo-nest').length > 0) {
        krumo_traverse($(el).closest('.krumo-nest').prev().find('.krumo-name'));
      }
    }

    $('.krumo-child > div:first-child', context).dblclick(
      function(e) {
        if ($(this).find('> .krumo-php-path').length > 0) {
          // Remove path if shown.
          $(this).find('> .krumo-php-path').remove();
        }
        else {
          // Get elements.
          krumo_traverse($(this).find('> a.krumo-name'));

          // Create path.
          var krumo_path_string = '';
          for (var i = krumo_name.length - 1; i >= 0; --i) {
            // Start element.
            if ((krumo_name.length - 1) == i)
              krumo_path_string += '$' + krumo_name[i];

            if (typeof krumo_name[(i-1)] !== 'undefined') {
              if (krumo_type[i] == 'Array') {
                krumo_path_string += "[";
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += krumo_name[(i-1)];
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += "]";
              }
              if (krumo_type[i] == 'Object')
                krumo_path_string += '->' + krumo_name[(i-1)];
            }
          }
          $(this).append('<div class="krumo-php-path" style="font-family: Courier, monospace; font-weight: bold;">' + krumo_path_string + '</div>');

          // Reset arrays.
          krumo_name = [];
          krumo_type = [];
        }
      }
    );
  }
};

})(jQuery);
;
!function(t,i){"use strict";i.behaviors.slick={attach:function(i,s){var e=this;t(".slick:not(.unslick)",i).once("slick",function(){var i=t(this),n=t("> .slick__slider",i),l=t("> .slick__arrow",i),a=t.extend({},s.slick,n.data("slick"));e.beforeSlick(n,l,a),n.slick(e.globals(n,l,a)),e.afterSlick(n,a)})},beforeSlick:function(s,e,n){var l,a=this;a.randomize(s),s.on("init.slick",function(r,o){var c=o.options.responsive||null;if(c&&c.length>-1)for(l in c)c.hasOwnProperty(l)&&"unslick"!==c[l].settings&&(o.breakpointSettings[c[l].breakpoint]=t.extend({},i.settings.slick,a.globals(s,e,n),c[l].settings))}),s.on("setPosition.slick",function(t,i){a.setPosition(s,e,i)})},afterSlick:function(i,s){var e=this,n=i.slick("getSlick");i.parent().on("click.slick.load",".slick-down",function(i){i.preventDefault();var e=t(this);t("html, body").stop().animate({scrollTop:t(e.data("target")).offset().top-(e.data("offset")||0)},800,s.easing)}),s.mousewheel&&i.on("mousewheel.slick.load",function(t,s){return t.preventDefault(),i.slick(0>s?"slickNext":"slickPrev")}),i.trigger("afterSlick",[e,n,n.currentSlide])},randomize:function(t){t.parent().hasClass("slick--random")&&!t.hasClass("slick-initiliazed")&&t.children().sort(function(){return.5-Math.random()}).each(function(){t.append(this)})},setPosition:function(i,s,e){if(i.attr("id")===e.$slider.attr("id")){var n=e.options,l=i.parent().parent(".slick-wrapper").length?i.parent().parent(".slick-wrapper"):i.parent(".slick");return t(".slick-slide",l).removeClass("slick-current"),t("[data-slick-index='"+e.currentSlide+"']",l).addClass("slick-current"),e.slideCount<=n.slidesToShow||n.arrows===!1?s.addClass("element-hidden"):s.removeClass("element-hidden")}},globals:function(s,e,n){return{slide:n.slide,lazyLoad:n.lazyLoad,dotsClass:n.dotsClass,rtl:n.rtl,appendDots:".slick__arrow"===n.appendDots?e:n.appendDots||t(s),prevArrow:t(".slick-prev",e),nextArrow:t(".slick-next",e),appendArrows:e,customPaging:function(t,s){var e=t.$slides.eq(s).find("[data-thumb]")||null,l=i.t(e.attr("alt"))||"",a="<img alt='"+l+"' src='"+e.data("thumb")+"'>",r=e.length&&n.dotsClass.indexOf("thumbnail")>0?"<div class='slick-dots__thumbnail'>"+a+"</div>":"";return r+t.defaults.customPaging(t,s)}}}}}(jQuery,Drupal);;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
function isEmail(myVar){
     // La 1ère étape consiste à définir l'expression régulière d'une adresse email
     var regEmail = new RegExp('^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$','i');

     return regEmail.test(myVar);
}

function controle_mail() {
	var email = jQuery('#edit-mail').val();
	if (isEmail(email)==false) {
		jQuery('#email-error').text("Le champs renseigné n'est pas correct");
		jQuery('#email-error').addClass('span-email-error');
	} else {
		jQuery('#email-error').empty('');
		jQuery('#email-error').removeClass('span-email-error');
	}
}
;
