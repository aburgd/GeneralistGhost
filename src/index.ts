/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import Discord from 'discord.js'
// import Commando from 'discord.js-commando'
import config from '../config.json'

export const client: Discord.Client = new Discord.Client()

fs.readdir('./events/', (err, files) => {
  if (err != null) return console.error(err)
  files.forEach(file => {
    const event = require(`./src/events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName as any, event.bind(null, client))
  })
})

export const commands = new Discord.Collection()

fs.readdir('./commands/', (err, files) => {
  if (err != null) return console.error(err)
  files.forEach(file => {
    if (!file.endsWith('.ts')) return
    const props = require(`./src/commands/${file}`)
    const commandName = file.split('.')[0]
    console.log(`Attempting to load command ${commandName}`)
    commands.set(commandName, props)
  })
})

client.login(process.env.DISCORD_TOKEN ?? config.token).catch(console.error)
