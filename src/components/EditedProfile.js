"use client";
import { UploadButton } from "@/utils/uploadthing";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function EditedProfile(userId) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "",
    description: "",
    collegeName: "",
    company: "",
    profileImg: "",
    backgroundImage: "",
    address: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = await userId;
        const response = await axios.get("/api/user/profile/${id}");
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user data", err);
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-200 h-24"></div>
      <div className="flex justify-center -mt-12">
        <img
          className="h-24 w-24 rounded-full border-4 border-white"
          src={user.profileImg || "https://via.placeholder.com/150"}
          alt="Profile"
        />
      </div>
      <div className="text-center px-3 pb-6 pt-2">
        <h3 className="text-xl text-gray-900 font-medium leading-8">
          {user.name}
        </h3>
        <p className="text-gray-600 font-semibold">{user.description}</p>
        <p className="text-gray-500">{user.location}</p>
        <div className="flex justify-center items-center space-x-2 mt-2">
          <span className="text-blue-500">{user.company}</span>
          <button
            className="bg-blue-500 pl-5 pr-5 p-2 rounded-lg text-white"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
      </div>
      {isModalOpen && (
        <EditProfileModal onClose={handleCloseModal} user={user} />
      )}
    </div>
  );
}

function EditProfileModal({ onClose, user }) {
  const [imgUrl, setImageUrl] = useState("");
  const [bgImgUrl, setBgImageUrl] = useState("");

  const [profile, setProfile] = useState({
    name: user.name || "",
    email: user.email || "",
    location: user.location || "",
    description: user.description || "",
    collegeName: user.collegeName || "",
    company: user.company || "",
    profileImg: user.profileImg || "",
    backgroundImage: user.backgroundImage || "",
    address: user.address || "",
  });

  useEffect(() => {
    setProfile(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  const router = useRouter();
  const handleSave = async () => {
    console.log("Profile updated", profile);
    try {
      const response = await axios.post("/api/user/editProfile", profile);
      const userId = response.data.saveProfile._id;
      router.push(`/profile/${userId}`);
    } catch (err) {
      console.log("Profile update failed", err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg max-h-screen overflow-y-auto z-10">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <label className="block mb-2">
          Name
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          />
        </label>
        <label className="block mb-2">
          College Name
          <input
            type="text"
            name="collegeName"
            value={profile.collegeName}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          />
        </label>
        <label className="block mb-2">
          Address
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          />
        </label>
        <label className="block mb-2">
          Company
          <input
            type="text"
            name="company"
            value={profile.company}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          />
        </label>
        <label className="block mb-4">
          Description
          <textarea
            name="description"
            value={profile.description}
            onChange={handleChange}
            className="w-full border rounded p-2 mt-1"
          />
        </label>
        <div>
          <label className="block mb-4">
            Profile Image
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  profileImg: res[0].url,
                }));
                setImageUrl(res[0].url);
                console.log(res[0].url);
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </label>
        </div>
        <div>
          <label className="block mb-4">
            Background Image
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                setProfile((prevProfile) => ({
                  ...prevProfile,
                  backgroundImage: res[0].url,
                }));
                setBgImageUrl(res[0].url);
                console.log(res[0].url);
              }}
              onUploadError={(error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </label>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditedProfile;
