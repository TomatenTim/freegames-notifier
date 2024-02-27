import { EmbedBuilder, Message, WebhookClient } from "discord.js"
import { Promotion } from "../interfaces/Promotion";
import config from "../config";



const sendDiscordWebhookMessage = (promotion: Promotion) => {

    const embed = new EmbedBuilder()
        .setTitle(promotion.game.name)
        .setURL(promotion.game.url)
        .setThumbnail(promotion.game.mainImage)
        .setDescription(promotion.game.description)
        .setFooter({ text: 'Offer ends' })
        .setTimestamp(promotion.endDate)
        .setColor(0x972be9);

    for (const discordWebhookUrl of config.notifications.discord) {
        const webhookClient = new WebhookClient({ url: discordWebhookUrl });
        webhookClient.send({ embeds: [embed] })
    }
    

}

export { sendDiscordWebhookMessage }