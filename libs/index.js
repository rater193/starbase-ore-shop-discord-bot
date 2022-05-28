/*
    Creator: rater193
    Creation date: 20220517GMT-5
    Description:
        This handles loading the library order
*/
libs = {}
//Loading the core libraries
libs.botevents = require("./botevents");
libs.data = require("./data");
libs.commands =  require("./commands");
libs.orders = require("./orders");
libs.interactionhandler = require("./interactionhandler");

//Loading the libraries for communicating with discord
libs.discord_api_handler = require("./discord_api_handler");
