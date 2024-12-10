
// USE POSTMAN TO RUN THIS PROJECT

import { Router } from "express";
import Joi from "joi";
export const router = Router();

const isValidEmail = (email) =>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const schema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(5).max(10).required()
});
router.post('/submit', (req, res) => {
    const {name, email} = req.body;
const{error, value} = schema.validate(req.body);

if (error){
    res.setHeader('content-type', 'text/html');
    return res.status(400).send(`
        <h1> ERROR </h1>
        <h1> ${error.details[0].message}</h1>
        <a href = "/"> Go back </a>`
    );
}
res.setHeader('Content-Type', 'text/html');

res.setHeader('My-custom-Header', 'ValidHeaderInfo')
res.status(200).send(`<h1 style = "color: blue; margin: 2rem;">  Welcome, ${value.name}. Your email has been recorded</h1>`);

if (name.length < 10 || name.length > 15) {
    return res.status(400).send(`
        <h1> ERROR </h1>
        <P> Name must be from 2 to 10 characters </P>
        <a href = "/"> Go back to login page </a>`)
}
if (!email || email.trim() === '' || !isValidEmail(email)) {
    return res.status(404).send(`<h1> Error </h1>
        <p> Your email field is required </p>
        <a href = '/'> Go back </a>`);
}
console.log(`form data received: Name- ${name}, Email- ${email};`)
res.setHeader('content-type', 'text/html');
res.send(`<h1> Form submitted </h1>
    <p> Thank you ${name}. Your account has been created </p>
    <a href = "/"> Go back </a>`)
});























