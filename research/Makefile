SHELL := /bin/bash
PWD := $(shell pwd)

default: docker-compose-up

all:

docker-image:
	docker build -f ./Dockerfile -t "python-numpy:latest" .
.PHONY: docker-image

docker-compose-up: docker-image
	docker-compose -f ./docker-compose.yaml up --build
.PHONY: docker-compose-up

docker-compose-down:
	docker-compose -f ./docker-compose.yaml stop -t 1
	docker-compose -f ./docker-compose.yaml down
.PHONY: docker-compose-down

docker-compose-logs:
	docker-compose -f ./docker-compose.yaml logs -f
.PHONY: docker-compose-logs