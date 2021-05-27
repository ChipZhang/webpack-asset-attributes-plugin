"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetAttributesPlugin = void 0;
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
// replace lodash `_.escape()`
function escapeHTML(t) {
    if (!t) {
        return '';
    }
    const escapes = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };
    return t.replace(/[&<>"']/g, (c) => escapes[c]);
}
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
                    return escapeHTML(v);
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
