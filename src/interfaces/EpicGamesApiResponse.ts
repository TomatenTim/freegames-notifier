// *************************************************************************** //
//                                  DISCLAMER                                  //
//           This file was AI generated using https://www.blackbox.ai          //
//             It should represent a TS Interface for the response             //
//                      from the Epic Games free game api                      //
// https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions //
//                                                                             //
//                   The optional types where added manually                   //
// *************************************************************************** //
          

interface DataCatalogSearchStoreElements {
    title: string;
    id: string;
    namespace: string;
    description: string;
    effectiveDate: string;
    offerType: string;
    expiryDate?: string;
    viewableDate: string;
    status: string;
    isCodeRedemptionOnly: boolean;
    keyImages: {
        type: string;
        url: string;
    }[];
    seller: {
        id: string;
        name: string;
    };
    productSlug: string;
    urlSlug: string;
    url?: string;
    items: {
        id: string;
        namespace: string;
    }[];
    customAttributes: {
        key: string;
        value: string;
    }[];
    categories: {
        path: string;
    }[];
    tags: {
        id: string;
    }[];
    catalogNs: {
        mappings?: {
        pageSlug: string;
        pageType: string;
        }[];
    };
    offerMappings?: never;
    price: {
        totalPrice: {
        discountPrice: number;
        originalPrice: number;
        voucherDiscount: number;
        discount: number;
        currencyCode: string;
        currencyInfo: {
            decimals: number;
        };
        fmtPrice: {
            originalPrice: string;
            discountPrice: string;
            intermediatePrice: string;
        };
        };
        lineOffers: {
        appliedRules: {
            id: string;
            endDate: string;
            discountSetting: {
            discountType: string;
            };
        }[];
        }[];
    };
    promotions: null | {
        promotionalOffers: {
        promotionalOffers?: {
            startDate: string;
            endDate: string;
            discountSetting: {
            discountType: string;
            discountPercentage: number;
            };
        }[];
        }[];
        upcomingPromotionalOffers: {
        promotionalOffers?: {
            startDate: string;
            endDate: string;
            discountSetting: {
            discountType: string;
            discountPercentage: number;
            };
        }[];
        }[];
    };
}

interface DataCatalogSearchStore {
elements: DataCatalogSearchStoreElements[];
}

interface DataCatalog {
searchStore: DataCatalogSearchStore;
}

interface Data {
Catalog: DataCatalog;
}

interface EpicGamesApiResponse {
data: Data;
extensions?: never;
}

export type { EpicGamesApiResponse }