import { Client, Command, CommandoMessage } from 'discord.js-commando'
import { Guild, GuildMember, Role, TextChannel } from 'discord.js'
import { parseTime } from '../../utils'

interface IRestrictOptions {
  duration: string
}

module.exports = class RestrictCommand extends Command {
  constructor (client: Client) {
    super(client, {
      name: 'restrict',
      aliases: ['lock'],
      group: 'server',
      memberName: 'restrict',
      description: 'Locks the server for a duration, or indefinitely',
      args: [
        {
          key: 'duration',
          prompt: 'How long do you want to lock the server for?',
          type: 'string'
        }
      ]
    })
  }

  async run (message: CommandoMessage, { duration }: IRestrictOptions): Promise<CommandoMessage> {
    const guild: Guild = message.guild ?? null
    if (guild === null) return await message.say('You can\'t run that here.')

    const registeredRole: Role = guild.roles.cache.find(role => role.name === 'Registered') as Role
    const mutedRole: Role = guild.roles.cache.find(role => role.name === 'Muted') as Role
    const modChannel: TextChannel = guild.channels.cache.find(ch => ch.name === 'mod-log') as TextChannel
    modChannel.send(`**${guild.name}** has been locked for messages and voice activity.`)

    const registeredMembers: Array<GuildMember> = Array.from(registeredRole.members.values())
    registeredMembers.forEach(member => member.roles.add(mutedRole))
    setTimeout(() => {
      registeredMembers.forEach(member => member.roles.remove(mutedRole))
      modChannel.send(`**${guild.name} has been unlocked for activity.`)
    }, parseTime(duration))

    return await message.say(`**${guild.name} has been unlocked for activity.`)
  }
}
