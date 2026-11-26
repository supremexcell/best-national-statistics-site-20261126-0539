// NusaStat hand-in program (Node 22, standard library only).
//
// The entry is the static site in app/ beside this file plus the screenshots
// in screenshots/. This program copies both into the output directory the
// grader gives it and writes the dossier the judge reads, using the vendored
// make.fun library — vendor/makefun-frontend.ts is the kit's copy, unchanged.
//
// Paths resolve from this file's own location (import.meta.url), never from
// the working directory, because the grader may run the program from
// anywhere. The program is deterministic: the same repository always
// produces the same bytes in /output.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = fileURLToPath(new URL(".", import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Start from a clean output directory so a re-run can never leave stale
// files behind (and so two runs write byte-identical output).
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const appDir = join(repoRoot, "app");
const shotsDir = join(repoRoot, "screenshots");
if (!existsSync(appDir)) throw new Error("app/ is missing from the repository");

cpSync(appDir, join(outDir, "app"), { recursive: true });
mkdirSync(join(outDir, "screenshots"), { recursive: true });
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(outDir, "screenshots"), { recursive: true });
}

// The gate's caps, as the starter documents them: the dossier text is
// capped at 160 KiB; at most 4 screenshots of 256 KiB each; app/ holds at
// most 993 files and directories and 16 MiB in all.
const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outDir, "dossier.json"), dossier);
