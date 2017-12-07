# SMS-API

## Prerequisites

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/installation/) for other platforms

## Start
* Run `docker-compose up` to create and start the `app`, and `mongo` containers.
* POST http://localhost:3000/authenticate with body-data: {name: "", password: ""}
* GET  http://localhost:3000/api/* with header xxx-access-token="your_access_token"