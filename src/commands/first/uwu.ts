import { Client, Command, CommandoMessage } from 'discord.js-commando'

module.exports = class UwuCommand extends Command {
  async run (message: CommandoMessage): Promise<CommandoMessage> {
    return await message.say('uwu')
  }

  constructor (client: Client) {
    super(client, {
      name: 'uwu',
      aliases: ['owo'],
      group: 'first',
      memberName: 'uwu',
      description: 'owo what\'s this?'
    })
  }
}
