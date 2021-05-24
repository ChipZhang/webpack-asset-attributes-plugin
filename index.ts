import * as _ from 'lodash'
import webpack from 'webpack'
import HTMLPlugin from 'html-webpack-plugin'

export interface TagAttributes {
	[attributeName: string]: string | boolean
}

export class AssetAttributesPlugin {
	private readonly scriptAttribs: TagAttributes

	private readonly styleAttribs: TagAttributes

	constructor({scriptAttribs = {}, styleAttribs = {}}: {scriptAttribs: TagAttributes; styleAttribs: TagAttributes}) {
		this.scriptAttribs = scriptAttribs
		this.styleAttribs = styleAttribs
	}

	apply(compiler: webpack.Compiler): void {
		compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
			HTMLPlugin.getHooks(compilation).alterAssetTags.tapAsync(this.constructor.name, (data, cb) => {
				function e(v: string | boolean): string | boolean {
					if (typeof v === 'boolean') {
						return v
					}
					return _.escape(v)
				}

				const scriptAttribs: TagAttributes[] = Object.entries(this.scriptAttribs).map(([k, v]) => ({
					[k]: e(v),
				}))
				const styleAttribs: TagAttributes[] = Object.entries(this.styleAttribs).map(([k, v]) => ({
					[k]: e(v),
				}))

				const {scripts, styles} = data.assetTags
				scripts.forEach((s): void => {
					Object.assign(s.attributes, ...scriptAttribs)
				})
				styles.forEach((s): void => {
					Object.assign(s.attributes, ...styleAttribs)
				})
				cb(null, data)
			})
		})
	}
}
