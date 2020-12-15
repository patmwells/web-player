dev:
	docker-compose up --build app
shell:
	docker-compose exec app sh
tests-watch:
	docker-compose exec app npm run test:unit:watch
tests-browser-watch:
	docker-compose exec app npm run test:browser:watch
debug:
	docker-compose run --service-ports --rm app sh
lint:
	docker-compose run --rm app npm run lint
tests:
	docker-compose run --rm app npm run test:unit
tests-browser:
	docker-compose up --build browser-tests
prod:
	docker-compose -f docker-compose.yml up --build app
build:
	docker-compose -f docker-compose.yml build --force-rm app
clean:
	docker-compose down --remove-orphans --rmi all
	docker-compose -f docker-compose.yml down --remove-orphans --rmi all
	docker image prune --force
hooks:
	cp -R .hooks/ .git/hooks
	chmod -R +x .git/hooks
