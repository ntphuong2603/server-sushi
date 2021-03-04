exports.resError = (res, code, msg) => (
    res.status(code).json({
        error: true,
        msg: msg,
    })
)

exports.resSuccess = (res, code, msg, data) => (
    res.status(code).json({
        success: true,
        msg: msg,
        data: data,
    })
)