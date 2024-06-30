// import { connectMongoDB } from '../../../path_to_connectMongoDB';
// import Topic from '../../../path_to_Topic_model';

export async function GET(req, res) {
  // await connectMongoDB();
  const { id } = req.query;

  try {
    // const topic = await Topic.findById(id);
    // if (!topic) {
    //   return res.status(404).json({ error: 'Topic not found' });
    // }
    return res.status(200).json({ id });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
