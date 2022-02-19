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