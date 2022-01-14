DOCKER COMMANDS

------------------------------------------------------------------------------------------

- See docker images
docker ps

------------------------------------------------------------------------------------------

- Build docker image
docker build -f Dockerfile -t zerbez-server .

------------------------------------------------------------------------------------------

- Run docker image using Powershell
docker run -v ${pwd}:/app:ro -it -p 3000:3000 zerbez-server

or 

- Run docker image using windows cmd
docker run -e CHOKIDAR_USEPOLLING=true -v %cd%:/app:ro -it -p 3000:3000 zerbez-server

or

- Run docker image using linux or linux
docker run -v $(pwd):/app:ro -it -p 3000:3000 zerbez-server

------------------------------------------------------------------------------------------

- Go into Docker container 
docker exec -it zerbez-server

------------------------------------------------------------------------------------------

- Remove Docker image
docker rm zerbez-server -f

------------------------------------------------------------------------------------------