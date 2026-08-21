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

    eleventyConfig.addFilter("stripHtml", function (value) {
        if (!value) return "";
        return value
            .replace(/<[^>]*>/g, " ") // Strip HTML tags
            .replace(/\s+/g, " ")    // Collapse whitespace/newlines to optimise index size
            .trim();
    });

    eleventyConfig.addPassthroughCopy("assets");

    eleventyConfig.ignores.add("reallysimpledocs-main/**");

    eleventyConfig.addGlobalData("buildTime", () => Date.now());

    eleventyConfig.addCollection("docs", function (api) {
        return api.getFilteredByTag("docs");
    });
};
