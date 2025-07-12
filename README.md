# URL Shortener Project

A full-stack URL shortener application built with Next.js for the frontend and NestJS for the backend, utilizing PostgreSQL as the database and Docker for containerization.

<img width="1703" height="865" alt="Screenshot 2025-07-12 at 20 48 29" src="https://github.com/user-attachments/assets/4646c8b6-d311-46cb-9340-269501b2e48c" />
<img width="1674" height="856" alt="Screenshot 2025-07-12 at 20 50 51" src="https://github.com/user-attachments/assets/326b73da-4829-4a8f-b477-34a0a1607116" />
<img width="1690" height="859" alt="Screenshot 2025-07-12 at 20 51 06" src="https://github.com/user-attachments/assets/aa291f3b-a580-4dd2-ab5f-f3417c81d83c" />
<img width="1668" height="859" alt="Screenshot 2025-07-12 at 20 51 15" src="https://github.com/user-attachments/assets/5982c7c7-4591-4feb-afed-192aa42a6a26" />

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
