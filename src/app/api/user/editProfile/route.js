import connect from "@/dbConfig/dbConfig";
import Profile from "@/models/editProfile";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const {
      name,
      description,
      collegeName,
      company,
      profileImg,
      backroundImage,
      address,
    } = reqBody;
    console.log(reqBody);

    const newProfile = new Profile({
      name,
      description,
      collegeName,
      company,
      profileImg,
      backroundImage,
      address,
    });
    const saveProfile = await newProfile.save();
    console.log(saveProfile);
    return NextResponse.json(
      { message: "profile updated successfully", success: true, saveProfile },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
