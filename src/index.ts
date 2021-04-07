import { Client } from 'discord.js'
import config from '../config.json'

const client: Client = new Client()

client.on('ready', () => {
  console.log('logged in as', client.user?.tag)
})

client.on('message', (msg) => {
  if (!msg.content.startsWith(config.prefix) ?? msg.author.bot) return

  // separate command from prefix
  const command = msg.content.slice(config.prefix.length)

  if (msg.content.startsWith(config.prefix)) {
    switch (command) {
      case 'ping': {
        msg.channel.send(`pong! (${msg.client.ws.ping}ms)`).catch(console.error)
        break
      }
      default:
        break
    }
  }
})

client.login(process.env.DISCORD_TOKEN ?? config.token).catch(console.error)
