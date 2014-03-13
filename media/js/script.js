/***
 * Excerpted from "HTML5 and CSS3",
 * published by The Pragmatic Bookshelf.
 * Copyrights apply to this code. It may not be used to create training material, 
 * courses, books, articles, and the like. Contact us if you are in doubt.
 * We make no guarantees that this code is fit for any purpose. 
 * Visit http://www.pragmaticprogrammer.com/titles/bhh5 for more book information.
***/
(function($){  
  
  $.fn.placeholder = function(){   
    return this.each(function() {  
	      if($(this).attr("type") == "password"){
	        var new_field = $("<input type='text'>");
	        $(this).hide();
	        new_field.attr("rel", $(this).attr("id"));
	        new_field.attr("value", $(this).attr("placeholder"));
	        new_field.focus(function(){
	          $(this).hide();
	          $('input#' + $(this).attr("rel")).show().focus();
	        });

	        $(this).blur(function(){
	          if($(this).val() == ""){
	            $(this).hide();
	            $('input[rel=' + $(this).attr("id") + ']').show();
	          };
	        });

	        $(this).parent().append(new_field);
	        
	      }else{
	        $(this).focus(function(){
	          if($(this).val() == $(this).attr("placeholder")){
	            $(this).val("");
	          };
	        });

	        $(this).blur(function(){
	          if($(this).val() == ""){
	            $(this).val($(this).attr("placeholder"));
	          };
	        });

	        $(this).blur();
	      }
    });  
  };
  
})(jQuery); 

$(function () {
	var $signup = $('.regist_form'), $signin = $('.login_form'), exchange;

	exchange = function ($now, $new) {
		$now.animate({'opacity': 0, 'right': '-100px'}, 200, function () {
			$now.hide();
			$new.show().animate({'opacity': 1, 'right': 0}, 200);
		});
	}

	$('.regist_form a:first').click(function () {
		exchange($signup, $signin);
		return false;
	});

	$('.login_form a:first').click(function () {
		exchange($signin, $signup);
		return false;
	});
});

$(function(){
	function hasPlaceholderSupport(){
		var i = document.createElement('input');
		return 'placeholder' in i;
	}
	if(!hasPlaceholderSupport()){
		$('.main').placeholder();
	}
});

$(function(){
	/*点击邀请的样式*/
	$('.operate .invite').click(function(){
		$('.pc_list li').removeClass('current_list');
		var span = $(this).parent();
		var li = span.parent();
		li.addClass('current_list');
		var spanTop = span.offset().top - $('.pc_list').offset().top;
		$('.ul_invite_type').css({
			'top': spanTop+"px",
			'display': 'block',
		});
		return false;
	});
	$(document).click(function(event){
		var e = event || window.event;
		$('.ul_invite_type').css('display','none');
		$('.pc_list li').removeClass('current_list');
	});

	/*点击查看资料*/
	$('.check_info').click(function(){
		var friend_info = $('.friend_info');
		$('.shadow_div').show();
		friend_info.show();
		var width = ($(window).width()- friend_info.width())/2;
		var height = ($(window).height() - friend_info.height())/2;
		console.log(friend_info.width());

		friend_info.css({
			'top': height+"px",
			'left':width+"px",
		});
		return false;
	});
	$('#friend_info_close').click(function(){
		$('.shadow_div').hide();
		$('.friend_info').hide();
	});

		/*拖动滚轮*/
	function addScroll(){
		this.init.apply(this, arguments);
	}
	addScroll.prototype = {
		init: function(mainBox,contentBox,className){
			var mainBox = $(mainBox);
			var _this = this;
			mainBox.each(function(){
				console.log(this);
				var contentBox = $(this).children();
				console.log(contentBox);
				var _scroll = _this._createScroll(this, className);
				_this._resizeScroll(_scroll, contentBox,$(this));
				_this._dragScroll(_scroll, $(this), contentBox);
			});
			
		},
		_createScroll : function(mainBox, className){
			var scrollBox = $("<div></div>");
			var scroll = $("<span></span>");
			scroll.appendTo(scrollBox);
			scrollBox.addClass(className);
			scrollBox.appendTo(mainBox);
			return scroll;
		},
		_resizeScroll : function(scroll, contentBox, mainBox){
			var parent = scroll.parent();
			var realHeight = contentBox.outerHeight();
			var _height = mainBox.outerHeight();
			var result = _height/realHeight*_height;
			scroll.css({
				'height':result+"px",
				'width': parent.offsetWidth + "px",
			})
			scroll.addClass('scroll');
			if(result >= _height){
				scroll.css('display','none');
				
			}else{
				scroll.css('display','block');
				
			}
		},
		_dragScroll : function(scroll, mainBox, contentBox){
			var _height = mainBox.height();
			scroll.mousedown(function(event){
				var _this = this;
				var scrollHeight = scroll.offset().top - scroll.parent().offset().top;
				console.log(scrollHeight);
				var e = event || window.event;
				var top = e.clientY;
				$(document).mousemove(function(){scrollGo()});
				$(document).mouseup(function(event){
					$(this).unbind("mousemove");
					$(document).unbind("mousemove");
					$(document).unbind("mouseup");
					this.releaseCapture && this.releaseCapture();
					return false;
				});
				function scrollGo(event){
					var e = event || window.event;
					var _top = e.clientY;
					var position = _top - top + scrollHeight;
					if(position > mainBox.height() - scroll.height()){
						position = (_height - scroll.height());
					}
					if(position < 0) position = 0;
					scroll.css('top',position+"px");
					contentBox.css('top', -(position/((mainBox.height())/contentBox.height()))+"px");

				}
				this.setCapture && this.setCapture();
				e.preventDefault();
				return false;
			});
		}
	}

	new addScroll(".pc_list", "ul", "scroll");
});