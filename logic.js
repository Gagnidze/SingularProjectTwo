// const inputField = document.querySelector('#task_input');
// const submitButton = document.querySelector('#submitBtn');
// const currentToDos = document.querySelector('.ongoing_tasks');
// const ongoingTasksList = document.querySelector('.ongoing_tasks');

// // Adding Tasks to the ongoing tasks

// submitButton.addEventListener('click', function () {
//     if (inputField.value === '') {
//         alert('You forgot to write your task');
//     } else {
// currentToDos.innerHTML += `<div class="current_task"><li>${inputField.value}</li> <input type="checkbox" class="status"> </div>`;
// inputField.value = '';

//         const task = document.createElement('li');
//         task.classList.add('.current_task');
//         task.textContent = inputField.value;
//         ongoingTasksList.appendChild(task);

//         const statusBoxDiv = document.createElement('div');
//         const statusBox = document.createElement('input');
//         statusBoxDiv.appendChild(statusBox);
//         statusBoxDiv.classList.add('.liContainer');
//         statusBox.type = 'checkbox';
//         statusBox.classList.add('.checkbox');
//         task.appendChild(statusBoxDiv);
//     }
// });

// if (document.querySelector('.ongoing_task').children) {
//     console.log('rame');
// }



//////// OLD CODE ABOVE ////////
////////////////////////////////
//////// NEW CODE BELOW ////////




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

    // Declaring value variables

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
            taskPriority.textContent = setPriority.value;
            taskPriority.classList.add('task_priority');
            wrap.appendChild(taskPriority);
            // status
            const taskStatus = document.createElement('div');
            const clonedStatus = document.querySelector('#set_task_status').cloneNode(true);
            clonedStatus.classList.add('task_status');
            clonedStatus.value = setStatus.value;
            // 
            taskStatus.appendChild(clonedStatus);
            // 
            wrap.appendChild(taskStatus);
            // description
            const taskDescription = document.createElement('p');
            taskDescription.textContent = setDescription.value;
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
        console.log(information);
    }

    // console.log(taskStatus);



    ///////////////////////////////////

    // for (let i = 0; i < information.length; i++) {
    //     if (information[i].priorityTask > 2)
    //         console.log(information[i].priorityTask);
    // }

    // if(setPriority.value <  )

    ///////////////////////////////////

    // todoSection.appendChild(newTask);

    // console.log(`boloshi + ${information}`);
}

const updateLS = function () {
    localStorage.setItem('allTheInfo', JSON.stringify(information));
}

const parsedInfo = JSON.parse(localStorage.getItem('allTheInfo'));

createTask.addEventListener('click', function (e) {
    e.preventDefault();
    taskCreator();
    updateLS();
});