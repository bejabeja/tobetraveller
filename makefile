.PHONY: start-client start-server start

start-client:
	cd client && npm start

start-server:
	cd server && npm start

start: start-client start-server
	wait


#lsof -i :3001 //check port
#kill -9 (PIDNUMBER) //kill port