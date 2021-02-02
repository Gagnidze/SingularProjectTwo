const setName = document.querySelector('#set_short_description');
const setPriority = document.querySelector('#set_task_priority');
const setStatus = document.querySelector('#set_task_status');
const setDescription = document.querySelector('#set_full_description');
const createTask = document.querySelector('.submit');
const deleteAll = document.querySelector('.clear');

const todoSection = document.querySelector('.todo_section');
const inProgressSection = document.querySelector('.in_progress_section');
const doneSection = document.querySelector('.done_section');

// Parsing or setting LS if it is empty

let information;

if (localStorage.getItem('info') === null) {
    information = [];
} else {
    information = JSON.parse(localStorage.getItem('info'));
}

const setLS = function () {
    localStorage.clear()
    localStorage.setItem('info', JSON.stringify(information));
}

// Sort tasks by priority

const prioritySorter = function () {
    information.sort(function (a, b) {
        return a.priorityTask - b.priorityTask;
    });
}

createTask.addEventListener('click', prioritySorter());


const taskCreator = function () {

    const currentInfo = {
        nameTask: setName.value,
        priorityTask: setPriority.value,
        statusTask: setStatus.value,
        descriptionTask: setDescription.value,
        objectAdded: false
    }

    prioritySorter();
    information.push(currentInfo);
    prioritySorter();

    //  full task card

    for (let i = 0; i < information.length; i++) {
        if (information[i].objectAdded === true) {
            console.log('allready there');
        } else {

            // todoSection.innerHTML = '';

            const newTask = document.createElement('div');
            newTask.classList.add("task_card");
            // wrapper for priority status and name 
            const wrap = document.createElement('div');
            wrap.classList.add("name_prio_status_wrap");
            newTask.appendChild(wrap);
            // name
            const taskName = document.createElement('span');
            taskName.textContent = information[i].nameTask;
            taskName.classList.add("task_name");
            wrap.appendChild(taskName);
            // priority
            const taskPriority = document.createElement('span');
            taskPriority.textContent = information[i].priorityTask;
            taskPriority.contentEditable = true;
            taskPriority.classList.add('task_priority');
            wrap.appendChild(taskPriority);



            // status
            const taskStatus = document.createElement('div');
            const clonedStatus = document.querySelector('#set_task_status').cloneNode(true);
            clonedStatus.classList.add('task_status');
            clonedStatus.value = information[i].statusTask;
            // 
            taskStatus.appendChild(clonedStatus);
            // 
            wrap.appendChild(taskStatus);
            // description
            const taskDescription = document.createElement('p');
            taskDescription.textContent = information[i].descriptionTask;
            taskDescription.contentEditable = true;
            taskStatus.classList.add('task_description');
            prioritySorter();
            newTask.appendChild(taskDescription);

            // Adding unique ID attribute to the parent div
            newTask.setAttribute('id', i);

            if (clonedStatus.value === 'To Do') {
                todoSection.appendChild(newTask);
                // console.log(newTask);
            } else if (clonedStatus.value === 'In Progress') {
                inProgressSection.appendChild(newTask);
            } else if (clonedStatus.value === 'Completed') {
                doneSection.appendChild(newTask);
            }

            clonedStatus.addEventListener('change', function () {
                if (clonedStatus.value === 'To Do') {
                    todoSection.appendChild(newTask);
                    console.log(newTask);
                } else if (clonedStatus.value === 'In Progress') {
                    inProgressSection.appendChild(newTask);
                } else if (clonedStatus.value === 'Completed') {
                    doneSection.appendChild(newTask);
                }
            })

            // delete button

            const deleteTask = document.createElement('button');
            deleteTask.textContent = 'Delete';
            deleteTask.classList.add('delete_button');
            wrap.appendChild(deleteTask);

            information[i].objectAdded = true;

            deleteTask.addEventListener('click', function (e) {
                const targetId = e.target.parentElement.parentElement.getAttribute('id');
                if (confirm('You sure my man?!')) {
                    information.splice(targetId, 1);
                    deleteTask.parentElement.parentElement.remove();
                    setLS();
                }
            });

            clonedStatus.addEventListener('change', function (e) {
                const targetId = e.target.parentElement.parentElement.parentElement.getAttribute('id');
                console.log(information[targetId].statusTask);
                information[targetId].statusTask = clonedStatus.value;
                setLS();
            });

            taskPriority.addEventListener('DOMSubtreeModified', function (e) {
                // e.preventDefault();
                // confirm('yea?');
                const targetId = e.target.parentElement.parentElement.parentElement.getAttribute('id');
                information[targetId].priorityTask = taskPriority.textContent;
                prioritySorter();
                setLS();
                location.reload()
            });
        }
    }
    prioritySorter();
    setLS();
}

window.addEventListener('DOMContentLoaded', function () {
    const savedInfo = JSON.parse(localStorage.getItem('info'));
    console.log(savedInfo);
    if (savedInfo) {
        for (let i = 0; i < savedInfo.length; i++) {
            const newTask = document.createElement('div');
            newTask.classList.add("task_card");
            // wrapper for priority status and name 
            const wrap = document.createElement('div');
            wrap.classList.add("name_prio_status_wrap");
            newTask.appendChild(wrap);
            // name
            const taskName = document.createElement('span');
            taskName.textContent = savedInfo[i].nameTask;
            taskName.classList.add("task_name");
            wrap.appendChild(taskName);
            // priority
            const taskPriority = document.createElement('span');
            taskPriority.textContent = savedInfo[i].priorityTask;
            taskPriority.classList.add('task_priority');
            taskPriority.contentEditable = true;
            wrap.appendChild(taskPriority);

            // status
            const taskStatus = document.createElement('div');
            const clonedStatus = document.querySelector('#set_task_status').cloneNode(true);
            clonedStatus.classList.add('task_status');
            clonedStatus.value = savedInfo[i].statusTask;
            // 
            taskStatus.appendChild(clonedStatus);
            // 
            wrap.appendChild(taskStatus);
            // description
            const taskDescription = document.createElement('p');
            taskDescription.textContent = savedInfo[i].descriptionTask;
            taskDescription.contentEditable = true;
            taskStatus.classList.add('task_description');
            newTask.appendChild(taskDescription);

            // Adding unique ID attribute to the parent div
            newTask.setAttribute('id', i);

            if (clonedStatus.value === 'To Do') {
                todoSection.appendChild(newTask);
                // console.log(newTask);
            } else if (clonedStatus.value === 'In Progress') {
                inProgressSection.appendChild(newTask);
            } else if (clonedStatus.value === 'Completed') {
                doneSection.appendChild(newTask);
            }

            clonedStatus.addEventListener('change', function () {
                if (clonedStatus.value === 'To Do') {
                    todoSection.appendChild(newTask);
                    console.log(newTask);
                } else if (clonedStatus.value === 'In Progress') {
                    inProgressSection.appendChild(newTask);
                } else if (clonedStatus.value === 'Completed') {
                    doneSection.appendChild(newTask);
                }
            })

            // delete button

            const deleteTask = document.createElement('button');
            deleteTask.textContent = 'Delete';
            deleteTask.classList.add('delete_button');
            wrap.appendChild(deleteTask);

            information[i].objectAdded = true;

            deleteTask.addEventListener('click', function (e) {
                const targetId = e.target.parentElement.parentElement.getAttribute('id');
                if (confirm('You sure my man?!')) {
                    information.splice(targetId, 1);
                    deleteTask.parentElement.parentElement.remove();
                    setLS();
                }
            });

            clonedStatus.addEventListener('change', function (e) {
                const targetId = e.target.parentElement.parentElement.parentElement.getAttribute('id');
                console.log(information[targetId].statusTask);
                information[targetId].statusTask = clonedStatus.value;
                setLS();
            });

            taskPriority.addEventListener('DOMSubtreeModified', function (e) {
                // e.preventDefault();
                // confirm('yea?');
                const targetId = e.target.parentElement.parentElement.parentElement.getAttribute('id');
                information[targetId].priorityTask = taskPriority.textContent;
                prioritySorter();
                setLS();
                location.reload()
            });
        }
    }
    setLS();
    prioritySorter();
});

deleteAll.addEventListener('click', function () {
    if (confirm('If you proceed, all your tasks will be forever deleted, are you sure?')) {
        information = [];
        setLS();
    }
});

createTask.addEventListener('click', function (e) {
    prioritySorter();
    e.preventDefault();
    taskCreator();
});