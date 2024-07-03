# g4f-image

Generate images for free. That's it.


<p align="center">
  <a aria-label="NPM Version" href="https://www.npmjs.com/package/g4f-image">
    <img alt="" src="https://img.shields.io/npm/v/g4f-image.svg?label=NPM&logo=npm&style=for-the-badge&color=0470FF&logoColor=white">
  </a>
  <a aria-label="NPM Download Count" href="https://www.npmjs.com/package/g4f-image">
    <img alt="" src="https://img.shields.io/npm/dt/g4f-image?label=Downloads&style=for-the-badge&color=27B2FF">
  </a>
  <a aria-label="Size" href="https://www.npmjs.com/package/g4f-image">
    <img alt="" src="https://img.shields.io/bundlephobia/minzip/g4f-image?style=for-the-badge&color=B3CAFF">
  </a>
</p>


## Installation
```npm install g4f-image```

## Usage
```js
import { provider, generate } from "g4f-image";

const base64Image = await generate("A cat", {
    provider: provider.Nexra,
    options: {
        data: {
            model: " ", // see the full list below
        },
    },
});

// save image
let filePath = "...";

fs.writeFileSync(filePath, base64Image, "base64");
```
