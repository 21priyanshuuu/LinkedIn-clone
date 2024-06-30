// import router, { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

export  async function GET(){
    // const Router = useRouter();
    try{
        
        const responce=NextResponse.json({
            message:'logout successfull',
            success:true
            
        })
        responce.cookies.set('token','',{
            httpOnly:true,
            expires:new Date(0)
        })
        // Router.push("/")
        return responce;

    }catch(e:any){
        console.log(e.message);
        return NextResponse.json({error:e.message},{status:500})
    }
}