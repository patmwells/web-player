dev:
	docker-compose up --build --force-recreate
lint:
	docker-compose exec app npm run lint
tests:
	docker-compose exec app npm run test:unit
tests-watch:
	docker-compose exec app npm run test:unit:watch
tests-browser:
	docker-compose exec app npm run test:browser
tests-browser-watch:
	docker-compose exec app npm run test:browser:watch
shell:
	docker-compose exec app /bin/sh
env:
	docker-compose run --service-ports --rm app /bin/sh
hooks:
	cp -R .hooks/ .git/hooks
	chmod -R +x .git/hooks
pre-commit:
	docker-compose run --rm app npm run lint
	docker-compose run --rm app npm run test:unit
prod:
	docker-compose -f docker-compose.yml up --build --force-recreate
clean:
	docker-compose down --remove-orphans --rmi all
	docker-compose -f docker-compose.yml down --remove-orphans --rmi all
	docker image prune --force
