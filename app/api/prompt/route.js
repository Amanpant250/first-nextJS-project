import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();
    const prompt = await Prompt.find({}).populate("creater");
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    console.log({err})
    return new Response("Failed to fetch the data", {
      status: 500,
    });
  }
};
