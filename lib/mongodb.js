import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://exceptionshandler007:OnlyForAdmins007@cluster0.llah8.mongodb.net/freelance';
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
