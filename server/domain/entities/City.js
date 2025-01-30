export default class City {

    constructor(id, name, country, countryCode, description, currency, thumbnail, pointsOfInterest) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.countryCode = countryCode;
        this.description = description;
        this.currency = currency;
        this.thumbnail = thumbnail;
        this.pointsOfInterest = pointsOfInterest || [];
    }

    addPointOfInterest(pointOfInterest) {
        if (!this.pointsOfInterest) {
            throw new Error('Invalid point of interest')
        }
        this.pointsOfInterest.push(pointOfInterest);
    }

    getPointOfInterestById(id) {
        return this.pointsOfInterest.find(poi => poi.id === id);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            country: this.country,
            countryCode: this.countryCode,
            description: this.description,
            currency: this.currency,
            thumbnail: this.thumbnail,
            pointsOfInterest: this.pointsOfInterest.map(poi => poi.toJSON())
        }
    }
}