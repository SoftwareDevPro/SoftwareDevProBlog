---
title: "Sylvester Port - Qunit, e (asynchronous)"
date: 2020-10-05T09:52:37-07:00
draft: true
---

In this conversion from synchronous to asynchronous test methods we add the e method, which simply returns the i'th element of Vector.  There's nothing really different with this one either, we simply change the test to asyncTest, and add a call to start at the end of the test.

Qunit Tests:

```

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"  "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<link rel="stylesheet" href="http://code.jquery.com/qunit/git/qunit.css" type="text/css" media="screen" />
<script type="text/javascript" src="http://code.jquery.com/qunit/git/qunit.js"></script>
<script type="text/javascript" src="sylvester.src - vector.r1.js"></script>

<script>
$(document).ready(function(){
    
module("module vector");

asyncTest("vector.dimension.zero", function()  {
  expect(1);
  v1 = new Vector();
  equal(v1.dimensions(), 0);
  start();
});

asyncTest("vector.inspect", function()  {
  expect(1);
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  equal("[1, 2, 3]", v1.inspect());
  start();
});

asyncTest("vector.i", function()  {
  expect(1);
  equal("[1, 0, 0]", Vector.i.inspect());
  start();
});

asyncTest("vector.j", function()  {
  expect(1);
  equal("[0, 1, 0]", Vector.j.inspect());  start();
  start();
});

asyncTest("vector.k", function()  {
  expect(1);
  equal("[0, 0, 1]", Vector.k.inspect());  start();
  start();
});

asyncTest("vector.e", function()  {
  expect(5);
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  equal(undefined, v1.e(0));
  equal(1, v1.e(1));
  equal(2, v1.e(2));
  equal(3, v1.e(3));
  equal(undefined, v1.e(4));
  start();
});



});

</script>
  
</head>
<body>

<h1 id="qunit-header">QUnit example</h1>
<h2 id="qunit-banner"></h2>
<div id="qunit-testrunner-toolbar"></div>
<h2 id="qunit-userAgent"></h2>
<ol id="qunit-tests"></ol>
<div id="qunit-fixture">test markup, will be hidden</div>

</body>
</html>

```

Q-Unit Asynchronous Documentation:
http://api.qunitjs.com/category/async-control/

Q-Unit Asynchronous Cookbook Example:
http://qunitjs.com/cookbook/#asynchronous-callbacks

HTML Tutorial:
http://www.w3schools.com/html/default.asp

Javascript Tutorial:
http://www.w3schools.com/js/default.asp

Official Q-unit Site:
http://qunitjs.com/
