
const userRegexp = /^[^\s@]+@[^\s@]+$/i;

const getEntity = async (entity, searchValue, searchParam) => {
    return await entity.findUnique({
        where: {
            [searchParam]: searchValue
        }
    });
}

const getToken = (req, res) => {
    const authorization = req.headers["authorization"]
    if (!authorization) {
        return res.status(401).send("Toke is required")
    }
    return authorization
}

module.exports = {
    userRegexp,
    getEntity,
    getToken
}