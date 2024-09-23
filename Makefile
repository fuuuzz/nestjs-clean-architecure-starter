# Docker compose
docker-compose-up:
	docker compose up --detach --wait

# ----------------------
# servers
# ----------------------

# Start server
server.start:
	$(MAKE) docker-compose-up
	npm start

# Start dev server
server.start-dev:
	$(MAKE) docker-compose-up
	npm run start:dev

# ----------------------
# db
# ----------------------

# Bootstrap databases and run migrations
db.bootstrap:
	$(MAKE) docker-compose-up

	docker compose run --rm database bash -c ' \
		export PGPASSWORD="dbpassword"; \
		dropdb --if-exists -U dbuser -h database nestjs-clean-architecture-starter-db-dev; \
		createdb -U dbuser -h database nestjs-clean-architecture-starter-db-dev; \
	'

	docker compose run --rm database bash -c ' \
		export PGPASSWORD="dbpassword"; \
		dropdb --if-exists -U dbuser -h database nestjs-clean-architecture-starter-db-test; \
		createdb -U dbuser -h database nestjs-clean-architecture-starter-db-test; \
	'

	$(MAKE) db.migrate

# Start new shell in database container
db.shell:
	docker compose run --rm database bash -c ' \
		export PGPASSWORD="dbpassword"; \
		psql -U dbuser -h database -d nestjs-clean-architecture-starter-db-dev; \
	'
# Generate a new database migration
db.generate-migration:
	npm run migration:generate src/infrastructure/persistence/migrations/$(NAME)

# Run all database migrations
db.migrate:
	npm run migration:migrate
	npm run migration:migrate:test

# ----------------------
# tests
# ----------------------

# Run tests
tests:
	npm run test

# Run unit tests
tests.unit:
	npm run test:unit

# Run integrations tests
tests.integration:
	npm run test:integration

# Run test coverage
tests.cov:
	npm run test:cov
