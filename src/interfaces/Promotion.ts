
interface Seller {
    id: string;
    url?: string;
    name: string;
}

interface Game {
    id: string;
    url?: string;
    price: number;
    priceCurrency: string; 
    name: string;
    description: string;
    seller: Seller;
    mainImage: string;
    images: Array<string>;
    type?: 'game' | 'dlc';
}



interface Promotion {
    id: string;
    platform: 'epicGames';
    game: Game
    startDate: Date;
    endDate: Date;
}


export type { Promotion, Game, Seller }