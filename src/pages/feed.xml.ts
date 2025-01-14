import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
import { getCollection } from 'astro:content';
import { parse as htmlParser } from 'node-html-parser';
import { getImage } from 'astro:assets';

import type { AstroGlobal } from 'astro';
import type { RSSFeedItem } from '@astrojs/rss';
const markdownParser = new MarkdownIt();

// Get dynamic import of images as a map collection
const imagesGlob = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/{posts,now}/_images/**/*.{jpeg,jpg,JPG,png,gif}', // Match images in both posts and now directories
);

export async function GET(context: AstroGlobal) {
  if (!context.site) {
    throw Error('site not set');
  }

  const feed: RSSFeedItem[] = [];

  // Fetch all posts from both collections (posts and now)
  const blog = await getCollection('posts');
  const now = await getCollection('now');
  const allPosts = [...blog, ...now].sort(
    (a, b) =>
      Date.parse(String(b.data.pubDate)) - Date.parse(String(a.data.pubDate)),
  );

  for (const post of allPosts) {
    // Convert markdown to HTML string
    const body = markdownParser.render(post.body);
    // Convert HTML string to DOM-like structure
    const html = htmlParser.parse(body);
    // Hold all <img> tags in the variable images
    const images = html.querySelectorAll('img');

    for (const img of images) {
      const src = img.getAttribute('src')!;

      if (src.startsWith('./')) {
        // Remove `./` prefix
        let prefixRemoved = src.replace('./', '');
        const collectionDir = post.collection === 'posts' ? 'posts' : 'now';

        // Construct the image path based on the collection and remove redundant _images directory part
        if (prefixRemoved.startsWith('_images/')) {
          prefixRemoved = prefixRemoved.replace('_images/', '');
        }

        // Construct the correct image path
        const imagePathPrefix = `/src/content/${collectionDir}/_images/${prefixRemoved}`;

        // Call the dynamic import and return the module
        const imagePath = await imagesGlob[imagePathPrefix]?.()?.then(
          (res) => res.default,
        );

        if (imagePath) {
          // Optimize the image using Astro's getImage
          const optimizedImg = await getImage({ src: imagePath });

          // Set the correct path to the optimized image
          img.setAttribute(
            'src',
            context.site + optimizedImg.src.replace('/', ''),
          );
        } else {
          console.warn(`Image not found: ${imagePathPrefix}`);
        }
      } else if (src.startsWith('/images')) {
        // Handle images starting with `/images/` (public directory)
        img.setAttribute('src', context.site + src.replace('/', ''));
      } else if (src.startsWith('http://') || src.startsWith('https://')) {
        // Handle external images
        continue;
      } else {
        throw Error(`Unknown src format: ${src}`);
      }
    }

    feed.push({
      title: post.data.title,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link:
        post.collection === 'posts'
          ? `/posts/${post.slug}`
          : `/now/${post.slug}`,
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
