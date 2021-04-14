var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");




var taskFormHandler = function(event) {
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name = 'task-type']").value;

  //check if input values are empty strings
  //check to see if taskName/TypeInput is empty by asking if it's a falsy value
  if(!taskNameInput || !taskTypeInput){
    alert("You need to fill out the task form!");
    return false;
  }
  
  formEl.reset();
  
  //package data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  //send it as an argument to createTaskel
  createTaskEl(taskDataObj);
  
 
};








var createTaskEl = function(taskDataObj){
  //create a new task item
  var listItemEl = document.createElement("li");
  //style the new task
  listItemEl.className = "task-item";

  //add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  //create a div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  //give it a class name
  taskInfoEl.className = "task-info";
  //add HTML content to div
  taskInfoEl.innerHTML = "<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";

  listItemEl.appendChild(taskInfoEl);
  //add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  // console.log(taskActionsEl);
  listItemEl.appendChild(taskActionsEl);

 

  //increase task counter by one to keep each id unique
  taskIdCounter++;

}








var createTaskActions = function(taskId){
  var actionContainerEl = docuement.createElement("div");
  actionContainerEl.className = "task-actions";

  //create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className ="btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className ="btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);

  //create the dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++){
    //create an option element
    var statusOptionsEl = docuement.createElement("option");
    statusOptionsEl.setAttribute("value", statusChoices[i]);
    statusOptionsEl.textContent = statusChoices[i];
    //appened to select
    statusSelectEl.appendChild(statusOptionsEl);

    }

  return actionContainerEl;


};


formEl.addEventListener("submit", taskFormHandler);