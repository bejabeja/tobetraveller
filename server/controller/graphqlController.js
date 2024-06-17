import { buildSchema } from 'graphql';
import { getAllCities, getCityById } from '../infrastructure/citiesRepositories.js';

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type City {
        id: Int!
        cityName: String!
    }

    type Query {
        cityById(id: Int!): City
        allCities: [City]!
    }
`);

const rootResolver = {
    cityById: ({ id }) => getCityById(id),
    allCities: () => getAllCities(),
};

export { schema, rootResolver };