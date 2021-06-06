const taskName = document.getElementById('taskName');
const taskDesc = document.getElementById('taskDesc');
const add = document.getElementById('btAdd');
const containerToDo = document.getElementById('containerToDo');
const containerDoing = document.getElementById('containerDoing');
const containerDone = document.getElementById('containerDone');

add.addEventListener('click', addTask);

tasksToDo = [];
tasksDoing = [];
tasksDone = [];

function addTask(){
    let date = new Date(Date.now());
    let dateString = date.toLocaleDateString()+' '+date.toLocaleTimeString();
    let task = new Task(0, taskName.value, taskDesc.value, dateString, 1);

    //POST
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=> {
        if (xhr.readyState === 4) {
            let json = xhr.responseText;
            let taskview = new TaskView(JSON.parse(json));
            addToTasksToDo(taskview);
        }
    });
    xhr.open('POST', 'http://localhost:8082/Trelo/api/tasks/insert');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(task));

    taskName.value = '';
    taskDesc.value = '';
}

function addToTasksToDo(taskview){

    if(taskview.delete!=null){
        taskview.delete(taskview);
    }

    tasksToDo.push(taskview);

    taskview.delete = (taskview)=>{
        let index = tasksToDo.indexOf(taskview);
        deleteTask(taskview.task.id);
        tasksToDo.splice(index, 1);
    }

    taskview.ascend = (taskview)=>{
        putTask(taskview.task.id, 2);
        addToTasksDoing(taskview);
    }

    taskview.degrade = null;

    showTasksToDo();
    showTasksDoing();
}

function addToTasksDoing(taskview){
    if(taskview.delete!=null){
        taskview.delete(taskview);
    }

    taskview.delete = (taskview)=>{
        let index = tasksDoing.indexOf(taskview);
        deleteTask(index);
        tasksDoing.splice(index, 1);
    }

    tasksDoing.push(taskview);

    taskview.ascend = ()=>{
        let index = tasksDoing.indexOf(taskview);
        putTask(index, 3);
        addToTasksDone(taskview);
    }

    taskview.degrade = ()=>{
        let index = tasksDoing.indexOf(taskview);
        putTask(index, 1);
        addToTasksToDo(taskview);
    }

    showTasksToDo();
    showTasksDoing();
    showTasksDone();
}

function addToTasksDone(taskview){
    if(taskview.delete!=null){
        taskview.delete(taskview);
    }

    taskview.delete = (taskview)=>{
        let index = tasksDone.indexOf(taskview);
        deleteTask(index);
        tasksDone.splice(index, 1);
    }

    tasksDone.push(taskview);

    taskview.ascend = null;

    taskview.degrade = ()=>{
        let index = tasksDone.indexOf(taskview);
        putTask(index, 2);
        addToTasksDoing(taskview);
    }

    showTasksDoing();
    showTasksDone();
}

function showTasksToDo(){
    containerToDo.innerHTML = "<lab class='labels'>To do</lab>";
    for(let i=0; i<tasksToDo.length;i++){
        let t = tasksToDo[i];
        t.render(containerToDo);

        t.delete = (t)=>{
            let index = tasksDoing.indexOf(t);
            deleteTask(index);
            tasksDoing.splice(index, 1);
        }

        t.ascend = (t)=>{
            let index = tasksDoing.indexOf(t);
            putTask(index, 2);
            addToTasksDoing(t);
        }

        t.degrade = null;
    }
}

function showTasksDoing(){
    containerDoing.innerHTML = "<lab class='labels'>Doing</lab>";
    for(let i=0; i<tasksDoing.length;i++){
        let t = tasksDoing[i];
        t.render(containerDoing);

        t.delete = (t)=>{
            let index = tasksDoing.indexOf(t);
            deleteTask(index);
            tasksDoing.splice(index, 1);
        }

        t.ascend = ()=>{
            let index = tasksDoing.indexOf(t);
            putTask(index, 3);
            addToTasksDone(t);
        }

        t.degrade = ()=>{
            let index = tasksDoing.indexOf(t);
            putTask(index, 1);
            addToTasksToDo(t);
        }
    }
}

function showTasksDone(){
    containerDone.innerHTML = "<lab class='labels'>Done</lab>";
    for(let i=0; i<tasksDone.length;i++){
        let t = tasksDone[i];
        t.render(containerDone);

        t.delete = (t)=>{
            let index = tasksDone.indexOf(t);
            deleteTask(t.task.id);
            tasksDone.splice(index, 1);
        }

        t.ascend = null;

        t.degrade = ()=>{
            let index = tasksDone.indexOf(t);
            putTask(index, 2);
            addToTasksDoing(t);
        }

    }
}

/*Comm Methods*/

function getTasks(){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{
        if(xhr.readyState === 4){
            let json = xhr.responseText;
            let response = JSON.parse(json);
            for(let i=0; response.length; i++){
                let taskDTO = response[i];
                console.log(taskDTO);
                let state = taskDTO.state;
                let view = new TaskView(taskDTO);

                switch (state){
                    case 1:
                        addToTasksToDo(view);
                        break;
                    case 2:
                        addToTasksDoing(view);
                        break;
                    case 3:
                        addToTasksDone(view);
                        break;
                }
            }
        }
    })
    xhr.open('GET', 'http://localhost:8082/Trelo/api/tasks/all');
    xhr.send();
}

function putTask(id, state){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{

    })
    xhr.open('PUT', 'http://localhost:8082/Trelo/api/tasks/update/'+id+'/'+state);
    xhr.send();
}

function deleteTask(id){
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', ()=>{

    })
    xhr.open('DELETE', 'http://localhost:8082/Trelo/api/tasks/delete/'+id);
    xhr.send();
}

getTasks();