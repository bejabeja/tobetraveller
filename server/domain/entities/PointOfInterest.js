export default class PointOfInterest {
    constructor(id, name, type, description, openingHours, thumbnail) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
        this.openingHours = openingHours;
        this.thumbnail = thumbnail;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            description: this.description,
            openingHours: this.openingHours,
            thumbnail: this.thumbnail
        }
    }
}