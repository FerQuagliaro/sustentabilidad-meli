# If the first argument is "install"...
ifeq (install,$(firstword $(MAKECMDGOALS)))
  # use the rest as arguments for "run"
  RUN_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(RUN_ARGS):;@:)
endif

deps:
ifeq ($(RUN_ARGS), frontend)
	cd $(RUN_ARGS) && npm install
endif
ifeq ($(RUN_ARGS), backend)
	cd $(RUN_ARGS) && npm install
endif
ifeq ($(RUN_ARGS),)
	@echo "missing arguments make install, accept frontend or backend"
endif

.PHONY: install
install: deps
	@echo $(RUN_ARGS)

infra-build:
	docker-compose build

start:
	docker-compose up -d

start-front:
	docker-compose up -d frontend

start-back:
	docker-compose up -d strapi

start-clean:
	docker-compose up -d --force-recreate

stop:
	docker-compose down

logs:
	docker-compose logs -f