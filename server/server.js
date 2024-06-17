import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';
import { schema, rootResolver } from './controller/graphqlController.js'; // Adjust the path as needed

dotenv.config();
const app = express();

///convert the CommonJS syntax (require) to ES6 module syntax (import),

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// Create and use the GraphQL handler
app.all(
    "/graphql",
    createHandler({
        schema,
        rootValue: rootResolver,
    })
);

// Serve the GraphiQL IDE
app.get("/", (_req, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/graphql" }));
});

// const PORT = process.env.PORT || 3001;
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
});
