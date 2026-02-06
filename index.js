require('dotenv').config(); // Load .env variables
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// Load sensitive data from .env
const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Game data storage
const games = {};

// Slash Commands
const commands = [
    new SlashCommandBuilder()
        .setName('startgofish')
        .setDescription('Start a new game of Go Fish'),
    new SlashCommandBuilder()
        .setName('join')
        .setDescription('Join an ongoing Go Fish game'),
    new SlashCommandBuilder()
        .setName('play')
        .setDescription('Ask a player for a card rank')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The player you want to ask')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('rank')
                .setDescription('The rank of the card you are asking for (e.g., A, K, Q)')
                .setRequired(true)),
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

// Register commands
(async () => {
    try {
        console.log('Registering slash commands...');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
        console.log('Slash commands registered successfully!');
    } catch (error) {
        console.error(error);
    }
})();

// Utility functions
function createDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push(`${rank}${suit}`);
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function dealCards(game) {
    for (const player of game.players) {
        if (!game.hands[player.id]) game.hands[player.id] = [];
        while (game.hands[player.id].length < 5 && game.deck.length > 0) {
            game.hands[player.id].push(game.deck.pop());
        }
    }
}

// Event handlers
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    if (commandName === 'startgofish') {
        if (games[interaction.guildId]) {
            return interaction.reply('A game is already in progress!');
        }

        const players = [interaction.user];
        games[interaction.guildId] = { players, deck: shuffleDeck(createDeck()), hands: {}, turn: 0 };
        dealCards(games[interaction.guildId]);
        await interaction.reply('A new game of Go Fish has started! Type `/join` to join.');
    }

    if (commandName === 'join') {
        const game = games[interaction.guildId];
        if (!game) {
            return interaction.reply('No game in progress. Start one with `/startgofish`.');
        }

        if (game.players.some(p => p.id === interaction.user.id)) {
            return interaction.reply('You are already in the game!');
        }

        game.players.push(interaction.user);
        dealCards(game);
        await interaction.reply(`${interaction.user.username} joined the game!`);
    }

    if (commandName === 'play') {
        const game = games[interaction.guildId];
        if (!game) {
            return interaction.reply('No game in progress.');
        }

        const player = interaction.user;
        if (!game.players.some(p => p.id === player.id)) {
            return interaction.reply('You are not in the game!');
        }

        if (game.players[game.turn].id !== player.id) {
            return interaction.reply('It is not your turn!');
        }

        const targetPlayer = options.getUser('target');
        const rank = options.getString('rank');

        const target = game.players.find(p => p.id === targetPlayer.id);
        if (!target) {
            return interaction.reply('Target player not found in the game.');
        }

        const hasCard = game.hands[target.id].includes(rank);
        if (hasCard) {
            game.hands[target.id] = game.hands[target.id].filter(card => card !== rank);
            game.hands[player.id].push(rank);
            await interaction.reply(`${target.username} gives all their ${rank}s to ${player.username}`);
        } else {
            const card = game.deck.pop();
            if (card) game.hands[player.id].push(card);
            await interaction.reply(`${player.username} goes fishing and draws a card.`);
        }

        game.turn = (game.turn + 1) % game.players.length;
        await interaction.followUp(`It is now ${game.players[game.turn].username}'s turn.`);
    }
});

client.login(TOKEN);
