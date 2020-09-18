---
title: "Qunit - Basic Introduction"
date: 2020-09-18T13:45:29-07:00
draft: true
---

The official website for QUnit describes it as "a powerful, easy-to-use, JavaScript test suite. It's used by the jQuery project to test its code and plugins but is capable of testing any generic JavaScript code (and even capable of testing JavaScript code on the server-side)."  So it was created originally for the jQuery project, but is completely useful for defining your own unit tests for any Javascript code you might create.

QUnit uses a set of top-level functions to provide semantic meaning in unit tests:

module(string) - allows you logically separate the test code into modules.
test(string, function) - defines a test
ok(boolean, string) - a simple boolean test to excute.  The boolean value must evaluate to true, or the test will fail
equal(value1, value2, message) - compares two values.  If value1 does not equal value2 then the test will fail.
expect(any) - defines the number of expected tests for a given test.  If the test function fails to define the number of tests (e.g. test, ok, equal) then the test will fail.

For the Javascript code that results from our previous Coffeescript development, we'll define unit tests for each method in the Vector class. This has the advantage of creating repeatable, automated tests, and if we need to make any changes to the Coffeescript code, we can regression test the resulting Javascript code to make sure we have not broken any previous functionality.

Wikipedia Description:
http://en.wikipedia.org/wiki/QUnit

Official Qunit Website:
http://docs.jquery.com/QUnit
