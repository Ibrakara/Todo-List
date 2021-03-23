import {idGenerator} from "./helpers"

let Project = function (name){
    name;
    let objectType = "Project"
    let todos = [];
    let id = idGenerator()

    let getName = function(){
        return name
    }
    let pushTodo = function(object){
        todos.push(object)
    }
    let createTodo = function(properties = {}){
        let newTodo = new Todo(properties)
        pushTodo(newTodo)
        return newTodo
    }
    let getId = function(){
        return id
    }
    return{
        getName,
        todos,
        createTodo,
        getId,
        name,
        id,
        objectType,
    }

}
let Todo = function(properties = {}){
    let objectType = "Todo"
    let title = properties.title || "-No Name-"
    let description = properties.description || '-No Description-';
    let dueDate = properties.dueDate;
    let priority = properties.priority || "Low";
    let id = idGenerator()
    let projectId;
    let completed = false;

    let setTitle = function(newTitle){
        title = newTitle
    }
    let getTitle = function(){
        return title
    }
    let setDescription = function(newDesc){
        description = newDesc
    }
    let getDescription = function(){
        return description;
    }
    let setDueDate = function(newDate){
        dueDate = newDate
    }
    let getDueDate = function(){
        return dueDate
    }
    let setPriority = function(newPrior){
        priority = newPrior
    }
    let getPriority = function(){
        return priority
    }
    let getId = function(){
        return id
    }
    let setProjectId = function(newProjectId){
        projectId = newProjectId
    }
    let changeComplation = function(){
        if(completed){
            completed = false;
        }else{
            completed = true
        }
    }

    
    return {
        setTitle,
        getTitle,
        setDescription,
        getDescription,
        setDueDate,
        getDueDate,
        setPriority,
        getPriority,
        getId,
        setProjectId,
        changeComplation,
        title,
        description,
        dueDate,
        priority,
        id,
        projectId,
        completed,
        objectType
    }

}


export {Project, Todo}