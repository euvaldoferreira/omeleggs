// app.js
const path = require('path')
const filterFiles = require('filter-files')
const isDir = require('is-directory')
const isRouteFile = fileName => /((routes)|(route))\.js$/.test(fileName)

/**
 * @method getRoutesFilesFromDirname
 * @param  {String}            dirName
 * @return {Array<String>}
 */
const getRoutesFilesFromDirname = dirName => {
  return filterFiles.sync(dirName, (fp, dir, files, recurse) => {
    if (isRouteFile(fp)) {
      return true
    }

    return isDir.sync(path.join(dir, fp))
  }, true)
}

/**
 * @method loadRoutesByPath
 * @param  {RestifyServer}  server
 * @param  {String}
 */
const loadRoutesByPath = (server, dirName) => {
  getRoutesFilesFromDirname(dirName)
    .forEach(fileName => {
      require(fileName)(server)
    })
}