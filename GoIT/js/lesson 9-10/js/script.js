$(document).ready(function(){

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

	

	$(".niceCheck").mousedown(
		function() {
		     changeCheck(jQuery(this));
		});

	jQuery(".niceCheck").each(
		function() { 
		    changeCheckStart(jQuery(this)); 
		});

	function changeCheck(el)
	{
	     var el = el,
	          input = el.find("input").eq(0);
	   	 if(!input.attr("checked")) {
			el.css("background-position","0 -17px");	
			input.attr("checked", true)
		} else {
			el.css("background-position","0 0");	
			input.attr("checked", false)
		}
	     return true;
	}

	function changeCheckStart(el)
	{
	var el = el,
			input = el.find("input").eq(0);
	      if(input.attr("checked")) {
			el.css("background-position","0 -17px");	
			}
	     return true;
	}


	// dropdown menu
	var $links = $('.menu a');

	$links.on('click' function(e){
		var $submenu = $(this).siblings('.submenu');
		e.prevenDefault();
		console.log(submenu);
	}) 
});	

