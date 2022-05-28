/*
    Creator: rater193
    Creation date: 20220527@GMT+1
    Description:
        This is how we can handle creating custom events that we can tap into for bot communications

    API doc:
        botevents.create(name) <-- This creates an event with this name
        botevents.register(name, Function(...) => {}) <-- This registers a function instance to t he event
        botevents.unregister(name, functionInstance) <-- This removes a function instance from the event
        botevents.clear(name) <-- Clears the event listeners
        botevents.run(name, ...) <-- This triggers the event, and passes on the arguments to the events
*/

let botevents = {}
let evtstorage = {}

//botevents.create(name) <-- This creates an event with this name
botevents.create = function(name) {
    console.log("Creating event: " + name);
    evtstorage[name] = [];
}

//botevents.register(name, Function(...) => {}) <-- This registers a function instance to t he event
botevents.register = function(name, functionInst) {
    //Making sure the event exists
    if(evtstorage[name]) {
        //Stores the event
        evtstorage[name].push(functionInst);
        return;
    }
    //Logs an error if it doesnt exsist
    console.error("Event name does not exist: " + name);
}

botevents.unregister = function(name, functionInst) {
    //Making sure the event exists
    if(evtstorage[name]) {
        //Retreiving the index of the function
        let index = evtstorage[name].indexOf(functionInst);
        //Making sure the index is valid
        if(index==-1) {
            console.error("Function instance not registered in " + name);
            return;
        }
        //Removes the function from the event storage
        evtstorage[name].splice(index);
        return;
    }
    //Logs an error if it doesnt exsist
    console.error("Event name does not exist: " + name);
}

botevents.clear = function(name) {
    //Making sure the event exists
    if(evtstorage[name]) {
        //Clears the event storage
        evtstorage[name] = [];
        return;
    }
    //Logs an error if it doesnt exsist
    console.error("Event name does not exist: " + name);
}

botevents.run = function(name, ...args) {
    //Making sure the event exists
    if(evtstorage[name]) {
        //Triggering the event function
        for(let index in evtstorage[name]) {
            evtstorage[name][index](...args);
        }
        return;
    }
    //Logs an error if it doesnt exsist
    console.error("Event name does not exist: " + name);
}

module.exports = botevents;