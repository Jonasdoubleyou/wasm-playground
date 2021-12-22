const memory = new WebAssembly.Memory({ initial: 1 });

function dereferenceString(offset, length) {
    return new TextDecoder().decode(new Uint8Array(memory.buffer, offset, length));
}

function logMemory(offset, length) {
const PRINT_ENV = 20;
  const start = Math.max(0, offset - PRINT_ENV);
  const end = Math.min(memory.buffer.byteLength, offset + length + PRINT_ENV);

  console.log(start, end);

  let content = "";
  content += " ".repeat(Math.max(0,  start - offset + PRINT_ENV));
  content += new TextDecoder().decode(new Uint8Array(memory.buffer, start, end - start + 1));
  content += `\n${" ".repeat(PRINT_ENV)}`;
  content += `^${"-".repeat(Math.max(0, length - 2))}`;
  if (length > 1) content += `^`;
  content += `\n${" ".repeat(PRINT_ENV)}`;
  content += offset + ":" + (offset + length - 1);

  console.log(content);
}

function log(offset, length) {
    console.log(dereferenceString(offset, length));
}

const counts = {};

function count(nameOffset, nameLength) {
    const name = dereferenceString(nameOffset, nameLength);
    counts[name] = (counts[name] ?? 0) + 1;
}

export function printCounts() {
    if(!Object.keys(counts).length) return;

    console.log(`Counts:`);
    for (const [name, count] of Object.entries(counts)) {
        console.log(`${name} : ${count}`);
    }
}


const environment = { memory, log, logMemory, count };

export default environment; 

