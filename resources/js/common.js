$(function(){
	//사이드 메뉴 접고, 펴기
	$('.gnb .btn-full').on('click', function(){
		if($(this).hasClass('side-hide')){
			sideMenuBarControl.show();
		}else{
			sideMenuBarControl.hide();
		}
	});
	$('.gnb > ul > li > a').on('click', function(){
		sideNavToggle($(this));
	});

	//오른쪽 영역 마우스 드래그로 스크롤
	var x, y, left, top, clicked;
	$('.gant-chart .right').on('mousedown', function(e){
		e.preventDefault();
		clicked = true;
		x = e.pageX;
		y = e.pageY;
		left = $(this).scrollLeft();
		top = $(this).scrollTop();
	});
	$('.gant-chart .right').on('mousemove', function(e){
		if(clicked){
			var newX = e.pageX;
			var newY = e.pageY;
			$('.gant-chart .right').scrollLeft(left - newX + x);
			$('.gant-chart .left, .gant-chart .right').scrollTop(top - newY + y);
		}
	});
	$('.gant-chart .right').on('mouseup', function(e){
		clicked = false;
	});

	//layout resizable 
	$('.gnb').resizable({
		maxWidth: 280,
		minWidth: 45,
		grid: [ 10, 0 ],
		resize: function(event, ui){
			var gnbWidth = ui.size.width;
			var afterContWidth = gnbWidth + 20;
			$('#container .content').css({
				'padding-left': afterContWidth,
				'width': 'calc(100% - '+ afterContWidth +'px)'
			});
		}
	});

	//layer content drag
	$('.layer-box').draggable({
		containment: 'parent', 
		scroll: false,
	});

	//page fixed nav
	/*$('.page-nav').css({
		'right': '30px',
		'bottom': '30px'
	});*/
	var filterHeaderHeight = $('.float-box .filter-header').outerHeight();
	var filterBoxHeight = $('.float-box .filter-box').outerHeight();
	var filterBtnsHeight = $('.float-box .btns').outerHeight();
	if($('.float-box').length){
		$('.float-box').height(filterHeaderHeight + filterBoxHeight + filterBtnsHeight + 20 + 25);
	}
	$('.float-box').draggable({
		containment: 'document', 
		scroll: false,
	});
	$('.float-box .menu .btn-size a').on('click', function(){
		if($('.float-box').hasClass('min')){
			$('.float-box').removeClass('min').addClass('max');
			$(this).prop('title', '최소화');
			$(this).find('i').prop('class', '').addClass('fas fa-caret-up');
			$('.float-box .bar').hide();
		}else{
			$('.float-box').removeClass('max').addClass('min');
			$(this).prop('title', '최대화');
			$(this).find('i').prop('class', '').addClass('fas fa-caret-down');
			$('.float-box .bar').show();
		}
	});
	$('.float-box .bar').on('click', function(){
		$('.float-box').removeClass('min').addClass('max');
		$('.float-box .menu .btn-size a').prop('title', '최소화');
		$('.float-box .menu .btn-size a').find('i').prop('class', '').addClass('fas fa-caret-up');
		$(this).hide();
	});

	//layout resizable
	$('.gant-chart .left').resizable({
		maxWidth: 800,
		minWidth: 364,
		grid: [ 10, 0 ],
		handles: 'e, w',
		resize: function(event, ui){
			var gnbWidth = ui.size.width;
			var afterContWidth = gnbWidth;
			$('.gant-chart .right').css({
				'width': 'calc(100% - '+ afterContWidth +'px)'
			});
		}
	});
	var mouseEnterLeft = false;
	var mouseEnterRight = false;
	//scroll
	$('.gant-chart .left').on('mouseenter', function(){
		mouseEnterLeft = true;
	});
	$('.gant-chart .left').on('mouseleave', function(){
		mouseEnterLeft = false;
	});	
	$('.gant-chart .left').on('scroll', function(){
		if(mouseEnterLeft){
			var leftScrollTop = $('.gant-chart .left').scrollTop();
			console.log('left + '+ leftScrollTop);
			$('.gant-chart .right').scrollTop(leftScrollTop);
		}	
	});
	$('.gant-chart .right').on('mouseenter', function(){
		mouseEnterRight = true;
	});
	$('.gant-chart .right').on('mouseleave', function(){
		mouseEnterRight = false;
	});
	$('.gant-chart .right').on('scroll', function(){
		if(mouseEnterRight){
			var rightScrollTop = $('.gant-chart .right').scrollTop();
			var rightScrollLeft = $('.gant-chart .right').scrollLeft();
			//console.log('right + '+ rightScrollTop);
			$('.gant-chart .left').scrollTop(rightScrollTop);
			$('.gant-chart .right .header').css({'left': -rightScrollLeft});
		}
	});
	//mouse hover
	$('.gant-chart .left ul li').on('mouseenter', function(){
		var idx = $(this).index();
		$('.gant-chart .right ul li').removeClass('active');
		$('.gant-chart .right ul li').eq(idx).addClass('active');
	});
	$('.gant-chart .right ul li').on('mouseenter', function(){
		var idx = $(this).index();
		$('.gant-chart .left ul li').removeClass('active');
		$('.gant-chart .left ul li').eq(idx).addClass('active');
	});
	$('.gant-chart .header').on('mouseenter', function(){
		$('.gant-chart .left ul li').removeClass('active');
		$('.gant-chart .right ul li').removeClass('active');
	});
	$('.gant-chart .left ul li').on('mouseleave', function(){
		$('.gant-chart .left ul li').removeClass('active');
		$('.gant-chart .right ul li').removeClass('active');
	});
	$('.gant-chart .right ul li').on('mouseleave', function(){
		$('.gant-chart .left ul li').removeClass('active');
		$('.gant-chart .right ul li').removeClass('active');
	});
	$('.gant-chart .right ul li span').on('mouseenter', function(){
		var idx = $(this).index();
		$('.gant-chart .right .day span').eq(idx).addClass('hover');
	});
	$('.gant-chart .right ul li span').on('mouseleave', function(){
		$('.gant-chart .right .day span').removeClass('hover');
	});
	//우측 width 세팅
	if($('.right').hasClass('month-view')){
		setRightWidth('month');
		setTimelineCheck('thisMonth', 3);
	}else{
		setRightWidth('day');
		//오늘 날짜 세팅 (하루)
		setTimelineCheck('today', 33);
		//주말 세팅 (여러 개 날짜)
		setTimelineCheck('holiday', [6,7,13,14,20,21,27,28,34,35,41,42,48,49,55,56,62,63,69,70,76,77,82,83,89,90,96,97,103,104,110,111]);
	}
	//특정 날짜 세팅
	//setTimelineCheck(bgColor, checkPoint)
	/*
		type : 표시 타입 >> holiday, today
		checkPoint : 표시할 지점 (int or array)
	*/	

	//특정 위치로 바로 이동
	//scrollLeftTo(45);

	//date picker
	if($('.from-date').length || $('.to-date').length){
		settingDatePicker();
	}
});
function insertSchedule(type, name, startDate, wDay){
	var oriNameText = $('.gant-chart .left .'+ name +' .name').text();
	var resource = $('.gant-chart .left .'+ name +' .resource').text();
}
//우측 width 세팅
function setRightWidth(viewType){
	if(viewType == 'day'){
	// 일별보기
		var dayLength = $('.gant-chart .right .day span').length;
		var totalWidth = 0;
		for(var i = 0; i < dayLength; i++){
			var thisWidth = $('.gant-chart .right .day span').eq(i).outerWidth();
			totalWidth += thisWidth;
		}
		$('.gant-chart .right .header').width(totalWidth);
		$('.gant-chart .right ul').width(totalWidth);
	}else{
	//월별보기
		var monthLength = $('.gant-chart .right .month span').length;
		var totalWidth = 0;
		for(var i = 0; i < monthLength; i++){
			var thisWidth = $('.gant-chart .right .month span').eq(i).outerWidth();
			totalWidth += thisWidth;
		}
		console.log(monthLength, totalWidth)
		$('.gant-chart .right .header').width(totalWidth);
		$('.gant-chart .right ul').width(totalWidth);
	}
}
//타임라인에 특정일 표시
/*
	bgColor : 표시 색상 >> #ddd, #000, rgba(0,0,0,.5)...
	checkPoint : 표시할 지점 (int or array)
*/
function setTimelineCheck(type, checkPoint){
	var listLength = $('.gant-chart ul li').length;
	if(type == 'today'){
		$('.gant-chart .header .day span').eq(checkPoint).addClass('today');
		for(var i = 0; i < listLength; i++){
			$('.gant-chart ul li').eq(i).children('span').eq(checkPoint).addClass('today');
		}
	}else if(type == 'thisMonth'){
		$('.gant-chart .header .day span').eq(checkPoint).addClass('this-month');
		for(var i = 0; i < listLength; i++){
			$('.gant-chart ul li').eq(i).children('span').eq(checkPoint).addClass('this-month');
		}
	}else{
		for(idx in checkPoint){
			$('.gant-chart .header .day span').eq(checkPoint[idx]).addClass('holiday');
			for(var i = 0; i < listLength; i++){
				$('.gant-chart ul li').eq(i).children('span').eq(checkPoint[idx]).addClass('holiday');
			}
		}
	}
}
//특정 위치로 바로 이동
function scrollLeftTo(checkPoint){
	$('.gant-chart .right .header').animate({'left': -(checkPoint * 21)}, 300);
	$('.gant-chart .right').animate({'scrollLeft': checkPoint * 21}, 300);
}

function sideNavToggle(el){
	if($(el).closest('li').hasClass('active')){
		$(el).closest('li').removeClass('active');
	}else{
		$(el).closest('li').addClass('active');
	}
}

function showNoticeLayer(el, speed){
	if($.cookie('noticeCookie') == undefined){
		commonLayerOpen(el, speed);
	}
}	
function commonLayerTodayClose(el, speed){
	$.cookie('noticeCookie', 'Y', {expires: 1, path: '/'});	
	commonLayerClose(el, speed);
}

//Layer Content
function layerContShow(thisClass){
	$('.'+thisClass).show();
	var layerBoxWidth = $('.'+thisClass).find('.layer-box').outerWidth();
	var layerBoxHeight = $('.'+thisClass).find('.layer-box').outerHeight();
	$('.'+thisClass).find('.layer-box').css({
		'top': '50%',
		'left': '50%',
		'margin-left': -(layerBoxWidth / 2),
		'margin-top': -(layerBoxHeight / 2)
	});
}
function layerContHide(thisClass){
	$('.'+thisClass).hide();
}

var sideMenuBarControl = {
	sideMenu :$('.gnb'),
	content :$('.content'),
	sideMenuButton :$('.gnb .btn-full'),
	show :function(){
		this.sideMenu.removeClass('side-hide');
		this.content.removeClass('side-hide');
		this.sideMenuButton.removeClass('side-hide').children('.ico').html('<i class="fas fa-compress-alt"></i>').prop('title', '접기');
		this.sideMenuButton.children('.txt').html('접기');
	},
	hide :function(){
		this.sideMenu.addClass('side-hide');
		this.content.addClass('side-hide');
		this.sideMenuButton.addClass('side-hide').children('.ico').html('<i class="fas fa-expand-alt"></i>').prop('title', '열기');
		this.sideMenuButton.children('.txt').html('');
		$('.selector').resizable('destroy');
	}
}

//preview image resize
function previewImgResize(){
	if($('.preview-img img').height() >= 500){
		$('.preview-img img').css('height', '500px');
		var previewImg = $('.preview-img').html();
		var previewImgSrc = $('.preview-img img').attr('src');
		var imgLink = '<a href="'+previewImgSrc+'" target="_blank" style="display:inline-block;">'+previewImg+'</a>'
		$('.preview-img').html(imgLink);
	}
}

//date picker
function settingDatePicker(){
	$('.from-date').datepicker({
		dateFormat: 'yy-mm-dd',
		yearSuffix: '년',
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
		buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
		buttonImageOnly: true,
		showMonthAfterYear: true,
		onClose: function(selectedDate){
			$('.to-date').datepicker('option', 'minDate', selectedDate);
		}
		//howOtherMonths: true,
		//changeYear: true,
		//changeMonth: true,
	});

	$('.to-date').datepicker({
		dateFormat: 'yy-mm-dd',
		yearSuffix: '년',
		monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'],
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
		buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif",
		buttonImageOnly: true,
		showMonthAfterYear: true,
		// onClose: function(selectedDate){
		// 	$('.from-date').datepicker('option', 'minDate', selectedDate);
		// }
		//howOtherMonths: true,
		//changeYear: true,
		//changeMonth: true,
	});
}