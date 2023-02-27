// const fill = document.querySelector('.fill')
const empties = document.querySelectorAll('.empty')
const addTodoButton = document.querySelector('.btn')
const modal = document.querySelector('.modal')
const modal_content = document.querySelector('.modal_content')
const addTodoForm = document.querySelector("#add-todo-form");

// fill.addEventListener('dragstart', dragStart)
// fill.addEventListener('dragend', dragEnd)

const STATUSES = {
    IN_PROGRESS: "IN_PROGRESS",
    TODO: "TODO",
    DONE: "DONE"
}

let todos = [
    {
        id: '1sdffdfwe2543241',
        title: 'Buy Minocsidil',
        description: 'be like Daler',
        status: STATUSES.TODO
    },
    {
        id: '1sadasd2543241',
        title: 'chek h w',
        description: 'description will be here',
        status: STATUSES.TODO

    },
    {
        id: '1sdasdasd241',
        title: 'todo h/t',
        description: 'description will be here',
        status: STATUSES.TODO
    }
]

let temp = []

function renderTodos() {

    const [TODO, IN_PROGRESS, DONE] = empties

    TODO.innerHTML = ""
    IN_PROGRESS.innerHTML = ""
    DONE.innerHTML = ""

    temp = []


    for (let todo of todos) {
        let div = document.createElement('div')
        let b = document.createElement('b')
        let p = document.createElement('p')

        div.setAttribute('id', todo.id)
        div.setAttribute('class', 'fill')
        div.setAttribute('draggable', true)

        b.innerHTML = todo.title
        p.innerHTML = todo.description

        div.append(b, p)

        if (todo.status === STATUSES.TODO) {
            TODO.append(div)
        }

        if (todo.status === STATUSES.IN_PROGRESS) {
            IN_PROGRESS.append(div)
        }

        if (todo.status === STATUSES.DONE) {
            DONE.append(div)
        }

        temp.push(div)
    }
}

renderTodos()

function addDragEventsToItems() {
    temp.forEach((item) => {
        item.addEventListener('dragstart', dragStart)
        item.addEventListener('dragend', dragEnd)
    })
}

addDragEventsToItems()

for (const empty of empties) {
    empty.addEventListener('dragover', dragOver)
    empty.addEventListener('dragenter', dragEnter)
    empty.addEventListener('dragleave', dragLeave)
    empty.addEventListener('drop', dragDrop)
}

let temp_id

function dragStart() {
    console.log('dragStart');
    temp_id = this.id
    this.className += ' hold'
    setTimeout(() => (this.className = 'invisible'), 0)
}

function dragEnd() {
    console.log('dragEnd');
    this.className = 'fill'
}

function dragOver(event) {
    event.preventDefault()
}

function dragEnter(event) {
    console.log('');
    event.preventDefault()
    this.className += ' hovered'
}


function dragLeave() {
    console.log('dragLeave');
    this.className = 'empty'
    console.log(this);
}

function dragDrop(params) {
    console.log('dragDrop');
    this.className = 'empty'
    temp.forEach((item, index) => {
        if (item.id === temp_id) {
            this.append(item)
        }
    })
}

addTodoButton.addEventListener("click", () => {
    modal.classList.add('active')
})

addTodoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const [title, description, status] = e.target
    const todo = {
        id: Date.now(),
        title: title.value,
        description: description.value,
        status: status.value
    }
    if (todos.some(todo => todo.title === title.value)) {
        alert("This item exists")
    } else {
        todos.push(todo)
        modal.classList.remove('active')
        title.value = ""
        description.value = ""
        renderTodos()
        addDragEventsToItems()
    }
})