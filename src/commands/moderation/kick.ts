import { Client, Command, CommandoMessage } from 'discord.js-commando'
import { GuildMember, TextChannel } from 'discord.js'

interface IKickOptions {
  member: GuildMember
  reason: string
}

module.exports = class KickCommand extends Command {
  constructor (client: Client) {
    super(client, {
      name: 'kick',
      aliases: ['boot', 'yeet'],
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

  async run (message: CommandoMessage, { member, reason }: IKickOptions): Promise<CommandoMessage> {
    // only in set channel
    if (message.channel.id !== '831164820526071889') return await message.say('You can\'t run that here.')
    // make member a GuildMember
    const memberToKick: GuildMember = member
    // make reason a string
    const reasonString: string = reason.toString()
    const kickConfirm: string = `${memberToKick.user.username} has been kicked with reason: ${reasonString}`
    const modChannel: TextChannel = memberToKick.guild.channels.cache.find(ch => ch.id === '831159533132316682') as TextChannel
    await memberToKick.kick(reasonString).catch(console.error)
    await modChannel.send(kickConfirm).catch(console.error)
    // kick with reasonString as reason
    return await message.say(kickConfirm)
  }
}
