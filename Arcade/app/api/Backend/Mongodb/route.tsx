// Importing necessary packages and modules
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// Defining an asynchronous function to handle HTTP POST requests
export async function POST(req: Request) {
    const data = await req.json(); // Parsing the incoming request data as JSON

    // Checking if the product_id field in the request data is empty
    if (data.product_id == "") {
        return NextResponse.json("error no data", { status: 406 }) // Returning a JSON response with a 406 status code if product_id is empty
    } else {
        // Checking if the product_images array in the request data is empty
        if (!data.product_images || data.product_images.length == 0) {
            return NextResponse.json("error no images", { status: 406 }) // Returning a JSON response with a 406 status code if product_images is empty
        } else {
            // Connecting to the MongoDB database and inserting/updating the request data into the 'products' collection
            const connectionString = process.env.MONGODB_URI || ''; // Getting the MongoDB connection string from the environment variables
            const client = new MongoClient(connectionString);
            await client.connect(); // Connecting to the MongoDB database
            const db = client.db("ARclothing"); // Selecting the 'ARclothing' database
            const col = db.collection("products"); // Selecting the 'products' collection
            await col.updateOne({ _id: data._id }, { $set: data }, { upsert: true }); // Updating/Inserting the request data into the collection
        }
        
        // Returning a JSON response with a 200 status code if the data was successfully added/updated to the collection
        return NextResponse.json('data added/updated successfully', { status: 200 });
    }
}

// Defining an asynchronous function to handle HTTP GET requests
export async function GET() {
    const connectionString = process.env.MONGODB_URI || ''; // Getting the MongoDB connection string from the environment variables
    const client = new MongoClient(connectionString);

    try {
        await client.connect(); // Connecting to the MongoDB database
        const db =  client.db("ARclothing"); // Selecting the 'ARclothing' database
        const col =  db.collection("products"); // Selecting the 'products' collection
        const data = await col.find().toArray(); // Fetching all documents from the collection and converting them to an array
        return NextResponse.json(data); // Returning a JSON response with the fetched data
    } catch (error) {
        return NextResponse.json({ error: "error" }); // Returning a JSON response with an error message if an error occurs
    } finally {
        await client.close(); // Closing the MongoDB client connection
    }
}

export async function PUT(req:Request){
    const connectionString = process.env.MONGODB_URI || ''; // Getting the MongoDB connection string from the environment variables
    const client = new MongoClient(connectionString);
    const id = await req.json()
 

    try {
        await client.connect(); // Connecting to the MongoDB database
        const db =  client.db("ARclothing"); // Selecting the 'ARclothing' database
        const col =  db.collection("products"); // Selecting the 'products' collection
        console.log(id)
        const query = { product_id: id };
        const data = await col.findOne(query) // Fetching all documents from the collection and converting them to an array
        return NextResponse.json(data); // Returning a JSON response with the fetched data
    } catch (error) {
        return NextResponse.json({ error: "error" }); // Returning a JSON response with an error message if an error occurs
    } finally {
        await client.close(); // Closing the MongoDB client connection
    }
}