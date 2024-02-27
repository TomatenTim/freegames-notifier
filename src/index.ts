import { addAlreadyNotified, checkAlreadyNotified } from "./libs/alreadyNotified";
import { getFreeGames } from "./libs/getFreeGames";


const checkNewFreeGames = async() => {

    let notificationCount = 0;

    const freeGamesPromotions = await getFreeGames();

    for (const promotion of freeGamesPromotions) {
        if(!promotion) {
            continue;
        }

        const now = new Date();
        // start in the future or end in the past
        if(promotion.startDate > now || promotion.endDate < now){
            continue;
        }

        // if alreadyNotified
        if(await checkAlreadyNotified(promotion)) {
            continue;
        }

        console.log(promotion);
        notificationCount++;
        addAlreadyNotified(promotion);
    }

    console.log(`Send Notifications for ${notificationCount} new Promotions`)
    

}

checkNewFreeGames();


setInterval(() => {

}, 10000)