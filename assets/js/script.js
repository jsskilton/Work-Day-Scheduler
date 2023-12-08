$(document).ready(function () {
  // Function to create time blocks
  function createTimeBlocks() {
    var container = $(".container");
    var currentHour = dayjs().hour();

    for (var hour = 9; hour <= 17; hour++) {
      var timeBlock = $("<div>").addClass("row time-block");
      var hourCol = $("<div>")
        .addClass("col-md-1 hour")
        .text(dayjs().hour(hour).format("hA"));
      var eventCol = $("<textarea>")
        .addClass("col-md-10 description")
        .attr("data-hour", hour);

      // Check the current time and update the color of the time block
      if (hour < currentHour) {
        eventCol.addClass("past");
      } else if (hour === currentHour) {
        eventCol.addClass("present");
      } else {
        eventCol.addClass("future");
      }

      var saveBtn = $("<button>")
        .addClass("col-md-1 saveBtn")
        .html('<i class="fas fa-save"></i>');

      // Load events from local storage
      var savedEvent = localStorage.getItem("hour_" + hour);
      if (savedEvent) {
        eventCol.val(savedEvent);
      }

      timeBlock.append(hourCol, eventCol, saveBtn);
      container.append(timeBlock);
    }
  }

  // Display current day at the top
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // Create time blocks
  createTimeBlocks();

  // Function to show success message
  function showSuccessMessage() {
    var successMessage = $("<div>")
      .attr("id", "successMessage")
      .addClass("alert alert-success mt-3")
      .text("Event has been added to calendar!")
      .hide()
      .appendTo("header")
      .fadeIn()
      .delay(2000)
      .fadeOut();
  }

  // Function to show emtpy message
  function showEmptyMessage() {
    var emptyMessage = $("<div>")
      .attr("id", "emptyMessage")
      .addClass("alert alert-danger mt-3")
      .text("Please enter an event!")
      .hide()
      .appendTo("header")
      .fadeIn()
      .delay(1000)
      .fadeOut();
  }

  // Save button click event
  $(".saveBtn").on("click", function () {
    var hour = $(this).siblings(".description").attr("data-hour");
    var event = $(this).siblings(".description").val();
    if (event !== "") {
      localStorage.setItem("hour_" + hour, event);
      // Show the success message
      showSuccessMessage();
    }
    else
      // Show the empty message 
      showEmptyMessage();
  });

  // Clear all events button
  var clearAllBtn = $("<button>")
    .attr("id", "clearAllBtn")
    .addClass("btn btn-danger")
    .text("Clear All Events");

  // Append the button to the container
  $("header").append(clearAllBtn);

  // Clear all events button click event
  $("#clearAllBtn").on("click", function () {
    // Loop through each hour and remove the corresponding event from local storage
    for (var hour = 9; hour <= 17; hour++) {
      localStorage.removeItem("hour_" + hour);
    }

    // Clear the text in all textareas
    $(".description").val("");

  });
});

