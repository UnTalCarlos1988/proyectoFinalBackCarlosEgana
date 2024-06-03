import jwt from 'jsonwebtoken'

export const generateToken = (user) => {

    /*
        1°: Objeto de asociacion del token (Usuario)
        2°: Clave privada del cifrado
        3°: Tiempo de expiracion
    */
    const token = jwt.sign({ user }, "", { expiresIn: '12h' })
    return token
}

console.log(generateToken({
    "_id": "661739a0111773eba9eae765",
    "first_name": "Francis",
    "last_name": "Fernandez",
    "password": "$2b$12$hN8/LhUsPQ8qZ7MmiJOXdeIsm.CzNKVEdhd48.p6dd3GFrWqdibty",
    "age": 28,
    "email": "francis@francis.com",
    "rol": "Admin",
    "cart_id": "661739a0111773eba9eae766",
    "__v": 0
}))