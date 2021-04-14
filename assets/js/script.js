var taskIdCounter = 0;


var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");


//array for saving tasks
var tasks = [];




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

  var isEdit = formEl.hasAttribute("data-task-id");
  // console.log(isEdit);

  //has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
  //package data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput,
    status: "to do"
  };
  createTaskEl(taskDataObj);
}
};




var completeEditTask = function(taskName, taskType, taskId){
  //find the matching task list item
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  //set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  //loop through tasks array and task object with new content
  for(var i = 0; i < tasks.length; i++){
    if(tasks[i].id === parseInt(tasksId)){
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  };

  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";

  //save to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

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

  taskDataObj.id = taskIdCounter;
  //.push adds any content in the parenthesis to the end of the specified array
  //in this case taskDataObj will get added to the end of the tasks array
  tasks.push(taskDataObj);

  //add entire list item to list
  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);

  //increase counter for each unique task id
  taskIdCounter++;

  //save to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  //ensure that the the new property gets to the function via taskDataObj 
  // console.log(taskDataObj);
  // console.log(taskDataObj.status);
};







var createTaskActions = function(taskId){
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Completed"];
  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
  
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
};






var deleteTask = function(taskId){
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();

  //create new array to hold updated list of tasks
  var updatedTaskArr = [];
  //loop through current tasks
  for(var i = 0; i < tasks.length; i++){
    //if tasks[i].id does not match the value of taskId, let's keep that and push it to the new array
    if(tasks[i].id !== parseInt(taskId)){
      updatedTaskArr.push(tasks[i]);
    }
  }

  //reassign tasks array to be the same as updatedTaskArr
  tasks=updatedTaskArr;

  //save to localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
};






var editTask = function(taskId){
  // console.log("editing task #" + taskId);

  //get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  //get content from task name 
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  // console.log(taskName);
  //get content from task type
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  // console.log(taskType);

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";
  
  formEl.setAttribute("data-task-id", taskId);
};




var taskButtonHandler = function(event){
  //get target element from event
  var targetEl = event.target

  //edit button was clicked
  if(targetEl.matches(".edit-btn")){
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  //delete button was clicked
  else if(targetEl.matches(".delete-btn")){
    // console.log("you clicked a delete button!");
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};





var taskStatusChangeHandler = function(event){
  // console.log(event.target);

  //get the task item's id
  var taskId = event.target.getAttribute("data-task-id");
  //get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();
  //find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");


  //tasksToDoEl, tasksInProgressEl, and tasksCompletedEl are references to the ul elements, thus if the user selects one of them it will appened them to the ul id
  //this is a reference to the exisiting DOM element
  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  }
  else if (statusValue === "in progress"){
    tasksInProgressEl.appendChild(taskSelected);
  }
  else if (statusValue === "completed"){
    tasksCompletedEl.appendChild(taskSelected);
  }

  //update task's in tasks array
  for(var i = 0; i < tasks.length; i++){
    if(tasks[i].id === parseInt(taskId)){
      tasks[i].status = statusValue;
    }
    // console.log(tasks);
  }

  //save to localstorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
};





//save tasks to localStorage function
var saveTasks = function(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}




//get tasks from localStorage function
var loadTasks = function(){
  var savedTasks = localStorage.getItem("tasks");

  if(!savedTasks){
    tasks =[];
    return false;
  }
  console.log("Save tasks found!");

  //parse into an array of objects
  savedTasks = JSON.parse(savedTasks);

  //loop through the savedTasks array
  for(i = 0; i < savedTasks.length; i++){
    //pass each task object into the createTaskEl function
    createTaskEl(savedTasks[i]);
  }
  // console.log(loadTasks);
}




//create a new task function
formEl.addEventListener("submit", taskFormHandler);
//for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);
//changing task status
pageContentEl.addEventListener("change", taskStatusChangeHandler);

//load tasks function call
loadTasks();