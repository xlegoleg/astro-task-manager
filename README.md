
# Astro Task Manager

## Project Overview
Astro Task Manager is a task management application built using Astro and Prisma. It integrates a SQLite database for task data and provides an easy-to-use interface for managing tasks.

## Setup

### Prerequisites
- Docker
- Node.js
- Prisma

### Getting Started

1. Clone the repository:

    ```bash
    git clone <repository_url>
    cd astro-task_manager
    ```

2. Run in docker

    ```bash
    make up
    ```

3. Run locally:

    ```bash
    npm run init 
    npm run dev
    ```

### Docker Commands
- `make up`: Builds and starts the Docker containers in detached mode.
- `make down`: Stops and removes the Docker containers.
- `make prisma-generate`: Generates Prisma client using Docker.
- `make migrate-dev`: Applies the database migrations.

