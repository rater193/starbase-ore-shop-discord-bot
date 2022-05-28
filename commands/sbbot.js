
//References:
//https://discordjs.guide/popular-topics/builders.html#options
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: "sbbot",// The name of the command
    description: "This is the admin command for managing the bot",
    onCommandRegister: (sb) => {
        // Sub menu command
        sb.addSubcommand(
            subcommand =>
            subcommand
                .setName('menu')
                .setDescription('Comand to view the market')
        );
        
        // Registering the interaction with the input fields
        libs.interactionhandler.register("placeMenu", async function(interaction) {
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            //                                       Buy Order Menu Creation                                       //
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            if(interaction.values=="Create_Buy_Order_Menu") {
                
                //Embed message creator
                let embd = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Starbase Buy Order Creator')
                .setDescription('Welcome to the Starbase Buy Orders bot. This bot will allow you to create buy orders across multiple discords, to allow a wide range of ore trading for all players. If you are interested in adding your dicsord to our network of users looking to create and/or claim buy orders, then please DM rater193#1550 for the bot invite link, and instructions on how to get started. If you wish to create a buy order, then please feel free to click one of the buttons below. Thanks!');

                //Updating the origonal message with new text, replacing the menu selection
                await interaction.update({ content: ' ', embeds: [embd], components: [
                    new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('Create_Buy_Order_Button') // Interaction ID
                            .setLabel('Create New Buy Order')       // Display Text
                            .setStyle('PRIMARY'),                   // Style
                    )
                ] });
                return;
            }

            //If no menus were created, then default to this text
            await interaction.update({ content: 'Menu does not exsist! ' + interaction.customId + " - " + interaction.values + "\nMessage being removed in 5 seconds.", components: [ ] });
            //Deleting the message after 5 seconds
            setTimeout(() => interaction.deleteReply(), 5000);
        });

        libs.botevents.register("onUserChat", function(msg) {
            if(msg.channel.type==="DM") {
                //console.log("DM received: " + msg.channel.type);
                //console.log("DM user: " + msg.author.id);
                //libs.data.users[msg.author.id] = "test"

                if(libs.data.users[msg.author.id]) {
                    /*
                    console.log("oldmsg: " + libs.data.users[msg.author.id].oldDMMessage);
                    console.log(typeof libs.data.users[msg.author.id].oldDMMessage);
                    libs.data.users[msg.author.id].oldDMMessage.delete();
                    delete libs.data.users[msg.author.id];
                    */
                }
            }
        });

        libs.interactionhandler.register("Create_Buy_Order_Button", async function(interaction) {
            //interaction.reply({ content: 'Buy order ticket created. Please switch to the new ticket channel created. Thanks.', ephemeral: true, components: [] });
            console.log("Receiving order creator to " + interaction.user.id)
            libs.data.users[interaction.user.id] = {
                item: "NONE",
                stacks: "1",
                price: "0"
            };
            let udata = libs.data.users[interaction.user.id];
            udata.oldDMMessage = await interaction.user.send({
                content: `Information:\nItem: ${udata.item}\nStacks: ${udata.stacks}\nPrice: ${udata.price}`,
                components: [
                    new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setCustomId('Submit_Change_Item')
                        .setLabel('Set item')
                        .setStyle('PRIMARY'),

                        new MessageButton()
                        .setCustomId('Submit_Change_Stacks')
                        .setLabel('Set stacks')
                        .setStyle('PRIMARY'),

                        new MessageButton()
                        .setCustomId('Submit_Change_Price')
                        .setLabel('Set price')
                        .setStyle('PRIMARY'),

                        new MessageButton()
                        .setCustomId('Submit_Stock_Details')
                        .setLabel('Set price')
                        .setStyle('PRIMARY'),
                    )
                ]
            });

            //console.log("oldmsg: " + libs.data.users[interaction.user.id].oldDMMessage);


            // Waiting for the update to take affect
            interaction.deferUpdate();
        });
    },
    onRun: async function(interaction) {
        
        // Menu creation selection
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('placeMenu')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Create Buy Order Menu',
                        description: 'This menu lets you create buy orders',
                        value: 'Create_Buy_Order_Menu',
                    },
                    {
                        label: 'Create Sell Order Menu',
                        description: 'This menu lets you list buy orders',
                        value: 'Create_Sell_Order_Menu',
                    },
                    {
                        label: 'Create Order Browser Menu',
                        description: 'This menu lets you create a browser, to view exsisting orders',
                        value: 'Create_Order_Browser_Menu',
                    },
                    {
                        label: 'Create Admin Menu',
                        description: 'This menu lets you create a browser, to view exsisting orders',
                        value: 'Create_Admin_Menu',
                    }
                ]),
        );
        //Displaying the message
        let rep = await interaction.reply({ content: 'Whichmenu do you want to post here?'/*, ephemeral: true*/, components: [row] });
    }
}