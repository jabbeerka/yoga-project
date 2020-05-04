window.addEventListener('DOMContentLoaded', () => {
    let tabs = document.querySelectorAll(".info-header-tab");
    let infoHeader = document.querySelector('.info-header');
    let tabContent = document.querySelectorAll('.info-tabcontent');


    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    infoHeader.addEventListener('click', event => {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tabs.length; i++) {
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
        let t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id);
        let hours = timer.querySelector('.hours');
        let minutes = timer.querySelector('.minutes');
        let seconds = timer.querySelector('.seconds');
        let timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getRemaining(endtime);
            hours.textContent = t.hours;
            if (t.minutes < 10) {
                minutes.textContent = `0${t.minutes}`;
            } else {
                minutes.textContent = t.minutes;
            }
            if (t.seconds < 10) {
                seconds.textContent = `0${t.seconds}`;
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




    let overlay = document.querySelector(".overlay");
    let close = document.querySelector(".popup-close");
    let more = document.querySelector(".more");

    more.addEventListener('click', function() {
        overlay.style.display = "block";
        this.classList.add("more-splash");
        document.body.style.overflow = "hidden";
    });

    close.addEventListener('click', () => {
        overlay.style.display = "none";
        more.classList.remove("more-splash");
        document.body.style.overflow = "";
    });

    let description = document.querySelectorAll('.description-btn');
    description.forEach(btns => {
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

    let form = document.querySelector('.main-form');
    let input = form.getElementsByTagName('input');
    let formEnd = document.getElementById('form');
    let inputEnd = formEnd.getElementsByTagName('input');
    let statusMassage = document.createElement('div');

    statusMassage.classList.add('status');

    function requestForm(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();
            form.appendChild(statusMassage);
            let obj = {};

            function postData() {
                return new Promise((resolve, reject) => {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/JSON; charset=utf-8');
                    request.send(obj);
                    request.addEventListener('readystatechange', () => {
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState == 4 && request.status == 200) {
                            resolve();
                        } else {
                            reject();
                        }
                    });
                    formData.forEach((value, key) => {
                        obj[key] = value;
                    });
                    let json = JSON.stringify(obj);
                });
            }
            let formData = new FormData(form);
            function clearInput(input) {
                for (let i = 0; i < input.length; i++) {
                    input[i].value = "";
                }
            }
            postData(formData)
                        .then(() => statusMassage.innerHTML = message.loading)
                        .then(() => statusMassage.innerHTML = message.loading)
                        .catch(() => statusMassage.innerHTML = message.failure)
                        .then(clearInput(input, inputEnd));
        });
    }
    requestForm(form);
    requestForm(formEnd);

// slyder
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

        hideSlides(slideIndex);

    function hideSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        } 
        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item)=> item.style.display = 'none');
        dots.forEach((item)=> item.classList.remove('dot-active'));
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }
    
    function plusSlides(n) {
        hideSlides(slideIndex += n);
    }
    function currensSLide(n) {
        hideSlides(slideIndex = n);
    }
    
    prev.addEventListener('click', ()=> plusSlides(-1));
    next.addEventListener('click', ()=> plusSlides(1));

    dotsWrap.addEventListener('click', function(event){
        for(let i=0; i<dots.length +1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]){
                currensSLide(i);
            }
        }
    });

//calc
    let persons = document.querySelectorAll('.counter-block-input')[0],
        appDays = document.querySelectorAll('.counter-block-input')[1],
        totalValue = document.getElementById('total'),
        selectCity = document.getElementById('select'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        
        totalValue.innerHTML = "0";
        
        function correctSum() {
            if (persons.value == '' || appDays.value == '') {
                totalValue.innerHTML = "0";
            } else {
                totalValue.innerHTML = total * selectCity.options[selectCity.selectedIndex].value;
            }
        } 
        persons.addEventListener('change', function(){
            personsSum = +this.value;
            total = (daysSum + personsSum)*4000;
            if (appDays.value == "" || persons.value == "") {
                totalValue.innerHTML = '0';
            } else {
                totalValue.innerHTML = total;
            }
        });
        appDays.addEventListener('change', function(){
            daysSum = +this.value;
            total = (personsSum + daysSum)*4000;
            if (appDays.value == "" || persons.value == "") {
                totalValue.innerHTML = '0';
            } else {
                totalValue.innerHTML = total;
            }
        });

        selectCity.addEventListener('change', correctSum);
});