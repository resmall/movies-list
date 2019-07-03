module.exports = function (controller) {
    return (req, res, next) => {
        const httpRequest = {
            body: req.body,
            query: req.query,
            params: req.params,
            headers: req.headers
        }

        controller(httpRequest).then(httpResponse => {
            if (httpResponse.headers) {
                res.set(httpResponse.headers);
            }
            res.status(httpResponse.statusCode).send(httpResponse.body);
        }).catch(e => next(e));
    }
};