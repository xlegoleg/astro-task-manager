PROJECT_NAME=astro-task_manager

up:
	docker-compose up --build -d

down:
	docker-compose down

prisma-generate:
	docker-compose exec frontend npx prisma generate

migrate-dev:
	docker-compose exec frontend npx prisma migrate dev