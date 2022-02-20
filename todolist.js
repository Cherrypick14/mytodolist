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
   //Checking if our todo variable contains a list of items
   // if it doesn't, we get to create an empty array otherwise set out our to do with items passed as objects
   if(todo === null){
       todoArray = [];
   }else{
       todoArray = JSON.parse(todo);
   }
    todoArray.push(text.value)
    text.value = "";
    //we store the toDoArray on the localstorage on every made change,
      localStorage.setItem("todo", JSON.stringify(todoArray));
      displayToDo();
});
//displaying the toDoList changes

//to display it on the web page, we  use .innerHTML attr
//a variable called htmlCode is going to hold the HTML for the to-do-list
//we then loop through the toDoArray and add each item to the htmlCode variable
//once we are done, we get to passing the whole HTML code to listBox element using the .innerHTML attr
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
        <button onclick='edit(${ind})' class=' btnEdit flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-white text-grey'>Edit</button>
        <button onclick='deleteTodo(${ind})' class=' btnDelete flex-no-shrink p-2 ml-2 border-2 rounded text-white'>Delete</button>
     </div>`;
     });

     listBox.innerHTML = htmlCode;
}
//deleteing the items from the todolist

//the deleteTodo holds an onclick function that gets to delete the listed task and it has a parameter of index of the given list
//we are going to use the splice array method which helps get the specified index
    function deleteTodo(ind){
   let todo =localStorage.getItem("todo");
     todoArray = JSON.parse(todo);
     todoArray.splice(ind, 1)
     localStorage.setItem("todo", JSON.stringify(todoArray));
     displayToDo();
    }
//Update items from the todolist
  function edit(ind){
     saveInd.value = ind;
     let todo = localStorage.getItem("todo");
     todoArray = JSON.parse(todo);
     text.value = todoArray[ind];
     addTaskButton.style.display ="none";
     saveTaskButton.style.display = "block";
  }
  //saving our edited todo list
  saveTaskButton.addEventListener("click", ()=>{
      let todo =localStorage.getItem("todo");
      todoArray = JSON.parse(todo);
       let ind = saveInd.value;
       todoArray[ind] = text.value;
       addTaskButton.style.display ="block"
       saveTaskButton.style.display ="none"
       text.value ="";
       localStorage.setItem("todo", JSON.stringify(todoArray));

       displayToDo();
  });
