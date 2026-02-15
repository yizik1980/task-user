const path = require("path");
const tsConfigPaths = require("tsconfig-paths");

const baseUrl = path.join(__dirname);
const tsConfig = require("./tsconfig.json");

tsConfigPaths.register({
  baseUrl: baseUrl,
  paths: tsConfig.compilerOptions.paths,
});
