const config = {
    osrmBackend: {
        https: process.env.OSRM_HTTPS === "true",
        url: process.env.OSRM_URL || "osrm.example",
        port: process.env.OSRM_PORT || "5000",
        profile: process.env.OSRM_PROFILE || "car"
    }
};

module.exports = config;