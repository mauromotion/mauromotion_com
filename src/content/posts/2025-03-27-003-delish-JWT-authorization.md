---
title: '003 - Delish - JWT Auth System'
pubDate: 2025-03-27
tags: ['webdev', 'delish']
description: ''
---

## JWT based authentication system

I know, this is overkill. But again, I'm treating this project as an opportunity to learn and apply best practices at industry standard levels.

I've been digging into security concepts and systems and I realised that one of the best models for a secure authorization system of a web application is a [JSON Web Token](https://jwt.io/introduction) based system.

In a nutshell with JWT we get two tokens: an access token, and a refresh token.
The access token has a short lifespan (in minutes), while the refresh token can have up to months, based on the security levels that are deemed relevant for the application. As in, a banking app might have a shorter refresh token to diminish the window of opportunity for risks.

After a user logs in he gets the two tokens, and for any http request to the server's endpoints the access token is sent with the request to confirm who's the user making the request, and if he's authorized.

When the access token expires (a few minutes), we get a **401 Unauthorized** error message from the server.

At that point we can send the refresh token to the server, which, if still vaild (days or monhts), will get back a new and fresh access token.

All this happens "behind the scenes", and the user experience should be therefore pretty smooth.

## Cookies and cream

Now there are several ways to implement a JWT based system, and each way can use different strategies for storing the tokens.
The easiest way would be to leverage the browser's local storage. Convenient but definitely not the most secure method.
After even more reading and try and error I decided that I wanted to implement what probably is the most secure method:

- access token in memory only (ReactJS state)
- refresh token in an _HTTP-only cookie_ (unaccessible by JavaScript)

I had to refactor the Django back-end for this, by including the [DRF-simple-JWT](https://github.com/jazzband/djangorestframework-simplejwt) plugin, and adding the _HTTP-only cookie_ to the POST requests for logging in, registering, and refreshing the access token.

## Looping in ReactJS

I then proceeded to implement all the logic in ReactJS which turned out to be a bit against my initial scope for this simple CRUD app.

My self-set pre-requirements are (ideally) to start with the bare minimum and add complexity and abstraction only when needed; but implementing the JWT auth system forced me to add quite a bit of complexity right out of the gate.

For example, I tried to avoid it, but the easiest way to share the tokens and the user data throughout the React application is by using a context (as in _useContext_).
Then having the React context in place, I realised that to make use of the access token for each and every http request (for the sake of DRY and my mental sanity, mostly) I'd probably need some kind of custom hook, and that's what I made.

## Moving on

Finally I have all the authentication system in place now: I can register a new user from the UI, login, and logout. All by leveraging the JWT system in a clean and secure way.

My only gripe (or at least what it feels to me as a compromise), is that to maintain the user's state when refreshing the SPA, since the access token lives only in memory, I'm kind of abusing the refresh token. As in, a new one is issued at each (potential) refresh.

For now it's good enough I think. Time to move on to finally build the actual UI.
