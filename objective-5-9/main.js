var clickStart;
var toDo;

if (localStorage.length === 0) {
    toDo = {
        lastID: 4,
        list: [
            {
                title: "Reorder by dragging the handles",
                completed: false,
                id: 3
            },
            {
                title: "Mark (in)complete by clicking/touching",
                completed: true,
                id: 0
            },
            {
                title: "Delete by swiping right",
                completed: false,
                id: 1
            }
        ]
    };
}

else {
    toDo = localStorage.getItem("toDo");
    toDo = JSON.parse(toDo);
}

drawList(toDo.list);

var task = function(title, id) {
    return (
        {
            title: title,
            completed: false,
            id: id
        }
    );
};

document.querySelector("#add-task")
    .addEventListener("click", function(){
        var input = document.getElementById("task-input").value;
        if (!input.replace(/\s/g, "").length) {
            document.getElementById("task-input").value = "";
            return;
        }
        var newTaskObject = task(input, ++toDo.lastID);
        toDo.list.push(newTaskObject);
        drawList([newTaskObject]);

        document.getElementById("task-input").value = "";
        save(toDo);
});

document.querySelector("#task-input")
    .addEventListener("keypress", function(e){
        if (e.charCode == 13) {
            document.querySelector("#add-task").click();
        }
});

var list = document.querySelector(".to-do-list");

list.addEventListener("click", function(e) {
    var task = e.target.parentNode;
    var id = task.id;
    var timeDif = e.timeStamp - clickStart.timeStamp;
    var mouseDif = e.clientX - clickStart.clientX;

    if (timeDif < 300 && mouseDif < 5) {
        if (task.classList.contains("to-do-task")) {
            for (let i=0; i<toDo.list.length; i++) {
                if (toDo.list[i].id == id) {
                    task.classList.toggle("completed");
                    toDo.list[i].completed = !toDo.list[i].completed;
                    i = toDo.list.length;
                }
            }
        }
    }
    save(toDo);
});

function swipeTask (e) {
    clickStart = createStartClick(e);
    document.addEventListener("mousemove",swipe);
    document.addEventListener("mouseup",function mouseup(e){
        var distance = e.clientX - clickStart.clientX;
        var width = clickStart.task.getBoundingClientRect().width;
        var percent = distance/width
        var task = document.getElementById(`${clickStart.task.parentNode.id}`);

        if (percent > 0.2) {
            task.parentNode.removeChild(task)
            removeTask(task.id);
        }

        task.querySelector("span").style.transform = `translateX(0px)`;
        document.removeEventListener("mousemove",swipe);
        document.removeEventListener("mouseup",mouseup);
    });
};

function swipe(e) {
    var thing = document.getElementById(`${clickStart.task.parentNode.id}`)
    .querySelector("span")
    var edgeDif = thing.getBoundingClientRect().left - clickStart.left;
    var mouseDif = e.clientX - clickStart.clientX;

    if (mouseDif < 0) {
        if (clickStart.clientX > clickStart.left+20) {
            clickStart.clientX = e.clientX;
        }
    }
    else {
        thing.style.transform = `translateX(${mouseDif}px)`;
    }
}

function dragTask (e) {
    clickStart = createStartClick(e);
    var duplicate = e.target.parentNode.cloneNode(true);
    duplicate.id = duplicate.id+"d";
    duplicate.classList.add("duplicate");
    duplicate.style.top = `${e.clientY + clickStart.top - clickStart.clientY}px`;
    duplicate.style.left = `${20}px`;
    clickStart.task.parentNode.classList.toggle("hidden")
    document.querySelector("body").appendChild(duplicate)
    document.addEventListener("mousemove",drag);

    document.addEventListener("mouseup",function mouseup(e){
        clickStart.task.parentNode.classList.toggle("hidden");
        var task = document.getElementById(`${clickStart.task.parentNode.id}d`);
        task.parentNode.removeChild(task)
        document.removeEventListener("mousemove",drag);
        document.removeEventListener("mouseup",mouseup);
    })
};

function drag(e) {
    var thing = document.getElementById(`${clickStart.task.parentNode.id}d`);
    var listTop = document.querySelector(".to-do-list").offsetTop;
    var height = thing.offsetHeight;
    var numTasks = document.querySelector(".to-do-list").offsetHeight/height;
    var offset = clickStart.clientY - clickStart.top;
    var position = Math.round((e.clientY - listTop - offset + height/2)/height);
    putInPosition(position-1);
    moveTask(clickStart.task.parentNode.id, position-1);
    thing.style.top = `${e.clientY + clickStart.top - clickStart.clientY}px`;
}
function putInPosition(pos) {
    var container = document.querySelector(".to-do-list");
    container.insertBefore(clickStart.task.parentNode, container.children[pos+1]);
}

function tSwipeTask (e) {
    clickStart = tCreateStartClick(e);
    
    document.addEventListener("touchmove",tSwipe);
    
    document.addEventListener("touchend",function touchend(e){
        console.log(e)
        var distance = e.changedTouches[0].clientX - clickStart.clientX;
        var width = clickStart.task.getBoundingClientRect().width;
        var percent = distance/width

        var task = document.getElementById(`${clickStart.task.parentNode.id}`);
        if (percent > 0.2) {
            task.parentNode.removeChild(task)
            removeTask(task.id);
        }

        task.querySelector("span").style.transform = `translateX(0px)`;
        document.removeEventListener("touchmove",tSwipe);
        document.removeEventListener("touched", touchend);
    });
};

function tSwipe(e) {
    var thing = document.getElementById(`${clickStart.task.parentNode.id}`)
    .querySelector("span")
    var edgeDif = thing.getBoundingClientRect().left - clickStart.left;
    var mouseDif = e.changedTouches[0].clientX - clickStart.clientX;

    if (mouseDif < 0) {
        if (clickStart.clientX > clickStart.left+20) {
            clickStart.clientX = e.touches[0].clientX;
        }
    }
    else {
        thing.style.transform = `translateX(${mouseDif}px)`;
    }
}

function tDragTask (e) {
    clickStart = tCreateStartClick(e);
    var duplicate = e.target.parentNode.cloneNode(true);
    duplicate.id = duplicate.id+"d";
    duplicate.classList.add("duplicate");
    duplicate.style.top = `${e.changedTouches[0].clientY + clickStart.top - clickStart.clientY}px`;
    duplicate.style.left = `${20}px`;
    clickStart.task.parentNode.classList.toggle("hidden")
    
    document.querySelector("body").appendChild(duplicate)
    document.addEventListener("touchmove", tDrag);

    document.addEventListener("touchend",function touchend(e){
        clickStart.task.parentNode.classList.toggle("hidden");
        var task = document.getElementById(`${clickStart.task.parentNode.id}d`);
        task.parentNode.removeChild(task)
        document.removeEventListener("touchmove",tDrag);
        document.removeEventListener("touchend",touchend);
    })
};

function tDrag(e) {
    var thing = document.getElementById(`${clickStart.task.parentNode.id}d`);
    var listTop = document.querySelector(".to-do-list").offsetTop;
    var height = thing.offsetHeight;
    var numTasks = document.querySelector(".to-do-list").offsetHeight/height;
    var offset = clickStart.clientY - clickStart.top;
    var position = Math.round((e.changedTouches[0].clientY - listTop - offset + height/2)/height);
    putInPosition(position-1);
    moveTask(clickStart.task.parentNode.id, position-1);
    thing.style.top = `${e.touches[0].clientY + clickStart.top - clickStart.clientY}px`;
}
function putInPosition(pos) {
    var container = document.querySelector(".to-do-list");
    container.insertBefore(clickStart.task.parentNode, container.children[pos+1]);
}

function buildTask(task) {
    var li = document.createElement("div");
    var title = document.createTextNode(task.title);
    var handle = document.createElement("div");
    var span = document.createElement("span");
    
    span.appendChild(title);
    span.classList.add("task-child");
    span.addEventListener( "mousedown", swipeTask);
    span.addEventListener( "touchstart", tSwipeTask);
    
    handle.appendChild(document.createTextNode("↕"));
    handle.classList.add("handle");
    handle.addEventListener( "mousedown", dragTask )
    handle.addEventListener( "touchstart", tDragTask )

    li.id = task.id;
    li.classList.add("to-do-task");
    li.appendChild(handle);
    li.appendChild(span);
    if (task.completed === true) {
        li.classList.add("completed")
    }

    return li;
}

function addTaskToDOM(li) {
    var div = document.querySelector("div.to-do-list");
    div.appendChild(li);
}

function drawList(list) {
    list.forEach( task => {
        var listTask = buildTask(task);
        addTaskToDOM(listTask);
    });
};

function createStartClick(e) {
    return {
        top: e.target.getBoundingClientRect().top,
        left: e.target.getBoundingClientRect().left,
        task: e.target,
        clientX: e.clientX,
        clientY: e.clientY,
        timeStamp: e.timeStamp
    };
}

function tCreateStartClick(e) {
    var click = {
        top: e.target.getBoundingClientRect().top,
        left: e.target.getBoundingClientRect().left,
        task: e.target,
        clientX: e.touches[0].clientX,
        clientY: e.touches[0].clientY,
        timeStamp: e.timeStamp
    };
    return click;
}

function removeTask(id) {
    for (let i=0; i<toDo.list.length; i++) {
        if (toDo.list[i].id == id) {
            toDo.list.splice(i, 1);
        }
    }
    save(toDo);
}

function moveTask(id, position) {
    for (let i=0; i<toDo.list.length; i++) {
        if (toDo.list[i].id == id) {
            if (i == position);
            else {
                let task = toDo.list[i];
                toDo.list.splice(i, 1);
                toDo.list.splice(position < i ? position+1 : position, 0, task);
            }
        }
    }
    save(toDo);
}

function save(toDo) {
    localStorage.setItem("toDo", JSON.stringify(toDo));
}

window.addEventListener("load", function() {
    var lastTouchY = 0 ;
    var maybePreventPullToRefresh = false ;

    var touchstartHandler = function(e) {
        if( e.touches.length != 1 ) {
            return ;
        }
        lastTouchY = e.touches[0].clientY ;
        maybePreventPullToRefresh = (window.pageYOffset === 0) ;
    };
    var touchmoveHandler = function(e) {
        var touchYDelta = touchY - lastTouchY ;
        lastTouchY = touchY ;
        if (maybePreventPullToRefresh) {
            maybePreventPullToRefresh = false ;
                e.preventDefault() ;
                return ;
        }
    }
    document.addEventListener("touchstart", touchstartHandler, false) ;
    document.addEventListener("touchmove", touchmoveHandler, false) ;
});