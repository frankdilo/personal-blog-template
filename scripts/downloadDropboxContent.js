require("dotenv").config();

const { Dropbox } = require("dropbox");
const fetch = require("cross-fetch");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

async function main() {
  if (!process.env.DROPBOX_TOKEN) {
    console.error("Set DROPBOX_TOKEN env var and retry");
    process.exit(1);
  }

  if (!process.env.DROPBOX_POSTS_FOLDER_PATH) {
    console.error("Set DROPBOX_POSTS_FOLDER_PATH env var and retry");
    process.exit(1);
  }

  const dbx = new Dropbox({
    accessToken: process.env.DROPBOX_TOKEN,
    fetch: fetch,
  });

  // download content from dropbox as a zip file

  const res = await dbx.filesDownloadZip({
    path: process.env.DROPBOX_POSTS_FOLDER_PATH,
  });

  const outPath = path.join(process.cwd(), "dropbox_download.zip");
  fs.writeFileSync(outPath, res.result.fileBinary);

  // extract it to /_content
  execSync(`rm -rf _content`);
  execSync(`rm -rf _dropbox_download`);
  execSync(`rm -rf public/media`);
  execSync(`unzip dropbox_download.zip -d ./_dropbox_download`);
  // prettier-ignore
  execSync(`mv ./_dropbox_download/${path.basename(process.env.DROPBOX_POSTS_FOLDER_PATH)} ./_content`);
  execSync(`mv ./_content/media ./public/media`);
  execSync(`rm -rf _dropbox_download`);
}

main();
