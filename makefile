default:
	@docker build -t decentral1se/biobulkbende.org:latest . && \
	docker push decentral1se/biobulkbende.org:latest && \
	docker context use biobulkbende.org && \
	docker stack rm biobulkbende_org && \
	sleep 5 && \
	docker system prune -fa && \
	sleep 3 && \
	docker stack deploy -c compose.yml biobulkbende_org
