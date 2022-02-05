# node-app-http-docker

# Table of Contents


[What is node-app-http-docker ?](what-is-node-app-http-docker--)
[How to run it ?](how-to-run-it--)
[How to Run / start docker ](how-to-run--start-docker--)
    * [Running docker](running-docker) 
    * [Verify docker Image](verifydocker-image) 
[Running docker Image](running-docker-image)
[Testing (is it workong](testing--is-it-working)
[STOPPING docker (running container)](stopping-docker--running-container--)


## What is node-app-http-docker ?

It is a working project (non Prod ready)

For getting started with a RESTFUL api server locally using [docker](https://docs.docker.com/)

- It 🏃runs a server (docker) using `nodejs` [v16] 
- Exposes following  RESTFUL endpoints ( no database required) with all **CRUD** operations
 
    - **GET**  (CRUD : C**Read**UD)
          - 0.0.0.0:8080/
          - 0.0.0.0:8080/health
          - 0.0.0.0:8080/api/todos
          - 0.0.0.0:8080/api/todos/`{id}`
    - **PATCH/PUT** (CRUD : CR**Update**D)
          - 0.0.0.0:8080/api/todos/`{id}`
    - **POST** {with body} (CRUD : **Create**RUD)
          - 0.0.0.0:8080/api/todos
    - **DELETE** (CRUD : CRU**Delete**)
          - 0.0.0.0:8080/api/todos/`{id}`   
 
 - You may get 3 types of **response**
 
  |Response `Code`  | Response `Status` |
  |:---------------:|:-----------------:|
  |     **200**     |       `OK`        |
  |     **201**     |     `Created`     |
  |     **404**     |    `Not Found`    |
  

## How to run it ?

Clone the repository on your machine

|via **https** | via **ssh** |
|:---:|:---:|
|`git clone https://github.com/eaccmk/node-app-http-docker.git`|`git clone git@github.com:eaccmk/node-app-http-docker.git` |

Get into the cloned repo ☝️ like this 👇

```
cd node-app-http-docker
```

💡 Prequisite / Assumption
- You have`docker` installed and running on your machine.

If not, its highly recomended to [Get docker](https://docs.docker.com/get-docker/)

## How to Run / start docker 

### Running docker 

```
docker build . -t node-app-http-docker
```

To know why I used `-t Allocate a pseudo-TTY` read this [stackoverflow thread](https://stackoverflow.com/a/40026942)

### Verify docker Image

After `docker build` is completed, verify if a docker image is created and listed

run `docker images`

```
docker images
Emulate Docker CLI using podman. Create /etc/containers/nodocker to quiet msg.
REPOSITORY                      TAG         IMAGE ID      CREATED         SIZE
localhost/node-app-http-docker  latest      8f74146744df  18 minutes ago  928 MB
```
 > You may have more than one row in result, but make sure you have the one with  **REPOSITORY** `localhost/node-app-http-docker`

also see you got a random (uniqie) **IMAGE ID** assigned to the image you just created, in my case it was `8f74146744df`

## Running docker Image

Now that you have a image ID, lets run that image


```
docker run -p 8080:8080 8f74146744df
```

`docker run -p <your-port-external>:<docker-internal-port-exposed-for-access> IMAGE_ID`

For more details on `-p`  read [**Publish or expose port (-p, --expose)**🔗](https://docs.docker.com/engine/reference/commandline/run/#publish-or-expose-port--p---expose) 

❗ open a new tab and verify this docker (running)

```
docker ps
```

## Testing (is it workong ❓)

Lets hit the docker image as a **client** / **User** 
 1. From a new terminal tab; or
 2. Browser


> 1. From a new terminal tab

```
curl 0.0.0.0:8080
```

you should see this  :

> Welcome, this is your Home page

**SERVER** On previous tab ( where you ran `docker run ...`)

```
CalledGET : /
```


❎ Now lets try to hit an invalid endpoint


```
http://0.0.0.0:8080/dascbajb
```

or 

As a user you will get `404`

```
{"message":"Route not found"}
```


**Server** (docker run tab)
```
CalledGET : /dascbajb
This endpoint is not implemented / unavailable at the moment !!
```

✅ lets try one more 

```
http://0.0.0.0:8080/health
```

You will see something like 
```
{"uptime":29.560686169,"message":"OK","timestamp":1644057630652}node-app-http-docker $
```

**Server** (docker run tab)
```
CalledGET : /health
```


## STOPPING docker (docker container)

firts lets find the  runing one
`docker ps`

```
CONTAINER ID  IMAGE                                  COMMAND      CREATED            STATUS                 PORTS                   NAMES
a5a149a53466  localhost/node-app-http-docker:latest  node app.js  About an hour ago  Up About a minute ago  0.0.0.0:8080->8080/tcp  ecstatic_cray
```

see the status column : **STATUS**
```
Up About a minute ago
```

Run 👉 
Using **CONTAINER ID** `docker stop a5a149a5346` 
or

Using **NAMES** `docker stop ecstatic_cray`


and after that (to double confirm) run `docker ps` it should show no running image 

```
docker ps
CONTAINER ID  IMAGE       COMMAND     CREATED     STATUS      PORTS       NAMES
```






