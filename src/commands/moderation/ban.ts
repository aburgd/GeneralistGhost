import { Client, Command, CommandoMessage } from 'discord.js-commando'
import { GuildMember, TextChannel } from 'discord.js'

interface IBanOptions {
    member: GuildMember
    reason: string
    days: number
}

module.exports = class BanCommand extends Command {
  constructor (client: Client) {
    super(client, {
      name: 'ban',
      aliases: ['banhammer'],
      group: 'moderation',
      memberName: 'ban',
      description: 'Bans a member',
      args: [
        {
          key: 'member',
          prompt: 'What member do you want to ban?',
          type: 'member'
        },
        {
          key: 'reason',
          prompt: 'What is the reason for banning?',
          type: 'string'
        },
        {
          key: 'days',
          prompt: 'How many days of messages to delete?',
          type: 'integer'
        }
      ]
    })
  }

  async run (message: CommandoMessage, { member, reason, days }: IBanOptions): Promise<CommandoMessage> {
    if (message.channel.id !== '831164820526071889') return await message.say('You can\'t run that here.')
    const memberToBan: GuildMember = member
    const reasonString: string = reason.toString()
    const kickConfirm: string = `${memberToBan.user.username} has been banned with reason ${reasonString}`
    const modChannel: TextChannel = memberToBan.guild.channels.cache.find(ch => ch.id === '831159533132316682') as TextChannel
    await memberToBan.ban({ days: days as number, reason: reasonString }).catch(console.error)
    await modChannel.send(kickConfirm).catch(console.error)
    return await message.say(kickConfirm)
  }
}
