import Prompt from "@models/prompt"
import { connectToDB } from "@utils/database"
export const POST = async(req)=>{
    try{
        console.dir({req},{depth:null})
        const {userId,prompt,tag} =await req.json()
        await connectToDB()
        const newPrompt = new Prompt({creater:userId,tag,prompt})
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt),{status:201})
    }catch(err){
        console.log({err})
        return new Response("Failed to create a prompt",{status:500})

    }

}