import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { AlreadyNotifiedDBFileContent } from "../interfaces/AlreadyNotifiedDBFileContent";
import { dirname } from "path";
import { Promotion } from "../interfaces/Promotion";

const dbFile = './data/alreadyNotified.json'

const cache: {
    alreadyNotified: AlreadyNotifiedDBFileContent | null
} = {
    alreadyNotified: null
};

/**
 * get and cache AlreadyNotified DB
 * @returns db content
 */
const getAlreadyNotified = async() => {

    // if not cached yet
    if (!cache.alreadyNotified) {

        // check if folder exists
        if(!existsSync(dirname(dbFile))) {
            mkdirSync(dirname(dbFile));
        }

        cache.alreadyNotified = {
            alreadyNotified: [],
            lastUpdate: new Date()
        };

        // read file if exists 
        if(existsSync(dbFile)) {
            const content = readFileSync(dbFile, 'utf-8');
            const json = JSON.parse(content)

            cache.alreadyNotified = {
                alreadyNotified: json.alreadyNotified,
                lastUpdate: new Date(json.lastUpdate)
            };
        }
    }

    return cache.alreadyNotified;
}


/**
 * check if the promotion is in the db
 * @param promotion Promotion to check
 * @returns whether the promotion is in the db 
 */
const checkAlreadyNotified = async(promotion: Promotion) => {

    const alreadyNotified = await getAlreadyNotified();

    // if promotion id is in db return true
    return alreadyNotified.alreadyNotified.findIndex(x => x.id == promotion.id) !== -1
}

/**
 * Add a promotion to the AlreadyNotified DB
 * @param promotion promotion to add
 */
const addAlreadyNotified = async(promotion: Promotion) => {

    await getAlreadyNotified();

    if(!cache.alreadyNotified) {
        throw Error('alreadyNotified Cache not availabe')
    }

    cache.alreadyNotified.alreadyNotified.push({
        id: promotion.id,
        data: JSON.stringify(promotion),
    })

    cache.alreadyNotified.lastUpdate = new Date(); 

    const string = JSON.stringify(cache.alreadyNotified, null, 2);

    // save db content to file
    writeFileSync(dbFile, string);
}


export { checkAlreadyNotified, addAlreadyNotified }