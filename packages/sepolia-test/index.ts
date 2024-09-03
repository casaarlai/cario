import express, { Express, Request, Response } from 'express';
import cors from 'cors'; // Import the cors middleware
import { makeRequest, acceptCarioIntentRequest, createCarioIntentRequest } from './request';

const app: Express = express();
const port = 3001;

app.use(express.json());
app.use(cors()); // Use the cors middleware

app.get('/', (req: Request, res: Response) => {
  res.send('Backend is running!');
});

app.post('/chainlink-functions/youtube', async (req: Request, res: Response) => {
  const { videoOrChannelId, ownerWalletAddress} = req.body;
  if (!videoOrChannelId || !ownerWalletAddress) {
    return res.status(400).json({ message: 'videoOrChannelId and ownerWalletAddress are required' });
  }
  try {
    const result = await makeRequest(videoOrChannelId, ownerWalletAddress);
    return res.json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/createCarioIntentRequest', async (req: Request, res: Response) => {
  const { videoOrChannelIds, msg } = req.body;
  if (!videoOrChannelIds || !msg) {
    return res.status(400).json({ message: 'videoOrChannelId and msg are required' });
  }
  try {
    const result = await createCarioIntentRequest(req.body);
    return res.json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/acceptCarioIntentRequest', async (req: Request, res: Response) => {
  
  try {
    const result = await acceptCarioIntentRequest();
    return res.json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});