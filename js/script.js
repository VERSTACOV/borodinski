'use strict'

//==================================================================================================================================================================

//Background
function ibg() {
	let ibg = document.querySelectorAll(".ibg");
for (var i = 0; i < ibg.length; i++) {
	if(ibg[i].querySelector('img')){
		ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
}

ibg();

//==================================================================================================================================================================

//Menu-burger
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
const buttonNone = document.querySelector('.header__entrance');

if (iconMenu){
	iconMenu.addEventListener("click", function(e) { //"e"-это обработчик объекта (объект становится доступным).
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
		buttonNone.classList.toggle('none');
	});
}


//slider-slick
$(document).ready(function(){
	$('.slider').slick({

	});
});

$(document).ready(function(){
	$('.slider-shop').slick({
		slidesToShow: 3,
		slidesToScroll: 3,
		arrows: false,
		dots: true,
		draggable: false,
		swipe: false,
		//fade: true,
		responsive: [
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
				}
			},{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					dots: false,
					arrows: true,
				}
			}
		]
	});
});

$(document).ready(function(){
	$('.slider-big').slick({
		arrows: false,
		asNavFor:'.slider-little',
		fade: true,
		dots: false,
	});
});

$(document).ready(function(){
	$('.slider-little').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		asNavFor:'.slider-big',
				responsive: [
			{
				breakpoint:991,
				settings: {
					vertical: true,
					verticalSwiping: true,
				}
				},{ 
				breakpoint:767,
				settings: {
					vertical: false,
					verticalSwiping: false,
				}
			}
		]
	});
});

//==================================================================================================================================================================

//Popup-form
//1) Для начала объявляем несколько переменных, 
const popupLinks = document.querySelectorAll('.popup-link'); //В переменную popupLinks получаем все объекты с классом .popup-link (что бы попап открывался при клике на любой объект с классом .popup-link)
const body = document.querySelector('body'); // получаем в переменную боди сам тег боди (для того что бы блокировать скрол)
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true; //что бы не было двойных нажатий

const timeout = 300; // время transition должно совпадать с css

 if (popupLinks.length > 0) { 
 	for (let index = 0; index < popupLinks.length; index++) { 
 		const popupLink = popupLinks[index];
 		popupLink.addEventListener('click', function (e) {
 			const popupName = popupLink.getAttribute('action').replace("#", '');
 			const curentPopup = document.getElementById(popupName);
 			popupOpen(curentPopup);
 			e.preventDefault();
 		});
 	}
 }

  if (popupLinks.length > 0) { 
 	for (let index = 0; index < popupLinks.length; index++) {
 		const popupLink = popupLinks[index];
 		popupLink.addEventListener('click', function (e) { 
 			const popupName = popupLink.getAttribute('href').replace("#", ""); 
 			const curentPopup = document.getElementById(popupName);
 			popupOpen(curentPopup);
 			e.preventDefault();
 		});
 	}
 }

//закрытие попапа (объекты которые будут попап закрывать и это любые объекты, которые находятся внутри попапа и у них есть класс .close-popup)
 const popupCloseIcon = document.querySelectorAll('.close-popup');
 if (popupCloseIcon.length > 0) { //проверочка наличия
 	for (let index = 0; index < popupCloseIcon.length; index++) { //цикл
 		const el = popupCloseIcon[index]; //получаем конкретный объект
 		el.addEventListener('click', function (e) { //вешаем на него событие клик
 			popupClose(el.closest('.popup')); //при событии клик отправляем в функцию popupClose объект который является ближайшим родителем нажатой ссылки с классом popup (тоесть после нажатия на ссылку будет искать объект с классом popup и его закрывать)
 			e.preventDefault();
 		});
 	}
 }

 //функция открытия попапа
 function popupOpen(curentPopup) {
 	if (curentPopup && unlock) {
 		const popupActive = document.querySelector('.popup.open'); //нужно получить открытый попап, а именно объект с классом popup у которого есть класс open
 		if (popupActive) { //если он существует 
 			popupClose(popupActive, false); //то закрыть его
 		} else {
 			bodyLock(); //если такого нет то мы блочим наш скрол
 		}
 		curentPopup.classList.add('open'); //после этого мы к нашему попапу добавляем класс open
 		curentPopup.addEventListener('click', function (e) { //дальше вешаем событие при клике
 			if (!e.target.closest('.popup__content')) { //этим условием отсекаем все кроме темной области (здесь идет проверка: если у нажатого объекта нет в родителях объекта с классом popup__content)
 				popupClose(e.target.closest('.popup'));//тогда мы попап закрываем (передаем в функцию popupClose ближайший объект с классом popup)
 			}
 		});
 	}
 }
 function popupClose(popupActive, doUnlock = true) {
 	if (unlock) {
 		popupActive.classList.remove('open');
 		if  (doUnlock) {
 			bodyUnlock();
 		}
 	}
 }

 function bodyLock() {
 	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

 	if (lockPadding.length > 0) {
 		for (let index = 0; index < lockPadding.length; index++) {
 			const el = lockPadding[index];
 			el.style.paddingRight = lockPaddingValue;
 		}
 	}

 	body.style.paddingRight = lockPaddingValue;
 	body.classList.add('lock');

 	unlock = false;
 	setTimeout(function () {
 		unlock = true;
 	}, timeout);
 }

 function bodyUnlock() {
 	setTimeout(function () {
 		if(lockPadding.length > 0) {
	 		for (let index = 0; index < lockPadding.length; index++) {
	 			const el = lockPadding[index];
	 			el.style.paddingRight = '0px';
	 		}
		}
 		body.style.paddingRight = '0px';
 		body.classList.remove('lock');
 	}, timeout);

 	unlock = false;
 	setTimeout(function () {
 		unlock = true;
 	}, timeout);
 }

//закрытие клавишей esc
 document.addEventListener('keydown', function (e) {
 	if (e.which === 27) { //код клавиши esc
 		const popupActive = document.querySelector('.popup.open'); // получаем 
 		popupClose(popupActive); //отправляем в функцию клоуз
 	}
 });

//==================================================================================================================================================================

 //Полифил (подгоняет определенные параметры под старые браузеры)
 (function () {
 	//проверяет поддержку
 	if (!Element.prototype.closest) {
 		//реализуем
 		Element.prototype.closest = function (css) {
 			var node = this;
 			while (node) {
 				if (node.matches(css)) return node;
 				else node = node.parentElement;
 			}
 			return null;
 		};
 	}
 })();
 (function () {
 	//проверяем поддержку
 	if (!Element.prototype.matches) {
 		//определяем свойство
 		Element.prototype.matches = Element.prototype.matchesSelector ||
 			Element.prototype.webkitMatchesSelector ||
 			Element.prototype.mozMatchesSelector ||
 			Element.prototype.msMatchesSelector;
 	}
 })();

//==================================================================================================================================================================

//active-item
    /*function shineLinks(id){
        try{
            var el = document.getElementById(id).getElementsByTagName('a');
            var url = document.location.href;
            for(var i = 0; i < el.length; i++){
                if (url == el[i].href){
                    el[i].className += ' act';
                };
            };
        }catch(e){}
    };
    shineLinks('menu-act');
*/
//==================================================================================================================================================================

//прокрутка
/*const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', onMenuLinkClick);
	});
	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);

			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}
*/

