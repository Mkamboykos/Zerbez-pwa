DOCKER COMMANDS

------------------------------------------------------------------------------------------

- See docker images
docker ps -a

------------------------------------------------------------------------------------------

- Build docker image
docker build -f Dockerfile -t zerbez-server .

------------------------------------------------------------------------------------------

- Run docker image using Powershell, restart everytime container crashes
docker run -v ${pwd}:/app:ro -it -p 3001:3001 --restart unless-stopped zerbez-server

or 

- Run docker image using windows cmd, restart everytime container crashes
docker run -e CHOKIDAR_USEPOLLING=true -v %cd%:/app:ro -it -p 3001:3001 --restart unless-stopped zerbez-server

or

- Run docker image using linux or linux, restart everytime container crashes
docker run -v $(pwd):/app:ro -it -p 3001:3001 --restart unless-stopped zerbez-server

------------------------------------------------------------------------------------------

- Go into Docker container
docker exec -it zerbez-server

------------------------------------------------------------------------------------------

- Remove Docker image
docker rm zerbez-server -f

------------------------------------------------------------------------------------------

- Setup auto restart unless stopped, on an already running docker image
docker update --restart unless-stopped [container_id]