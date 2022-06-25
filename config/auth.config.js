module.exports = {
    accessToken: {
        salt: "secret",
        expired: "1min",
        type: "access",  // ~ используется при запросах к серверу
    },
    refreshToken: {
        salt: "secret",
        expired: "3min",
        type: "refresh",  // ~ используется для обновления пары access и refresh токенов
    },
};

// ~ конфигурация для токена