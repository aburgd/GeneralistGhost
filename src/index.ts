import { Client } from 'discord.js'

const client: Client = new Client()

client.on('ready', () => {
  console.log('logged in as', client.user?.tag)
})

client.on('message', (msg) => {
  if (msg.content.startsWith('g!')) {
    switch (msg.content.slice(2)) {
      case 'status': {
        if (msg.member?.roles.cache.has('827885048752635964') ?? true) {
          msg.channel.send(`${msg.author.username}, I'm a Ghost. Actually, now I'm *your* Ghost. And you... Well, you've been dead a long time, so you're going to see a lot of things you won't understand.`).catch(console.error)
        }
        break
      }
      case 'roles': {
        const memberRoles = msg.member?.roles.cache.map(rc => rc.name).join('\n')
        msg.reply(`you have the following roles: ${memberRoles ?? ''}`).catch(console.error)
        break
      }
      case 'ping': {
        msg.channel.send(`pong! (${msg.client.ws.ping}ms)`).catch(console.error)
        break
      }
      default:
        break
    }
  }
})

client.login(process.env.DISCORD_TOKEN).catch(console.error)
