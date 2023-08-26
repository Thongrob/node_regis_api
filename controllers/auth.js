// const secret = 'secrete-key-api-2023';
var jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)
    try {
        var decoded = jwt.verify(token, process.env.SECRET, (err, result) => {
            if(err) {
                res.json({
                    status: "Error",
                    err
                })
            } else {
                res.json({
                    status: "Successful",
                    result
                })
            }
        });
    }  catch (err) {
        res.json({
            status: "Error",
            message: err
        })
    }   
}