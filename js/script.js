/*======================*/
/*===script tabs*/
window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    /*=============*/
    /*функция скрытия контента при запуске скрипта*/
    function hideTabContent(a) {
        /*a - технический параметр*/
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1); //запускаем функцию с параметром 1, т.о. цикл внутри функции начнется не с 0, а с 1, и будут скрыты все .info-tabcontent, кроме нулевого.


    /*=============*/
    /*функция показа определенного таба*/
    function showTabContent(b) {
        /*b - технический параметр. Нужен, чтобы показать тот контент, который необходим*/
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    /*=============*/
    /*по клику на определенный таб, скрываенм/показываем нужные табы*/
    info.addEventListener('click', function (event) {// ловим клики внутри .info-header (делегирование событий)
        let target = event.target; //где был клик
        /*например, клик на tab[1]*/
        if (target && target.classList.contains('info-header-tab')) { //tab[1] содержит .info-header-tab? Да;
            for (let i = 0; i < tab.length; i++) {
                /*на итерации цикла с i=1...*/
                if (target == tab[i]) { /*i=1, условие выполнено...*/
                    hideTabContent(0); //скрываем все табы
                    showTabContent(i); //показываем определенный таб; тот, на который был клик
                    break; //остановить цикл
                }
            }
        }
    });
});


/*======================*/
/*===script timer*/


