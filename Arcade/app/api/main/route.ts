// Import necessary dependencies
import { NextResponse } from 'next/server';
const { MongoClient } = require("mongodb");

// Define an asynchronous function named GET
export async function GET() {
    
    // Create a new MongoClient instance using the MONGODB_URI environment variable
    const client = new MongoClient(process.env.MONGODB_URI);

    // Connect to the MongoDB server
    await client.connect();

    // Get a reference to the "sample_airbnb" database and the "listingsAndReviews" collection
    const db = client.db("sample_airbnb");
    const col = db.collection("listingsAndReviews");

    // Use the aggregate method to get a random sample of 100 documents from the collection
    const docs = await col.aggregate([{ $sample: { size: 100 } }]).toArray();

    // Return a JSON response containing the documents
    return NextResponse.json(docs)
}
