/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, Message } from 'discord.js'
import { commands } from '../index'

exports.run = (client: Client, message: Message, args: string[]) => {
  if (args === null || args === undefined || args.length < 1) {
    message.reply('you must provide a command name to reload.')
      .then(console.warn)
      .catch(console.error)
  }
  const commandName: string = args[0]

  if (!commands.has(commandName)) {
    message.reply('that command doesn\'t exist.')
      .then(console.warn)
      .catch(console.error)
  }
  commands.delete(commandName)
  const props = require(`./${commandName}.ts`)
  commands.set(commandName, props)
  message.reply(`the command ${commandName} has been reloaded.`)
    .then(console.info)
    .catch(console.error)
}
