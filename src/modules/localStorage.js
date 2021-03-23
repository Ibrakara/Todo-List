// import { id } from "date-fns/locale"

// import id from "date-fns/locale/id"

let savetoStorage = function(...rest){
    rest.forEach(elem => {
        let objStr = JSON.stringify(elem)
        let objId = elem.id
        localStorage.setItem(objId, objStr)
    })
}
let getAllFromStorage = function(){
    let storedItems = {...localStorage};
    let storedObj = {};
    for(let key in storedItems){
        storedObj[key] = JSON.parse(storedItems[key])
    }
    if(!Object.keys(storedObj).length){
        return null
    }
    return storedObj
}
let getSelectedTask = function(projectId, taskId){
    let selectedProject = localStorage.getItem(projectId);
    let selectedProjectObject = JSON.parse(selectedProject)
    let selectedTask;
    if(selectedProjectObject.id == projectId){
        selectedTask = selectedProjectObject.todos
    }
    return selectedTask
}
let getProject = function(projectId){
    let project = localStorage.getItem(projectId)
    let parsedProject = JSON.parse(project)
    return parsedProject
}
let removeProject = function(projectId){
    localStorage.removeItem(projectId)
}
let removeTask = function(projectId, taskId){
    let selectedProject = getProject(projectId)
    selectedProject.todos.forEach((elem, index, list) => {
        if(elem.id == taskId){
            list.splice(index, 1)
        }
    })
    savetoStorage(selectedProject)
}

export {savetoStorage, getAllFromStorage, getSelectedTask, getProject, removeTask, removeProject}