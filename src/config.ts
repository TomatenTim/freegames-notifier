import 'dotenv/config'

const config = {

    locale: process.env.LOCALE || 'en-US',
    country: process.env.COUNTRY || 'DE',

    intervalDelay: parseInt(process.env.INTERVAL_DELAY || '3600'),

    notifications: {
        discord: process.env.DISCORD_WEBHOOKS?process.env.DISCORD_WEBHOOKS.split(','):[]
    }

}

export default config;