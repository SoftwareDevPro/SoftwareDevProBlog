---
title: "Jasmine - introduction"
date: 2020-10-19T10:01:23-07:00
draft: true
---
As noted before Jasmine is an open source testing framework for Javascript.  One thing that's nice about it is that it doesn't depend on any other framework, unlike Q-unit which has a dependency on JQuery.  The simplest test consists of a call to the describe method with two parameters, one of which contains a string description, and a function.  Within that function passed to the describe method, is an it method call which also contains a string description as the first parameter, and a function method call with the code that the test code with 1 to many assertions in the form of expect calls and matchers, which implement a boolean comparison between the expected and actual value.

Example:

```

describe("A suite", function() {
  it("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });
});

```

Jasmine Home Page:
http://pivotal.github.io/jasmine/

