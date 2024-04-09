const router = require('express').Router();

router.get('/', (req, res) => {
    const citiesData =
    {
        "cities": [
            {
                "id": 1,
                "cityName": "Paris",
                "countryName": "France",
                "countryCode": "FR",
                "countryDescription": "France, officially the French Republic, is a country in Western Europe known for its rich history, culture, and gastronomy. It is the most visited country in the world.",
                "currency": "Euro (EUR)",
                "cityDescription": "Paris, the capital city of France, is renowned for its romantic ambiance, fashion, and art scene. It's often called the 'City of Light' due to its historical importance and enlightenment era landmarks.",
                "cityThumbnail": "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "points_of_interest": [
                    {
                        "name": "Eiffel Tower",
                        "type": "Monument",
                        "description": "Iconic symbol of Paris and one of the most recognizable structures in the world.",
                        "opening_hours": "9:00 AM - 11:45 PM",
                        "thumbnail": "https://www.example.com/eiffel_tower_thumbnail.jpg"
                    },
                    {
                        "name": "Louvre Museum",
                        "type": "Museum",
                        "description": "One of the largest and most visited art museums in the world, home to the Mona Lisa and other masterpieces.",
                        "opening_hours": "9:00 AM - 6:00 PM",
                        "thumbnail": "https://www.example.com/louvre_museum_thumbnail.jpg"
                    }
                ]
            },
            {
                "id": 2,
                "cityName": "New York",
                "countryName": "United States",
                "countryCode": "US",
                "countryDescription": "The United States of America, commonly known as the United States or America, is a country primarily located in North America. It is known for its cultural, economic, and political influence worldwide.",
                "currency": "United States Dollar (USD)",
                "cityDescription": "New York City, often referred to simply as NYC, is the most populous city in the United States. It's known for its iconic skyline, diverse culture, and bustling atmosphere.",
                "cityThumbnail": "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "points_of_interest": [
                    {
                        "name": "Statue of Liberty",
                        "type": "Monument",
                        "description": "Iconic symbol of freedom and democracy, a gift from France to the United States.",
                        "opening_hours": "8:30 AM - 4:30 PM",
                        "thumbnail": "https://www.example.com/statue_of_liberty_thumbnail.jpg"
                    },
                    {
                        "name": "Central Park",
                        "type": "Park",
                        "description": "The largest urban park in New York City, featuring lakes, trails, and recreational areas.",
                        "opening_hours": "Always open",
                        "thumbnail": "https://www.example.com/central_park_thumbnail.jpg"
                    }
                ]
            },
            {
                "id": 3,
                "cityName": "Rome",
                "countryName": "Italy",
                "countryCode": "IT",
                "countryDescription": "Italy, officially the Italian Republic, is a country consisting of a peninsula delimited by the Alps and surrounded by several islands. It is known for its art, culture, history, and cuisine.",
                "currency": "Euro (EUR)",
                "cityDescription": "Rome, the capital city of Italy, is a treasure trove of history, art, and architecture. It's home to iconic landmarks such as the Colosseum, the Vatican City, and the Trevi Fountain.",
                "cityThumbnail": "https://www.example.com/rome_thumbnail.jpg",
                "points_of_interest": [
                    {
                        "name": "Colosseum",
                        "type": "Monument",
                        "description": "Historic amphitheater used for public spectacles and gladiatorial contests in ancient Rome.",
                        "opening_hours": "8:30 AM - 7:00 PM",
                        "thumbnail": "https://www.example.com/colosseum_thumbnail.jpg"
                    },
                    {
                        "name": "Trevi Fountain",
                        "type": "Fountain",
                        "description": "The largest Baroque fountain in Rome, known for tossing coins to ensure a return to the city.",
                        "opening_hours": "Always open",
                        "thumbnail": "https://www.example.com/trevi_fountain_thumbnail.jpg"
                    }
                ]
            },
            {
                "id": 4,
                "cityName": "Tokyo",
                "countryName": "Japan",
                "countryCode": "JP",
                "countryDescription": "Japan is an island country in East Asia known for its distinct culture, advanced technology, and rich history. Tokyo, the capital city, is a bustling metropolis famous for its skyscrapers, shopping districts, and cultural landmarks.",
                "currency": "Japanese Yen (JPY)",
                "cityDescription": "Tokyo, the capital city of Japan, is a vibrant and dynamic metropolis that seamlessly blends modernity with tradition. From neon-lit streets and towering skyscrapers to serene temples and tranquil gardens, Tokyo offers a diverse range of experiences for visitors.",
                "cityThumbnail": "https://www.example.com/tokyo_thumbnail.jpg",
                "points_of_interest": [
                    {
                        "name": "Tokyo Tower",
                        "type": "Monument",
                        "description": "Iconic communications and observation tower in Tokyo, offering panoramic views of the city skyline.",
                        "opening_hours": "9:00 AM - 11:00 PM",
                        "thumbnail": "https://www.example.com/tokyo_tower_thumbnail.jpg"
                    },
                    {
                        "name": "Senso-ji Temple",
                        "type": "Temple",
                        "description": "Oldest and most significant Buddhist temple in Tokyo, attracting millions of visitors annually.",
                        "opening_hours": "6:00 AM - 5:00 PM",
                        "thumbnail": "https://www.example.com/sensoji_temple_thumbnail.jpg"
                    }
                ]
            },
            {
                "id": 5,
                "cityName": "London",
                "countryName": "United Kingdom",
                "countryCode": "GB",
                "countryDescription": "The United Kingdom (UK), made up of England, Scotland, Wales, and Northern Ireland, is an island nation in northwestern Europe. London, the capital city, is a global financial hub and cultural center known for its historic landmarks, diverse communities, and vibrant arts scene.",
                "currency": "British Pound Sterling (GBP)",
                "cityDescription": "London, the capital city of the United Kingdom, is a melting pot of cultures and a city steeped in history. From iconic landmarks such as Big Ben and the Tower of London to world-class museums and theaters, London offers endless opportunities for exploration and discovery.",
                "cityThumbnail": "https://www.example.com/london_thumbnail.jpg",
                "points_of_interest": [
                    {
                        "name": "Big Ben",
                        "type": "Landmark",
                        "description": "Iconic clock tower and symbol of London, located at the north end of the Palace of Westminster.",
                        "opening_hours": "Not open to the public",
                        "thumbnail": "https://www.example.com/big_ben_thumbnail.jpg"
                    },
                    {
                        "name": "British Museum",
                        "type": "Museum",
                        "description": "One of the world's largest and most comprehensive museums, showcasing artifacts from around the globe.",
                        "opening_hours": "10:00 AM - 5:30 PM",
                        "thumbnail": "https://www.example.com/british_museum_thumbnail.jpg"
                    }
                ]
            },
            {
                "id": 6,
                "cityName": "Sydney",
                "countryName": "Australia",
                "countryCode": "AU",
                "countryDescription": "Australia is a vast and diverse country located in the Southern Hemisphere, known for its stunning landscapes, unique wildlife, and laid-back lifestyle. Sydney, the largest city, is famous for its iconic landmarks, beautiful beaches, and vibrant culture.",
                "currency": "Australian Dollar (AUD)",
                "cityDescription": "Sydney, the capital city of New South Wales, is a dynamic and cosmopolitan metropolis with something for everyone. From the iconic Sydney Opera House and Harbour Bridge to the beautiful Bondi Beach and bustling markets, Sydney offers a mix of attractions that cater to every taste.",
                "cityThumbnail": "https://www.example.com/sydney_thumbnail.jpg",
                "points_of_interest": [
                    {
                        "name": "Sydney Opera House",
                        "type": "Landmark",
                        "description": "Iconic performing arts center and architectural masterpiece, situated on Sydney Harbour.",
                        "opening_hours": "Varies by event",
                        "thumbnail": "https://www.example.com/sydney_opera_house_thumbnail.jpg"
                    },
                    {
                        "name": "Bondi Beach",
                        "type": "Beach",
                        "description": "Famous stretch of golden sand and world-renowned surf destination, attracting visitors from around the globe.",
                        "opening_hours": "Always open",
                        "thumbnail": "https://www.example.com/bondi_beach_thumbnail.jpg"
                    }
                ]
            },
            {
                "id": 7,
                "cityName": "Rio de Janeiro",
                "countryName": "Brazil",
                "countryCode": "BR",
                "countryDescription": "Brazil, officially the Federative Republic of Brazil, is the largest country in both South America and Latin America. It is known for its diverse culture, natural beauty, and vibrant festivals. Rio de Janeiro, the second-largest city, is famous for its stunning beaches, lively nightlife, and iconic landmarks.",
                "currency": "Brazilian Real (BRL)",
                "cityDescription": "Rio de Janeiro, often simply referred to as Rio, is a city of contrasts, where lush mountains meet pristine beaches and bustling urban life coexists with tranquil natural surroundings. From the iconic Christ the Redeemer statue to the vibrant Carnival celebrations, Rio offers a unique and unforgettable experience for visitors.",
                "cityThumbnail": "https://www.example.com/rio_de_janeiro_thumbnail.jpg",
                "points_of_interest": [
                    {
                        "name": "Christ the Redeemer",
                        "type": "Monument",
                        "description": "Iconic Art Deco statue of Jesus Christ, located atop the Corcovado mountain with panoramic views of the city.",
                        "opening_hours": "8:00 AM - 7:00 PM",
                        "thumbnail": "https://www.example.com/christ_the_redeemer_thumbnail.jpg"
                    },
                    {
                        "name": "Copacabana Beach",
                        "type": "Beach",
                        "description": "World-famous beach stretching for 4 km along the coast, known for its golden sands, bustling promenade, and lively atmosphere.",
                        "opening_hours": "Always open",
                        "thumbnail": "https://www.example.com/copacabana_beach_thumbnail.jpg"
                    }
                ]
            },
            {
                "id": 8,
                "cityName": "Dubai",
                "countryName": "United Arab Emirates",
                "countryCode": "AE",
                "countryDescription": "The United Arab Emirates (UAE) is a federation of seven emirates located on the southeastern coast of the Arabian Peninsula. It is known for its modern architecture, luxury shopping, and vibrant nightlife. Dubai, the largest and most populous city, is a global hub for business, tourism, and entertainment.",
                "currency": "United Arab Emirates Dirham (AED)",
                "cityDescription": "Dubai, the city of superlatives, is a futuristic metropolis where skyscrapers pierce the sky and artificial islands dot the coastline. From the towering Burj Khalifa and luxurious shopping malls to the traditional souks and desert adventures, Dubai offers a unique blend of modernity and tradition.",
                "cityThumbnail": "https://www.example.com/dubai_thumbnail.jpg",
                "points_of_interest": [
                    {
                        "name": "Burj Khalifa",
                        "type": "Landmark",
                        "description": "Tallest building in the world, offering breathtaking views of the city skyline from its observation decks.",
                        "opening_hours": "8:30 AM - 11:00 PM",
                        "thumbnail": "https://www.example.com/burj_khalifa_thumbnail.jpg"
                    },
                    {
                        "name": "The Dubai Mall",
                        "type": "Shopping Mall",
                        "description": "Largest mall in the world by total area, featuring over 1,200 shops, an indoor aquarium, and an ice rink.",
                        "opening_hours": "10:00 AM - 12:00 AM",
                        "thumbnail": "https://www.example.com/dubai_mall_thumbnail.jpg"
                    }
                ]
            }
        ]
    }



    res.send(citiesData);
})

module.exports = router