const customMiddleware = (req, res, next) => {
    console.log('SOY UN MIDDLEWARE Y ME EJECUTO SIEMPRE LOOOOL')
    next()
}

module.exports = customMiddleware