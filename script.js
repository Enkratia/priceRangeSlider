const priceInput = document.querySelectorAll(".price-input input"),
  progress = document.querySelector(".progress");

const slider = document.querySelector(".slider"),
  thumbs = document.querySelectorAll(".thumbs .thumb"),
  hands = document.querySelectorAll(".thumb .hand");

let minVal = 2500;
let maxVal = 7500;
const maxRange = 10000;

const addedLong = thumbs[0].offsetWidth / slider.offsetWidth * maxRange;

// priceInput part
priceInput.forEach(input => {
  input.addEventListener("input", e => {

    let miVal2 = parseFloat(window.getComputedStyle(thumbs[0]).left); //обновление на случаи проскальзывания пикселей
    minVal = Math.round(miVal2 * maxRange / slider.offsetWidth);

    let maVal2 = parseFloat(window.getComputedStyle(thumbs[1]).left); //обновление на случаи проскальзывания пикселей
    maxVal = Math.round(maVal2 * maxRange / slider.offsetWidth); //


    if (maxVal >= minVal && minVal <= maxRange && maxVal <= maxRange && minVal >= 0 && maxVal >= 0) {
      if (e.target.className === "input-min") {
        minVal = parseInt(priceInput[0].value);
        thumbs[0].style.left = `${minVal / maxRange * 100}%`;
        progress.style.left = `${minVal / maxRange * 100}%`;
      } else {
        maxVal = parseInt(priceInput[1].value);
        thumbs[1].style.left = `${maxVal / maxRange * 100}%`;
        progress.style.right = `${(1 - (maxVal + addedLong) / maxRange) * 100}%`;
      }
    }

    if (minVal > maxRange) {
      minVal = maxRange;
      thumbs[0].style.left = `${minVal / maxRange * 100}%`;
      progress.style.left = `${(minVal / maxRange) * 100}%`;
    }
    if (maxVal > maxRange) {
      maxVal = maxRange;
      thumbs[1].style.left = `${maxVal / maxRange * 100}%`;
      progress.style.right = `${(1 - (maxVal + addedLong) / maxRange) * 100}%`;
    }

    else if (maxVal < minVal) {
      if (e.target.className === "input-min") {
        minVal = maxVal;
        thumbs[0].style.left = `${minVal / maxRange * 100}%`;
        progress.style.left = `${minVal / maxRange * 100}%`;
      } else {
        maxVal = minVal;
        thumbs[1].style.left = `${maxVal / maxRange * 100}%`;
        progress.style.right = `${(1 - (maxVal + addedLong) / maxRange) * 100}%`;
      }
    }

    else if (minVal < 0) {
      minVal = 0;
      thumbs[0].style.left = `${minVal / maxRange * 100}%`;
      progress.style.left = `${minVal / maxRange * 100}%`;
    }
    else if (maxVal < 0) {
      maxVal = 0;
      thumbs[1].style.left = `${maxVal / maxRange * 100}%`;
      progress.style.right = `${(1 - (maxVal + addedLong) / maxRange) * 100}%`;
    }


    else if (priceInput[0].value == "") {
      minVal = 0;
      thumbs[0].style.left = `${minVal / maxRange * 100}%`;
      progress.style.left = `${minVal / maxRange * 100}%`;
    }
    else if (priceInput[1].value == "") {
      maxVal = minVal;
      thumbs[1].style.left = `${maxVal / maxRange * 100}%`;
      progress.style.right = `${(1 - (maxVal + addedLong) / maxRange) * 100}%`;
    }
  });
});

// custom thumbs part

for (let i = 0; i < thumbs.length; i++) {
  hands[i].addEventListener("mousedown", function (e) {
    e.preventDefault();

    const shiftX = e.clientX - e.target.getBoundingClientRect().left;
    const shiftXParent = e.target.parentElement.parentElement.getBoundingClientRect().left;

    e.target.parentElement.style.position = "absolute";
    e.target.parentElement.style.zIndex = "1000";

    document.addEventListener("mousemove", dragCircle);

    function dragCircle(e) {
      let leftThumb = e.clientX - shiftXParent - shiftX;

      if (leftThumb < -8.5) {
        leftThumb = -8.5;
      } else if (leftThumb > slider.offsetWidth + 8.5) { //8.5 - сдвиг от translateX
        leftThumb = slider.offsetWidth + 8.5;
      }

      if (i == 0) {
        thumbs[0].style.left = `${leftThumb + 8.5}px`;
        let miVal = parseFloat(window.getComputedStyle(thumbs[0]).left);
        minVal = Math.round(miVal * maxRange / slider.offsetWidth);
        priceInput[0].value = minVal;
        progress.style.left = `${leftThumb + 8.5}px`;
        if (maxVal - minVal < 0) {
          let maVal = parseFloat(window.getComputedStyle(thumbs[1]).left); //обновление на случаи проскальзывания пикселей
          maxValCheck = Math.round(maVal * maxRange / slider.offsetWidth); //

          priceInput[0].value = maxValCheck;
          thumbs[0].style.left = `${maxValCheck / maxRange * 100}%`;
          progress.style.left = `${maxValCheck / maxRange * 100}%`;
        }

      } else {
        thumbs[1].style.left = `${leftThumb - 8.5}px`;
        let maVal = parseFloat(window.getComputedStyle(thumbs[1]).left);
        maxVal = Math.round(maVal * maxRange / slider.offsetWidth);
        priceInput[1].value = maxVal;
        progress.style.right = `${slider.offsetWidth - leftThumb - 8.5}px`;

        if (maxVal - minVal < 0) {
          let miVal = parseFloat(window.getComputedStyle(thumbs[0]).left); //обновление на случаи проскальзывания пикселей
          minValCheck = Math.round(miVal * maxRange / slider.offsetWidth);

          priceInput[1].value = minValCheck;
          thumbs[1].style.left = `${minValCheck / maxRange * 100}%`;
          progress.style.right = `${(1 - minValCheck / maxRange) * 100}% `;
        }
      }

      document.addEventListener("mouseup", function () {
        document.removeEventListener("mousemove", dragCircle);
      });
    };
  });
}

for (let i = 0; i < thumbs.length; i++) {
  thumbs[i].ondragstart = () => {
    return false;
  }
}

