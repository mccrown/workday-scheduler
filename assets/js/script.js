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