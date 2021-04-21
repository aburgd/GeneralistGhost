import { Client, Command, CommandoMessage } from 'discord.js-commando'
import { Guild, GuildMember, Role, TextChannel } from 'discord.js'
import { parseTime } from '../../utils'

interface IMuteOptions {
  member: GuildMember
  duration: string
  reason: string
}

module.exports = class MuteCommand extends Command {
  constructor (client: Client) {
    super(client, {
      name: 'mute',
      aliases: ['hush', 'shut-up'],
      group: 'moderation',
      memberName: 'mute',
      description: 'Mutes a member',
      args: [
        {
          key: 'member',
          prompt: 'What member do you want to mute?',
          type: 'member'
        },
        {
          key: 'duration',
          prompt: 'How long should they be muted?',
          type: 'integer'
        },
        {
          key: 'reason',
          prompt: 'What is the reason for mute?',
          type: 'string'
        }
      ]
    })
  }

  async run (message: CommandoMessage, { member, duration, reason }: IMuteOptions): Promise<CommandoMessage> {
    const guild: Guild = message.guild ?? null
    const memberToMute: GuildMember = member

    const mutedRole: Role = guild.roles.cache.find(role => role.name === 'Muted') as Role
    const modChannel: TextChannel = memberToMute.guild.channels.cache.find(ch => ch.name === 'mod-log') as TextChannel

    await memberToMute.roles.add(mutedRole)
    await modChannel.send(`${memberToMute.user.username} has been muted for ${duration.toString()} minutes with reason: ${reason.toString()}`)
    setTimeout(() => {
      memberToMute.roles.remove(mutedRole)
      modChannel.send(`**${memberToMute.nickname}** has been unmuted.`)
    }, parseTime(duration))
    return await message.say(`**${memberToMute.nickname}** has been unmuted.`)
  }
}
