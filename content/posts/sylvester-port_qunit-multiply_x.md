---
title: "Sylvester Port - Qunit multiply, x"
date: 2020-09-21T11:08:50-07:00
draft: true
---

In the last segment we added the eql method to our suite of tests.  In testing eql we verified that two vectors were not equal to each other.  We could of added additional tests for different length vectors, vectors which are equal, and so forth, I leave that as an exercise for the reader.  In this segment, we add two additional tests, one for multiply, and one for the x instance method.  The x method is simply an alias on the multiply method, which is why I'm adding both tests in this segment.

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

test("vector.dup", function()  {
  expect(1);
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  v2 = v1.dup();
  equal(true, v1.eql(v2));
});

test("vector.eql", function()  {
  expect(1);
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  v2 = v1.dup();
  v2.setElements([ 2, 4, 6]);
  equal(false, v1.eql(v2));
});


test("vector.multiply", function()  {
  expect(3);
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  v2 = v1.multiply(10);
  equal(10, v2[0]);
  equal(20, v2[1]);
  equal(30, v2[2]);
});

test("vector.x", function()  {
  expect(3)
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  v2 = v1.x(0.5)
  equal(0.5, v2[0]);
  equal(1, v2[1]);
  equal(1.5, v2[2]);
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
As you can see, we added two additional tests one for multiply and one for the x instance method.   The multiply method creates two vectors, v1, and v2 respectively.  The v2 vector is created by calling multiply with the value 10 on the v1 vector.  In the three test points we simply verify that each vector element is multiplied by 10.  In the x instance method, we create one vector, v1, and multiply it by 0.5, and verify that each element in the result vector is 1/2 of what it used to be.

HTML Tutorial:
http://www.w3schools.com/html/default.asp

Javascript Tutorial:
http://www.w3schools.com/js/default.asp

Official Q-unit Site:
http://qunitjs.com/
