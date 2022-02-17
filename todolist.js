const text= document.getElementById("text");
const addTaskButton = document.getElementById("add-task-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

//we need to store all out todo tasks in an array
let todoArray =[];

//add items to the to-do-list
addTaskButton.addEventListener("click", (e)=>{
   e.preventDefault();
   //fetch items from the local storage and store them in a todo var
   let todo= localStorage.getItem("todo");
   //to add a task, you push it to the todoArray
   if(todo === null){
       todoArray = [];
   }else{
       todoArray = JSON.parse(todo);
   }
    todoArray.push(text.value)
    text.value = "";
    //we store the toDoArray on the localstorage on every change,
      localStorage.setItem("todo", JSON.stringify(todoArray));
      displayToDo();
});
//displaying the toDoList changes
//to display it on the web page, we  use .innerHTML attr
//a variable called htmlCode is going to hold the HTML for the to-do-list
//we then loop through the toDoArray and add each item to the htmlCode variable
//once we are done, we get to assing the whole HTML code to listBox element using the .innerHTML attr
//after we are done pushing the whole items to the array, we get tot call the displayToDo()func which handles as below;
function displayToDo(){
     let todo = localStorage.getItem("todo");
     if(todo === null){
          todoArray = [];
     }else{
          todoArray = JSON.parse(todo);
     }
     let htmlCode = "";
     todoArray.forEach((list, ind)=>{
        htmlCode+= `<div class='flex mb-4 items-center'>
        <p class=' mypar w-full text-grey-darkest'>${list}</p>
        <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey bg-green-600'>Edit</button>
        <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 border-2 rounded text-white bg-red-500'>Delete</button>
     </div>`;
     });

     listBox.innerHTML = htmlCode;
}