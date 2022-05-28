/*
    This file loads the API and creates all of our events we want to use
*/

console.log("Creating event API");
let bevts = require("./api.js");

bevts.create("onUserChat");     //Arguments: <Message>

module.exports = bevts;