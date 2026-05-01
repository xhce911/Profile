const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

const repoRoot = path.resolve(__dirname, "..");
const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";

const packages = [
  path.join(repoRoot, "functions", "my-function"),
  path.join(repoRoot, "functions", "other-function"),
];

for (const pkgDir of packages) {
  const pkgJsonPath = path.join(pkgDir, "package.json");
  if (!fs.existsSync(pkgJsonPath)) {
    console.log(`[postinstall] Skipping missing package: ${path.relative(repoRoot, pkgDir)}`);
    continue;
  }

  console.log(`[postinstall] Installing: ${path.relative(repoRoot, pkgDir)}`);
  const result = spawnSync(npmCmd, ["install"], {
    cwd: pkgDir,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

