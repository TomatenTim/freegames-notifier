
import { createHash } from 'crypto';
import config from "../config";
import { Promotion } from "../interfaces/Promotion";
import { EpicGamesApiResponse } from "../interfaces/EpicGamesApiResponse";

/**
 * gets current and upcoming Promotions on EpicGames
 * @returns Promotions on EpicGames
 */
const epicGamesGetFreeGames = async () => {

    // create url obj
    const url = new URL('https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions');

    // add language settings
    url.searchParams.append('locale', config.locale);
    url.searchParams.append('country', config.country);
    url.searchParams.append('allowCountries', config.country);

    
    try {

        // fetch data
        const res = await fetch(url)
        const json = await <Promise<EpicGamesApiResponse>>res.json()

        // for each promotion in the list 
        const promotionList = json.data.Catalog.searchStore.elements.map(gameEpic => {

            // if no promotions are available its not free
            if (!gameEpic.promotions) {
                return null;
            }

            // get url from game
            let url = gameEpic.url
            if(!url) {
                // get the pageSlug 
                const pageSlug = gameEpic.catalogNs.mappings?.find(x => x.pageType == 'productHome')?.pageSlug;
                if(pageSlug) {
                    url = `https://store.epicgames.com/${config.country}/p/${pageSlug}`
                }
            }

            // get game information
            const game:Promotion['game'] = {
                id: gameEpic.id,
                url: url,
                price: gameEpic.price.totalPrice.originalPrice,
                priceCurrency: gameEpic.price.totalPrice.currencyCode,
                name: gameEpic.title,
                description: gameEpic.description,
                seller: {
                    id: gameEpic.seller.id,
                    name: gameEpic.seller.name,
                },
                // get OfferImageWide | if not found take first image
                mainImage: (gameEpic.keyImages.find(x => x.type == 'OfferImageWide') || gameEpic.keyImages[0]).url,
                images: gameEpic.keyImages.map(x => x.url),
            }

            // get offer type
            switch(gameEpic.offerType){
                case 'BASE_GAME':
                    game.type = 'game';
                    break;
                case 'ADD_ON':
                    game.type = 'dlc';
                    break;
            }


            const promotionTMP: Partial<Promotion> = {};

            // loop over current promotions to find current offer
            for (const x of gameEpic.promotions.promotionalOffers) {
                if(x.promotionalOffers) {
                    for (const y of x.promotionalOffers) {
                        if(y.startDate && y.endDate && y.discountSetting.discountPercentage === 0) {
                            promotionTMP.startDate = new Date(y.startDate);
                            promotionTMP.endDate = new Date(y.endDate);
                        }
                    }
                }
            }

            // loop over upcoming promotions to find current offer
            for (const x of gameEpic.promotions.upcomingPromotionalOffers) {
                if(x.promotionalOffers) {
                    for (const y of x.promotionalOffers) {
                        if(y.startDate && y.endDate && y.discountSetting.discountPercentage === 0) {
                            promotionTMP.startDate = new Date(y.startDate);
                            promotionTMP.endDate = new Date(y.endDate);
                        }
                    }
                }
            }

            // no promotion date found
            if(!promotionTMP.startDate || !promotionTMP.endDate) {
                return null
            }


            // get unique value for thie promotion
            const value4Hash = `${game.id}-${promotionTMP.startDate.toISOString()}-${promotionTMP.endDate.toISOString()}`
            const promotionHash = createHash('sha256').update(value4Hash).digest('hex');

            const promotion: Promotion = {
                id: `epicGames-${promotionHash}`,
                platform: 'epicGames',
                game: game,
                startDate: promotionTMP.startDate,
                endDate: promotionTMP.endDate,
            }

            return promotion;

        })

        

        // filter all null entrys and return
        return promotionList.filter(x => x);

    } catch (error) {

        // on error log it and return null
        console.error(error)
        return null;

    }


}

export { epicGamesGetFreeGames };