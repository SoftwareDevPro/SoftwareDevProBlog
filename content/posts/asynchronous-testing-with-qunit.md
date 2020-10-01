---
title: "Asynchronous Testing With Qunit"
date: 2020-10-01T09:09:14-07:00
draft: true
---

The Q-Unit Javascript testing framework also has the ability to perform asynchronous testing. Essentially, this allows several tests to run at the same time, which could be handy if one or more tests take longer to perform then others (e.g. a long server database query, or expensive I/O operation).  In the following segments, we'll take our synchronous based tests (i.e. each one runs to completion before the next test begins) and convert them to a asynchronous based version.

Q-Unit Asynchronous Documentation
http://api.qunitjs.com/category/async-control/

Q-Unit Asynchronous Cookbook Example:
http://qunitjs.com/cookbook/#asynchronous-callbacks
