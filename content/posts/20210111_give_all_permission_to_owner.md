---
title: "Give all permission to the owner, read execute to the group and nothing to others"
date: 2020-12-22T14:58:42-08:00
draft: true
---

```
# Create a file
touch file1

# Set permission using either of the method
chmod 750 file1
chmod u=rwx,g=rx,o= file1

# List the file permission
ls -lh file1
```
