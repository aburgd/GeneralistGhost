import { Client } from 'discord.js'

module.exports = (client: Client) => {
  console.log(`logged in as ${client.user?.tag ?? ''}`)
}
