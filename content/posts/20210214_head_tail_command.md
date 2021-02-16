---
title: "Example 2: Let’s use head & tail command"
date: 2020-12-22T16:30:28-08:00
draft: true
---

```
ls -1 *.txt | sort -n | head -n 5  # show the first 5 lines
ls -1 *.txt | sort -n | tail -n 5  # show the last 5 lines
```