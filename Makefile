DEPLOY_HOST ?= 185.183.156.64
DEPLOY_USER ?= deploy
DEPLOY_PATH ?= /var/www/formacode-bot

.PHONY: deploy

deploy:
	ssh -t "$(DEPLOY_USER)@$(DEPLOY_HOST)" 'cd "$(DEPLOY_PATH)" && .venv/bin/python deploy/update.py --config deploy/apps.local.toml'
