import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import markdownItHljs from "markdown-it-highlightjs";
import markdownItAttrs from "markdown-it-attrs";

export default function (eleventyConfig) {
    const md = markdownIt({ html: true, linkify: true, typographer: true })
        .use(markdownItAnchor, {
            permalink: markdownItAnchor.permalink.headerLink({ safariReaderFix: true }),
        })
        .use(markdownItHljs, { auto: true, code: true })
        .use(markdownItAttrs);
    eleventyConfig.setLibrary("md", md);

    eleventyConfig.addPassthroughCopy("assets");

    eleventyConfig.ignores.add("reallysimpledocs-main/**");

    eleventyConfig.addCollection("docs", function (api) {
        return api.getFilteredByTag("docs");
    });
};
