# osrm-frontend

A small, functional frontend for the [OSRM](https://project-osrm.org/) routing engine, implemented in [Node.js](https://nodejs.org/), [Express](https://expressjs.com/) and [Leaflet](https://leafletjs.com/).

## Requirements

To use this frontend, you will need an OSRM backend service with the compiled routing data for your desired region. Refer to the OSRM documentation for more information.

## Deployment

The application is designed to be deployed via Docker (Compose). A compiled image is available as `kdsf/osrm-frontend` on the Docker Hub. Currently only the `latest` tag is available, as the project is WIP.

Configuration can be achieved with the following environment variables:

- `OSRM_HTTPS`: `true` or `false`; default: `false`. Determines the protocol between frontend and backend.
- `OSRM_URL`: default: `osrm.example`. URL of the OSRM backend REST service.
- `OSRM_PORT`: default: `5000`. Port, where the backend accepts requests.
- `OSRM_PROFILE`: default: `car`. OSRM compilation profile.

## Issues / Bugs

Feel free to submit any functional issues. However, aesthetics will be disregarded until the project's functionality is sufficient. Also please note that this is a rather raw frontend for those familiar with OSRM's REST interface, not for the general consumer.
