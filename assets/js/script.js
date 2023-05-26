// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var timeList = $("#timeCard");
var currentDay = $('#currentDay');


// value can be replaced with interger for testing
var currentHour = dayjs().format("H");
// var currentHour= 12; // --- TEST VARIABLE ---

//displays current date and time within Header
currentDay.text(dayjs().format("MMM D, h [:] mm"))

// checks if each hour is past, present, future within for loop
function timeIntervals() {
  timeSlots = 9; //8 hour work day has 9 1 hour time slots
  for (var i = 9; i < timeSlots+9 ; i++) { // start at 9am checking hour with i representing the hour
    console.log("currentHour: " + currentHour + "\nHour Checked: " + (i));
    if (currentHour < i) { 
      // add past, present, future class based of current time and pull local storage
      timeList.children('#hour-' + i).addClass('future');
      getLocal(i);
    } else if (currentHour == i) {
      timeList.children('#hour-' + i).addClass('present');
      getLocal(i);
    } else {
      timeList.children('#hour-' + i).addClass('past');
      getLocal(i);
    }
  }
}

// saves and loads local storage for inputs
function saveLocal(event) {
  // prevent button submition to refresh page
  event.preventDefault();
  // 'this' is relation to the button press element, and spliting the ID for <div> by '-' to aquire the hour num
  var idHour = this.parentElement.id.split('-')[1];
  // append number to back of 'input' id created in <textarea>
  var inputStr = '#input-' + idHour;
  // pull value from newly created string to match HTML ID in textarea elements
  var hourInput = $(inputStr).val();
  // save to local storage
  console.log(idHour,hourInput);
  localStorage.setItem(idHour, hourInput);
}

//load local storage by the hour
function getLocal(hour){
  //pull value from local storage by hour
  var hourValue=localStorage.getItem(hour);
  var inputStr = "#input-" + hour;
  $(inputStr).append(hourValue);

}

timeIntervals();
//whenever a button is clicked, save textarea locally
$(":button").on("click", saveLocal);