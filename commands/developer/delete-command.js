const { SlashCommandBuilder } = require("discord.js");
const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("../../config.json");

const rest = new REST().setToken(token);

module.exports = {
  category: "developer",
  data: new SlashCommandBuilder()
    .setName("delete-command")
    .setDescription("Delete a command.")
    .addStringOption((option) =>
      option
        .setName("command-id") 
        .setDescription("The command to delete.") 
        .setRequired(true) 
    )
    .addBooleanOption(option => 
      option
        .setName("guild-only") 
        .setDescription("Whether the command is guild only.") 
        .setRequired(true) 
    ),
  
  async execute(interaction) {
    const id = interaction.options.getString("command-id");
    const isGuildOnly = interaction.options.getBoolean("guild-only"); 

    if (isGuildOnly) {
      rest
        .delete(Routes.applicationGuildCommand(clientId, guildId, id)) 
        .then(() => console.log("[+] Successfully deleted guild command."))
        .catch(console.error);
        
      await interaction.reply("[+] Command deleted successfully from the guild!");
    } else {
      rest
        .delete(Routes.applicationCommand(clientId, id)) 
        .then(() => console.log("[+] Successfully deleted application command."))
        .catch(console.error);
        
      await interaction.reply("[+] Command deleted successfully!");
    }
  },
};
