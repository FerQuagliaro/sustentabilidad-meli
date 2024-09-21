# Meli Sustentabilidad

## Guidelines for devs

Requisites

- Docker
- Docker Compose
- Node
- NPM
- Make (optional for use makefile)

## Prepare stack

You need create env files for run app stack (docker, front-end and back-end)

- Front end

```sh
cd frontend
cp .example.env .env.local
vim .env.local
# changes values for you use
```

### For install dependencies

```sh
make install <frontend | backend>

# for install frontend deps ex:
make install frontend
```

### First time

```sh
make infra-build
```

### Start stack

```sh
make start
```

### Start front

```sh
make start-front
```

### Start back

```sh
make start-back
```

### Stop app

```sh
make stop
```

### In case of error start clean app

```sh
make start-clean
# this command recreate container for docker-compose
```

### Terraform

`terraform init` -> Si nunca se corrió en el proyecto hay que correrlo para inicializar el código del main.tf
`terraform plan` -> Te muestra lo que haría para lograr lo que define el código. Si se hicieron cambios por fuera esto debería detectarlos y actualizar la task definition
`terraform apply` -> Aplica los cambios que hagan falta

### Deploy

Produccion


Staging


```
./deploy.sh {frontend | backend} {version}
```
