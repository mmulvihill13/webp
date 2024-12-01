import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import OpenAI from 'openai'; // Use the default export

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = 5500;

// Initialize OpenAI with your API key
const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

app.use(express.json()); // Middleware to parse JSON request bodies

// Endpoint to generate meme caption
app.post('/generate-caption', async (req, res) => {
   const { imageUrl } = req.body;

   try {
       // Use OpenAI to generate a caption for the dog image
       const completion = await openai.chat.completions.create({
           model: 'gpt-3.5-turbo', // You can also try using 'gpt-4' if you have access
           messages: [
               {
                   role: 'system',
                   content: 'You are a helpful assistant who generates captions for images.',
               },
               {
                   role: 'user',
                   content: `Generate a funny caption for the following dog image: ${imageUrl}`,
               },
           ],
       });

       const memeCaption = completion.choices[0].message.content.trim();
       res.json({ caption: memeCaption }); // Send the generated caption back
   } catch (error) {
       console.error('Error generating caption:', error);
       res.status(500).json({ error: 'Failed to generate caption' });
   }
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
