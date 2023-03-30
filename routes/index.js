const router = require('express').Router()
const nodemailer = require('nodemailer')
const { google } = require('googleapis');
const request = require('../models/requests')
require('dotenv').config()
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;


router.route('/')
    .get((req, res) => {
        res.render('index')
    })

router.route('/sendMsg')
    .post((req, res) => {
        console.log(req.body)
    })

router.route('/sendMessage')
    .post(async (req, res) => {
        const username = req.body.username
        const email = req.body.email
        const subject = req.body.subject
        const message = req.body.message

        sendEmail(username, email, subject, message)
            .then(async (result) => {
                console.log(result)
                const newReq = new request({
                    username,
                    email,
                    subject,
                    message
                })
                const reqSave = await newReq.save()
                if (reqSave) {
                    res.json({
                        status: "success",
                        message: "Your request has been sent succesfully :)"
                    })

                } else {
                    res.json({
                        status: "error",
                        message: "Sorry there has been some error plz try some other forms to reach me"
                    })
                }

            }).catch((err) => {
                console.log("some error occured")
                res.json({
                    status: "error",
                    message: "Sorry there has been some error plz try some other forms to reach me"
                })
            })
    })


async function sendEmail(username, userEmail, subject, message) {
    const OAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
    try {
        const accessToken = await OAuth2Client.getAccessToken()

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'anabilbaruah2801@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })

        const mailOptions = {
            from: 'anabilbaruah2801@gmail.com',
            to: userEmail,
            subject: 'Hello from anabil',
            html: `<p>Hi ${username} thanks for your response. This is on behalf of Anabil. Soon he will reply you on this account :) </p>`
        }

        const result = await transport.sendMail(mailOptions)


        const alertMe = {
            from: 'anabilbaruah2801@gmail.com',
            to: 'anabilbaruah2801@gmail.com',
            subject: subject,
            html: `<p>${message} <br> from - ${userEmail}</p>`
        }
        await transport.sendMail(alertMe)
        return result
    } catch (error) {
        console.log(error)
    }
}


module.exports = router