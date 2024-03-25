const { Client } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const Discord = require('discord.js');


const client = new Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES', 'GUILD_VOICE_STATES'] });
const {
  prefix,
  token,
  admins,
  targets
} = require("./config.json");

let voiceConnection = null;
let onOff = true;
let timeoutInProgress = false;

const Commands = {
  'add': {
    help: 'Add person to targets',
    execute: async (message) => {
      if (message.mentions.users.size < 1) {
        message.reply('Must mention a valid user.');
      } else {
        console.log('added ' + message.mentions.users.first())
        targets.push(message.mentions.users.first().id);
        checkForUserInVoice();
      }
    }
  },
  'remove': {
    help: 'Remove person from targets.',
    execute: async (message) => {
      if (message.mentions.users.size < 1) {
        message.reply('Must mention a valid user.');
      } else {
        console.log('removed ' + message.mentions.users.first())
        targets.splice(targets.indexOf(message.mentions.users.first()));
        checkForUserInVoice();
      }
    }
  },
  'stop': {
    help: 'Turn Gluten off.',
    execute: () => {
      if (voiceConnection) {
        voiceConnection.disconnect();
      }
      onOff = false;
    }
  },
  'start': {
    help: 'Turn Gluten on. ;)',
    execute: () => {
      onOff = true;
      checkForUserInVoice();
    }
  },
  'help': {
    help: 'List commands for Gluten.',
    execute: (message) => {
      let helpMessage = new Discord.MessageEmbed()
        .setTitle('Gluten Bot Help');

      for (key in Commands) {
        helpMessage.addField(`${prefix}${key}`, Commands[key].help);
      }
      message.reply(helpMessage);
    }
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  let content = message.content;
  if (admins.includes(message.author.id) && content.startsWith(prefix)) {
    let cmd = content.substr(prefix.length).split(' ')[0];
    if (Commands[cmd]) {
      Commands[cmd].execute(message);
    } else {
      message.reply('Command not found, use "!d help" to see commands.');
    }
  }
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  if (targets.includes(oldState.id) && targets.includes(newState.id) && onOff) {
    if (oldState.channelId === null) {
      channel = await client.channels.cache.get(newState.channelId);
      if (!channel) return console.error("The channel does not exist!")
      voiceConnection = joinChannel(channel)
      play(voiceConnection)
    }
    if (oldState.channelId != null && newState.channel === null && voiceConnection != null) {
      voiceConnection.destroy()
    }
    if (oldState.channelId != null && newState.channel != null) {
      channel = await client.channels.cache.get(newState.channelId)
      if (!channel) return console.error("The channel does not exist!")
      voiceConnection = joinChannel(channel)
      play(voiceConnection)
    }
  }
});

function joinChannel(channel) {
  voiceConnection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });
  voiceConnection.receiver.speaking.on('start', (userId) => {
    if(targets.includes(userId)) {
      playSound()
    }
  })
  return voiceConnection;
}

function playSound() {
  play(voiceConnection);
  if(!timeoutInProgress) {
    timeoutInProgress = true;
    setTimeout(function() {
      speaking = false
      for (let key of voiceConnection.receiver.speaking.speakingTimeouts.keys()) {
        if(targets.includes(key)) {
          speaking = true
          break
        }
      }
      timeoutInProgress = false;
      if(speaking) {
        playSound()
      }
      speaking = false
    }, 1000)
  }

}

const play = (connection) => {
  resource = createAudioResource('./audios/chupa.mp3')
  audioPlayer = createAudioPlayer()
  audioPlayer.play(resource)
  dispatcher = connection.subscribe(audioPlayer)
}
 //TODO: Eliminar
const checkForUserInVoice = () => {
  let vcs = client.channels.cache.filter(c => c.type === 'voice');

  for (const [key, value] of vcs) {
    if (value.members.has(targets[0])) {
      joinChannel(value)
      return;
    }
  }
  if (voiceConnection) {
    voiceConnection.disconnect();
  }
}

client.login(token);
