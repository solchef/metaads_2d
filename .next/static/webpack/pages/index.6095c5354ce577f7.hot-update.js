"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.tsx":
/*!*************************!*\
  !*** ./pages/index.tsx ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dynamic */ \"./node_modules/next/dynamic.js\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Views_WebPages_tsx_SliderSection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Views/WebPages.tsx/SliderSection */ \"./Views/WebPages.tsx/SliderSection.tsx\");\n/* harmony import */ var _Views_WebPages_tsx_InfoSection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Views/WebPages.tsx/InfoSection */ \"./Views/WebPages.tsx/InfoSection.tsx\");\nvar _this = undefined;\n\n\n\n\n// eslint-disable-next-line @typescript-eslint/ban-types\nvar AdSpace = next_dynamic__WEBPACK_IMPORTED_MODULE_1___default()(function() {\n    return __webpack_require__.e(/*! import() */ \"Views_AdSpace_tsx\").then(__webpack_require__.bind(__webpack_require__, /*! ../Views/AdSpace */ \"./Views/AdSpace.tsx\"));\n}, {\n    loadableGenerated: {\n        modules: [\n            \"index.tsx -> \" + \"../Views/AdSpace\"\n        ]\n    },\n    ssr: false\n});\n_c = AdSpace;\nvar Home = function() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Views_WebPages_tsx_SliderSection__WEBPACK_IMPORTED_MODULE_2__.SliderSection, {}, void 0, false, {\n                fileName: \"/Users/jawiwy/Documents/blockchain/fanitrade-ecosystem/metaads/metaadsweb/pages/index.tsx\",\n                lineNumber: 13,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AdSpace, {}, void 0, false, {\n                fileName: \"/Users/jawiwy/Documents/blockchain/fanitrade-ecosystem/metaads/metaadsweb/pages/index.tsx\",\n                lineNumber: 14,\n                columnNumber: 7\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Views_WebPages_tsx_InfoSection__WEBPACK_IMPORTED_MODULE_3__.InfoSection, {}, void 0, false, {\n                fileName: \"/Users/jawiwy/Documents/blockchain/fanitrade-ecosystem/metaads/metaadsweb/pages/index.tsx\",\n                lineNumber: 15,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true);\n};\n_c1 = Home;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\nvar _c, _c1;\n$RefreshReg$(_c, \"AdSpace\");\n$RefreshReg$(_c1, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC50c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUFrQztBQUNpQztBQUNKO0FBRS9ELHdEQUF3RDtBQUN4RCxJQUFNRyxPQUFPLEdBQUdILG1EQUFPLENBQUM7V0FBTSw2SkFBMEI7Q0FBQTs7Ozs7O0lBQ3RESSxHQUFHLEVBQUUsS0FBSztFQUNWO0FBRklELEtBQUFBLE9BQU87QUFJYixJQUFNRSxJQUFJLEdBQUcsV0FBTTtJQUNqQixxQkFDRTs7MEJBQ0UsOERBQUNKLDRFQUFhOzs7O3FCQUFHOzBCQUNqQiw4REFBQ0UsT0FBTzs7OztxQkFBRzswQkFDWCw4REFBQ0Qsd0VBQVc7Ozs7cUJBQUc7O29CQUNkLENBQ0o7Q0FDRjtBQVJLRyxNQUFBQSxJQUFJO0FBVVYsK0RBQWVBLElBQUkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvaW5kZXgudHN4PzA3ZmYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGR5bmFtaWMgZnJvbSAnbmV4dC9keW5hbWljJ1xuaW1wb3J0IHsgU2xpZGVyU2VjdGlvbiB9IGZyb20gJy4uL1ZpZXdzL1dlYlBhZ2VzLnRzeC9TbGlkZXJTZWN0aW9uJ1xuaW1wb3J0IHsgSW5mb1NlY3Rpb24gfSBmcm9tICcuLi9WaWV3cy9XZWJQYWdlcy50c3gvSW5mb1NlY3Rpb24nXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXR5cGVzXG5jb25zdCBBZFNwYWNlID0gZHluYW1pYygoKSA9PiBpbXBvcnQoJy4uL1ZpZXdzL0FkU3BhY2UnKSwge1xuICBzc3I6IGZhbHNlLFxufSlcblxuY29uc3QgSG9tZSA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFNsaWRlclNlY3Rpb24gLz5cbiAgICAgIDxBZFNwYWNlIC8+XG4gICAgICA8SW5mb1NlY3Rpb24gLz5cbiAgICA8Lz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBIb21lXG4iXSwibmFtZXMiOlsiZHluYW1pYyIsIlNsaWRlclNlY3Rpb24iLCJJbmZvU2VjdGlvbiIsIkFkU3BhY2UiLCJzc3IiLCJIb21lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.tsx\n");

/***/ })

});