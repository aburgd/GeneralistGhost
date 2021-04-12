/* eslint-disable @typescript-eslint/no-var-requires */
import Commando from 'discord.js-commando'
import path from 'path'

const client = new Commando.Client({
  owner: '191999414817128449',
  commandPrefix: '.'
})

client.registry
  .registerDefaults()
  .registerGroups([
    ['first', 'baby\'s first group']
  ])
  .registerCommandsIn({
    filter: /^([^.].*)\.(js|ts)$/,
    dirname: path.join(__dirname, 'commands')
  })

client.once('ready', () => {
  console.log(`logged in as ${client.user?.tag ?? ''}`)
  client.user?.setActivity('with themselves.')
})

client.on('error', console.error)

client.login(process.env.DISCORD_TOKEN).catch(console.error)
