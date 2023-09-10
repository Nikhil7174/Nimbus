// import {API_KEY, API_TOKEN} from "@env"
// import * as dotenv from "dotenv"

// dotenv.config();
// export const apiKey = process.env.API_KEY 
export const apiKey = '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'
console.log(apiKey)

// export const apiKey = ${API_KEY}

export const dummyMessages = [
    {
        role: 'user', 
        content: 'How are you?'
    },
    {
        role: 'assistant',
        content: "I'm fine, How may i help you today."
    },
    {
        role: 'user',
        content: 'create an image of a dog playing with cat'
    },
    {
        role: 'assistant',
        content: 'https://storage.googleapis.com/pai-images/ae74b3002bfe4b538493ca7aedb6a300.jpeg'
    }
]