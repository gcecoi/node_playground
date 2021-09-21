const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const {PrismaClient} = require('@prisma/client');
const {isAuth} = require("../middlewares/isAuth");
const prisma = new PrismaClient();
const userRegexp = /^[^\s@]+@[^\s@]+$/i;

router.get('/', isAuth(prisma), async (req, res) => {
    try {
        const users = await prisma.userInfo.findMany()
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/create', isAuth(prisma), async (req, res) => {
    const {user_id, ...rest} = req.body
    try {
        await prisma.userInfo.update({
            where:{
                user_id:user_id
            },
            data: rest
        })
        res.status(201).send("created")
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.post('/auth', async (req, res) => {
    const {email, password, confirmPass} = req.body || {};
    if (!email || !userRegexp.test(email)) {
        return res.status(401).send("please provide valid email");
    }
    if (!password || !confirmPass) {
        return res.status(401).send("please provide password and confirm password");
    }
    if (password !== confirmPass) {
        return res.status(401).send("Password and confirm password does not match");
    }
    const hashedPassword = await bcrypt.hash(password, 12)
    try {
        await prisma.users.create({
            data: {
                email: email,
                password: hashedPassword,
                profile:{
                    create:{email:email}
                }
            }
        })
        res.status(200).send("authenticated")
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body || {};
    if (!email || !userRegexp.test(email)) {
        return res.status(401).send("please provide valid email");
    }
    const user = await prisma.users.findUnique({
        where: {
            email: email
        }
    })
    if (!user) {
        return res.status(404).send("user does not exist")
    }
    const isPassValid = await bcrypt.compare(password, user.password)

    if (!isPassValid) {
        return res.status(401).send("wrong password")
    }
    const payload = {
        user_id: user.id,
        email: user.email
    }
    const accessToken = jwt.sign(
        {
            data: payload
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '1h'}
    );
    try {
        return res.status(200).send({accessToken: accessToken})
    } catch (error) {
        return res.status(500).send(error)
    }
})


module.exports = router