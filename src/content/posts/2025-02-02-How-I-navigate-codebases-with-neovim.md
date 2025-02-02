---
title: 'Navigating codebases with Neovim'
pubDate: 2025-02-02
tags: ['webdev', 'neovim']
description: ''
---

I'm confused about how people I see on the internet use [Telescope](https://github.com/nvim-telescope/telescope.nvim) or [Fzf-lua](https://github.com/ibhagwan/fzf-lua) inside Neovim to navigate their codebases.

I think my method is pretty straightforward so I wanted to document it here:

## Toggle between two files

I've bound the TAB key to "CTRL + ^" (command: _bprevious_) which moves me to the previous buffer, so that I can basically toggle between two files instantly.

In general I work longer sessions with two files together, rarely more than that for too long (and if I do I might open a split).

## Navigate the files directly

Then if I need any other file I can at first navigate the directories with [oil.nvim](https://github.com/stevearc/oil.nvim) (which is bounded to "-"), and open the files I need from there.

Or even just by using the standard vim command ":e", really, without the oil.nvim plugin, and leveraging the autocomplete for directories and files' names.

## Fzf-lua pickers

Once I've got enough open files though, I use Fzf-lua to quickly find what I need:

- If I double tap space (which is basically my leader key + space) I launch the Fzf-lua picker for all the open buffers of the current session (command: _FzfLua Buffers_). Then I just type two or max three letters and I usually get what I need instantly.
- If I need a file from a previous session (or another codebase/directory), I use "leader + f + r" to launch Fzf-lua picker for recent opened files (command: _FzfLua oldfiles_).
- If I need anything else and I'm not sure in which file it is (a function, or anything else really), I do "leader + f + g" to "grep" or fuzzy-find anything I type in the current codebase, again, with Fzf-lua (command: _FzfLua live_grep_).
- Or even "leader + f + f" to fuzzy-find any file in the current directory (command: _FzfLua files_).

## Conclusion

I don't even have to think about these commands anymore, they're just second nature.
I'm sure people with a different type of workflow use different tools, but I see some folks using way more convoluted systems to navigate their codebases, and I'm not sure I understand them, to be honest. More power to them I guess!
