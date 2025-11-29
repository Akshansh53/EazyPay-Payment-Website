"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

 export async function CreateOnRampTransaction(balance:number,provider:string){
    const session= await getServerSession(authOptions);
    const userId=Number(session.user.id)
    if(!userId){
        return {
            message:"User Not Logged In"
        }
    }
    await prisma.onRampTransaction.create({
        data:{
            userId,
            amount:balance,
            provider:provider,
            status:"Processing",
            startTime:new Date(),
            token:String(Math.random()),
        }
    })
}