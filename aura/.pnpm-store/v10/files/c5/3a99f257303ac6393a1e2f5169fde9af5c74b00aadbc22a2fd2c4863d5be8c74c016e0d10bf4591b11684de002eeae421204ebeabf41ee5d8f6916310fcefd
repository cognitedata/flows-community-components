import CJS_COMPAT_NODE_URL_w3x2216o9 from 'node:url';
import CJS_COMPAT_NODE_PATH_w3x2216o9 from 'node:path';
import CJS_COMPAT_NODE_MODULE_w3x2216o9 from "node:module";

var __filename = CJS_COMPAT_NODE_URL_w3x2216o9.fileURLToPath(import.meta.url);
var __dirname = CJS_COMPAT_NODE_PATH_w3x2216o9.dirname(__filename);
var require = CJS_COMPAT_NODE_MODULE_w3x2216o9.createRequire(import.meta.url);

// ------------------------------------------------------------
// end of CJS compatibility banner, injected by Storybook's esbuild configuration
// ------------------------------------------------------------
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf, __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(x, {
  get: (a, b) => (typeof require < "u" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from == "object" || typeof from == "function")
    for (let key of __getOwnPropNames(from))
      !__hasOwnProp.call(to, key) && key !== except && __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: !0 }) : target,
  mod
));

// ../../node_modules/ts-dedent/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/ts-dedent/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.dedent = void 0;
    function dedent2(templ) {
      for (var values = [], _i = 1; _i < arguments.length; _i++)
        values[_i - 1] = arguments[_i];
      var strings = Array.from(typeof templ == "string" ? [templ] : templ);
      strings[strings.length - 1] = strings[strings.length - 1].replace(/\r?\n([\t ]*)$/, "");
      var indentLengths = strings.reduce(function(arr, str) {
        var matches = str.match(/\n([\t ]+|(?!\s).)/g);
        return matches ? arr.concat(matches.map(function(match) {
          var _a, _b;
          return (_b = (_a = match.match(/[\t ]/g)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
        })) : arr;
      }, []);
      if (indentLengths.length) {
        var pattern_1 = new RegExp(`
[	 ]{` + Math.min.apply(Math, indentLengths) + "}", "g");
        strings = strings.map(function(str) {
          return str.replace(pattern_1, `
`);
        });
      }
      strings[0] = strings[0].replace(/^\r?\n/, "");
      var string = strings[0];
      return values.forEach(function(value, i) {
        var endentations = string.match(/(?:^|\n)( *)$/), endentation = endentations ? endentations[1] : "", indentedValue = value;
        typeof value == "string" && value.includes(`
`) && (indentedValue = String(value).split(`
`).map(function(str, i2) {
          return i2 === 0 ? str : "" + endentation + str;
        }).join(`
`)), string += indentedValue + strings[i + 1];
      }), string;
    }
    exports.dedent = dedent2;
    exports.default = dedent2;
  }
});

// ../../node_modules/tsconfig-paths/lib/filesystem.js
var require_filesystem = __commonJS({
  "../../node_modules/tsconfig-paths/lib/filesystem.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.removeExtension = exports.fileExistsAsync = exports.readJsonFromDiskAsync = exports.readJsonFromDiskSync = exports.fileExistsSync = void 0;
    var fs = __require("fs");
    function fileExistsSync(path2) {
      if (!fs.existsSync(path2))
        return !1;
      try {
        var stats = fs.statSync(path2);
        return stats.isFile();
      } catch {
        return !1;
      }
    }
    exports.fileExistsSync = fileExistsSync;
    function readJsonFromDiskSync(packageJsonPath) {
      if (fs.existsSync(packageJsonPath))
        return __require(packageJsonPath);
    }
    exports.readJsonFromDiskSync = readJsonFromDiskSync;
    function readJsonFromDiskAsync(path2, callback) {
      fs.readFile(path2, "utf8", function(err, result) {
        if (err || !result)
          return callback();
        var json = JSON.parse(result);
        return callback(void 0, json);
      });
    }
    exports.readJsonFromDiskAsync = readJsonFromDiskAsync;
    function fileExistsAsync(path2, callback2) {
      fs.stat(path2, function(err, stats) {
        if (err)
          return callback2(void 0, !1);
        callback2(void 0, stats ? stats.isFile() : !1);
      });
    }
    exports.fileExistsAsync = fileExistsAsync;
    function removeExtension(path2) {
      return path2.substring(0, path2.lastIndexOf(".")) || path2;
    }
    exports.removeExtension = removeExtension;
  }
});

// ../../node_modules/tsconfig-paths/lib/mapping-entry.js
var require_mapping_entry = __commonJS({
  "../../node_modules/tsconfig-paths/lib/mapping-entry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.getAbsoluteMappingEntries = void 0;
    var path2 = __require("path");
    function getAbsoluteMappingEntries(absoluteBaseUrl, paths, addMatchAll) {
      for (var sortedKeys = sortByLongestPrefix(Object.keys(paths)), absolutePaths = [], _i = 0, sortedKeys_1 = sortedKeys; _i < sortedKeys_1.length; _i++) {
        var key = sortedKeys_1[_i];
        absolutePaths.push({
          pattern: key,
          paths: paths[key].map(function(pathToResolve) {
            return path2.resolve(absoluteBaseUrl, pathToResolve);
          })
        });
      }
      return !paths["*"] && addMatchAll && absolutePaths.push({
        pattern: "*",
        paths: ["".concat(absoluteBaseUrl.replace(/\/$/, ""), "/*")]
      }), absolutePaths;
    }
    exports.getAbsoluteMappingEntries = getAbsoluteMappingEntries;
    function sortByLongestPrefix(arr) {
      return arr.concat().sort(function(a, b) {
        return getPrefixLength(b) - getPrefixLength(a);
      });
    }
    function getPrefixLength(pattern) {
      var prefixLength = pattern.indexOf("*");
      return pattern.substr(0, prefixLength).length;
    }
  }
});

// ../../node_modules/tsconfig-paths/lib/try-path.js
var require_try_path = __commonJS({
  "../../node_modules/tsconfig-paths/lib/try-path.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.exhaustiveTypeException = exports.getStrippedPath = exports.getPathsToTry = void 0;
    var path2 = __require("path"), path_1 = __require("path"), filesystem_1 = require_filesystem();
    function getPathsToTry(extensions, absolutePathMappings, requestedModule) {
      if (!(!absolutePathMappings || !requestedModule || requestedModule[0] === ".")) {
        for (var pathsToTry = [], _i = 0, absolutePathMappings_1 = absolutePathMappings; _i < absolutePathMappings_1.length; _i++) {
          var entry = absolutePathMappings_1[_i], starMatch = entry.pattern === requestedModule ? "" : matchStar(entry.pattern, requestedModule);
          if (starMatch !== void 0)
            for (var _loop_1 = function(physicalPathPattern2) {
              var physicalPath = physicalPathPattern2.replace("*", starMatch);
              pathsToTry.push({ type: "file", path: physicalPath }), pathsToTry.push.apply(pathsToTry, extensions.map(function(e) {
                return { type: "extension", path: physicalPath + e };
              })), pathsToTry.push({
                type: "package",
                path: path2.join(physicalPath, "/package.json")
              });
              var indexPath = path2.join(physicalPath, "/index");
              pathsToTry.push.apply(pathsToTry, extensions.map(function(e) {
                return { type: "index", path: indexPath + e };
              }));
            }, _a = 0, _b = entry.paths; _a < _b.length; _a++) {
              var physicalPathPattern = _b[_a];
              _loop_1(physicalPathPattern);
            }
        }
        return pathsToTry.length === 0 ? void 0 : pathsToTry;
      }
    }
    exports.getPathsToTry = getPathsToTry;
    function getStrippedPath(tryPath) {
      return tryPath.type === "index" ? (0, path_1.dirname)(tryPath.path) : tryPath.type === "file" ? tryPath.path : tryPath.type === "extension" ? (0, filesystem_1.removeExtension)(tryPath.path) : tryPath.type === "package" ? tryPath.path : exhaustiveTypeException(tryPath.type);
    }
    exports.getStrippedPath = getStrippedPath;
    function exhaustiveTypeException(check) {
      throw new Error("Unknown type ".concat(check));
    }
    exports.exhaustiveTypeException = exhaustiveTypeException;
    function matchStar(pattern, search) {
      if (!(search.length < pattern.length)) {
        if (pattern === "*")
          return search;
        var star = pattern.indexOf("*");
        if (star !== -1) {
          var part1 = pattern.substring(0, star), part2 = pattern.substring(star + 1);
          if (search.substr(0, star) === part1 && search.substr(search.length - part2.length) === part2)
            return search.substr(star, search.length - part2.length);
        }
      }
    }
  }
});

// ../../node_modules/tsconfig-paths/lib/match-path-sync.js
var require_match_path_sync = __commonJS({
  "../../node_modules/tsconfig-paths/lib/match-path-sync.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.matchFromAbsolutePaths = exports.createMatchPath = void 0;
    var path2 = __require("path"), Filesystem = require_filesystem(), MappingEntry = require_mapping_entry(), TryPath = require_try_path();
    function createMatchPath2(absoluteBaseUrl, paths, mainFields, addMatchAll) {
      mainFields === void 0 && (mainFields = ["main"]), addMatchAll === void 0 && (addMatchAll = !0);
      var absolutePaths = MappingEntry.getAbsoluteMappingEntries(absoluteBaseUrl, paths, addMatchAll);
      return function(requestedModule, readJson, fileExists, extensions) {
        return matchFromAbsolutePaths(absolutePaths, requestedModule, readJson, fileExists, extensions, mainFields);
      };
    }
    exports.createMatchPath = createMatchPath2;
    function matchFromAbsolutePaths(absolutePathMappings, requestedModule, readJson, fileExists, extensions, mainFields) {
      readJson === void 0 && (readJson = Filesystem.readJsonFromDiskSync), fileExists === void 0 && (fileExists = Filesystem.fileExistsSync), extensions === void 0 && (extensions = Object.keys(__require.extensions)), mainFields === void 0 && (mainFields = ["main"]);
      var tryPaths = TryPath.getPathsToTry(extensions, absolutePathMappings, requestedModule);
      if (tryPaths)
        return findFirstExistingPath(tryPaths, readJson, fileExists, mainFields);
    }
    exports.matchFromAbsolutePaths = matchFromAbsolutePaths;
    function findFirstExistingMainFieldMappedFile(packageJson, mainFields, packageJsonPath, fileExists) {
      for (var index = 0; index < mainFields.length; index++) {
        var mainFieldSelector = mainFields[index], candidateMapping = typeof mainFieldSelector == "string" ? packageJson[mainFieldSelector] : mainFieldSelector.reduce(function(obj, key) {
          return obj[key];
        }, packageJson);
        if (candidateMapping && typeof candidateMapping == "string") {
          var candidateFilePath = path2.join(path2.dirname(packageJsonPath), candidateMapping);
          if (fileExists(candidateFilePath))
            return candidateFilePath;
        }
      }
    }
    function findFirstExistingPath(tryPaths, readJson, fileExists, mainFields) {
      readJson === void 0 && (readJson = Filesystem.readJsonFromDiskSync), mainFields === void 0 && (mainFields = ["main"]);
      for (var _i = 0, tryPaths_1 = tryPaths; _i < tryPaths_1.length; _i++) {
        var tryPath = tryPaths_1[_i];
        if (tryPath.type === "file" || tryPath.type === "extension" || tryPath.type === "index") {
          if (fileExists(tryPath.path))
            return TryPath.getStrippedPath(tryPath);
        } else if (tryPath.type === "package") {
          var packageJson = readJson(tryPath.path);
          if (packageJson) {
            var mainFieldMappedFile = findFirstExistingMainFieldMappedFile(packageJson, mainFields, tryPath.path, fileExists);
            if (mainFieldMappedFile)
              return mainFieldMappedFile;
          }
        } else
          TryPath.exhaustiveTypeException(tryPath.type);
      }
    }
  }
});

// ../../node_modules/tsconfig-paths/lib/match-path-async.js
var require_match_path_async = __commonJS({
  "../../node_modules/tsconfig-paths/lib/match-path-async.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.matchFromAbsolutePathsAsync = exports.createMatchPathAsync = void 0;
    var path2 = __require("path"), TryPath = require_try_path(), MappingEntry = require_mapping_entry(), Filesystem = require_filesystem();
    function createMatchPathAsync(absoluteBaseUrl, paths, mainFields, addMatchAll) {
      mainFields === void 0 && (mainFields = ["main"]), addMatchAll === void 0 && (addMatchAll = !0);
      var absolutePaths = MappingEntry.getAbsoluteMappingEntries(absoluteBaseUrl, paths, addMatchAll);
      return function(requestedModule, readJson, fileExists, extensions, callback) {
        return matchFromAbsolutePathsAsync(absolutePaths, requestedModule, readJson, fileExists, extensions, callback, mainFields);
      };
    }
    exports.createMatchPathAsync = createMatchPathAsync;
    function matchFromAbsolutePathsAsync(absolutePathMappings, requestedModule, readJson, fileExists, extensions, callback, mainFields) {
      readJson === void 0 && (readJson = Filesystem.readJsonFromDiskAsync), fileExists === void 0 && (fileExists = Filesystem.fileExistsAsync), extensions === void 0 && (extensions = Object.keys(__require.extensions)), mainFields === void 0 && (mainFields = ["main"]);
      var tryPaths = TryPath.getPathsToTry(extensions, absolutePathMappings, requestedModule);
      if (!tryPaths)
        return callback();
      findFirstExistingPath(tryPaths, readJson, fileExists, callback, 0, mainFields);
    }
    exports.matchFromAbsolutePathsAsync = matchFromAbsolutePathsAsync;
    function findFirstExistingMainFieldMappedFile(packageJson, mainFields, packageJsonPath, fileExistsAsync, doneCallback, index) {
      if (index === void 0 && (index = 0), index >= mainFields.length)
        return doneCallback(void 0, void 0);
      var tryNext = function() {
        return findFirstExistingMainFieldMappedFile(packageJson, mainFields, packageJsonPath, fileExistsAsync, doneCallback, index + 1);
      }, mainFieldSelector = mainFields[index], mainFieldMapping = typeof mainFieldSelector == "string" ? packageJson[mainFieldSelector] : mainFieldSelector.reduce(function(obj, key) {
        return obj[key];
      }, packageJson);
      if (typeof mainFieldMapping != "string")
        return tryNext();
      var mappedFilePath = path2.join(path2.dirname(packageJsonPath), mainFieldMapping);
      fileExistsAsync(mappedFilePath, function(err, exists) {
        return err ? doneCallback(err) : exists ? doneCallback(void 0, mappedFilePath) : tryNext();
      });
    }
    function findFirstExistingPath(tryPaths, readJson, fileExists, doneCallback, index, mainFields) {
      index === void 0 && (index = 0), mainFields === void 0 && (mainFields = ["main"]);
      var tryPath = tryPaths[index];
      tryPath.type === "file" || tryPath.type === "extension" || tryPath.type === "index" ? fileExists(tryPath.path, function(err, exists) {
        return err ? doneCallback(err) : exists ? doneCallback(void 0, TryPath.getStrippedPath(tryPath)) : index === tryPaths.length - 1 ? doneCallback() : findFirstExistingPath(tryPaths, readJson, fileExists, doneCallback, index + 1, mainFields);
      }) : tryPath.type === "package" ? readJson(tryPath.path, function(err, packageJson) {
        return err ? doneCallback(err) : packageJson ? findFirstExistingMainFieldMappedFile(packageJson, mainFields, tryPath.path, fileExists, function(mainFieldErr, mainFieldMappedFile) {
          return mainFieldErr ? doneCallback(mainFieldErr) : mainFieldMappedFile ? doneCallback(void 0, mainFieldMappedFile) : findFirstExistingPath(tryPaths, readJson, fileExists, doneCallback, index + 1, mainFields);
        }) : findFirstExistingPath(tryPaths, readJson, fileExists, doneCallback, index + 1, mainFields);
      }) : TryPath.exhaustiveTypeException(tryPath.type);
    }
  }
});

// ../../node_modules/json5/lib/unicode.js
var require_unicode = __commonJS({
  "../../node_modules/json5/lib/unicode.js"(exports, module) {
    module.exports.Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
    module.exports.ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
    module.exports.ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
  }
});

// ../../node_modules/json5/lib/util.js
var require_util = __commonJS({
  "../../node_modules/json5/lib/util.js"(exports, module) {
    var unicode = require_unicode();
    module.exports = {
      isSpaceSeparator(c) {
        return typeof c == "string" && unicode.Space_Separator.test(c);
      },
      isIdStartChar(c) {
        return typeof c == "string" && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c === "$" || c === "_" || unicode.ID_Start.test(c));
      },
      isIdContinueChar(c) {
        return typeof c == "string" && (c >= "a" && c <= "z" || c >= "A" && c <= "Z" || c >= "0" && c <= "9" || c === "$" || c === "_" || c === "\u200C" || c === "\u200D" || unicode.ID_Continue.test(c));
      },
      isDigit(c) {
        return typeof c == "string" && /[0-9]/.test(c);
      },
      isHexDigit(c) {
        return typeof c == "string" && /[0-9A-Fa-f]/.test(c);
      }
    };
  }
});

// ../../node_modules/json5/lib/parse.js
var require_parse = __commonJS({
  "../../node_modules/json5/lib/parse.js"(exports, module) {
    var util = require_util(), source, parseState, stack, pos, line, column, token, key, root;
    module.exports = function(text, reviver) {
      source = String(text), parseState = "start", stack = [], pos = 0, line = 1, column = 0, token = void 0, key = void 0, root = void 0;
      do
        token = lex(), parseStates[parseState]();
      while (token.type !== "eof");
      return typeof reviver == "function" ? internalize({ "": root }, "", reviver) : root;
    };
    function internalize(holder, name, reviver) {
      let value = holder[name];
      if (value != null && typeof value == "object")
        if (Array.isArray(value))
          for (let i = 0; i < value.length; i++) {
            let key2 = String(i), replacement = internalize(value, key2, reviver);
            replacement === void 0 ? delete value[key2] : Object.defineProperty(value, key2, {
              value: replacement,
              writable: !0,
              enumerable: !0,
              configurable: !0
            });
          }
        else
          for (let key2 in value) {
            let replacement = internalize(value, key2, reviver);
            replacement === void 0 ? delete value[key2] : Object.defineProperty(value, key2, {
              value: replacement,
              writable: !0,
              enumerable: !0,
              configurable: !0
            });
          }
      return reviver.call(holder, name, value);
    }
    var lexState, buffer, doubleQuote, sign, c;
    function lex() {
      for (lexState = "default", buffer = "", doubleQuote = !1, sign = 1; ; ) {
        c = peek();
        let token2 = lexStates[lexState]();
        if (token2)
          return token2;
      }
    }
    function peek() {
      if (source[pos])
        return String.fromCodePoint(source.codePointAt(pos));
    }
    function read() {
      let c2 = peek();
      return c2 === `
` ? (line++, column = 0) : c2 ? column += c2.length : column++, c2 && (pos += c2.length), c2;
    }
    var lexStates = {
      default() {
        switch (c) {
          case "	":
          case "\v":
          case "\f":
          case " ":
          case "\xA0":
          case "\uFEFF":
          case `
`:
          case "\r":
          case "\u2028":
          case "\u2029":
            read();
            return;
          case "/":
            read(), lexState = "comment";
            return;
          case void 0:
            return read(), newToken("eof");
        }
        if (util.isSpaceSeparator(c)) {
          read();
          return;
        }
        return lexStates[parseState]();
      },
      comment() {
        switch (c) {
          case "*":
            read(), lexState = "multiLineComment";
            return;
          case "/":
            read(), lexState = "singleLineComment";
            return;
        }
        throw invalidChar(read());
      },
      multiLineComment() {
        switch (c) {
          case "*":
            read(), lexState = "multiLineCommentAsterisk";
            return;
          case void 0:
            throw invalidChar(read());
        }
        read();
      },
      multiLineCommentAsterisk() {
        switch (c) {
          case "*":
            read();
            return;
          case "/":
            read(), lexState = "default";
            return;
          case void 0:
            throw invalidChar(read());
        }
        read(), lexState = "multiLineComment";
      },
      singleLineComment() {
        switch (c) {
          case `
`:
          case "\r":
          case "\u2028":
          case "\u2029":
            read(), lexState = "default";
            return;
          case void 0:
            return read(), newToken("eof");
        }
        read();
      },
      value() {
        switch (c) {
          case "{":
          case "[":
            return newToken("punctuator", read());
          case "n":
            return read(), literal("ull"), newToken("null", null);
          case "t":
            return read(), literal("rue"), newToken("boolean", !0);
          case "f":
            return read(), literal("alse"), newToken("boolean", !1);
          case "-":
          case "+":
            read() === "-" && (sign = -1), lexState = "sign";
            return;
          case ".":
            buffer = read(), lexState = "decimalPointLeading";
            return;
          case "0":
            buffer = read(), lexState = "zero";
            return;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            buffer = read(), lexState = "decimalInteger";
            return;
          case "I":
            return read(), literal("nfinity"), newToken("numeric", 1 / 0);
          case "N":
            return read(), literal("aN"), newToken("numeric", NaN);
          case '"':
          case "'":
            doubleQuote = read() === '"', buffer = "", lexState = "string";
            return;
        }
        throw invalidChar(read());
      },
      identifierNameStartEscape() {
        if (c !== "u")
          throw invalidChar(read());
        read();
        let u = unicodeEscape();
        switch (u) {
          case "$":
          case "_":
            break;
          default:
            if (!util.isIdStartChar(u))
              throw invalidIdentifier();
            break;
        }
        buffer += u, lexState = "identifierName";
      },
      identifierName() {
        switch (c) {
          case "$":
          case "_":
          case "\u200C":
          case "\u200D":
            buffer += read();
            return;
          case "\\":
            read(), lexState = "identifierNameEscape";
            return;
        }
        if (util.isIdContinueChar(c)) {
          buffer += read();
          return;
        }
        return newToken("identifier", buffer);
      },
      identifierNameEscape() {
        if (c !== "u")
          throw invalidChar(read());
        read();
        let u = unicodeEscape();
        switch (u) {
          case "$":
          case "_":
          case "\u200C":
          case "\u200D":
            break;
          default:
            if (!util.isIdContinueChar(u))
              throw invalidIdentifier();
            break;
        }
        buffer += u, lexState = "identifierName";
      },
      sign() {
        switch (c) {
          case ".":
            buffer = read(), lexState = "decimalPointLeading";
            return;
          case "0":
            buffer = read(), lexState = "zero";
            return;
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9":
            buffer = read(), lexState = "decimalInteger";
            return;
          case "I":
            return read(), literal("nfinity"), newToken("numeric", sign * (1 / 0));
          case "N":
            return read(), literal("aN"), newToken("numeric", NaN);
        }
        throw invalidChar(read());
      },
      zero() {
        switch (c) {
          case ".":
            buffer += read(), lexState = "decimalPoint";
            return;
          case "e":
          case "E":
            buffer += read(), lexState = "decimalExponent";
            return;
          case "x":
          case "X":
            buffer += read(), lexState = "hexadecimal";
            return;
        }
        return newToken("numeric", sign * 0);
      },
      decimalInteger() {
        switch (c) {
          case ".":
            buffer += read(), lexState = "decimalPoint";
            return;
          case "e":
          case "E":
            buffer += read(), lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalPointLeading() {
        if (util.isDigit(c)) {
          buffer += read(), lexState = "decimalFraction";
          return;
        }
        throw invalidChar(read());
      },
      decimalPoint() {
        switch (c) {
          case "e":
          case "E":
            buffer += read(), lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read(), lexState = "decimalFraction";
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalFraction() {
        switch (c) {
          case "e":
          case "E":
            buffer += read(), lexState = "decimalExponent";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      decimalExponent() {
        switch (c) {
          case "+":
          case "-":
            buffer += read(), lexState = "decimalExponentSign";
            return;
        }
        if (util.isDigit(c)) {
          buffer += read(), lexState = "decimalExponentInteger";
          return;
        }
        throw invalidChar(read());
      },
      decimalExponentSign() {
        if (util.isDigit(c)) {
          buffer += read(), lexState = "decimalExponentInteger";
          return;
        }
        throw invalidChar(read());
      },
      decimalExponentInteger() {
        if (util.isDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      hexadecimal() {
        if (util.isHexDigit(c)) {
          buffer += read(), lexState = "hexadecimalInteger";
          return;
        }
        throw invalidChar(read());
      },
      hexadecimalInteger() {
        if (util.isHexDigit(c)) {
          buffer += read();
          return;
        }
        return newToken("numeric", sign * Number(buffer));
      },
      string() {
        switch (c) {
          case "\\":
            read(), buffer += escape();
            return;
          case '"':
            if (doubleQuote)
              return read(), newToken("string", buffer);
            buffer += read();
            return;
          case "'":
            if (!doubleQuote)
              return read(), newToken("string", buffer);
            buffer += read();
            return;
          case `
`:
          case "\r":
            throw invalidChar(read());
          case "\u2028":
          case "\u2029":
            separatorChar(c);
            break;
          case void 0:
            throw invalidChar(read());
        }
        buffer += read();
      },
      start() {
        switch (c) {
          case "{":
          case "[":
            return newToken("punctuator", read());
        }
        lexState = "value";
      },
      beforePropertyName() {
        switch (c) {
          case "$":
          case "_":
            buffer = read(), lexState = "identifierName";
            return;
          case "\\":
            read(), lexState = "identifierNameStartEscape";
            return;
          case "}":
            return newToken("punctuator", read());
          case '"':
          case "'":
            doubleQuote = read() === '"', lexState = "string";
            return;
        }
        if (util.isIdStartChar(c)) {
          buffer += read(), lexState = "identifierName";
          return;
        }
        throw invalidChar(read());
      },
      afterPropertyName() {
        if (c === ":")
          return newToken("punctuator", read());
        throw invalidChar(read());
      },
      beforePropertyValue() {
        lexState = "value";
      },
      afterPropertyValue() {
        switch (c) {
          case ",":
          case "}":
            return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      beforeArrayValue() {
        if (c === "]")
          return newToken("punctuator", read());
        lexState = "value";
      },
      afterArrayValue() {
        switch (c) {
          case ",":
          case "]":
            return newToken("punctuator", read());
        }
        throw invalidChar(read());
      },
      end() {
        throw invalidChar(read());
      }
    };
    function newToken(type, value) {
      return {
        type,
        value,
        line,
        column
      };
    }
    function literal(s) {
      for (let c2 of s) {
        if (peek() !== c2)
          throw invalidChar(read());
        read();
      }
    }
    function escape() {
      switch (peek()) {
        case "b":
          return read(), "\b";
        case "f":
          return read(), "\f";
        case "n":
          return read(), `
`;
        case "r":
          return read(), "\r";
        case "t":
          return read(), "	";
        case "v":
          return read(), "\v";
        case "0":
          if (read(), util.isDigit(peek()))
            throw invalidChar(read());
          return "\0";
        case "x":
          return read(), hexEscape();
        case "u":
          return read(), unicodeEscape();
        case `
`:
        case "\u2028":
        case "\u2029":
          return read(), "";
        case "\r":
          return read(), peek() === `
` && read(), "";
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          throw invalidChar(read());
        case void 0:
          throw invalidChar(read());
      }
      return read();
    }
    function hexEscape() {
      let buffer2 = "", c2 = peek();
      if (!util.isHexDigit(c2) || (buffer2 += read(), c2 = peek(), !util.isHexDigit(c2)))
        throw invalidChar(read());
      return buffer2 += read(), String.fromCodePoint(parseInt(buffer2, 16));
    }
    function unicodeEscape() {
      let buffer2 = "", count = 4;
      for (; count-- > 0; ) {
        let c2 = peek();
        if (!util.isHexDigit(c2))
          throw invalidChar(read());
        buffer2 += read();
      }
      return String.fromCodePoint(parseInt(buffer2, 16));
    }
    var parseStates = {
      start() {
        if (token.type === "eof")
          throw invalidEOF();
        push();
      },
      beforePropertyName() {
        switch (token.type) {
          case "identifier":
          case "string":
            key = token.value, parseState = "afterPropertyName";
            return;
          case "punctuator":
            pop();
            return;
          case "eof":
            throw invalidEOF();
        }
      },
      afterPropertyName() {
        if (token.type === "eof")
          throw invalidEOF();
        parseState = "beforePropertyValue";
      },
      beforePropertyValue() {
        if (token.type === "eof")
          throw invalidEOF();
        push();
      },
      beforeArrayValue() {
        if (token.type === "eof")
          throw invalidEOF();
        if (token.type === "punctuator" && token.value === "]") {
          pop();
          return;
        }
        push();
      },
      afterPropertyValue() {
        if (token.type === "eof")
          throw invalidEOF();
        switch (token.value) {
          case ",":
            parseState = "beforePropertyName";
            return;
          case "}":
            pop();
        }
      },
      afterArrayValue() {
        if (token.type === "eof")
          throw invalidEOF();
        switch (token.value) {
          case ",":
            parseState = "beforeArrayValue";
            return;
          case "]":
            pop();
        }
      },
      end() {
      }
    };
    function push() {
      let value;
      switch (token.type) {
        case "punctuator":
          switch (token.value) {
            case "{":
              value = {};
              break;
            case "[":
              value = [];
              break;
          }
          break;
        case "null":
        case "boolean":
        case "numeric":
        case "string":
          value = token.value;
          break;
      }
      if (root === void 0)
        root = value;
      else {
        let parent = stack[stack.length - 1];
        Array.isArray(parent) ? parent.push(value) : Object.defineProperty(parent, key, {
          value,
          writable: !0,
          enumerable: !0,
          configurable: !0
        });
      }
      if (value !== null && typeof value == "object")
        stack.push(value), Array.isArray(value) ? parseState = "beforeArrayValue" : parseState = "beforePropertyName";
      else {
        let current = stack[stack.length - 1];
        current == null ? parseState = "end" : Array.isArray(current) ? parseState = "afterArrayValue" : parseState = "afterPropertyValue";
      }
    }
    function pop() {
      stack.pop();
      let current = stack[stack.length - 1];
      current == null ? parseState = "end" : Array.isArray(current) ? parseState = "afterArrayValue" : parseState = "afterPropertyValue";
    }
    function invalidChar(c2) {
      return syntaxError(c2 === void 0 ? `JSON5: invalid end of input at ${line}:${column}` : `JSON5: invalid character '${formatChar(c2)}' at ${line}:${column}`);
    }
    function invalidEOF() {
      return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
    }
    function invalidIdentifier() {
      return column -= 5, syntaxError(`JSON5: invalid identifier character at ${line}:${column}`);
    }
    function separatorChar(c2) {
      console.warn(`JSON5: '${formatChar(c2)}' in strings is not valid ECMAScript; consider escaping`);
    }
    function formatChar(c2) {
      let replacements = {
        "'": "\\'",
        '"': '\\"',
        "\\": "\\\\",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "	": "\\t",
        "\v": "\\v",
        "\0": "\\0",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029"
      };
      if (replacements[c2])
        return replacements[c2];
      if (c2 < " ") {
        let hexString = c2.charCodeAt(0).toString(16);
        return "\\x" + ("00" + hexString).substring(hexString.length);
      }
      return c2;
    }
    function syntaxError(message) {
      let err = new SyntaxError(message);
      return err.lineNumber = line, err.columnNumber = column, err;
    }
  }
});

// ../../node_modules/json5/lib/stringify.js
var require_stringify = __commonJS({
  "../../node_modules/json5/lib/stringify.js"(exports, module) {
    var util = require_util();
    module.exports = function(value, replacer, space) {
      let stack = [], indent2 = "", propertyList, replacerFunc, gap = "", quote;
      if (replacer != null && typeof replacer == "object" && !Array.isArray(replacer) && (space = replacer.space, quote = replacer.quote, replacer = replacer.replacer), typeof replacer == "function")
        replacerFunc = replacer;
      else if (Array.isArray(replacer)) {
        propertyList = [];
        for (let v of replacer) {
          let item;
          typeof v == "string" ? item = v : (typeof v == "number" || v instanceof String || v instanceof Number) && (item = String(v)), item !== void 0 && propertyList.indexOf(item) < 0 && propertyList.push(item);
        }
      }
      return space instanceof Number ? space = Number(space) : space instanceof String && (space = String(space)), typeof space == "number" ? space > 0 && (space = Math.min(10, Math.floor(space)), gap = "          ".substr(0, space)) : typeof space == "string" && (gap = space.substr(0, 10)), serializeProperty("", { "": value });
      function serializeProperty(key, holder) {
        let value2 = holder[key];
        switch (value2 != null && (typeof value2.toJSON5 == "function" ? value2 = value2.toJSON5(key) : typeof value2.toJSON == "function" && (value2 = value2.toJSON(key))), replacerFunc && (value2 = replacerFunc.call(holder, key, value2)), value2 instanceof Number ? value2 = Number(value2) : value2 instanceof String ? value2 = String(value2) : value2 instanceof Boolean && (value2 = value2.valueOf()), value2) {
          case null:
            return "null";
          case !0:
            return "true";
          case !1:
            return "false";
        }
        if (typeof value2 == "string")
          return quoteString(value2, !1);
        if (typeof value2 == "number")
          return String(value2);
        if (typeof value2 == "object")
          return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
      }
      function quoteString(value2) {
        let quotes = {
          "'": 0.1,
          '"': 0.2
        }, replacements = {
          "'": "\\'",
          '"': '\\"',
          "\\": "\\\\",
          "\b": "\\b",
          "\f": "\\f",
          "\n": "\\n",
          "\r": "\\r",
          "	": "\\t",
          "\v": "\\v",
          "\0": "\\0",
          "\u2028": "\\u2028",
          "\u2029": "\\u2029"
        }, product = "";
        for (let i = 0; i < value2.length; i++) {
          let c = value2[i];
          switch (c) {
            case "'":
            case '"':
              quotes[c]++, product += c;
              continue;
            case "\0":
              if (util.isDigit(value2[i + 1])) {
                product += "\\x00";
                continue;
              }
          }
          if (replacements[c]) {
            product += replacements[c];
            continue;
          }
          if (c < " ") {
            let hexString = c.charCodeAt(0).toString(16);
            product += "\\x" + ("00" + hexString).substring(hexString.length);
            continue;
          }
          product += c;
        }
        let quoteChar = quote || Object.keys(quotes).reduce((a, b) => quotes[a] < quotes[b] ? a : b);
        return product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]), quoteChar + product + quoteChar;
      }
      function serializeObject(value2) {
        if (stack.indexOf(value2) >= 0)
          throw TypeError("Converting circular structure to JSON5");
        stack.push(value2);
        let stepback = indent2;
        indent2 = indent2 + gap;
        let keys = propertyList || Object.keys(value2), partial = [];
        for (let key of keys) {
          let propertyString = serializeProperty(key, value2);
          if (propertyString !== void 0) {
            let member = serializeKey(key) + ":";
            gap !== "" && (member += " "), member += propertyString, partial.push(member);
          }
        }
        let final;
        if (partial.length === 0)
          final = "{}";
        else {
          let properties;
          if (gap === "")
            properties = partial.join(","), final = "{" + properties + "}";
          else {
            let separator = `,
` + indent2;
            properties = partial.join(separator), final = `{
` + indent2 + properties + `,
` + stepback + "}";
          }
        }
        return stack.pop(), indent2 = stepback, final;
      }
      function serializeKey(key) {
        if (key.length === 0)
          return quoteString(key, !0);
        let firstChar = String.fromCodePoint(key.codePointAt(0));
        if (!util.isIdStartChar(firstChar))
          return quoteString(key, !0);
        for (let i = firstChar.length; i < key.length; i++)
          if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i))))
            return quoteString(key, !0);
        return key;
      }
      function serializeArray(value2) {
        if (stack.indexOf(value2) >= 0)
          throw TypeError("Converting circular structure to JSON5");
        stack.push(value2);
        let stepback = indent2;
        indent2 = indent2 + gap;
        let partial = [];
        for (let i = 0; i < value2.length; i++) {
          let propertyString = serializeProperty(String(i), value2);
          partial.push(propertyString !== void 0 ? propertyString : "null");
        }
        let final;
        if (partial.length === 0)
          final = "[]";
        else if (gap === "")
          final = "[" + partial.join(",") + "]";
        else {
          let separator = `,
` + indent2, properties = partial.join(separator);
          final = `[
` + indent2 + properties + `,
` + stepback + "]";
        }
        return stack.pop(), indent2 = stepback, final;
      }
    };
  }
});

// ../../node_modules/json5/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/json5/lib/index.js"(exports, module) {
    var parse4 = require_parse(), stringify2 = require_stringify(), JSON5 = {
      parse: parse4,
      stringify: stringify2
    };
    module.exports = JSON5;
  }
});

// ../../node_modules/strip-bom/index.js
var require_strip_bom = __commonJS({
  "../../node_modules/strip-bom/index.js"(exports, module) {
    "use strict";
    module.exports = (x) => {
      if (typeof x != "string")
        throw new TypeError("Expected a string, got " + typeof x);
      return x.charCodeAt(0) === 65279 ? x.slice(1) : x;
    };
  }
});

// ../../node_modules/tsconfig-paths/lib/tsconfig-loader.js
var require_tsconfig_loader = __commonJS({
  "../../node_modules/tsconfig-paths/lib/tsconfig-loader.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      return __assign = Object.assign || function(t5) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) Object.prototype.hasOwnProperty.call(s, p) && (t5[p] = s[p]);
        }
        return t5;
      }, __assign.apply(this, arguments);
    };
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.loadTsconfig = exports.walkForTsConfig = exports.tsConfigLoader = void 0;
    var path2 = __require("path"), fs = __require("fs"), JSON5 = require_lib(), StripBom = require_strip_bom();
    function tsConfigLoader(_a) {
      var getEnv = _a.getEnv, cwd2 = _a.cwd, _b = _a.loadSync, loadSync = _b === void 0 ? loadSyncDefault : _b, TS_NODE_PROJECT = getEnv("TS_NODE_PROJECT"), TS_NODE_BASEURL = getEnv("TS_NODE_BASEURL"), loadResult = loadSync(cwd2, TS_NODE_PROJECT, TS_NODE_BASEURL);
      return loadResult;
    }
    exports.tsConfigLoader = tsConfigLoader;
    function loadSyncDefault(cwd2, filename, baseUrl) {
      var configPath = resolveConfigPath(cwd2, filename);
      if (!configPath)
        return {
          tsConfigPath: void 0,
          baseUrl: void 0,
          paths: void 0
        };
      var config = loadTsconfig(configPath);
      return {
        tsConfigPath: configPath,
        baseUrl: baseUrl || config && config.compilerOptions && config.compilerOptions.baseUrl,
        paths: config && config.compilerOptions && config.compilerOptions.paths
      };
    }
    function resolveConfigPath(cwd2, filename) {
      if (filename) {
        var absolutePath = fs.lstatSync(filename).isDirectory() ? path2.resolve(filename, "./tsconfig.json") : path2.resolve(cwd2, filename);
        return absolutePath;
      }
      if (fs.statSync(cwd2).isFile())
        return path2.resolve(cwd2);
      var configAbsolutePath = walkForTsConfig(cwd2);
      return configAbsolutePath ? path2.resolve(configAbsolutePath) : void 0;
    }
    function walkForTsConfig(directory, readdirSync) {
      readdirSync === void 0 && (readdirSync = fs.readdirSync);
      for (var files = readdirSync(directory), filesToCheck = ["tsconfig.json", "jsconfig.json"], _i = 0, filesToCheck_1 = filesToCheck; _i < filesToCheck_1.length; _i++) {
        var fileToCheck = filesToCheck_1[_i];
        if (files.indexOf(fileToCheck) !== -1)
          return path2.join(directory, fileToCheck);
      }
      var parentDirectory = path2.dirname(directory);
      if (directory !== parentDirectory)
        return walkForTsConfig(parentDirectory, readdirSync);
    }
    exports.walkForTsConfig = walkForTsConfig;
    function loadTsconfig(configFilePath, existsSync3, readFileSync2) {
      if (existsSync3 === void 0 && (existsSync3 = fs.existsSync), readFileSync2 === void 0 && (readFileSync2 = function(filename) {
        return fs.readFileSync(filename, "utf8");
      }), !!existsSync3(configFilePath)) {
        var configString = readFileSync2(configFilePath), cleanedJson = StripBom(configString), config;
        try {
          config = JSON5.parse(cleanedJson);
        } catch (e) {
          throw new Error("".concat(configFilePath, " is malformed ").concat(e.message));
        }
        var extendedConfig = config.extends;
        if (extendedConfig) {
          var base = void 0;
          return Array.isArray(extendedConfig) ? base = extendedConfig.reduce(function(currBase, extendedConfigElement) {
            return mergeTsconfigs(currBase, loadTsconfigFromExtends(configFilePath, extendedConfigElement, existsSync3, readFileSync2));
          }, {}) : base = loadTsconfigFromExtends(configFilePath, extendedConfig, existsSync3, readFileSync2), mergeTsconfigs(base, config);
        }
        return config;
      }
    }
    exports.loadTsconfig = loadTsconfig;
    function loadTsconfigFromExtends(configFilePath, extendedConfigValue, existsSync3, readFileSync2) {
      var _a;
      typeof extendedConfigValue == "string" && extendedConfigValue.indexOf(".json") === -1 && (extendedConfigValue += ".json");
      var currentDir = path2.dirname(configFilePath), extendedConfigPath = path2.join(currentDir, extendedConfigValue);
      extendedConfigValue.indexOf("/") !== -1 && extendedConfigValue.indexOf(".") !== -1 && !existsSync3(extendedConfigPath) && (extendedConfigPath = path2.join(currentDir, "node_modules", extendedConfigValue));
      var config = loadTsconfig(extendedConfigPath, existsSync3, readFileSync2) || {};
      if (!((_a = config.compilerOptions) === null || _a === void 0) && _a.baseUrl) {
        var extendsDir = path2.dirname(extendedConfigValue);
        config.compilerOptions.baseUrl = path2.join(extendsDir, config.compilerOptions.baseUrl);
      }
      return config;
    }
    function mergeTsconfigs(base, config) {
      return base = base || {}, config = config || {}, __assign(__assign(__assign({}, base), config), { compilerOptions: __assign(__assign({}, base.compilerOptions), config.compilerOptions) });
    }
  }
});

// ../../node_modules/tsconfig-paths/lib/config-loader.js
var require_config_loader = __commonJS({
  "../../node_modules/tsconfig-paths/lib/config-loader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.configLoader = exports.loadConfig = void 0;
    var TsConfigLoader2 = require_tsconfig_loader(), path2 = __require("path");
    function loadConfig2(cwd2) {
      return cwd2 === void 0 && (cwd2 = process.cwd()), configLoader({ cwd: cwd2 });
    }
    exports.loadConfig = loadConfig2;
    function configLoader(_a) {
      var cwd2 = _a.cwd, explicitParams = _a.explicitParams, _b = _a.tsConfigLoader, tsConfigLoader = _b === void 0 ? TsConfigLoader2.tsConfigLoader : _b;
      if (explicitParams) {
        var absoluteBaseUrl = path2.isAbsolute(explicitParams.baseUrl) ? explicitParams.baseUrl : path2.join(cwd2, explicitParams.baseUrl);
        return {
          resultType: "success",
          configFileAbsolutePath: "",
          baseUrl: explicitParams.baseUrl,
          absoluteBaseUrl,
          paths: explicitParams.paths,
          mainFields: explicitParams.mainFields,
          addMatchAll: explicitParams.addMatchAll
        };
      }
      var loadResult = tsConfigLoader({
        cwd: cwd2,
        getEnv: function(key) {
          return process.env[key];
        }
      });
      return loadResult.tsConfigPath ? {
        resultType: "success",
        configFileAbsolutePath: loadResult.tsConfigPath,
        baseUrl: loadResult.baseUrl,
        absoluteBaseUrl: path2.resolve(path2.dirname(loadResult.tsConfigPath), loadResult.baseUrl || ""),
        paths: loadResult.paths || {},
        addMatchAll: loadResult.baseUrl !== void 0
      } : {
        resultType: "failed",
        message: "Couldn't find tsconfig.json"
      };
    }
    exports.configLoader = configLoader;
  }
});

// ../../node_modules/minimist/index.js
var require_minimist = __commonJS({
  "../../node_modules/minimist/index.js"(exports, module) {
    "use strict";
    function hasKey(obj, keys) {
      var o = obj;
      keys.slice(0, -1).forEach(function(key2) {
        o = o[key2] || {};
      });
      var key = keys[keys.length - 1];
      return key in o;
    }
    function isNumber(x) {
      return typeof x == "number" || /^0x[0-9a-f]+$/i.test(x) ? !0 : /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x);
    }
    function isConstructorOrProto(obj, key) {
      return key === "constructor" && typeof obj[key] == "function" || key === "__proto__";
    }
    module.exports = function(args, opts) {
      opts || (opts = {});
      var flags = {
        bools: {},
        strings: {},
        unknownFn: null
      };
      typeof opts.unknown == "function" && (flags.unknownFn = opts.unknown), typeof opts.boolean == "boolean" && opts.boolean ? flags.allBools = !0 : [].concat(opts.boolean).filter(Boolean).forEach(function(key2) {
        flags.bools[key2] = !0;
      });
      var aliases = {};
      function aliasIsBoolean(key2) {
        return aliases[key2].some(function(x) {
          return flags.bools[x];
        });
      }
      Object.keys(opts.alias || {}).forEach(function(key2) {
        aliases[key2] = [].concat(opts.alias[key2]), aliases[key2].forEach(function(x) {
          aliases[x] = [key2].concat(aliases[key2].filter(function(y) {
            return x !== y;
          }));
        });
      }), [].concat(opts.string).filter(Boolean).forEach(function(key2) {
        flags.strings[key2] = !0, aliases[key2] && [].concat(aliases[key2]).forEach(function(k) {
          flags.strings[k] = !0;
        });
      });
      var defaults = opts.default || {}, argv = { _: [] };
      function argDefined(key2, arg2) {
        return flags.allBools && /^--[^=]+$/.test(arg2) || flags.strings[key2] || flags.bools[key2] || aliases[key2];
      }
      function setKey(obj, keys, value2) {
        for (var o = obj, i2 = 0; i2 < keys.length - 1; i2++) {
          var key2 = keys[i2];
          if (isConstructorOrProto(o, key2))
            return;
          o[key2] === void 0 && (o[key2] = {}), (o[key2] === Object.prototype || o[key2] === Number.prototype || o[key2] === String.prototype) && (o[key2] = {}), o[key2] === Array.prototype && (o[key2] = []), o = o[key2];
        }
        var lastKey = keys[keys.length - 1];
        isConstructorOrProto(o, lastKey) || ((o === Object.prototype || o === Number.prototype || o === String.prototype) && (o = {}), o === Array.prototype && (o = []), o[lastKey] === void 0 || flags.bools[lastKey] || typeof o[lastKey] == "boolean" ? o[lastKey] = value2 : Array.isArray(o[lastKey]) ? o[lastKey].push(value2) : o[lastKey] = [o[lastKey], value2]);
      }
      function setArg(key2, val, arg2) {
        if (!(arg2 && flags.unknownFn && !argDefined(key2, arg2) && flags.unknownFn(arg2) === !1)) {
          var value2 = !flags.strings[key2] && isNumber(val) ? Number(val) : val;
          setKey(argv, key2.split("."), value2), (aliases[key2] || []).forEach(function(x) {
            setKey(argv, x.split("."), value2);
          });
        }
      }
      Object.keys(flags.bools).forEach(function(key2) {
        setArg(key2, defaults[key2] === void 0 ? !1 : defaults[key2]);
      });
      var notFlags = [];
      args.indexOf("--") !== -1 && (notFlags = args.slice(args.indexOf("--") + 1), args = args.slice(0, args.indexOf("--")));
      for (var i = 0; i < args.length; i++) {
        var arg = args[i], key, next;
        if (/^--.+=/.test(arg)) {
          var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
          key = m[1];
          var value = m[2];
          flags.bools[key] && (value = value !== "false"), setArg(key, value, arg);
        } else if (/^--no-.+/.test(arg))
          key = arg.match(/^--no-(.+)/)[1], setArg(key, !1, arg);
        else if (/^--.+/.test(arg))
          key = arg.match(/^--(.+)/)[1], next = args[i + 1], next !== void 0 && !/^(-|--)[^-]/.test(next) && !flags.bools[key] && !flags.allBools && (!aliases[key] || !aliasIsBoolean(key)) ? (setArg(key, next, arg), i += 1) : /^(true|false)$/.test(next) ? (setArg(key, next === "true", arg), i += 1) : setArg(key, flags.strings[key] ? "" : !0, arg);
        else if (/^-[^-]+/.test(arg)) {
          for (var letters = arg.slice(1, -1).split(""), broken = !1, j = 0; j < letters.length; j++) {
            if (next = arg.slice(j + 2), next === "-") {
              setArg(letters[j], next, arg);
              continue;
            }
            if (/[A-Za-z]/.test(letters[j]) && next[0] === "=") {
              setArg(letters[j], next.slice(1), arg), broken = !0;
              break;
            }
            if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
              setArg(letters[j], next, arg), broken = !0;
              break;
            }
            if (letters[j + 1] && letters[j + 1].match(/\W/)) {
              setArg(letters[j], arg.slice(j + 2), arg), broken = !0;
              break;
            } else
              setArg(letters[j], flags.strings[letters[j]] ? "" : !0, arg);
          }
          key = arg.slice(-1)[0], !broken && key !== "-" && (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) && !flags.bools[key] && (!aliases[key] || !aliasIsBoolean(key)) ? (setArg(key, args[i + 1], arg), i += 1) : args[i + 1] && /^(true|false)$/.test(args[i + 1]) ? (setArg(key, args[i + 1] === "true", arg), i += 1) : setArg(key, flags.strings[key] ? "" : !0, arg));
        } else if ((!flags.unknownFn || flags.unknownFn(arg) !== !1) && argv._.push(flags.strings._ || !isNumber(arg) ? arg : Number(arg)), opts.stopEarly) {
          argv._.push.apply(argv._, args.slice(i + 1));
          break;
        }
      }
      return Object.keys(defaults).forEach(function(k) {
        hasKey(argv, k.split(".")) || (setKey(argv, k.split("."), defaults[k]), (aliases[k] || []).forEach(function(x) {
          setKey(argv, x.split("."), defaults[k]);
        }));
      }), opts["--"] ? argv["--"] = notFlags.slice() : notFlags.forEach(function(k) {
        argv._.push(k);
      }), argv;
    };
  }
});

// ../../node_modules/tsconfig-paths/lib/register.js
var require_register = __commonJS({
  "../../node_modules/tsconfig-paths/lib/register.js"(exports) {
    "use strict";
    var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++)
        (ar || !(i in from)) && (ar || (ar = Array.prototype.slice.call(from, 0, i)), ar[i] = from[i]);
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.register = void 0;
    var match_path_sync_1 = require_match_path_sync(), config_loader_1 = require_config_loader(), noOp = function() {
    };
    function getCoreModules(builtinModules) {
      builtinModules = builtinModules || [
        "assert",
        "buffer",
        "child_process",
        "cluster",
        "crypto",
        "dgram",
        "dns",
        "domain",
        "events",
        "fs",
        "http",
        "https",
        "net",
        "os",
        "path",
        "punycode",
        "querystring",
        "readline",
        "stream",
        "string_decoder",
        "tls",
        "tty",
        "url",
        "util",
        "v8",
        "vm",
        "zlib"
      ];
      for (var coreModules = {}, _i = 0, builtinModules_1 = builtinModules; _i < builtinModules_1.length; _i++) {
        var module_1 = builtinModules_1[_i];
        coreModules[module_1] = !0;
      }
      return coreModules;
    }
    function register(params) {
      var cwd2, explicitParams;
      if (params)
        cwd2 = params.cwd, (params.baseUrl || params.paths) && (explicitParams = params);
      else {
        var minimist = require_minimist(), argv = minimist(process.argv.slice(2), {
          // eslint-disable-next-line id-denylist
          string: ["project"],
          alias: {
            project: ["P"]
          }
        });
        cwd2 = argv.project;
      }
      var configLoaderResult = (0, config_loader_1.configLoader)({
        cwd: cwd2 ?? process.cwd(),
        explicitParams
      });
      if (configLoaderResult.resultType === "failed")
        return console.warn("".concat(configLoaderResult.message, ". tsconfig-paths will be skipped")), noOp;
      var matchPath2 = (0, match_path_sync_1.createMatchPath)(configLoaderResult.absoluteBaseUrl, configLoaderResult.paths, configLoaderResult.mainFields, configLoaderResult.addMatchAll), Module = __require("module"), originalResolveFilename = Module._resolveFilename, coreModules = getCoreModules(Module.builtinModules);
      return Module._resolveFilename = function(request, _parent) {
        var isCoreModule = coreModules.hasOwnProperty(request);
        if (!isCoreModule) {
          var found = matchPath2(request);
          if (found) {
            var modifiedArguments = __spreadArray([found], [].slice.call(arguments, 1), !0);
            return originalResolveFilename.apply(this, modifiedArguments);
          }
        }
        return originalResolveFilename.apply(this, arguments);
      }, function() {
        Module._resolveFilename = originalResolveFilename;
      };
    }
    exports.register = register;
  }
});

// ../../node_modules/tsconfig-paths/lib/index.js
var require_lib2 = __commonJS({
  "../../node_modules/tsconfig-paths/lib/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: !0 });
    exports.loadConfig = exports.register = exports.matchFromAbsolutePathsAsync = exports.createMatchPathAsync = exports.matchFromAbsolutePaths = exports.createMatchPath = void 0;
    var match_path_sync_1 = require_match_path_sync();
    Object.defineProperty(exports, "createMatchPath", { enumerable: !0, get: function() {
      return match_path_sync_1.createMatchPath;
    } });
    Object.defineProperty(exports, "matchFromAbsolutePaths", { enumerable: !0, get: function() {
      return match_path_sync_1.matchFromAbsolutePaths;
    } });
    var match_path_async_1 = require_match_path_async();
    Object.defineProperty(exports, "createMatchPathAsync", { enumerable: !0, get: function() {
      return match_path_async_1.createMatchPathAsync;
    } });
    Object.defineProperty(exports, "matchFromAbsolutePathsAsync", { enumerable: !0, get: function() {
      return match_path_async_1.matchFromAbsolutePathsAsync;
    } });
    var register_1 = require_register();
    Object.defineProperty(exports, "register", { enumerable: !0, get: function() {
      return register_1.register;
    } });
    var config_loader_1 = require_config_loader();
    Object.defineProperty(exports, "loadConfig", { enumerable: !0, get: function() {
      return config_loader_1.loadConfig;
    } });
  }
});

// ../../node_modules/resolve/lib/homedir.js
var require_homedir = __commonJS({
  "../../node_modules/resolve/lib/homedir.js"(exports, module) {
    "use strict";
    var os = __require("os");
    module.exports = os.homedir || function() {
      var home = process.env.HOME, user = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;
      return process.platform === "win32" ? process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH || home || null : process.platform === "darwin" ? home || (user ? "/Users/" + user : null) : process.platform === "linux" ? home || (process.getuid() === 0 ? "/root" : user ? "/home/" + user : null) : home || null;
    };
  }
});

// ../../node_modules/resolve/lib/caller.js
var require_caller = __commonJS({
  "../../node_modules/resolve/lib/caller.js"(exports, module) {
    module.exports = function() {
      var origPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack2) {
        return stack2;
      };
      var stack = new Error().stack;
      return Error.prepareStackTrace = origPrepareStackTrace, stack[2].getFileName();
    };
  }
});

// ../../node_modules/path-parse/index.js
var require_path_parse = __commonJS({
  "../../node_modules/path-parse/index.js"(exports, module) {
    "use strict";
    var isWindows2 = process.platform === "win32", splitWindowsRe = /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/, win32 = {};
    function win32SplitPath(filename) {
      return splitWindowsRe.exec(filename).slice(1);
    }
    win32.parse = function(pathString) {
      if (typeof pathString != "string")
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      var allParts = win32SplitPath(pathString);
      if (!allParts || allParts.length !== 5)
        throw new TypeError("Invalid path '" + pathString + "'");
      return {
        root: allParts[1],
        dir: allParts[0] === allParts[1] ? allParts[0] : allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    var splitPathRe = /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/, posix = {};
    function posixSplitPath(filename) {
      return splitPathRe.exec(filename).slice(1);
    }
    posix.parse = function(pathString) {
      if (typeof pathString != "string")
        throw new TypeError(
          "Parameter 'pathString' must be a string, not " + typeof pathString
        );
      var allParts = posixSplitPath(pathString);
      if (!allParts || allParts.length !== 5)
        throw new TypeError("Invalid path '" + pathString + "'");
      return {
        root: allParts[1],
        dir: allParts[0].slice(0, -1),
        base: allParts[2],
        ext: allParts[4],
        name: allParts[3]
      };
    };
    isWindows2 ? module.exports = win32.parse : module.exports = posix.parse;
    module.exports.posix = posix.parse;
    module.exports.win32 = win32.parse;
  }
});

// ../../node_modules/resolve/lib/node-modules-paths.js
var require_node_modules_paths = __commonJS({
  "../../node_modules/resolve/lib/node-modules-paths.js"(exports, module) {
    var path2 = __require("path"), parse4 = path2.parse || require_path_parse(), driveLetterRegex = /^([A-Za-z]:)/, uncPathRegex = /^\\\\/, getNodeModulesDirs = function(absoluteStart, modules) {
      var prefix = "/";
      driveLetterRegex.test(absoluteStart) ? prefix = "" : uncPathRegex.test(absoluteStart) && (prefix = "\\\\");
      for (var paths = [absoluteStart], parsed = parse4(absoluteStart); parsed.dir !== paths[paths.length - 1]; )
        paths.push(parsed.dir), parsed = parse4(parsed.dir);
      return paths.reduce(function(dirs, aPath) {
        return dirs.concat(modules.map(function(moduleDir) {
          return path2.resolve(prefix, aPath, moduleDir);
        }));
      }, []);
    };
    module.exports = function(start, opts, request) {
      var modules = opts && opts.moduleDirectory ? [].concat(opts.moduleDirectory) : ["node_modules"];
      if (opts && typeof opts.paths == "function")
        return opts.paths(
          request,
          start,
          function() {
            return getNodeModulesDirs(start, modules);
          },
          opts
        );
      var dirs = getNodeModulesDirs(start, modules);
      return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
    };
  }
});

// ../../node_modules/resolve/lib/normalize-options.js
var require_normalize_options = __commonJS({
  "../../node_modules/resolve/lib/normalize-options.js"(exports, module) {
    var path2 = __require("path");
    module.exports = function(_, opts) {
      if (opts = opts || {}, opts.forceNodeResolution || !process.versions.pnp)
        return opts;
      let { findPnpApi } = __require("module"), runPnpResolution = (request, basedir) => {
        let parts = request.match(/^((?:@[^/]+\/)?[^/]+)(\/.*)?/);
        if (!parts)
          throw new Error(`Assertion failed: Expected the "resolve" package to call the "paths" callback with package names only (got "${request}")`);
        basedir.charAt(basedir.length - 1) !== "/" && (basedir = path2.join(basedir, "/"));
        let api = findPnpApi(basedir);
        if (api === null)
          return;
        let manifestPath;
        try {
          manifestPath = api.resolveToUnqualified(`${parts[1]}/package.json`, basedir, { considerBuiltins: !1 });
        } catch {
          return null;
        }
        if (manifestPath === null)
          throw new Error(`Assertion failed: The resolution thinks that "${parts[1]}" is a Node builtin`);
        let packagePath = path2.dirname(manifestPath), unqualifiedPath = typeof parts[2] < "u" ? path2.join(packagePath, parts[2]) : packagePath;
        return { packagePath, unqualifiedPath };
      }, runPnpResolutionOnArray = (request, paths2) => {
        for (let i = 0; i < paths2.length; i++) {
          let resolution = runPnpResolution(request, paths2[i]);
          if (resolution || i === paths2.length - 1)
            return resolution;
        }
        return null;
      }, originalPaths = Array.isArray(opts.paths) ? opts.paths : [], packageIterator = (request, basedir, getCandidates, opts2) => {
        let pathsToTest = [basedir].concat(originalPaths), resolution = runPnpResolutionOnArray(request, pathsToTest);
        return resolution == null ? getCandidates() : [resolution.unqualifiedPath];
      }, paths = (request, basedir, getNodeModulePaths, opts2) => {
        let pathsToTest = [basedir].concat(originalPaths), resolution = runPnpResolutionOnArray(request, pathsToTest);
        if (resolution == null)
          return getNodeModulePaths().concat(originalPaths);
        let nodeModules = path2.dirname(resolution.packagePath);
        return request.match(/^@[^/]+\//) && (nodeModules = path2.dirname(nodeModules)), [nodeModules];
      }, isInsideIterator = !1;
      return opts.__skipPackageIterator || (opts.packageIterator = function(request, basedir, getCandidates, opts2) {
        isInsideIterator = !0;
        try {
          return packageIterator(request, basedir, getCandidates, opts2);
        } finally {
          isInsideIterator = !1;
        }
      }), opts.paths = function(request, basedir, getNodeModulePaths, opts2) {
        return isInsideIterator ? getNodeModulePaths().concat(originalPaths) : paths(request, basedir, getNodeModulePaths, opts2);
      }, opts;
    };
  }
});

// ../../node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "../../node_modules/function-bind/implementation.js"(exports, module) {
    "use strict";
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ", toStr = Object.prototype.toString, max = Math.max, funcType = "[object Function]", concatty = function(a, b) {
      for (var arr = [], i = 0; i < a.length; i += 1)
        arr[i] = a[i];
      for (var j = 0; j < b.length; j += 1)
        arr[j + a.length] = b[j];
      return arr;
    }, slicy = function(arrLike, offset) {
      for (var arr = [], i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1)
        arr[j] = arrLike[i];
      return arr;
    }, joiny = function(arr, joiner) {
      for (var str = "", i = 0; i < arr.length; i += 1)
        str += arr[i], i + 1 < arr.length && (str += joiner);
      return str;
    };
    module.exports = function(that) {
      var target = this;
      if (typeof target != "function" || toStr.apply(target) !== funcType)
        throw new TypeError(ERROR_MESSAGE + target);
      for (var args = slicy(arguments, 1), bound, binder = function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          return Object(result) === result ? result : this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      }, boundLength = max(0, target.length - args.length), boundArgs = [], i = 0; i < boundLength; i++)
        boundArgs[i] = "$" + i;
      if (bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder), target.prototype) {
        var Empty = function() {
        };
        Empty.prototype = target.prototype, bound.prototype = new Empty(), Empty.prototype = null;
      }
      return bound;
    };
  }
});

// ../../node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "../../node_modules/function-bind/index.js"(exports, module) {
    "use strict";
    var implementation = require_implementation();
    module.exports = Function.prototype.bind || implementation;
  }
});

// ../../node_modules/hasown/index.js
var require_hasown = __commonJS({
  "../../node_modules/hasown/index.js"(exports, module) {
    "use strict";
    var call = Function.prototype.call, $hasOwn = Object.prototype.hasOwnProperty, bind = require_function_bind();
    module.exports = bind.call(call, $hasOwn);
  }
});

// ../../node_modules/is-core-module/core.json
var require_core = __commonJS({
  "../../node_modules/is-core-module/core.json"(exports, module) {
    module.exports = {
      assert: !0,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: !0,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: !0,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: !0,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: !0,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: !0,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: !0,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: !0,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: !0,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: !0,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: !0,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: !0,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      "inspector/promises": [">= 19"],
      "node:inspector/promises": [">= 19"],
      _linklist: "< 8",
      module: !0,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: !0,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: !0,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: !0,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: !0,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: !0,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: !0,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      "node:sea": [">= 20.12 && < 21", ">= 21.7"],
      smalloc: ">= 0.11.5 && < 3",
      "node:sqlite": [">= 22.13 && < 23", ">= 23.4"],
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: !0,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: !0,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "test/reporters": ">= 19.9 && < 20.2",
      "node:test/reporters": [">= 18.17 && < 19", ">= 19.9", ">= 20"],
      "test/mock_loader": ">= 22.3 && < 22.7",
      "node:test/mock_loader": ">= 22.3 && < 22.7",
      "node:test": [">= 16.17 && < 17", ">= 18"],
      timers: !0,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: !0,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: !0,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: !0,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: !0,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: !0,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: [">= 13.4 && < 13.5", ">= 18.17 && < 19", ">= 20"],
      "node:wasi": [">= 18.17 && < 19", ">= 20"],
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// ../../node_modules/is-core-module/index.js
var require_is_core_module = __commonJS({
  "../../node_modules/is-core-module/index.js"(exports, module) {
    "use strict";
    var hasOwn = require_hasown();
    function specifierIncluded(current, specifier) {
      for (var nodeParts = current.split("."), parts = specifier.split(" "), op = parts.length > 1 ? parts[0] : "=", versionParts = (parts.length > 1 ? parts[1] : parts[0]).split("."), i = 0; i < 3; ++i) {
        var cur = parseInt(nodeParts[i] || 0, 10), ver = parseInt(versionParts[i] || 0, 10);
        if (cur !== ver)
          return op === "<" ? cur < ver : op === ">=" ? cur >= ver : !1;
      }
      return op === ">=";
    }
    function matchesRange(current, range) {
      var specifiers = range.split(/ ?&& ?/);
      if (specifiers.length === 0)
        return !1;
      for (var i = 0; i < specifiers.length; ++i)
        if (!specifierIncluded(current, specifiers[i]))
          return !1;
      return !0;
    }
    function versionIncluded(nodeVersion, specifierValue) {
      if (typeof specifierValue == "boolean")
        return specifierValue;
      var current = typeof nodeVersion > "u" ? process.versions && process.versions.node : nodeVersion;
      if (typeof current != "string")
        throw new TypeError(typeof nodeVersion > "u" ? "Unable to determine current node version" : "If provided, a valid node version is required");
      if (specifierValue && typeof specifierValue == "object") {
        for (var i = 0; i < specifierValue.length; ++i)
          if (matchesRange(current, specifierValue[i]))
            return !0;
        return !1;
      }
      return matchesRange(current, specifierValue);
    }
    var data = require_core();
    module.exports = function(x, nodeVersion) {
      return hasOwn(data, x) && versionIncluded(nodeVersion, data[x]);
    };
  }
});

// ../../node_modules/resolve/lib/async.js
var require_async = __commonJS({
  "../../node_modules/resolve/lib/async.js"(exports, module) {
    var fs = __require("fs"), getHomedir = require_homedir(), path2 = __require("path"), caller = require_caller(), nodeModulesPaths = require_node_modules_paths(), normalizeOptions = require_normalize_options(), isCore = require_is_core_module(), realpathFS = process.platform !== "win32" && fs.realpath && typeof fs.realpath.native == "function" ? fs.realpath.native : fs.realpath, relativePathRegex = /^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/, windowsDriveRegex = /^\w:[/\\]*$/, nodeModulesRegex = /[/\\]node_modules[/\\]*$/, homedir = getHomedir(), defaultPaths = function() {
      return [
        path2.join(homedir, ".node_modules"),
        path2.join(homedir, ".node_libraries")
      ];
    }, defaultIsFile = function(file, cb) {
      fs.stat(file, function(err, stat) {
        return err ? err.code === "ENOENT" || err.code === "ENOTDIR" ? cb(null, !1) : cb(err) : cb(null, stat.isFile() || stat.isFIFO());
      });
    }, defaultIsDir = function(dir, cb) {
      fs.stat(dir, function(err, stat) {
        return err ? err.code === "ENOENT" || err.code === "ENOTDIR" ? cb(null, !1) : cb(err) : cb(null, stat.isDirectory());
      });
    }, defaultRealpath = function(x, cb) {
      realpathFS(x, function(realpathErr, realPath) {
        realpathErr && realpathErr.code !== "ENOENT" ? cb(realpathErr) : cb(null, realpathErr ? x : realPath);
      });
    }, maybeRealpath = function(realpath, x, opts, cb) {
      opts && opts.preserveSymlinks === !1 ? realpath(x, cb) : cb(null, x);
    }, defaultReadPackage = function(readFile, pkgfile, cb) {
      readFile(pkgfile, function(readFileErr, body) {
        if (readFileErr) cb(readFileErr);
        else
          try {
            var pkg = JSON.parse(body);
            cb(null, pkg);
          } catch {
            cb(null);
          }
      });
    }, getPackageCandidates = function(x, start, opts) {
      for (var dirs = nodeModulesPaths(start, opts, x), i = 0; i < dirs.length; i++)
        dirs[i] = path2.join(dirs[i], x);
      return dirs;
    };
    module.exports = function(x, options, callback) {
      var cb = callback, opts = options;
      if (typeof options == "function" && (cb = opts, opts = {}), typeof x != "string") {
        var err = new TypeError("Path must be a string.");
        return process.nextTick(function() {
          cb(err);
        });
      }
      opts = normalizeOptions(x, opts);
      var isFile = opts.isFile || defaultIsFile, isDirectory = opts.isDirectory || defaultIsDir, readFile = opts.readFile || fs.readFile, realpath = opts.realpath || defaultRealpath, readPackage = opts.readPackage || defaultReadPackage;
      if (opts.readFile && opts.readPackage) {
        var conflictErr = new TypeError("`readFile` and `readPackage` are mutually exclusive.");
        return process.nextTick(function() {
          cb(conflictErr);
        });
      }
      var packageIterator = opts.packageIterator, extensions = opts.extensions || [".js"], includeCoreModules = opts.includeCoreModules !== !1, basedir = opts.basedir || path2.dirname(caller()), parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = path2.resolve(basedir);
      maybeRealpath(
        realpath,
        absoluteStart,
        opts,
        function(err2, realStart) {
          err2 ? cb(err2) : init(realStart);
        }
      );
      var res;
      function init(basedir2) {
        if (relativePathRegex.test(x))
          res = path2.resolve(basedir2, x), (x === "." || x === ".." || x.slice(-1) === "/") && (res += "/"), x.slice(-1) === "/" && res === basedir2 ? loadAsDirectory(res, opts.package, onfile) : loadAsFile(res, opts.package, onfile);
        else {
          if (includeCoreModules && isCore(x))
            return cb(null, x);
          loadNodeModules(x, basedir2, function(err2, n, pkg) {
            if (err2) cb(err2);
            else {
              if (n)
                return maybeRealpath(realpath, n, opts, function(err3, realN) {
                  err3 ? cb(err3) : cb(null, realN, pkg);
                });
              var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
              moduleError.code = "MODULE_NOT_FOUND", cb(moduleError);
            }
          });
        }
      }
      function onfile(err2, m, pkg) {
        err2 ? cb(err2) : m ? cb(null, m, pkg) : loadAsDirectory(res, function(err3, d, pkg2) {
          if (err3) cb(err3);
          else if (d)
            maybeRealpath(realpath, d, opts, function(err4, realD) {
              err4 ? cb(err4) : cb(null, realD, pkg2);
            });
          else {
            var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
            moduleError.code = "MODULE_NOT_FOUND", cb(moduleError);
          }
        });
      }
      function loadAsFile(x2, thePackage, callback2) {
        var loadAsFilePackage = thePackage, cb2 = callback2;
        typeof loadAsFilePackage == "function" && (cb2 = loadAsFilePackage, loadAsFilePackage = void 0);
        var exts = [""].concat(extensions);
        load(exts, x2, loadAsFilePackage);
        function load(exts2, x3, loadPackage) {
          if (exts2.length === 0) return cb2(null, void 0, loadPackage);
          var file = x3 + exts2[0], pkg = loadPackage;
          pkg ? onpkg(null, pkg) : loadpkg(path2.dirname(file), onpkg);
          function onpkg(err2, pkg_, dir) {
            if (pkg = pkg_, err2) return cb2(err2);
            if (dir && pkg && opts.pathFilter) {
              var rfile = path2.relative(dir, file), rel = rfile.slice(0, rfile.length - exts2[0].length), r = opts.pathFilter(pkg, x3, rel);
              if (r) return load(
                [""].concat(extensions.slice()),
                path2.resolve(dir, r),
                pkg
              );
            }
            isFile(file, onex);
          }
          function onex(err2, ex) {
            if (err2) return cb2(err2);
            if (ex) return cb2(null, file, pkg);
            load(exts2.slice(1), x3, pkg);
          }
        }
      }
      function loadpkg(dir, cb2) {
        if (dir === "" || dir === "/" || process.platform === "win32" && windowsDriveRegex.test(dir) || nodeModulesRegex.test(dir)) return cb2(null);
        maybeRealpath(realpath, dir, opts, function(unwrapErr, pkgdir) {
          if (unwrapErr) return loadpkg(path2.dirname(dir), cb2);
          var pkgfile = path2.join(pkgdir, "package.json");
          isFile(pkgfile, function(err2, ex) {
            if (!ex) return loadpkg(path2.dirname(dir), cb2);
            readPackage(readFile, pkgfile, function(err3, pkgParam) {
              err3 && cb2(err3);
              var pkg = pkgParam;
              pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, pkgfile)), cb2(null, pkg, dir);
            });
          });
        });
      }
      function loadAsDirectory(x2, loadAsDirectoryPackage, callback2) {
        var cb2 = callback2, fpkg = loadAsDirectoryPackage;
        typeof fpkg == "function" && (cb2 = fpkg, fpkg = opts.package), maybeRealpath(realpath, x2, opts, function(unwrapErr, pkgdir) {
          if (unwrapErr) return cb2(unwrapErr);
          var pkgfile = path2.join(pkgdir, "package.json");
          isFile(pkgfile, function(err2, ex) {
            if (err2) return cb2(err2);
            if (!ex) return loadAsFile(path2.join(x2, "index"), fpkg, cb2);
            readPackage(readFile, pkgfile, function(err3, pkgParam) {
              if (err3) return cb2(err3);
              var pkg = pkgParam;
              if (pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, pkgfile)), pkg && pkg.main) {
                if (typeof pkg.main != "string") {
                  var mainError = new TypeError("package \u201C" + pkg.name + "\u201D `main` must be a string");
                  return mainError.code = "INVALID_PACKAGE_MAIN", cb2(mainError);
                }
                (pkg.main === "." || pkg.main === "./") && (pkg.main = "index"), loadAsFile(path2.resolve(x2, pkg.main), pkg, function(err4, m, pkg2) {
                  if (err4) return cb2(err4);
                  if (m) return cb2(null, m, pkg2);
                  if (!pkg2) return loadAsFile(path2.join(x2, "index"), pkg2, cb2);
                  var dir = path2.resolve(x2, pkg2.main);
                  loadAsDirectory(dir, pkg2, function(err5, n, pkg3) {
                    if (err5) return cb2(err5);
                    if (n) return cb2(null, n, pkg3);
                    loadAsFile(path2.join(x2, "index"), pkg3, cb2);
                  });
                });
                return;
              }
              loadAsFile(path2.join(x2, "/index"), pkg, cb2);
            });
          });
        });
      }
      function processDirs(cb2, dirs) {
        if (dirs.length === 0) return cb2(null, void 0);
        var dir = dirs[0];
        isDirectory(path2.dirname(dir), isdir);
        function isdir(err2, isdir2) {
          if (err2) return cb2(err2);
          if (!isdir2) return processDirs(cb2, dirs.slice(1));
          loadAsFile(dir, opts.package, onfile2);
        }
        function onfile2(err2, m, pkg) {
          if (err2) return cb2(err2);
          if (m) return cb2(null, m, pkg);
          loadAsDirectory(dir, opts.package, ondir);
        }
        function ondir(err2, n, pkg) {
          if (err2) return cb2(err2);
          if (n) return cb2(null, n, pkg);
          processDirs(cb2, dirs.slice(1));
        }
      }
      function loadNodeModules(x2, start, cb2) {
        var thunk = function() {
          return getPackageCandidates(x2, start, opts);
        };
        processDirs(
          cb2,
          packageIterator ? packageIterator(x2, start, thunk, opts) : thunk()
        );
      }
    };
  }
});

// ../../node_modules/resolve/lib/core.json
var require_core2 = __commonJS({
  "../../node_modules/resolve/lib/core.json"(exports, module) {
    module.exports = {
      assert: !0,
      "node:assert": [">= 14.18 && < 15", ">= 16"],
      "assert/strict": ">= 15",
      "node:assert/strict": ">= 16",
      async_hooks: ">= 8",
      "node:async_hooks": [">= 14.18 && < 15", ">= 16"],
      buffer_ieee754: ">= 0.5 && < 0.9.7",
      buffer: !0,
      "node:buffer": [">= 14.18 && < 15", ">= 16"],
      child_process: !0,
      "node:child_process": [">= 14.18 && < 15", ">= 16"],
      cluster: ">= 0.5",
      "node:cluster": [">= 14.18 && < 15", ">= 16"],
      console: !0,
      "node:console": [">= 14.18 && < 15", ">= 16"],
      constants: !0,
      "node:constants": [">= 14.18 && < 15", ">= 16"],
      crypto: !0,
      "node:crypto": [">= 14.18 && < 15", ">= 16"],
      _debug_agent: ">= 1 && < 8",
      _debugger: "< 8",
      dgram: !0,
      "node:dgram": [">= 14.18 && < 15", ">= 16"],
      diagnostics_channel: [">= 14.17 && < 15", ">= 15.1"],
      "node:diagnostics_channel": [">= 14.18 && < 15", ">= 16"],
      dns: !0,
      "node:dns": [">= 14.18 && < 15", ">= 16"],
      "dns/promises": ">= 15",
      "node:dns/promises": ">= 16",
      domain: ">= 0.7.12",
      "node:domain": [">= 14.18 && < 15", ">= 16"],
      events: !0,
      "node:events": [">= 14.18 && < 15", ">= 16"],
      freelist: "< 6",
      fs: !0,
      "node:fs": [">= 14.18 && < 15", ">= 16"],
      "fs/promises": [">= 10 && < 10.1", ">= 14"],
      "node:fs/promises": [">= 14.18 && < 15", ">= 16"],
      _http_agent: ">= 0.11.1",
      "node:_http_agent": [">= 14.18 && < 15", ">= 16"],
      _http_client: ">= 0.11.1",
      "node:_http_client": [">= 14.18 && < 15", ">= 16"],
      _http_common: ">= 0.11.1",
      "node:_http_common": [">= 14.18 && < 15", ">= 16"],
      _http_incoming: ">= 0.11.1",
      "node:_http_incoming": [">= 14.18 && < 15", ">= 16"],
      _http_outgoing: ">= 0.11.1",
      "node:_http_outgoing": [">= 14.18 && < 15", ">= 16"],
      _http_server: ">= 0.11.1",
      "node:_http_server": [">= 14.18 && < 15", ">= 16"],
      http: !0,
      "node:http": [">= 14.18 && < 15", ">= 16"],
      http2: ">= 8.8",
      "node:http2": [">= 14.18 && < 15", ">= 16"],
      https: !0,
      "node:https": [">= 14.18 && < 15", ">= 16"],
      inspector: ">= 8",
      "node:inspector": [">= 14.18 && < 15", ">= 16"],
      "inspector/promises": [">= 19"],
      "node:inspector/promises": [">= 19"],
      _linklist: "< 8",
      module: !0,
      "node:module": [">= 14.18 && < 15", ">= 16"],
      net: !0,
      "node:net": [">= 14.18 && < 15", ">= 16"],
      "node-inspect/lib/_inspect": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
      "node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
      os: !0,
      "node:os": [">= 14.18 && < 15", ">= 16"],
      path: !0,
      "node:path": [">= 14.18 && < 15", ">= 16"],
      "path/posix": ">= 15.3",
      "node:path/posix": ">= 16",
      "path/win32": ">= 15.3",
      "node:path/win32": ">= 16",
      perf_hooks: ">= 8.5",
      "node:perf_hooks": [">= 14.18 && < 15", ">= 16"],
      process: ">= 1",
      "node:process": [">= 14.18 && < 15", ">= 16"],
      punycode: ">= 0.5",
      "node:punycode": [">= 14.18 && < 15", ">= 16"],
      querystring: !0,
      "node:querystring": [">= 14.18 && < 15", ">= 16"],
      readline: !0,
      "node:readline": [">= 14.18 && < 15", ">= 16"],
      "readline/promises": ">= 17",
      "node:readline/promises": ">= 17",
      repl: !0,
      "node:repl": [">= 14.18 && < 15", ">= 16"],
      "node:sea": [">= 20.12 && < 21", ">= 21.7"],
      smalloc: ">= 0.11.5 && < 3",
      "node:sqlite": [">= 22.13 && < 23", ">= 23.4"],
      _stream_duplex: ">= 0.9.4",
      "node:_stream_duplex": [">= 14.18 && < 15", ">= 16"],
      _stream_transform: ">= 0.9.4",
      "node:_stream_transform": [">= 14.18 && < 15", ">= 16"],
      _stream_wrap: ">= 1.4.1",
      "node:_stream_wrap": [">= 14.18 && < 15", ">= 16"],
      _stream_passthrough: ">= 0.9.4",
      "node:_stream_passthrough": [">= 14.18 && < 15", ">= 16"],
      _stream_readable: ">= 0.9.4",
      "node:_stream_readable": [">= 14.18 && < 15", ">= 16"],
      _stream_writable: ">= 0.9.4",
      "node:_stream_writable": [">= 14.18 && < 15", ">= 16"],
      stream: !0,
      "node:stream": [">= 14.18 && < 15", ">= 16"],
      "stream/consumers": ">= 16.7",
      "node:stream/consumers": ">= 16.7",
      "stream/promises": ">= 15",
      "node:stream/promises": ">= 16",
      "stream/web": ">= 16.5",
      "node:stream/web": ">= 16.5",
      string_decoder: !0,
      "node:string_decoder": [">= 14.18 && < 15", ">= 16"],
      sys: [">= 0.4 && < 0.7", ">= 0.8"],
      "node:sys": [">= 14.18 && < 15", ">= 16"],
      "test/reporters": ">= 19.9 && < 20.2",
      "node:test/reporters": [">= 18.17 && < 19", ">= 19.9", ">= 20"],
      "test/mock_loader": ">= 22.3 && < 22.7",
      "node:test/mock_loader": ">= 22.3 && < 22.7",
      "node:test": [">= 16.17 && < 17", ">= 18"],
      timers: !0,
      "node:timers": [">= 14.18 && < 15", ">= 16"],
      "timers/promises": ">= 15",
      "node:timers/promises": ">= 16",
      _tls_common: ">= 0.11.13",
      "node:_tls_common": [">= 14.18 && < 15", ">= 16"],
      _tls_legacy: ">= 0.11.3 && < 10",
      _tls_wrap: ">= 0.11.3",
      "node:_tls_wrap": [">= 14.18 && < 15", ">= 16"],
      tls: !0,
      "node:tls": [">= 14.18 && < 15", ">= 16"],
      trace_events: ">= 10",
      "node:trace_events": [">= 14.18 && < 15", ">= 16"],
      tty: !0,
      "node:tty": [">= 14.18 && < 15", ">= 16"],
      url: !0,
      "node:url": [">= 14.18 && < 15", ">= 16"],
      util: !0,
      "node:util": [">= 14.18 && < 15", ">= 16"],
      "util/types": ">= 15.3",
      "node:util/types": ">= 16",
      "v8/tools/arguments": ">= 10 && < 12",
      "v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      "v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
      v8: ">= 1",
      "node:v8": [">= 14.18 && < 15", ">= 16"],
      vm: !0,
      "node:vm": [">= 14.18 && < 15", ">= 16"],
      wasi: [">= 13.4 && < 13.5", ">= 18.17 && < 19", ">= 20"],
      "node:wasi": [">= 18.17 && < 19", ">= 20"],
      worker_threads: ">= 11.7",
      "node:worker_threads": [">= 14.18 && < 15", ">= 16"],
      zlib: ">= 0.5",
      "node:zlib": [">= 14.18 && < 15", ">= 16"]
    };
  }
});

// ../../node_modules/resolve/lib/core.js
var require_core3 = __commonJS({
  "../../node_modules/resolve/lib/core.js"(exports, module) {
    "use strict";
    var isCoreModule = require_is_core_module(), data = require_core2(), core = {};
    for (mod in data)
      Object.prototype.hasOwnProperty.call(data, mod) && (core[mod] = isCoreModule(mod));
    var mod;
    module.exports = core;
  }
});

// ../../node_modules/resolve/lib/is-core.js
var require_is_core = __commonJS({
  "../../node_modules/resolve/lib/is-core.js"(exports, module) {
    var isCoreModule = require_is_core_module();
    module.exports = function(x) {
      return isCoreModule(x);
    };
  }
});

// ../../node_modules/resolve/lib/sync.js
var require_sync = __commonJS({
  "../../node_modules/resolve/lib/sync.js"(exports, module) {
    var isCore = require_is_core_module(), fs = __require("fs"), path2 = __require("path"), getHomedir = require_homedir(), caller = require_caller(), nodeModulesPaths = require_node_modules_paths(), normalizeOptions = require_normalize_options(), realpathFS = process.platform !== "win32" && fs.realpathSync && typeof fs.realpathSync.native == "function" ? fs.realpathSync.native : fs.realpathSync, relativePathRegex = /^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/, windowsDriveRegex = /^\w:[/\\]*$/, nodeModulesRegex = /[/\\]node_modules[/\\]*$/, homedir = getHomedir(), defaultPaths = function() {
      return [
        path2.join(homedir, ".node_modules"),
        path2.join(homedir, ".node_libraries")
      ];
    }, defaultIsFile = function(file) {
      try {
        var stat = fs.statSync(file, { throwIfNoEntry: !1 });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR")) return !1;
        throw e;
      }
      return !!stat && (stat.isFile() || stat.isFIFO());
    }, defaultIsDir = function(dir) {
      try {
        var stat = fs.statSync(dir, { throwIfNoEntry: !1 });
      } catch (e) {
        if (e && (e.code === "ENOENT" || e.code === "ENOTDIR")) return !1;
        throw e;
      }
      return !!stat && stat.isDirectory();
    }, defaultRealpathSync = function(x) {
      try {
        return realpathFS(x);
      } catch (realpathErr) {
        if (realpathErr.code !== "ENOENT")
          throw realpathErr;
      }
      return x;
    }, maybeRealpathSync = function(realpathSync, x, opts) {
      return opts && opts.preserveSymlinks === !1 ? realpathSync(x) : x;
    }, defaultReadPackageSync = function(readFileSync2, pkgfile) {
      var body = readFileSync2(pkgfile);
      try {
        var pkg = JSON.parse(body);
        return pkg;
      } catch {
      }
    }, getPackageCandidates = function(x, start, opts) {
      for (var dirs = nodeModulesPaths(start, opts, x), i = 0; i < dirs.length; i++)
        dirs[i] = path2.join(dirs[i], x);
      return dirs;
    };
    module.exports = function(x, options) {
      if (typeof x != "string")
        throw new TypeError("Path must be a string.");
      var opts = normalizeOptions(x, options), isFile = opts.isFile || defaultIsFile, readFileSync2 = opts.readFileSync || fs.readFileSync, isDirectory = opts.isDirectory || defaultIsDir, realpathSync = opts.realpathSync || defaultRealpathSync, readPackageSync = opts.readPackageSync || defaultReadPackageSync;
      if (opts.readFileSync && opts.readPackageSync)
        throw new TypeError("`readFileSync` and `readPackageSync` are mutually exclusive.");
      var packageIterator = opts.packageIterator, extensions = opts.extensions || [".js"], includeCoreModules = opts.includeCoreModules !== !1, basedir = opts.basedir || path2.dirname(caller()), parent = opts.filename || basedir;
      opts.paths = opts.paths || defaultPaths();
      var absoluteStart = maybeRealpathSync(realpathSync, path2.resolve(basedir), opts);
      if (relativePathRegex.test(x)) {
        var res = path2.resolve(absoluteStart, x);
        (x === "." || x === ".." || x.slice(-1) === "/") && (res += "/");
        var m = loadAsFileSync(res) || loadAsDirectorySync(res);
        if (m) return maybeRealpathSync(realpathSync, m, opts);
      } else {
        if (includeCoreModules && isCore(x))
          return x;
        var n = loadNodeModulesSync(x, absoluteStart);
        if (n) return maybeRealpathSync(realpathSync, n, opts);
      }
      var err = new Error("Cannot find module '" + x + "' from '" + parent + "'");
      throw err.code = "MODULE_NOT_FOUND", err;
      function loadAsFileSync(x2) {
        var pkg = loadpkg(path2.dirname(x2));
        if (pkg && pkg.dir && pkg.pkg && opts.pathFilter) {
          var rfile = path2.relative(pkg.dir, x2), r = opts.pathFilter(pkg.pkg, x2, rfile);
          r && (x2 = path2.resolve(pkg.dir, r));
        }
        if (isFile(x2))
          return x2;
        for (var i = 0; i < extensions.length; i++) {
          var file = x2 + extensions[i];
          if (isFile(file))
            return file;
        }
      }
      function loadpkg(dir) {
        if (!(dir === "" || dir === "/") && !(process.platform === "win32" && windowsDriveRegex.test(dir)) && !nodeModulesRegex.test(dir)) {
          var pkgfile = path2.join(maybeRealpathSync(realpathSync, dir, opts), "package.json");
          if (!isFile(pkgfile))
            return loadpkg(path2.dirname(dir));
          var pkg = readPackageSync(readFileSync2, pkgfile);
          return pkg && opts.packageFilter && (pkg = opts.packageFilter(
            pkg,
            /*pkgfile,*/
            dir
          )), { pkg, dir };
        }
      }
      function loadAsDirectorySync(x2) {
        var pkgfile = path2.join(maybeRealpathSync(realpathSync, x2, opts), "/package.json");
        if (isFile(pkgfile)) {
          try {
            var pkg = readPackageSync(readFileSync2, pkgfile);
          } catch {
          }
          if (pkg && opts.packageFilter && (pkg = opts.packageFilter(
            pkg,
            /*pkgfile,*/
            x2
          )), pkg && pkg.main) {
            if (typeof pkg.main != "string") {
              var mainError = new TypeError("package \u201C" + pkg.name + "\u201D `main` must be a string");
              throw mainError.code = "INVALID_PACKAGE_MAIN", mainError;
            }
            (pkg.main === "." || pkg.main === "./") && (pkg.main = "index");
            try {
              var m2 = loadAsFileSync(path2.resolve(x2, pkg.main));
              if (m2) return m2;
              var n2 = loadAsDirectorySync(path2.resolve(x2, pkg.main));
              if (n2) return n2;
            } catch {
            }
          }
        }
        return loadAsFileSync(path2.join(x2, "/index"));
      }
      function loadNodeModulesSync(x2, start) {
        for (var thunk = function() {
          return getPackageCandidates(x2, start, opts);
        }, dirs = packageIterator ? packageIterator(x2, start, thunk, opts) : thunk(), i = 0; i < dirs.length; i++) {
          var dir = dirs[i];
          if (isDirectory(path2.dirname(dir))) {
            var m2 = loadAsFileSync(dir);
            if (m2) return m2;
            var n2 = loadAsDirectorySync(dir);
            if (n2) return n2;
          }
        }
      }
    };
  }
});

// ../../node_modules/resolve/index.js
var require_resolve = __commonJS({
  "../../node_modules/resolve/index.js"(exports, module) {
    var async = require_async();
    async.core = require_core3();
    async.isCore = require_is_core();
    async.sync = require_sync();
    module.exports = async;
  }
});

// src/preset.ts
import { fileURLToPath as fileURLToPath2 } from "node:url";

// ../../core/src/shared/utils/module.ts
import { fileURLToPath, pathToFileURL } from "node:url";

// ../../node_modules/exsolve/dist/index.mjs
import assert from "node:assert";
import v8 from "node:v8";
import { format, inspect } from "node:util";
var own$1 = {}.hasOwnProperty, classRegExp = /^([A-Z][a-z\d]*)+$/, kTypes = /* @__PURE__ */ new Set([
  "string",
  "function",
  "number",
  "object",
  "Function",
  "Object",
  "boolean",
  "bigint",
  "symbol"
]), messages = /* @__PURE__ */ new Map(), nodeInternalPrefix = "__node_internal_", userStackTraceLimit;
function formatList(array, type = "and") {
  return array.length < 3 ? array.join(` ${type} `) : `${array.slice(0, -1).join(", ")}, ${type} ${array.at(-1)}`;
}
function createError(sym, value, constructor) {
  return messages.set(sym, value), makeNodeErrorWithCode(constructor, sym);
}
function makeNodeErrorWithCode(Base, key) {
  return function(...parameters) {
    let limit = Error.stackTraceLimit;
    isErrorStackTraceLimitWritable() && (Error.stackTraceLimit = 0);
    let error = new Base();
    isErrorStackTraceLimitWritable() && (Error.stackTraceLimit = limit);
    let message = getMessage(key, parameters, error);
    return Object.defineProperties(error, {
      message: {
        value: message,
        enumerable: !1,
        writable: !0,
        configurable: !0
      },
      toString: {
        value() {
          return `${this.name} [${key}]: ${this.message}`;
        },
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), captureLargerStackTrace(error), error.code = key, error;
  };
}
function isErrorStackTraceLimitWritable() {
  try {
    if (v8.startupSnapshot.isBuildingSnapshot()) return !1;
  } catch {
  }
  let desc = Object.getOwnPropertyDescriptor(Error, "stackTraceLimit");
  return desc === void 0 ? Object.isExtensible(Error) : own$1.call(desc, "writable") && desc.writable !== void 0 ? desc.writable : desc.set !== void 0;
}
function hideStackFrames(wrappedFunction) {
  let hidden = nodeInternalPrefix + wrappedFunction.name;
  return Object.defineProperty(wrappedFunction, "name", { value: hidden }), wrappedFunction;
}
var captureLargerStackTrace = hideStackFrames(function(error) {
  let stackTraceLimitIsWritable = isErrorStackTraceLimitWritable();
  return stackTraceLimitIsWritable && (userStackTraceLimit = Error.stackTraceLimit, Error.stackTraceLimit = Number.POSITIVE_INFINITY), Error.captureStackTrace(error), stackTraceLimitIsWritable && (Error.stackTraceLimit = userStackTraceLimit), error;
});
function getMessage(key, parameters, self) {
  let message = messages.get(key);
  if (assert.ok(message !== void 0, "expected `message` to be found"), typeof message == "function")
    return assert.ok(message.length <= parameters.length, `Code: ${key}; The provided arguments length (${parameters.length}) does not match the required ones (${message.length}).`), Reflect.apply(message, self, parameters);
  let regex = /%[dfijoOs]/g, expectedLength = 0;
  for (; regex.exec(message) !== null; ) expectedLength++;
  return assert.ok(expectedLength === parameters.length, `Code: ${key}; The provided arguments length (${parameters.length}) does not match the required ones (${expectedLength}).`), parameters.length === 0 ? message : (parameters.unshift(message), Reflect.apply(format, null, parameters));
}
function determineSpecificType(value) {
  if (value == null) return String(value);
  if (typeof value == "function" && value.name) return `function ${value.name}`;
  if (typeof value == "object")
    return value.constructor && value.constructor.name ? `an instance of ${value.constructor.name}` : `${inspect(value, { depth: -1 })}`;
  let inspected = inspect(value, { colors: !1 });
  return inspected.length > 28 && (inspected = `${inspected.slice(0, 25)}...`), `type ${typeof value} (${inspected})`;
}
var ERR_INVALID_ARG_TYPE = createError("ERR_INVALID_ARG_TYPE", (name, expected, actual) => {
  assert.ok(typeof name == "string", "'name' must be a string"), Array.isArray(expected) || (expected = [expected]);
  let message = "The ";
  if (name.endsWith(" argument")) message += `${name} `;
  else {
    let type = name.includes(".") ? "property" : "argument";
    message += `"${name}" ${type} `;
  }
  message += "must be ";
  let types = [], instances = [], other = [];
  for (let value of expected)
    assert.ok(typeof value == "string", "All expected entries have to be of type string"), kTypes.has(value) ? types.push(value.toLowerCase()) : classRegExp.exec(value) === null ? (assert.ok(value !== "object", 'The value "object" should be written as "Object"'), other.push(value)) : instances.push(value);
  if (instances.length > 0) {
    let pos = types.indexOf("object");
    pos !== -1 && (types.slice(pos, 1), instances.push("Object"));
  }
  return types.length > 0 && (message += `${types.length > 1 ? "one of type" : "of type"} ${formatList(types, "or")}`, (instances.length > 0 || other.length > 0) && (message += " or ")), instances.length > 0 && (message += `an instance of ${formatList(instances, "or")}`, other.length > 0 && (message += " or ")), other.length > 0 && (other.length > 1 ? message += `one of ${formatList(other, "or")}` : (other[0]?.toLowerCase() !== other[0] && (message += "an "), message += `${other[0]}`)), message += `. Received ${determineSpecificType(actual)}`, message;
}, TypeError), ERR_INVALID_MODULE_SPECIFIER = createError(
  "ERR_INVALID_MODULE_SPECIFIER",
  /**
  * @param {string} request
  * @param {string} reason
  * @param {string} [base]
  */
  (request, reason, base) => `Invalid module "${request}" ${reason}${base ? ` imported from ${base}` : ""}`,
  TypeError
), ERR_INVALID_PACKAGE_CONFIG = createError("ERR_INVALID_PACKAGE_CONFIG", (path$1, base, message) => `Invalid package config ${path$1}${base ? ` while importing ${base}` : ""}${message ? `. ${message}` : ""}`, Error), ERR_INVALID_PACKAGE_TARGET = createError("ERR_INVALID_PACKAGE_TARGET", (packagePath, key, target, isImport = !1, base) => {
  let relatedError = typeof target == "string" && !isImport && target.length > 0 && !target.startsWith("./");
  return key === "." ? (assert.ok(isImport === !1), `Invalid "exports" main target ${JSON.stringify(target)} defined in the package config ${packagePath}package.json${base ? ` imported from ${base}` : ""}${relatedError ? '; targets must start with "./"' : ""}`) : `Invalid "${isImport ? "imports" : "exports"}" target ${JSON.stringify(target)} defined for '${key}' in the package config ${packagePath}package.json${base ? ` imported from ${base}` : ""}${relatedError ? '; targets must start with "./"' : ""}`;
}, Error), ERR_MODULE_NOT_FOUND = createError("ERR_MODULE_NOT_FOUND", (path$1, base, exactUrl = !1) => `Cannot find ${exactUrl ? "module" : "package"} '${path$1}' imported from ${base}`, Error), ERR_NETWORK_IMPORT_DISALLOWED = createError("ERR_NETWORK_IMPORT_DISALLOWED", "import of '%s' by %s is not supported: %s", Error), ERR_PACKAGE_IMPORT_NOT_DEFINED = createError("ERR_PACKAGE_IMPORT_NOT_DEFINED", (specifier, packagePath, base) => `Package import specifier "${specifier}" is not defined${packagePath ? ` in package ${packagePath || ""}package.json` : ""} imported from ${base}`, TypeError), ERR_PACKAGE_PATH_NOT_EXPORTED = createError(
  "ERR_PACKAGE_PATH_NOT_EXPORTED",
  /**
  * @param {string} packagePath
  * @param {string} subpath
  * @param {string} [base]
  */
  (packagePath, subpath, base) => subpath === "." ? `No "exports" main defined in ${packagePath}package.json${base ? ` imported from ${base}` : ""}` : `Package subpath '${subpath}' is not defined by "exports" in ${packagePath}package.json${base ? ` imported from ${base}` : ""}`,
  Error
), ERR_UNSUPPORTED_DIR_IMPORT = createError("ERR_UNSUPPORTED_DIR_IMPORT", "Directory import '%s' is not supported resolving ES modules imported from %s", Error), ERR_UNSUPPORTED_RESOLVE_REQUEST = createError("ERR_UNSUPPORTED_RESOLVE_REQUEST", 'Failed to resolve module specifier "%s" from "%s": Invalid relative URL or base scheme is not hierarchical.', TypeError), ERR_UNKNOWN_FILE_EXTENSION = createError("ERR_UNKNOWN_FILE_EXTENSION", (extension, path$1) => `Unknown file extension "${extension}" for ${path$1}`, TypeError), ERR_INVALID_ARG_VALUE = createError("ERR_INVALID_ARG_VALUE", (name, value, reason = "is invalid") => {
  let inspected = inspect(value);
  return inspected.length > 128 && (inspected = `${inspected.slice(0, 128)}...`), `The ${name.includes(".") ? "property" : "argument"} '${name}' ${reason}. Received ${inspected}`;
}, TypeError), hasOwnProperty$1 = {}.hasOwnProperty;
var hasOwnProperty = {}.hasOwnProperty;
var RegExpPrototypeSymbolReplace = RegExp.prototype[Symbol.replace], own = {}.hasOwnProperty;
var isWindows = process.platform === "win32", globalCache = globalThis.__EXSOLVE_CACHE__ ||= /* @__PURE__ */ new Map();

// ../../node_modules/pathe/dist/shared/pathe.ff20891b.mjs
var _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  return input && input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
var _UNC_REGEX = /^[/\\]{2}/, _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/, _DRIVE_LETTER_RE = /^[A-Za-z]:$/, _ROOT_FOLDER_RE = /^\/([A-Za-z]:)?$/, sep = "/", delimiter = ":", normalize = function(path2) {
  if (path2.length === 0)
    return ".";
  path2 = normalizeWindowsPath(path2);
  let isUNCPath = path2.match(_UNC_REGEX), isPathAbsolute = isAbsolute(path2), trailingSeparator = path2[path2.length - 1] === "/";
  return path2 = normalizeString(path2, !isPathAbsolute), path2.length === 0 ? isPathAbsolute ? "/" : trailingSeparator ? "./" : "." : (trailingSeparator && (path2 += "/"), _DRIVE_LETTER_RE.test(path2) && (path2 += "/"), isUNCPath ? isPathAbsolute ? `//${path2}` : `//./${path2}` : isPathAbsolute && !isAbsolute(path2) ? `/${path2}` : path2);
}, join = function(...arguments_) {
  if (arguments_.length === 0)
    return ".";
  let joined;
  for (let argument of arguments_)
    argument && argument.length > 0 && (joined === void 0 ? joined = argument : joined += `/${argument}`);
  return joined === void 0 ? "." : normalize(joined.replace(/\/\/+/g, "/"));
};
function cwd() {
  return typeof process < "u" && typeof process.cwd == "function" ? process.cwd().replace(/\\/g, "/") : "/";
}
var resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "", resolvedAbsolute = !1;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    let path2 = index >= 0 ? arguments_[index] : cwd();
    !path2 || path2.length === 0 || (resolvedPath = `${path2}/${resolvedPath}`, resolvedAbsolute = isAbsolute(path2));
  }
  return resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute), resolvedAbsolute && !isAbsolute(resolvedPath) ? `/${resolvedPath}` : resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path2, allowAboveRoot) {
  let res = "", lastSegmentLength = 0, lastSlash = -1, dots = 0, char = null;
  for (let index = 0; index <= path2.length; ++index) {
    if (index < path2.length)
      char = path2[index];
    else {
      if (char === "/")
        break;
      char = "/";
    }
    if (char === "/") {
      if (!(lastSlash === index - 1 || dots === 1)) if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            let lastSlashIndex = res.lastIndexOf("/");
            lastSlashIndex === -1 ? (res = "", lastSegmentLength = 0) : (res = res.slice(0, lastSlashIndex), lastSegmentLength = res.length - 1 - res.lastIndexOf("/")), lastSlash = index, dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "", lastSegmentLength = 0, lastSlash = index, dots = 0;
            continue;
          }
        }
        allowAboveRoot && (res += res.length > 0 ? "/.." : "..", lastSegmentLength = 2);
      } else
        res.length > 0 ? res += `/${path2.slice(lastSlash + 1, index)}` : res = path2.slice(lastSlash + 1, index), lastSegmentLength = index - lastSlash - 1;
      lastSlash = index, dots = 0;
    } else char === "." && dots !== -1 ? ++dots : dots = -1;
  }
  return res;
}
var isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
}, toNamespacedPath = function(p) {
  return normalizeWindowsPath(p);
}, _EXTNAME_RE = /.(\.[^./]+)$/, extname = function(p) {
  let match = _EXTNAME_RE.exec(normalizeWindowsPath(p));
  return match && match[1] || "";
}, relative = function(from, to) {
  let _from = resolve(from).replace(_ROOT_FOLDER_RE, "$1").split("/"), _to = resolve(to).replace(_ROOT_FOLDER_RE, "$1").split("/");
  if (_to[0][1] === ":" && _from[0][1] === ":" && _from[0] !== _to[0])
    return _to.join("/");
  let _fromCopy = [..._from];
  for (let segment of _fromCopy) {
    if (_to[0] !== segment)
      break;
    _from.shift(), _to.shift();
  }
  return [..._from.map(() => ".."), ..._to].join("/");
}, dirname = function(p) {
  let segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  return segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0]) && (segments[0] += "/"), segments.join("/") || (isAbsolute(p) ? "/" : ".");
}, format2 = function(p) {
  let segments = [p.root, p.dir, p.base ?? p.name + p.ext].filter(Boolean);
  return normalizeWindowsPath(
    p.root ? resolve(...segments) : segments.join("/")
  );
}, basename = function(p, extension) {
  let lastSegment = normalizeWindowsPath(p).split("/").pop();
  return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
}, parse = function(p) {
  let root = normalizeWindowsPath(p).split("/").shift() || "/", base = basename(p), extension = extname(base);
  return {
    root,
    dir: dirname(p),
    base,
    ext: extension,
    name: base.slice(0, base.length - extension.length)
  };
}, path = {
  __proto__: null,
  basename,
  delimiter,
  dirname,
  extname,
  format: format2,
  isAbsolute,
  join,
  normalize,
  normalizeString,
  parse,
  relative,
  resolve,
  sep,
  toNamespacedPath
};

// ../../core/src/shared/utils/module.ts
var importMetaResolve = (...args) => typeof import.meta.resolve != "function" && process.env.VITEST === "true" ? (console.warn(
  "importMetaResolve from within Storybook is being used in a Vitest test, but it shouldn't be. Please report this at https://github.com/storybookjs/storybook/issues/new?template=bug_report.yml"
), pathToFileURL(args[0]).href) : import.meta.resolve(...args), resolvePackageDir = (pkg, parent) => {
  try {
    return dirname(fileURLToPath(importMetaResolve(join(pkg, "package.json"), parent)));
  } catch {
    return dirname(fileURLToPath(importMetaResolve(join(pkg, "package.json"))));
  }
};

// src/componentManifest/generator.ts
import { recast as recast2 } from "storybook/internal/babel";
import { combineTags } from "storybook/internal/csf";
import { extractDescription, loadCsf } from "storybook/internal/csf-tools";
import { logger as logger4 } from "storybook/internal/node-logger";

// src/componentManifest/generateCodeSnippet.ts
import { types as t } from "storybook/internal/babel";

// src/componentManifest/utils.ts
import { readFileSync } from "node:fs";
import { resolveImport } from "storybook/internal/common";
import { logger } from "storybook/internal/node-logger";

// ../../node_modules/empathic/find.mjs
import { join as join3 } from "node:path";
import { existsSync, statSync } from "node:fs";

// ../../node_modules/empathic/walk.mjs
import { dirname as dirname2 } from "node:path";

// ../../node_modules/empathic/resolve.mjs
import { isAbsolute as isAbsolute2, join as join2, resolve as resolve2 } from "node:path";
function absolute(input, root) {
  return isAbsolute2(input) ? input : resolve2(root || ".", input);
}

// ../../node_modules/empathic/walk.mjs
function up(base, options) {
  let { last, cwd: cwd2 } = options || {}, tmp = absolute(base, cwd2), root = absolute(last || "/", cwd2), prev, arr = [];
  for (; prev !== root && (arr.push(tmp), tmp = dirname2(prev = tmp), tmp !== prev); )
    ;
  return arr;
}

// ../../node_modules/empathic/find.mjs
function up2(name, options) {
  let dir, tmp, start = options && options.cwd || "";
  for (dir of up(start, options))
    if (tmp = join3(dir, name), existsSync(tmp)) return tmp;
}

// src/componentManifest/utils.ts
var groupBy = (items, keySelector) => items.reduce((acc = {}, item, index) => {
  let key = keySelector(item, index);
  return Array.isArray(acc[key]) || (acc[key] = []), acc[key].push(item), acc;
}, {});
function invariant(condition, message) {
  if (!condition)
    throw new Error((typeof message == "function" ? message() : message) ?? "Invariant failed");
}
var memoStore = /* @__PURE__ */ new WeakMap(), cached = (fn, opts = {}) => {
  let keyOf2 = opts.key ?? ((...args) => {
    try {
      return JSON.stringify(args);
    } catch {
      return String(args[0]);
    }
  });
  return (...args) => {
    let k = keyOf2(...args), name = fn.name || opts.name || "anonymous", store = memoStore.get(fn);
    if (store || (store = /* @__PURE__ */ new Map(), memoStore.set(fn, store)), store.has(k))
      return logger.verbose(`[cache] hit ${name} key=${k}`), store.get(k);
    let start = Date.now(), result = fn(...args), duration = Date.now() - start;
    return store.set(k, result), logger.verbose(`[cache] miss ${name} took ${duration}ms key=${k}`), result;
  };
}, invalidateCache = () => {
  memoStore = /* @__PURE__ */ new WeakMap();
}, cachedReadFileSync = cached(readFileSync, { name: "cachedReadFile" }), cachedFindUp = cached(up2, { name: "findUp" }), cachedResolveImport = cached(resolveImport, { name: "resolveImport" });

// src/componentManifest/generateCodeSnippet.ts
function getCodeSnippet(csf, storyName, componentName) {
  let storyDeclaration = csf._storyDeclarationPath[storyName], metaObj = csf._metaNode;
  if (!storyDeclaration) {
    let message = "Expected story to be a function or variable declaration";
    throw csf._storyPaths[storyName]?.buildCodeFrameError(message) ?? message;
  }
  let storyPath;
  if (storyDeclaration.isFunctionDeclaration())
    storyPath = storyDeclaration;
  else if (storyDeclaration.isVariableDeclarator()) {
    let init = storyDeclaration.get("init");
    invariant(
      init.isExpression(),
      () => storyDeclaration.buildCodeFrameError("Expected story initializer to be an expression").message
    ), storyPath = init;
  } else
    throw storyDeclaration.buildCodeFrameError(
      "Expected story to be a function or variable declaration"
    );
  let normalizedPath = storyPath;
  if (storyPath.isCallExpression()) {
    let callee = storyPath.get("callee");
    if (callee.isMemberExpression()) {
      let obj = callee.get("object"), prop = callee.get("property"), isBind = prop.isIdentifier() && prop.node.name === "bind" || t.isStringLiteral(prop.node) && prop.node.value === "bind";
      if (obj.isIdentifier() && isBind) {
        let resolved = resolveBindIdentifierInit(storyDeclaration, obj);
        resolved && (normalizedPath = resolved);
      }
    }
    if (storyPath === normalizedPath) {
      let args = storyPath.get("arguments");
      if (args.length !== 0) {
        invariant(
          args.length === 1,
          () => storyPath.buildCodeFrameError("Could not evaluate story expression").message
        );
        let storyArg = args[0];
        invariant(
          storyArg.isExpression(),
          () => storyPath.buildCodeFrameError("Could not evaluate story expression").message
        ), normalizedPath = storyArg;
      }
    }
  }
  normalizedPath = normalizedPath.isTSSatisfiesExpression() || normalizedPath.isTSAsExpression() ? normalizedPath.get("expression") : normalizedPath;
  let storyFn;
  if (normalizedPath.isArrowFunctionExpression() || normalizedPath.isFunctionExpression() || normalizedPath.isFunctionDeclaration())
    storyFn = normalizedPath;
  else if (!normalizedPath.isObjectExpression() && !(normalizedPath.isCallExpression() && Array.isArray(normalizedPath.node.arguments) && normalizedPath.node.arguments.length === 0))
    throw normalizedPath.buildCodeFrameError(
      "Expected story to be csf factory, function or an object expression"
    );
  let storyProps = normalizedPath.isObjectExpression() ? normalizedPath.get("properties").filter((p) => p.isObjectProperty()) : [], metaPath = pathForNode(csf._file.path, metaObj), metaProps = metaPath?.isObjectExpression() ? metaPath.get("properties").filter((p) => p.isObjectProperty()) : [], getRenderPath = (object) => {
    let renderPath2 = object.find((p) => keyOf(p.node) === "render")?.get("value");
    if (renderPath2?.isIdentifier() && (componentName = renderPath2.node.name), renderPath2 && !(renderPath2.isArrowFunctionExpression() || renderPath2.isFunctionExpression()))
      throw renderPath2.buildCodeFrameError(
        "Expected render to be an arrow function or function expression"
      );
    return renderPath2;
  }, metaRenderPath = getRenderPath(metaProps), renderPath = getRenderPath(storyProps);
  storyFn ??= renderPath ?? metaRenderPath;
  let metaArgs = metaArgsRecord(metaObj ?? null), storyArgsPath = storyProps.filter((p) => keyOf(p.node) === "args").map((p) => p.get("value")).find((v) => v.isObjectExpression()), storyArgs = argsRecordFromObjectPath(storyArgsPath), storyAssignedArgsPath = storyArgsAssignmentPath(csf._file.path, storyName), storyAssignedArgs = argsRecordFromObjectPath(storyAssignedArgsPath), merged = { ...metaArgs, ...storyArgs, ...storyAssignedArgs }, entries = Object.entries(merged).filter(([k]) => k !== "children"), validEntries = entries.filter(([k, v]) => isValidJsxAttrName(k) && v != null), invalidEntries = entries.filter(([k, v]) => !isValidJsxAttrName(k) && v != null), injectedAttrs = validEntries.map(([k, v]) => toAttr(k, v)).filter((a) => a != null);
  if (storyFn) {
    let fn = storyFn.node;
    if (t.isArrowFunctionExpression(fn) && (t.isJSXElement(fn.body) || t.isJSXFragment(fn.body))) {
      let spreadRes = transformArgsSpreadsInJsx(fn.body, merged), inlineRes = inlineArgsInJsx(spreadRes.node, merged);
      if (spreadRes.changed || inlineRes.changed) {
        let newFn = t.arrowFunctionExpression([], inlineRes.node, fn.async);
        return t.variableDeclaration("const", [
          t.variableDeclarator(t.identifier(storyName), newFn)
        ]);
      }
    }
    let stmts = t.isFunctionDeclaration(fn) || t.isArrowFunctionExpression(fn) && t.isBlockStatement(fn.body) || t.isFunctionExpression(fn) && t.isBlockStatement(fn.body) ? fn.body.body : void 0;
    if (stmts) {
      let changed = !1, newBody = stmts.map((stmt) => {
        if (t.isReturnStatement(stmt) && stmt.argument && (t.isJSXElement(stmt.argument) || t.isJSXFragment(stmt.argument))) {
          let spreadRes = transformArgsSpreadsInJsx(stmt.argument, merged), inlineRes = inlineArgsInJsx(spreadRes.node, merged);
          if (spreadRes.changed || inlineRes.changed)
            return changed = !0, t.returnStatement(inlineRes.node);
        }
        return stmt;
      });
      if (changed)
        return t.isFunctionDeclaration(fn) ? t.functionDeclaration(fn.id, [], t.blockStatement(newBody), fn.generator, fn.async) : t.variableDeclaration("const", [
          t.variableDeclarator(
            t.identifier(storyName),
            t.arrowFunctionExpression([], t.blockStatement(newBody), fn.async)
          )
        ]);
    }
    return t.isFunctionDeclaration(fn) ? fn : t.variableDeclaration("const", [t.variableDeclarator(t.identifier(storyName), fn)]);
  }
  invariant(componentName, "Could not generate snippet without component name.");
  let invalidSpread = buildInvalidSpread(invalidEntries), name = t.jsxIdentifier(componentName), openingElAttrs = invalidSpread ? [...injectedAttrs, invalidSpread] : injectedAttrs, arrow = t.arrowFunctionExpression(
    [],
    t.jsxElement(
      t.jsxOpeningElement(name, openingElAttrs, !1),
      t.jsxClosingElement(name),
      toJsxChildren(merged.children),
      !1
    )
  );
  return t.variableDeclaration("const", [t.variableDeclarator(t.identifier(storyName), arrow)]);
}
function buildInvalidSpread(entries) {
  if (entries.length === 0)
    return null;
  let objectProps = entries.map(
    ([k, v]) => t.objectProperty(t.stringLiteral(k), t.isExpression(v) ? v : t.identifier("undefined"))
  );
  return t.jsxSpreadAttribute(t.objectExpression(objectProps));
}
var keyOf = (p) => t.isIdentifier(p.key) ? p.key.name : t.isStringLiteral(p.key) ? p.key.value : null, isValidJsxAttrName = (n) => /^[A-Za-z_][A-Za-z0-9_:-]*$/.test(n), argsRecordFromObjectPath = (objPath) => objPath ? Object.fromEntries(
  objPath.get("properties").filter((p) => p.isObjectProperty()).map((p) => [keyOf(p.node), p.get("value").node]).filter((e) => !!e[0])
) : {};
function storyArgsAssignmentPath(program, storyName) {
  let found = null;
  return program.traverse({
    AssignmentExpression(p) {
      let left = p.get("left"), right = p.get("right");
      if (left.isMemberExpression()) {
        let obj = left.get("object"), prop = left.get("property"), isStoryIdent = obj.isIdentifier() && obj.node.name === storyName, isArgsProp = prop.isIdentifier() && prop.node.name === "args" && !left.node.computed || t.isStringLiteral(prop.node) && left.node.computed && prop.node.value === "args";
        isStoryIdent && isArgsProp && right.isObjectExpression() && (found = right);
      }
    }
  }), found;
}
var argsRecordFromObjectNode = (obj) => obj ? Object.fromEntries(
  obj.properties.filter((p) => t.isObjectProperty(p)).map((p) => [keyOf(p), p.value]).filter((e) => !!e[0])
) : {}, metaArgsRecord = (meta) => {
  if (!meta)
    return {};
  let argsProp = meta.properties.find(
    (p) => t.isObjectProperty(p) && keyOf(p) === "args"
  );
  return argsProp && t.isObjectExpression(argsProp.value) ? argsRecordFromObjectNode(argsProp.value) : {};
}, toAttr = (key, value) => t.isBooleanLiteral(value) ? value.value ? t.jsxAttribute(t.jsxIdentifier(key), null) : t.jsxAttribute(t.jsxIdentifier(key), t.jsxExpressionContainer(value)) : t.isStringLiteral(value) ? t.jsxAttribute(t.jsxIdentifier(key), t.stringLiteral(value.value)) : t.isExpression(value) ? t.jsxAttribute(t.jsxIdentifier(key), t.jsxExpressionContainer(value)) : null, toJsxChildren = (node) => node ? t.isStringLiteral(node) ? [t.jsxText(node.value)] : t.isJSXElement(node) || t.isJSXFragment(node) ? [node] : t.isExpression(node) ? [t.jsxExpressionContainer(node)] : [] : [];
function getArgsMemberKey(expr) {
  if (t.isMemberExpression(expr) && t.isIdentifier(expr.object) && expr.object.name === "args") {
    if (t.isIdentifier(expr.property) && !expr.computed)
      return expr.property.name;
    if (t.isStringLiteral(expr.property) && expr.computed)
      return expr.property.value;
  }
  if (t.isOptionalMemberExpression?.(expr) && t.isIdentifier(expr.object) && expr.object.name === "args") {
    let prop = expr.property;
    if (t.isIdentifier(prop) && !expr.computed)
      return prop.name;
    if (t.isStringLiteral(prop) && expr.computed)
      return prop.value;
  }
  return null;
}
function inlineArgsInJsx(node, merged) {
  let changed = !1;
  if (t.isJSXElement(node)) {
    let opening = node.openingElement, newAttrs = opening.attributes.flatMap((a) => {
      if (!t.isJSXAttribute(a))
        return [a];
      let name = t.isJSXIdentifier(a.name) ? a.name.name : null;
      if (!(name && a.value && t.isJSXExpressionContainer(a.value)))
        return [a];
      let key = getArgsMemberKey(a.value.expression);
      if (!(key && key in merged))
        return [a];
      let repl = toAttr(name, merged[key]);
      return changed = !0, repl ? [repl] : [];
    }), newChildren = node.children.flatMap((c) => {
      if (t.isJSXElement(c) || t.isJSXFragment(c)) {
        let res = inlineArgsInJsx(c, merged);
        return changed ||= res.changed, [res.node];
      }
      return t.isJSXExpressionContainer(c) && getArgsMemberKey(c.expression) === "children" && merged.children ? (changed = !0, toJsxChildren(merged.children)) : [c];
    }), selfClosing = opening.selfClosing && newChildren.length === 0;
    return {
      node: t.jsxElement(
        t.jsxOpeningElement(opening.name, newAttrs, selfClosing),
        selfClosing ? null : node.closingElement ?? t.jsxClosingElement(opening.name),
        newChildren,
        selfClosing
      ),
      changed
    };
  }
  let fragChildren = node.children.flatMap((c) => {
    if (t.isJSXElement(c) || t.isJSXFragment(c)) {
      let res = inlineArgsInJsx(c, merged);
      return changed ||= res.changed, [res.node];
    }
    return t.isJSXExpressionContainer(c) && getArgsMemberKey(c.expression) === "children" && "children" in merged ? (changed = !0, toJsxChildren(merged.children)) : [c];
  });
  return { node: t.jsxFragment(node.openingFragment, node.closingFragment, fragChildren), changed };
}
function transformArgsSpreadsInJsx(node, merged) {
  let changed = !1, makeInjectedPieces = (existing) => {
    let entries = Object.entries(merged).filter(([k, v]) => v != null && k !== "children"), validEntries = entries.filter(([k]) => isValidJsxAttrName(k)), invalidEntries = entries.filter(([k]) => !isValidJsxAttrName(k)), injectedAttrs = validEntries.map(([k, v]) => toAttr(k, v)).filter((a) => !!a).filter((a) => t.isJSXIdentifier(a.name) && !existing.has(a.name.name)), invalidSpread = buildInvalidSpread(invalidEntries.filter(([k]) => !existing.has(k)));
    return invalidSpread ? [...injectedAttrs, invalidSpread] : injectedAttrs;
  };
  if (t.isJSXElement(node)) {
    let opening = node.openingElement, attrs = opening.attributes, isArgsSpread = (a) => t.isJSXSpreadAttribute(a) && t.isIdentifier(a.argument) && a.argument.name === "args", sawArgsSpread = attrs.some(isArgsSpread), firstIdx = attrs.findIndex(isArgsSpread), nonArgsAttrs = attrs.filter((a) => !isArgsSpread(a)), insertionIndex = sawArgsSpread ? attrs.slice(0, firstIdx).filter((a) => !isArgsSpread(a)).length : 0, newAttrs = sawArgsSpread ? (() => {
      let existing = new Set(
        nonArgsAttrs.filter((a) => t.isJSXAttribute(a)).flatMap((a) => t.isJSXIdentifier(a.name) ? [a.name.name] : [])
      ), pieces = makeInjectedPieces(existing);
      return changed = !0, [
        ...nonArgsAttrs.slice(0, insertionIndex),
        ...pieces,
        ...nonArgsAttrs.slice(insertionIndex)
      ];
    })() : nonArgsAttrs, newChildren = node.children.flatMap((c) => {
      if (t.isJSXElement(c) || t.isJSXFragment(c)) {
        let res = transformArgsSpreadsInJsx(c, merged);
        return changed ||= res.changed, [res.node];
      }
      return [c];
    }), children = sawArgsSpread && newChildren.length === 0 && merged.children ? (changed = !0, toJsxChildren(merged.children)) : newChildren, selfClosing = children.length === 0;
    return {
      node: t.jsxElement(
        t.jsxOpeningElement(opening.name, newAttrs, selfClosing),
        selfClosing ? null : node.closingElement ?? t.jsxClosingElement(opening.name),
        children,
        selfClosing
      ),
      changed
    };
  }
  let fragChildren = node.children.flatMap((c) => {
    if (t.isJSXElement(c) || t.isJSXFragment(c)) {
      let res = transformArgsSpreadsInJsx(c, merged);
      return changed ||= res.changed, [res.node];
    }
    return [c];
  });
  return { node: t.jsxFragment(node.openingFragment, node.closingFragment, fragChildren), changed };
}
function resolveBindIdentifierInit(storyPath, identifier) {
  let programPath = storyPath.findParent((p) => p.isProgram());
  if (!programPath)
    return null;
  let match = programPath.get("body").flatMap((stmt) => {
    if (stmt.isVariableDeclaration())
      return stmt.get("declarations");
    if (stmt.isExportNamedDeclaration()) {
      let decl = stmt.get("declaration");
      if (decl && decl.isVariableDeclaration())
        return decl.get("declarations");
    }
    return [];
  }).find((d) => {
    let id = d.get("id");
    return id.isIdentifier() && id.node.name === identifier.node.name;
  });
  if (!match)
    return null;
  let init = match.get("init");
  return init && init.isExpression() ? init : null;
}
function pathForNode(program, target) {
  if (!target)
    return;
  let found;
  return program.traverse({
    enter(p) {
      p.node && p.node === target && (found = p, p.stop());
    }
  }), found;
}

// src/componentManifest/getComponentImports.ts
import { dirname as dirname4 } from "node:path";
import { babelParse as babelParse2, recast, types as t3 } from "storybook/internal/babel";
import { logger as logger3 } from "storybook/internal/node-logger";

// src/componentManifest/reactDocgen.ts
import { existsSync as existsSync2 } from "node:fs";
import { dirname as dirname3, sep as sep2 } from "node:path";
import { babelParse, types as t2 } from "storybook/internal/babel";
import { getProjectRoot, supportedExtensions as supportedExtensions2 } from "storybook/internal/common";
import { logger as logger2 } from "storybook/internal/node-logger";
var import_ts_dedent = __toESM(require_dist(), 1), TsconfigPaths = __toESM(require_lib2(), 1);
import {
  builtinHandlers as docgenHandlers,
  builtinResolvers as docgenResolver,
  makeFsImporter,
  parse as parse3
} from "react-docgen";

// ../../node_modules/comment-parser/es6/primitives.js
var Markers;
(function(Markers2) {
  Markers2.start = "/**", Markers2.nostart = "/***", Markers2.delim = "*", Markers2.end = "*/";
})(Markers = Markers || (Markers = {}));

// ../../node_modules/comment-parser/es6/util.js
function isSpace(source) {
  return /^\s+$/.test(source);
}
function splitCR(source) {
  let matches = source.match(/\r+$/);
  return matches == null ? ["", source] : [source.slice(-matches[0].length), source.slice(0, -matches[0].length)];
}
function splitSpace(source) {
  let matches = source.match(/^\s+/);
  return matches == null ? ["", source] : [source.slice(0, matches[0].length), source.slice(matches[0].length)];
}
function splitLines(source) {
  return source.split(/\n/);
}
function seedSpec(spec = {}) {
  return Object.assign({ tag: "", name: "", type: "", optional: !1, description: "", problems: [], source: [] }, spec);
}
function seedTokens(tokens = {}) {
  return Object.assign({ start: "", delimiter: "", postDelimiter: "", tag: "", postTag: "", name: "", postName: "", type: "", postType: "", description: "", end: "", lineEnd: "" }, tokens);
}

// ../../node_modules/comment-parser/es6/parser/block-parser.js
var reTag = /^@\S+/;
function getParser({ fence = "```" } = {}) {
  let fencer = getFencer(fence), toggleFence = (source, isFenced) => fencer(source) ? !isFenced : isFenced;
  return function(source) {
    let sections = [[]], isFenced = !1;
    for (let line of source)
      reTag.test(line.tokens.description) && !isFenced ? sections.push([line]) : sections[sections.length - 1].push(line), isFenced = toggleFence(line.tokens.description, isFenced);
    return sections;
  };
}
function getFencer(fence) {
  return typeof fence == "string" ? (source) => source.split(fence).length % 2 === 0 : fence;
}

// ../../node_modules/comment-parser/es6/parser/source-parser.js
function getParser2({ startLine = 0, markers = Markers } = {}) {
  let block = null, num = startLine;
  return function(source) {
    let rest = source, tokens = seedTokens();
    if ([tokens.lineEnd, rest] = splitCR(rest), [tokens.start, rest] = splitSpace(rest), block === null && rest.startsWith(markers.start) && !rest.startsWith(markers.nostart) && (block = [], tokens.delimiter = rest.slice(0, markers.start.length), rest = rest.slice(markers.start.length), [tokens.postDelimiter, rest] = splitSpace(rest)), block === null)
      return num++, null;
    let isClosed = rest.trimRight().endsWith(markers.end);
    if (tokens.delimiter === "" && rest.startsWith(markers.delim) && !rest.startsWith(markers.end) && (tokens.delimiter = markers.delim, rest = rest.slice(markers.delim.length), [tokens.postDelimiter, rest] = splitSpace(rest)), isClosed) {
      let trimmed = rest.trimRight();
      tokens.end = rest.slice(trimmed.length - markers.end.length), rest = trimmed.slice(0, -markers.end.length);
    }
    if (tokens.description = rest, block.push({ number: num, source, tokens }), num++, isClosed) {
      let result = block.slice();
      return block = null, result;
    }
    return null;
  };
}

// ../../node_modules/comment-parser/es6/parser/spec-parser.js
function getParser3({ tokenizers }) {
  return function(source) {
    var _a;
    let spec = seedSpec({ source });
    for (let tokenize of tokenizers)
      if (spec = tokenize(spec), !((_a = spec.problems[spec.problems.length - 1]) === null || _a === void 0) && _a.critical)
        break;
    return spec;
  };
}

// ../../node_modules/comment-parser/es6/parser/tokenizers/tag.js
function tagTokenizer() {
  return (spec) => {
    let { tokens } = spec.source[0], match = tokens.description.match(/\s*(@(\S+))(\s*)/);
    return match === null ? (spec.problems.push({
      code: "spec:tag:prefix",
      message: 'tag should start with "@" symbol',
      line: spec.source[0].number,
      critical: !0
    }), spec) : (tokens.tag = match[1], tokens.postTag = match[3], tokens.description = tokens.description.slice(match[0].length), spec.tag = match[2], spec);
  };
}

// ../../node_modules/comment-parser/es6/parser/tokenizers/type.js
function typeTokenizer(spacing = "compact") {
  let join5 = getJoiner(spacing);
  return (spec) => {
    let curlies = 0, lines = [];
    for (let [i, { tokens }] of spec.source.entries()) {
      let type = "";
      if (i === 0 && tokens.description[0] !== "{")
        return spec;
      for (let ch of tokens.description)
        if (ch === "{" && curlies++, ch === "}" && curlies--, type += ch, curlies === 0)
          break;
      if (lines.push([tokens, type]), curlies === 0)
        break;
    }
    if (curlies !== 0)
      return spec.problems.push({
        code: "spec:type:unpaired-curlies",
        message: "unpaired curlies",
        line: spec.source[0].number,
        critical: !0
      }), spec;
    let parts = [], offset = lines[0][0].postDelimiter.length;
    for (let [i, [tokens, type]] of lines.entries())
      tokens.type = type, i > 0 && (tokens.type = tokens.postDelimiter.slice(offset) + type, tokens.postDelimiter = tokens.postDelimiter.slice(0, offset)), [tokens.postType, tokens.description] = splitSpace(tokens.description.slice(type.length)), parts.push(tokens.type);
    return parts[0] = parts[0].slice(1), parts[parts.length - 1] = parts[parts.length - 1].slice(0, -1), spec.type = join5(parts), spec;
  };
}
var trim = (x) => x.trim();
function getJoiner(spacing) {
  return spacing === "compact" ? (t5) => t5.map(trim).join("") : spacing === "preserve" ? (t5) => t5.join(`
`) : spacing;
}

// ../../node_modules/comment-parser/es6/parser/tokenizers/name.js
var isQuoted = (s) => s && s.startsWith('"') && s.endsWith('"');
function nameTokenizer() {
  let typeEnd = (num, { tokens }, i) => tokens.type === "" ? num : i;
  return (spec) => {
    let { tokens } = spec.source[spec.source.reduce(typeEnd, 0)], source = tokens.description.trimLeft(), quotedGroups = source.split('"');
    if (quotedGroups.length > 1 && quotedGroups[0] === "" && quotedGroups.length % 2 === 1)
      return spec.name = quotedGroups[1], tokens.name = `"${quotedGroups[1]}"`, [tokens.postName, tokens.description] = splitSpace(source.slice(tokens.name.length)), spec;
    let brackets = 0, name = "", optional = !1, defaultValue;
    for (let ch of source) {
      if (brackets === 0 && isSpace(ch))
        break;
      ch === "[" && brackets++, ch === "]" && brackets--, name += ch;
    }
    if (brackets !== 0)
      return spec.problems.push({
        code: "spec:name:unpaired-brackets",
        message: "unpaired brackets",
        line: spec.source[0].number,
        critical: !0
      }), spec;
    let nameToken = name;
    if (name[0] === "[" && name[name.length - 1] === "]") {
      optional = !0, name = name.slice(1, -1);
      let parts = name.split("=");
      if (name = parts[0].trim(), parts[1] !== void 0 && (defaultValue = parts.slice(1).join("=").trim()), name === "")
        return spec.problems.push({
          code: "spec:name:empty-name",
          message: "empty name",
          line: spec.source[0].number,
          critical: !0
        }), spec;
      if (defaultValue === "")
        return spec.problems.push({
          code: "spec:name:empty-default",
          message: "empty default value",
          line: spec.source[0].number,
          critical: !0
        }), spec;
      if (!isQuoted(defaultValue) && /=(?!>)/.test(defaultValue))
        return spec.problems.push({
          code: "spec:name:invalid-default",
          message: "invalid default value syntax",
          line: spec.source[0].number,
          critical: !0
        }), spec;
    }
    return spec.optional = optional, spec.name = name, tokens.name = nameToken, defaultValue !== void 0 && (spec.default = defaultValue), [tokens.postName, tokens.description] = splitSpace(source.slice(tokens.name.length)), spec;
  };
}

// ../../node_modules/comment-parser/es6/parser/tokenizers/description.js
function descriptionTokenizer(spacing = "compact", markers = Markers) {
  let join5 = getJoiner2(spacing);
  return (spec) => (spec.description = join5(spec.source, markers), spec);
}
function getJoiner2(spacing) {
  return spacing === "compact" ? compactJoiner : spacing === "preserve" ? preserveJoiner : spacing;
}
function compactJoiner(lines, markers = Markers) {
  return lines.map(({ tokens: { description } }) => description.trim()).filter((description) => description !== "").join(" ");
}
var lineNo = (num, { tokens }, i) => tokens.type === "" ? num : i, getDescription = ({ tokens }) => (tokens.delimiter === "" ? tokens.start : tokens.postDelimiter.slice(1)) + tokens.description;
function preserveJoiner(lines, markers = Markers) {
  if (lines.length === 0)
    return "";
  lines[0].tokens.description === "" && lines[0].tokens.delimiter === markers.start && (lines = lines.slice(1));
  let lastLine = lines[lines.length - 1];
  return lastLine !== void 0 && lastLine.tokens.description === "" && lastLine.tokens.end.endsWith(markers.end) && (lines = lines.slice(0, -1)), lines = lines.slice(lines.reduce(lineNo, 0)), lines.map(getDescription).join(`
`);
}

// ../../node_modules/comment-parser/es6/parser/index.js
function getParser4({ startLine = 0, fence = "```", spacing = "compact", markers = Markers, tokenizers = [
  tagTokenizer(),
  typeTokenizer(spacing),
  nameTokenizer(),
  descriptionTokenizer(spacing)
] } = {}) {
  if (startLine < 0 || startLine % 1 > 0)
    throw new Error("Invalid startLine");
  let parseSource = getParser2({ startLine, markers }), parseBlock = getParser({ fence }), parseSpec = getParser3({ tokenizers }), joinDescription = getJoiner2(spacing);
  return function(source) {
    let blocks = [];
    for (let line of splitLines(source)) {
      let lines = parseSource(line);
      if (lines === null)
        continue;
      let sections = parseBlock(lines), specs = sections.slice(1).map(parseSpec);
      blocks.push({
        description: joinDescription(sections[0], markers),
        tags: specs,
        source: lines,
        problems: specs.reduce((acc, spec) => acc.concat(spec.problems), [])
      });
    }
    return blocks;
  };
}

// ../../node_modules/comment-parser/es6/stringifier/index.js
function join4(tokens) {
  return tokens.start + tokens.delimiter + tokens.postDelimiter + tokens.tag + tokens.postTag + tokens.type + tokens.postType + tokens.name + tokens.postName + tokens.description + tokens.end + tokens.lineEnd;
}
function getStringifier() {
  return (block) => block.source.map(({ tokens }) => join4(tokens)).join(`
`);
}

// ../../node_modules/comment-parser/es6/stringifier/inspect.js
var zeroWidth = {
  line: 0,
  start: 0,
  delimiter: 0,
  postDelimiter: 0,
  tag: 0,
  postTag: 0,
  name: 0,
  postName: 0,
  type: 0,
  postType: 0,
  description: 0,
  end: 0,
  lineEnd: 0
};
var fields = Object.keys(zeroWidth);

// ../../node_modules/comment-parser/es6/index.js
function parse2(source, options = {}) {
  return getParser4(options)(source);
}
var stringify = getStringifier();

// src/componentManifest/jsdocTags.ts
function extractJSDocInfo(jsdocComment) {
  let jsDoc = ["/**", ...jsdocComment.split(`
`).map((line) => ` * ${line}`), " */"].join(`
`), parsed = parse2(jsDoc);
  return {
    description: parsed[0].description,
    tags: Object.fromEntries(
      Object.entries(groupBy(parsed[0].tags, (it) => it.tag)).map(([key, tags]) => [
        key,
        tags?.map((tag) => (tag.type ? `{${tag.type}} ` : "") + `${tag.name} ${tag.description}`) ?? []
      ])
    )
  };
}

// src/componentManifest/reactDocgen/actualNameHandler.ts
import { utils } from "react-docgen";
var { getNameOrValue, isReactForwardRefCall } = utils, actualNameHandler = function(documentation, componentDefinition) {
  if (documentation.set("definedInFile", componentDefinition.hub.file.opts.filename), (componentDefinition.isClassDeclaration() || componentDefinition.isFunctionDeclaration()) && componentDefinition.has("id"))
    documentation.set(
      "actualName",
      getNameOrValue(componentDefinition.get("id"))
    );
  else if (componentDefinition.isArrowFunctionExpression() || componentDefinition.isFunctionExpression() || isReactForwardRefCall(componentDefinition)) {
    let currentPath = componentDefinition;
    for (; currentPath.parentPath; ) {
      if (currentPath.parentPath.isVariableDeclarator()) {
        documentation.set("actualName", getNameOrValue(currentPath.parentPath.get("id")));
        return;
      }
      if (currentPath.parentPath.isAssignmentExpression()) {
        let leftPath = currentPath.parentPath.get("left");
        if (leftPath.isIdentifier() || leftPath.isLiteral()) {
          documentation.set("actualName", getNameOrValue(leftPath));
          return;
        }
      }
      currentPath = currentPath.parentPath;
    }
    documentation.set("actualName", "");
  }
}, actualNameHandler_default = actualNameHandler;

// src/componentManifest/reactDocgen/docgenResolver.ts
var import_resolve2 = __toESM(require_resolve(), 1);
import { supportedExtensions } from "storybook/internal/common";
var ReactDocgenResolveError = class extends Error {
  constructor(filename) {
    super(`'${filename}' was ignored by react-docgen.`);
    // the magic string that react-docgen uses to check if a module is ignored
    this.code = "MODULE_NOT_FOUND";
  }
};

// src/componentManifest/reactDocgen/exportNameHandler.ts
import { utils as utils2 } from "react-docgen";
var { isReactForwardRefCall: isReactForwardRefCall2 } = utils2;
function nameFromId(path2) {
  if (path2) {
    if (path2.isIdentifier())
      return path2.node.name;
    if (path2.isStringLiteral())
      return path2.node.value;
  }
}
function isInlineDefaultExport(path2) {
  let p = path2;
  for (; p && p.parentPath; ) {
    if (p.parentPath.isExportDefaultDeclaration())
      return !0;
    p = p.parentPath;
  }
  return !1;
}
function findProgram(path2) {
  let found = path2.findParent((p) => p.isProgram());
  return found && found.isProgram() ? found : void 0;
}
function getLocalName(componentDefinition, fallback) {
  if (fallback)
    return fallback;
  if ((componentDefinition.isClassDeclaration() || componentDefinition.isFunctionDeclaration()) && componentDefinition.has("id")) {
    let idPath = componentDefinition.get("id");
    return nameFromId(idPath);
  }
  if (componentDefinition.isArrowFunctionExpression() || componentDefinition.isFunctionExpression() || isReactForwardRefCall2(componentDefinition)) {
    let p = componentDefinition;
    for (; p && p.parentPath; ) {
      if (p.parentPath.isVariableDeclarator()) {
        let id = p.parentPath.get("id");
        return nameFromId(id);
      }
      if (p.parentPath.isAssignmentExpression()) {
        let left = p.parentPath.get("left"), lhs = nameFromId(left);
        if (lhs)
          return lhs;
      }
      p = p.parentPath;
    }
  }
}
var exportNameHandler = (documentation, componentDefinition) => {
  if (isInlineDefaultExport(componentDefinition)) {
    documentation.set("exportName", "default");
    return;
  }
  let actual = documentation.get("actualName"), localName = getLocalName(componentDefinition, typeof actual == "string" ? actual : void 0), programPath = findProgram(componentDefinition);
  if (!programPath) {
    documentation.set("exportName", void 0);
    return;
  }
  let body = programPath.get("body");
  for (let stmt of body) {
    if (stmt.isExportNamedDeclaration() && stmt.has("declaration")) {
      let decl = stmt.get("declaration");
      if (decl.isFunctionDeclaration() || decl.isClassDeclaration()) {
        let name = nameFromId(decl.get("id"));
        if (name && name === localName) {
          documentation.set("exportName", name);
          return;
        }
      }
      if (decl.isVariableDeclaration()) {
        let decls = decl.get("declarations");
        for (let d of decls)
          if (d.isVariableDeclarator()) {
            let id = d.get("id");
            if (id.isIdentifier() && id.node.name === localName) {
              documentation.set("exportName", localName);
              return;
            }
          }
      }
    }
    if (stmt.isExportNamedDeclaration() && stmt.has("specifiers")) {
      let specs = stmt.get("specifiers");
      for (let s of specs)
        if (s.isExportSpecifier()) {
          let local = nameFromId(s.get("local")), exported = nameFromId(s.get("exported"));
          if (local && local === localName) {
            documentation.set(
              "exportName",
              exported === "default" ? "default" : exported ?? local
            );
            return;
          }
        }
    }
    if (stmt.isExportDefaultDeclaration()) {
      let decl = stmt.get("declaration");
      if (decl.isIdentifier() && decl.node.name === localName) {
        documentation.set("exportName", "default");
        return;
      }
    }
  }
  documentation.set("exportName", void 0);
}, exportNameHandler_default = exportNameHandler;

// src/componentManifest/reactDocgen.ts
var defaultHandlers = Object.values(docgenHandlers).map((handler) => handler), defaultResolver = new docgenResolver.FindExportedDefinitionsResolver(), handlers = [...defaultHandlers, actualNameHandler_default, exportNameHandler_default];
function getMatchingDocgen(docgens, component) {
  return docgens.length === 0 ? void 0 : docgens.length === 1 ? docgens[0] : docgens.find(
    (docgen) => [component.importName, component.localImportName].includes(docgen.exportName)
  ) ?? docgens.find(
    (docgen) => [component.importName, component.localImportName, component.componentName].includes(
      docgen.displayName
    ) || [component.importName, component.localImportName, component.componentName].includes(
      docgen.actualName
    )
  ) ?? docgens[0];
}
function matchPath(id, basedir) {
  basedir ??= process.cwd();
  let tsconfig = getTsConfig(basedir);
  return tsconfig.resultType === "success" ? TsconfigPaths.createMatchPath(tsconfig.absoluteBaseUrl, tsconfig.paths, [
    "browser",
    "module",
    "main"
  ])(id, void 0, void 0, supportedExtensions2) ?? id : id;
}
var getTsConfig = cached(
  (cwd2) => {
    let tsconfigPath = up2("tsconfig.json", { cwd: cwd2, last: getProjectRoot() });
    return TsconfigPaths.loadConfig(tsconfigPath);
  },
  { name: "getTsConfig" }
), parseWithReactDocgen = cached(
  (code, path2) => parse3(code, {
    resolver: defaultResolver,
    handlers,
    importer: getReactDocgenImporter(),
    filename: path2
  }),
  { key: (code, path2) => path2, name: "parseWithReactDocgen" }
), getExportPaths = cached(
  (code, filePath) => {
    let ast;
    try {
      ast = babelParse(code);
    } catch {
      return [];
    }
    let basedir = dirname3(filePath);
    return ast.program.body.flatMap(
      (statement) => t2.isExportAllDeclaration(statement) ? [statement.source.value] : t2.isExportNamedDeclaration(statement) && statement.source && !statement.declaration ? [statement.source.value] : []
    ).map((id) => matchPath(id, basedir)).flatMap((id) => {
      try {
        return [cachedResolveImport(id, { basedir })];
      } catch (e) {
        return logger2.debug(e), [];
      }
    });
  },
  { name: "getExportPaths" }
), gatherDocgensForPath = cached(
  (path2, depth) => {
    if (path2.includes("node_modules"))
      return {
        docgens: [],
        errors: [
          {
            path: path2,
            code: "/* File in node_modules */",
            name: "Component file in node_modules",
            message: import_ts_dedent.dedent`
              Component files in node_modules are not supported.
              The distributed files in node_modules usually don't contain the necessary comments or types needed to analyze component information.
              Configure TypeScript path aliases to map your package name to the source file instead.

              Example (tsconfig.json):
              {
                "compilerOptions": {
                  "baseUrl": ".",
                  "paths": {
                    "@design-system/button": ["src/components/Button.tsx"],
                    "@design-system/*": ["src/components/*"]
                  }
                }
              }

              Then import using:
              import { Button } from '@design-system/button'

              Storybook resolves tsconfig paths automatically.
            `
          }
        ]
      };
    let code;
    try {
      code = cachedReadFileSync(path2, "utf-8");
    } catch {
      return {
        docgens: [],
        errors: [
          {
            path: path2,
            code: "/* File not found or unreadable */",
            name: "Component file could not be read",
            message: `Could not read the component file located at "${path2}".
Prefer relative imports if possible.`
          }
        ]
      };
    }
    if (depth > 5)
      return {
        docgens: [],
        errors: [
          {
            path: path2,
            code,
            name: "Max re-export depth exceeded",
            message: import_ts_dedent.dedent`
              Traversal stopped after 5 steps while following re-exports starting from this file.
              This usually indicates a deep or circular re-export chain. Try one of the following:
              - Import the component file directly (e.g., src/components/Button.tsx),
              - Reduce the number of re-export hops.
            `
          }
        ]
      };
    let exportPaths = getExportPaths(code, path2).map((p) => gatherDocgensForPath(p, depth + 1)), docgens = exportPaths.flatMap((r) => r.docgens), errors = exportPaths.flatMap((r) => r.errors);
    try {
      return {
        docgens: [...parseWithReactDocgen(code, path2), ...docgens],
        errors
      };
    } catch (e) {
      let message = e instanceof Error ? e.message : String(e);
      return {
        docgens,
        errors: [
          {
            path: path2,
            code,
            name: "No component definition found",
            message: import_ts_dedent.dedent`
              ${message}
              You can debug your component file in this playground: https://react-docgen.dev/playground
            `
          },
          ...errors
        ]
      };
    }
  },
  { name: "gatherDocgensWithTrace", key: (filePath) => filePath }
), getReactDocgen = cached(
  (path2, component) => {
    let { docgens, errors } = gatherDocgensForPath(path2, 0), docgen = getMatchingDocgen(docgens, component);
    return docgen ? { type: "success", data: docgen } : { type: "error", error: {
      name: errors.at(-1)?.name ?? "No component definition found",
      message: errors.map(
        (e) => import_ts_dedent.dedent`
            File: ${e.path}
            Error:
            ${e.message}
            Code:
            ${e.code}`
      ).join(`

`)
    } };
  },
  { name: "getReactDocgen", key: (path2, component) => path2 + JSON.stringify(component) }
);
function getReactDocgenImporter() {
  return makeFsImporter((filename, basedir) => {
    let mappedFilenameByPaths = matchPath(filename, basedir), result = cachedResolveImport(mappedFilenameByPaths, { basedir });
    if (result.includes(`${sep2}react-native${sep2}index.js`)) {
      let replaced = result.replace(
        `${sep2}react-native${sep2}index.js`,
        `${sep2}react-native-web${sep2}dist${sep2}index.js`
      );
      if (existsSync2(replaced) && supportedExtensions2.find((ext) => result.endsWith(ext)))
        return replaced;
    }
    if (supportedExtensions2.find((ext) => result.endsWith(ext)))
      return result;
    throw new ReactDocgenResolveError(filename);
  });
}
function getImportTag(docgen) {
  let jsdocComment = docgen?.description;
  return (jsdocComment ? extractJSDocInfo(jsdocComment).tags : void 0)?.import?.[0];
}

// src/componentManifest/getComponentImports.ts
var baseIdentifier = (component) => component.split(".")[0] ?? component, isTypeSpecifier = (s) => t3.isImportSpecifier(s) && s.importKind === "type", importedName = (im) => t3.isIdentifier(im) ? im.name : im.value, addUniqueBy = (arr, item, eq) => {
  arr.find(eq) || arr.push(item);
}, getComponents = ({
  csf,
  storyFilePath
}) => {
  let program = csf._file.path, componentSet = /* @__PURE__ */ new Set(), localToImport = /* @__PURE__ */ new Map();
  program.traverse({
    JSXOpeningElement(p) {
      let n = p.node.name;
      if (t3.isJSXIdentifier(n)) {
        let name = n.name;
        name && /[A-Z]/.test(name.charAt(0)) && componentSet.add(name);
      } else if (t3.isJSXMemberExpression(n)) {
        let jsxNameToString = (name) => t3.isJSXIdentifier(name) ? name.name : `${jsxNameToString(name.object)}.${jsxNameToString(name.property)}`, full = jsxNameToString(n);
        componentSet.add(full);
      }
    }
  });
  let metaComp = csf._meta?.component;
  metaComp && componentSet.add(metaComp);
  let components = Array.from(componentSet).sort((a, b) => a.localeCompare(b)), body = program.get("body");
  for (let stmt of body) {
    if (!stmt.isImportDeclaration())
      continue;
    let decl = stmt.node;
    if (decl.importKind === "type")
      continue;
    let specifiers = decl.specifiers ?? [];
    if (specifiers.length !== 0)
      for (let s of specifiers) {
        if (!("local" in s) || !s.local || isTypeSpecifier(s))
          continue;
        let importId = decl.source.value;
        if (t3.isImportDefaultSpecifier(s))
          localToImport.set(s.local.name, { importId, importName: "default" });
        else if (t3.isImportNamespaceSpecifier(s))
          localToImport.set(s.local.name, { importId, importName: "*" });
        else if (t3.isImportSpecifier(s)) {
          let imported = importedName(s.imported);
          localToImport.set(s.local.name, { importId, importName: imported });
        }
      }
  }
  let isLocallyDefinedWithoutImport = (base) => {
    let binding = program.scope.getBinding(base);
    return binding ? !!!(binding.path.isImportSpecifier?.() || binding.path.isImportDefaultSpecifier?.() || binding.path.isImportNamespaceSpecifier?.()) : !1;
  };
  return components.filter(
    (c) => !isLocallyDefinedWithoutImport(baseIdentifier(c))
  ).map((c) => {
    let dot = c.indexOf(".");
    if (dot !== -1) {
      let ns = c.slice(0, dot), member = c.slice(dot + 1), direct2 = localToImport.get(ns);
      return direct2 ? direct2.importName === "*" ? {
        componentName: c,
        localImportName: ns,
        importId: direct2.importId,
        importName: member,
        namespace: ns
      } : {
        componentName: c,
        localImportName: ns,
        importId: direct2.importId,
        importName: direct2.importName
      } : { componentName: c };
    }
    let direct = localToImport.get(c);
    return direct ? {
      componentName: c,
      localImportName: c,
      importId: direct.importId,
      importName: direct.importName
    } : { componentName: c };
  }).map((component) => {
    let path2, isPackage = !1;
    try {
      component.importId && storyFilePath && (path2 = cachedResolveImport(matchPath(component.importId, dirname4(storyFilePath)), {
        basedir: dirname4(storyFilePath)
      }));
    } catch (e) {
      logger3.debug(e);
    }
    try {
      component.importId && !component.importId.startsWith(".") && storyFilePath && (cachedResolveImport(component.importId, { basedir: dirname4(storyFilePath) }), isPackage = !0);
    } catch {
    }
    let componentWithPackage = { ...component, isPackage };
    if (path2) {
      let reactDocgen = getReactDocgen(path2, componentWithPackage);
      return {
        ...componentWithPackage,
        path: path2,
        reactDocgen,
        importOverride: reactDocgen.type === "success" ? getImportTag(reactDocgen.data) : void 0
      };
    }
    return componentWithPackage;
  }).sort((a, b) => a.componentName.localeCompare(b.componentName));
}, getImports = ({
  components,
  packageName
}) => {
  let withSource = components.filter((c) => !!c.importId).map((c, idx) => {
    let importId = c.importId, overrideSource = (() => {
      if (c.importOverride)
        try {
          let src = babelParse2(c.importOverride).program.body.find((n) => t3.isImportDeclaration(n))?.source?.value;
          return typeof src == "string" ? src : void 0;
        } catch {
          return;
        }
    })(), rewritten = overrideSource !== void 0 ? overrideSource : (
      // only rewrite to the package name it the import id is not already a valid package
      // tsconfig paths such as ~/components/Button and components/Button are not seen as packages
      packageName && !c.isPackage ? packageName : importId
    );
    return { c, src: t3.stringLiteral(rewritten), key: rewritten, ord: idx };
  }), orderOfSource = {};
  for (let w of withSource)
    orderOfSource[w.key] === void 0 && (orderOfSource[w.key] = w.ord);
  let buckets = /* @__PURE__ */ new Map(), ensureBucket = (key, src) => {
    let prev = buckets.get(key);
    if (prev)
      return prev;
    let b = {
      source: src,
      defaults: [],
      namespaces: [],
      named: [],
      order: orderOfSource[key] ?? 0
    };
    return buckets.set(key, b), b;
  };
  for (let { c, src, key } of withSource) {
    let b = ensureBucket(key, src), rewritten = src.value !== c.importId, overrideSpec = (() => {
      if (c.importOverride)
        try {
          let decl = babelParse2(c.importOverride).program.body.find((n) => t3.isImportDeclaration(n));
          if (!decl)
            return;
          let spec = (decl.specifiers ?? []).find((s) => !isTypeSpecifier(s));
          return spec ? t3.isImportNamespaceSpecifier(spec) ? { kind: "namespace", local: spec.local.name } : t3.isImportDefaultSpecifier(spec) ? { kind: "default" } : t3.isImportSpecifier(spec) ? { kind: "named", imported: t3.isIdentifier(spec.imported) ? spec.imported.name : spec.imported.value } : void 0 : void 0;
        } catch {
          return;
        }
    })();
    if (overrideSpec) {
      if (overrideSpec.kind === "namespace") {
        let ns = t3.identifier(overrideSpec.local);
        addUniqueBy(b.namespaces, ns, (n) => n.name === ns.name);
        continue;
      }
      if (!c.localImportName)
        continue;
      if (overrideSpec.kind === "default") {
        let id = t3.identifier(c.localImportName);
        addUniqueBy(b.defaults, id, (d) => d.name === id.name);
        continue;
      }
      if (overrideSpec.kind === "named") {
        let local = t3.identifier(c.localImportName), imported = t3.identifier(overrideSpec.imported);
        addUniqueBy(
          b.named,
          t3.importSpecifier(local, imported),
          (n) => n.local.name === local.name && importedName(n.imported) === imported.name
        );
        continue;
      }
    }
    if (c.namespace) {
      if (rewritten) {
        if (!c.importName)
          continue;
        let member = c.importName, id = t3.identifier(member);
        addUniqueBy(
          b.named,
          t3.importSpecifier(id, id),
          (n) => n.local.name === member && importedName(n.imported) === member
        );
      } else {
        let ns = t3.identifier(c.namespace);
        addUniqueBy(b.namespaces, ns, (n) => n.name === ns.name);
      }
      continue;
    }
    if (c.importName === "default") {
      if (!c.localImportName)
        continue;
      if (rewritten) {
        let id = t3.identifier(c.localImportName);
        addUniqueBy(
          b.named,
          t3.importSpecifier(id, id),
          (n) => n.local.name === id.name && importedName(n.imported) === id.name
        );
      } else {
        let id = t3.identifier(c.localImportName);
        addUniqueBy(b.defaults, id, (d) => d.name === id.name);
      }
      continue;
    }
    if (c.importName) {
      if (!c.localImportName)
        continue;
      let local = t3.identifier(c.localImportName), imported = t3.identifier(c.importName);
      addUniqueBy(
        b.named,
        t3.importSpecifier(local, imported),
        (n) => n.local.name === local.name && importedName(n.imported) === imported.name
      );
      continue;
    }
  }
  let merged = [], printDecl = (specs, src) => {
    let node = t3.importDeclaration(specs, src), code = recast.print(node, {}).code;
    merged.push(code);
  }, sortedBuckets = Array.from(buckets.values()).sort((a, b) => a.order - b.order);
  for (let bucket of sortedBuckets) {
    let { source, defaults, namespaces, named } = bucket;
    if (!(defaults.length === 0 && namespaces.length === 0 && named.length === 0))
      if (namespaces.length > 0) {
        let firstSpecs = [];
        defaults[0] && firstSpecs.push(t3.importDefaultSpecifier(defaults[0])), firstSpecs.push(t3.importNamespaceSpecifier(namespaces[0])), printDecl(firstSpecs, source), named.length > 0 && printDecl(named, source);
        for (let d of defaults.slice(1))
          printDecl([t3.importDefaultSpecifier(d)], source);
        for (let ns of namespaces.slice(1))
          printDecl([t3.importNamespaceSpecifier(ns)], source);
      } else {
        if (defaults.length > 0 || named.length > 0) {
          let specs = [];
          defaults[0] && specs.push(t3.importDefaultSpecifier(defaults[0])), specs.push(...named), printDecl(specs, source);
        }
        for (let d of defaults.slice(1))
          printDecl([t3.importDefaultSpecifier(d)], source);
      }
  }
  return merged;
};

// src/componentManifest/generator.ts
var componentManifestGenerator = async () => (async (storyIndexGenerator) => {
  invalidateCache();
  let startIndex = performance.now(), index = await storyIndexGenerator.getIndex();
  logger4.verbose(`Story index generation took ${performance.now() - startIndex}ms`);
  let startPerformance = performance.now(), groupByComponentId = groupBy(
    Object.values(index.entries).filter((entry) => entry.type === "story").filter((entry) => entry.subtype === "story"),
    (it) => it.id.split("--")[0]
  ), components = Object.values(groupByComponentId).flatMap(
    (group) => group && group?.length > 0 ? [group[0]] : []
  ).map((entry) => {
    let absoluteImportPath = path.join(process.cwd(), entry.importPath), storyFile = cachedReadFileSync(absoluteImportPath, "utf-8"), csf = loadCsf(storyFile, { makeTitle: (title2) => title2 ?? "No title" }).parse();
    if (!csf.stories.map((it) => combineTags("manifest", ...csf.meta.tags ?? [], ...it.tags ?? [])).some((it) => it.includes("manifest")))
      return;
    let componentName = csf._meta?.component, id = entry.id.split("--")[0], importPath = entry.importPath, components2 = getComponents({ csf, storyFilePath: absoluteImportPath }), trimmedTitle = entry.title.replace(/\s+/g, ""), component = components2.find((it) => componentName ? [it.componentName, it.localImportName, it.importName].includes(componentName) : trimmedTitle.includes(it.componentName) || it.localImportName && trimmedTitle.includes(it.localImportName) || it.importName && trimmedTitle.includes(it.importName)), stories = Object.keys(csf._stories).map((storyName) => {
      let story = csf._stories[storyName];
      if (combineTags(
        "manifest",
        ...csf.meta.tags ?? [],
        ...story.tags ?? []
      ).includes("manifest"))
        try {
          let jsdocComment2 = extractDescription(csf._storyStatements[storyName]), { tags: tags2 = {}, description: description2 } = jsdocComment2 ? extractJSDocInfo(jsdocComment2) : {}, finalDescription = (tags2?.describe?.[0] || tags2?.desc?.[0]) ?? description2;
          return {
            name: storyName,
            snippet: recast2.print(getCodeSnippet(csf, storyName, component?.componentName)).code,
            description: finalDescription?.trim(),
            summary: tags2.summary?.[0]
          };
        } catch (e) {
          return invariant(e instanceof Error), {
            name: storyName,
            error: { name: e.name, message: e.message }
          };
        }
    }).filter((it) => it != null), nearestPkg = cachedFindUp("package.json", {
      cwd: path.dirname(component?.path ?? absoluteImportPath)
    }), packageName;
    try {
      packageName = nearestPkg ? JSON.parse(cachedReadFileSync(nearestPkg, "utf-8")).name : void 0;
    } catch {
    }
    let fallbackImport = packageName && componentName ? `import { ${componentName} } from "${packageName}";` : "", imports = getImports({ components: components2, packageName }).join(`
`).trim() || fallbackImport, title = entry.title.split("/").at(-1).replace(/\s+/g, ""), base = {
      id,
      name: componentName ?? title,
      path: importPath,
      stories,
      import: imports,
      jsDocTags: {}
    };
    if (!component?.reactDocgen) {
      let error2 = csf._meta?.component ? {
        name: "No component import found",
        message: `No component file found for the "${csf.meta.component}" component.`
      } : {
        name: "No component found",
        message: "We could not detect the component from your story file. Specify meta.component."
      };
      return {
        ...base,
        error: {
          name: error2.name,
          message: (csf._metaStatementPath?.buildCodeFrameError(error2.message).message ?? error2.message) + `

${entry.importPath}:
${storyFile}`
        }
      };
    }
    let docgenResult = component.reactDocgen, docgen = docgenResult.type === "success" ? docgenResult.data : void 0, error = docgenResult.type === "error" ? docgenResult.error : void 0, jsdocComment = extractDescription(csf._metaStatement) || docgen?.description, { tags = {}, description } = jsdocComment ? extractJSDocInfo(jsdocComment) : {};
    return {
      ...base,
      description: ((tags?.describe?.[0] || tags?.desc?.[0]) ?? description)?.trim(),
      summary: tags.summary?.[0],
      import: imports,
      reactDocgen: docgen,
      jsDocTags: tags,
      error
    };
  });
  return logger4.verbose(`Component manifest generation took ${performance.now() - startPerformance}ms`), {
    v: 0,
    components: Object.fromEntries(
      components.filter((component) => component != null).map((component) => [component.id, component])
    )
  };
});

// src/enrichCsf.ts
import { recast as recast3, types as t4 } from "storybook/internal/babel";
import { getPrettier } from "storybook/internal/common";
var enrichCsf = async (input, options) => {
  if ((await options.presets.apply("features")).experimentalCodeExamples)
    return async (csf, csfSource) => {
      let promises = Object.keys(csf._stories).map(async (key) => {
        if (!csfSource._meta?.component)
          return;
        let { format: format3 } = await getPrettier(), node, snippet;
        try {
          node = getCodeSnippet(csfSource, key, csfSource._meta?.component);
        } catch (e) {
          if (!(e instanceof Error))
            return;
          snippet = e.message;
        }
        try {
          !snippet && node && (snippet = await format3(recast3.print(node).code, {
            filepath: join(process.cwd(), "component.tsx")
          }));
        } catch (e) {
          if (!(e instanceof Error))
            return;
          snippet = e.message;
        }
        if (!snippet)
          return;
        let originalParameters = t4.memberExpression(
          csf._metaIsFactory ? t4.memberExpression(t4.identifier(key), t4.identifier("input")) : t4.identifier(key),
          t4.identifier("parameters")
        ), docsParameter = t4.optionalMemberExpression(
          originalParameters,
          t4.identifier("docs"),
          !1,
          !0
        );
        csf._ast.program.body.push(
          t4.expressionStatement(
            t4.assignmentExpression(
              "=",
              originalParameters,
              t4.objectExpression([
                t4.spreadElement(originalParameters),
                t4.objectProperty(
                  t4.identifier("docs"),
                  t4.objectExpression([
                    t4.spreadElement(docsParameter),
                    t4.objectProperty(
                      t4.identifier("source"),
                      t4.objectExpression([
                        t4.objectProperty(t4.identifier("code"), t4.stringLiteral(snippet)),
                        t4.spreadElement(
                          t4.optionalMemberExpression(
                            docsParameter,
                            t4.identifier("source"),
                            !1,
                            !0
                          )
                        )
                      ])
                    )
                  ])
                )
              ])
            )
          )
        );
      });
      await Promise.all(promises);
    };
};

// src/preset.ts
var addons = [
  import.meta.resolve("@storybook/react-dom-shim/preset")
], previewAnnotations = async (input = [], options) => {
  let [docsConfig, features] = await Promise.all([
    options.presets.apply("docs", {}, options),
    options.presets.apply("features", {}, options)
  ]), docsEnabled = Object.keys(docsConfig).length > 0, experimentalRSC = features?.experimentalRSC;
  return [].concat(input).concat([
    fileURLToPath2(import.meta.resolve("@storybook/react/entry-preview")),
    fileURLToPath2(import.meta.resolve("@storybook/react/entry-preview-argtypes"))
  ]).concat(
    docsEnabled ? [fileURLToPath2(import.meta.resolve("@storybook/react/entry-preview-docs"))] : []
  ).concat(
    experimentalRSC ? [fileURLToPath2(import.meta.resolve("@storybook/react/entry-preview-rsc"))] : []
  );
}, resolvedReact = async (existing) => {
  try {
    return {
      ...existing,
      react: resolvePackageDir("react"),
      reactDom: resolvePackageDir("react-dom")
    };
  } catch {
    return existing;
  }
};
export {
  addons,
  componentManifestGenerator as experimental_componentManifestGenerator,
  enrichCsf as experimental_enrichCsf,
  previewAnnotations,
  resolvedReact
};
