---
title: "Sylvester Port - Qunit, cross"
date: 2020-09-24T08:43:10-07:00
draft: true
---

In the last segment we added an additional test suite for the dot method, which returns the scalar (a simple value),  obtained by multiplying corresponding entries and then summing those products.  In this segment we another test suite, this time for the cross instance method, which returns a vector, that is perpendicular to both of the vectors being multiplied.

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

test("vector.each", function()  {
  expect(4); 
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  
  v1.each(function(x) {
     x * 10;
  });
  
  equal(3, v1.dimensions());
  equal(1, v1.e(1));
  equal(2, v1.e(2));
  equal(3, v1.e(3));
  
});

test("vector.map", function()  {
  expect(3);
 
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  
  v2 = v1.map(function (x) { return x * x });
  
  equal(v2.e(1), 1);
  equal(v2.e(2), 4);
  equal(v2.e(3), 9);
});

test("vector.add", function()  {
  expect(4);
 
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  
  v2 = new Vector();
  v2.setElements([ 1, 2, 3]);
  
  v3 = v1.add(v2);
  
  equal(3, v3.dimensions());
  equal(v3.e(1), 2);
  equal(v3.e(2), 4);
  equal(v3.e(3), 6);  
});

test("vector.subtract", function()  {
  expect(4);
 
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  
  v2 = new Vector();
  v2.setElements([ 2, 4, 6]);
  
  v3 = v1.subtract(v2);
  
  equal(3, v3.dimensions());
  equal(v3.e(1), -1);
  equal(v3.e(2), -2);
  equal(v3.e(3), -3);  
});


test("vector.dot", function()  {
  expect(1);

  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  
  v2 = v1.map(function(x) { return x * x });
  v3 = v1.add(v2);
  v4 = v3.subtract(v1.multiply(2));
  v6 = v3.dot(v4);
 
  equal(84, v6); 
});

test("vector.cross", function()  {
  expect(3);
  
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
 
  v2 = v1.map(function(x) { return x * x }); 
  v3 = v5.add(v2)
  v4 = v3.subtract(v1.multiply(2))
  v5 = v3.cross(v4)
 
  equal(v5.e(1), 24); 
  equal(v5.e(2), -24); 
  equal(v5.e(3), 8); 
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
There is nothing difficult in the cross product method test.  It's very similar to the dot method test, in that it creates several intermediate vectors.  After creating the resulting vector, v5, we simply test each value to make sure its what we expected.

HTML Tutorial:
http://www.w3schools.com/html/default.asp

Javascript Tutorial:
http://www.w3schools.com/js/default.asp

Official Q-unit Site:
http://qunitjs.com/

Cross Product Description
http://en.wikipedia.org/wiki/Cross_product 
