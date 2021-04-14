
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");


var createTaskHandler = function(event) {
  
  event.preventDefault();
  //create a new task item
  var listItemEl = document.createElement("li");
  //style the new task
  listItemEl.className = "task-item";
  //add the text
  listItemEl.textContent = "This is a new task.";
  //append this element to the task list
  tasksToDoEl.appendChild(listItemEl);

  console.log(event);
 
};

formEl.addEventListener("submit", createTaskHandler);