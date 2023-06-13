"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter()
  const {data:session} =  useSession()
  console.log({session10:session})
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const createPromptFn = async(e) => {
    e.preventDefault()
    setSubmitting(true)
    try{
        const res = await fetch('/api/prompt/new',{
            method:'POST',
            body:JSON.stringify({
              userId:session?.user.id,
              tag:post.tag,
              prompt:post.prompt
            })
            
        })
        console.log({res})
        if(res.ok){
          router.push('/')
        }
    }catch(err){
      console.log({err})
    }finally{
      setSubmitting(false)
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPromptFn}
    />
  );
};

export default CreatePrompt;
