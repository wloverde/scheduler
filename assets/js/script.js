// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var timeList = $("#timeCard");
var currentDay = $('#currentDay');
var inputData = [
]; //an array of objects that display the hour ID as key and Input data as value

// hour is logged to compare tabs as past/present/future 
// value can be replaced with interger for testing
var currentHour = dayjs().format("H");
// var currentHour= 12; // --- TEST VARIABLE ---
console.log(currentHour);

//displays current date and time within Header
currentDay.text(dayjs().format("MMM D, h [:] mm"))

// checks if each hour is past, present, future within for loop
function timeIntervals() {
  timeSlots = 8; //8 hour work day
  for (var i = 0; i < timeSlots; i++) {
    console.log("currentHour: " + currentHour + "\nHour Checked: " + (i + 9));
    if (currentHour < (i + 9)) { // since hours in HTML start at 9am checking hour with i+9 for first hour
      timeList.children('#hour-' + (i + 9)).addClass('future');
    } else if (currentHour == (i + 9)) {
      timeList.children('#hour-' + (i + 9)).addClass('present');
    } else {
      timeList.children('#hour-' + (i + 9)).addClass('past');
    }
  }
}

// saves and loads local storage for inputs
function saveLocal(event) {
  // prevent button submition to refresh page
  event.preventDefault();
  console.log(input);
  var input = $('#input-9').trigger('submit');

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

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});

timeIntervals();
//whenever a button is clicked, save textarea locally
$(":button").on("click", saveLocal);