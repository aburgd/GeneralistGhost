import config from '../../config.json'
import { Client, Message } from 'discord.js'
import { commands } from '../index'

module.exports = (client: Client, message: Message) => {
  if (message.author.bot) return
  if (message.content.indexOf(config.prefix) !== 0) return

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
  const command = args.shift()?.toLowerCase()
  const cmd: any = commands.get(command)

  if (cmd === null || cmd === undefined) return
  cmd.run(client, message, args)
}
