# URL Shortener Project

A full-stack URL shortener application built with Next.js for the frontend and NestJS for the backend, utilizing PostgreSQL as the database and Docker for containerization.

## Prerequisites

Make sure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started) (with Docker Compose)

---

## Quick Start with Docker

### Steps:

1. **Clone the Repository**
   Clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   cd deep-origin-task
   ```

2. **Set Up Environment Variables**
   Copy the provided `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Modify the `.env` file as needed to customize values like database credentials, ports, and application URLs.

3. **Run the Application**
   Start the containers:
   ```bash
   docker-compose up --build
   ```

4. **Access the Application**
   Once the containers are successfully launched, access the application:
  - **Frontend**: [http://localhost:4000](http://localhost:4000)
  - **Backend API**: [http://localhost:3005](http://localhost:3005)
  - **PostgreSQL Database**: Available at `localhost:5433`. Use the credentials specified in the `.env` file.
# deep-origin-task
