// make.fun — "Make the AI Judge Laugh: Cat Reviews Its Human"
// (u-motasimfuad-make-the-ai-judge-laugh-cat-reviews-its-42a34990)
//
// Writes one funny single-line one-star review, written by a house cat
// about its human, to /output/entry.txt. The review is fixed: the cat
// rates the human's table manners — he fills the bowl, then eats his own
// dinner at the table like the guest of honour, and the formal complaint
// the cat filed got stepped on.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "One star. He fills my bowl on time, then eats his own dinner at the table " +
  "like he's the guest of honour. I filed a formal complaint. He stepped on it.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// The gate takes 1-200 Unicode code points, a single line, and not only
// white space. Check the text before writing it: a file outside the gate
// never reaches the judge, so fail loudly here instead.
function checkFitsGate(candidate: string): void {
  const size = Array.from(candidate).length;
  if (size < 1 || size > 200) {
    throw new Error(`entry is ${size} characters, outside the 1-200 gate`);
  }
  if (candidate.trim() === "") {
    throw new Error("entry holds only white space");
  }
  if (candidate.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

checkFitsGate(TEXT);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
