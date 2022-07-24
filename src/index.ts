import 'dotenv/config';
import axios from 'axios';
import { MongoClient } from 'mongodb';

import { MediaResponse } from './models/media-response';

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
  const edges = data.data.user.edgeownertotimelinemedia.edges;

  const bulk = collection.initializeUnorderedBulkOp();
  for (const edge of edges) {
    bulk.insert({
      _id: edge.node.id,
      typename: edge.node.typename,
      id: edge.node.id,
      dimensions: edge.node.dimensions,
      displayurl: edge.node.displayurl,
      displayresources: edge.node.displayresources,
      isvideo: edge.node.isvideo,
      edgemediatocaption: edge.node.edgemediatocaption,
    });
  }
  await bulk.execute();
  await client.close();
};

run();
