fs = require("fs");

readStream = fs.createReadStream("teste.csv", "utf-8");
const AMOUNT_OF_FILES = 30;

async function assignChunk(readable) {
  let chunkCount = 0;
  let strings = [];
  for (let i = 0; i < AMOUNT_OF_FILES; i++) {
    strings.push("");
  }
  for await (const chunk of readable) {
    strings[chunkCount % AMOUNT_OF_FILES] += chunk;
    chunkCount++;
  }
  return strings;
}
assignChunk(readStream).then(
  (result) => {
    for (let i = 0; i < AMOUNT_OF_FILES; i++) {
      fs.writeFile(`export${i}.txt`, result[i], { flag: "w+" }, function (err) {
        if (err) {
          return console.log(err);
        }
        console.log("arquivo salvo");
      });
    }
  },
  (err) => console.log(err)
);
