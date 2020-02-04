export class AffordabilityPage {
    headline: string;
    subtext: string;
    imageUrl: string;

    constructor(headline?: string, subtext?: string, imageUrl?: string) {
        this.headline = headline;
        this.subtext = subtext;
        this.imageUrl = imageUrl;
    }
}
