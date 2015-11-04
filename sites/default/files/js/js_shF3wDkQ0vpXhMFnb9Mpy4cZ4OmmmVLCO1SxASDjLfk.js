Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n>1)); }, 'strings': {"":{"An AJAX HTTP error occurred.":"Une erreur HTTP AJAX s\u0027est produite.","HTTP Result Code: !status":"Code de statut HTTP : !status","An AJAX HTTP request terminated abnormally.":"Une requ\u00eate HTTP AJAX s\u0027est termin\u00e9e anormalement.","Debugging information follows.":"Informations de d\u00e9bogage ci-dessous.","Path: !uri":"Chemin : !uri","StatusText: !statusText":"StatusText: !statusText","ResponseText: !responseText":"ResponseText : !responseText","ReadyState: !readyState":"ReadyState : !readyState","Disabled":"D\u00e9sactiv\u00e9","Enabled":"Activ\u00e9","Edit":"Modifier","Add":"Ajouter","Upload":"Transf\u00e9rer","Configure":"Configurer","All":"Tout","Show":"Afficher","Select all rows in this table":"S\u00e9lectionner toutes les lignes du tableau","Deselect all rows in this table":"D\u00e9s\u00e9lectionner toutes les lignes du tableau","Not published":"Non publi\u00e9","Please wait...":"Veuillez patienter...","Hide":"Masquer","Loading":"En cours de chargement","Only files with the following extensions are allowed: %files-allowed.":"Seuls les fichiers se terminant par les extensions suivantes sont autoris\u00e9s\u00a0: %files-allowed.","By @name on @date":"Par @name le @date","By @name":"Par @name","Not in menu":"Pas dans le menu","Alias: @alias":"Alias : @alias","No alias":"Aucun alias","New revision":"Nouvelle r\u00e9vision","Drag to re-order":"Cliquer-d\u00e9poser pour r\u00e9-organiser","Changes made in this table will not be saved until the form is submitted.":"Les changements effectu\u00e9s dans ce tableau ne seront pris en compte que lorsque la configuration aura \u00e9t\u00e9 enregistr\u00e9e.","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"N\u0027oubliez pas de cliquer sur \u003Cem\u003EEnregistrer les blocs\u003C\/em\u003E pour confirmer les modifications apport\u00e9es ici.","Show shortcuts":"Afficher les raccourcis","This permission is inherited from the authenticated user role.":"Ce droit est h\u00e9rit\u00e9e du r\u00f4le de l\u0027utilisateur authentifi\u00e9.","No revision":"Aucune r\u00e9vision","Requires a title":"Titre obligatoire","Not restricted":"Non restreint","(active tab)":"(onglet actif)","Not customizable":"Non personnalisable","Restricted to certain pages":"R\u00e9serv\u00e9 \u00e0 certaines pages","The block cannot be placed in this region.":"Le bloc ne peut pas \u00eatre plac\u00e9 dans cette r\u00e9gion.","Hide summary":"Masquer le r\u00e9sum\u00e9","Edit summary":"Modifier le r\u00e9sum\u00e9","Don\u0027t display post information":"Ne pas afficher les informations de la contribution","@title dialog":"dialogue de @title","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"Le fichier s\u00e9lectionn\u00e9 %filename ne peut pas \u00eatre transf\u00e9r\u00e9. Seulement les fichiers avec les extensions suivantes sont permis : %extensions.","Re-order rows by numerical weight instead of dragging.":"R\u00e9-ordonner les lignes avec des poids num\u00e9riques plut\u00f4t qu\u0027en les d\u00e9pla\u00e7ant.","Show row weights":"Afficher le poids des lignes","Hide row weights":"Cacher le poids des lignes","Autocomplete popup":"Popup d\u0027auto-compl\u00e9tion","Searching for matches...":"Recherche de correspondances...","Hide shortcuts":"Cacher les raccourcis"}} };;
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
!function(t,i){"use strict";i.behaviors.slick={attach:function(i,s){var e=this;t(".slick:not(.unslick)",i).once("slick",function(){var i=t(this),n=t("> .slick__slider",i),l=t("> .slick__arrow",i),a=t.extend({},s.slick,n.data("slick"));e.beforeSlick(n,l,a),n.slick(e.globals(n,l,a)),e.afterSlick(n,a)})},beforeSlick:function(s,e,n){var l,a=this;a.randomize(s),s.on("init.slick",function(r,o){var c=o.options.responsive||null;if(c&&c.length>-1)for(l in c)c.hasOwnProperty(l)&&"unslick"!==c[l].settings&&(o.breakpointSettings[c[l].breakpoint]=t.extend({},i.settings.slick,a.globals(s,e,n),c[l].settings))}),s.on("setPosition.slick",function(t,i){a.setPosition(s,e,i)})},afterSlick:function(i,s){var e=this,n=i.slick("getSlick");i.parent().on("click.slick.load",".slick-down",function(i){i.preventDefault();var e=t(this);t("html, body").stop().animate({scrollTop:t(e.data("target")).offset().top-(e.data("offset")||0)},800,s.easing)}),s.mousewheel&&i.on("mousewheel.slick.load",function(t,s){return t.preventDefault(),i.slick(0>s?"slickNext":"slickPrev")}),i.trigger("afterSlick",[e,n,n.currentSlide])},randomize:function(t){t.parent().hasClass("slick--random")&&!t.hasClass("slick-initiliazed")&&t.children().sort(function(){return.5-Math.random()}).each(function(){t.append(this)})},setPosition:function(i,s,e){if(i.attr("id")===e.$slider.attr("id")){var n=e.options,l=i.parent().parent(".slick-wrapper").length?i.parent().parent(".slick-wrapper"):i.parent(".slick");return t(".slick-slide",l).removeClass("slick-current"),t("[data-slick-index='"+e.currentSlide+"']",l).addClass("slick-current"),e.slideCount<=n.slidesToShow||n.arrows===!1?s.addClass("element-hidden"):s.removeClass("element-hidden")}},globals:function(s,e,n){return{slide:n.slide,lazyLoad:n.lazyLoad,dotsClass:n.dotsClass,rtl:n.rtl,appendDots:".slick__arrow"===n.appendDots?e:n.appendDots||t(s),prevArrow:t(".slick-prev",e),nextArrow:t(".slick-next",e),appendArrows:e,customPaging:function(t,s){var e=t.$slides.eq(s).find("[data-thumb]")||null,l=i.t(e.attr("alt"))||"",a="<img alt='"+l+"' src='"+e.data("thumb")+"'>",r=e.length&&n.dotsClass.indexOf("thumbnail")>0?"<div class='slick-dots__thumbnail'>"+a+"</div>":"";return r+t.defaults.customPaging(t,s)}}}}}(jQuery,Drupal);;
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
