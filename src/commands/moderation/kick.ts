import { Client, Command, CommandoMessage } from 'discord.js-commando'
import { GuildMember } from 'discord.js'

interface IKickOptions {
  member: GuildMember
  reason?: string
}

module.exports = class KickCommand extends Command {
  async run (message: CommandoMessage, { member, reason }: IKickOptions): Promise<CommandoMessage> {
    if (message.channel.id !== '831159533132316682') return await message.say('You can\'t run that here.')
    const memberToKick: GuildMember = member
    const reasonString: string = reason?.toString() ?? ''
    await memberToKick.kick(reasonString)
    return await message.say(`${memberToKick.user.toString()} has been kicked with reason: ${reasonString}`)
  }

  constructor (client: Client) {
    super(client, {
      name: 'kick',
      aliases: ['boot'],
      group: 'moderation',
      memberName: 'kick',
      description: 'Kicks a member',
      args: [
        {
          key: 'member',
          prompt: 'What member do you want to kick?',
          type: 'member'
        },
        {
          key: 'reason',
          prompt: 'What is the reason for kicking?',
          type: 'string'
        }
      ]
    })
  }
}
