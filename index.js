const dragger = document.getElementById("dragger");
let draggerWidth = dragger.offsetWidth;

let draggers = document.querySelectorAll(".dragger");

const begin = document.getElementById("begin");
const end = document.getElementById("end");
const budget = document.getElementById("budget");

const beginError = document.getElementById("begin-error");
const endError = document.getElementById("end-error");
const budgetError = document.getElementById("budget-error");

const firstPrize = document.getElementById("first-prize");
const secondPrize = document.getElementById("second-prize");
const thirdPrize = document.getElementById("third-prize");

const firstDate = document.getElementById("first-date");
const secondDate = document.getElementById("second-date");
const thirdDate = document.getElementById("third-date");

const DateToDays = () => {
  const date1 = new Date(beginDate);
  const date2 = new Date(endDate);
  return Math.ceil(
    (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)
  );
};

const daysToDate = (coff) => {
  const date = new Date(beginDate);
  const milliseconds =
    date.getTime() + 1000 * 3600 * 24 * Math.round(coff * dateDifference);
  const newDate = new Date(milliseconds);
  let month = newDate.getMonth();
  month < 10 && (month = "0" + month);
  let day = newDate.getDate();
  day < 10 && (day = "0" + day);
  return newDate.getFullYear() + "-" + month + "-" + day;
};

let beginDate = "2020-01-01";
let endDate = "2021-01-01";
let dateDifference = 366;
let budgetValue = 1000000;

begin.value = beginDate;
end.value = endDate;
budget.value = budgetValue;

const first = document.getElementById("first");
const second = document.getElementById("second");
const third = document.getElementById("third");

const firstDragger = document.getElementById("first-dragger");
const secondDragger = document.getElementById("second-dragger");
const thirdDragger = document.getElementById("third-dragger");

first.style.width = "calc(100% / 3)";
second.style.width = "calc(100% / 3)";
third.style.width = "calc(100% / 3)";

firstPrize.innerHTML = Math.round(budgetValue / 3);
secondPrize.innerHTML = Math.round(budgetValue / 3);
thirdPrize.innerHTML = Math.round(budgetValue / 3);

firstDate.innerHTML = beginDate;
secondDate.innerHTML = daysToDate(1 / 3);
thirdDate.innerHTML = daysToDate(2 / 3);

let firstWidth = first.offsetWidth;
let secondWidth = second.offsetWidth;
let thirdWidth = third.offsetWidth;

let supportWidth = 0;

const minimum = 80;

let currentX = 0;

const dragger1 = (e) => {
  const difference = currentX - e.clientX;
  if (first.offsetWidth <= minimum && difference > 0) return;
  if (second.offsetWidth <= minimum && difference < 0) return;
  first.style.width = firstWidth - difference + "px";
  second.style.width = secondWidth + difference + "px";

  firstPrize.innerHTML = Math.round(
    (budgetValue * (firstWidth - difference)) / draggerWidth
  );
  secondPrize.innerHTML = Math.round(
    (budgetValue * (secondWidth + difference)) / draggerWidth
  );

  secondDate.innerHTML = daysToDate((firstWidth - difference) / draggerWidth);
};

const dragger2 = (e) => {
  const difference = currentX - e.clientX;
  if (second.offsetWidth <= minimum && difference > 0) return;
  if (third.offsetWidth <= minimum && difference < 0) return;
  second.style.width = secondWidth - difference + "px";
  third.style.width = thirdWidth + difference + "px";

  secondPrize.innerHTML = Math.round(
    (budgetValue * (secondWidth - difference)) / draggerWidth
  );
  thirdPrize.innerHTML = Math.round(
    (budgetValue * (thirdWidth + difference)) / draggerWidth
  );

  thirdDate.innerHTML = daysToDate(
    (supportWidth + secondWidth - difference) / draggerWidth
  );
};

// const dragger2 = (e) => {
//   const difference = currentX - e.clientX;
//   if (first.offsetWidth <= minimum && difference >= firstWidth - minimum) return;
//   if (third.offsetWidth <= minimum && difference <= minimum - thirdWidth) return;
//   console.log(difference);
//   if (difference < 0) {
//     second.style.width = (secondWidth - difference) + "px";
//     third.style.width = (thirdWidth + difference) + "px";
//   } else {
//     first.style.width = (firstWidth - difference) + "px";
//     second.style.width = (secondWidth + difference) + "px";
//   }
// }

const dragger3 = (e) => {
  const difference = currentX - e.clientX;
  if (second.offsetWidth <= minimum && difference > 0) return;
  if (third.offsetWidth <= minimum && difference < 0) return;
  second.style.width = secondWidth - difference + "px";
  third.style.width = thirdWidth + difference + "px";

  secondPrize.innerHTML = Math.round(
    (budgetValue * (secondWidth - difference)) / draggerWidth
  );
  thirdPrize.innerHTML = Math.round(
    (budgetValue * (thirdWidth + difference)) / draggerWidth
  );

  thirdDate.innerHTML = daysToDate(
    (supportWidth + secondWidth - difference) / draggerWidth
  );
};

const noop = () => {};

firstDragger.ondragstart = () => false;
secondDragger.ondragstart = () => false;
thirdDragger.ondragstart = () => false;

firstDragger.onmousedown = (e) => {
  currentX = e.clientX;
  firstWidth = first.offsetWidth;
  secondWidth = second.offsetWidth;
  this.onmousemove = dragger1;
};
firstDragger.onmouseup = () => (this.onmousemove = noop);
firstDragger.onmouseout = () => (this.onmousemove = noop);

secondDragger.onmousedown = (e) => {
  currentX = e.clientX;
  firstWidth = first.offsetWidth;
  secondWidth = second.offsetWidth;
  thirdWidth = third.offsetWidth;
  supportWidth = first.offsetWidth;
  this.onmousemove = dragger2;
};
secondDragger.onmouseup = () => (this.onmousemove = noop);
secondDragger.onmouseout = () => (this.onmousemove = noop);

thirdDragger.onmousedown = (e) => {
  currentX = e.clientX;
  secondWidth = second.offsetWidth;
  thirdWidth = third.offsetWidth;
  supportWidth = first.offsetWidth;
  this.onmousemove = dragger3;
};
thirdDragger.onmouseup = () => (this.onmousemove = noop);
thirdDragger.onmouseout = () => (this.onmousemove = noop);

const setAccess = () => {
  draggers.forEach((el) => {
    el.style.pointerEvents = "auto";
    el.style.cursor = "col-resize";
  });
};

const unsetAccess = () => {
  draggers.forEach((el) => {
    el.style.pointerEvents = "none";
    el.style.cursor = "not-allowed";
  });
};

const resetDates = () => {
  dateDifference = DateToDays();
  console.log(dateDifference);
  const firstWidth = first.offsetWidth;
  const secondWidth = second.offsetWidth;

  if (dateDifference <= 0) {
    beginError.innerHTML =
      "Начальная дата не может быть позже или равна конечной дате";
    endError.innerHTML =
      "Начальная дата не может быть позже или равна конечной дате";
    unsetAccess();
    return;
  }

  beginError.innerHTML = "";
  endError.innerHTML = "";
  setAccess();

  firstDate.innerHTML = beginDate;
  secondDate.innerHTML = daysToDate(firstWidth / draggerWidth);
  thirdDate.innerHTML = daysToDate((firstWidth + secondWidth) / draggerWidth);
};

const resetBudget = () => {
  console.log("yes");
  const firstWidth = first.offsetWidth;
  const secondWidth = second.offsetWidth;
  const thirdWidth = third.offsetWidth;

  if (budgetValue < 10000) {
    budgetError.innerHTML = "Бюджет не может быть меньше 10 000";
    unsetAccess();
    return;
  }

  budgetError.innerHTML = "";
  setAccess();

  firstPrize.innerHTML = Math.round((budgetValue * firstWidth) / draggerWidth);
  secondPrize.innerHTML = Math.round(
    (budgetValue * secondWidth) / draggerWidth
  );
  thirdPrize.innerHTML = Math.round((budgetValue * thirdWidth) / draggerWidth);
};

const beginF = (e) => {
  beginDate = e.target.value;
  resetDates();
};

const endF = (e) => {
  endDate = e.target.value;
  resetDates();
};

const budgetF = (e) => {
  budgetValue = e.target.value || 0;
  resetBudget();
};

begin.onchange = beginF;
end.onchange = endF;
budget.oninput = budgetF;
