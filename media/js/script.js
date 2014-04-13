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

(function($) {

$.event.special.mousewheel = {
	setup: function() {
		var handler = $.event.special.mousewheel.handler;
		
		// Fix pageX, pageY, clientX and clientY for mozilla
		if ( $.browser.mozilla )
			$(this).bind('mousemove.mousewheel', function(event) {
				$.data(this, 'mwcursorposdata', {
					pageX: event.pageX,
					pageY: event.pageY,
					clientX: event.clientX,
					clientY: event.clientY
				});
			});
	
		if ( this.addEventListener )
			this.addEventListener( ($.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
		else
			this.onmousewheel = handler;
	},
	
	teardown: function() {
		var handler = $.event.special.mousewheel.handler;
		
		$(this).unbind('mousemove.mousewheel');
		
		if ( this.removeEventListener )
			this.removeEventListener( ($.browser.mozilla ? 'DOMMouseScroll' : 'mousewheel'), handler, false);
		else
			this.onmousewheel = function(){};
		
		$.removeData(this, 'mwcursorposdata');
	},
	
	handler: function(event) {
		var args = Array.prototype.slice.call( arguments, 1 );
		
		event = $.event.fix(event || window.event);
		// Get correct pageX, pageY, clientX and clientY for mozilla
		$.extend( event, $.data(this, 'mwcursorposdata') || {} );
		var delta = 0, returnValue = true;
		
		if ( event.wheelDelta ) delta = event.wheelDelta/120;
		if ( event.detail     ) delta = -event.detail/3;
		if ( $.browser.opera  ) delta = -event.wheelDelta;
		
		event.data  = event.data || {};
		event.type  = "mousewheel";
		
		// Add delta to the front of the arguments
		args.unshift(delta);
		// Add event to the front of the arguments
		args.unshift(event);

		return $.event.handle.apply(this, args);
	}
};

$.fn.extend({
	mousewheel: function(fn) {
		return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
	},
	
	unmousewheel: function(fn) {
		return this.unbind("mousewheel", fn);
	}
});

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

		/*拖动滚轮*/
	function addScroll(){
		this.init.apply(this, arguments);
	}
	addScroll.prototype = {
		init: function(mainBox,contentBox,className){
			var mainBox = $(mainBox);
			var _this = this;
			mainBox.each(function(){
				var contentBox = $(this).children();
				var _scroll = _this._createScroll($(this), contentBox, className);
				_this._resizeScroll(_scroll, contentBox,$(this));
				_this._scrollScroll(_scroll, $(this), contentBox);
				_this._dragScroll(_scroll, $(this), contentBox);
			});
			
		},
		_createScroll : function(mainBox, contentBox, className){
			//$("."+className).remove();
			var scrollBox = $("<div></div>");
			var scroll = $("<span></span>");
			scroll.appendTo(scrollBox);
			scrollBox.addClass(className);
			scrollBox.appendTo(mainBox);
			
			return scroll;
		},
		_resizeScroll : function(scroll, contentBox, mainBox){
			var parent = scroll.parent();
			var realHeight = contentBox.height();
			var _height = mainBox.height();
			var result = _height/realHeight*_height;
			scroll.css({
				'height':result+"px",
				'width': parent.offsetWidth + "px",
			});
			if(result >= _height){
				scroll.css('display','none');
				
			}else{
				if(contentBox.height()>mainBox.height()){
					if((mainBox.offset().top - contentBox.offset().top)>(contentBox.height()-mainBox.height())){
						contentBox.css('top',-(contentBox.height()-mainBox.height()));
						var otop =(parent.height()-scroll.height());
						scroll.css('top', otop);
					}else{
						var otop =(parent.height()-scroll.height())/(contentBox.height()-mainBox.height())*(mainBox.offset().top - contentBox.offset().top);
						scroll.css('top', otop);
					}
				
				}
				scroll.css('display','block');
				
			}
		},
		_dragScroll : function(scroll, mainBox, contentBox){
			var _height = mainBox.height();
			scroll.mousedown(function(event){
				var _this = this;
				var scrollHeight = scroll.offset().top - scroll.parent().offset().top;
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
		},
		_scrollScroll: function(scroll, mainBox, contentBox){
				if(contentBox.height()< mainBox.height())return false;
				$(mainBox).mousewheel(function(event, delta) {
					if(contentBox.height()< mainBox.height())return false;
					var iTarget = delta > 0 ? -10 : 10;
					togetherMove(iTarget);
					event.stopPropagation();
                    event.preventDefault();
				});
			function togetherMove(target){
				var scroll = mainBox.find(".scroll span");
				var scrollParent = scroll.parent();
				var scrollTop = scroll.offset().top+target-scrollParent.offset().top;
				var ulTop = contentBox.offset().top+((mainBox.height() - contentBox.height())*target/(scrollParent.height()-scroll.height()))-mainBox.offset().top;

				scrollTop<=0&& (scrollTop=0);
				scrollTop>=scrollParent.height()-scroll.height()&&(scrollTop=scrollParent.height()-scroll.height());

				(ulTop>=0)&& (ulTop=0);
				(ulTop<=mainBox.height()-contentBox.height())&&(ulTop = mainBox.height()-contentBox.height());

				contentBox.css('top', ulTop);
				scroll.css('top', scrollTop);
			}
		}
	}

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



	new addScroll(".pc_list", "ul", "scroll");
});

/*后台管理的slide的ul*/
function bindUl(){
	var menu = $(".sc_ul>li>a");
	var subMenu = $(".sc_ul>li>ul");
	subMenu.css("display", "none");
	menu.each(function(){
		$(this).click(function(){
			if($(this).next("ul").css("display") == 'none'){
				subMenu.slideUp(400);
				$(this).next("ul").slideDown(400);
			}else{
				$(this).next("ul").slideUp(400);
			}
		});
	});
}

/*选择开通时长的样式*/
function duringTime(className){
	var oa = $("."+className+" li a");
	oa.click(function(){
		oa.removeClass("current");
		$(this).addClass("current");
		return false;
	});
}


/*游戏中心*/
function displayAndHide(className1, className2){
	$(className1).mouseover(function(){
		$(className2).show();
		$(this).hide();
	});
	$(className2).mouseover(function(){
		$(this).show();
	});
	$(className2).mouseout(function(){
		$(this).hide();
		$(className1).show();
	});
}

/*超级管理页面的编辑框*/
function editForm(className1, className2){
	$(className1).css("display","none");
	$(className2).css("display", "block");
	return false;
}
function editItemStudent(className1, className2){
	var targetEdit = $(className2);
	var ocheckBox = $(className1+" input:checkbox:checked");
	$(className2+" tr th").parents("tr").nextAll().remove();
	var editArray = [];
	ocheckBox.each(function(){
		var itemValue = $(this).parents("tr").find("span");
		itemValueArray = [];
		itemValue.each(function(){
			itemValueArray.push($(this).html());
		});
		editArray.push(itemValueArray);
	});
	for(var i = 0; i < editArray.length-1; i++){
		ohtml = '<tr><td><input type="text" class="name" value="'+editArray[i][0]+'"></td>';
		ohtml += '<td><input type="text" class="nick_name" value="'+editArray[i][1]+'"></td>';
		ohtml += '<td><input type="text" class="email" value="'+editArray[i][2]+'"></td>';
		ohtml += '<td><input type="text" class="password" value="'+editArray[i][3]+'"></td>';
		ohtml += '<td><input type="text" class="ceilphone" value="'+editArray[i][4]+'"></td>';
		ohtml += '<td><input type="text" class="active_code" value="'+editArray[i][5]+'"></td>';
		ohtml += '<td><input type="text" class="piano_com" value="'+editArray[i][6]+'"></td>';
		ohtml += '<td><input type="text" class="type" value="'+editArray[i][7]+'"></td>';
		ohtml += '<td><input type="text" class="level" value="'+editArray[i][8]+'"></td>';
		ohtml += '<td><input type="text" class="month_score" value="'+editArray[i][9]+'"></td>';
		ohtml += '<td><input type="text" class="high_score" value="'+editArray[i][10]+'"></td>';
		ohtml += '<td><input type="text" class="last_time" value="'+editArray[i][11]+'"></td>';
		ohtml += '<td><input type="text" class="times" value="'+editArray[i][12]+'"></td>';
		targetEdit.append(ohtml);
	}
}
function editItemManage(className1, className2){
	var targetEdit = $(className2);
	var ocheckBox = $(className1+" input:checkbox:checked");
	$(className2+" tr th").parents("tr").nextAll().remove();
	var editArray = [];
	ocheckBox.each(function(){
		var itemValue = $(this).parents("tr").find("span");
		itemValueArray = [];
		itemValue.each(function(){
			itemValueArray.push($(this).html());
		});
		editArray.push(itemValueArray);
	});
	for(var i = 0; i < editArray.length-1; i++){
		ohtml = '<tr><td><input type="text" class="email" value="'+editArray[i][0]+'"></td>';
		ohtml += '<td><input type="text" class="passwork" value="'+editArray[i][1]+'"></td>';
		ohtml += '<td><input type="text" class="piano_com" value="'+editArray[i][2]+'"></td>';
		ohtml += '<td><input type="text" class="invite_code" value="'+editArray[i][3]+'"></td>';
		ohtml += '<td><input type="text" class="op_time" value="'+editArray[i][4]+'"></td>';
		ohtml += '<td><input type="text" class="type" value="'+editArray[i][5]+'"></td>';
		ohtml += '<td><input type="text" class="open_time" value="'+editArray[i][6]+'"></td>';
		ohtml += '<td><input type="text" class="end_time" value="'+editArray[i][7]+'"></td>';
		ohtml += '<td><input type="text" class="ceil_phone" value="'+editArray[i][8]+'"></td></tr>';
		targetEdit.append(ohtml);
	}
}
function editItemGame(className1, className2){
	var targetEdit = $(className2);
	var ocheckBox = $(className1+" input:checkbox:checked");
	$(className2+" tr th").parents("tr").nextAll().remove();
	var editArray = [];
	ocheckBox.each(function(){
		var itemValue = $(this).parents("tr").find("span");
		itemValueArray = [];
		itemValue.each(function(){
			itemValueArray.push($(this).html());
		});
		editArray.push(itemValueArray);
	});
	for(var i = 0; i < editArray.length-1; i++){
		ohtml = '<tr><td><input type="text" class="name" value="'+editArray[i][0]+'"></td>';
		ohtml += '<td><input type="text" class="level" value="'+editArray[i][1]+'"></td>';
		ohtml += '<td><span type="text" class="song">'+editArray[i][2]+'</span></td></tr>';
		targetEdit.append(ohtml);
	}
}
/*全选与反选*/
function xuan(allSelect){
	var ocheckBox = $(allSelect).parents("tr").prevAll().find("input:checkbox");
	$(allSelect).click(function(){
		if(this.checked){
			ocheckBox.each(function(){
				this.checked = true;
			});
		}else{
			ocheckBox.each(function(){
				this.checked = false;
			});
		}
	});
	ocheckBox.click(function(){
		var hasChecked =  $(allSelect).parents("tr").prevAll().find("input:checkbox:checked");
		console.log(hasChecked.length);
		console.log(ocheckBox.length);
		if(hasChecked.length == ocheckBox.length){
			$(allSelect).prop("checked", true);
		}else{
			$(allSelect).removeAttr("checked");
		}
	})
}
function fanxuan(oppositeSelect){
	$(oppositeSelect).click(function(){
		var ocheckBox = $(oppositeSelect).parents("tr").prevAll().find("input:checkbox");
		if(!$(oppositeSelect).attr("checked")){
			$(this).attr("checked",true);			
		}else{
			$(this).removeAttr("checked");
		}
		ocheckBox.each(function(){
			if(this.checked){
				this.checked = false;
			}else{
				this.checked = true;
			}
		});
	});	
}



function ajaxfn(url, data, callback){
	$.ajax({
			type: "POST",
			url: url,
			data: {data:data},
			dataType: 'json',
			success: function(data){
				callback&& callback(data);
			},
			error: function(){
				alert("nono");
			},
		});
}