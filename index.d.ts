import webpack from 'webpack';
export interface TagAttributes {
    [attributeName: string]: string | boolean;
}
export declare class AssetAttributesPlugin {
    private readonly scriptAttribs;
    private readonly styleAttribs;
    constructor({ scriptAttribs, styleAttribs }: {
        scriptAttribs: TagAttributes;
        styleAttribs: TagAttributes;
    });
    apply(compiler: webpack.Compiler): void;
}
