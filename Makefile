.PHONY: app

app:
	docker-compose up --build --force-recreate app
shell:
	docker-compose exec app /bin/sh
tests-watch:
	docker-compose exec app npm run test:unit:watch
tests-browser-watch:
	docker-compose exec app npm run test:browser:watch
debug:
	docker-compose run --service-ports --rm app /bin/sh
prod:
	docker-compose -f docker-compose.yml up --build --force-recreate app
build:
	docker-compose -f docker-compose.yml build --no-cache --force-rm app
clean:
	docker-compose down --remove-orphans --rmi all
	docker-compose -f docker-compose.yml down --remove-orphans --rmi all
	docker image prune --force
hooks:
	cp -R .hooks/ .git/hooks
	chmod -R +x .git/hooks
