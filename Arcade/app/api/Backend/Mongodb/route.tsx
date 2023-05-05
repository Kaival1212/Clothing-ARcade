import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(req: Request) {
    const data = await req.json();

    if (data.product_id==""){
      return NextResponse.json("error no data",{ status: 406 })
    }
    else{
        if (data.product_images.length==0){
          return NextResponse.json("error no images", {status: 406})
        }
        else{
          const connectionString = process.env.MONGODB_URI || '';
          const client = new MongoClient(connectionString);
          await client.connect();
          const db = client.db("ARclothing")
          const col = db.collection("products");
          await col.insertOne(data)
        }
        
        
      return NextResponse.json('data added successfully', { status: 200 });
    }
}


export async function GET() {
  const connectionString = process.env.MONGODB_URI || '';
  const client = new MongoClient(connectionString);

  try {
    await client.connect();
    const db = await client.db("ARclothing");
    const col = await db.collection("products");
    const data = await col.find().toArray();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "error" });
  } finally {
    await client.close();
  }
}
