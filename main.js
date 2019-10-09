//Define UI Elements variables

const form  = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners();

//Load All Events
function loadEventListeners(){
    //Window Load Event
    document.addEventListener("DOMContentLoaded",getTasks);
    
    //Form Submit Event
    form.addEventListener("submit", addTask);
    
    //remove task event
    taskList.addEventListener("click", removeTask);
    
    //clear task event
    clearBtn.addEventListener("click",clearTasks);
    
    //Filter tasks event
    filter.addEventListener("keyup",filterTasks);
}

//Retrieve all tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem("tasks") === null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    
    tasks.forEach(function(task){
        //create li element
        const li=document.createElement("li");
        //add class name
        li.className = "collection-item";
        
        //add text in li
        li.appendChild(document.createTextNode(task));
        
        //create a link for deletion
        const link=document.createElement("a");
        
        //add attribute
        link.setAttribute("href", "#");
        
        //add class
        link.className = "delete-item secondary-content";
        
        //add innerhtml as 'x' button to delete it
        link.innerHTML = "<i class='fa fa-remove'></i>"
        
        //append link to li
        li.appendChild(link);
        
        //append li to ul(taskList)
        taskList.appendChild(li);
    });
}

//Add a new task
function addTask(e){
    if(taskInput.value === ''){
        alert("Please do insert any task!");
    }
    else{
        //We have to create a new li and insert in ul
        
        //create li element
        const li=document.createElement("li");
        //add class name
        li.className = "collection-item";
        
        //add text in li
        li.appendChild(document.createTextNode(taskInput.value));
        
        //create a link for deletion
        const link=document.createElement("a");
        
        //add attribute
        link.setAttribute("href", "");
        
        //add class
        link.className = "delete-item secondary-content";
        
        //add innerhtml as 'x' button to delete it
        link.innerHTML = "<i class='fa fa-remove'></i>"
        
        //append link to li
        li.appendChild(link);
        
        //append li to ul(taskList)
        taskList.appendChild(li);
        
        //Storage to LocalStorage
        storeTaskInLocalStorage(taskInput.value);
        
        //clear the taskInput
        taskInput.value="";
    }
    e.preventDefault();
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem("tasks")===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove an existing task
function removeTask(e){
    if((e.target.parentElement.classList.contains('delete-item')) || e.target.classList.contains('delete-item')){
        if(confirm("Are you sure you want to delete?")){
            let taskValue;
            if(e.target.parentElement.nodeName === 'LI'){
                taskValue=e.target.parentElement.textContent;
                e.target.parentElement.remove();
            }
            else{
                taskValue=e.target.parentElement.parentElement.textContent;
                e.target.parentElement.parentElement.remove();
            }
            removeTaskFromLocalStorage(taskValue);
        }
    }
}

function removeTaskFromLocalStorage(taskValue){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(function(task,index){
        if(taskValue===task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear all tasks
function clearTasks(){
    let tasks=[];
    //slower method
    //taskList.innerHTML ='';
    
    //Faster Method
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Filter Existing Task according to key
function filterTasks(e){
    const key= e.target.value.toLowerCase();
    
    document.querySelectorAll(".collection-item").forEach(function(task){
        const item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(key)==-1){
            task.style.display='none';
        }
        else{
            task.style.display = 'block';
        }
    });
}