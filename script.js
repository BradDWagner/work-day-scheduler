var currentTime = moment().format("dddd, MMMM do h:mmA");
var currentHour = moment().format("H");
console.log("current hour is " + currentHour);
var timeDisplayArea = document.querySelector("#currentDay");

function displayTime(){
    setInterval(function(){
        timeDisplayArea.textContent = currentTime;
    }, 1000);
}
displayTime();

function hourColor(){
    for (var i=0; i<9; i++) {
        var timeRow = document.body.children[1].children[i];
        var timeData = timeRow.children[0].dataset.time;
        var formBlock = timeRow.children[1].children[0];
    

        if (timeData == currentHour) {
            formBlock.classList.add("present");
        } else if (timeData > currentHour) {
            formBlock.classList.add("future");
            console.log(timeData);
            console.log(timeData +">"+ currentHour);
        } else  {
            formBlock.classList.add("past")
        };
    }

}
hourColor();