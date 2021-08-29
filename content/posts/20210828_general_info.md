---
title: "Grabbing general system information"
date: 2021-08-11T12:23:40-07:00
draft: true
---

```
// https://systeminformation.io/

const si = require('systeminformation');

console.log(`Library Version: ${si.version()}`);

var d = new Date(0);
d.setUTCSeconds(si.time().current / 1000);

console.log(`Local Time: ${d}`);
console.log(`Uptime: ${si.time().uptime} sec`);
console.log(`Time Zone: ${si.time().timezone}`);
console.log(`Time Zone Name: ${si.time().timezoneName}`);
```
