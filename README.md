# DBAI ChatBot

## Description

This is a simple chatbot that can answer questions about the database project using OpenAI (gpt-4o-mini model), including listings queries and metrics data.

### Technologies

- TypeScript
- PostgreSQL
- Redis
- OpenAI
- Docker

### Features

- [x] Dockerized PostgreSQL and Redis databases
- [x] AI model to create SQL queries based on the questions
- [x] Chatbot ai that answers questions about the database project
- [x] API to get dbai responses
- [x] Redis cache to store the chatbot responses
- [x] Retrieval cache with vector similarity search 

### Usage

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Clone the `.env.example` file and rename it to `.env`, adding the necessary environment variables like the OpenAI API key
4. Run `docker-compose up` to start the databases
5. Run `npm run dev` to start the chatbot
6. Go to `http://localhost:3000/chat/dbai` to interact with the chatbot (look in the `migrations/ddl.sql` file to base your questions)
