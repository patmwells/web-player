.PHONY: app

app:
	docker-compose up --build --force-recreate app
shell:
	docker-compose exec app /bin/sh
tests-watch:
	docker-compose exec app npm run test:unit:watch
tests-browser-watch:
	docker-compose exec app npm run test:browser:watch
lint:
	docker-compose run --rm app npm run lint
tests:
	docker-compose run --rm app npm run test:unit
debug:
	docker-compose run --service-ports --rm app /bin/sh
prod:
	docker-compose -f docker-compose.yml up --build --force-recreate
clean:
	docker-compose down --remove-orphans --rmi all
	docker-compose -f docker-compose.yml down --remove-orphans --rmi all
	docker image prune --force
hooks:
	cp -R .hooks/ .git/hooks
	chmod -R +x .git/hooks
