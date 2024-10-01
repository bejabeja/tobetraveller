## T0BEATRAVELLER

Web platform that will serve as a showcase of cities from around the world and will provide itinerary recommendations. 
Registered users will be able to add cities they have visited and share itinerary recommendations for each day of their trip. Additionally, on each user's profile, they will be able to view their saved trips and create personalized itineraries without the need to share them with others.

## Project State

🚧 **In Progress** 🚧

This project is currently under development. Some functionalities may not be fully implemented and significant changes to the structure and code may occur.

## Table of Contents
1. [Installation](#installation)
2. [Technologies Used](#technologiesUsed)
3. [License](#license)

## Installation

The project is organized into two main folders: `client` and `server`. The `client` folder contains all the frontend logic, while the `server` folder contains all the backend logic.

To set up and run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/bejabeja/tobetraveller.git
   cd tobeatraveller
   ```


2. First, install all necessary dependencies for both the client and server:

   ```bash
   make install
   ```

3. Now you can use the Makefile to easily start or stop both the client and server:

- To start both the client and server, run:
   ```bash
   make start
   ```

- To stop both processes and free the ports, run:
   ```bash
   make stop
   ```

4. Access the application:

Once both processes are running, you can access the application in your browser at [http://localhost:3000](http://localhost:3000)


The page will reload if you make edits.\
You will also see any lint errors in the console.


## Technologies Used

- **React.js**: For building the interactive user interface.
- **Node.js**: Backend server-side operations and scripting.
- **Express**: To create web servers and APIs by handling routes, HTTP requests, and middleware.
- **CSS3**: For website design and styles.
- **Git**: For version control of the project.
- **Vercel**: For deployment and hosting of the website in production.
- **PostgreSQL**: Database management and storage. (Supabase)


# License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Summary of the MIT License
- You are free to use, modify, and distribute this project.
- You must include the original license in any copies or substantial portions of the software.
- The software is provided "as is", without warranty of any kind.

For more detailed information, please refer to the full text of the MIT License in the [LICENSE](LICENSE) file.


<!-- ## Preview

[T0BEATRAVELLER](https://www.tobeatraveller.com/) -->