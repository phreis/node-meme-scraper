import * as fs from 'node:fs';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

// create a folder in node js:
const folderName = './memes';
try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }
} catch (err) {
  console.error(err);
}

// Find a way to Access the Website
const resp = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const body = await resp.text();

// Find a way to either filter the information you need from the html or a tool that helps you to extract the information bybyorganising the html content

const images = parse(body).querySelector('#images').querySelectorAll('img');

// get the 10 image urls
images.splice(10);

// put them into a data structure that is convenient (i.e. an array)

const urls = images.map((image) => /"(.*?)"/g.exec(image.rawAttrs)[1]);

// find a way to download the images from this urls

urls.forEach(async (url, index) => {
  await fetch(url).then((res) => {
    const filename = `${String(index + 1).padStart(2, '0')}.jpg`;
    return res.body.pipe(fs.createWriteStream(`${folderName}/${filename}`));
  });
});
