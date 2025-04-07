---
title: '004 - Delish - CSS layout, back-end refactoring'
pubDate: 2025-04-07
tags: ['webdev', 'delish']
description: ''
---

[Link to the project's source code](https://github.com/mauromotion/delish-bookmarks).

## Progress

It's been over a week since my last post here, as I was feeling like I didn't
make enough progress to report.

I'm not sure how my brain works 99% of the time, because I indeed made progress.
Possibly slower than what I feel it sould have taken me, but still progress.

Let's move on.

## CSS layout

I finally put my hands in the front-end and made some decisions:

- I'm using CSS modules with ReactJS components.
- I have one index.css file for the general layout (made with CSS grid, mostly).
- Each component has its own `component-name.module.css` file, so the styling is
  scoped to it exclusively.

I used CSS grid to divide the screen into 3 columns, because I want to have a
sidebar on the right, to filter the bookmarks with collections and tags. It's
working nicely.
Then I went on and tried something unusual to me, I used CSS grid to also define
the header and body of the page. So far so good.

I wanted to add a screenshot here but I'd rather not at the moment, the UI is
still quite messy, as it's a work in progress, it wouldn't make sense.

## Back (and forth) to the back-end

The thing that consumed most of my time was once again the JWT authentication logic.
I literally woke up in the morning and found my brain thinking about all the
flow and how to make it better.

And so, by doing some research on the topic, I found out that I can encrypt any kind of data from the back-end into the JWT access token, and then decrytp it and make use of the data in the front-end.

I can simply just add the data with the serializer in DjangoRestFramework:

```python

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom fields
        token["username"] = user.username
        # ...

        return token

```

Now the username (in the example) is encrypted into the access token.

When the frontend receives the token we can decrypt it and get the username with
a package called [jwt-decode](https://www.npmjs.com/package/jwt-decode):

```javascript
const data = await response.json();

setAccessToken(data.access);
const payload = jwtDecode(data.access);
setUserData({ id: payload.id, username: payload.username });
```

I was then able to completely remove the extra endpoint that I made only to
fetch the current user data, which is now also completely encrypted in
transit.

While I was at it, also thanks to the suggestion of [Jasper](https://jasper.tandy.is/) on Mastodon, I realised that waiting for the server to send me a 401 error message and then proceed to refresh the access token, wasn't a very efficient pattern; and so I used a timer in JavaScript that just refreshes the access token every 4:50 (right before the 5:00 expiry date), to keep the UX clean.
That made me also delete a couple of hooks in React that I was using to keep fetching the user
data whenever the token was refreshed.

Everything is much leaner and cleaner now.

## Filtering and query parameters

The next step was to build the logic for filtering the bookmarks based on whatever
the front-end asks.

I remember learning about query parameters during [Harvard's CS50w](https://cs50.harvard.edu/web/2020/), but I've never really implemented their use in a real project.
And so I went on and read the documentation of the browser's API for the URL
constructor, and specifically `URLSearchParams`.

I'm not really planning on adding routes right now, to keep things simple, but if at some point I will
(with React Router) it just makes sense to fetch data from the back-end with URL
queries, as it's the appropriate standard pattern.

## Next moves

I just need to keep cracking on right now, building components, implementig
logic in the back-end when needed.

I'll keep the actual UI styling for later though.

Until the next one!
