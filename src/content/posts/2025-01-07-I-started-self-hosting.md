---
title: 'I started self-hosting'
pubDate: 2025-01-07
tags: ['self-hosting']
description: ''
---

During the Christmas break I finally managed to put my hands on the Raspberry Pi 5 that I received as a birthday present about six months ago.
I always wanted to learn to self host some useful apps and services, and what better use of a mini computer like the Raspberry Pi?
Some would called it the start of my own homelab, which I would agree with.

After installing the OS on the pi and configuring some basic stuff like the ufw firewall, it was time to go and read some of Docker's documentation, because apparently this is the new trend in self-hosting hosting: _containers_.

Which, in hindsight, makes a lot of sense, particularly for this use case, I think. Containeraisation makes trying out different apps and services quite easy.

In fact, I tried a bunch of different apps, some of them stuck with me, and some others definitely didn't.

## What stuck

#### [Linkding](https://linkding.link/)

A bookmark manager with a minimalist design but very powerful and efficient. I'm quite addicted to it now, and I've migrated all my bookmarks from Raindrop to Linkding, which made me re-think my tagging system as well, with a more minimalist approach. Great!

#### [Miniflux](https://miniflux.app/)

I might have found my endgame RSS aggregator. I tried also FreshRSS but I found its UI/UX dated and clunky, which made me have a look at Miniflux. Like Linkding, Miniflux as well proposes a minimalist approach, and I quite enjoy it. I _always_ had some issues with RSS readers, I somehow find them distracting. Miniflux feels like a breeze of fresh air.

I've also modified the Catppuccin Mocha custom CSS to my likings, mostly a different look for the cards of the articles. I'm keeping the code (and a screenshot) [here](https://gist.github.com/mauromotion/ba4e9cf63fe82e3dcf73fdf89f2dc95c) if you're curious.

#### [Jellyfin](https://jellyfin.org/)

A media manager and player. Now my home media server is taking shape. I put on it my collection of ripped blu-rays, and also my music stash of all the records I buy on Bandcamp, in .flac format, of course.

The idea is to use it both on my iPhone and our Apple TV. So far it's working fine, except for a couple of issues.

It would be great to be able to stream my music on my phone on the go, and there's an app for iOS that specifically addresses this use case, [Streamyfin](https://github.com/streamyfin/streamyfin). It looks great, but unfortunately at the moment it has some issues and can't play any music file. There's a [GitHub issue](https://github.com/streamyfin/streamyfin/issues/310) for this, and it will be hopefully addressed soon.

The other issue I have with using Jellyfin is the app for the Apple TV.

The one that's even promoted on Jellyifin's website is [Infuse](https://firecore.com/infuse), which works and looks fine, but wants my money.
Can you imagine paying $9.99 a month to play your own content from your own server? I can't, I'm afraid. I'll be looking for a valid alternative.

#### [Beszel](https://beszel.dev/)

Just a shiny tool that works as a server monitoring. I use htop most of the time anyway, but I wanted to try it. Graphs are cool!

## Thanks but not thanks

The apps that didn't make it to the great docker purge were two read-it-later apps. Mostly because after using Linkding I realiesed I don't really need a read-it-later app at all. I can just save the bookmark and then maybe use Firefox or Safari built in readers if I fancy a cleaner layout to read a long article.

So [Wallabag](https://wallabag.org/) spinned for a bit on my server but it also felt very clunky and old, in many UI/UX ways. I briefly tried [Readeck](https://readeck.org/en/) as well, which is an upcoming alternative to Wallabag, and while feeling better than Wallabag in many fronts, it still felt _undercooked_.

## To expose or not to expose? VPN is the answer!

I debated whether or not use my public domain to access my apps on the go, and I decided not to. I don't feel like exposing my home IP address is a good move overall, considering it's not just mine IP address but of my partner as well. I know there are ways around it (reverse proxy and stuff) but I decided to go for the VPN route and ended up with the easiest solution which is [Tailscale](https://tailscale.com/).

Everything works great! By only installing their app on my iPhone I can access all my self hosted apps, and even ssh into my other machines, if I ever fancy to do so.

In the future I might migrate to [NetBird](https://netbird.io/) or even to Tailscale's self hostable control server [Headscale](https://headscale.net/stable/), for the sake of self-sufficiency and open-sourcery.

So far so good, a great learning experience, and a brilliant new procrastination activity.

Cheers!
