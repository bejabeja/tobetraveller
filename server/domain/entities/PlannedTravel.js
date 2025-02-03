export default class PlannedTravel {
    constructor(id, userId, destination, travelDays, thumbnail, itinerary, creationDate = new Date()) {
        this.id = id;
        this.userId = userId;
        this.destination = destination;
        this.travelDays = travelDays;
        this.thumbnail = thumbnail;
        this.itinerary = itinerary;
        this.creationDate = creationDate;
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            title: this.destination,
            travelDays: this.travelDays,
            thumbnail: this.thumbnail,
            itinerary: this.itinerary,
            creationDate: this.creationDate
        }
    }
}