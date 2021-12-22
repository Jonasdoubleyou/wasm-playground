import { readFile, writeFile } from "fs/promises";
import * as process from "process";
import * as path from "path";
import loadWabt from "wabt";
import environment, { printCounts } from "./environment.js";

const wabt = await loadWabt();

if(!process.argv[2])
    throw new Error(`Required parameter <file-name>`);

const sourcePath = path.join(process.cwd(), "/examples/", process.argv[2] + ".wat");
const codePath = path.join(process.cwd(), "/examples/", process.argv[2] + ".wasm");

console.log(`> Loading WAT file`);
const source = await readFile(sourcePath);
const AST = wabt.parseWat(sourcePath, source.toString("utf-8"));

try {
  AST.validate();
} catch(error) {
    console.log(error.message, error.stack);
    process.exit(0);
}

console.log(`Compiling WAT to WASM`);
const { log: compileLog, buffer: code } = AST.toBinary({ log: true });
console.log(`------------- Compiler Log: -------------\n${compileLog}`);

console.log(`> Writing WASM to file`);
await writeFile(codePath, code);

console.log(`> Instantiating WASM module`);

const { instance } = await WebAssembly.instantiate(code, {
    env: environment
});


console.log(`---------------- Run Debug Output: -------------`);

try {
    instance.exports.main();
} catch(error) {
    console.log(error.message, error.stack);
}

printCounts();


