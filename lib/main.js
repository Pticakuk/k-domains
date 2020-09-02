import logger from "./logger"
import { watch } from 'chokidar';
import { existsSync, copyFileSync } from 'fs';
import path from 'path';
const logger = require("./logger")

export default function(options) {
  const f = path.join(this.options.srcDir, "options.json");
  const pages = path.join(this.options.srcDir, "pages")
  const routerFile = path.join(this.options.srcDir, "router.js")

  if( !existsSync(routerFile) ){
    // logger.warn(new Error("router.js file not found"));
    logger.info(`creating new router configuration in ${this.options.srcDir}`)
    copyFileSync(path.join(__dirname, "router.js"), routerFile);
  }

  const watcher = watch(pages, {
    persistent: true
  });

  watcher.on('all', (event, path) => {
    // if (stats) console.log(`File ${path} changed size to ${stats.size}`);
    logger.info(event, path)
  });
}