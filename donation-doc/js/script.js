/* =====================================
    Template Name: courses
    Author Name: WebbyCrown
    Author URI: https://www.webbycrown.com/
    Description: courses - HTML5 Template.
    Version:1.0
========================================*/

/*======================================
[ JS Table of contents ]
01. General Open JS
    + Mobile menu
    + Menu click scroll page
02. Preloader JS
03.Sidebar Scroll JS

========================================*/

(function ($) {

  courses = {
    init: function() {
      this.general_open();
      this.Preloader_js();
      this.sidebar_scroll_js();
    },

    /*======================================
     01. General Open JS
    ========================================*/
    general_open: function() {

     /* Mobile menu */
      $("body").on('click', '.toggle-menu a', function () {
        $(".left-menu-bar").toggleClass('open');
        $("body").toggleClass('open');
      });

      /* Menu click scroll page */

      $(document).ready(function () {
        $(document).on("scroll", onScroll);

        //smoothscroll
        $('a[href^="#"]').on('click', function (e) {
          $(".left-menu-bar").toggleClass('open');
          $("body").toggleClass('open');

          e.preventDefault();
          $(document).off("scroll");

          $('a').each(function () {
            $(this).removeClass('active');
          })
          $(this).addClass('active');

          var target = this.hash,
          menu = target;
          $target = $(target);
          $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
          }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
          });
        });
      });

      function onScroll(event){
        var scrollPos = $(document).scrollTop();
        scrollPos = scrollPos + 200;
        $('.menu li').each(function () {
          var currLink = $(this).find( 'a' );
          var refElement = $(currLink.attr("href"));          
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.menu li a').removeClass("active");
            currLink.addClass("active");
          }
          else{
            currLink.removeClass("active");
          }
        });
      }



    },


    /*=====================================
    02. Preloader JS
    ======================================*/  
    Preloader_js: function() {
      //After 2s preloader is fadeOut
      $('.preloader').delay(2000).fadeOut('slow');
      setTimeout(function() {
      //After 2s, the no-scroll class of the body will be removed
        $('body').removeClass('no-scroll');
      }, 2000); //Here you can change preloader time
    },

    /*=====================================
    03.Sidebar Scroll JS
    ======================================*/ 
    sidebar_scroll_js: function() {
        var $i = 100;
        var scrollPos = 0;
        var Counter = 0;
        var $j = 200;
        jQuery(window).scroll(function(event){
          var st = jQuery('.menubar li a.active')[0].getBoundingClientRect();
          var el = jQuery('.left-wrap')[0].getBoundingClientRect();
          var scrollPosCur = jQuery(this).scrollTop();
          var test = (parseFloat(el.bottom) - 100 );

          if (scrollPosCur > scrollPos) {
            if( parseFloat(st.y) > parseFloat(test) ){
              jQuery('.left-wrap').scrollTop($i);
              $i = $i + 50;
            }
            $j = $i;
          } else {
            if( parseFloat(st.y) < parseFloat(test) ){
              jQuery('.left-wrap').scrollTop( $j );
              $j  = $j - 70;
            }
          }
          scrollPos = scrollPosCur;
        });
    }


  };
  courses.init();

})(jQuery);
