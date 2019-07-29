################
# DOCKER IMAGE #
################
IMAGE_NAME=serverless-vscode

################
#     VARS     #
################
stage=dev
region=us-east-1
container=payment-cards

################
# Entry Points #
################
prepare:
	rm -fr package && \
	npm run build && \
	cp package.json package/ && \
	cp serverless.yml ./package/ && \
	cd package/ && npm install --production --no-bin-links

send:
	cp serverless.yml ./package/ && \
	cd package/ && ../node_modules/.bin/serverless deploy -v -s $(stage) -r $(region)
send-local:
	npm run dev & \
	cd package/ && serverless offline start -r ${region} -s $(stage)

send-func:
	cd package/ && \
	../node_modules/.bin/serverless deploy -v -s $(stage) -r $(region) -f $(function)

deploy:
	rm -fr package && \
	npm run build && \
	mkdir package/layer && mkdir package/layer/nodejs && \
	cp serverless.yml ./package/ && \
	cp -r package.json package/layer/nodejs/ && \
	cd package/layer/nodejs && \
	npm install --production --no-bin-links && \
	cd ../.. && \
	../node_modules/.bin/serverless deploy -v -s $(stage) -r $(region)
remove:
	cd package/ && npm install --production --no-bin-links && \
	sls remove -v -s $(stage) -r $(region)

offline:
	rm -fr package && \
	npm run build -- -w & \
	cp package.json package/ && \
	cp serverless.yml ./package/ && \
	cd package/ && npm install --production --no-bin-links && \
	../node_modules/.bin/serverless offline -s $(stage)

run:
	make _check_run_start_or_attach

_check_run_start_or_attach:
	./checkcontainer.sh $(container)

_attach:
	docker exec -i -t $(container) /bin/bash	

_start_container:
	docker start $(container)

_run_container:
	docker run -d \
	-d \
	--link login-consent-hydra:hydra \
	-v /tmp/.X11-unix:/tmp/.X11-unix:rw \
	-v $${PWD}:/developer/project/ \
	-v ~/.aws:/developer/.aws \
	-v ~/.ssh:/developer/.ssh \
	-e DISPLAY=unix$${DISPLAY} \
	-p 5000:5000 \
	-p 3002:3002 \
	-p 3001:3001 \
	-p 8080:8080 \
	-p 4444:8083 \
	-p 8081:8081 \
	--device /dev/snd \
	--name $(container) \
	--net poc-consent-net \
	$(IMAGE_NAME)
	docker exec $(container) /developer/install-extensions.sh 
