module.exports = {
    accessToken: {
        salt: "secret",
        expired: "1min",
        type: "access",
    },
    refreshToken: {
        salt: "secret",
        expired: "3min",
        type: "refresh",
    },
};

// ~ конфигурация для токена