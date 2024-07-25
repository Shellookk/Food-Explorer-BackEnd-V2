//importações
const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const authConfig = require("../config/auth")

function ensureAuthenticated(request, response, next) {
    const authHeaders = request.headers

    if (!authHeaders.cookie) {
        throw new AppError("JWT token não informado", 401)
    }

    const [, token] = authHeaders.cookie.split("token=")

    try {
        const {role, sub: user_id} = verify(token, authConfig.jwt.secret)

        request.user = {
            id: Number(user_id),
            role
        }

        return next()
    } catch {
        throw new AppError("JWT token invalido", 401)
    }
}

module.exports = ensureAuthenticated