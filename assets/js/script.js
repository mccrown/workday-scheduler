// date at top of page
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do"));

// tasks objects for localStorage
var tasks = {
    "9": [],
    "10": [],
    "11": [],
    "12": [],
    "13": [],
    "14": [],
    "15": [],
    "16": [],
    "17": []
};

// save tasks to storage
 var saveTasks = function() {
     localStorage.setItem("tasks", JSON.stringify(tasks));
 }

 // get tasks from storage
 var getTasks = function() {
     
    var loadedTasks = JSON.parse(localStorage.getItem("tasks"));
     if(loadedTasks) {
         tasks = loadedTasks

         // for each key/value pair in tasks create a task
         $.each(tasks, function(hour,task){
             var hourDiv = $("#" + hour);
             createTask(task, hourDiv);
         })
     }

     // check if past/current/future
     auditTasks()
 }

 // create task in corresponding hour row
 var createTask = function(taskText, hourDiv) {

    var taskDiv = hourDiv.find(".task");
    var taskP = $("<p>")
        .addClass("description")
        .text(taskText)
        taskDiv.html(taskP);
 }

 // update background based on time of day
 var auditTasks = function() {

    var currentHour = moment().hour();
    $(".task-info").each(function(){
        var elementHour = parseInt($(this).attr("id"));

        // past, present and future check
        if (elementHour < currentHour) {
            $(this).removeClass(["present", "future"]).addClass("past");
        }
        else if (elementHour === currentHour) {
            $(this).removeClass(["past", "future"]).addClass("present");
        }
        else {
            $(this).removeClass(["past", "present"]).addClass("future");
        }
    })

 };

 // replace textarea with a p element and persists in localStorage
 var replaceTextarea = function(textareaElement) {
    var taskInfo = textareaElement.closest(".task-info");
    var textArea = taskInfo.find("textarea");

    // get time and task
    var time = taskInfo.attr("id");
    var text = textArea.val().trim();

   // persist the data
   tasks[time] = [text];
   saveTasks();

   //replace textArea element with a p element
   createTask(text, taskInfo);
}

// click handlers

// tasks
$(".task").click(function() {

   // save the other tasks if they've already been clicked
   $("textarea").each(function() {
       replaceTextarea($(this));
   })

   //convert to a textarea element if the time hasn't passed
   var time = $(this).closest(".task-info").attr("id");
   if (parseInt(time) >= moment().hour()) {

       //create a textInput element that includes the current task
       var text = $(this).text();
       var textInput = $("<textarea>")
       .addClass("form-control")
       .val(text);

       // add the textInput element to the parent div
       $(this).html(textInput);
       textInput.trigger("focus");
   }
})

// save button click handler
$(".saveBtn").click(function() {
    replaceTextarea($(this));
})