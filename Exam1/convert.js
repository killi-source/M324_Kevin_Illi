import { readFileSync, writeFileSync } from "node:fs";
import MarkdownIt from "markdown-it";
import anchor from "markdown-it-anchor";
import toc from "markdown-it-table-of-contents";

const inputFile = "07_clean_code.md";
const outputFile = "07_clean_code.html";

const md = new MarkdownIt({ html: true, linkify: true })
  .use(anchor)
  .use(toc, { markerPattern: /^\[TOC\]/im, includeLevel: [2, 3] });

const markdown = readFileSync(inputFile, "utf8");
const body = md.render(markdown);

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>07 - Clean Code</title>
  </head>
  <body>
${body}  </body>
</html>
`;

writeFileSync(outputFile, html);
console.log(`Converted ${inputFile} to ${outputFile}`);
