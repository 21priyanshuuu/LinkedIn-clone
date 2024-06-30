import connect from "@/dbConfig/dbConfig";
import Post from "@/models/postContents.js";
import { NextResponse, NextRequest } from "next/server";

connect();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { content, imageUrl } = reqBody;
    console.log(reqBody);

    const newPost = new Post({
      content,
      imageUrl,
    });
    const savePost = await newPost.save();
    console.log(savePost);
    return NextResponse.json(
      { message: "post added successfully", success: true, savePost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await Post.find(); // Retrieve all posts from database

    return NextResponse.json(
      { message: "Posts retrieved successfully", success: true, posts },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
