import { Client, Command, CommandoMessage } from 'discord.js-commando'
import { GuildMember } from 'discord.js'

interface IKickOptions {
  member: GuildMember
  reason?: string
}

module.exports = class KickCommand extends Command {
  async run ({ member, reason }: IKickOptions): Promise<GuildMember> {
    const memberToKick: GuildMember = member
    return await memberToKick.kick(reason)
  }

  constructor (client: Client) {
    super(client, {
      name: 'kick',
      aliases: ['boot'],
      group: 'Moderation',
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
