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

# Start test server
server.start-test:
	$(MAKE) docker-compose-up
	npm run start:test

# Kill server on port 3000
server.kill:
	lsof -ti :3000 | xargs kill -9

# ----------------------
# db
# ----------------------

# Bootstrap databases and run migrations
db.bootstrap:
	$(MAKE) docker-compose-up
	$(MAKE) db.bootstrap-dev
	$(MAKE) db.bootstrap-test
	$(MAKE) db.migrate

# Bootstrap dev database
db.bootstrap-dev:
	docker compose run --rm database bash -c ' \
		export PGPASSWORD="dbpassword"; \
		dropdb --if-exists -U dbuser -h database nestjs-clean-architecture-starter-db-dev; \
		createdb -U dbuser -h database nestjs-clean-architecture-starter-db-dev; \
	'

# Bootstrap test database
db.bootstrap-test:
	docker compose run --rm database bash -c ' \
		export PGPASSWORD="dbpassword"; \
		dropdb --if-exists -U dbuser -h database nestjs-clean-architecture-starter-db-test; \
		createdb -U dbuser -h database nestjs-clean-architecture-starter-db-test; \
	'

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

# Run unit tests
tests.unit:
	npm run test:unit

# Run integrations tests
tests.integration:
	$(MAKE) db.bootstrap-test
	$(MAKE) db.migrate
	$(MAKE) docker-compose-up
	nohup npm run start:test &
	@sleep 2
	npm run test:integration $(ARGS)
	$(MAKE) server.kill
	$(MAKE) db.bootstrap-test

# Run test coverage
tests.cov:
	npm run test:cov
