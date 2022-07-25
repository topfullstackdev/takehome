import fs from "fs";
import path from "path";
import prompt from "prompt";
import { SBTree } from "sbtree";
import { getExtName } from "./utils/index.js";

/**
 * Get All Files Information from the root Directory
 * @param {String} baseDirectory Required
 * @param {Array}  arrayOfFiles Opional
 * @return {Array} All files' information(type, name, size, path) into baseDirectory
 */
const getAllFiles = (baseDirectory, arrayOfFiles) => {
  const files = fs.readdirSync(baseDirectory);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach((file) => {
    if (fs.statSync(baseDirectory + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(baseDirectory + "/" + file, arrayOfFiles);
    } else {
      const fullPath = path.join(
        path.resolve(baseDirectory),
        baseDirectory,
        file
      );

      const fileSizeInBytes = fs.statSync(baseDirectory + "/" + file).size;
      const contentType = getExtName(path.extname(fullPath));
      arrayOfFiles.push({
        type: contentType,
        name: path.basename(fullPath, path.extname(fullPath)),
        size: fileSizeInBytes,
        path: fullPath,
      });
    }
  });
  return arrayOfFiles;
};

let indices = false;
let binaryTree;

try {
  await fs.access("./indicesData.json", fs.constants.R_OK);
  indices = true;
} catch {
  console.log("[indices] it does not exist an indices file now...");
}

if (indices) {
  const indicesData = await fs.readFile("./indicesData.json", "utf8");
  binaryTree = new SBTree(JSON.parse(indicesData));
} else {
  const results = getAllFiles("test_data");
  binaryTree = new SBTree();
  await binaryTree.insertDocuments(results);

  try {
    fs.writeFileSync("indicesData.json", JSON.stringify(binaryTree.toJSON()));
    console.log("[indices] write indices data file successfully");
  } catch {
    console.log("Can't create an indices file...");
  }
}

/**
 * Search Files
 * @Todo input fields validations
 */
const searchFiles = async () => {
  prompt.start();
  console.log("Please input for Searching files:");
  prompt.get(
    [
      {
        name: "type",
        description: "Input File Type",
        type: "string",
        required: false,
      },
      {
        name: "name",
        description: "Input File Name",
        type: "string",
        required: false,
      },
      {
        name: "size",
        description: "Input File Size",
        type: "number",
        required: false,
      },
    ],
    async (err, searchOps) => {
      for (const key in searchOps) {
        if (searchOps[key] == "") delete searchOps[key];
      }
      console.log("===================================");
      console.log("Search Results:");
      const searchResults = await binaryTree.findDocuments(searchOps);
      console.log(searchResults);
      console.log("===================================");

      searchFiles();
    }
  );
};

binaryTree.on("ready", searchFiles);
