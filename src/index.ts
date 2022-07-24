import 'dotenv/config';
import axios from 'axios';
import { MongoClient, Timestamp } from 'mongodb';

import { MediaResponse } from './models/media-response';
import { ImageStoragePayload } from './models/image-storage-payload';

const url = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_URI}`;

const client = new MongoClient(url);

const options = {
  method: 'GET',
  url: 'https://instagram28.p.rapidapi.com/medias',
  params: { user_id: '45374573700', batch_size: '20' },
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'instagram28.p.rapidapi.com',
  },
};

const run = async () => {
  await client.connect();
  const db = client.db('instagram-data');
  const collection = db.collection('openaidalle');

  const { data } = await axios.request<MediaResponse>(options);
  console.log(JSON.stringify(data));
  const edges = data.data.user.edge_owner_to_timeline_media.edges;

  const bulk = collection.initializeUnorderedBulkOp();

  for (const edge of edges) {
    bulk
      .find({ _id: edge.node.id })
      .upsert()
      .replaceOne({
        _id: edge.node.id,
        typename: edge.node.typename,
        id: edge.node.id,
        dimensions: edge.node.dimensions,
        display_url: edge.node.display_url,
        display_resources: edge.node.display_resources,
        is_video: edge.node.is_video,
        edge_media_to_caption: edge.node.edge_media_to_caption,
        taken_at_timestamp: edge.node.taken_at_timestamp,
        ts: Timestamp.fromNumber(edge.node.taken_at_timestamp),
      } as ImageStoragePayload);
  }

  await bulk.execute();
  await client.close();
};

run();
