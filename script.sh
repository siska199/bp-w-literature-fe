docker build -t literature-fe/v1 .

docker run --name c-literature-fe --volume=${PWD}:/kyuuchan199/literature-fe -p 3001:3001 literature-fe/v1