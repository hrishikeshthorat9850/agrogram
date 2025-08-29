import { NextRequest,NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
export async function POST(req){
    try{
        const body = await req.json();
        if(!body){
            return NextResponse.json({message : "Send Data is not correct",status : 400})
        }
        const {data,error} = await supabase
            .from("post_comments")
            .insert({
                post_id : body.post_id,
                comment : body.comment,
                user_id : body.user_id
            })
            .select()
        console.log("Data saved in database is :",data);
        if(body){
            return NextResponse.json({message : "Data saved Success",status : 200, comment : data})
        }
    }catch(err){
        return NextResponse.json({message : "Error in post request",status : 500});
    }
}


