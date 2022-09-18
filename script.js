var currentHour = moment().format("H");
var timeDisplayArea = document.querySelector("#currentDay");

var schedule = {
    hour9: "",
    hour10: "",
    hour11: "",
    hour12: "",
    hour13: "",
    hour14: "",
    hour15: "",
    hour16: "",
    hour17: ""
}

function displayTime(){
    setInterval(function(){
        var currentTime = moment().format("dddd, MMMM do h:mmA");
        timeDisplayArea.textContent = currentTime;
    }, 1000);
}
displayTime();

function hourColor(){
    for (var i=0; i<9; i++) {
        var timeRow = document.body.children[1].children[i];
        var timeData = timeRow.children[0].dataset.time;
        var formInput = timeRow.children[1] //.children[0];
        var storedSchedule = JSON.parse(localStorage.getItem("mySchedule"));


        if (timeData == currentHour) {
            formInput.classList.add("present");
        } else if (timeData > currentHour) {
            formInput.classList.add("future");
        } else  {
            formInput.classList.add("past")
        };

        if(storedSchedule !== null) {       
            var scheduleValues = Object.values(storedSchedule);
            // formInput.setAttribute("placeholder", scheduleValues[i]);
            formInput.textContent = scheduleValues[i];
        }


    }

}
hourColor();

var allButtons = $("button")
allButtons.on("click",  function(event){
    event.preventDefault();

    //retreive form number from data attribute attached to target button
    var eventData = $(event.target).attr("data-FormNum");

    //select corresponding textarea by using the data attribute
    var textAreaEl = $("textarea[data-formNum='" + eventData +"'")

    //set the value of the key corresponding to data attribute in the schedule object to the value of the textarea
    schedule["hour" + eventData] = textAreaEl.val();

    //update local storage with updated schedule object
    localStorage.setItem("mySchedule", JSON.stringify(schedule));

})


// var button9 = $("#button9");
// var input9 = $("#input9");
// button9.on("click", function(event) {
//     console.log(input9.val());
//     schedule.hour9 = input9.val();
//     localStorage.setItem("mySchedule", JSON.stringify(schedule) )
// })
