// Vector Databases extend LLM (Long Term Memory)

import { ChromaClient, OpenAIEmbeddingFunction } from "chromadb";
const api = process.env.OPENAI_KEY;
const org = process.env.ORGANIZATION_KEY;

// Create a new Vector Database instance with the specified parameters and configuration

// Get the Chroma Client and Create a client instance
const client = new ChromaClient();

// Create a embedded instance with the model od 'Text-embedding-ada-002'
// const embedder = new OpenAIEmbeddingFunction(api, org);
const embedder = new OpenAIEmbeddingFunction(
  "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",
  "org-kP8I1QdiKMtEzQcX9TT3hlnc"
);

// Empties and completely resets the database.
await client.reset();

// Update the embadding whenever a new data point is added
const collection = await client.createCollection("hi_mom", undefined, embedder);
// const collection = await client.createCollection("hi_mom", {}, embedder);

// Add the new data point to the collection with some IDE and document's text
await collection.add(
  ["id1", "id2"], // ids
  undefined, // embaddings
  [{ source: "my_source" }, { source: "my_source" }], // metadata
  ["What is the meaning of life?", "just be alive"] // documents
);

const chroma = async () => {
  // Query database by a string of text
  const results = await collection.query(undefined, 2, undefined, [
    "Am I really alive?",
  ]);
  // console.log(results);

  if (response && response.data) {
    response.json()
    console.log(results.data);
  } else {
    console.log("erreur");
  }
};

chroma();
