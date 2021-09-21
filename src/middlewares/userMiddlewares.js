const jwt = require("jsonwebtoken");
const {getEntity, getToken} = require("../utils/unitls");

const userMiddlewares = (prisma) => async  (req, res, next) => {
    try {
        const token = getToken(req, res).split(" ")[1];
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await getEntity(prisma.users, payload.data.user_id, "id");
        console.log(user)
        console.log(payload)
        if (!user) {
            return res.status(401).send("User is invalid")
        }
        next()
    }
    catch (e){
        res.status(401).send(e.message)
    }
};

const isOwner = (prisma) => async  (req, res, next) => {
    try {
        const token = getToken(req, res).split(" ")[1];
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const userProfile = await getEntity(prisma.userInfo, payload.data.user_id, "user_id");
        console.log(userProfile)
        console.log(payload)
        if (!userProfile) {
            return res.status(401).send("User is invalid")
        }
        if (userProfile.email !== payload.data.email || userProfile.user_id !== payload.data.user_id) {
            return res.status(401).send("The entity is not under your ownership")
        }
        console.log("next level")
        next()
    }
    catch (e){
        res.status(401).send(e.message)
    }
};

module.exports = {
    isAuth: userMiddlewares,
    isOwner
}