/*!
 * cuSel -- stylized replacement for standard select
 * 
 * https://github.com/fetis/cusel
 *   
 * @version 3.0 alpha
 *
 * @requires jQuery 1.7+     
 * @requires jScrollPane.js
 * @requires jquery.mousewheel.js
 * 
 * Originally based on cuSel 2.5 by Evgeniy Ryzhkov, Alexey Choporov & Roman Omelkovitch
 *  
 */   



/***
 * Replace selects
 * 
 * @param {Object} params Replacement params:
 *  {String} changedEl  Selector which specify replaced selects
 *  {Number} visRows Amount of visible rows 
 *  {Boolean} scrollArrows  Flag for arrows in scroll box 
 *  {String} refreshEl Comma-separated list of refreshed selects. Useby by cuSelRefresh only 
 */ 
function cuSel(params) {
  var initTimeout = 250,  // timeout per init attempt
    initMaxAttempts = 20; // max attempts count
    
	$(params.changedEl).each(function(num) {
    var chEl = $(this);
    
    // check on initialized element
    if (!chEl.is("select") || chEl.prop("multiple"))
     return;
     
    _init(chEl, num, 1)
  });
  
  /***
   * Init select function
   * @param {jQuery} chEl Initialized select element
   * @param {Integer} num Index in array of elements, used for ID generation   
   * @param {Integer} attempt Attempt counts      
   */
   function _init(chEl, num, attempt) {
     var chElWid = chEl.outerWidth(); // ширина селекта
     
     if (chElWid <= 0) {
      if (attempt <= initMaxAttempts) {
        // delay init, until width  will be calculated
        window.setTimeout(function(){ _init(chEl, num, attempt+1); }, initTimeout);
        return;
      } else {
        // we don't have more attempts, set default width and continue
        chElWid = 200;
      }
     }
      
     var chElClass = chEl.prop("class"), // класс селекта
      chElId = chEl[0].id ? chEl[0].id : 'cuSel-' + Date.now() + '-'+num, // id
      chElName = chEl.prop("name"), // имя
      defaultVal = chEl.val(), // начальное значение
      activeOpt = chEl.find("option[value='"+defaultVal+"']").eq(0),    	
    	defaultAddTags = activeOpt.attr("addTags") ? activeOpt.attr("addTags") : '', // добавляем тег для стандартного значения
    	defaultSetClass = activeOpt.data('setclass') ? activeOpt.data('setclass') : '', // добавляем класс от активного опциона по дефаулта, для кастомного оформления
    	defaultText = activeOpt.text(), // начальный текст
      disabledSel = chEl.prop("disabled"), // заблокирован ли селект
      scrollArrows = params.scrollArrows,
      chElOnChange = chEl.prop("onchange"),
      chElTab = chEl.prop("tabindex");
      
      if(!disabledSel)
      {
        classDisCuselText = "", // для отслеживания клика по задизайбленному селекту
        classDisCusel=""; // для оформления задизейбленного селекта
      }
      else
      {
        classDisCuselText = "classDisCuselLabel";
        classDisCusel="classDisCusel";
      }
      
      if(scrollArrows)
      {
        classDisCusel+=" cuselScrollArrows";
      }
       
  	chEl.find('option').addClass('cuselItem'); // добавляем каждому опциону класс item, чтобы далее обращаться к этому классу, а не к span
      activeOpt.addClass("cuselActive");  // активному оптиону сразу добавляем класс для подсветки
    
    var optionStr = chEl.html(), // список оптионов
  
      
    /* 
      делаем замену тегов option на span, полностью сохраняя начальную конструкцию.
      value меняем на val, т.к. jquery отказывается воспринимать value у span
    */
    itemStr = optionStr.replace(/option/ig,"span").replace(/value=/ig,"val=");
    
    /* 
      для IE проставляем кавычки для значений, т.к. html() возращает код без кавычек
      что произошла корректная обработка value должно быть последний атрибутом option,
      например <option class="country" id="ukraine" value="/ukrane/">Украина</option>
    */
    if($.browser.msie && parseInt($.browser.version) < 9)
    {
      var pattern = /(val=)(.*?)(>)/g;
      itemStr = itemStr.replace(pattern, "$1'$2'$3");
    }
    
    /* каркас стильного селекта */
    var cuselFrame = '<div class="cusel '+chElClass+' '+classDisCusel+'"'+
            ' id=cuselFrame-'+chElId+
            ' style="width:'+chElWid+'px"'+
            ' tabindex="'+chElTab+'"'+
            '>'+
            '<div class="cuselFrameRight"></div>'+
            '<div data-class="'+defaultSetClass+'" class="cuselText '+defaultSetClass+'">'+defaultAddTags + '<label>'+activeOpt.text()+'</label></div>'+
            '<div class="cusel-scroll-wrap"><div class="cusel-scroll-pane" id="cusel-scroll-'+chElId+'">'+ 
            itemStr+
            '</div></div>'+
            '<input type="hidden" id="'+chElId+'" name="'+chElName+'" value="'+defaultVal+'" />'+
            '</div>';
            
            
    /* удаляем обычный селект, на его место вставляем стильный */
    chEl.replaceWith(cuselFrame);
    
    /* если был поцеплен onchange - цепляем его полю */
    if(chElOnChange) $("#"+chElId).bind('change',chElOnChange);
    
    
    var newSel = $("#cuselFrame-"+chElId),
      arrItems = newSel.find("span.cuselItem"),
      defaultHeight;
  	
  	/* оборачиваем текст оптионов в label, чтобы отделить от addTags */
  	arrItems.wrapInner('<label/>');
  	
    /*
      устаналиваем высоту выпадающих списков основываясь на числе видимых позиций и высоты одной позиции
      при чем только тем, у которых число оптионов больше числа заданного числа видимых
    */  
      
      if(!arrItems.eq(0).find('label').text())
      {
        defaultHeight = arrItems.eq(1).innerHeight();
        arrItems.eq(0).css("height", arrItems.eq(1).height());
      } 
      else
      {
        defaultHeight = arrItems.eq(0).innerHeight();
      }
      
    
    if(arrItems.length>params.visRows)
    {
      newSel.find(".cusel-scroll-wrap").eq(0)
        .css({height: defaultHeight*params.visRows+"px", display : "none", visibility: "visible" })
        .children(".cusel-scroll-pane").css("height",defaultHeight*params.visRows+"px");
    }
    else
    {
      newSel.find(".cusel-scroll-wrap").eq(0)
        .css({display : "none", visibility: "visible" });
    }
    
    /* вставляем в оптионы дополнительные теги */
    
    var arrAddTags = $("#cusel-scroll-"+chElId).find("span[addTags]"),
      lenAddTags = arrAddTags.length;
      
      for(i=0;i<lenAddTags;i++) arrAddTags.eq(i)					
                      .prepend(arrAddTags.eq(i).attr("addTags"))
                      .removeAttr("addTags");
                      
    cuselEvents();
   
   }     

/* ---------------------------------------
  привязка событий селектам
------------------------------------------
*/
function cuselEvents() {
  var cb = cuselGetBox();

  $("html").off("click.cusel");
  
  $("html").on("click.cusel", function(e) {		
  
      var clicked = $(e.target),
        clickedId = clicked.attr("id"),
        clickedClass = clicked.prop("class");
		
		
        
      /* если кликнули по самому селекту (текст) */
      if( (clicked.hasClass("cuselText") || clicked.hasClass("cuselFrameRight") || clicked.parents(".cuselText:first").length ) && 
          !clicked.parents('.cusel:first').hasClass("classDisCusel") ) {
        var cuselWrap = clicked.parents('.cusel:first').find(".cusel-scroll-wrap").eq(0);
        
        /* если выпадающее меню скрыто - показываем */
        cuselShowList(cuselWrap);
      }
      /* если кликнули по самому селекту (контейнер) */
      else if(clicked.hasClass("cusel") && !clicked.hasClass("classDisCusel") && clicked.is("div"))
      {
    
        var cuselWrap = clicked.find(".cusel-scroll-wrap").eq(0);
        
        /* если выпадающее меню скрыто - показываем */
        cuselShowList(cuselWrap);
    
      }
      
      /* если выбрали позицию в списке */
      else if( ( clicked.parents('.cuselItem:first').length && !clicked.parents('.cuselItem:first').hasClass("cuselActive") ) || ( clicked.is('.cuselItem') && !clicked.hasClass("cuselActive") ) ) {
	  
		var setItem = clicked.is('.cuselItem') ? clicked : clicked.parents('.cuselItem:first'),			
			select = clicked.parents('.cusel:first').length ? clicked.parents('.cusel:first') : $(cb.data("cusel-select")),
			i = setItem.index();       

        if (!select.length)
          return;
		  
		  
        
        select
          .removeClass("cuselOpen")
          .find(".cuselActive").removeClass("cuselActive").end()
          .find(".cuselItem").eq(i).addClass("cuselActive");		  
		  
		cuselChange(select,setItem);
          
        cb.hide();
        // return focus to control
        select.focus();
      }
      
      else if(clicked.parents(".cusel-scroll-wrap").is("div")) {
        return;
      }
      
      /*
        скрываем раскрытые списки, если кликнули вне списка
      */
      else {
        if (cb.is(":visible")) {
          cb.hide();
          $(".cuselOpen").removeClass("cuselOpen");
        }
      }
  }); 
    
  $(".cusel").off("keydown.cusel"); /* чтобы не было двойного срабатывания события */
  $(".cusel").on("keydown.cusel", function(event) {
	var select = $(this),
		open = select.is('.cuselOpen') ? true : false,
		cb = $('#cuselBox');
    /*
      если селект задизайблин, с него работает только таб
    */
    var key, keyChar;
      
    if(window.event) key=window.event.keyCode;
    else if (event) key=event.which;
    
    if(key==null || key==0 || key==9) return true;
    
    if(select.prop("class").indexOf("classDisCusel")!=-1) return false;
	
	switch (key) {
		case 32: { // если нажали пробел
			if (!open)
				select.trigger('click');
			return false;
			break;
		}
		case 40: // если нажали стрелку вправо или вниз
		case 39: {
			if (open) {
				var cuselActive = cb.find(".cuselOptHover").eq(0).length ? cb.find(".cuselOptHover").eq(0) : cb.find(".cuselActive").eq(0),
					cuselActiveNext = cuselActive.next();
				
				if(cuselActiveNext.is(".cuselItem")) {				  
					cuselActive.removeClass("cuselOptHover");
					cuselActiveNext.addClass("cuselOptHover");
					
					/* прокручиваем к текущему оптиону */
					cuselScrollToCurent(cb.find(".cusel-scroll-wrap").eq(0));
				}
			} else {
				var cuselActive = select.find(".cuselOptHover").eq(0).length ? select.find(".cuselOptHover").eq(0) : select.find(".cuselActive").eq(0),
					cuselActiveNext = cuselActive.next();				
				
				if(cuselActiveNext.is(".cuselItem"))				
					cuselActiveNext.trigger('click');				
			}
			return false;
			break;
		}
		case 37: // если нажали стрелку влево или вверх
		case 38: {
			if (open) {
				var cuselActive = cb.find(".cuselOptHover").eq(0).length ? cb.find(".cuselOptHover").eq(0) : cb.find(".cuselActive").eq(0),
					cuselActivePrev = cuselActive.prev();
				
				if(cuselActivePrev.is(".cuselItem")) {				  
					cuselActive.removeClass("cuselOptHover");
					cuselActivePrev.addClass("cuselOptHover");
				
					/* прокручиваем к текущему оптиону */
					cuselScrollToCurent(cb.find(".cusel-scroll-wrap").eq(0));				
				}
			} else {
				var cuselActive = select.find(".cuselOptHover").eq(0).length ? select.find(".cuselOptHover").eq(0) : select.find(".cuselActive").eq(0),
					cuselActivePrev = cuselActive.prev();
				
				if(cuselActivePrev.is(".cuselItem"))
					cuselActivePrev.trigger('click');				
			}
			return false;
			break;
		}
		case 27: { // если нажали esc
			if (open) {
				select
				.removeClass("cuselOpen");
				cb.hide();
			} else
				select.blur();			
			break;
		}
		case 13: { // если нажали enter
			if (open) 
				cb.find(".cuselOptHover").eq(0).trigger('click').removeClass("cuselOptHover");
      return false;
			break;
		}
	}

  });
  
  /*
    функция отбора по нажатым символам (от Alexey Choporov)
    отбор идет пока пауза между нажатиями сиволов не будет больше 0.5 сек
    keypress нужен для отлова символа нажатой клавиш
  */
	var arr = [];
	$(".cusel").keypress(function(event) {
		var select = $(this),
			open = select.is('.cuselOpen') ? true : false;
			
		if (open) {
			var key,
				keyChar,
				cb = $('#cuselBox')
			if (window.event)
				key=window.event.keyCode;
			else if (event)
				key=event.which;
			
			if (key==null || key==0 || key==9)
				return true;
			
			if ($(this).prop("class").indexOf("classDisCusel")!=-1)
				return false;
	 
			arr.push(event);
			clearTimeout($.data(this, 'timer'));
			var wait = setTimeout(function() { handlingEvent() }, 500);
			select.data('timer', wait);
			function handlingEvent() {
				var charKey = [];
				for (var iK in arr) {
					if (window.event)
						charKey[iK]=arr[iK].keyCode;
					else if (arr[iK])
						charKey[iK]=arr[iK].which;
					charKey[iK]=String.fromCharCode(charKey[iK]).toUpperCase();
				}
				var arrOption=cb.find(".cuselItem label"),
					colArrOption=arrOption.length,
					i,
					letter;
				for (i=0;i<colArrOption;i++) {
					var match = true;
					for (var iter in arr) {
						letter=arrOption.eq(i).text().charAt(iter).toUpperCase();
						if (letter!=charKey[iter])
							match=false;
				  
					}
					if (match) {
						cb.find(".cuselOptHover").removeClass("cuselOptHover").end().find(".cuselItem").eq(i).addClass("cuselOptHover");
				
						/* прокручиваем к текущему оптиону */
						cuselScrollToCurent(cb.find(".cusel-scroll-wrap").eq(0));
						arr = arr.splice;
						arr = [];
						break;
						return true;
					}	
				}
				arr = arr.splice;
				arr = [];
			}
			if ($.browser.opera && window.event.keyCode!=9)
				return false;
		}
	});
  
}

/***
* Event change
*/ 

function cuselChange(select,setItem) {
	var addClass = setItem.data('setclass') ? setItem.data('setclass') : '',
		prevClass = select.find('.cuselText').data('class') ? select.find('.cuselText').data('class') : '',
		setItemVal = setItem.attr("val");
		
	 // preserve empty value here, otherwise return text itself according standard behavior
    if (typeof setItemVal == "undefined")
        setItemVal = setItem.find('label').text();
		
	select
		.find(".cuselText").removeClass(prevClass).data('class',addClass).addClass(addClass).html( setItem.html() ).end()
		.find("input").val(setItemVal).change();
}
  
  /***
   * Toggle dropdown list visibility
   */ 
  function cuselShowList(cuselWrap) {
    var cuselMain = cuselWrap.parent(".cusel"),
      cb = cuselGetBox();

    // remove from all selects  
    $(".cuselOpen").removeClass("cuselOpen");
    
    /* если выпадающее меню скрыто - показываем */
    if(cb.is(":hidden")) {
      cb.empty();
      cuselWrap.clone(true)
        .appendTo(cb)
        .show();
        
      cb.show()
        // store node on data for future usage
        .data("cusel-select", cuselMain[0]);
      
      if ($.ui) {
        // using more intelligent position method from $.ui here
        cb.position({
          my: "left top",
          at: "left bottom",
          of: cuselMain,
        });
      } else {
        var pos = cuselMain.offset();
        cb.offset({
          left: pos.left,
          top: pos.top + cuselMain.outerHeight()
        });
      }
      cb.css("min-width", cuselMain.outerWidth() + "px");

      cuselMain.addClass("cuselOpen");
  
      var cuselArrows = cuselMain.hasClass("cuselScrollArrows");
      cb.find(".cusel-scroll-pane")
        .jScrollPaneCusel({showArrows: cuselArrows});
          
      /* прокручиваем к текущему оптиону */
      cuselScrollToCurent(cb.find(".cusel-scroll-wrap"));
    } else {
      // otherwise hide menu
      cb.hide()
        .removeData("cusel-select");
    }
  }
  
/***
* Scroll down list to the current element
*/
	function cuselScrollToCurent(cuselWrap) {
		var cuselScrollEl = cuselWrap.find(".cuselOptHover:first").length ? cuselWrap.find(".cuselOptHover:first") : cuselWrap.find(".cuselActive:first");
  
		if(cuselWrap.find(".jScrollPaneTrack:first").length && cuselScrollEl.length) {
			var posCurrentOpt = cuselScrollEl.position(),
			idScrollWrap = cuselWrap.find(".cusel-scroll-pane:first")[0].id;  
			cuselWrap.find(".cusel-scroll-pane")[0].scrollTo(posCurrentOpt.top);  
		} 
	}
  
  /***
   * Return or create box for dropdown list
   */ 
  function cuselGetBox() {
    var b = $("#cuselBox");
    if (!b.length) {
      b = $('<div id="cuselBox">').hide().appendTo("body");
    }
    return b;
  }
  
}


/***
 * Refresh stylized selects
 *  
 * @param {Object} params Refresh params, see cuSel function for details 
 * @description If you changed number of elements in list or show hidden select, you need to call this function to refresh
 */  
function cuSelRefresh(params) {
  /*
    устаналиваем высоту выпадающих списков основываясь на числе видимых позиций и высоты одной позиции
    при чем только тем, у которых число опций больше числа заданного числа видимых
  */

  var arrRefreshEl = params.refreshEl.split(","),
    lenArr = arrRefreshEl.length,
    i;
  
  for(i=0;i<lenArr;i++)
  {
    var refreshScroll = $(arrRefreshEl[i]).parents(".cusel").find(".cusel-scroll-wrap").eq(0);
    refreshScroll.find(".cusel-scroll-pane").jScrollPaneRemoveCusel();
    refreshScroll.css({visibility: "hidden", display : "block"});
  
    var arrItems = refreshScroll.find(".cuselItem"),
      defaultHeight = arrItems.eq(0).outerHeight();
    
  
    if(arrItems.length>params.visRows)
    {
      refreshScroll
        .css({height: defaultHeight*params.visRows+"px", display : "none", visibility: "visible" })
        .children(".cusel-scroll-pane").css("height",defaultHeight*params.visRows+"px");
    }
    else
    {
      refreshScroll
        .css({display : "none", visibility: "visible" });
    }
  }
}

/***
 * Set select value
 * @param {Selector} select
 * @param value New value  
 */
function cuselSetValue(select, value) {
  var $elem = $(select).closest(".cusel"),
    $item = $elem.find(".cuselItem[val="+value+"]").first();
  
  if (!$item.length)
    return false;

  // invoke value change  
  $item.click();    
}  

;(function($) {

$.jScrollPaneCusel = {
	active : []
};
$.fn.jScrollPaneCusel = function(settings)
{
	settings = $.extend({}, $.fn.jScrollPaneCusel.defaults, settings);

	var rf = function() { return false; };
	
	return this.each(
		function()
		{
			var $this = $(this);
			var cuselWid = this.parentNode.offsetWidth;
			
						
			// Switch the element's overflow to hidden to ensure we get the size of the element without the scrollbars [http://plugins.jquery.com/node/1208]
			$this.css('overflow', 'hidden');
			var paneEle = this;
			if ($(this).parent().is('.jScrollPaneContainer')) {
				var currentScrollPosition = settings.maintainPosition ? $this.position().top : 0;
				var $c = $(this).parent();
				var paneWidth = cuselWid;
				var paneHeight = $c.outerHeight();
				var trackHeight = paneHeight;
				$('>.jScrollPaneTrack, >.jScrollArrowUp, >.jScrollArrowDown', $c).remove();
				$this.css({'top':0});
			} else {
				var currentScrollPosition = 0;
				this.originalPadding = $this.css('paddingTop') + ' ' + $this.css('paddingRight') + ' ' + $this.css('paddingBottom') + ' ' + $this.css('paddingLeft');
				this.originalSidePaddingTotal = (parseInt($this.css('paddingLeft')) || 0) + (parseInt($this.css('paddingRight')) || 0);
				
				
				var paneWidth = cuselWid;
				var paneHeight = $this.innerHeight();
				var trackHeight = paneHeight;
				$this
					.wrap("<div class='jScrollPaneContainer'></div>")
					.parent().css({'height':paneHeight+'px', 'width':paneWidth+'px'});
				if(!window.navigator.userProfile) /* for ie6 ne umenshaem width block na tolshinu bordera */
				{
					var borderWid = parseInt($(this).parent().css("border-left-width"))+parseInt($(this).parent().css("border-right-width"));
					paneWidth-=borderWid;
					$(this)
						.css("width",paneWidth+"px")
						.parent().css("width",paneWidth+"px");
				
				}
				// deal with text size changes (if the jquery.em plugin is included)
				// and re-initialise the scrollPane so the track maintains the
				// correct size
				$(document).bind(
					'emchange', 
					function(e, cur, prev)
					{
						$this.jScrollPaneCusel(settings);
					}
				);
				
			}
			
			
			if (settings.reinitialiseOnImageLoad) {
				// code inspired by jquery.onImagesLoad: http://plugins.jquery.com/project/onImagesLoad
				// except we re-initialise the scroll pane when each image loads so that the scroll pane is always up to size...
				// TODO: Do I even need to store it in $.data? Is a local variable here the same since I don't pass the reinitialiseOnImageLoad when I re-initialise?
				var $imagesToLoad = $.data(paneEle, 'jScrollPaneImagesToLoad') || $('img', $this);
				var loadedImages = [];
				
				if ($imagesToLoad.length) {
					$imagesToLoad.each(function(i, val)	{
						$(this).bind('load', function() {
							if($.inArray(i, loadedImages) == -1){ //don't double count images
								loadedImages.push(val); //keep a record of images we've seen
								$imagesToLoad = $.grep($imagesToLoad, function(n, i) {
									return n != val;
								});
								$.data(paneEle, 'jScrollPaneImagesToLoad', $imagesToLoad);
								settings.reinitialiseOnImageLoad = false;
								$this.jScrollPaneCusel(settings); // re-initialise
							}
						}).each(function(i, val) {
							if(this.complete || this.complete===undefined) { 
								//needed for potential cached images
								this.src = this.src; 
							} 
						});
					});
				};
			}

			var p = this.originalSidePaddingTotal;
			
			var cssToApply = {
				'height':'auto',
				'width':paneWidth - settings.scrollbarWidth - settings.scrollbarMargin - p + 'px'
			}

			if(settings.scrollbarOnLeft) {
				cssToApply.paddingLeft = settings.scrollbarMargin + settings.scrollbarWidth + 'px';
			} else {
				cssToApply.paddingRight = settings.scrollbarMargin + 'px';
			}

			$this.css(cssToApply);

			var contentHeight = $this.outerHeight();
			var percentInView = paneHeight / contentHeight;

			if (percentInView < .99) {
				var $container = $this.parent();
				
				$container.append(
					$('<div class="jScrollPaneTrack"></div>').css({'width':settings.scrollbarWidth+'px'}).append(
						$('<div class="jScrollPaneDrag"></div>').css({'width':settings.scrollbarWidth+'px'}).append(
							$('<div class="jScrollPaneDragTop"></div>').css({'width':settings.scrollbarWidth+'px'}),
							$('<div class="jScrollPaneDragBottom"></div>').css({'width':settings.scrollbarWidth+'px'})
						)
					)
				);
				
				var $track = $('>.jScrollPaneTrack', $container);
				var $drag = $('>.jScrollPaneTrack .jScrollPaneDrag', $container);
								
				
				if (settings.showArrows) {
					
					var currentArrowButton;
					var currentArrowDirection;
					var currentArrowInterval;
					var currentArrowInc;
					var whileArrowButtonDown = function()
					{
						if (currentArrowInc > 4 || currentArrowInc%4==0) {
							positionDrag(dragPosition + currentArrowDirection * mouseWheelMultiplier);
						}
						currentArrowInc ++;
					};
					var onArrowMouseUp = function(event)
					{
						$('html').unbind('mouseup', onArrowMouseUp);
						currentArrowButton.removeClass('jScrollActiveArrowButton');
						clearInterval(currentArrowInterval);
					};
					var onArrowMouseDown = function() {
						$('html').bind('mouseup', onArrowMouseUp);
						currentArrowButton.addClass('jScrollActiveArrowButton');
						currentArrowInc = 0;
						whileArrowButtonDown();
						currentArrowInterval = setInterval(whileArrowButtonDown, 100);
					};
					$container
						.append(
							$('<div></div>')
								.attr({'class':'jScrollArrowUp'})
								.css({'width':settings.scrollbarWidth+'px'})
								.bind('mousedown', function()
								{
									currentArrowButton = $(this);
									currentArrowDirection = -1;
									onArrowMouseDown();
									this.blur();
									return false;
								})
								.bind('click', rf),
							$('<div></div>')
								.attr({'class':'jScrollArrowDown'})
								.css({'width':settings.scrollbarWidth+'px'})
								.bind('mousedown', function()
								{
									currentArrowButton = $(this);
									currentArrowDirection = 1;
									onArrowMouseDown();
									this.blur();
									return false;
								})
								.bind('click', rf)
						);
					var $upArrow = $('>.jScrollArrowUp', $container);
					var $downArrow = $('>.jScrollArrowDown', $container);
					if (settings.arrowSize) {
						trackHeight = paneHeight - settings.arrowSize - settings.arrowSize;
						$track
							.css({'height': trackHeight+'px', top:settings.arrowSize+'px'})
					} else {
						var topArrowHeight = $upArrow.height();
						settings.arrowSize = topArrowHeight;
						trackHeight = paneHeight - topArrowHeight - $downArrow.height();
						$track
							.css({'height': trackHeight+'px', top:topArrowHeight+'px'})
					}
				}
				
				var $pane = $(this).css({'position':'absolute', 'overflow':'visible'});
				
				var currentOffset;
				var maxY;
				var mouseWheelMultiplier;
				// store this in a seperate variable so we can keep track more accurately than just updating the css property..
				var dragPosition = 0;
				var dragMiddle = percentInView*paneHeight/2;
				
				// pos function borrowed from tooltip plugin and adapted...
				var getPos = function (event, c) {
					var p = c == 'X' ? 'Left' : 'Top';
					return event['page' + c] || (event['client' + c] + (document.documentElement['scroll' + p] || document.body['scroll' + p])) || 0;
				};
				
				var ignoreNativeDrag = function() {	return false; };
				
				var initDrag = function()
				{
					ceaseAnimation();
					currentOffset = $drag.offset();
					currentOffset.top -= dragPosition;
					maxY = trackHeight - $drag[0].offsetHeight;
					mouseWheelMultiplier = 2 * settings.wheelSpeed * maxY / contentHeight;
				};
				
				var onStartDrag = function(event)
				{
					initDrag();
					dragMiddle = getPos(event, 'Y') - dragPosition - currentOffset.top;
					$('html').bind('mouseup', onStopDrag).bind('mousemove', updateScroll);
					if ($.browser.msie) {
						$('html').bind('dragstart', ignoreNativeDrag).bind('selectstart', ignoreNativeDrag);
					}
					return false;
				};
				var onStopDrag = function()
				{
					$('html').unbind('mouseup', onStopDrag).unbind('mousemove', updateScroll);
					dragMiddle = percentInView*paneHeight/2;
					if ($.browser.msie) {
						$('html').unbind('dragstart', ignoreNativeDrag).unbind('selectstart', ignoreNativeDrag);
					}
				};
				var positionDrag = function(destY)
				{
					destY = destY < 0 ? 0 : (destY > maxY ? maxY : destY);
					dragPosition = destY;
					$drag.css({'top':destY+'px'});
					var p = destY / maxY;
					$pane.css({'top':((paneHeight-contentHeight)*p) + 'px'});
					$this.trigger('scroll');
					if (settings.showArrows) {
						$upArrow[destY == 0 ? 'addClass' : 'removeClass']('disabled');
						$downArrow[destY == maxY ? 'addClass' : 'removeClass']('disabled');
					}
				};
				var updateScroll = function(e)
				{
					positionDrag(getPos(e, 'Y') - currentOffset.top - dragMiddle);
				};
				
				var dragH = Math.max(Math.min(percentInView*(paneHeight-settings.arrowSize*2), settings.dragMaxHeight), settings.dragMinHeight);
				
				$drag.css(
					{'height':dragH+'px'}
				).bind('mousedown', onStartDrag);
				
				var trackScrollInterval;
				var trackScrollInc;
				var trackScrollMousePos;
				var doTrackScroll = function()
				{
					if (trackScrollInc > 8 || trackScrollInc%4==0) {
						positionDrag((dragPosition - ((dragPosition - trackScrollMousePos) / 2)));
					}
					trackScrollInc ++;
				};
				var onStopTrackClick = function()
				{
					clearInterval(trackScrollInterval);
					$('html').unbind('mouseup', onStopTrackClick).unbind('mousemove', onTrackMouseMove);
				};
				var onTrackMouseMove = function(event)
				{
					trackScrollMousePos = getPos(event, 'Y') - currentOffset.top - dragMiddle;
				};
				var onTrackClick = function(event)
				{
					initDrag();
					onTrackMouseMove(event);
					trackScrollInc = 0;
					$('html').bind('mouseup', onStopTrackClick).bind('mousemove', onTrackMouseMove);
					trackScrollInterval = setInterval(doTrackScroll, 100);
					doTrackScroll();
				};
				
				$track.bind('mousedown', onTrackClick);
				
				$container.bind(
					'mousewheel',
					function (event, delta) {
						initDrag();
						ceaseAnimation();
						var d = dragPosition;
						positionDrag(dragPosition - delta * mouseWheelMultiplier);
						var dragOccured = d != dragPosition;
						return false;
					}
				);

				var _animateToPosition;
				var _animateToInterval;
				function animateToPosition()
				{
					var diff = (_animateToPosition - dragPosition) / settings.animateStep;
					if (diff > 1 || diff < -1) {
						positionDrag(dragPosition + diff);
					} else {
						positionDrag(_animateToPosition);
						ceaseAnimation();
					}
				}
				var ceaseAnimation = function()
				{
					if (_animateToInterval) {
						clearInterval(_animateToInterval);
						delete _animateToPosition;
					}
				};
				var scrollTo = function(pos, preventAni)
				{
					if (typeof pos == "string") {
						$e = $(pos, $this);
						if (!$e.length) return;
						pos = $e.offset().top - $this.offset().top;
					}
					$container.scrollTop(0);
					ceaseAnimation();
					var destDragPosition = -pos/(paneHeight-contentHeight) * maxY;
					if (preventAni || !settings.animateTo) {
						positionDrag(destDragPosition);
					} else {
						_animateToPosition = destDragPosition;
						_animateToInterval = setInterval(animateToPosition, settings.animateInterval);
					}
				};
				$this[0].scrollTo = scrollTo;
				
				$this[0].scrollBy = function(delta)
				{
					var currentPos = -parseInt($pane.css('top')) || 0;
					scrollTo(currentPos + delta);
				};
				
				initDrag();
				
				scrollTo(-currentScrollPosition, true);
			
				// Deal with it when the user tabs to a link or form element within this scrollpane
				$('*', this).bind(
					'focus',
					function(event)
					{
						var $e = $(this);
						
						// loop through parents adding the offset top of any elements that are relatively positioned between
						// the focused element and the jScrollPaneContainer so we can get the true distance from the top
						// of the focused element to the top of the scrollpane...
						var eleTop = 0;
						
						while ($e[0] != $this[0]) {
							eleTop += $e.position().top;
							$e = $e.offsetParent();
						}
						
						var viewportTop = -parseInt($pane.css('top')) || 0;
						var maxVisibleEleTop = viewportTop + paneHeight;
						var eleInView = eleTop > viewportTop && eleTop < maxVisibleEleTop;
						if (!eleInView) {
							var destPos = eleTop - settings.scrollbarMargin;
							if (eleTop > viewportTop) { // element is below viewport - scroll so it is at bottom.
								destPos += $(this).height() + 15 + settings.scrollbarMargin - paneHeight;
							}
							scrollTo(destPos);
						}
					}
				)
				
				
				if (location.hash) {
					scrollTo(location.hash);
				}
				
				// use event delegation to listen for all clicks on links and hijack them if they are links to
				// anchors within our content...
				$(document).bind(
					'click',
					function(e)
					{
						$target = $(e.target);
						if ($target.is('a')) {
							var h = $target.attr('href');
							if (h.substr(0, 1) == '#') {
								scrollTo(h);
							}
						}
					}
				);
				
				$.jScrollPaneCusel.active.push($this[0]);
				
			} else {
				$this.css(
					{
						'height':paneHeight+'px',
						'width':paneWidth-this.originalSidePaddingTotal+'px',
						'padding':this.originalPadding
					}
				);
				// remove from active list?
				$this.parent().unbind('mousewheel');
			}
			
		}
	)
};
$.fn.jScrollPaneRemoveCusel = function()
{
	$(this).each(function()
	{
		$this = $(this);
		var $c = $this.parent();
		if ($c.is('.jScrollPaneContainer')) {
			$this.css(
				{
					'top':'',
					'height':'',
					'width':'',
					'padding':'',
					'overflow':'',
					'position':''
				}
			);
			$this.attr('style', $this.data('originalStyleTag'));
			$c.after($this).remove();
		}
	});
}

$.fn.jScrollPaneCusel.defaults = {
	scrollbarWidth : 10,
	scrollbarMargin : 5,
	wheelSpeed : 18,
	showArrows : false,
	arrowSize : 0,
	animateTo : false,
	dragMinHeight : 1,
	dragMaxHeight : 99999,
	animateInterval : 100,
	animateStep: 3,
	maintainPosition: true,
	scrollbarOnLeft: false,
	reinitialiseOnImageLoad: false
};

// clean up the scrollTo expandos
$(window)
	.bind('unload', function() {
		var els = $.jScrollPaneCusel.active; 
		for (var i=0; i<els.length; i++) {
			els[i].scrollTo = els[i].scrollBy = null;
		}
	}
);

})(jQuery);
;/*! jCarousel - v0.3.4 - 2015-09-23
* http://sorgalla.com/jcarousel/
* Copyright (c) 2006-2015 Jan Sorgalla; Licensed MIT */
(function($) {
    'use strict';

    var jCarousel = $.jCarousel = {};

    jCarousel.version = '0.3.4';

    var rRelativeTarget = /^([+\-]=)?(.+)$/;

    jCarousel.parseTarget = function(target) {
        var relative = false,
            parts    = typeof target !== 'object' ?
                           rRelativeTarget.exec(target) :
                           null;

        if (parts) {
            target = parseInt(parts[2], 10) || 0;

            if (parts[1]) {
                relative = true;
                if (parts[1] === '-=') {
                    target *= -1;
                }
            }
        } else if (typeof target !== 'object') {
            target = parseInt(target, 10) || 0;
        }

        return {
            target: target,
            relative: relative
        };
    };

    jCarousel.detectCarousel = function(element) {
        var carousel;

        while (element.length > 0) {
            carousel = element.filter('[data-jcarousel]');

            if (carousel.length > 0) {
                return carousel;
            }

            carousel = element.find('[data-jcarousel]');

            if (carousel.length > 0) {
                return carousel;
            }

            element = element.parent();
        }

        return null;
    };

    jCarousel.base = function(pluginName) {
        return {
            version:  jCarousel.version,
            _options:  {},
            _element:  null,
            _carousel: null,
            _init:     $.noop,
            _create:   $.noop,
            _destroy:  $.noop,
            _reload:   $.noop,
            create: function() {
                this._element
                    .attr('data-' + pluginName.toLowerCase(), true)
                    .data(pluginName, this);

                if (false === this._trigger('create')) {
                    return this;
                }

                this._create();

                this._trigger('createend');

                return this;
            },
            destroy: function() {
                if (false === this._trigger('destroy')) {
                    return this;
                }

                this._destroy();

                this._trigger('destroyend');

                this._element
                    .removeData(pluginName)
                    .removeAttr('data-' + pluginName.toLowerCase());

                return this;
            },
            reload: function(options) {
                if (false === this._trigger('reload')) {
                    return this;
                }

                if (options) {
                    this.options(options);
                }

                this._reload();

                this._trigger('reloadend');

                return this;
            },
            element: function() {
                return this._element;
            },
            options: function(key, value) {
                if (arguments.length === 0) {
                    return $.extend({}, this._options);
                }

                if (typeof key === 'string') {
                    if (typeof value === 'undefined') {
                        return typeof this._options[key] === 'undefined' ?
                                null :
                                this._options[key];
                    }

                    this._options[key] = value;
                } else {
                    this._options = $.extend({}, this._options, key);
                }

                return this;
            },
            carousel: function() {
                if (!this._carousel) {
                    this._carousel = jCarousel.detectCarousel(this.options('carousel') || this._element);

                    if (!this._carousel) {
                        $.error('Could not detect carousel for plugin "' + pluginName + '"');
                    }
                }

                return this._carousel;
            },
            _trigger: function(type, element, data) {
                var event,
                    defaultPrevented = false;

                data = [this].concat(data || []);

                (element || this._element).each(function() {
                    event = $.Event((pluginName + ':' + type).toLowerCase());

                    $(this).trigger(event, data);

                    if (event.isDefaultPrevented()) {
                        defaultPrevented = true;
                    }
                });

                return !defaultPrevented;
            }
        };
    };

    jCarousel.plugin = function(pluginName, pluginPrototype) {
        var Plugin = $[pluginName] = function(element, options) {
            this._element = $(element);
            this.options(options);

            this._init();
            this.create();
        };

        Plugin.fn = Plugin.prototype = $.extend(
            {},
            jCarousel.base(pluginName),
            pluginPrototype
        );

        $.fn[pluginName] = function(options) {
            var args        = Array.prototype.slice.call(arguments, 1),
                returnValue = this;

            if (typeof options === 'string') {
                this.each(function() {
                    var instance = $(this).data(pluginName);

                    if (!instance) {
                        return $.error(
                            'Cannot call methods on ' + pluginName + ' prior to initialization; ' +
                            'attempted to call method "' + options + '"'
                        );
                    }

                    if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
                        return $.error(
                            'No such method "' + options + '" for ' + pluginName + ' instance'
                        );
                    }

                    var methodValue = instance[options].apply(instance, args);

                    if (methodValue !== instance && typeof methodValue !== 'undefined') {
                        returnValue = methodValue;
                        return false;
                    }
                });
            } else {
                this.each(function() {
                    var instance = $(this).data(pluginName);

                    if (instance instanceof Plugin) {
                        instance.reload(options);
                    } else {
                        new Plugin(this, options);
                    }
                });
            }

            return returnValue;
        };

        return Plugin;
    };
}(jQuery));

(function($, window) {
    'use strict';

    var toFloat = function(val) {
        return parseFloat(val) || 0;
    };

    $.jCarousel.plugin('jcarousel', {
        animating:   false,
        tail:        0,
        inTail:      false,
        resizeTimer: null,
        lt:          null,
        vertical:    false,
        rtl:         false,
        circular:    false,
        underflow:   false,
        relative:    false,

        _options: {
            list: function() {
                return this.element().children().eq(0);
            },
            items: function() {
                return this.list().children();
            },
            animation:   400,
            transitions: false,
            wrap:        null,
            vertical:    null,
            rtl:         null,
            center:      false
        },

        // Protected, don't access directly
        _list:         null,
        _items:        null,
        _target:       $(),
        _first:        $(),
        _last:         $(),
        _visible:      $(),
        _fullyvisible: $(),
        _init: function() {
            var self = this;

            this.onWindowResize = function() {
                if (self.resizeTimer) {
                    clearTimeout(self.resizeTimer);
                }

                self.resizeTimer = setTimeout(function() {
                    self.reload();
                }, 100);
            };

            return this;
        },
        _create: function() {
            this._reload();

            $(window).on('resize.jcarousel', this.onWindowResize);
        },
        _destroy: function() {
            $(window).off('resize.jcarousel', this.onWindowResize);
        },
        _reload: function() {
            this.vertical = this.options('vertical');

            if (this.vertical == null) {
                this.vertical = this.list().height() > this.list().width();
            }

            this.rtl = this.options('rtl');

            if (this.rtl == null) {
                this.rtl = (function(element) {
                    if (('' + element.attr('dir')).toLowerCase() === 'rtl') {
                        return true;
                    }

                    var found = false;

                    element.parents('[dir]').each(function() {
                        if ((/rtl/i).test($(this).attr('dir'))) {
                            found = true;
                            return false;
                        }
                    });

                    return found;
                }(this._element));
            }

            this.lt = this.vertical ? 'top' : 'left';

            // Ensure before closest() call
            this.relative = this.list().css('position') === 'relative';

            // Force list and items reload
            this._list  = null;
            this._items = null;

            var item = this.index(this._target) >= 0 ?
                           this._target :
                           this.closest();

            // _prepare() needs this here
            this.circular  = this.options('wrap') === 'circular';
            this.underflow = false;

            var props = {'left': 0, 'top': 0};

            if (item.length > 0) {
                this._prepare(item);
                this.list().find('[data-jcarousel-clone]').remove();

                // Force items reload
                this._items = null;

                this.underflow = this._fullyvisible.length >= this.items().length;
                this.circular  = this.circular && !this.underflow;

                props[this.lt] = this._position(item) + 'px';
            }

            this.move(props);

            return this;
        },
        list: function() {
            if (this._list === null) {
                var option = this.options('list');
                this._list = $.isFunction(option) ? option.call(this) : this._element.find(option);
            }

            return this._list;
        },
        items: function() {
            if (this._items === null) {
                var option = this.options('items');
                this._items = ($.isFunction(option) ? option.call(this) : this.list().find(option)).not('[data-jcarousel-clone]');
            }

            return this._items;
        },
        index: function(item) {
            return this.items().index(item);
        },
        closest: function() {
            var self    = this,
                pos     = this.list().position()[this.lt],
                closest = $(), // Ensure we're returning a jQuery instance
                stop    = false,
                lrb     = this.vertical ? 'bottom' : (this.rtl && !this.relative ? 'left' : 'right'),
                width;

            if (this.rtl && this.relative && !this.vertical) {
                pos += this.list().width() - this.clipping();
            }

            this.items().each(function() {
                closest = $(this);

                if (stop) {
                    return false;
                }

                var dim = self.dimension(closest);

                pos += dim;

                if (pos >= 0) {
                    width = dim - toFloat(closest.css('margin-' + lrb));

                    if ((Math.abs(pos) - dim + (width / 2)) <= 0) {
                        stop = true;
                    } else {
                        return false;
                    }
                }
            });


            return closest;
        },
        target: function() {
            return this._target;
        },
        first: function() {
            return this._first;
        },
        last: function() {
            return this._last;
        },
        visible: function() {
            return this._visible;
        },
        fullyvisible: function() {
            return this._fullyvisible;
        },
        hasNext: function() {
            if (false === this._trigger('hasnext')) {
                return true;
            }

            var wrap = this.options('wrap'),
                end = this.items().length - 1,
                check = this.options('center') ? this._target : this._last;

            return end >= 0 && !this.underflow &&
                ((wrap && wrap !== 'first') ||
                    (this.index(check) < end) ||
                    (this.tail && !this.inTail)) ? true : false;
        },
        hasPrev: function() {
            if (false === this._trigger('hasprev')) {
                return true;
            }

            var wrap = this.options('wrap');

            return this.items().length > 0 && !this.underflow &&
                ((wrap && wrap !== 'last') ||
                    (this.index(this._first) > 0) ||
                    (this.tail && this.inTail)) ? true : false;
        },
        clipping: function() {
            return this._element['inner' + (this.vertical ? 'Height' : 'Width')]();
        },
        dimension: function(element) {
            return element['outer' + (this.vertical ? 'Height' : 'Width')](true);
        },
        scroll: function(target, animate, callback) {
            if (this.animating) {
                return this;
            }

            if (false === this._trigger('scroll', null, [target, animate])) {
                return this;
            }

            if ($.isFunction(animate)) {
                callback = animate;
                animate  = true;
            }

            var parsed = $.jCarousel.parseTarget(target);

            if (parsed.relative) {
                var end    = this.items().length - 1,
                    scroll = Math.abs(parsed.target),
                    wrap   = this.options('wrap'),
                    current,
                    first,
                    index,
                    start,
                    curr,
                    isVisible,
                    props,
                    i;

                if (parsed.target > 0) {
                    var last = this.index(this._last);

                    if (last >= end && this.tail) {
                        if (!this.inTail) {
                            this._scrollTail(animate, callback);
                        } else {
                            if (wrap === 'both' || wrap === 'last') {
                                this._scroll(0, animate, callback);
                            } else {
                                if ($.isFunction(callback)) {
                                    callback.call(this, false);
                                }
                            }
                        }
                    } else {
                        current = this.index(this._target);

                        if ((this.underflow && current === end && (wrap === 'circular' || wrap === 'both' || wrap === 'last')) ||
                            (!this.underflow && last === end && (wrap === 'both' || wrap === 'last'))) {
                            this._scroll(0, animate, callback);
                        } else {
                            index = current + scroll;

                            if (this.circular && index > end) {
                                i = end;
                                curr = this.items().get(-1);

                                while (i++ < index) {
                                    curr = this.items().eq(0);
                                    isVisible = this._visible.index(curr) >= 0;

                                    if (isVisible) {
                                        curr.after(curr.clone(true).attr('data-jcarousel-clone', true));
                                    }

                                    this.list().append(curr);

                                    if (!isVisible) {
                                        props = {};
                                        props[this.lt] = this.dimension(curr);
                                        this.moveBy(props);
                                    }

                                    // Force items reload
                                    this._items = null;
                                }

                                this._scroll(curr, animate, callback);
                            } else {
                                this._scroll(Math.min(index, end), animate, callback);
                            }
                        }
                    }
                } else {
                    if (this.inTail) {
                        this._scroll(Math.max((this.index(this._first) - scroll) + 1, 0), animate, callback);
                    } else {
                        first  = this.index(this._first);
                        current = this.index(this._target);
                        start  = this.underflow ? current : first;
                        index  = start - scroll;

                        if (start <= 0 && ((this.underflow && wrap === 'circular') || wrap === 'both' || wrap === 'first')) {
                            this._scroll(end, animate, callback);
                        } else {
                            if (this.circular && index < 0) {
                                i    = index;
                                curr = this.items().get(0);

                                while (i++ < 0) {
                                    curr = this.items().eq(-1);
                                    isVisible = this._visible.index(curr) >= 0;

                                    if (isVisible) {
                                        curr.after(curr.clone(true).attr('data-jcarousel-clone', true));
                                    }

                                    this.list().prepend(curr);

                                    // Force items reload
                                    this._items = null;

                                    var dim = this.dimension(curr);

                                    props = {};
                                    props[this.lt] = -dim;
                                    this.moveBy(props);

                                }

                                this._scroll(curr, animate, callback);
                            } else {
                                this._scroll(Math.max(index, 0), animate, callback);
                            }
                        }
                    }
                }
            } else {
                this._scroll(parsed.target, animate, callback);
            }

            this._trigger('scrollend');

            return this;
        },
        moveBy: function(properties, opts) {
            var position = this.list().position(),
                multiplier = 1,
                correction = 0;

            if (this.rtl && !this.vertical) {
                multiplier = -1;

                if (this.relative) {
                    correction = this.list().width() - this.clipping();
                }
            }

            if (properties.left) {
                properties.left = (position.left + correction + toFloat(properties.left) * multiplier) + 'px';
            }

            if (properties.top) {
                properties.top = (position.top + correction + toFloat(properties.top) * multiplier) + 'px';
            }

            return this.move(properties, opts);
        },
        move: function(properties, opts) {
            opts = opts || {};

            var option       = this.options('transitions'),
                transitions  = !!option,
                transforms   = !!option.transforms,
                transforms3d = !!option.transforms3d,
                duration     = opts.duration || 0,
                list         = this.list();

            if (!transitions && duration > 0) {
                list.animate(properties, opts);
                return;
            }

            var complete = opts.complete || $.noop,
                css = {};

            if (transitions) {
                var backup = {
                        transitionDuration: list.css('transitionDuration'),
                        transitionTimingFunction: list.css('transitionTimingFunction'),
                        transitionProperty: list.css('transitionProperty')
                    },
                    oldComplete = complete;

                complete = function() {
                    $(this).css(backup);
                    oldComplete.call(this);
                };
                css = {
                    transitionDuration: (duration > 0 ? duration / 1000 : 0) + 's',
                    transitionTimingFunction: option.easing || opts.easing,
                    transitionProperty: duration > 0 ? (function() {
                        if (transforms || transforms3d) {
                            // We have to use 'all' because jQuery doesn't prefix
                            // css values, like transition-property: transform;
                            return 'all';
                        }

                        return properties.left ? 'left' : 'top';
                    })() : 'none',
                    transform: 'none'
                };
            }

            if (transforms3d) {
                css.transform = 'translate3d(' + (properties.left || 0) + ',' + (properties.top || 0) + ',0)';
            } else if (transforms) {
                css.transform = 'translate(' + (properties.left || 0) + ',' + (properties.top || 0) + ')';
            } else {
                $.extend(css, properties);
            }

            if (transitions && duration > 0) {
                list.one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd', complete);
            }

            list.css(css);

            if (duration <= 0) {
                list.each(function() {
                    complete.call(this);
                });
            }
        },
        _scroll: function(item, animate, callback) {
            if (this.animating) {
                if ($.isFunction(callback)) {
                    callback.call(this, false);
                }

                return this;
            }

            if (typeof item !== 'object') {
                item = this.items().eq(item);
            } else if (typeof item.jquery === 'undefined') {
                item = $(item);
            }

            if (item.length === 0) {
                if ($.isFunction(callback)) {
                    callback.call(this, false);
                }

                return this;
            }

            this.inTail = false;

            this._prepare(item);

            var pos     = this._position(item),
                currPos = this.list().position()[this.lt];

            if (pos === currPos) {
                if ($.isFunction(callback)) {
                    callback.call(this, false);
                }

                return this;
            }

            var properties = {};
            properties[this.lt] = pos + 'px';

            this._animate(properties, animate, callback);

            return this;
        },
        _scrollTail: function(animate, callback) {
            if (this.animating || !this.tail) {
                if ($.isFunction(callback)) {
                    callback.call(this, false);
                }

                return this;
            }

            var pos = this.list().position()[this.lt];

            if (this.rtl && this.relative && !this.vertical) {
                pos += this.list().width() - this.clipping();
            }

            if (this.rtl && !this.vertical) {
                pos += this.tail;
            } else {
                pos -= this.tail;
            }

            this.inTail = true;

            var properties = {};
            properties[this.lt] = pos + 'px';

            this._update({
                target:       this._target.next(),
                fullyvisible: this._fullyvisible.slice(1).add(this._visible.last())
            });

            this._animate(properties, animate, callback);

            return this;
        },
        _animate: function(properties, animate, callback) {
            callback = callback || $.noop;

            if (false === this._trigger('animate')) {
                callback.call(this, false);
                return this;
            }

            this.animating = true;

            var animation = this.options('animation'),
                complete  = $.proxy(function() {
                    this.animating = false;

                    var c = this.list().find('[data-jcarousel-clone]');

                    if (c.length > 0) {
                        c.remove();
                        this._reload();
                    }

                    this._trigger('animateend');

                    callback.call(this, true);
                }, this);

            var opts = typeof animation === 'object' ?
                           $.extend({}, animation) :
                           {duration: animation},
                oldComplete = opts.complete || $.noop;

            if (animate === false) {
                opts.duration = 0;
            } else if (typeof $.fx.speeds[opts.duration] !== 'undefined') {
                opts.duration = $.fx.speeds[opts.duration];
            }

            opts.complete = function() {
                complete();
                oldComplete.call(this);
            };

            this.move(properties, opts);

            return this;
        },
        _prepare: function(item) {
            var index  = this.index(item),
                idx    = index,
                wh     = this.dimension(item),
                clip   = this.clipping(),
                lrb    = this.vertical ? 'bottom' : (this.rtl ? 'left'  : 'right'),
                center = this.options('center'),
                update = {
                    target:       item,
                    first:        item,
                    last:         item,
                    visible:      item,
                    fullyvisible: wh <= clip ? item : $()
                },
                curr,
                isVisible,
                margin,
                dim;

            if (center) {
                wh /= 2;
                clip /= 2;
            }

            if (wh < clip) {
                while (true) {
                    curr = this.items().eq(++idx);

                    if (curr.length === 0) {
                        if (!this.circular) {
                            break;
                        }

                        curr = this.items().eq(0);

                        if (item.get(0) === curr.get(0)) {
                            break;
                        }

                        isVisible = this._visible.index(curr) >= 0;

                        if (isVisible) {
                            curr.after(curr.clone(true).attr('data-jcarousel-clone', true));
                        }

                        this.list().append(curr);

                        if (!isVisible) {
                            var props = {};
                            props[this.lt] = this.dimension(curr);
                            this.moveBy(props);
                        }

                        // Force items reload
                        this._items = null;
                    }

                    dim = this.dimension(curr);

                    if (dim === 0) {
                        break;
                    }

                    wh += dim;

                    update.last    = curr;
                    update.visible = update.visible.add(curr);

                    // Remove right/bottom margin from total width
                    margin = toFloat(curr.css('margin-' + lrb));

                    if ((wh - margin) <= clip) {
                        update.fullyvisible = update.fullyvisible.add(curr);
                    }

                    if (wh >= clip) {
                        break;
                    }
                }
            }

            if (!this.circular && !center && wh < clip) {
                idx = index;

                while (true) {
                    if (--idx < 0) {
                        break;
                    }

                    curr = this.items().eq(idx);

                    if (curr.length === 0) {
                        break;
                    }

                    dim = this.dimension(curr);

                    if (dim === 0) {
                        break;
                    }

                    wh += dim;

                    update.first   = curr;
                    update.visible = update.visible.add(curr);

                    // Remove right/bottom margin from total width
                    margin = toFloat(curr.css('margin-' + lrb));

                    if ((wh - margin) <= clip) {
                        update.fullyvisible = update.fullyvisible.add(curr);
                    }

                    if (wh >= clip) {
                        break;
                    }
                }
            }

            this._update(update);

            this.tail = 0;

            if (!center &&
                this.options('wrap') !== 'circular' &&
                this.options('wrap') !== 'custom' &&
                this.index(update.last) === (this.items().length - 1)) {

                // Remove right/bottom margin from total width
                wh -= toFloat(update.last.css('margin-' + lrb));

                if (wh > clip) {
                    this.tail = wh - clip;
                }
            }

            return this;
        },
        _position: function(item) {
            var first  = this._first,
                pos    = first.position()[this.lt],
                center = this.options('center'),
                centerOffset = center ? (this.clipping() / 2) - (this.dimension(first) / 2) : 0;

            if (this.rtl && !this.vertical) {
                if (this.relative) {
                    pos -= this.list().width() - this.dimension(first);
                } else {
                    pos -= this.clipping() - this.dimension(first);
                }

                pos += centerOffset;
            } else {
                pos -= centerOffset;
            }

            if (!center &&
                (this.index(item) > this.index(first) || this.inTail) &&
                this.tail) {
                pos = this.rtl && !this.vertical ? pos - this.tail : pos + this.tail;
                this.inTail = true;
            } else {
                this.inTail = false;
            }

            return -pos;
        },
        _update: function(update) {
            var self = this,
                current = {
                    target:       this._target,
                    first:        this._first,
                    last:         this._last,
                    visible:      this._visible,
                    fullyvisible: this._fullyvisible
                },
                back = this.index(update.first || current.first) < this.index(current.first),
                key,
                doUpdate = function(key) {
                    var elIn  = [],
                        elOut = [];

                    update[key].each(function() {
                        if (current[key].index(this) < 0) {
                            elIn.push(this);
                        }
                    });

                    current[key].each(function() {
                        if (update[key].index(this) < 0) {
                            elOut.push(this);
                        }
                    });

                    if (back) {
                        elIn = elIn.reverse();
                    } else {
                        elOut = elOut.reverse();
                    }

                    self._trigger(key + 'in', $(elIn));
                    self._trigger(key + 'out', $(elOut));

                    self['_' + key] = update[key];
                };

            for (key in update) {
                doUpdate(key);
            }

            return this;
        }
    });
}(jQuery, window));

(function($) {
    'use strict';

    $.jcarousel.fn.scrollIntoView = function(target, animate, callback) {
        var parsed = $.jCarousel.parseTarget(target),
            first  = this.index(this._fullyvisible.first()),
            last   = this.index(this._fullyvisible.last()),
            index;

        if (parsed.relative) {
            index = parsed.target < 0 ? Math.max(0, first + parsed.target) : last + parsed.target;
        } else {
            index = typeof parsed.target !== 'object' ? parsed.target : this.index(parsed.target);
        }

        if (index < first) {
            return this.scroll(index, animate, callback);
        }

        if (index >= first && index <= last) {
            if ($.isFunction(callback)) {
                callback.call(this, false);
            }

            return this;
        }

        var items = this.items(),
            clip = this.clipping(),
            lrb  = this.vertical ? 'bottom' : (this.rtl ? 'left'  : 'right'),
            wh   = 0,
            curr;

        while (true) {
            curr = items.eq(index);

            if (curr.length === 0) {
                break;
            }

            wh += this.dimension(curr);

            if (wh >= clip) {
                var margin = parseFloat(curr.css('margin-' + lrb)) || 0;
                if ((wh - margin) !== clip) {
                    index++;
                }
                break;
            }

            if (index <= 0) {
                break;
            }

            index--;
        }

        return this.scroll(index, animate, callback);
    };
}(jQuery));

(function($) {
    'use strict';

    $.jCarousel.plugin('jcarouselControl', {
        _options: {
            target: '+=1',
            event:  'click',
            method: 'scroll'
        },
        _active: null,
        _init: function() {
            this.onDestroy = $.proxy(function() {
                this._destroy();
                this.carousel()
                    .one('jcarousel:createend', $.proxy(this._create, this));
            }, this);
            this.onReload = $.proxy(this._reload, this);
            this.onEvent = $.proxy(function(e) {
                e.preventDefault();

                var method = this.options('method');

                if ($.isFunction(method)) {
                    method.call(this);
                } else {
                    this.carousel()
                        .jcarousel(this.options('method'), this.options('target'));
                }
            }, this);
        },
        _create: function() {
            this.carousel()
                .one('jcarousel:destroy', this.onDestroy)
                .on('jcarousel:reloadend jcarousel:scrollend', this.onReload);

            this._element
                .on(this.options('event') + '.jcarouselcontrol', this.onEvent);

            this._reload();
        },
        _destroy: function() {
            this._element
                .off('.jcarouselcontrol', this.onEvent);

            this.carousel()
                .off('jcarousel:destroy', this.onDestroy)
                .off('jcarousel:reloadend jcarousel:scrollend', this.onReload);
        },
        _reload: function() {
            var parsed   = $.jCarousel.parseTarget(this.options('target')),
                carousel = this.carousel(),
                active;

            if (parsed.relative) {
                active = carousel
                    .jcarousel(parsed.target > 0 ? 'hasNext' : 'hasPrev');
            } else {
                var target = typeof parsed.target !== 'object' ?
                                carousel.jcarousel('items').eq(parsed.target) :
                                parsed.target;

                active = carousel.jcarousel('target').index(target) >= 0;
            }

            if (this._active !== active) {
                this._trigger(active ? 'active' : 'inactive');
                this._active = active;
            }

            return this;
        }
    });
}(jQuery));

(function($) {
    'use strict';

    $.jCarousel.plugin('jcarouselPagination', {
        _options: {
            perPage: null,
            item: function(page) {
                return '<a href="#' + page + '">' + page + '</a>';
            },
            event:  'click',
            method: 'scroll'
        },
        _carouselItems: null,
        _pages: {},
        _items: {},
        _currentPage: null,
        _init: function() {
            this.onDestroy = $.proxy(function() {
                this._destroy();
                this.carousel()
                    .one('jcarousel:createend', $.proxy(this._create, this));
            }, this);
            this.onReload = $.proxy(this._reload, this);
            this.onScroll = $.proxy(this._update, this);
        },
        _create: function() {
            this.carousel()
                .one('jcarousel:destroy', this.onDestroy)
                .on('jcarousel:reloadend', this.onReload)
                .on('jcarousel:scrollend', this.onScroll);

            this._reload();
        },
        _destroy: function() {
            this._clear();

            this.carousel()
                .off('jcarousel:destroy', this.onDestroy)
                .off('jcarousel:reloadend', this.onReload)
                .off('jcarousel:scrollend', this.onScroll);

            this._carouselItems = null;
        },
        _reload: function() {
            var perPage = this.options('perPage');

            this._pages = {};
            this._items = {};

            // Calculate pages
            if ($.isFunction(perPage)) {
                perPage = perPage.call(this);
            }

            if (perPage == null) {
                this._pages = this._calculatePages();
            } else {
                var pp    = parseInt(perPage, 10) || 0,
                    items = this._getCarouselItems(),
                    page  = 1,
                    i     = 0,
                    curr;

                while (true) {
                    curr = items.eq(i++);

                    if (curr.length === 0) {
                        break;
                    }

                    if (!this._pages[page]) {
                        this._pages[page] = curr;
                    } else {
                        this._pages[page] = this._pages[page].add(curr);
                    }

                    if (i % pp === 0) {
                        page++;
                    }
                }
            }

            this._clear();

            var self     = this,
                carousel = this.carousel().data('jcarousel'),
                element  = this._element,
                item     = this.options('item'),
                numCarouselItems = this._getCarouselItems().length;

            $.each(this._pages, function(page, carouselItems) {
                var currItem = self._items[page] = $(item.call(self, page, carouselItems));

                currItem.on(self.options('event') + '.jcarouselpagination', $.proxy(function() {
                    var target = carouselItems.eq(0);

                    // If circular wrapping enabled, ensure correct scrolling direction
                    if (carousel.circular) {
                        var currentIndex = carousel.index(carousel.target()),
                            newIndex     = carousel.index(target);

                        if (parseFloat(page) > parseFloat(self._currentPage)) {
                            if (newIndex < currentIndex) {
                                target = '+=' + (numCarouselItems - currentIndex + newIndex);
                            }
                        } else {
                            if (newIndex > currentIndex) {
                                target = '-=' + (currentIndex + (numCarouselItems - newIndex));
                            }
                        }
                    }

                    carousel[this.options('method')](target);
                }, self));

                element.append(currItem);
            });

            this._update();
        },
        _update: function() {
            var target = this.carousel().jcarousel('target'),
                currentPage;

            $.each(this._pages, function(page, carouselItems) {
                carouselItems.each(function() {
                    if (target.is(this)) {
                        currentPage = page;
                        return false;
                    }
                });

                if (currentPage) {
                    return false;
                }
            });

            if (this._currentPage !== currentPage) {
                this._trigger('inactive', this._items[this._currentPage]);
                this._trigger('active', this._items[currentPage]);
            }

            this._currentPage = currentPage;
        },
        items: function() {
            return this._items;
        },
        reloadCarouselItems: function() {
            this._carouselItems = null;
            return this;
        },
        _clear: function() {
            this._element.empty();
            this._currentPage = null;
        },
        _calculatePages: function() {
            var carousel = this.carousel().data('jcarousel'),
                items    = this._getCarouselItems(),
                clip     = carousel.clipping(),
                wh       = 0,
                idx      = 0,
                page     = 1,
                pages    = {},
                curr,
                dim;

            while (true) {
                curr = items.eq(idx++);

                if (curr.length === 0) {
                    break;
                }

                dim = carousel.dimension(curr);

                if ((wh + dim) > clip) {
                    page++;
                    wh = 0;
                }

                wh += dim;

                if (!pages[page]) {
                    pages[page] = curr;
                } else {
                    pages[page] = pages[page].add(curr);
                }
            }

            return pages;
        },
        _getCarouselItems: function() {
            if (!this._carouselItems) {
                this._carouselItems = this.carousel().jcarousel('items');
            }

            return this._carouselItems;
        }
    });
}(jQuery));

(function($, document) {
    'use strict';

    var hiddenProp,
        visibilityChangeEvent,
        visibilityChangeEventNames = {
            hidden: 'visibilitychange',
            mozHidden: 'mozvisibilitychange',
            msHidden: 'msvisibilitychange',
            webkitHidden: 'webkitvisibilitychange'
        }
    ;

    $.each(visibilityChangeEventNames, function(key, val) {
        if (typeof document[key] !== 'undefined') {
            hiddenProp = key;
            visibilityChangeEvent = val;
            return false;
        }
    });

    $.jCarousel.plugin('jcarouselAutoscroll', {
        _options: {
            target:    '+=1',
            interval:  3000,
            autostart: true
        },
        _timer: null,
        _started: false,
        _init: function () {
            this.onDestroy = $.proxy(function() {
                this._destroy();
                this.carousel()
                    .one('jcarousel:createend', $.proxy(this._create, this));
            }, this);

            this.onAnimateEnd = $.proxy(this._start, this);

            this.onVisibilityChange = $.proxy(function() {
                if (document[hiddenProp]) {
                    this._stop();
                } else {
                    this._start();
                }
            }, this);
        },
        _create: function() {
            this.carousel()
                .one('jcarousel:destroy', this.onDestroy);

            $(document)
                .on(visibilityChangeEvent, this.onVisibilityChange);

            if (this.options('autostart')) {
                this.start();
            }
        },
        _destroy: function() {
            this._stop();

            this.carousel()
                .off('jcarousel:destroy', this.onDestroy);

            $(document)
                .off(visibilityChangeEvent, this.onVisibilityChange);
        },
        _start: function() {
            this._stop();

            if (!this._started) {
                return;
            }

            this.carousel()
                .one('jcarousel:animateend', this.onAnimateEnd);

            this._timer = setTimeout($.proxy(function() {
                this.carousel().jcarousel('scroll', this.options('target'));
            }, this), this.options('interval'));

            return this;
        },
        _stop: function() {
            if (this._timer) {
                this._timer = clearTimeout(this._timer);
            }

            this.carousel()
                .off('jcarousel:animateend', this.onAnimateEnd);

            return this;
        },
        start: function() {
            this._started = true;
            this._start();

            return this;
        },
        stop: function() {
            this._started = false;
            this._stop();

            return this;
        }
    });
}(jQuery, document));
;/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
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


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);
;$(document).ready(function(){

//jcarousel
    $(function() {
        $('.jcarousel').jcarousel();

        $('.jcarousel-control-prev')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.jcarousel-control-next')
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        $('.jcarousel-pagination')
            .on('jcarouselpagination:active', 'a', function() {
                $(this).addClass('active');
            })
            .on('jcarouselpagination:inactive', 'a', function() {
                $(this).removeClass('active');
            })
            .jcarouselPagination();
    });

//select
	var params = {
        changedEl: "select",
        visRows: 5,
        scrollArrows: true
    }
    cuSel(params);

// checkbox
	jQuery(document).ready(function(){

        jQuery(".niceCheck").each(
        /* при загрузке страницы меняем обычные на стильные checkbox */
        function() {
             
             changeCheckStart(jQuery(this));
             
        });
    
    });


    function changeCheck(el)
    /* 
        функция смены вида и значения чекбокса при клике на контейнер чекбокса (тот, который отвечает за новый вид)
        el - span контейнер для обычного чекбокса
        input - чекбокс
    */
    {

        var el = el,
            input = el.find("input").eq(0);
              
        if(el.attr("class").indexOf("niceCheckDisabled")==-1)
        {   
            if(!input.attr("checked")) {
                el.addClass("niceChecked");
                input.attr("checked", true);
            } else {
                el.removeClass("niceChecked");
                input.attr("checked", false).focus();
            }
        }
        
        return true;
    }

    function changeVisualCheck(input)
    {
    /*
        меняем вид чекбокса при смене значения
    */
    var wrapInput = input.parent();
        if(!input.attr("checked")) {
            wrapInput.removeClass("niceChecked");
        }
        else
        {
            wrapInput.addClass("niceChecked");
        }
    }

    function changeCheckStart(el)
    /* 
        новый чекбокс выглядит так <span class="niceCheck"><input type="checkbox" name="[name check]" id="[id check]" [checked="checked"] /></span>
        новый чекбокс получает теже name, id и другие атрибуты что и были у обычного
    */
    {

    try
    {
    var el = el,
        checkName = el.attr("name"),
        checkId = el.attr("id"),
        checkChecked = el.attr("checked"),
        checkDisabled = el.attr("disabled"),
        checkTab = el.attr("tabindex"),
        checkValue = el.attr("value");
        if(checkChecked)
            el.after("<span class='niceCheck niceChecked'>"+
                "<input type='checkbox'"+
                "name='"+checkName+"'"+
                "id='"+checkId+"'"+
                "checked='"+checkChecked+"'"+
                "value='"+checkValue+"'"+
                "tabindex='"+checkTab+"' /></span>");
        else
            el.after("<span class='niceCheck'>"+
                "<input type='checkbox'"+
                "name='"+checkName+"'"+
                "id='"+checkId+"'"+
                 "value='"+checkValue+"'"+
                "tabindex='"+checkTab+"' /></span>");
        
        /* если checkbox disabled - добавляем соотвсмтвующи класс для нужного вида и добавляем атрибут disabled для вложенного chekcbox */      
        if(checkDisabled)
        {
            el.next().addClass("niceCheckDisabled");
            el.next().find("input").eq(0).attr("disabled","disabled");
        }
        
        /* цепляем обработчики стилизированным checkbox */      
        el.next().bind("mousedown", function(e) { changeCheck(jQuery(this)) });
        el.next().find("input").eq(0).bind("change", function(e) { changeVisualCheck(jQuery(this)) });
        if(jQuery.browser.msie)
        {
            el.next().find("input").eq(0).bind("click", function(e) { changeVisualCheck(jQuery(this)) });   
        }
        el.remove();
    }
    catch(e)
    {
        // если ошибка, ничего не делаем
    }

        return true;
    }


});	

