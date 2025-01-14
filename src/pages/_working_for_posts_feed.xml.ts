import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { getCollection } from 'astro:content';
import { parse as htmlParser } from 'node-html-parser';
import { getImage } from 'astro:assets';

import type { AstroGlobal } from 'astro';
import type { RSSFeedItem } from '@astrojs/rss';
const markdownParser = new MarkdownIt();

// get dynamic import of images as a map collection
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/posts/_images/**/*.{jpeg,jpg,png,gif}', // add more image formats if needed
);

export async function GET(context: AstroGlobal) {
  if (!context.site) {
    throw Error('site not set');
  }

  const feed: RSSFeedItem[] = [];

  // TODO: For now I have to exclude the 'now' posts from my feed, until I figure out a way to do it
  //
  // const blog = await getCollection('posts');
  // const now = await getCollection('now');

  // Put all posts from both the blog and tne now section together
  // const allPosts = [...blog, ...now];
  // const allPostsSorted = allPosts.sort(
  //   (a, b) =>
  //     Date.parse(String(b.data.pubDate)) - Date.parse(String(a.data.pubDate)),
  // );

  const allPosts = await getCollection('posts').then((posts) =>
    posts.sort(
      (a, b) =>
        Date.parse(String(b.data.pubDate)) - Date.parse(String(a.data.pubDate)),
    ),
  );

  for (const post of allPosts) {
    // convert markdown to html string
    const body = markdownParser.render(post.body);
    // convert html string to DOM-like structure
    const html = htmlParser.parse(body);
    // hold all img tags in variable images
    const images = html.querySelectorAll('img');

    for (const img of images) {
      const src = img.getAttribute('src')!;

      // Relative paths that are optimized by Astro build
      if (src.startsWith('./')) {
        // remove prefix of `./`
        const prefixRemoved = src.replace('./', '');
        // create prefix absolute path from root dir
        const imagePathPrefix = `/src/content/posts/${prefixRemoved}`;

        // call the dynamic import and return the module
        const imagePath = await imagesGlob[imagePathPrefix]?.()?.then(
          (res) => res.default,
        );

        if (imagePath) {
          const optimizedImg = await getImage({ src: imagePath });
          // set the correct path to the optimized image
          img.setAttribute(
            'src',
            context.site + optimizedImg.src.replace('/', ''),
          );
        }
      } else if (src.startsWith('/images')) {
        // images starting with `/images/` is the public dir
        img.setAttribute('src', context.site + src.replace('/', ''));
      } else {
        throw Error('src unknown');
      }
    }

    feed.push({
      title: post.data.title,
      pubDate: post.data.pubDate,
      // description: post.data.description,
      categories: post.data.tags,
      link: `/posts/${post.slug}`,
      // sanitize the new html string with corrected image paths
      content: sanitizeHtml(html.toString(), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      }),
    });
  }

  return rss({
    title: "Mauro's personal website",
    description: "Mauro's thoughts and ramblings",
    site: context.site,
    items: feed,
    stylesheet: '/rss/pretty-feed-v3.xsl',
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    customData: [
      '<language>en-gb</language>',
      `<atom:link href="${new URL('rss.xml', context.site)}" rel="self" type="application/rss+xml" />`,
    ].join(''),
    trailingSlash: false,
  });
}
