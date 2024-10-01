kill-client-port:
	@echo "Killing any process running on port 3000..."
	@fuser -k 3000/tcp || echo "No process found on port 3000."

kill-server-port:
	@echo "Killing any process running on port 3000..."
	@fuser -k 3001/tcp || echo "No process found on port 3000."

start-client: kill-client-port
	@echo "Starting client..."
	cd client && npm start

start-server: kill-server-port
	@echo "Starting server..."
	cd server && npm start

start:
	@$(MAKE) start-client &
	@$(MAKE) start-server &
	@wait
	@echo "Both client and server started in parallel."

stop: kill-client-port kill-server-port

install:
	@echo "Installing dependencies for client and server..."
	@cd client && npm install
	@cd server && npm install
	@echo "All dependencies installed."

#lsof -i :3001 //check port
#kill -9 (PIDNUMBER) //kill port