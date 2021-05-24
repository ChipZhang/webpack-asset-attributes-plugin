"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetAttributesPlugin = void 0;
const _ = __importStar(require("lodash"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
class AssetAttributesPlugin {
    constructor({ scriptAttribs = {}, styleAttribs = {} }) {
        this.scriptAttribs = scriptAttribs;
        this.styleAttribs = styleAttribs;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
            html_webpack_plugin_1.default.getHooks(compilation).alterAssetTags.tapAsync(this.constructor.name, (data, cb) => {
                function e(v) {
                    if (typeof v === 'boolean') {
                        return v;
                    }
                    return _.escape(v);
                }
                const scriptAttribs = Object.entries(this.scriptAttribs).map(([k, v]) => ({
                    [k]: e(v),
                }));
                const styleAttribs = Object.entries(this.styleAttribs).map(([k, v]) => ({
                    [k]: e(v),
                }));
                const { scripts, styles } = data.assetTags;
                scripts.forEach((s) => {
                    Object.assign(s.attributes, ...scriptAttribs);
                });
                styles.forEach((s) => {
                    Object.assign(s.attributes, ...styleAttribs);
                });
                cb(null, data);
            });
        });
    }
}
exports.AssetAttributesPlugin = AssetAttributesPlugin;
