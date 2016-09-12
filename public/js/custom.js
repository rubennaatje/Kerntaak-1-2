$( document ).ready(function() {


    $(document).ready(function() {
        $('#fullpage').fullpage({
            scrollingSpeed: 1000
        });
    });


	$(function(){ // run after page loads
		$('#navigation ul.menu')
		.find('li.current_page_item,li.current_page_parent,li.current_page_ancestor,li.current-cat,li.current-cat-parent,li.current-menu-item')
			.addClass('active')
			.end()
			.superfish({autoArrows	: true});
	});

	// valid XHTML method of target_blank
	$(function(){ // run after page loads
		$('a[rel*=external]').click( function() {
			window.open(this.href);
			return false;
		});
	});

	// Style Tags

	$(function(){ // run after page loads
		$('p.tags a')
		.wrap('<span class="st_tag" />');
	});

	// Focus on search form on 404 pages
	$(function(){ // run after page loads
			// focus on search field after it has loaded
			$("body.error404 #content #s").focus();
	});


    $(function() {
        $('.menu-box').stickUp();
    });

	$('.mobile-button').on('click', function(){
		$('#navigation').toggle(500);
	});

	//$('#content .post').addClass('wow slideInLeft');
	//$('#sidebar>div').addClass('wow slideInRight');
	//$('#header').addClass('wow slideInDown');


    var wow = new WOW(
      {
        animateClass: 'animated',
        offset:       100
      }
    );
    wow.init();
    $('#moar').on('click', function() {
      var section = document.createElement('section');
      section.className = 'section--purple wow fadeInDown';
      this.parentNode.insertBefore(section, this);
    });
	

	$(function() {
		$( "#tabs" ).tabs({
		});
	});
	
	$(function() {
		$( "#accordion" ).accordion({
			heightStyle: 'content'
		});
	});
	
	$('.alert-close').on('click', function(){
		$(this).closest('.alert-box').find('div').hide();
	});


	//$('.stories-of-hope-row .story_small_box, .stories-of-hope-row .main-story-content').on('click', function(){
	//	$('.carousel_story_box').show();
	//});
	//
	//$('.carousel_story_bg, .carousel_story_close').on('click', function() {
	//   $('.carousel_story_box').hide();
	//});

    $(".stories-of-hope-nav-item a").attr("href", current_week_url);

    $('#recipe-search input[type=submit]').on('click', function() {

        form = $('#recipe-search');

        $('.overlay-loading').show();

        $.ajax({
            url: ajaxurl,
            method: "POST",
            data: {
                'action': 'recipes_search',
                'items': {year: $('select[name=year]').val(), region: $('select[name=region]').val()}
            },
            success: function (data) {

                if( $('select[name=year]').val().length != 0 || $('select[name=region]').val().length != 0 ) {
                    $('.page-content').hide();
                } else {
                    $('.page-content').show();
                }

                $('.overlay-loading').hide();
                if (data.length > 0) {
                    $('.ajax-search-results-recipes').html(data);
					$('.recipes_no_results').hide();
                } else {
                    $('.ajax-search-results-recipes').html('');
                    $('.recipes_no_results').show();
                }
            },
            error: function (errorThrown) {
                $('.overlay-loading').hide();
                console.log(errorThrown);
            }
        });


        return false;
    });
	
	$('#ctc1').zclip({
		path:'http://www.crsricebowl.org/wp-content/themes/crsricebowl2014/js/ZeroClipboard.swf',
		copy:function(){
			return $(this).prev().val();
		}
	});
	$('#ctc2').zclip({
		path:'http://www.crsricebowl.org/wp-content/themes/crsricebowl2014/js/ZeroClipboard.swf',
		copy:function(){
			return $(this).prev().val();
		}
	});
	$('#ctc3').zclip({
		path:'http://www.crsricebowl.org/wp-content/themes/crsricebowl2014/js/ZeroClipboard.swf',
		copy:function(){
			return $(this).prev().val();
		}
	});
	$('#ctc4').zclip({
		path:'http://www.crsricebowl.org/wp-content/themes/crsricebowl2014/js/ZeroClipboard.swf',
		copy:function(){
			return $(this).prev().val();
		}
	});
	
	$('.zclip').addClass('tip');
	$('.zclip').attr('data-tip','Copy&nbsp;to&nbsp;Clipboard');
	$('.tip').tipr();


    $( "#activate-rb" ).validate({
        rules: {
            post_firstname: {
                required: true
            },
            post_lastname: {
                required: true
            },
            post_emailaddress: {
                required: true,
                email: true
            }
        }
    });

    $( "#activate-rb-page" ).validate({
        rules: {
            post_firstname: {
                required: true
            },
            post_lastname: {
                required: true
            },
            post_emailaddress: {
                required: true,
                email: true
            }
        }
    });
	
	setTimeout(function(){
		$('iframe').show();
	},1000)
	

    $('#player').html("<iframe src='https://www.youtube.com/embed/06-yPBCZlIY?list=PLt5PsPjJAk-2ziLW0kdmG1r7_J2rNGiCI' width='100%' height='420' frameborder='0'></iframe>");


    !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
	

	
	$(function() {
		$('a[href*="#"]:not([href="#"])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top-110
					}, 1000);
					return false;
				}
			}
		});
	});
	
	
	$('.short_content_show').on('click', function(){
		$(this).toggleClass('active').closest('.short_content_box').find('.short_content').toggle();
		var button_content = $(this).html();
		if(button_content == 'Read more'){
			$(this).html('Hide');
		}
		if(button_content == 'Hide'){
			$(this).html('Read more');
		}
	})
	
	

});

"use strict";
function r(f){/in/.test(document.readyState)?setTimeout('r('+f+')',9):f()}
r(function(){
    if(!document.getElementsByClassName) {
        // IE8 support
        var getElementsByClassName = function(node, classname) {
            var a = [];
            var re = new RegExp('(^| )'+classname+'( |$)');
            var els = node.getElementsByTagName("*");
            for(var i=0,j=els.length; i<j; i++)
                if(re.test(els[i].className))a.push(els[i]);
            return a;
        }
        var videos = getElementsByClassName(document.body,"youtube");
    }
    else {
        var videos = document.getElementsByClassName("youtube");
    }

    var nb_videos = videos.length;
    for (var i=0; i<nb_videos; i++) {
        // Based on the YouTube ID, we can easily find the thumbnail image
		if(videos[i].getAttribute('thumb') !== null) {
			videos[i].style.backgroundImage = 'url(http://img.youtube.com/vi/' + videos[i].getAttribute('thumb') + '/maxresdefault.jpg)';
		}

        // Overlay the Play icon to make it look like a video player
        var play = document.createElement("div");
        play.setAttribute("class","play");
        videos[i].appendChild(play);

        videos[i].onclick = function() {
            // Create an iFrame with autoplay set to true
            var iframe = document.createElement("iframe");
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1";
            if (this.getAttribute("data-params")) iframe_url+='&'+this.getAttribute("data-params");
            iframe.setAttribute("src",iframe_url);
            iframe.setAttribute("frameborder",'0');

            // The height and width of the iFrame should be the same as parent
            iframe.style.width  = this.style.width;
            iframe.style.height = this.style.height;

            // Replace the YouTube thumbnail with YouTube Player
            this.parentNode.replaceChild(iframe, this);
        }
    }
});

//$('.feeds').html('');
//
//$.ajax({
//    url: ajaxurl,
//    method: "POST",
//    data: {
//        'action': 'get_tweets'
//    },
//    success: function (data) {
//        $('.feeds').html(data);
//    },
//    error: function (errorThrown) {
//        $('.feeds').html('Tweets load error: ' + errorThrown);
//    }
//});
