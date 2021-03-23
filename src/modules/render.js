import {domManipulator} from "./DOMManipulate"
import {getAllFromStorage, savetoStorage, getSelectedTask, getProject, removeTask, removeProject} from "./localStorage"
import {Project, Todo} from "./classes"
import {dateFormatter} from './helpers'
let moment = require('moment')



let render = function(){
    populateHeader()
    populateMain()
    
    
    if(!getAllFromStorage()){
        let exampleProject = Project("Example")
        let newTask = exampleProject.createTodo({title: "My task"})
        savetoStorage(exampleProject)
    }
    populateProjects()   
}
let populateProjects = function(){
    let storedProjects = getAllFromStorage()
    let sidenavProjectContainer = document.querySelector("#sidenav-project-container")
    sidenavProjectContainer.innerHTML = ""
    for(let key in storedProjects){
        let projectName = storedProjects[key].name
        let projectId = storedProjects[key].id
        let project = document.createElement("button")
        domManipulator.setElementAttributes(project, {"data-list": `${projectId}`})
        project.textContent = `${projectName}`
        domManipulator.addElements(sidenavProjectContainer, project)
        domManipulator.addEvntListener(project, "click",() => {populateTask(projectId)})
        populateTask(projectId)
    }

}
let populateTask = function(projectId){
    let showingTasks = document.querySelectorAll(".main-task-container-element")
    let storedItems = getAllFromStorage()
    let taskContainer = document.querySelector("#main-task-container")
    let elementData = projectId
    let projectTasks = storedItems[elementData].todos
    let projectName = storedItems[elementData].name
    let projectNameContainer = document.createElement('div')
    domManipulator.setElementAttributes(projectNameContainer, {class: "main-task-container-element", id:'main-task-project-name-container'})
    let selectedTaskProjectName = document.createElement("h3")
    selectedTaskProjectName.textContent = `${projectName}`
    let completeProject = document.createElement('button')
    completeProject.textContent = 'Delete Project'
    domManipulator.addEvntListener(completeProject, 'click', () => deleteProject(projectId))
    domManipulator.addElements(projectNameContainer, selectedTaskProjectName, completeProject)
    domManipulator.addElements(taskContainer, projectNameContainer)
    showingTasks.forEach(e => e.parentNode.removeChild(e))
    if(projectTasks.length == 0){
        let selectedTask = document.createElement("div")
        let selectedTaskProjectName = document.createElement("h3")
        selectedTaskProjectName.textContent = `${projectName}`
        domManipulator.setElementAttributes(selectedTask, {class: "main-task-container-element", "data-projectid": `${elementData}`, id:"selected-task"})
        domManipulator.addElements(taskContainer, selectedTask)
        domManipulator.addElements(selectedTask)
    }else{
        for(let key in projectTasks){
            let selectedTask = document.createElement("div")
            let selectedTaskTitle = document.createElement("h4")
            selectedTaskTitle.textContent = `${projectTasks[key].title}`
            let priority = document.createElement("p")
            priority.textContent = `Priority: ${projectTasks[key].priority}`
            let date = document.createElement('p')
            date.textContent = `Due Date: ${projectTasks[key].dueDate}`
            let description = document.createElement('p')
            description.textContent = `Description: ${projectTasks[key].description}`
            let selectedTaskEdit = document.createElement("button")
            selectedTaskEdit.textContent = "Edit"
            let selectedTaskComplete = document.createElement("button")
            selectedTaskComplete.textContent = "Complete"
            domManipulator.setElementAttributes(selectedTask, {class: "main-task-container-element", "data-taskid": `${projectTasks[key].id}`, "data-projectid": `${elementData}`, id:"selected-task"})
            domManipulator.addEvntListener(selectedTaskEdit, "click", (e) => existingTaskEdit(selectedTask.dataset.projectid, selectedTask.dataset.taskid))
            domManipulator.addEvntListener(selectedTaskComplete, "click", (e) => completeTask(selectedTask.dataset.projectid, selectedTask.dataset.taskid))
            domManipulator.addElements(taskContainer, selectedTask)
            domManipulator.addElements(selectedTask, selectedTaskComplete, selectedTaskTitle, description, priority, date, selectedTaskEdit)
        }
    }
}
let populateTaskForm = function(){
    let mainTaskContainer = document.querySelector("#main-task-container")
    let formContainer = document.createElement("dialog")
    domManipulator.setElementAttributes(formContainer, {id: "new-task-form-container",style: "display: none"})
    let formHeader = document.createElement("h3")
    formHeader.textContent = "Task"
    let form = document.createElement("form")
    domManipulator.setElementAttributes(form, {id:"task-form", class:"dialog-element"})
    let formTitleLabel = document.createElement("label")
    formTitleLabel.textContent = "Title"
    domManipulator.setElementAttributes(formHeader, {id:"task-title", class:"dialog-element"})
    let formTitleInput = document.createElement("input")
    domManipulator.setElementAttributes(formTitleInput, {id: "form-title-input", class: "form-element"})
    let formDescLabel = document.createElement("label")
    formDescLabel.textContent = "Description"
    let formDescInput = document.createElement("textarea")
    domManipulator.setElementAttributes(formDescInput, {id: "form-desc-input", class: "form-element"})
    let formDateLabel = document.createElement("label")
    formDateLabel.textContent = "Date"
    let formDateInput = document.createElement("input")
    domManipulator.setElementAttributes(formDateInput, {id: "form-date-input", class: "form-element", type: "date"})
    let formPriorLabel = document.createElement("label")
    formPriorLabel.textContent = "Priority"
    let formPriorInput1 = document.createElement("input")
    let formPriorInput2 = document.createElement("input")
    let formPriorInput3 = document.createElement("input")
    domManipulator.setElementAttributes(formPriorInput1, {id: "form-prior-input1", class: "form-element", type: "radio", name:"Priority", value:"Low", checked: true})
    domManipulator.setElementAttributes(formPriorInput2, {id: "form-prior-input2", class: "form-element", type: "radio", name:"Priority", value:"Medium"})
    domManipulator.setElementAttributes(formPriorInput3, {id: "form-prior-input3", class: "form-element", type: "radio", name:"Priority", value:"High"})
    let formSubmitBut = document.createElement("input")
    domManipulator.setElementAttributes(formSubmitBut, {id: "form-submit-button", class: "form-element", type: "button", value: "Submit"})
    let formCancelBut = document.createElement("input")
    domManipulator.setElementAttributes(formCancelBut, {id: "form-cancel-button", class: "form-element", type: "button", value: "Cancel"})
    domManipulator.addElements(mainTaskContainer, formContainer)
    domManipulator.addElements(formContainer, formHeader, form)
    domManipulator.addElements(form, formTitleLabel, formTitleInput, formDescLabel, formDescInput, 
        formDateLabel, formDateInput, formPriorLabel, formPriorInput1,formPriorInput2 ,formPriorInput3, formCancelBut, formSubmitBut)    
        domManipulator.addEvntListener(formCancelBut, "click", cancelTaskForm)
        domManipulator.addEvntListener(formSubmitBut, "click", submitTaskForm)
}
let populateProjectForm = function(){
    let sidenavProjectContainer = document.querySelector("#main-sidenav")
    let newProjectForm = document.createElement("form")
    domManipulator.setElementAttributes(newProjectForm, {id: "new-project-form", class:"sidenav-element", style: "display: none"})
    let newProjectNameLabel = document.createElement("label")
    newProjectNameLabel.textContent = "Name"
    domManipulator.setElementAttributes(newProjectNameLabel, {id: "new-project-name-label", class:"new-project-form-element"})
    let newProjectNameInput = document.createElement("input")
    domManipulator.setElementAttributes(newProjectNameInput, {id: "new-project-name-input", class:"new-project-form-element", value: 'New Project'})
    let newProjectSubmitBut = document.createElement("input")
    domManipulator.setElementAttributes(newProjectSubmitBut, {id: "new-project-submit-button", class:"new-project-form-element", type:"button", value:"Submit"})
    domManipulator.addEvntListener(newProjectSubmitBut, "click", addProject)
    let newProjectCancelBut = document.createElement("input")
    domManipulator.setElementAttributes(newProjectCancelBut, {id: "new-project-cancel-button", class:"new-project-form-element", type:"button", value:"Cancel"})
    domManipulator.addEvntListener(newProjectCancelBut, "click", hideProjectForm)
    domManipulator.addElements(sidenavProjectContainer, newProjectForm)
    domManipulator.addElements(newProjectForm, newProjectNameLabel, newProjectNameInput, newProjectCancelBut, newProjectSubmitBut)

}
let populateHeader = function(){
    let initialDiv = document.querySelector("#content")
    let header = document.createElement("header")
    domManipulator.addElements(initialDiv, header)
    domManipulator.setElementAttributes(header, {id: "header"})
    let headerTitle = document.createElement("h1")
    headerTitle.textContent = "Todo App"
    let newTaskAddButton = document.createElement("button")
    domManipulator.setElementAttributes(newTaskAddButton, {id: "header-new-task-add-button"})
    newTaskAddButton.textContent = "+"
    domManipulator.addEvntListener(newTaskAddButton, "click", displayTaskForm)
    domManipulator.addElements(header, headerTitle, newTaskAddButton)
}
let populateMain = function(){
    let initialDiv = document.querySelector("#content")
    let main = document.createElement("main")

    domManipulator.addElements(initialDiv, main)
    domManipulator.setElementAttributes(main, {id: "main"})

    let sideNav = document.createElement("nav")
    let projectContainer = document.createElement("div")
    let taskContainer = document.createElement("div")

    domManipulator.setElementAttributes(taskContainer, {class: "main-element", id: "main-task-container"})
    domManipulator.setElementAttributes(projectContainer, {class: "sidenav-element", id: "sidenav-project-container"})
    domManipulator.setElementAttributes(sideNav, {class: "main-element", id: "main-sidenav"})

    let createProjecButton = document.createElement("button")
    domManipulator.setElementAttributes(createProjecButton, {class: "sidenav-element", id: "project-create-button"})
    createProjecButton.textContent = "Add Project"
    domManipulator.addEvntListener(createProjecButton, "click", () => document.querySelector("#new-project-form").style = "display: block")
    domManipulator.addElements(main, sideNav, taskContainer)
    domManipulator.addElements(sideNav, projectContainer, createProjecButton)
    populateProjectForm()
    populateTaskForm()
}
let addProject = function(){
    let projectNameInput = document.querySelector("#new-project-name-input").value
    let newProjectForm = document.querySelector("#new-project-form")
    let newProject = Project(projectNameInput)
    savetoStorage(newProject)
    populateProjects()
    newProjectForm.style = "display: none"
    newProjectForm.reset()
}
let submitTaskForm = function(){
    let taskForm = document.querySelector("#new-task-form-container")
    let selectedProject = document.querySelector("#selected-task")
    let taskId = taskForm.dataset.presentedtask
    let projectId = selectedProject.dataset.projectid
    let formTitleInput = document.querySelector("#form-title-input")
    let formDescInput = document.querySelector("#form-desc-input")
    let formDateInput = document.querySelector("#form-date-input")
    let formPriorInput = document.querySelector('input[name="Priority"]:checked');
    let fetchedProject = getProject(projectId)
    if(taskId != "" && taskId != undefined){
        let projectTasksArr = fetchedProject.todos
        for(let i = 0; i < projectTasksArr.length; i++){
            if(projectTasksArr[i].id == taskId){
                projectTasksArr[i].title = formTitleInput.value
                projectTasksArr[i].description = formDescInput.value
                projectTasksArr[i].dueDate = moment(formDateInput.value, "YYYY-MM-DD").format("DD-MM-YYYY")
                projectTasksArr[i].priority = formPriorInput.value
                break
            }
        }        
    }else{
        let properties = {}
        properties.title = formTitleInput.value
        properties.description = formDescInput.value
        properties.dueDate = moment(formDateInput.value, "YYYY-MM-DD").format("DD-MM-YYYY")
        properties.priority = formPriorInput.value
        let newTask = Todo(properties)
        fetchedProject.todos.push(newTask)
    }
    savetoStorage(fetchedProject)
    populateTask(projectId)
    cancelTaskForm()
    taskForm.dataset.presentedtask = ""
}
let hideProjectForm = function(){
    let newProjectForm = document.querySelector("#new-project-form")
    newProjectForm.reset()
    newProjectForm.style = "display: none"
}
let displayTaskForm = function(){
    let taskForm = document.querySelector("#new-task-form-container")
    taskForm.style = "display: block"
}
let cancelTaskForm = function(){
    let taskFormContainer = document.querySelector("#new-task-form-container")
    let taskForm = document.querySelector("#task-form")
    taskFormContainer.style = "display: none"
    taskFormContainer.dataset.presentedtask = ""
    setTimeout(() => taskForm.reset(), 100)
    
}
let existingTaskEdit = function(projectId, taskId){
    let taskForm = document.querySelector("#new-task-form-container")
    taskForm.dataset.presentedtask = taskId
    let formTitleInput = document.querySelector("#form-title-input")
    let formDescInput = document.querySelector("#form-desc-input")
    let formDateInput = document.querySelector("#form-date-input")
    let selectedProject = getProject(projectId)
    let projectTasksArr = selectedProject.todos
    for(let i = 0; i < projectTasksArr.length; i++){
        if(projectTasksArr[i].id == taskId){
            let formPriorInput = document.querySelector(`input[value = ${projectTasksArr[i].priority}]`);
            formTitleInput.value = projectTasksArr[i].title 
            formDescInput.value = projectTasksArr[i].description
            formDateInput.value = dateFormatter(projectTasksArr[i].dueDate)
            formPriorInput.checked = true 
        }
    }
    displayTaskForm()
}
let completeTask = function(projectId, taskId){
    removeTask(projectId, taskId)
    populateProjects()

}
let deleteProject = function(projectId){
    removeProject(projectId)
    if(!getAllFromStorage()){
        let exampleProject = Project("Example")
        let newTask = exampleProject.createTodo({title: "My task"})
        savetoStorage(exampleProject)
    }
    populateProjects()
}


export {render}