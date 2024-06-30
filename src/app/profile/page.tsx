"use client";

import React from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from "../../components/Navbar";
import LinkedInNewsCard from "../../components/LinkedInNewsCard";
import PostCard from "../../components/PostCard";
import ProfileCard from '../../components/ProfileCard';

const posts = [
  {
    id: 1,
    name: "John Doe",
    bio: "Software Engineer",
    profileImg: "https://via.placeholder.com/150",
    postImg: "https://via.placeholder.com/600x400",
    description: "Had a great day exploring the city!",
  },
  {
    id: 2,
    name: "Jane Smith",
    bio: "Designer",
    profileImg: "https://via.placeholder.com/150",
    postImg: "https://via.placeholder.com/600x400",
    description: "Loving the new design trends!",
  },
];

function Page() {
  const router = useRouter();

  const Logout = async () => {
    try {
      await axios.get('/api/user/logout')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error('Error in Logout');
    }
  }

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-7 grid-rows-7 gap-6 m-6">
        <div className="col-sapn-5 row-span-2">
          <ProfileCard />
        </div>
        <div className="col-span-5 row-span-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        <div className="col-span-1 row-span-2">
          <LinkedInNewsCard />
        </div>
      </div>
      <button onClick={Logout}>Logout</button>
    </div>
  );
}

export default Page;
