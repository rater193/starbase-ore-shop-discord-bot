
//References:
//https://discordjs.guide/popular-topics/builders.html#options
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    name: "starbase",
    description: "The command for interacting with the buy order market",
    onCommandRegister: (sb) => {
        //Here we are adding the sub command help text
        /*
        sb.addSubcommand(
            subcommand =>
            subcommand
                .setName('market')
                .setDescription('Comand to view the market')
                .addUserOption(option => option.setName('target').setDescription('The user'))
        );
        
        sb.addSubcommand(
            subcommand =>
            subcommand
                .setName('test')
                .setDescription('A test sub command')
                .addUserOption(option => option.setName('target').setDescription('The user'))
        );
        */
    },
    onRun: async function(interaction) {
        console.log("Derp cmd executed");
        //await interaction.reply("Test");
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
                .addOptions([
                    {
                        label: 'Select me',
                        description: 'This is a description',
                        value: 'first_option',
                    },
                    {
                        label: 'You can select me too',
                        description: 'This is also a description',
                        value: 'second_option',
                    },
                ]),
        );

        
		/*const row = new MessageActionRow()
        .addComponents(
            // ...
        );*/
        await interaction.reply({ content: 'Offer ends <t:1653566400:R>', ephemeral: true, embeds: [
            new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Ajatite x127 Stacks')
            .setURL('https://discord.js.org/')
            .setAuthor({ name: 'rater193#1550' })
            .setThumbnail('https://wiki.starbasegame.com/images/a/a4/Ajatite_ore.png')
            //.setTimestamp(Date.now() + ((24*12) * 60 * 60 * 1000))
            .addField('Time left:', '7 Days', true)
            //.setFooter({ text: '7 Hours Left', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            ,
        ], components: [] });

        /*

        await interaction.reply({ content: 'derpaher', ephemeral: true, embeds: [
            new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Ajatite x127 Stacks')
            .setURL('https://discord.js.org/')
            .setAuthor({ name: 'rater193', iconURL: 'https://wiki.starbasegame.com/images/a/a4/Ajatite_ore.png' })
            .setDescription('Time left: 12 Days')
            .setThumbnail('https://wiki.starbasegame.com/images/a/a4/Ajatite_ore.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )   
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
            ,
        ], components: [row] });
        */
        //await interaction.reply({ content: 'Pong!', components: [row] });
    }
}