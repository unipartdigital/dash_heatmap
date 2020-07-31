/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "5c3e498-" + chunkId + "-wps-hmr.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "5c3e498-wps-hmr.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "4dae69a79576d9f6a261";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack-plugin-serve/client.js":
/*!****************************************!*\
  !*** (webpack)-plugin-serve/client.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/

/**
 * @note This file exists merely as an easy reference for folks adding it to their configuration entries
 */

(() => {
  /* eslint-disable global-require */
  const { run } = __webpack_require__(/*! ./lib/client/client */ "./node_modules/webpack-plugin-serve/lib/client/client.js");
  let hash = '<unknown>';
  let options;
  try {
    options = {"compress":null,"historyFallback":false,"hmr":true,"host":null,"liveReload":false,"log":{"level":"info","prefix":{"template":"{{level}}"},"name":"webpack-plugin-serve"},"open":true,"port":55555,"progress":true,"secure":false,"static":["/home/richardwhitefoot/Documents/dash_heatmap"],"status":true,"address":"[::]:55555","compilerName":null,"wpsId":"5c3e498"};
  } catch (e) {
    const { log } = __webpack_require__(/*! ./lib/client/log */ "./node_modules/webpack-plugin-serve/lib/client/log.js");
    log.error(
      'The entry for webpack-plugin-serve was included in your build, but it does not appear that the plugin was. Please check your configuration.'
    );
  }

  try {
    // eslint-disable-next-line camelcase
    hash = __webpack_require__.h();
  } catch (e) {} // eslint-disable-line no-empty

  run(hash, options);
})();


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/ClientSocket.js":
/*!*********************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/ClientSocket.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { error, refresh, warn } = __webpack_require__(/*! ./log */ "./node_modules/webpack-plugin-serve/lib/client/log.js")();

// ignore 1008 (HTTP 400 equivalent) and 1011 (HTTP 500 equivalent)
const ignoreCodes = [1008, 1011];
const maxAttempts = 10;

class ClientSocket {
  constructor(options, ...args) {
    this.args = args;
    this.attempts = 0;
    this.eventHandlers = [];
    this.options = options;
    this.retrying = false;

    this.connect();
  }

  addEventListener(...args) {
    this.eventHandlers.push(args);
    this.socket.addEventListener(...args);
  }

  close() {
    this.socket.close();
  }

  connect() {
    if (this.socket) {
      delete this.socket;
    }

    this.connecting = true;

    this.socket = new WebSocket(...this.args);

    if (this.options.retry) {
      this.socket.addEventListener('close', (event) => {
        if (ignoreCodes.includes(event.code)) {
          return;
        }

        if (!this.retrying) {
          warn(`The WebSocket was closed and will attempt to reconnect`);
        }

        this.reconnect();
      });
    } else {
      this.socket.onclose = () => warn(`The client WebSocket was closed. ${refresh}`);
    }

    this.socket.addEventListener('open', () => {
      this.attempts = 0;
      this.retrying = false;
    });

    if (this.eventHandlers.length) {
      for (const [name, fn] of this.eventHandlers) {
        this.socket.addEventListener(name, fn);
      }
    }
  }

  reconnect() {
    this.attempts += 1;
    this.retrying = true;

    if (this.attempts > maxAttempts) {
      error(`The WebSocket could not be reconnected. ${refresh}`);
      this.retrying = false;
      return;
    }

    const timeout = 1000 * this.attempts ** 2;

    setTimeout(() => this.connect(this.args), timeout);
  }

  removeEventListener(...args) {
    const [, handler] = args;
    this.eventHandlers = this.eventHandlers.filter(([, fn]) => fn === handler);
    this.socket.removeEventListener(...args);
  }
}

module.exports = { ClientSocket };


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/client.js":
/*!***************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/client.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
/* eslint-disable global-require */
const run = (buildHash, options) => {
  const { address, client = {}, progress, secure, status } = options;

  options.firstInstance = !window.webpackPluginServe; // eslint-disable-line no-param-reassign

  window.webpackPluginServe = window.webpackPluginServe || {
    compilers: {}
  };
  window.webpackPluginServe.silent = !!client.silent;

  const { ClientSocket } = __webpack_require__(/*! ./ClientSocket */ "./node_modules/webpack-plugin-serve/lib/client/ClientSocket.js");
  const { replace } = __webpack_require__(/*! ./hmr */ "./node_modules/webpack-plugin-serve/lib/client/hmr.js");
  const { error, info, warn } = __webpack_require__(/*! ./log */ "./node_modules/webpack-plugin-serve/lib/client/log.js")();

  const protocol = secure ? 'wss' : 'ws';
  const socket = new ClientSocket(client, `${protocol}://${client.address || address}/wps`);

  const { compilerName } = options;

  window.webpackPluginServe.compilers[compilerName] = {};

  // prevents ECONNRESET errors on the server
  window.addEventListener('beforeunload', () => socket.close());

  socket.addEventListener('message', (message) => {
    const { action, data = {} } = JSON.parse(message.data);
    const { errors, hash = '<?>', warnings } = data || {};
    const shortHash = hash.slice(0, 7);
    const identifier = options.compilerName ? `(Compiler: ${options.compilerName}) ` : '';
    const compiler = window.webpackPluginServe.compilers[compilerName];
    const { wpsId } = data;

    switch (action) {
      case 'build':
        compiler.done = false;
        break;
      case 'connected':
        info(`WebSocket connected ${identifier}`);
        break;
      case 'done':
        compiler.done = true;
        break;
      case 'problems':
        if (data.errors.length) {
          error(`${identifier}Build ${shortHash} produced errors:\n`, errors);
        }
        if (data.warnings.length) {
          warn(`${identifier}Build ${shortHash} produced warnings:\n`, warnings);
        }
        break;
      case 'reload':
        window.location.reload();
        break;
      case 'replace':
        // actions with a wpsId in tow indicate actions that should only be executed when the wpsId sent
        // matches the wpsId set in options. this is how we can identify multiple compilers in the
        // client.
        if (wpsId && wpsId === options.wpsId) {
          replace(buildHash, hash);
        }
        break;
      default:
    }
  });

  if (options.firstInstance) {
    if (progress === 'minimal') {
      const { init } = __webpack_require__(/*! ./overlays/progress-minimal */ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js");
      init(options, socket);
    } else if (progress) {
      const { init } = __webpack_require__(/*! ./overlays/progress */ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress.js");
      init(options, socket);
    }

    if (status) {
      const { init } = __webpack_require__(/*! ./overlays/status */ "./node_modules/webpack-plugin-serve/lib/client/overlays/status.js");
      init(options, socket);
    }

    if (true) {
      info('Hot Module Replacement is active');

      if (options.liveReload) {
        info('Live Reload taking precedence over Hot Module Replacement');
      }
    } else {}

    if (false) {}
  }
};

module.exports = { run };


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/hmr.js":
/*!************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/hmr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { error, info, refresh, warn } = __webpack_require__(/*! ./log */ "./node_modules/webpack-plugin-serve/lib/client/log.js")();

let latest = true;

const hmr = {
  onUnaccepted(data) {
    warn('Change in unaccepted module(s):\n', data);
    warn(data);
  },
  onDeclined(data) {
    warn('Change in declined module(s):\n', data);
  },
  onErrored(data) {
    error('Error in module(s):\n', data);
  }
};

const replace = async (buildHash, hash) => {
  const { apply, check, status } = module.hot;

  if (hash) {
    // eslint-disable-next-line no-undef
    latest = hash.includes(buildHash);
  }

  if (!latest) {
    const hmrStatus = status();

    if (hmrStatus === 'abort' || hmrStatus === 'fail') {
      warn(`An HMR update was triggered, but ${hmrStatus}ed. ${refresh}`);
      return;
    }

    let modules;

    try {
      modules = await check(false);
    } catch (e) {
      // noop. this typically happens when a MultiCompiler has more than one compiler that includes
      // this script, and an update happens with a hash that isn't part of the compiler/module this
      // instance was loaded for.
      return;
    }

    if (!modules) {
      warn(`No modules found for replacement. ${refresh}`);
      return;
    }

    modules = await apply(hmr);

    if (modules) {
      latest = true;
      info(`Build ${hash.slice(0, 7)} replaced:\n`, modules);
    }
  }
};

module.exports = { replace };


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/log.js":
/*!************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/log.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { error, info, warn } = console;
const log = {
  error: error.bind(console, '⬡ wps:'),
  info: info.bind(console, '⬡ wps:'),
  refresh: 'Please refresh the page',
  warn: warn.bind(console, '⬡ wps:')
};
const noop = () => {};
const silent = {
  error: noop,
  info: noop,
  warn: noop
};

module.exports = () => (window.webpackPluginServe.silent ? silent : log);


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js":
/*!**********************************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/progress-minimal.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { addCss, addHtml } = __webpack_require__(/*! ./util */ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js");

const ns = 'wps-progress-minimal';
const html = `
<div id="${ns}" class="${ns}-hidden">
  <div id="${ns}-bar"></div>
</div>
`;
const css = `
#${ns} {
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 100vw;
  z-index: 2147483645;
}

#${ns}-bar {
  width: 0%;
  height: 4px;
  background-color: rgb(186, 223, 172);
  transition: width 1s ease-in-out;
}

.${ns}-hidden{
  display: none;
}
`;

const update = (percent) => {
  const bar = document.querySelector(`#${ns}-bar`);
  bar.style.width = `${percent}%`;
};

const reset = (wrapper) => {
  wrapper.classList.add(`${ns}-hidden`);
  setTimeout(() => update(0), 1e3);
};

const init = (options, socket) => {
  if (options.firstInstance) {
    document.addEventListener('DOMContentLoaded', () => {
      addHtml(html);
      addCss(css);
    });
  }

  socket.addEventListener('message', (message) => {
    const { action, data } = JSON.parse(message.data);

    if (action !== 'progress') {
      return;
    }

    const percent = Math.floor(data.percent * 100);
    const wrapper = document.querySelector(`#${ns}`);

    wrapper.classList.remove(`${ns}-hidden`);

    if (data.percent === 1) {
      setTimeout(() => reset(wrapper), 5e3);
    }

    update(percent);
  });
};

module.exports = {
  init
};


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/progress.js":
/*!**************************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/progress.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { addCss, addHtml } = __webpack_require__(/*! ./util */ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js");

const ns = 'wps-progress';
const css = `
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');

#${ns}{
  width: 200px;
  height: 200px;
  position: absolute;
  right: 5%;
  top: 5%;
  transition: opacity .25s ease-in-out;
  z-index: 2147483645;
}

#${ns}-bg {
  fill: #282d35;
}

#${ns}-fill {
  fill: rgba(0, 0, 0, 0);
  stroke: rgb(186, 223, 172);
  stroke-dasharray: 219.99078369140625;
  stroke-dashoffset: -219.99078369140625;
  stroke-width: 10;
  transform: rotate(90deg)translate(0px, -80px);
  transition: stroke-dashoffset 1s;
}

#${ns}-percent {
  font-family: 'Open Sans';
  font-size: 18px;
  fill: #ffffff;
}

#${ns}-percent-value {
  dominant-baseline: middle;
  text-anchor: middle;
}

#${ns}-percent-super {
  fill: #bdc3c7;
  font-size: .45em;
  baseline-shift: 10%;
}

.${ns}-noselect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}

@keyframes ${ns}-hidden-display {
	0% {
		opacity: 1;
		transform: scale(1);
		-webkit-transform: scale(1);
	}
	99% {
		display: inline-flex;
		opacity: 0;
		transform: scale(0);
		-webkit-transform: scale(0);
	}
	100% {
		display: none;
		opacity: 0;
		transform: scale(0);
		-webkit-transform: scale(0);
	}
}

.${ns}-hidden{
  animation: ${ns}-hidden-display .3s;
  animation-fill-mode:forwards;
  display: inline-flex;
}
`;

const html = `
<svg id="${ns}" class="${ns}-noselect ${ns}-hidden" x="0px" y="0px" viewBox="0 0 80 80">
  <circle id="${ns}-bg" cx="50%" cy="50%" r="35"></circle>
  <path id="${ns}-fill" d="M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0" />
  <text id="${ns}-percent" x="50%" y="51%"><tspan id="${ns}-percent-value">0</tspan><tspan id="${ns}-percent-super">%</tspan></text>
</svg>
`;

const update = (percent) => {
  const max = -219.99078369140625;
  const value = document.querySelector(`#${ns}-percent-value`);
  const track = document.querySelector(`#${ns}-fill`);
  const offset = ((100 - percent) / 100) * max;

  track.setAttribute('style', `stroke-dashoffset: ${offset}`);
  value.innerHTML = percent.toString();
};

const reset = (svg) => {
  svg.classList.add(`${ns}-hidden`);
  setTimeout(() => update(0), 1e3);
};

const init = (options, socket) => {
  if (options.firstInstance) {
    document.addEventListener('DOMContentLoaded', () => {
      addCss(css);
      addHtml(html);
    });
  }

  socket.addEventListener('message', (message) => {
    const { action, data } = JSON.parse(message.data);

    if (action !== 'progress') {
      return;
    }

    const percent = Math.floor(data.percent * 100);
    const svg = document.querySelector(`#${ns}`);

    if (!svg) {
      return;
    }

    // we can safely call this even if it doesn't have the class
    svg.classList.remove(`${ns}-hidden`);

    if (data.percent === 1) {
      setTimeout(() => reset(svg), 5e3);
    }

    update(percent);
  });
};

module.exports = { init };


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/status.js":
/*!************************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/status.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const { addCss, addHtml, socketMessage } = __webpack_require__(/*! ./util */ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js");

const ns = 'wps-status';
const css = `
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');

#${ns} {
  background: #282d35;
  border-radius: 0.6em;
  display: flex;
  flex-direction: column;
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
	font-size: 10px;
  height: 90%;
  min-height: 20em;
  left: 50%;
  opacity: 1;
  overflow: hidden;
  padding-bottom: 3em;
  position: absolute;
  top: 2rem;
  transform: translateX(-50%);
  transition: opacity .25s ease-in-out;
  width: 95%;
  z-index: 2147483645;
}

@keyframes ${ns}-hidden-display {
	0% {
		opacity: 1;
	}
	99% {
		display: inline-flex;
		opacity: 0;
	}
	100% {
		display: none;
		opacity: 0;
	}
}

#${ns}.${ns}-hidden {
  animation: ${ns}-hidden-display .3s;
  animation-fill-mode:forwards;
  display: none;
}

#${ns}.${ns}-min {
  animation: minimize 10s;
  bottom: 2em;
  cursor: pointer;
  height: 6em;
  left: auto;
  min-height: 6em;
  padding-bottom: 0;
  position: absolute;
  right: 2em;
  top: auto;
  transform: none;
  width: 6em;
}

#${ns}.${ns}-min #${ns}-beacon {
  display: block;
}

#${ns}-title {
  color: #fff;
  font-size: 1.2em;
  font-weight: normal;
  margin: 0;
  padding: 0.6em 0;
  text-align: center;
  width: 100%;
}

#${ns}.${ns}-min #${ns}-title {
  display: none;
}

#${ns}-title-errors {
  color: #ff5f58;
  font-style: normal;
  padding-left: 1em;
}

#${ns}-title-warnings {
  color: #ffbd2e;
  font-style: normal;
  padding-left: 1em;
}

#${ns}-problems {
  overflow-y: auto;
  padding: 1em 2em;
}

#${ns}-problems pre {
  color: #ddd;
  background: #282d35;
  display: block;
  font-size: 1.3em;
	font-family: 'Open Sans', Helvetica, Arial, sans-serif;
  white-space: pre-wrap;
}

#${ns}-problems pre em {
  background: #ff5f58;
  border-radius: 0.3em;
  color: #641e16;
  font-style: normal;
  line-height: 3em;
  margin-right: 0.4em;
  padding: 0.1em 0.4em;
  text-transform: uppercase;
}

pre#${ns}-warnings em {
  background: #ffbd2e;
  color: #3e2723;
}

pre#${ns}-success {
  display: none;
  text-align: center;
}

pre#${ns}-success em {
  background: #7fb900;
  color: #004d40;
}

#${ns}-problems.${ns}-success #${ns}-success {
  display: block;
}

#${ns}.${ns}-min #${ns}-problems {
  display: none;
}

#${ns}-nav {
  opacity: 0.5;
  padding: 1.2em;
  position: absolute;
}

#${ns}.${ns}-min #${ns}-nav {
  display: none;
}

#${ns}-nav:hover {
  opacity: 1;
}

#${ns}-nav div {
  background: #ff5f58;
  border-radius: 1.2em;
  cursor: pointer;
  display: inline-block;
  height: 1.2em;
  position: relative;
  width: 1.2em;
}

div#${ns}-min {
  background: #ffbd2e;
  margin-left: 0.8em;
}

#${ns}-beacon {
  border-radius: 3em;
  display: none;
  font-size: 10px;
  height: 3em;
  margin: 1.6em auto;
  position: relative;
  width: 3em;
}

#${ns}-beacon:before, #${ns}-beacon:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(127,185,0, 0.2);
  border-radius: 3em;
  opacity: 0;
}

#${ns}-beacon:before {
  animation: ${ns}-pulse 3s infinite linear;
  transform: scale(1);
}

#${ns}-beacon:after {
  animation: ${ns}-pulse 3s 2s infinite linear;
}


@keyframes ${ns}-pulse {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  33% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.4);
  }
}

#${ns}-beacon mark {
  background: rgba(127, 185, 0, 1);
  border-radius: 100% 100%;
  height: 1em;
  left: 1em;
  position: absolute;
  top: 1em;
  width: 1em;
}

#${ns}-beacon.${ns}-error mark {
  background: #ff5f58;
}

#${ns}-beacon.${ns}-error:before, #${ns}-beacon.error:after {
  background: rgba(255, 95, 88, 0.2);
}

#${ns}-beacon.${ns}-warning mark {
  background: #ffbd2e;
}

#${ns}-beacon.${ns}-warning:before, #${ns}-beacon.warning:after {
  background: rgba(255, 189, 46, 0.2);
}
`;

const html = `
<aside id="${ns}" class="${ns}-hidden" title="build status">
  <figure id="${ns}-beacon">
    <mark/>
  </figure>
  <nav id="${ns}-nav">
    <div id="${ns}-close" title="close"></div>
    <div id="${ns}-min" title="minmize"></div>
  </nav>
  <h1 id="${ns}-title">
    build status
    <em id="${ns}-title-errors"></em>
    <em id="${ns}-title-warnings"></em>
  </h1>
  <article id="${ns}-problems">
    <pre id="${ns}-success"><em>Build Successful</em></pre>
    <pre id="${ns}-errors"></pre>
    <pre id="${ns}-warnings"></pre>
  </article>
</aside>
`;

const init = (options, socket) => {
  const hidden = `${ns}-hidden`;
  let hasProblems = false;
  let aside;
  let beacon;
  let problems;
  let preErrors;
  let preWarnings;
  let titleErrors;
  let titleWarnings;

  const reset = () => {
    preErrors.innerHTML = '';
    preWarnings.innerHTML = '';
    problems.classList.remove(`${ns}-success`);
    beacon.className = '';
    titleErrors.innerText = '';
    titleWarnings.innerText = '';
  };

  const addErrors = (errors) => {
    if (errors.length) {
      problems.classList.remove(`${ns}-success`);
      beacon.classList.add(`${ns}-error`);

      for (const error of errors) {
        const markup = `<div><em>Error</em> in ${error}</div>`;
        addHtml(markup, preErrors);
      }

      titleErrors.innerText = `${errors.length} Error(s)`;
    } else {
      titleErrors.innerText = '';
    }
    aside.classList.remove(hidden);
  };

  const addWarnings = (warnings) => {
    if (warnings.length) {
      problems.classList.remove(`${ns}-success`);

      if (!beacon.classList.contains(`${ns}-error`)) {
        beacon.classList.add(`${ns}-warning`);
      }

      for (const warning of warnings) {
        const markup = `<div><em>Warning</em> in ${warning}</div>`;
        addHtml(markup, preWarnings);
      }

      titleWarnings.innerText = `${warnings.length} Warning(s)`;
    } else {
      titleWarnings.innerText = '';
    }

    aside.classList.remove(hidden);
  };

  if (options.firstInstance) {
    document.addEventListener('DOMContentLoaded', () => {
      addCss(css);
      [aside] = addHtml(html);
      beacon = document.querySelector(`#${ns}-beacon`);
      problems = document.querySelector(`#${ns}-problems`);
      preErrors = document.querySelector(`#${ns}-errors`);
      preWarnings = document.querySelector(`#${ns}-warnings`);
      titleErrors = document.querySelector(`#${ns}-title-errors`);
      titleWarnings = document.querySelector(`#${ns}-title-warnings`);

      const close = document.querySelector(`#${ns}-close`);
      const min = document.querySelector(`#${ns}-min`);

      aside.addEventListener('click', () => {
        aside.classList.remove(`${ns}-min`);
      });

      close.addEventListener('click', () => {
        aside.classList.add(`${ns}-hidden`);
      });

      min.addEventListener('click', (e) => {
        aside.classList.add(`${ns}-min`);
        e.stopImmediatePropagation();
      });
    });
  }

  socketMessage(socket, (action, data) => {
    if (!aside) {
      return;
    }

    const { compilers } = window.webpackPluginServe;

    switch (action) {
      case 'build':
        // clear errors and warnings when a new build begins
        reset();
        break;
      case 'problems':
        addErrors(data.errors);
        addWarnings(data.warnings);
        aside.classList.remove(hidden);
        hasProblems = data.errors.length || data.warnings.length;
        break;
      case 'replace':
        // if there's a compiler that isn't done yet, hold off and let it run the show
        for (const compilerName of Object.keys(compilers)) {
          if (!compilers[compilerName]) {
            return;
          }
        }

        if (hasProblems && !preErrors.children.length && !preWarnings.children.length) {
          reset();
          hasProblems = false;
          problems.classList.add(`${ns}-success`);
          aside.classList.remove(hidden);

          setTimeout(() => aside.classList.add(hidden), 3e3);
        }
        break;
      default:
    }
  });
};

module.exports = { init };


/***/ }),

/***/ "./node_modules/webpack-plugin-serve/lib/client/overlays/util.js":
/*!**********************************************************!*\
  !*** (webpack)-plugin-serve/lib/client/overlays/util.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
  Copyright © 2018 Andrew Powell

  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of this Source Code Form.
*/
const addHtml = (html, parent) => {
  const div = document.createElement('div');
  const nodes = [];

  div.innerHTML = html.trim();

  while (div.firstChild) {
    nodes.push((parent || document.body).appendChild(div.firstChild));
  }

  return nodes;
};

const addCss = (css) => {
  const style = document.createElement('style');

  style.type = 'text/css';

  if (css.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  // append the stylesheet for the svg
  document.head.appendChild(style);
};

const socketMessage = (socket, handler) => {
  socket.addEventListener('message', (message) => {
    const { action, data = {} } = JSON.parse(message.data);
    handler(action, data);
  });
};

module.exports = { addCss, addHtml, socketMessage };


/***/ }),

/***/ "./src/demo/index.js":
/*!***************************!*\
  !*** ./src/demo/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module parse failed: Unexpected token (6:16)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n| import App from './App';\n| \n> ReactDOM.render(<App />, document.getElementById('root'));\n| ");

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./src/demo/index.js webpack-plugin-serve/client ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/demo/index.js */"./src/demo/index.js");
module.exports = __webpack_require__(/*! webpack-plugin-serve/client */"./node_modules/webpack-plugin-serve/client.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS1wbHVnaW4tc2VydmUvY2xpZW50LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvQ2xpZW50U29ja2V0LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvY2xpZW50LmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvaG1yLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvbG9nLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvcHJvZ3Jlc3MtbWluaW1hbC5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50L292ZXJsYXlzL3Byb2dyZXNzLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvc3RhdHVzLmpzIiwid2VicGFjazovLy8od2VicGFjayktcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEdBQUc7O1FBRUg7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSxNQUFNO1FBQ047UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0EsTUFBTTtRQUNOO1FBQ0E7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QTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE9BQU87UUFDUDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0EsbUJBQW1CLGNBQWM7UUFDakM7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLGdCQUFnQixLQUFLO1FBQ3JCO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsZ0JBQWdCLFlBQVk7UUFDNUI7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQSxjQUFjLDRCQUE0QjtRQUMxQztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLE1BQU07UUFDTjtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLElBQUk7O1FBRUo7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7UUFDQSxlQUFlLDRCQUE0QjtRQUMzQztRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztR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QUFlLEdBQUc7QUFDbEI7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRyxHQUFHLEdBQUc7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRztBQUN2QjtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLEdBQUc7QUFDdkI7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQU0sR0FBRztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLEdBQUc7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxHQUFHO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRyxZQUFZLEdBQUcsWUFBWSxHQUFHO0FBQ3BDO0FBQ0E7O0FBRUEsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLEdBQUc7QUFDdkI7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRztBQUN2QjtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLEdBQUc7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7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O0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsa0JBQWtCLEVBQUU7QUFDL0I7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCIiwiZmlsZSI6Ii4vb3V0cHV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0ZnVuY3Rpb24gaG90RGlzcG9zZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcbiBcdH1cbiBcdHZhciBwYXJlbnRIb3RVcGRhdGVDYWxsYmFjayA9IHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl07XG4gXHR3aW5kb3dbXCJ3ZWJwYWNrSG90VXBkYXRlXCJdID0gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpIHtcbiBcdFx0aG90QWRkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0XHRpZiAocGFyZW50SG90VXBkYXRlQ2FsbGJhY2spIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrKGNodW5rSWQsIG1vcmVNb2R1bGVzKTtcbiBcdH0gO1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIjVjM2U0OTgtXCIgKyBjaHVua0lkICsgXCItd3BzLWhtci5qc1wiO1xuIFx0XHRpZiAobnVsbCkgc2NyaXB0LmNyb3NzT3JpZ2luID0gbnVsbDtcbiBcdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIjVjM2U0OTgtd3BzLWhtci5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI0ZGFlNjlhNzk1NzZkOWY2YTI2MVwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdHZhciBjaHVua0lkID0gXCJtYWluXCI7XG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZCAmJlxuIFx0XHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuIFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5cbi8qKlxuICogQG5vdGUgVGhpcyBmaWxlIGV4aXN0cyBtZXJlbHkgYXMgYW4gZWFzeSByZWZlcmVuY2UgZm9yIGZvbGtzIGFkZGluZyBpdCB0byB0aGVpciBjb25maWd1cmF0aW9uIGVudHJpZXNcbiAqL1xuXG4oKCkgPT4ge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBnbG9iYWwtcmVxdWlyZSAqL1xuICBjb25zdCB7IHJ1biB9ID0gcmVxdWlyZSgnLi9saWIvY2xpZW50L2NsaWVudCcpO1xuICBsZXQgaGFzaCA9ICc8dW5rbm93bj4nO1xuICBsZXQgb3B0aW9ucztcbiAgdHJ5IHtcbiAgICBvcHRpb25zID0gyo7JkMm5yZRvc8edyozJucedcztcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnN0IHsgbG9nIH0gPSByZXF1aXJlKCcuL2xpYi9jbGllbnQvbG9nJyk7XG4gICAgbG9nLmVycm9yKFxuICAgICAgJ1RoZSBlbnRyeSBmb3Igd2VicGFjay1wbHVnaW4tc2VydmUgd2FzIGluY2x1ZGVkIGluIHlvdXIgYnVpbGQsIGJ1dCBpdCBkb2VzIG5vdCBhcHBlYXIgdGhhdCB0aGUgcGx1Z2luIHdhcy4gUGxlYXNlIGNoZWNrIHlvdXIgY29uZmlndXJhdGlvbi4nXG4gICAgKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgIGhhc2ggPSBfX3dlYnBhY2tfaGFzaF9fO1xuICB9IGNhdGNoIChlKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWVtcHR5XG5cbiAgcnVuKGhhc2gsIG9wdGlvbnMpO1xufSkoKTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGVycm9yLCByZWZyZXNoLCB3YXJuIH0gPSByZXF1aXJlKCcuL2xvZycpKCk7XG5cbi8vIGlnbm9yZSAxMDA4IChIVFRQIDQwMCBlcXVpdmFsZW50KSBhbmQgMTAxMSAoSFRUUCA1MDAgZXF1aXZhbGVudClcbmNvbnN0IGlnbm9yZUNvZGVzID0gWzEwMDgsIDEwMTFdO1xuY29uc3QgbWF4QXR0ZW1wdHMgPSAxMDtcblxuY2xhc3MgQ2xpZW50U29ja2V0IHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucywgLi4uYXJncykge1xuICAgIHRoaXMuYXJncyA9IGFyZ3M7XG4gICAgdGhpcy5hdHRlbXB0cyA9IDA7XG4gICAgdGhpcy5ldmVudEhhbmRsZXJzID0gW107XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB0aGlzLnJldHJ5aW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLmNvbm5lY3QoKTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXIoLi4uYXJncykge1xuICAgIHRoaXMuZXZlbnRIYW5kbGVycy5wdXNoKGFyZ3MpO1xuICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoLi4uYXJncyk7XG4gIH1cblxuICBjbG9zZSgpIHtcbiAgICB0aGlzLnNvY2tldC5jbG9zZSgpO1xuICB9XG5cbiAgY29ubmVjdCgpIHtcbiAgICBpZiAodGhpcy5zb2NrZXQpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLnNvY2tldDtcbiAgICB9XG5cbiAgICB0aGlzLmNvbm5lY3RpbmcgPSB0cnVlO1xuXG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgV2ViU29ja2V0KC4uLnRoaXMuYXJncyk7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJldHJ5KSB7XG4gICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoaWdub3JlQ29kZXMuaW5jbHVkZXMoZXZlbnQuY29kZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMucmV0cnlpbmcpIHtcbiAgICAgICAgICB3YXJuKGBUaGUgV2ViU29ja2V0IHdhcyBjbG9zZWQgYW5kIHdpbGwgYXR0ZW1wdCB0byByZWNvbm5lY3RgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zb2NrZXQub25jbG9zZSA9ICgpID0+IHdhcm4oYFRoZSBjbGllbnQgV2ViU29ja2V0IHdhcyBjbG9zZWQuICR7cmVmcmVzaH1gKTtcbiAgICB9XG5cbiAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdvcGVuJywgKCkgPT4ge1xuICAgICAgdGhpcy5hdHRlbXB0cyA9IDA7XG4gICAgICB0aGlzLnJldHJ5aW5nID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5ldmVudEhhbmRsZXJzLmxlbmd0aCkge1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgZm5dIG9mIHRoaXMuZXZlbnRIYW5kbGVycykge1xuICAgICAgICB0aGlzLnNvY2tldC5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZuKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZWNvbm5lY3QoKSB7XG4gICAgdGhpcy5hdHRlbXB0cyArPSAxO1xuICAgIHRoaXMucmV0cnlpbmcgPSB0cnVlO1xuXG4gICAgaWYgKHRoaXMuYXR0ZW1wdHMgPiBtYXhBdHRlbXB0cykge1xuICAgICAgZXJyb3IoYFRoZSBXZWJTb2NrZXQgY291bGQgbm90IGJlIHJlY29ubmVjdGVkLiAke3JlZnJlc2h9YCk7XG4gICAgICB0aGlzLnJldHJ5aW5nID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGltZW91dCA9IDEwMDAgKiB0aGlzLmF0dGVtcHRzICoqIDI7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuY29ubmVjdCh0aGlzLmFyZ3MpLCB0aW1lb3V0KTtcbiAgfVxuXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIoLi4uYXJncykge1xuICAgIGNvbnN0IFssIGhhbmRsZXJdID0gYXJncztcbiAgICB0aGlzLmV2ZW50SGFuZGxlcnMgPSB0aGlzLmV2ZW50SGFuZGxlcnMuZmlsdGVyKChbLCBmbl0pID0+IGZuID09PSBoYW5kbGVyKTtcbiAgICB0aGlzLnNvY2tldC5yZW1vdmVFdmVudExpc3RlbmVyKC4uLmFyZ3MpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBDbGllbnRTb2NrZXQgfTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG4vKiBlc2xpbnQtZGlzYWJsZSBnbG9iYWwtcmVxdWlyZSAqL1xuY29uc3QgcnVuID0gKGJ1aWxkSGFzaCwgb3B0aW9ucykgPT4ge1xuICBjb25zdCB7IGFkZHJlc3MsIGNsaWVudCA9IHt9LCBwcm9ncmVzcywgc2VjdXJlLCBzdGF0dXMgfSA9IG9wdGlvbnM7XG5cbiAgb3B0aW9ucy5maXJzdEluc3RhbmNlID0gIXdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblxuICB3aW5kb3cud2VicGFja1BsdWdpblNlcnZlID0gd2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZSB8fCB7XG4gICAgY29tcGlsZXJzOiB7fVxuICB9O1xuICB3aW5kb3cud2VicGFja1BsdWdpblNlcnZlLnNpbGVudCA9ICEhY2xpZW50LnNpbGVudDtcblxuICBjb25zdCB7IENsaWVudFNvY2tldCB9ID0gcmVxdWlyZSgnLi9DbGllbnRTb2NrZXQnKTtcbiAgY29uc3QgeyByZXBsYWNlIH0gPSByZXF1aXJlKCcuL2htcicpO1xuICBjb25zdCB7IGVycm9yLCBpbmZvLCB3YXJuIH0gPSByZXF1aXJlKCcuL2xvZycpKCk7XG5cbiAgY29uc3QgcHJvdG9jb2wgPSBzZWN1cmUgPyAnd3NzJyA6ICd3cyc7XG4gIGNvbnN0IHNvY2tldCA9IG5ldyBDbGllbnRTb2NrZXQoY2xpZW50LCBgJHtwcm90b2NvbH06Ly8ke2NsaWVudC5hZGRyZXNzIHx8IGFkZHJlc3N9L3dwc2ApO1xuXG4gIGNvbnN0IHsgY29tcGlsZXJOYW1lIH0gPSBvcHRpb25zO1xuXG4gIHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmUuY29tcGlsZXJzW2NvbXBpbGVyTmFtZV0gPSB7fTtcblxuICAvLyBwcmV2ZW50cyBFQ09OTlJFU0VUIGVycm9ycyBvbiB0aGUgc2VydmVyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiBzb2NrZXQuY2xvc2UoKSk7XG5cbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aW9uLCBkYXRhID0ge30gfSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgICBjb25zdCB7IGVycm9ycywgaGFzaCA9ICc8Pz4nLCB3YXJuaW5ncyB9ID0gZGF0YSB8fCB7fTtcbiAgICBjb25zdCBzaG9ydEhhc2ggPSBoYXNoLnNsaWNlKDAsIDcpO1xuICAgIGNvbnN0IGlkZW50aWZpZXIgPSBvcHRpb25zLmNvbXBpbGVyTmFtZSA/IGAoQ29tcGlsZXI6ICR7b3B0aW9ucy5jb21waWxlck5hbWV9KSBgIDogJyc7XG4gICAgY29uc3QgY29tcGlsZXIgPSB3aW5kb3cud2VicGFja1BsdWdpblNlcnZlLmNvbXBpbGVyc1tjb21waWxlck5hbWVdO1xuICAgIGNvbnN0IHsgd3BzSWQgfSA9IGRhdGE7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSAnYnVpbGQnOlxuICAgICAgICBjb21waWxlci5kb25lID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY29ubmVjdGVkJzpcbiAgICAgICAgaW5mbyhgV2ViU29ja2V0IGNvbm5lY3RlZCAke2lkZW50aWZpZXJ9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZG9uZSc6XG4gICAgICAgIGNvbXBpbGVyLmRvbmUgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Byb2JsZW1zJzpcbiAgICAgICAgaWYgKGRhdGEuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgIGVycm9yKGAke2lkZW50aWZpZXJ9QnVpbGQgJHtzaG9ydEhhc2h9IHByb2R1Y2VkIGVycm9yczpcXG5gLCBlcnJvcnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhLndhcm5pbmdzLmxlbmd0aCkge1xuICAgICAgICAgIHdhcm4oYCR7aWRlbnRpZmllcn1CdWlsZCAke3Nob3J0SGFzaH0gcHJvZHVjZWQgd2FybmluZ3M6XFxuYCwgd2FybmluZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVsb2FkJzpcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3JlcGxhY2UnOlxuICAgICAgICAvLyBhY3Rpb25zIHdpdGggYSB3cHNJZCBpbiB0b3cgaW5kaWNhdGUgYWN0aW9ucyB0aGF0IHNob3VsZCBvbmx5IGJlIGV4ZWN1dGVkIHdoZW4gdGhlIHdwc0lkIHNlbnRcbiAgICAgICAgLy8gbWF0Y2hlcyB0aGUgd3BzSWQgc2V0IGluIG9wdGlvbnMuIHRoaXMgaXMgaG93IHdlIGNhbiBpZGVudGlmeSBtdWx0aXBsZSBjb21waWxlcnMgaW4gdGhlXG4gICAgICAgIC8vIGNsaWVudC5cbiAgICAgICAgaWYgKHdwc0lkICYmIHdwc0lkID09PSBvcHRpb25zLndwc0lkKSB7XG4gICAgICAgICAgcmVwbGFjZShidWlsZEhhc2gsIGhhc2gpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChvcHRpb25zLmZpcnN0SW5zdGFuY2UpIHtcbiAgICBpZiAocHJvZ3Jlc3MgPT09ICdtaW5pbWFsJykge1xuICAgICAgY29uc3QgeyBpbml0IH0gPSByZXF1aXJlKCcuL292ZXJsYXlzL3Byb2dyZXNzLW1pbmltYWwnKTtcbiAgICAgIGluaXQob3B0aW9ucywgc29ja2V0KTtcbiAgICB9IGVsc2UgaWYgKHByb2dyZXNzKSB7XG4gICAgICBjb25zdCB7IGluaXQgfSA9IHJlcXVpcmUoJy4vb3ZlcmxheXMvcHJvZ3Jlc3MnKTtcbiAgICAgIGluaXQob3B0aW9ucywgc29ja2V0KTtcbiAgICB9XG5cbiAgICBpZiAoc3RhdHVzKSB7XG4gICAgICBjb25zdCB7IGluaXQgfSA9IHJlcXVpcmUoJy4vb3ZlcmxheXMvc3RhdHVzJyk7XG4gICAgICBpbml0KG9wdGlvbnMsIHNvY2tldCk7XG4gICAgfVxuXG4gICAgaWYgKG1vZHVsZS5ob3QpIHtcbiAgICAgIGluZm8oJ0hvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgYWN0aXZlJyk7XG5cbiAgICAgIGlmIChvcHRpb25zLmxpdmVSZWxvYWQpIHtcbiAgICAgICAgaW5mbygnTGl2ZSBSZWxvYWQgdGFraW5nIHByZWNlZGVuY2Ugb3ZlciBIb3QgTW9kdWxlIFJlcGxhY2VtZW50Jyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHdhcm4oJ0hvdCBNb2R1bGUgUmVwbGFjZW1lbnQgaXMgaW5hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBpZiAoIW1vZHVsZS5ob3QgJiYgb3B0aW9ucy5saXZlUmVsb2FkKSB7XG4gICAgICBpbmZvKCdMaXZlIFJlbG9hZCBpcyBhY3RpdmUnKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyBydW4gfTtcbiIsIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGVycm9yLCBpbmZvLCByZWZyZXNoLCB3YXJuIH0gPSByZXF1aXJlKCcuL2xvZycpKCk7XG5cbmxldCBsYXRlc3QgPSB0cnVlO1xuXG5jb25zdCBobXIgPSB7XG4gIG9uVW5hY2NlcHRlZChkYXRhKSB7XG4gICAgd2FybignQ2hhbmdlIGluIHVuYWNjZXB0ZWQgbW9kdWxlKHMpOlxcbicsIGRhdGEpO1xuICAgIHdhcm4oZGF0YSk7XG4gIH0sXG4gIG9uRGVjbGluZWQoZGF0YSkge1xuICAgIHdhcm4oJ0NoYW5nZSBpbiBkZWNsaW5lZCBtb2R1bGUocyk6XFxuJywgZGF0YSk7XG4gIH0sXG4gIG9uRXJyb3JlZChkYXRhKSB7XG4gICAgZXJyb3IoJ0Vycm9yIGluIG1vZHVsZShzKTpcXG4nLCBkYXRhKTtcbiAgfVxufTtcblxuY29uc3QgcmVwbGFjZSA9IGFzeW5jIChidWlsZEhhc2gsIGhhc2gpID0+IHtcbiAgY29uc3QgeyBhcHBseSwgY2hlY2ssIHN0YXR1cyB9ID0gbW9kdWxlLmhvdDtcblxuICBpZiAoaGFzaCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIGxhdGVzdCA9IGhhc2guaW5jbHVkZXMoYnVpbGRIYXNoKTtcbiAgfVxuXG4gIGlmICghbGF0ZXN0KSB7XG4gICAgY29uc3QgaG1yU3RhdHVzID0gc3RhdHVzKCk7XG5cbiAgICBpZiAoaG1yU3RhdHVzID09PSAnYWJvcnQnIHx8IGhtclN0YXR1cyA9PT0gJ2ZhaWwnKSB7XG4gICAgICB3YXJuKGBBbiBITVIgdXBkYXRlIHdhcyB0cmlnZ2VyZWQsIGJ1dCAke2htclN0YXR1c31lZC4gJHtyZWZyZXNofWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBtb2R1bGVzO1xuXG4gICAgdHJ5IHtcbiAgICAgIG1vZHVsZXMgPSBhd2FpdCBjaGVjayhmYWxzZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gbm9vcC4gdGhpcyB0eXBpY2FsbHkgaGFwcGVucyB3aGVuIGEgTXVsdGlDb21waWxlciBoYXMgbW9yZSB0aGFuIG9uZSBjb21waWxlciB0aGF0IGluY2x1ZGVzXG4gICAgICAvLyB0aGlzIHNjcmlwdCwgYW5kIGFuIHVwZGF0ZSBoYXBwZW5zIHdpdGggYSBoYXNoIHRoYXQgaXNuJ3QgcGFydCBvZiB0aGUgY29tcGlsZXIvbW9kdWxlIHRoaXNcbiAgICAgIC8vIGluc3RhbmNlIHdhcyBsb2FkZWQgZm9yLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghbW9kdWxlcykge1xuICAgICAgd2FybihgTm8gbW9kdWxlcyBmb3VuZCBmb3IgcmVwbGFjZW1lbnQuICR7cmVmcmVzaH1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBtb2R1bGVzID0gYXdhaXQgYXBwbHkoaG1yKTtcblxuICAgIGlmIChtb2R1bGVzKSB7XG4gICAgICBsYXRlc3QgPSB0cnVlO1xuICAgICAgaW5mbyhgQnVpbGQgJHtoYXNoLnNsaWNlKDAsIDcpfSByZXBsYWNlZDpcXG5gLCBtb2R1bGVzKTtcbiAgICB9XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyByZXBsYWNlIH07XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBlcnJvciwgaW5mbywgd2FybiB9ID0gY29uc29sZTtcbmNvbnN0IGxvZyA9IHtcbiAgZXJyb3I6IGVycm9yLmJpbmQoY29uc29sZSwgJ+KsoSB3cHM6JyksXG4gIGluZm86IGluZm8uYmluZChjb25zb2xlLCAn4qyhIHdwczonKSxcbiAgcmVmcmVzaDogJ1BsZWFzZSByZWZyZXNoIHRoZSBwYWdlJyxcbiAgd2Fybjogd2Fybi5iaW5kKGNvbnNvbGUsICfirKEgd3BzOicpXG59O1xuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuY29uc3Qgc2lsZW50ID0ge1xuICBlcnJvcjogbm9vcCxcbiAgaW5mbzogbm9vcCxcbiAgd2Fybjogbm9vcFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiAod2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZS5zaWxlbnQgPyBzaWxlbnQgOiBsb2cpO1xuIiwiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbCwgTWF0aGV1cyBHb27Dp2FsdmVzIGRhIFNpbHZhXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBhZGRDc3MsIGFkZEh0bWwgfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jb25zdCBucyA9ICd3cHMtcHJvZ3Jlc3MtbWluaW1hbCc7XG5jb25zdCBodG1sID0gYFxuPGRpdiBpZD1cIiR7bnN9XCIgY2xhc3M9XCIke25zfS1oaWRkZW5cIj5cbiAgPGRpdiBpZD1cIiR7bnN9LWJhclwiPjwvZGl2PlxuPC9kaXY+XG5gO1xuY29uc3QgY3NzID0gYFxuIyR7bnN9IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGhlaWdodDogNHB4O1xuICB3aWR0aDogMTAwdnc7XG4gIHotaW5kZXg6IDIxNDc0ODM2NDU7XG59XG5cbiMke25zfS1iYXIge1xuICB3aWR0aDogMCU7XG4gIGhlaWdodDogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTg2LCAyMjMsIDE3Mik7XG4gIHRyYW5zaXRpb246IHdpZHRoIDFzIGVhc2UtaW4tb3V0O1xufVxuXG4uJHtuc30taGlkZGVue1xuICBkaXNwbGF5OiBub25lO1xufVxuYDtcblxuY29uc3QgdXBkYXRlID0gKHBlcmNlbnQpID0+IHtcbiAgY29uc3QgYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWJhcmApO1xuICBiYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50fSVgO1xufTtcblxuY29uc3QgcmVzZXQgPSAod3JhcHBlcikgPT4ge1xuICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoYCR7bnN9LWhpZGRlbmApO1xuICBzZXRUaW1lb3V0KCgpID0+IHVwZGF0ZSgwKSwgMWUzKTtcbn07XG5cbmNvbnN0IGluaXQgPSAob3B0aW9ucywgc29ja2V0KSA9PiB7XG4gIGlmIChvcHRpb25zLmZpcnN0SW5zdGFuY2UpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgYWRkSHRtbChodG1sKTtcbiAgICAgIGFkZENzcyhjc3MpO1xuICAgIH0pO1xuICB9XG5cbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aW9uLCBkYXRhIH0gPSBKU09OLnBhcnNlKG1lc3NhZ2UuZGF0YSk7XG5cbiAgICBpZiAoYWN0aW9uICE9PSAncHJvZ3Jlc3MnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGVyY2VudCA9IE1hdGguZmxvb3IoZGF0YS5wZXJjZW50ICogMTAwKTtcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9YCk7XG5cbiAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LWhpZGRlbmApO1xuXG4gICAgaWYgKGRhdGEucGVyY2VudCA9PT0gMSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiByZXNldCh3cmFwcGVyKSwgNWUzKTtcbiAgICB9XG5cbiAgICB1cGRhdGUocGVyY2VudCk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXRcbn07XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsLCBNYXRoZXVzIEdvbsOnYWx2ZXMgZGEgU2lsdmFcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGFkZENzcywgYWRkSHRtbCB9ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmNvbnN0IG5zID0gJ3dwcy1wcm9ncmVzcyc7XG5jb25zdCBjc3MgPSBgXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2Fuczo0MDAsNzAwJyk7XG5cbiMke25zfXtcbiAgd2lkdGg6IDIwMHB4O1xuICBoZWlnaHQ6IDIwMHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiA1JTtcbiAgdG9wOiA1JTtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAuMjVzIGVhc2UtaW4tb3V0O1xuICB6LWluZGV4OiAyMTQ3NDgzNjQ1O1xufVxuXG4jJHtuc30tYmcge1xuICBmaWxsOiAjMjgyZDM1O1xufVxuXG4jJHtuc30tZmlsbCB7XG4gIGZpbGw6IHJnYmEoMCwgMCwgMCwgMCk7XG4gIHN0cm9rZTogcmdiKDE4NiwgMjIzLCAxNzIpO1xuICBzdHJva2UtZGFzaGFycmF5OiAyMTkuOTkwNzgzNjkxNDA2MjU7XG4gIHN0cm9rZS1kYXNob2Zmc2V0OiAtMjE5Ljk5MDc4MzY5MTQwNjI1O1xuICBzdHJva2Utd2lkdGg6IDEwO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyl0cmFuc2xhdGUoMHB4LCAtODBweCk7XG4gIHRyYW5zaXRpb246IHN0cm9rZS1kYXNob2Zmc2V0IDFzO1xufVxuXG4jJHtuc30tcGVyY2VudCB7XG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJztcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmaWxsOiAjZmZmZmZmO1xufVxuXG4jJHtuc30tcGVyY2VudC12YWx1ZSB7XG4gIGRvbWluYW50LWJhc2VsaW5lOiBtaWRkbGU7XG4gIHRleHQtYW5jaG9yOiBtaWRkbGU7XG59XG5cbiMke25zfS1wZXJjZW50LXN1cGVyIHtcbiAgZmlsbDogI2JkYzNjNztcbiAgZm9udC1zaXplOiAuNDVlbTtcbiAgYmFzZWxpbmUtc2hpZnQ6IDEwJTtcbn1cblxuLiR7bnN9LW5vc2VsZWN0IHtcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuQGtleWZyYW1lcyAke25zfS1oaWRkZW4tZGlzcGxheSB7XG5cdDAlIHtcblx0XHRvcGFjaXR5OiAxO1xuXHRcdHRyYW5zZm9ybTogc2NhbGUoMSk7XG5cdFx0LXdlYmtpdC10cmFuc2Zvcm06IHNjYWxlKDEpO1xuXHR9XG5cdDk5JSB7XG5cdFx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdFx0b3BhY2l0eTogMDtcblx0XHR0cmFuc2Zvcm06IHNjYWxlKDApO1xuXHRcdC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcblx0fVxuXHQxMDAlIHtcblx0XHRkaXNwbGF5OiBub25lO1xuXHRcdG9wYWNpdHk6IDA7XG5cdFx0dHJhbnNmb3JtOiBzY2FsZSgwKTtcblx0XHQtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMCk7XG5cdH1cbn1cblxuLiR7bnN9LWhpZGRlbntcbiAgYW5pbWF0aW9uOiAke25zfS1oaWRkZW4tZGlzcGxheSAuM3M7XG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6Zm9yd2FyZHM7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xufVxuYDtcblxuY29uc3QgaHRtbCA9IGBcbjxzdmcgaWQ9XCIke25zfVwiIGNsYXNzPVwiJHtuc30tbm9zZWxlY3QgJHtuc30taGlkZGVuXCIgeD1cIjBweFwiIHk9XCIwcHhcIiB2aWV3Qm94PVwiMCAwIDgwIDgwXCI+XG4gIDxjaXJjbGUgaWQ9XCIke25zfS1iZ1wiIGN4PVwiNTAlXCIgY3k9XCI1MCVcIiByPVwiMzVcIj48L2NpcmNsZT5cbiAgPHBhdGggaWQ9XCIke25zfS1maWxsXCIgZD1cIk01LDQwYTM1LDM1IDAgMSwwIDcwLDBhMzUsMzUgMCAxLDAgLTcwLDBcIiAvPlxuICA8dGV4dCBpZD1cIiR7bnN9LXBlcmNlbnRcIiB4PVwiNTAlXCIgeT1cIjUxJVwiPjx0c3BhbiBpZD1cIiR7bnN9LXBlcmNlbnQtdmFsdWVcIj4wPC90c3Bhbj48dHNwYW4gaWQ9XCIke25zfS1wZXJjZW50LXN1cGVyXCI+JTwvdHNwYW4+PC90ZXh0PlxuPC9zdmc+XG5gO1xuXG5jb25zdCB1cGRhdGUgPSAocGVyY2VudCkgPT4ge1xuICBjb25zdCBtYXggPSAtMjE5Ljk5MDc4MzY5MTQwNjI1O1xuICBjb25zdCB2YWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1wZXJjZW50LXZhbHVlYCk7XG4gIGNvbnN0IHRyYWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWZpbGxgKTtcbiAgY29uc3Qgb2Zmc2V0ID0gKCgxMDAgLSBwZXJjZW50KSAvIDEwMCkgKiBtYXg7XG5cbiAgdHJhY2suc2V0QXR0cmlidXRlKCdzdHlsZScsIGBzdHJva2UtZGFzaG9mZnNldDogJHtvZmZzZXR9YCk7XG4gIHZhbHVlLmlubmVySFRNTCA9IHBlcmNlbnQudG9TdHJpbmcoKTtcbn07XG5cbmNvbnN0IHJlc2V0ID0gKHN2ZykgPT4ge1xuICBzdmcuY2xhc3NMaXN0LmFkZChgJHtuc30taGlkZGVuYCk7XG4gIHNldFRpbWVvdXQoKCkgPT4gdXBkYXRlKDApLCAxZTMpO1xufTtcblxuY29uc3QgaW5pdCA9IChvcHRpb25zLCBzb2NrZXQpID0+IHtcbiAgaWYgKG9wdGlvbnMuZmlyc3RJbnN0YW5jZSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICBhZGRDc3MoY3NzKTtcbiAgICAgIGFkZEh0bWwoaHRtbCk7XG4gICAgfSk7XG4gIH1cblxuICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgeyBhY3Rpb24sIGRhdGEgfSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcblxuICAgIGlmIChhY3Rpb24gIT09ICdwcm9ncmVzcycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJjZW50ID0gTWF0aC5mbG9vcihkYXRhLnBlcmNlbnQgKiAxMDApO1xuICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfWApO1xuXG4gICAgaWYgKCFzdmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB3ZSBjYW4gc2FmZWx5IGNhbGwgdGhpcyBldmVuIGlmIGl0IGRvZXNuJ3QgaGF2ZSB0aGUgY2xhc3NcbiAgICBzdmcuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30taGlkZGVuYCk7XG5cbiAgICBpZiAoZGF0YS5wZXJjZW50ID09PSAxKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHJlc2V0KHN2ZyksIDVlMyk7XG4gICAgfVxuXG4gICAgdXBkYXRlKHBlcmNlbnQpO1xuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyBpbml0IH07XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgeyBhZGRDc3MsIGFkZEh0bWwsIHNvY2tldE1lc3NhZ2UgfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuXG5jb25zdCBucyA9ICd3cHMtc3RhdHVzJztcbmNvbnN0IGNzcyA9IGBcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Nzcz9mYW1pbHk9T3BlbitTYW5zOjQwMCw3MDAnKTtcblxuIyR7bnN9IHtcbiAgYmFja2dyb3VuZDogIzI4MmQzNTtcbiAgYm9yZGVyLXJhZGl1czogMC42ZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcblx0Zm9udC1zaXplOiAxMHB4O1xuICBoZWlnaHQ6IDkwJTtcbiAgbWluLWhlaWdodDogMjBlbTtcbiAgbGVmdDogNTAlO1xuICBvcGFjaXR5OiAxO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nLWJvdHRvbTogM2VtO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMnJlbTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4yNXMgZWFzZS1pbi1vdXQ7XG4gIHdpZHRoOiA5NSU7XG4gIHotaW5kZXg6IDIxNDc0ODM2NDU7XG59XG5cbkBrZXlmcmFtZXMgJHtuc30taGlkZGVuLWRpc3BsYXkge1xuXHQwJSB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHQ5OSUge1xuXHRcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xuXHRcdG9wYWNpdHk6IDA7XG5cdH1cblx0MTAwJSB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG59XG5cbiMke25zfS4ke25zfS1oaWRkZW4ge1xuICBhbmltYXRpb246ICR7bnN9LWhpZGRlbi1kaXNwbGF5IC4zcztcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTpmb3J3YXJkcztcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiB7XG4gIGFuaW1hdGlvbjogbWluaW1pemUgMTBzO1xuICBib3R0b206IDJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDZlbTtcbiAgbGVmdDogYXV0bztcbiAgbWluLWhlaWdodDogNmVtO1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMmVtO1xuICB0b3A6IGF1dG87XG4gIHRyYW5zZm9ybTogbm9uZTtcbiAgd2lkdGg6IDZlbTtcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiAjJHtuc30tYmVhY29uIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbiMke25zfS10aXRsZSB7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDEuMmVtO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDAuNmVtIDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbiMke25zfS4ke25zfS1taW4gIyR7bnN9LXRpdGxlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LXRpdGxlLWVycm9ycyB7XG4gIGNvbG9yOiAjZmY1ZjU4O1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIHBhZGRpbmctbGVmdDogMWVtO1xufVxuXG4jJHtuc30tdGl0bGUtd2FybmluZ3Mge1xuICBjb2xvcjogI2ZmYmQyZTtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBwYWRkaW5nLWxlZnQ6IDFlbTtcbn1cblxuIyR7bnN9LXByb2JsZW1zIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZzogMWVtIDJlbTtcbn1cblxuIyR7bnN9LXByb2JsZW1zIHByZSB7XG4gIGNvbG9yOiAjZGRkO1xuICBiYWNrZ3JvdW5kOiAjMjgyZDM1O1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAxLjNlbTtcblx0Zm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbiMke25zfS1wcm9ibGVtcyBwcmUgZW0ge1xuICBiYWNrZ3JvdW5kOiAjZmY1ZjU4O1xuICBib3JkZXItcmFkaXVzOiAwLjNlbTtcbiAgY29sb3I6ICM2NDFlMTY7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgbGluZS1oZWlnaHQ6IDNlbTtcbiAgbWFyZ2luLXJpZ2h0OiAwLjRlbTtcbiAgcGFkZGluZzogMC4xZW0gMC40ZW07XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbnByZSMke25zfS13YXJuaW5ncyBlbSB7XG4gIGJhY2tncm91bmQ6ICNmZmJkMmU7XG4gIGNvbG9yOiAjM2UyNzIzO1xufVxuXG5wcmUjJHtuc30tc3VjY2VzcyB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxucHJlIyR7bnN9LXN1Y2Nlc3MgZW0ge1xuICBiYWNrZ3JvdW5kOiAjN2ZiOTAwO1xuICBjb2xvcjogIzAwNGQ0MDtcbn1cblxuIyR7bnN9LXByb2JsZW1zLiR7bnN9LXN1Y2Nlc3MgIyR7bnN9LXN1Y2Nlc3Mge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiAjJHtuc30tcHJvYmxlbXMge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4jJHtuc30tbmF2IHtcbiAgb3BhY2l0eTogMC41O1xuICBwYWRkaW5nOiAxLjJlbTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuXG4jJHtuc30uJHtuc30tbWluICMke25zfS1uYXYge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4jJHtuc30tbmF2OmhvdmVyIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuIyR7bnN9LW5hdiBkaXYge1xuICBiYWNrZ3JvdW5kOiAjZmY1ZjU4O1xuICBib3JkZXItcmFkaXVzOiAxLjJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGhlaWdodDogMS4yZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEuMmVtO1xufVxuXG5kaXYjJHtuc30tbWluIHtcbiAgYmFja2dyb3VuZDogI2ZmYmQyZTtcbiAgbWFyZ2luLWxlZnQ6IDAuOGVtO1xufVxuXG4jJHtuc30tYmVhY29uIHtcbiAgYm9yZGVyLXJhZGl1czogM2VtO1xuICBkaXNwbGF5OiBub25lO1xuICBmb250LXNpemU6IDEwcHg7XG4gIGhlaWdodDogM2VtO1xuICBtYXJnaW46IDEuNmVtIGF1dG87XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDNlbTtcbn1cblxuIyR7bnN9LWJlYWNvbjpiZWZvcmUsICMke25zfS1iZWFjb246YWZ0ZXIge1xuICBjb250ZW50OiAnJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTI3LDE4NSwwLCAwLjIpO1xuICBib3JkZXItcmFkaXVzOiAzZW07XG4gIG9wYWNpdHk6IDA7XG59XG5cbiMke25zfS1iZWFjb246YmVmb3JlIHtcbiAgYW5pbWF0aW9uOiAke25zfS1wdWxzZSAzcyBpbmZpbml0ZSBsaW5lYXI7XG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XG59XG5cbiMke25zfS1iZWFjb246YWZ0ZXIge1xuICBhbmltYXRpb246ICR7bnN9LXB1bHNlIDNzIDJzIGluZmluaXRlIGxpbmVhcjtcbn1cblxuXG5Aa2V5ZnJhbWVzICR7bnN9LXB1bHNlIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjYpO1xuICB9XG4gIDMzJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICB9XG59XG5cbiMke25zfS1iZWFjb24gbWFyayB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTI3LCAxODUsIDAsIDEpO1xuICBib3JkZXItcmFkaXVzOiAxMDAlIDEwMCU7XG4gIGhlaWdodDogMWVtO1xuICBsZWZ0OiAxZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxZW07XG4gIHdpZHRoOiAxZW07XG59XG5cbiMke25zfS1iZWFjb24uJHtuc30tZXJyb3IgbWFyayB7XG4gIGJhY2tncm91bmQ6ICNmZjVmNTg7XG59XG5cbiMke25zfS1iZWFjb24uJHtuc30tZXJyb3I6YmVmb3JlLCAjJHtuc30tYmVhY29uLmVycm9yOmFmdGVyIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDk1LCA4OCwgMC4yKTtcbn1cblxuIyR7bnN9LWJlYWNvbi4ke25zfS13YXJuaW5nIG1hcmsge1xuICBiYWNrZ3JvdW5kOiAjZmZiZDJlO1xufVxuXG4jJHtuc30tYmVhY29uLiR7bnN9LXdhcm5pbmc6YmVmb3JlLCAjJHtuc30tYmVhY29uLndhcm5pbmc6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTg5LCA0NiwgMC4yKTtcbn1cbmA7XG5cbmNvbnN0IGh0bWwgPSBgXG48YXNpZGUgaWQ9XCIke25zfVwiIGNsYXNzPVwiJHtuc30taGlkZGVuXCIgdGl0bGU9XCJidWlsZCBzdGF0dXNcIj5cbiAgPGZpZ3VyZSBpZD1cIiR7bnN9LWJlYWNvblwiPlxuICAgIDxtYXJrLz5cbiAgPC9maWd1cmU+XG4gIDxuYXYgaWQ9XCIke25zfS1uYXZcIj5cbiAgICA8ZGl2IGlkPVwiJHtuc30tY2xvc2VcIiB0aXRsZT1cImNsb3NlXCI+PC9kaXY+XG4gICAgPGRpdiBpZD1cIiR7bnN9LW1pblwiIHRpdGxlPVwibWlubWl6ZVwiPjwvZGl2PlxuICA8L25hdj5cbiAgPGgxIGlkPVwiJHtuc30tdGl0bGVcIj5cbiAgICBidWlsZCBzdGF0dXNcbiAgICA8ZW0gaWQ9XCIke25zfS10aXRsZS1lcnJvcnNcIj48L2VtPlxuICAgIDxlbSBpZD1cIiR7bnN9LXRpdGxlLXdhcm5pbmdzXCI+PC9lbT5cbiAgPC9oMT5cbiAgPGFydGljbGUgaWQ9XCIke25zfS1wcm9ibGVtc1wiPlxuICAgIDxwcmUgaWQ9XCIke25zfS1zdWNjZXNzXCI+PGVtPkJ1aWxkIFN1Y2Nlc3NmdWw8L2VtPjwvcHJlPlxuICAgIDxwcmUgaWQ9XCIke25zfS1lcnJvcnNcIj48L3ByZT5cbiAgICA8cHJlIGlkPVwiJHtuc30td2FybmluZ3NcIj48L3ByZT5cbiAgPC9hcnRpY2xlPlxuPC9hc2lkZT5cbmA7XG5cbmNvbnN0IGluaXQgPSAob3B0aW9ucywgc29ja2V0KSA9PiB7XG4gIGNvbnN0IGhpZGRlbiA9IGAke25zfS1oaWRkZW5gO1xuICBsZXQgaGFzUHJvYmxlbXMgPSBmYWxzZTtcbiAgbGV0IGFzaWRlO1xuICBsZXQgYmVhY29uO1xuICBsZXQgcHJvYmxlbXM7XG4gIGxldCBwcmVFcnJvcnM7XG4gIGxldCBwcmVXYXJuaW5ncztcbiAgbGV0IHRpdGxlRXJyb3JzO1xuICBsZXQgdGl0bGVXYXJuaW5ncztcblxuICBjb25zdCByZXNldCA9ICgpID0+IHtcbiAgICBwcmVFcnJvcnMuaW5uZXJIVE1MID0gJyc7XG4gICAgcHJlV2FybmluZ3MuaW5uZXJIVE1MID0gJyc7XG4gICAgcHJvYmxlbXMuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30tc3VjY2Vzc2ApO1xuICAgIGJlYWNvbi5jbGFzc05hbWUgPSAnJztcbiAgICB0aXRsZUVycm9ycy5pbm5lclRleHQgPSAnJztcbiAgICB0aXRsZVdhcm5pbmdzLmlubmVyVGV4dCA9ICcnO1xuICB9O1xuXG4gIGNvbnN0IGFkZEVycm9ycyA9IChlcnJvcnMpID0+IHtcbiAgICBpZiAoZXJyb3JzLmxlbmd0aCkge1xuICAgICAgcHJvYmxlbXMuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30tc3VjY2Vzc2ApO1xuICAgICAgYmVhY29uLmNsYXNzTGlzdC5hZGQoYCR7bnN9LWVycm9yYCk7XG5cbiAgICAgIGZvciAoY29uc3QgZXJyb3Igb2YgZXJyb3JzKSB7XG4gICAgICAgIGNvbnN0IG1hcmt1cCA9IGA8ZGl2PjxlbT5FcnJvcjwvZW0+IGluICR7ZXJyb3J9PC9kaXY+YDtcbiAgICAgICAgYWRkSHRtbChtYXJrdXAsIHByZUVycm9ycyk7XG4gICAgICB9XG5cbiAgICAgIHRpdGxlRXJyb3JzLmlubmVyVGV4dCA9IGAke2Vycm9ycy5sZW5ndGh9IEVycm9yKHMpYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGl0bGVFcnJvcnMuaW5uZXJUZXh0ID0gJyc7XG4gICAgfVxuICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoaGlkZGVuKTtcbiAgfTtcblxuICBjb25zdCBhZGRXYXJuaW5ncyA9ICh3YXJuaW5ncykgPT4ge1xuICAgIGlmICh3YXJuaW5ncy5sZW5ndGgpIHtcbiAgICAgIHByb2JsZW1zLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LXN1Y2Nlc3NgKTtcblxuICAgICAgaWYgKCFiZWFjb24uY2xhc3NMaXN0LmNvbnRhaW5zKGAke25zfS1lcnJvcmApKSB7XG4gICAgICAgIGJlYWNvbi5jbGFzc0xpc3QuYWRkKGAke25zfS13YXJuaW5nYCk7XG4gICAgICB9XG5cbiAgICAgIGZvciAoY29uc3Qgd2FybmluZyBvZiB3YXJuaW5ncykge1xuICAgICAgICBjb25zdCBtYXJrdXAgPSBgPGRpdj48ZW0+V2FybmluZzwvZW0+IGluICR7d2FybmluZ308L2Rpdj5gO1xuICAgICAgICBhZGRIdG1sKG1hcmt1cCwgcHJlV2FybmluZ3MpO1xuICAgICAgfVxuXG4gICAgICB0aXRsZVdhcm5pbmdzLmlubmVyVGV4dCA9IGAke3dhcm5pbmdzLmxlbmd0aH0gV2FybmluZyhzKWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpdGxlV2FybmluZ3MuaW5uZXJUZXh0ID0gJyc7XG4gICAgfVxuXG4gICAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZShoaWRkZW4pO1xuICB9O1xuXG4gIGlmIChvcHRpb25zLmZpcnN0SW5zdGFuY2UpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgYWRkQ3NzKGNzcyk7XG4gICAgICBbYXNpZGVdID0gYWRkSHRtbChodG1sKTtcbiAgICAgIGJlYWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1iZWFjb25gKTtcbiAgICAgIHByb2JsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LXByb2JsZW1zYCk7XG4gICAgICBwcmVFcnJvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tZXJyb3JzYCk7XG4gICAgICBwcmVXYXJuaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS13YXJuaW5nc2ApO1xuICAgICAgdGl0bGVFcnJvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tdGl0bGUtZXJyb3JzYCk7XG4gICAgICB0aXRsZVdhcm5pbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LXRpdGxlLXdhcm5pbmdzYCk7XG5cbiAgICAgIGNvbnN0IGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWNsb3NlYCk7XG4gICAgICBjb25zdCBtaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tbWluYCk7XG5cbiAgICAgIGFzaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhc2lkZS5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1taW5gKTtcbiAgICAgIH0pO1xuXG4gICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgYXNpZGUuY2xhc3NMaXN0LmFkZChgJHtuc30taGlkZGVuYCk7XG4gICAgICB9KTtcblxuICAgICAgbWluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgYXNpZGUuY2xhc3NMaXN0LmFkZChgJHtuc30tbWluYCk7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNvY2tldE1lc3NhZ2Uoc29ja2V0LCAoYWN0aW9uLCBkYXRhKSA9PiB7XG4gICAgaWYgKCFhc2lkZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgY29tcGlsZXJzIH0gPSB3aW5kb3cud2VicGFja1BsdWdpblNlcnZlO1xuXG4gICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgIGNhc2UgJ2J1aWxkJzpcbiAgICAgICAgLy8gY2xlYXIgZXJyb3JzIGFuZCB3YXJuaW5ncyB3aGVuIGEgbmV3IGJ1aWxkIGJlZ2luc1xuICAgICAgICByZXNldCgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Byb2JsZW1zJzpcbiAgICAgICAgYWRkRXJyb3JzKGRhdGEuZXJyb3JzKTtcbiAgICAgICAgYWRkV2FybmluZ3MoZGF0YS53YXJuaW5ncyk7XG4gICAgICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoaGlkZGVuKTtcbiAgICAgICAgaGFzUHJvYmxlbXMgPSBkYXRhLmVycm9ycy5sZW5ndGggfHwgZGF0YS53YXJuaW5ncy5sZW5ndGg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVwbGFjZSc6XG4gICAgICAgIC8vIGlmIHRoZXJlJ3MgYSBjb21waWxlciB0aGF0IGlzbid0IGRvbmUgeWV0LCBob2xkIG9mZiBhbmQgbGV0IGl0IHJ1biB0aGUgc2hvd1xuICAgICAgICBmb3IgKGNvbnN0IGNvbXBpbGVyTmFtZSBvZiBPYmplY3Qua2V5cyhjb21waWxlcnMpKSB7XG4gICAgICAgICAgaWYgKCFjb21waWxlcnNbY29tcGlsZXJOYW1lXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXNQcm9ibGVtcyAmJiAhcHJlRXJyb3JzLmNoaWxkcmVuLmxlbmd0aCAmJiAhcHJlV2FybmluZ3MuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgICBoYXNQcm9ibGVtcyA9IGZhbHNlO1xuICAgICAgICAgIHByb2JsZW1zLmNsYXNzTGlzdC5hZGQoYCR7bnN9LXN1Y2Nlc3NgKTtcbiAgICAgICAgICBhc2lkZS5jbGFzc0xpc3QucmVtb3ZlKGhpZGRlbik7XG5cbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGFzaWRlLmNsYXNzTGlzdC5hZGQoaGlkZGVuKSwgM2UzKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0geyBpbml0IH07XG4iLCIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgYWRkSHRtbCA9IChodG1sLCBwYXJlbnQpID0+IHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IG5vZGVzID0gW107XG5cbiAgZGl2LmlubmVySFRNTCA9IGh0bWwudHJpbSgpO1xuXG4gIHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xuICAgIG5vZGVzLnB1c2goKHBhcmVudCB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZChkaXYuZmlyc3RDaGlsZCkpO1xuICB9XG5cbiAgcmV0dXJuIG5vZGVzO1xufTtcblxuY29uc3QgYWRkQ3NzID0gKGNzcykgPT4ge1xuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgaWYgKGNzcy5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG5cbiAgLy8gYXBwZW5kIHRoZSBzdHlsZXNoZWV0IGZvciB0aGUgc3ZnXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufTtcblxuY29uc3Qgc29ja2V0TWVzc2FnZSA9IChzb2NrZXQsIGhhbmRsZXIpID0+IHtcbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aW9uLCBkYXRhID0ge30gfSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgICBoYW5kbGVyKGFjdGlvbiwgZGF0YSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IGFkZENzcywgYWRkSHRtbCwgc29ja2V0TWVzc2FnZSB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==