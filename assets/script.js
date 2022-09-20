//select area to display time data
var timeDisplayArea = document.querySelector("#currentDay");
//create object to store input information
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

//set date and time display to stay up to date
function displayTime(){
    setInterval(function(){
        var currentTime = moment().format("dddd, MMMM Do h:mmA");
        timeDisplayArea.textContent = currentTime;
    }, 1000);
}
displayTime();

//function to cycle through all form elements and set background color according to current time and text data from local storage
function setStart(){
    for (var i=0; i<9; i++) {
        //use i to access different form element with each loop
        var timeRow = document.body.children[1].children[i];
        //access the time corresponding to each form stored in the data attribute on each label
        var timeData = timeRow.children[0].dataset.time;
        //select corresponding textarea element
        var formTextArea = timeRow.children[1] 
        //access the current hour
        var currentHour = moment().format("H");

        //compare the time data stored on each form with the current hour to determine if it is in the past, present, or future
        if (timeData == currentHour) {
            formTextArea.classList.add("present");
        } else if (timeData > currentHour) {
            formTextArea.classList.add("future");
        } else  {
            formTextArea.classList.add("past")
        };

        //retrieve schedule data from local storage
        var storedSchedule = JSON.parse(localStorage.getItem("mySchedule"));
        if(storedSchedule !== null) {     
            //access the values stored in the storedSchedule object and assign to corresponding hour  
            var scheduleValues = Object.values(storedSchedule);
            formTextArea.textContent = scheduleValues[i];
        }
    }
}
setStart();

//select all button elements on the page and add event listener
var allButtons = $("button")
allButtons.on("click",  function(event){
    event.preventDefault();

    //update schedule object with data in localStorage
    if(JSON.parse(localStorage.getItem("mySchedule") !== null) ){
        schedule = JSON.parse(localStorage.getItem("mySchedule"));
    }

    //retreive form number from data attribute attached to target button
    var eventData = $(event.target).attr("data-FormNum");

    //select corresponding textarea by using the data attribute
    var textAreaEl = $("textarea[data-formNum='" + eventData +"'")

    //set the value of the key corresponding to data attribute in the schedule object to the value of the textarea
    schedule["hour" + eventData] = textAreaEl.val();
  
    //update local storage with updated schedule object
    localStorage.setItem("mySchedule", JSON.stringify(schedule));

})


≈