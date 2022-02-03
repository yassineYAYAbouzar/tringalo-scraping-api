let counter = 0//counter

exports.countRequestesMiddleware = (req, res, next) => {
    let url = req.body.url
    let domain = url.split('.')[1]
    console.log(domain + ': ' + counter++)
    next()
}