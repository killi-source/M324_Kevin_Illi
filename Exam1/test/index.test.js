import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

test("the program reports that it works", () => {
  const result = spawnSync(process.execPath, ["index.js"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
  });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /It works/);
});
