import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

connect();

export async function POST(req: NextRequest) {
    try {
      const reqBody = await req.json();
      const { email, password } = reqBody;
      console.log(reqBody);
      const user = await User.findOne({ email });
      if (!user) {
        return NextResponse.json({ message: 'Email doesnt exists' }, { status: 400});
      }
      const validPassword=await bcryptjs.compare(password,user.password);
      if (!validPassword) {
        return NextResponse.json({ message: 'Password doesnt match' }, { status: 400});
      }
     const tokenData={
        id:user._id,
        name:user.name,
        email:user.email
 
     };
     const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1h'});
     const responce=NextResponse.json({message:'succesfully signed in',success:true,token});
     responce.cookies.set('token',token,{httpOnly:true});
     return responce;
      
    } catch (error:any) {
      return NextResponse.json({ error: error.message },{status:500});
    }
  }