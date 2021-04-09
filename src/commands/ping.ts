import { Client, Message } from 'discord.js'

exports.run = (client: Client, message: Message) => {
  message.channel.send(`pong! ${client.ws.ping}ms`)
    .catch(console.error)
}
