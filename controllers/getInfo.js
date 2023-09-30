// const secret = 'secrete-key-api-2023';
var jwt = require('jsonwebtoken');
const conn = require('../configuration/db_conention')

exports.getInfo = (req, res, next) => {
    let site_code = req.body.site_code
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token)
    try {
        var decoded = jwt.verify(token, process.env.SECRET, (err, result) => {
            if(err) {
                res.json({
                    status: "Error",
                    err
                })
            } else {
                conn.execute('SELECT `site_code`, `lat`, `long` FROM site_info WHERE trash = 0 AND  site_code = ?', 
                    [site_code], 
                    (err, info, fields) => {
                        if(err) {
                            res.json({
                            status : "Error",
                            message: err
                            })
                            return
                        }
                        if(site_code.length == 0) {
                            res.json({
                            status : "Error",
                            message: "No user found."
                            })
                            return
                        }
                        
                        res.json({
                            status: "success",
                            message: "Your info",
                            data: info
                          })
                        
                        
                    }
                )
            }
        });
    }  catch (err) {
        res.json({
            status: "Error",
            message: err
        })
    }   
}