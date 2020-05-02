window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    let tabs = document.querySelectorAll(".info-header-tab"),
        infoHeader = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    infoHeader.addEventListener('click', function(event){
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')){
            for (let i = 0; i < tabs.length; i++){
                if (target == tabs[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
    let deadline = "2020-05-20";
    function getRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000)% 60),
        minutes = Math.floor((t/1000/60)% 60),
        hours = Math.floor((t/(1000*60*60)) % 24);
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getRemaining(endtime);
            hours.textContent = t.hours;
            if (t.minutes < 10) {
                minutes.textContent = '0'+t.minutes;
            } else {
                minutes.textContent = t.minutes;
            }
            if (t.seconds < 10) {
                seconds.textContent = '0'+t.seconds;
            } else {
                seconds.textContent = t.seconds;
            }
            if (t.total <= 0) {
                let end = clearInterval(timeInterval);
                    end = true;
                    if (end == true) {
                        hours.textContent = '00';
                        minutes.textContent = '00';
                        seconds.textContent = '00';
                    }
            }
        }
    }
    setClock('timer', deadline);
    





    let overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close"),
        more = document.querySelector(".more");
        
    more.addEventListener('click', function(){
        overlay.style.display = "block";
        this.classList.add("more-splash");
        document.body.style.overflow = "hidden";
    });

    close.addEventListener('click',()=> {
        overlay.style.display = "none";
        more.classList.remove("more-splash");
        document.body.style.overflow = "";
    });

    let description = document.querySelectorAll('.description-btn');
    description.forEach(btns =>{
        btns.addEventListener('click', openModal);
        function openModal() {
        overlay.style.display = "block";
        btns.classList.add("more-splash");
        document.body.style.overflow = "hidden";
        }
    });




/*     for (let i = 0; i < description.length; i++) {
        description[i].addEventListener('click', function(){
            overlay.style.display = "block";
            this.classList.add("more-splash");
            document.body.style.overflow = "hidden";
        });
    } */
    
    //FORM
    let message = {
        loading: "Загрузка...",
        success: "Спасибо, скоро мы с вами свяжемся",
        failure: "Что-то пошло не так"
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        formEnd = document.getElementById('form'),
        inputEnd = formEnd.getElementsByTagName('input'),
        statusMassage = document.createElement('div');

        statusMassage.classList.add('status');

    function requestForm(form) {
        form.addEventListener('submit', function(event){
            event.preventDefault();
            form.appendChild(statusMassage);
            
            let request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-Type', 'application/JSON; charset=utf-8');


            let formData = new FormData(form);
            let obj = {};

            formData.forEach(function(value, key){
                obj[key] = value;
            });
            let json = JSON.stringify(obj);

            request.send(obj);

            request.addEventListener('readystatechange', function(){
                if (request.readyState < 4) {
                    statusMassage.innerHTML = message.loading;
                } else if (request.readyState == 4 && request.status == 200) {
                    statusMassage.innerHTML = message.success;
                } else {
                    statusMassage.innerHTML = message.failure;
                }
            });

            for (let i = 0; i < input.length; i++) {
                input[i].value = "";
            }
            for (let i = 0; i < input.length; i++) {
                inputEnd[i].value = "";
            }
        });
    }
    requestForm(form);
    requestForm(formEnd);
        
    
    
    
});