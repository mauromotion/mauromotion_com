import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection('posts');
  const now = await getCollection('now');
  // Put all posts from both the blog and tne now section together
  const allPosts = [...blog, ...now];
  const allPostsSorted = allPosts.sort(
    (a, b) => Date.parse(b.data.pubDate) - Date.parse(a.data.pubDate),
  );

  return rss({
    // `<title>` field in output xml
    title: "mauromotion's personal website",
    // `<description>` field in output xml
    description: "mauromotion's thoughts and ramblings",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: allPostsSorted.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      customData: post.data.customData,
      link: `/posts/${post.slug}`,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
    })),
    // (optional) inject custom xml
    customData: `<language>en-gb</language>`,
    stylesheet: '/rss/pretty-feed-v3.xsl',
  });
}
