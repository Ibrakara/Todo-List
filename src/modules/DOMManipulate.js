let domManipulator = (function(){
    let addElements = function(parent, ...theArgs){
        theArgs.forEach(elem => parent.appendChild(elem))
    }
    let setElementAttributes = function(elem, attributes = {}){
        for(let key in attributes){
            elem.setAttribute(key, attributes[key])
        }
    }
    let addEvntListener = function(elem, event, callback){
        elem.addEventListener(event, callback)
    }
    return{
        addElements,
        setElementAttributes,
        addEvntListener,
    }

})()

 
export {domManipulator}