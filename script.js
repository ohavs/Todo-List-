const input=document.getElementById("input");
const addButton=document.getElementById("addTodoBtn");
const ul=document.getElementById("ul");
const userNameButton=document.getElementById("userNameBtn");
const updateUserBtn=document.getElementById("updateUserBtn");
const h1=document.getElementById("h1");
const h3=document.getElementById("h3");
const body=document.getElementById("body");
const userNameDiv=document.querySelector(".userName");
const userNameInput=document.getElementById("userNameInput");
const updateUserInput=document.getElementById("updateUserNameInput");
const search=document.getElementById("search");
const select=document.getElementById("select");
const avatar=document.getElementById("avatar");
const endDate=document.getElementById("endDate");
const endTime=document.getElementById("endTime");
const welcomeDiv=document.querySelector(".welcome");

loadFromLocalStorage();
loadUserName();
addButton.addEventListener("click",createTodo);



// disable past dates
endDate.min = new Date().toISOString().split("T")[0];


// load user name from local storage
function loadUserName(){
    let user;
    let avatars;
    const changeNameBtn=document.createElement("button");
    if(localStorage.getItem("user")===null && localStorage.getItem("avatar")===null){
        user=[];
        avatars=[];
        userNameButton.addEventListener("click",function(event){
            event.preventDefault();
            const userName=userNameInput.value;
            invalidInput(userNameInput);
            if(userName){
            event.preventDefault();
            changeNameBtn.classList.add("changeNameBtn");
            changeNameBtn.innerText="Change name";
            welcomeDiv.appendChild(changeNameBtn);
            changeUserName(changeNameBtn);
            const upperCaseLetter=userName.charAt(0).toUpperCase();
            const userNameUpperCase=upperCaseLetter+userName.slice(1);
            h1.innerText=`${userNameUpperCase}'s To Do List`;
            h3.innerText=`welcome, ${userNameUpperCase}.`;
            userNameInput.classList.add("hidden");
            select.classList.add("hidden");
            if(select.value==="Male"){
                avatar.src="img/male.svg"
            }
            if(select.value==="Female"){
                avatar.src="img/female.svg"
            }
            if(select.value==="x"){
                avatar.src="img/x.svg"
            }
            if(select.value==="Select Gender")
            {
                avatar.src="img/x.svg"
            }
            saveUserName(userNameUpperCase,avatar.src)
            }
           
        })
       
    }   
    else{
    
        changeNameBtn.classList.add("changeNameBtn");
        changeNameBtn.innerText="Change name";
        welcomeDiv.appendChild(changeNameBtn);
        changeUserName(changeNameBtn);
        const userName=document.getElementById("userNameInput").value;
        user=JSON.parse(localStorage.getItem("user"));
        svg=JSON.parse(localStorage.getItem("avatar"));
        avatar.src=`img/${svg}.svg`;
        const upperCaseLetter=userName.charAt(0).toUpperCase();
        const userNameUpperCase=upperCaseLetter+userName.slice(1);
        h1.innerText=`${user}'s To Do List`;
        h3.innerText=`welcome, ${user}.`;
        userNameInput.classList.add("hidden");
        select.classList.add("hidden");
    
    }
}

// change user name
function changeUserName(changeNameBtn){
    changeNameBtn.addEventListener("click",function(event){
        event.preventDefault();
        userNameInput.classList.add("hidden");
        updateUserInput.classList.toggle("hidden");
        select.classList.toggle("hidden");
        userNameButton.addEventListener("click",function(event){
            event.preventDefault();
            if(updateUserInput.value===""){
                select.classList.remove("hidden");
            updateUserInput.classList.add("invalidInput");
            updateUserInput.style.borderColor="#FE5139";
            setTimeout(() => {updateUserInput.classList.remove("invalidInput")}, 800);
            }
            else{
                event.preventDefault();
                updateUserInput.classList.remove("invalidInput");
                updateUserInput.style.borderColor="black";
                updateUserInput.classList.add("hidden");
                select.classList.add("hidden");
                const upperCaseLetter=updateUserInput.value.charAt(0).toUpperCase();
                const userNameUpperCase=upperCaseLetter+updateUserInput.value.slice(1);
                h1.innerText=`${userNameUpperCase}'s To Do List`;
                h3.innerText=`welcome, ${userNameUpperCase}.`;
                if(select.value==="Male"){
                    avatar.src="img/male.svg"
                }
                if(select.value==="Female"){
                    avatar.src="img/female.svg"
                }
                if(select.value==="x"){
                    avatar.src="img/x.svg"
                }
                if(select.value==="Select Gender")
                {
                    avatar.src="img/x.svg"
                }
                updateUserName(userNameUpperCase,avatar.src)
                window.location.reload()
                // updateUserInput.value="";
            }
        })
       
    })
    
}



// create a new todo
function createTodo(event){
    event.preventDefault();
    const todo=input.value;
    if(todo===""){
          invalidInput(input)
    }
    if(endDate.value===""){
        invalidInput(endDate)
            
    }
    if(endTime.value===""){
        invalidInput(endTime)
        
    }
    else if(todo && endDate.value && endTime.value){
        let li=document.createElement("li");
        li.innerText=todo;
        const newDate=new Date();
        const time=newDate.getHours()+":"+newDate.getMinutes();
        const dateTime=newDate.getDate()+"/"+(newDate.getMonth()+1)+"/"+newDate.getFullYear()+" "+time;
        const date=document.createElement("span");
        date.value=dateTime;
        date.innerText=dateTime;
        const endTodo=document.createElement("span");
        endTodo.innerText= date.innerText +" "+ "until " + endDate.value+" "+endTime.value;
        const todoDates=document.createElement("div");
        todoDates.appendChild(endTodo);
        todoDates.classList.add("todoDates");
        let check=document.createElement("i");
        check.classList.add("fas","fa-check");
        let trash=document.createElement("i");
        trash.classList.add("fas");
        trash.classList.add("fa-trash");
        const buttons=document.createElement("div");
        buttons.classList.add("buttons");
        buttons.appendChild(check);
        buttons.appendChild(trash);
        const newTodo=document.createElement("div");
        newTodo.classList.add("newTodo");
        deleteTodo(trash,todoDates);
        checkTodo(check)
        newTodo.appendChild(li);
        newTodo.appendChild(buttons);
        ul.appendChild(newTodo);
        ul.appendChild(todoDates)
        saveToLocalStorage(todo,endTodo);
        input.value="";
        endDate.value="";
        endTime.value="";
    }
}


//invalid input function
function invalidInput(element){
    element.classList.add("invalidInput");
    element.style.border="1px solid #FE5139";
    setTimeout(() => {element.style.border="none"}, 1000);
    setTimeout(() => {element.classList.remove("invalidInput")}, 800);
}


// delete todo
function deleteTodo(trash,todoDates){
    trash.addEventListener("click",function(){
        let li=this.parentElement.parentElement;
        ul.removeChild(li);
       todoDates.classList.add("hidden");
        removeFromLocalStorage(li,todoDates);
    })
}

//check todo
function checkTodo(check){
    check.addEventListener("click",function(){
        let li=this.parentElement.parentElement.children[0];
        li.classList.toggle("done");
    })
}




// save todo to local storage
function saveToLocalStorage(todo,endDate){
 let todos;
    let endDates;
    if(localStorage.getItem("todos")===null &&  localStorage.getItem("endDates")===null){
        todos=[];
        endDates=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"))

        endDates=JSON.parse(localStorage.getItem("endDates"));
    }
    todos.push(todo);
    endDates.push(endDate.innerText);
    localStorage.setItem("todos",JSON.stringify(todos))
    localStorage.setItem("endDates",JSON.stringify(endDates));
}

// save user name to local storage
function saveUserName(userNameUpperCase,avatar){
    let user;
    let avatars;
    if(localStorage.getItem("user")===null && localStorage.getItem("avatar")===null){
        user=[];
        avatars=[];
    }
    else{
        user=JSON.parse(localStorage.getItem("user"));
        avatars=JSON.parse(localStorage.getItem("avatars"));
    }
    user.push(userNameUpperCase);
    avatars.push(avatar.src);
    localStorage.setItem("user",JSON.stringify(userNameUpperCase));
    localStorage.setItem("avatar",JSON.stringify(select.value));
}

//update user name in local storage
function updateUserName(userNameUpperCase,avatar){
  let user; 
  let avatars;
  user=JSON.parse(localStorage.getItem("user"));
  avatars=JSON.parse(localStorage.getItem("avatars"));
  localStorage.setItem("user",JSON.stringify(userNameUpperCase));
  localStorage.setItem("avatar",JSON.stringify(select.value));
}


// load from local storage
function loadFromLocalStorage(){
    let todos;
    let endDates;
    if(localStorage.getItem("todos")===null  && localStorage.getItem("endDates")===null){
        todos=[];
        endDates=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
        endDates=JSON.parse(localStorage.getItem("endDates"));
    
    todos.forEach(function(todo,endDate){
        let li=document.createElement("li");
        li.innerText=todo;
        let dateSpan=document.createElement("span");
        dateSpan.innerText=endDates[endDate];
        let todoDates=document.createElement("div");
        todoDates.appendChild(dateSpan);
        todoDates.classList.add("todoDates");
        let check=document.createElement("i");
        check.classList.add("fas","fa-check");
        let trash=document.createElement("i");
        trash.classList.add("fas");
        trash.classList.add("fa-trash");
        const buttons=document.createElement("div");
        buttons.classList.add("buttons");
        buttons.appendChild(check);
        buttons.appendChild(trash);
        const newTodo=document.createElement("div");
        newTodo.classList.add("newTodo");
        deleteTodo(trash,dateSpan);
        checkTodo(check)
        newTodo.appendChild(li);
        newTodo.appendChild(buttons);
        ul.appendChild(newTodo);
        ul.appendChild(todoDates)
        input.value="";
})
    }
}



//remove from local storage
function removeFromLocalStorage(todo,endDate){
    let todos;
    let endDates;
    if(localStorage.getItem("todos")===null && localStorage.getItem("endDates")===null){
        todos=[];
        endDates=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
        endDates=JSON.parse(localStorage.getItem("endDates"));
    }

    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
    const dateIndex=endDates.innerText;
    endDates.splice(endDates.indexOf(dateIndex),1);
    localStorage.setItem("endDates",JSON.stringify(endDates));
}


