const jwt = require("jsonwebtoken");

const isAuth = (prisma) => async  (req, res, next) => {
    const authorization = req.headers["authorization"]
    if (!authorization) {
        return res.status(401).send("Toke is required")
    }
    try {
        const token = authorization.split(" ")[1];
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await prisma.users.findUnique({
            where: {
                id: payload.data.user_id
            }
        })
        if (!user) {
            return res.status(401).send("User is invalid")
        }
        next()
    }
    catch (e){
        res.status(401).send(e.message)
    }
};

module.exports = {
    isAuth
}