import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import env from 'dotenv'
import {Configuration, OpenAIApi} from 'openai'


const app = express()

env.config()

app.use(cors())
app.use(bodyParser.json())

// Configure open api

const configuration = new Configuration({
    organization: "org-CeRjvPlNIIhXpHs8mZ1ccROG",
    apiKey: process.env.API_KEY // VISIT .env AND MAKE CHANGES
})
const openai = new OpenAIApi(configuration)

// listeninng

app.listen("8000", ()=>console.log("listening on port 8000"))

//test route

app.get("/",(req, res) => {
    res.send("i'm runing .")
})

//post route making request 

app.post('/', async (req,res) => {
    const {message} = req.body

    try{
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${message}`,
            max_tokens: 100,
            temperature: .5
        })
        res.json({message: response.data.choices[0].text})

    }catch(e){
        console.log(e)
        res.send(e).status(400)
    }
})
