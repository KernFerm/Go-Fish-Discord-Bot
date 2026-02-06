require('dotenv').config(); // Load environment variables
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Access environment variables
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;

// Define the slash commands for Go Fish
const commands = [
    {
        name: 'startgofish',
        description: 'Start a new game of Go Fish!',
    },
    {
        name: 'join',
        description: 'Join an ongoing game of Go Fish!',
    },
    {
        name: 'play',
        description: 'Ask another player for a card rank!',
        options: [
            {
                type: 6, // USER type for Discord options
                name: 'target',
                description: 'The player you want to ask',
                required: true,
            },
            {
                type: 3, // STRING type for Discord options
                name: 'rank',
                description: 'The rank of the card you are asking for (e.g., A, K, Q)',
                required: true,
            },
        ],
    },
];

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands for Go Fish.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands for Go Fish.');
    } catch (error) {
        console.error(error);
    }
})();
