const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

async function showContentModal(interaction) {
    const modal = new ModalBuilder()
        .setCustomId('content_modal')
        .setTitle('Content');

    const age = new TextInputBuilder()
        .setCustomId('age')
        .setMinLength(2)
        .setMaxLength(3)
        .setLabel("How old are you?")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

    const link = new TextInputBuilder()
        .setCustomId('twitch')
        .setLabel("Twitch, YouTube or other link")
        .setRequired(true)
        .setStyle(TextInputStyle.Short);

    const ingame = new TextInputBuilder()
        .setCustomId('ingame')
        .setLabel("Minecraft name")
        .setMaxLength(16)
        .setMinLength(3)
        .setRequired(false)
        .setStyle(TextInputStyle.Short);

    modal.addComponents(new ActionRowBuilder().addComponents(age), new ActionRowBuilder().addComponents(link), new ActionRowBuilder().addComponents(ingame));

    await interaction.showModal(modal);
}

module.exports = {
    showContentModal
};