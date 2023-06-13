"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
    console.log("in line 9")
    const router = useRouter()
  const { data: session } = useSession();
  const [posts, setPosts] = useState();
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPost();
  }, []);
  const handleEdit = (post) => {
    console.log({post})
    router.push(`update-prompt?id=${post._id}`)
  };
  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are You Sure you want to delete thid prompt")
    if(hasConfirmed){
      try{
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method:'DELETE',
        })
        const filteredPost =  posts.filter(elem=>elem._id !== post._id)
        setPosts(filteredPost)
      }catch(err){
        console.log({err})
      }
    }
  };
  return (
    <Profile
      name="My"
      desc="welcome to your personalize page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
