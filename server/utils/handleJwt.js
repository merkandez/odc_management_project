import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET

export const tokenSign = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            role_id: user.role_id,
        },
        JWT_SECRET,
        {
            expiresIn: '8h',
        }
    )
}

export const tokenVerify = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (error) {
        return null
    }
}
