const setName = document.querySelector('#set_short_description');
const setPriority = document.querySelector('#set_task_priority');
const setStatus = document.querySelector('#set_task_status');
const setDescription = document.querySelector('#set_full_description');
const createTask = document.querySelector('.submit');

const todoSection = document.querySelector('.todo_section');
const inProgressSection = document.querySelector('.in_progress_section');
const doneSection = document.querySelector('.done_section');

const information = [];

const taskCreator = function () {

    const currentInfo = {
        nameTask: setName.value,
        priorityTask: setPriority.value,
        statusTask: setStatus.value,
        descriptionTask: setDescription.value,
        objectAdded: false
    }

    information.push(currentInfo);

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
                }
            });
        }
    }
    setLS();
}

const setLS = function () {
    localStorage.clear()
    localStorage.setItem('info', JSON.stringify(information));
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
        }
    }
});


//////////////////////???????????///////////////////////


// const updateLS = function () {
//     localStorage.setItem('allTheInfo', JSON.stringify(information));
// }

const parsedInfo = JSON.parse(localStorage.getItem('allTheInfo'));

createTask.addEventListener('click', function (e) {
    e.preventDefault();
    taskCreator();
    // updateLS();
});