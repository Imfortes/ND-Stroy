var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
  displayBackTime();
  rangeCalc();
  anchorsLink();
  phoneRegExp();

  calculatorFormSubmit();

});


function displayBackTime() {
  let daysCount = document.querySelector('.rect-days__count'),
    hoursCount = document.querySelector('.rect-hours__count'),
    minutesCount = document.querySelector('.rect-minutes__count'),
    secondsCount = document.querySelector('.rect-seconds__count');

  let sDate = new Date(2019, 12, 31);
  let now = new Date();

  let timer = sDate.getTime() - now.getTime();

  let days = parseInt(timer / (24 * 60 * 60 * 1000));
  let hours = parseInt(timer / (60 * 60 * 1000)) % 24;
  let min = parseInt(timer / (60 * 1000)) % 60;
  let sec = parseInt(timer / (1000)) % 60;

  daysCount.innerText = days;
  hoursCount.innerText = hours;
  minutesCount.innerText = min;
  secondsCount.innerText = sec;

  const sklonenie = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

  let d = sklonenie(days, ['день', 'дня', 'дней']);
  let h = sklonenie(hours, ['час', 'часа', 'часов']);
  let m = sklonenie(min, ['минута', 'минуты', 'минут']);
  let s = sklonenie(sec, ['секунда', 'секунды', 'секунд']);

  daysCount.nextElementSibling.innerHTML = d;
  hoursCount.nextElementSibling.innerHTML = h;
  minutesCount.nextElementSibling.innerHTML = m;
  secondsCount.nextElementSibling.innerHTML = s;

  setTimeout(displayBackTime, 1000);
}

function rangeCalc() {
  let values = [];

  $("datalist > option").each((index, item) => {
    values.push($(item).html());
  });

  let min = (obj) => {
    var a = obj[0];
    for (var i = 1; i < obj.length; i++) {
      if (obj[i] < a) {
        a = obj[i];
      }
    }
    return a;
  };

  $("input[type='range']").on("input", (e) => {
    let element = $(e.currentTarget);
    let value = element.val();

    let differenceArr = [];
    values.forEach((item, index) => {
      differenceArr.push(Math.abs(item - value));
    });
    let minDifferense = min(differenceArr);
    let newValue = values[differenceArr.indexOf(minDifferense)];
    element.val(newValue);
  });
}

function anchorsLink() {
  const anchors = [].slice.call(document.querySelectorAll('.nav-links')),
    animationTime = 800,
    framesCount = 50;

  anchors.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      let coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset;

      let scroller = setInterval(function () {

        let scrollBy = coordY / framesCount;

        if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
          window.scrollBy(0, scrollBy);
        } else {
          window.scrollTo(0, coordY);
          clearInterval(scroller);
        }

      }, animationTime / framesCount);
    });
  });
}

function phoneRegExp() {
  var element = document.getElementById('phone');
  var maskOptions = {
    mask: '+{7}(000)000-00-00'
  };
  var mask = IMask(element, maskOptions);
}


function calculatorFormSubmit() {
  let person = {
    count: 0,
    duration: {
      seasonal: false,
      permanent: false
    },
    installation: {
      independently: false,
      order: false
    },
    address: '',
    estimate: {
      name: '',
      phone: ''
    }


  };

  let calculatorStepValues = document.querySelectorAll('.my-slide-check');
  calculatorStepValues.forEach(function (item) {
    item.addEventListener('click', (e) => {
      e.preventDefault();
    });
  });

  let counterUsers = document.querySelector('.counter-users');
  if (counterUsers.value !== 0){
    person.count = counterUsers.value;
  }
  console.log(person);


}








