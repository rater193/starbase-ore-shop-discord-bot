
//Our variables we can configure
//This is the directory relative to the project root
let cmdDirectory = "./commands";
let root = "./../../";

//The libraries we are using
let fs = require("fs");
let path = require('path');

//Here we are creating our library variables
let commands = {};
commands.storage = {};

console.log("Scanning for commands.")

//Here we are scanning for command files
let files = fs.readdirSync(cmdDirectory, {withFileTypes: true});
files.forEach((ent)=> {

    //Here we are loading the file
    console.log("Loading cmd file: " + ent.name);
    let cmd = require(root+cmdDirectory+"/"+path.parse(ent.name).name);
    
    //Here we are adding the cmd reference to our storage
    let cmdname = cmd.name;
    commands.storage[cmd.name] = cmd;

    //Finally, output thec md to the log so we can debug this easier in the future.
    console.log(`Registered command: ${cmdname}`);
});

module.exports = commands;