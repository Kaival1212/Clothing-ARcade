import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(req: Request) {
    const a = await req.json();
    {a.product_id!="" ? console.log(a):console.log('empty')}

  const connectionString = process.env.MONGODB_URI || '';
  const client = new MongoClient(connectionString);
  await client.connect();

  // Perform necessary database operations here...

  return NextResponse.json('done');
}
