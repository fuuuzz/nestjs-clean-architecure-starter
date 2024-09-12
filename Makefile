docker-compose-up:
	docker compose up --detach --wait

start:
	$(MAKE) docker-compose-up
	npm start

start-dev:
	$(MAKE) docker-compose-up
	npm run start:dev
