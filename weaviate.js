// Search Engine for images

// const weaviate = require('weaviate-client');
import weaviate from "weaviate-ts-client";
// const fs = require('fs');
import fs from "fs";



// Initialize api client
const cli = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
  // headers: {'X-OpenAI-Api-Key': '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'},
});

// cli
//   .schema
//   .getter()
//   .do()
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error(err)
//   });


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
