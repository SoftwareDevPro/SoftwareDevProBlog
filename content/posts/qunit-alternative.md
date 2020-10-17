---
title: "A Qunit alternative"
date: 2020-10-17T09:16:26-07:00
draft: true
---

Javascript has plenty of unit testing frameworks, Q-unit is just one of those frameworks.  Another handy alternative is the Jasmine testing framework.  It's an open source framework with a goal to run on any JavaScript-enabled platform.  Below is an example test implemented with Jasmine.

Example:

```

describe('Hello world', function() {
  it('says hello', function() {
    expect(helloWorld()).toEqual("Hello world!");
  });
});

```

Jasmine Framework Description:
http://en.wikipedia.org/wiki/Jasmine_(JavaScript_framework)

List of Unit Testing Frameworks:
http://en.wikipedia.org/wiki/List_of_unit_testing_frameworks#JavaScript

Q-unit Testing Framework:
http://qunitjs.com/

