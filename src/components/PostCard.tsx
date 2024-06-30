import React, { useState } from 'react';
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";
import { MdOutlinePermMedia } from "react-icons/md";
import { MdOutlineEventAvailable } from "react-icons/md";
import { PiArticleBold } from "react-icons/pi";
import { UploadButton } from "@/utils/uploadthing";
import axios from 'axios';
import toast from 'react-hot-toast';

function PostDialog({ onClose }) {

  const [imageUrl, setImageUrl] = useState("");
  const [postContent, setPostContent] = useState({
    content: "", 
    imageUrl: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostContent(prevState => ({
      ...prevState,
      [name]: value  
    }));
  };

  const handlePost = async () => {

    try {
      const response = await axios.post("/api/user/postContents", postContent);
      console.log(response,"from PostCard!!!!!!!!!!!!")
    } catch (err: any) {
      console.log("Profile update failed", err.message);
      toast.error(err.message);
    }


    console.log("Posted:", postContent.content, postContent.imageUrl,postContent);
    onClose(); 
  };

  const handleImageUpload = (res) => {
    console.log("Files: ", res);
    setPostContent(prevState => ({
      ...prevState,
      imageUrl: res[0].url, 
    }));
    setImageUrl(res[0].url);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-3xl w-full mx-auto z-50">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Create a Post</h2>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-500"
            rows="6"
            placeholder="What's on your mind?"
            name="content" // Assigning name attribute to 'content'
            value={postContent.content}
            onChange={handleChange}
          ></textarea>
          <label className="block mb-4">
            Profile Image
            <UploadButton
              endpoint="imageUploader"              
              onClientUploadComplete={handleImageUpload}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </label>
          {imageUrl && (
            <div className="mb-4">
              <img src={imageUrl} alt="Uploaded" className="max-w-full h-auto" />
            </div>
          )}
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
              onClick={handlePost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function PostInput({ onOpen }) {
  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-4 p-4">
      <div className="flex items-center mb-4">
        <img
          className="h-12 w-12 rounded-full border-2 border-gray-200"
          src="path-to-your-profile-image.jpg"
          alt="Profile"
        />
        <div className="ml-4 flex-grow">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Start a post, try writing with AI"
            onClick={onOpen}
            readOnly
          />
        </div>
      </div>
      <div className="flex justify-around">
        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
        <MdOutlinePermMedia />    
        <span>Media</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
        <MdOutlineEventAvailable/>
        <span>Event</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
        <PiArticleBold />
        <span>Write article</span>
        </button>
      </div>
    </div>
  );
}

async function PostCard({ post }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const p=await post;
  console.log(p,"from PostCard!!!!!!!!!!!!")

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <div>
      <PostInput onOpen={openDialog} />
      {isDialogOpen && <PostDialog onClose={closeDialog} />}
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden mb-4">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <img
              className="h-12 w-12 rounded-full border-2 border-gray-200"
              src={post.profileImg}
              alt="Profile"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">{post.name}</h3>
              <p className="text-sm text-gray-600">{post.bio}</p>
            </div>
          </div>
          <img
            className="w-full h-64 object-cover"
            src={post.postImg}
            alt="Post"
          />
          <div className="p-4">
            <p className="text-gray-800 mb-4">{post.description}</p>
            <div className="flex justify-around">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
              <AiOutlineLike/>
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
               < FaRegCommentDots />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500">
              <TbShare3/>
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
