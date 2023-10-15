import weaviate, { WeaviateClient } from 'weaviate-ts-client';

const client: WeaviateClient = weaviate.client({
    scheme: "http",
    host: "localhost:8080",
  });
  
  client
    .schema
    .getter()
    .do()
    .then((res: any) => {
    console.log(res);
    })
    .catch((err: Error) => {
    console.error(err)
    });

    let classObj = {
      'class': 'Question',
      'vectorizer': 'text2vec-openai'  // Or 'text2vec-cohere' or 'text2vec-huggingface'
    }
    
    // add the schema
    client
      .schema
      .classCreator()
      .withClass(classObj)
      .do()
      .then((res: any) => {
        console.log(res)
      })
      .catch((err: Error) => {
        console.error(err)
      });