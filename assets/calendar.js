/*
 * Student Name: Arif Ozturk
 * Student ID: 041086524
 * Course: CST8209 - Web Programming I
 * Semester: Spring 2023
 * Assignment: Calender Event 4
 * Date Submitted:   August 10, 2023
 */


// declare an object Calendar
function Calendar(elem) {

  // HTML element in which to display the calendar
  this.elem = elem;

  // array containing list of names of the days of the week 
  this.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  /** Returns the month name of the year for a given month index.
   * @param monthIndex {number} zero-based index of the month of the year (0 = January, 11 = December)
   * @returns {string} the name of the given month
   */
  this.getMonth = function (monthIndex) {

    // replace this with your solution from Assignment 1!
    switch (monthIndex) {
      case 0:
        return 'January';
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "Octomber";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "unknown";

    }

  }

  /** Returns the number of days in the month for a given zero-based month index and year.
   * @param monthIndex {number} zero-based index of the month of the year (0 = January, 11 = December)
   * @param year {number} a 4-digit year
   * @returns {number} the number of days in the given month and year
   */
  this.getDaysInMonth = function (monthIndex, year) {

    // replace this with your solution from Assignment 1!
    switch (monthIndex) {
      case 0:
        return 31;
      case 1:
        if ((year % 400 == 0) || ((year % 4 == 0) && (year % 100 != 0))) {
          return 29;
        } else {
          return 28;
        };
      case 2:
        return 31;
      case 3:
        return 30;
      case 4:
        return 31;
      case 5:
        return 30;
      case 6:
        return 31;
      case 7:
        return 31;
      case 8:
        return 30;
      case 9:
        return 31;
      case 10:
        return 30;
      case 11:
        return 31;
      default:
        return -1;

    }

  }

  // method display generates calendar HTML
  // the displayDate parameter indicates the year and month to render (display) 
  this.display = function (displayDate = new Date()) {

    // clear the calendar element
    this.elem.innerHTML = "";

    // get the number of days in the month
    let daysInMonth = this.getDaysInMonth(displayDate.getMonth(), displayDate.getFullYear());

    // get array of days to display
    let days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(displayDate.getFullYear(), displayDate.getMonth(), i));
    }

    // create a variable called "calender" for access the HTML body
    // create a table element under the body section then create a thead element under the table element


    var table = $("<table>");
    $('#calendar').append(table);

    var thead = $("<thead>");
    $(table).append(thead);

    // a row containing the previous month button, month name and year, and next month button 
    // the previous and next month buttons call the cal.display() method when clicked
    // with parameters of year displayed, but previous or next month
    // dates will "carry forward", increasing or decreasing the year automatically

    var calHeadTR = $("<tr>");
    $(thead).append(calHeadTR);



    var previous = $("<td>");
    var previousButton = $("<button>");
    $(calHeadTR).append(previous);
    $(previous).append(previousButton);
    $(previousButton).text("<<");
    $(previousButton).on("click", function () {
      cal.display(new Date(displayDate.getFullYear(), (displayDate.getMonth() - 1)));
    });

    var currDate = $("<td>");
    var h1 = $("<h1>");
    $(calHeadTR).append(currDate);
    $(currDate).attr("colspan", "5");
    $(currDate).append(h1);
    $(h1).text(this.getMonth(displayDate.getMonth()) + " " + displayDate.getFullYear());

    var next = $("<td>");
    var nextButton = $("<button>");
    $(calHeadTR).append(next);
    $(next).append(nextButton);
    $(nextButton).text(">>");
    $(nextButton).on("click", function () {
      cal.display(new Date(displayDate.getFullYear(), (displayDate.getMonth() + 1)));
    });


    // row of weekday name headers
    // loop through the array, creating a table header cell for each element in the array 

    // Created a "tr" element for name of weekdays
    var weekdays = $("<tr>");
    $(thead).append(weekdays);


    for (const elem of this.dayNames) {

      var weekdaysTh = $("<th>");
      $(weekdays).append(weekdaysTh);
      $(weekdaysTh).text(elem);

    }

    // end the table head section, and start the table body section 

    // Created "tbody" element for calender body

    var calTBody = $("<tbody>");
    $(table).append(calTBody);


    // calendar table body rows (days of the month)
    // start with blank cells until 1st of month
    // created two "tr" element for month days

    var calTableBodyRow1 = $("<tr>");
    $(calTBody).append(calTableBodyRow1);

    var calTableBodyRow2 = $("<tr>");
    $(calTBody).append(calTableBodyRow2);

    // loop from 0 until the first day of the month (Sunday, until the day of the week of the first day of the month)
    // create an empty table cell for each blank day 
    for (let i = 0; i < days[0].getDay(); i++) {

      var newCell = $("<td>");
      $(calTableBodyRow2).append(newCell);

    }

    // for each day within the month, create a table cell containing the date 
    for (let i = 0; i < days.length; i++) {
      // if this day is a Sunday, end the previous week table row, and start a new row 
      if (days[i].getDay() == 0) {

        var calTableBodyRow2 = $("<tr>");
        $(calTBody).append(calTableBodyRow2);
      }

      // create a table cell with the CSS class "day", and the text value of the day of the month 

      var calCell = $("<td>");
      $(calTableBodyRow2).append(calCell);
      $(calCell).addClass("day");
      $(calCell).text(days[i].getDate());

    }
    // last week of month empty cells to fill the week 
    // create an empty table cell for each blank day 
    for (let i = days.at(-1).getDay() + 1; i < 7; i++) {

      var calTableBodyTD2 = $("<td>");
      $(calTableBodyRow2).append(calTableBodyTD2);

    }

    // end the table body section and calendar table 

  }
}

// declare a instance of Calendar
const cal = new Calendar(document.getElementById("calendar"));

// call the display() method
cal.display();