import { NextResponse } from 'next/server';
const { MongoClient } = require("mongodb");


export async function GET() {
    
        const client = new MongoClient(process.env.MONGODB_URI);

        await client.connect();
        const db=client.db("sample_airbnb")
        const col=db.collection("listingsAndReviews")
        const docs = await col.aggregate([{ $sample: { size: 100 } }]).toArray();


        return NextResponse.json(docs)
    }
    