const { SlashCommandBuilder } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  cooldown: 5,
  category: 'information',
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responds with the client's ping!"),

  async execute(interaction) {
    await interaction.reply({ content: `Pinging...`, ephemeral: true })
    await wait(2_000)
    await interaction.editReply({ content: `${Date.now() - interaction.createdTimestamp}ms!`, ephemeral: true });
  },
};
