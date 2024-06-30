import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";
import { NextResponse, NextRequest } from 'next/server';

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { name, email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const saveUser = await newUser.save();
    console.log(saveUser);
    return NextResponse.json({ message: 'succesfully signed up', success: true, saveUser }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ error: error.message },{status:500});
  }
}