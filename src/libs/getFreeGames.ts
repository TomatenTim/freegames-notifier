import { epicGamesGetFreeGames } from "./epicGamesGetFreeGames"

/**
 * gets current and upcoming Promotions for all websites
 * @returns Promotions for all websites
 */
const getFreeGames = async () => {

    // get promotions from all websites
    const res = await Promise.all([epicGamesGetFreeGames()]);

    // flatten the array and return it
    return res.flat(1);

}

export { getFreeGames };