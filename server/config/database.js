import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const client = new Pool({
    connectionString: process.env.POSTGRES_URL,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000,
});

client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(error => console.error('Error connecting to PostgreSQL database:', error));

// async function createUsersTable() {
//     try {
//         await client.connect();
//         const query = `
//                 CREATE TABLE IF NOT EXISTS users (
//                     user_id SERIAL PRIMARY KEY, 
//                     email VARCHAR(255), 
//                     username VARCHAR(255) UNIQUE, 
//                     password VARCHAR(255),
//                     followers INT DEFAULT 0,
//                     following INT DEFAULT 0,
//                     favorite_cities INTEGER[] DEFAULT '{}'::INTEGER[]
//                 )
//               `;

//         await client.query(query);

//         console.log('Table "users" created successfully');
//     } catch (error) {
//         console.error('Error creating users table:', error);
//     }
// }

// async function createTokensTable() {
//     try {
//         await client.connect();
//         const query = `
//             CREATE TABLE IF NOT EXISTS tokens (
//               id SERIAL PRIMARY KEY,
//               refresh_token TEXT NOT NULL,
//               created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
//             )
//           `;

//         await client.query(query);
//         console.log('Table "tokens" created successfully');
//     } catch (error) {
//         console.error('Error creating tokens table:', error);
//     }
// }

// async function createPostsTable() {
//     try {
//         await client.connect();
//         const query = `
//                 CREATE TABLE IF NOT EXISTS posts(
//                     post_id SERIAL PRIMARY KEY,
//                     user_id INT NOT NULL,
//                     content TEXT NOT NULL,
//                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                     FOREIGN KEY (user_id) REFERENCES users(user_id)
//                 );
//               `;

//         await client.query(query);

//         console.log('Table "posts" created successfully');
//     } catch (error) {
//         console.error('Error creating posts table:', error);
//     }
// }

// async function createCommentsTable() {
//     try {
//         await client.connect();
//         const query = `
//                 CREATE TABLE IF NOT EXISTS comments(
//                     comment_id SERIAL PRIMARY KEY,
//                     post_id INT NOT NULL,
//                     user_id INT NOT NULL,
//                     content TEXT NOT NULL,
//                     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                     FOREIGN KEY(post_id) REFERENCES posts(post_id),
//                     FOREIGN KEY(user_id) REFERENCES users(user_id)
//                 );
//               `;

//         await client.query(query);

//         console.log('Table "comments" created successfully');
//     } catch (error) {
//         console.error('Error creating comments table:', error);
//     }
// }

// async function createRelationshipsTable() {
//     try {
//         await client.connect();
//         const query = `
//                 CREATE TABLE IF NOT EXISTS relationships (
//                     relationship_id SERIAL PRIMARY KEY,
//                     follower_id INT NOT NULL,
//                     following_id INT NOT NULL,
//                     follow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                     notifications_enabled BOOLEAN DEFAULT TRUE,
//                     FOREIGN KEY (follower_id) REFERENCES users(user_id),
//                     FOREIGN KEY (following_id) REFERENCES users(user_id),
//                     CONSTRAINT unique_relationship UNIQUE (follower_id, following_id)
//                 );
//               `;

//         await client.query(query);

//         console.log('Table "relationships" created successfully');
//     } catch (error) {
//         console.error('Error creating relationships table:', error);
//     }
// }

// async function createCitiesTable() {
//     try {
//         await client.connect();
//         const query = `
//         CREATE TABLE IF NOT EXISTS cities (
//             id SERIAL PRIMARY KEY,
//             city_name VARCHAR(100),
//             country_name VARCHAR(100),
//             country_code VARCHAR(10),
//             country_description TEXT,
//             currency VARCHAR(10),
//             city_description TEXT,
//             city_thumbnail TEXT
//         );
//         `
//         await client.query(query);

//         console.log('Table "Cities" created successfully');
//     } catch (error) {
//         console.error('Error creating Cities table:', error);
//     }
// }


// async function createPointOfInterestTable() {
//     try {
//         await client.connect();
//         const query = `
//             CREATE TABLE IF NOT EXISTS points_of_interest (
//                 id SERIAL PRIMARY KEY,
//                 city_id INTEGER REFERENCES cities(id),
//                 name VARCHAR(100),
//                 type VARCHAR(50),
//                 description TEXT,
//                 opening_hours VARCHAR(50),
//                 thumbnail TEXT
//             );
//         `
//         await client.query(query);

//         console.log('Table "PointOfInterest" created successfully');
//     } catch (error) {
//         console.error('Error creating PointOfInterest table:', error);
//     }
// }



// createUsersTable();
// createTokensTable();
// createPostsTable();
// createCommentsTable();
// createRelationshipsTable();
// createCitiesTable();
// createPointOfInterestTable();

export default client;