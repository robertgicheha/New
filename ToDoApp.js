let form = document.getElementById("form-1")
let textJaza = document.getElementById("textJaza");
let dateJaza = document.getElementById("dateJaza");
let textarea = document.getElementById("descriptionArea");
let text = document.getElementById("text");
let tasks = document.getElementById("tasks");
let tasks2 = document.getElementById("tasks2");
let add = document.getElementById("add");


   let todoTusk = [];
  
  const addData = () => {
    todoData.push({
      text: textJaza.value,
      description: textarea.value,
      date: dateJaza.value,
    });
  
    localStorage.setItem("todoData", JSON.stringify(todoData));
    createTasks();
  };
  
  
  const resetForm = () => {
    textJaza.value = "";
    textarea.value = "";
    dateJaza.value = "";
  };
  
  
  let createTasks = () => {
     tasks1.innerHTML = "";
    todoData.forEach((x, y) => {
      return (tasks1.innerHTML += `
        <li  id=${y} class='task-list'>
        <span class="btn-options">
        <button onClick= "editTask(this)" class = "btn-update" data-target="fill-1">UPDATE</button>
        <button onClick ="deleteTask(this);createTasks()" class="btn-delete">REMOVE</button>
      </span>
         
          <span class="title-text">${x.text}</span>
          <br />
          <p>${x.description}</p>
          <br />
          <span class="date-text">Date is:${x.date}</span><br />
          <button  class="btn-done" onClick="changeListener(this)" >OK</button><br />
         
        </li>
      `);
    });
      resetForm();
  };
  
  (() => {
    todoData = JSON.parse(localStorage.getItem("todoData")) || [];
    createTasks();
  })();
  
  const deleteTask = (e) => {
    e.parentElement.parentElement.remove();
    todoData.splice(e.parentElement.parentElement.id, 1);
  
    localStorage.setItem("todoData", JSON.stringify(todoData));
  };
  
  const editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
    console.log(selectedTask)
  
    textJaza.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[3].innerHTML;
    dateJaza.value = selectedTask.children[4].innerHTML;
  
    deleteTask(e);
  };


form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });
  
  let Check = document.querySelectorAll(".button");
  
  let completedData = [];
  
  const changeListener = (e) => { 
    let completedDat = todoData.splice(e.parentElement.id, 1);
    localStorage.setItem("todoData", JSON.stringify(todoData));
    completedData.push(...completedDat)
    localStorage.setItem("completedData", JSON.stringify(completedData))
    
    completedTask()
    createTasks()
  }
  
  const deleteCompletedTask = (e) => {
    e.parentElement.parentElement.remove();
    completedData.splice(e.parentElement.parentElement.id, 1);
  
    localStorage.setItem("completedData", JSON.stringify(completedData));
  };
  
  const completedTask = () => {  
    console.log(completedData)
    tasks2.innerHTML = "";
    completedData.forEach((x, y) => {
      const dueDate = new Date(x.date);
      let today = new Date();
      let difference = dueDate.getTime() - today.getTime();
      let diffInDays = Math.ceil(difference /(1000*60*60*24));
    
      checkdueDateDIfference =() =>{
        if(diffInDays > 0){
          return `Bravo, you  are before time by ${diffInDays} days `
        }
        else if(diffInDays < 0){
          console.log(diffInDays);
          return ` Overdue by ${diffInDays * (-1) } days `
  
        }
        else{
          return `<span>You are on time</span>`
        }
      }
      return (tasks2.innerHTML += `
      <li  id=${y} class='task-list'>
      <span class="warning-dueDate">${checkdueDateDIfference()}</span>
      <span class="title-text">${x.text}</span>
      <p>${x.description}</p>
      <span class="date-text">Date is:${x.date}</span>
      <span class="btn-options">
        <button onClick ="deleteCompletedTask(this);createTasks()" class="btn-delete"> REMOVE</button>
      </span>
    </li>
      `);
    });
     resetForm();
  };
  
  
  (() => {
    completedData = JSON.parse(localStorage.getItem("completedData")) || [];
    completedTask();
  })();

  let formValidation = () => {
    if (textJaza.value === "") {
      console.log("failure");
      text.innerHTML = "Add task";
    } else {
      console.log("success");
      text.innerHTML = "";
      addData();
      add.setAttribute("");
      add.click();
  
      (() => {
        add.setAttribute("");
      })();
    }
  };