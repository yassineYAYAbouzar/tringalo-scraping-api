let counter = 0//counter

exports.countRequestesMiddleware = (req, res, next) => {
    let url = req.body.url
    let domain = url.split('.')[1]
    console.log(domain + ': ' + counter++)
    next()
}

exports.isAllowedNav = (req, res, next) => {

    if(global.tabs<10){
        global.tabs++
        console.log(`Allowed: ${global.tabs}`)
        next()
    }else{
        console.log(`Rejected: ${global.tabs}`)
        res.json({status: 'failed', error: 'The server is unable to respond right now'})
    }

}

