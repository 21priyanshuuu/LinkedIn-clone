"use client"

import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from "../../../components/Navbar";
import LinkedInNewsCard from "../../../components/LinkedInNewsCard";
import PostCard from "../../../components/PostCard";
import EditedProfile from "../../../components/EditedProfile";

function Page({ params }) {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/posts'); // Replace with your API endpoint
        setPosts(response.data.posts); // Assuming response.data.posts is an array of posts
      } catch (error) {
        console.error('Error fetching posts:', error);
        toast.error('Error fetching posts');
      }
    };

    fetchData();
  }, []);

  const Logout = async () => {
    try {
      await axios.get('/api/user/logout');
      router.push('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Error logging out');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-7 grid-rows-7 gap-6 m-6">
        <div className="col-span-5 row-span-2">
          <EditedProfile userId={params.id}/>
        </div>
        <div className="col-span-5 row-span-3">
          {posts.map((post) => (
            <PostCard  post={post} />
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
