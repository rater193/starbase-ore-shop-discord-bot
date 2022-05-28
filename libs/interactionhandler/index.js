

let interactionhandler = {};
interactionhandler.storage = {};
interactionhandler.register = function(name, trigger) {
    interactionhandler.storage[name] = trigger
}
interactionhandler.update = async function(interaction) {

    if(interactionhandler.storage[interaction.customId]) {
        await interactionhandler.storage[interaction.customId](interaction);
        return;
    }
    await interaction.update({ content: 'Invalid menu selected! ' + interaction.customId + " - " + interaction.values, components: [] });
    setTimeout(function() {
        interaction.deleteReply();
    }, 5000)
}



module.exports = interactionhandler;