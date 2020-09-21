---
title: "Sylvester Port - Qunit, e"
date: 2020-09-20T17:09:05-07:00
draft: true
---

In the last segment we added an additional three tests for the i, j, and k class variables.  Continuing to add on to what we had before, we add a unit test for the e method, which as you will remember returns the 1-based element from the Vector.

Qunit Tests:

```

<html>
<head>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<link rel="stylesheet" href="http://code.jquery.com/qunit/git/qunit.css" type="text/css" media="screen" />
<script type="text/javascript" src="http://code.jquery.com/qunit/git/qunit.js"></script>
<script type="text/javascript" src="sylvester.src - vector.r1.js"></script>

<script>
$(document).ready(function(){
    
module("module vector");

test("vector.dimension.zero", function()  {
  expect(1);
  v1 = new Vector();
  equal(v1.dimensions(), 0);
});


test("vector.inspect", function()  {
  expect(1);
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  equal("[1, 2, 3]", v1.inspect());
});


test("vector.i", function()  {
  expect(1);
  equal("[1, 0, 0]", Vector.i.inspect());
});

test("vector.j", function()  {
  expect(1);
  equal("[0, 1, 0]", Vector.j.inspect());
});

test("vector.k", function()  {
  expect(1);
  equal("[0, 0, 1]", Vector.k.inspect());
})

test("vector.e", function()  {
  expect(5);
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  equal(undefined, v1.e(0));
  equal(1, v1.e(1));
  equal(2, v1.e(2));
  equal(3, v1.e(3));
  equal(undefined, v1.e(4));
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

Details:
Here we simply added 5 simple checks (using the equal method) for a 3-dimensional based Vector.  We verify that each of the elements is as expected, and then test outside edge cases, the 0-th element which is undefined because it doesn't exist, and 1 beyond the size of the Vector (the 4th element) and make sure its undefined as well.

HTML Tutorial:
http://www.w3schools.com/html/default.asp

Javascript Tutorial:
http://www.w3schools.com/js/default.asp

Official Q-unit Site:
http://qunitjs.com/
