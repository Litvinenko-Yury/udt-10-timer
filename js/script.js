window.addEventListener('DOMContentLoaded', function () {
    'use strict';

    /*======================*/
    /*===script tabs*/

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


    /*======================*/
    /*===script reverse-timer*/

    let deadline = '2020-04-30'; /*это строка; можем её получть, например от сервера, или от пользователя*/

    function getTimeRemaining(endtime) {
        /*эта функция вычисляет остаток времени до deadline*/

        let t = Date.parse(endtime) - Date.parse(new Date()), /*обьект Date и метод parse(), превращает любую дату в количество миллисекунд, прошедших после 01-01-1970*/
            /*new Date() - это прямо сейчас*/
            seconds = Math.floor((t / 1000) % 60), /*получаем кол-во секунд из миллисекунд. Но нам нужно не полное количество секунд, о не более 59сек. Т.е. нужен остаток от деления на 60. Это символ "%" */
            minutes = Math.floor((t / 1000 / 60) % 60), /*получаем кол-во минут*/
            hours = Math.floor((t / (1000 * 60 * 60))); /*получаем кол-во часов*/

        /*Но! Экспортировать несколько переменных из функции просто так не получится, поэтому мы можем экспортировать объект.*/

        return {
            /*это данные, которые нужны в таймере*/
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endTime) {
        let timer = document.getElementById(id), /*сюда передаем переменную id. Это тот аргумент, который придет из 'timer' при вызове функции. Т.е. сюда попадет блок с id='timer'*/
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000); /*запускаем функцию updateClock() каждые 1000мс*/

        function updateClock() { /*эта функция обновляет часы каждую секунду*/
            let t = getTimeRemaining(endTime); /*сюда передаем deadline. Он приходит в виде аргумента endTime*/
            /*каждый раз, когда функция updateClock будет запускаться, она будет создавать внутри себя переменную t*/

            function addZero(num) { /*функция, добавляющая 0 к значению, если значение <=9*/
                if (num <= 9) {
                    return '0' + num;
                } else return num;
            };

            hours.textContent = addZero(t.hours); /*в функцию addZero() передаем значение из объекта переменной t.hours*/
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval); /*останавить таймер*/
                hours.textContent = '00'; /*показать 00, вместо отрицательных значений*/
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);/*вызов функции, которой передаются в качестве аргументов id блока и переменная deadline*/
});







