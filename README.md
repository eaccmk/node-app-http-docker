# node-app-http-docker

# Table of Contents


1. [What is node-app-http-docker ❓](#what-is-node-app-http-docker-)
2. [Project setup 💼](#project-setup-)
3. [Running docker 🐋](#running-docker-)
   * [Verify docker Image 🖼️](#verify-docker-image-) 
4. [Running docker Image 🎽](#running-docker-image-)
5. [Testing (is it working) ✅ ❎](#testing-is-it-working-)
6. [STOPPING docker (running container) 🛑](#stopping-docker-docker-container-)
7. [MIT LICENSE 🛡️ ](#license-)


## What is node-app-http-docker ❓

It is a working project (non Prod ready)

For getting started with a RESTFUL api server locally using [docker](https://docs.docker.com/)

- It 🏃runs a server (docker) using `nodejs` [v20] - April 2024 
- Exposes following  RESTFUL endpoints ( no database required) with all **CRUD** operations

|**Rest API** call          | **CRUD** operation | REST endpoints|
|:----:                 |:----:           |:----:|
|**GET**                | **R**ead        | `http://0.0.0.0:8080/` <br /> `http://0.0.0.0:8080/health`  <br /> `http://0.0.0.0:8080/api/todos`  <br /> `http://0.0.0.0:8080/api/todos/{id}`|
|**PATCH/PUT**          | **U**pdate)     | `http://0.0.0.0:8080/api/todos/{id}`|
|**POST** {with body}   | **C**reate      | `http://0.0.0.0:8080/api/todos`|
|**DELETE**             | **D**elete      | `http://0.0.0.0:8080/api/todos/{id}` |

 
 - You may get 3 types of **response**
 
  |Response `Code`  | Response `Status` |
  |:---------------:|:-----------------:|
  |     **200**     |       `OK`        |
  |     **201**     |     `Created`     |
  |     **404**     |    `Not Found`    |
  

## Project setup 💼

Clone the repository on your machine

|**Using** | **Comand** |
|:---:|:---:|
|via **https**|```git clone https://github.com/eaccmk/node-app-http-docker.git``` |
|via **ssh**|```git clone git@github.com:eaccmk/node-app-http-docker.git``` |

```shell
cd node-app-http-docker
```

💡 Prequisite / Assumption
- You have`docker` installed and running on your machine.

If not, its highly recomended to [Get docker](https://docs.docker.com/get-docker/)

## Running docker compose 🐋🐋

```shell
docker compose up
```

### Running docker build and run 🐋

<details>
  <summary>Expand to see steps</summary>
  

 ```
docker build . -t node-app-http-docker
```


> To know why we used `-t Allocate a pseudo-TTY` read this [stackoverflow thread](https://stackoverflow.com/a/40026942)

### Verify docker Image 🖼️

After `docker build` is completed, verify if a docker image is created and listed

run `docker images`

```shell
docker images
REPOSITORY                      TAG         IMAGE ID      CREATED         SIZE
localhost/node-app-http-docker  latest      8f74146744df  18 minutes ago  928 MB
```
 > You may have more than one row in result, but make sure you have the one with  **REPOSITORY** `localhost/node-app-http-docker`

also see you got a random (uniqie) **IMAGE ID** assigned to the image you just created, in my case it was `8f74146744df`

## Running docker Image 🎽

Now that you have a **IMAGE ID**, lets run that image


```shell
docker run -p 8080:8080 8f74146744df
```

`docker run -p <your-port-external>:<docker-internal-port-exposed-for-access> IMAGE_ID`

For more details on `-p`  read [**Publish or expose port (-p, --expose)**🔗](https://docs.docker.com/engine/reference/commandline/run/#publish-or-expose-port--p---expose) 

❗ open a new tab on terminal and verify this docker (running)

```shell
docker ps
```
</details>



## Testing (is it working ✅ ❎)

Lets hit the docker image as a **client** / **User** 

|Test Type (Positive /Negative) |**CLIENT** On terminal | Response | **SERVER** (if Docker running with logs) | 
|:----:|:---:|:---:|:---:|
|✅ `Home Page` |`curl 0.0.0.0:8080`| *Welcome, this is your Home page* | `CalledGET : /`|
|❎ `Invalid endpoint`|`http://0.0.0.0:8080/dascbajb` |`{"message":"Route not found"}`|`CalledGET : /dascbajb`  <br /> This endpoint is not implemented / unavailable at the moment !!|
| ✅ `health check` | `http://0.0.0.0:8080/health` |`{"uptime":29.560686169,` <br /> `"message":"OK","timestamp":1644057630652}`|`CalledGET : /health`|


## STOPPING docker compose 🐋

```shell
docker compose down
```


### STOPPING docker (docker container) 🛑


<details>
  <summary>Expand to see steps</summary>


firts lets find the  runing one
`docker ps`

```shell
CONTAINER ID  IMAGE                                  COMMAND      CREATED            STATUS                 PORTS                   NAMES
a5a149a53466  localhost/node-app-http-docker:latest  node app.js  About an hour ago  Up About a minute ago  0.0.0.0:8080->8080/tcp  ecstatic_cray
```

see the status column : **STATUS**
```
Up About a minute ago
```

Stop using 👉 
1.**CONTAINER ID** 
    ```shell
    docker stop a5a149a5346
    ```
    
2.**NAMES** 
    ```shell
    docker stop ecstatic_cray
    ```
</details>


<br>

In case you want to confirm run `docker ps` it should show no running process under listed images

```shell
docker ps
CONTAINER ID  IMAGE       COMMAND     CREATED     STATUS      PORTS       NAMES
```


## License 🔰

**node-app-http-docker** was released under [MIT License](LICENSE)


