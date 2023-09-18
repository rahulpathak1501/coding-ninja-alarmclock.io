function updateClock() {
  const now = new Date();
  // console.log(now);
  const hours = now.getHours() % 12;
  // console.log(hours);
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourRotation = ((hours + minutes / 60) * 360) / 12;
  const minuteRotation = ((minutes + seconds / 60) * 360) / 60;
  const secondRotation = (seconds * 360) / 60;
  //console.log(secondRotation);

  const hourHand = document.querySelector(".hour-hand");
  const minuteHand = document.querySelector(".minute-hand");
  const secondHand = document.querySelector(".second-hand");

  hourHand.style.transform = `rotate(${hourRotation}deg)`;
  minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
  secondHand.style.transform = `rotate(${secondRotation}deg)`;
}

setInterval(updateClock, 1000);
updateClock();

//console.log(currentTime);

const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const ampm = document.getElementById("ampm");

// const time = document.getElementById("time-input");
const submit = document.getElementById("submit");
const showalarm = document.getElementById("alarm-time");
const alarms = [];
const alarmArray = [];

submit.addEventListener("click", function (e) {
  e.preventDefault();
  const hourValue12 = hour.value;
  let minuteValue12 = minute.value;
  let secondValue12 = second.value;
  let selectedAmPm = ampm.value;
  let hourValue24 = parseInt(hourValue12, 10);
  let time = "";

  if (
    selectedAmPm === "PM" &&
    hourValue12 !== "12" &&
    hourValue12 !== "" &&
    minuteValue12 !== "" &&
    secondValue12 !== ""
  ) {
    hourValue24 += 12;
    hourValue24 = hourValue24.toString().padStart(2, "0");
    minuteValue12 = minuteValue12.toString().padStart(2, "0");
    secondValue12 = secondValue12.toString().padStart(2, "0");
    time = `${hourValue24}:${minuteValue12}:${secondValue12}`;
  } else if (
    selectedAmPm === "AM" &&
    hourValue12 === "12" &&
    hourValue12 !== "" &&
    minuteValue12 !== "" &&
    secondValue12 !== ""
  ) {
    hourValue24 = 0;
    hourValue24 = hourValue24.toString().padStart(2, "0");
    minuteValue12 = minuteValue12.toString().padStart(2, "0");
    secondValue12 = secondValue12.toString().padStart(2, "0");
    time = `${hourValue24}:${minuteValue12}:${secondValue12}`;
  } else if (
    selectedAmPm === "AM" &&
    hourValue12 !== "" &&
    minuteValue12 !== "" &&
    secondValue12 !== ""
  ) {
    hourValue24 = hourValue24;
    hourValue24 = hourValue24.toString().padStart(2, "0");
    minuteValue12 = minuteValue12.toString().padStart(2, "0");
    secondValue12 = secondValue12.toString().padStart(2, "0");
    time = `${hourValue24}:${minuteValue12}:${secondValue12}`;
  } else {
    time = "";
  }

  const inputFieldValue = time;

  if (inputFieldValue == "") {
    alert("please select a right time");
  } else {
    const alarm = {
      time: inputFieldValue,
      id: Date.now(),
    };

    alarms.push(alarm);
    createAlarm(alarm);

    // time.value = "";
  }

  /* alarm count */

  //   alarms.forEach(function (alarm) {
  //     const [alarmHours, alarmMinutes] = alarm.time.split(":");
  //     alarmTime = alarmHours + ":" + alarmMinutes;
  //     alarmArray.push(alarmTime);
  //   });

  alarmInterval = setInterval(function () {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const currentTime = hours + ":" + minutes + ":" + seconds;
    //console.log(alarmArray[0]);

    const matchingTime = alarmArray.find(
      (timestamp) => timestamp === currentTime
    );

    const index = alarmArray.findIndex(
      (timestamp) => timestamp === currentTime
    );

    //console.log(index);
    if (matchingTime !== undefined && inputFieldValue != "") {
      //   console.log(alarmArray);
      clearInterval(alarmInterval);
      alert("wake up");
      alarmArray.splice(index, 1);
    }
  }, 1000);
});

function createAlarm(e) {
  const alarmElement = document.createElement("div");
  alarmElement.className = "alarm";
  alarmElement.innerHTML = `
        <span>Your alarm is set for: ${e.time}</span>
        <button id="cancelAlarm-${e.id}">Delete</button>
    `;

  showalarm.appendChild(alarmElement);

  alarmArray.push(e.time);

  // Add event listener to remove the alarm
  const cancelButton = document.getElementById(`cancelAlarm-${e.id}`);
  cancelButton.addEventListener("click", function () {
    cancelAlarm(e.id);
  });
}

function cancelAlarm(id) {
  const index = alarms.findIndex((alarm) => alarm.id === id);
  //console.log(alarms.map((alarm) => alarm.time));
  //   console.log(firstAlarmTime);
  if (index !== -1) {
    const removedElememnt = alarms.splice(index, 1, []);
    const removedTime = removedElememnt[0].time;

    const indexAlarm = alarmArray.indexOf(removedTime);

    //console.log("1st "+alarmArray);
    alarmArray.splice(indexAlarm, 1);
    //console.log("2nd "+alarmArray);

    const alarmElement = document.querySelector(
      `#cancelAlarm-${id}`
    ).parentElement;
    alarmElement.remove();
    clearInterval(alarmInterval);
  }
}
