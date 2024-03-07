import { EmbedBuilder, Message, WebhookClient } from "discord.js"
import { Promotion } from "../interfaces/Promotion";
import config from "../config";



const sendDiscordWebhookMessage = (promotion: Promotion) => {

    const embed = new EmbedBuilder()
        .setTitle(promotion.game.name)
        .setThumbnail(promotion.game.mainImage)
        .setDescription(promotion.game.description)
        .setFooter({ text: 'Offer ends' })
        .setTimestamp(promotion.endDate)
        .setColor(0x972be9);

    if(promotion.game.url) {
        embed.setURL(promotion.game.url);
    }

    for (const discordWebhookUrl of config.notifications.discord) {
        const webhookClient = new WebhookClient({ url: discordWebhookUrl });
        webhookClient.send({ embeds: [embed] })
    }
    

}

export { sendDiscordWebhookMessage }