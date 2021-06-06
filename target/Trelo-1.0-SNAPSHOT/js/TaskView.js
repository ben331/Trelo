class TaskView{

    constructor(task){
        this.task = task;
        this.delete = null;
        this.ascend = null;
        this.degrade = null;
    }

    render = (container)=>{
        let html =

        "<div class = 'task'>" +
            "<label class='taskTitle'>"+this.task.name+"</label>" +
            "<button class='btDelete' id='btDelete"+this.task.id+"'></button>" +
            "<textarea class='taskDesc' cols='30' rows='8' disabled = true>"+this.task.description+"</textArea>" +
            "<label class='DateTime'>"+this.task.date+"</label>" +
            "<button class='btAscend' id='btAscend"+this.task.id+"'></button>" +
            "<button class='btDegrade' id='btDegrade"+this.task.id+"'></button>" +
        "</div>";

        container.innerHTML+=html;

        let btDelete = document.getElementById('btDelete'+this.task.id);
        let btAscend = document.getElementById('btAscend'+this.task.id);
        let btDegrade = document.getElementById('btDegrade'+this.task.id);

        btDelete.addEventListener('click', ()=>{
            this.delete(this);
        });

        btAscend.addEventListener('click', ()=>{
            this.ascend(this);
        });

        btDegrade.addEventListener('click', ()=>{
            this.degrade(this);
        });
    }
}