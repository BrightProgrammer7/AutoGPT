// Search Engine for images
import weaviate from "weaviate-ts-client";
import fs from "fs";

// Initialize api client
const cli = weaviate.client({
  scheme: "http",
  host: "localhost:8080",
});

// Query Database Schema
const schemaRes = await cli.schema.getter().do();
// console.log(schemaRes);

// Describe the Schema for DB
const schemaConfig = {
  // Provide a class name
  class: "Meme",
  // Specify image to vec neural
  vectorizer: "img2vec-neural",
  // PyTorch neural network run container in hirarchical navigator small worlds graph indexing
  vectorIndexType: "hnsw",
  // Config the image to back module
  moduleConfig: {
    "img2vec-neural": {
      imageFields: ["image"],
    },
  },
  properties: [
    {
      name: "image",
      dataType: ["blob"],
    },
    {
      name: "text",
      dataType: ["string"],
    },
  ],
};

// // Update the DB migration to create a shema
await client.schema.classCreator().withClass(schemaConfig).do();

// // store an Image
// const img = fs.readFileSync("./img/matrix.jpg");

// // convert images to base64 format to a buffer
// const b64 = Buffer.from(img).toString("base64");

// const res = await client.data
await client.data
  .creator()
   .withClassName("Meme")
   .withProperties({
    image: b64,
    text: "matrix meme",
  })
  .do();

// fs.writeFileSync('./result.jpg', res, 'base64')

// const imgFiles = fs.readdirSync("./img");
// const promises = imgFiles.map(async (imgFile) => {
//  const b64f = Buffer.from(img).toBase64(`./img/${imgFile}`);
//  await client.data
  //  .creator()
    //.withClassName("Meme")
    //.withProperties({
      //image: b64f,
      // text: "matrix meme",
     // text: imgFile.split(".")[0].split("_").join(" "),
   // })
   // .do();
//});
//await Promise.all(promises);


//  Query an Image 
const test = Buffer.from(fs.readFileSync("./test.jpg")).toString("base64");

const resImage = await cli.graphql
  .get()
  .withClassName("Meme")
  .withFields(["image"])
  // use HSNW to find nearest vectors
  .withNearImage({ image: test })
  // sort, filter...traditional DB query operations
  .withLimit(1)
  // Get one similar back
  .do();

const result = resImage.data.Get.Meme[0].image;
fs.writeFileSync("./result.jpg", result, "base64");



