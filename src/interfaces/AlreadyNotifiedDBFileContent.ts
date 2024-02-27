interface AlreadyNotifiedDBFileContentPromotion {
    id: string;
    data: string;
}

interface AlreadyNotifiedDBFileContent {
    alreadyNotified: Array<AlreadyNotifiedDBFileContentPromotion>,
    lastUpdate: Date;
}

export type { AlreadyNotifiedDBFileContent }