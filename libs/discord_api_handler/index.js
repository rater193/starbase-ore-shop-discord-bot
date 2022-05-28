
//References:
//https://discordjs.guide/popular-topics/builders.html#options

/////////////////////////////////////////////////////////////////////////////////////////////
//  Past this point was copied from their official example, and modified to suit my needs  //
//                                Documentation may varriee                                //
/////////////////////////////////////////////////////////////////////////////////////////////

//Here we are loading all our libraries
const { Client, Intents } = require('discord.js');
const client = new Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS']
});
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');

//Engine variables to use
let serverCommands = [ ];
const rest = new REST({ version: '9' }).setToken(cfg.token.rest);

/////////////////////////////////////////////////////////////////////////////////////////////
//                                Discord JS Rest Template                                 //
/////////////////////////////////////////////////////////////////////////////////////////////

//Here we are registering all of our commands we have loaded previously

for(let cmdKey in libs.commands.storage) {
  let cmd = libs.commands.storage[cmdKey];
  console.log("Processing command into discord api cmd reference: " + cmdKey);

  let sb = new SlashCommandBuilder().setName(cmd.name).setDescription(cmd.description);

  if(cmd["onCommandRegister"]) {
    cmd.onCommandRegister(sb);
  }
  serverCommands[serverCommands.length] = sb.toJSON();
}

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');


    await rest.put(
      Routes.applicationGuildCommands(cfg.ids.bot, cfg.ids.TheOreStoreSB),
      { body: serverCommands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

/////////////////////////////////////////////////////////////////////////////////////////////
//                               Discord JS Client Template                                //
/////////////////////////////////////////////////////////////////////////////////////////////
client.on('ready', (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if(interaction.isSelectMenu() || interaction.isButton()) {
    await libs.interactionhandler.update(interaction);
  }

  if(interaction.isCommand()) {
    if(libs.commands.storage[interaction.commandName]) {
      await libs.commands.storage[interaction.commandName].onRun(interaction);
    }
  }
});

client.login(cfg.token.bot);


/////////////////////////////////////////////////////////////////////////////////////////////
//                               Custom bot event API hook                                 //
/////////////////////////////////////////////////////////////////////////////////////////////
client.on('messageCreate', message => {
  // console.log("Message event: " + message.channel.type);
  libs.botevents.run("onUserChat", message);
});