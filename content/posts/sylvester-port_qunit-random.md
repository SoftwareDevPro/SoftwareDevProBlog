---
title: "Sylvester Port - Qunit, random"
date: 2020-09-30T15:32:00-07:00
draft: true
---
In the last segment we added one additional test suite, for the toUnitVector instance method which returned a new Vector, by normalizing the current one.  In this segment we add a test suite for the Random class method.  Remember that a class method doesn't need to be invoked on an instance of the class (e.g. v1, v2, ..., v3).  The Random class method creates a new Vector, and returns it with the specified number of dimensions, each with random values.

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

test("vector.angleFrom", function()  {
  expect(1);
 
  v12 = new Vector();
  v12.setElements([1, 1]);
  v13 = new Vector();
  v13.setElements([-1, 11]);
 
  equal(0.8760580505981935, v12.angleFrom(v13));
});

test("vector.isParallelTo", function()  {
  expect(1)
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  v2 = v1.dup();
  ok(v1.isParallelTo(v2), "parallel passed")
});

test("vector.isAntiparallelTo", function()  {
  expect(1)
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  v2 = v1.dup();
  ok(! v1.isAntiparallelTo(v2), "anti-parallel passed")
});

test("vector.isPerpendicularTo", function()  {
  expect(1)
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  v2 = v1.dup();
  ok(! v1.isPerpendicularTo(v2), "perpendicular passed")
 });

test("vector.distanceFrom", function()  {
  expect(1)
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  v11 = new Vector()
  v11.setElements([100, 200, 300])   
  equal(370.4240812906202, v1.distanceFrom(v11));
});

test("vector.round", function()  { 
   expect(3)
 
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  square = function(x) { return x * x };
  v5 = v1.map(square);
  v6 = v5.add(v5)
  v7 = v6.subtract(v1.multiply(2))
  v9 = v6.cross(v7).toUnitVector().round();
 
  equal(v9.e(1), 1); 
  equal(v9.e(2), -1); 
  equal(v9.e(3), 0); 
});

test("vector.snapTo", function()  {
  expect(6)

  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  result = v1.snapTo(1)
  equal(true, result.e(1));
  equal(false, result.e(2));
  equal(false, result.e(3));
  
  v2 = v1.dup();
  result = v2.snapTo(2)
  equal(false, result.e(1));
  equal(true, result.e(2));
  equal(false, result.e(3));
});

test("vector.indexOf", function()  {
  expect(3)

  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  square = function(x) { return x * x };
  v5 = v1.map(square);
  v6 = v5.add(v5)
  v7 = v6.subtract(v1.multiply(2))
  v9 = v6.cross(v7)
 
  equal(v9.indexOf(24), 1); 
  equal(v9.indexOf(-24), 2); 
  equal(v9.indexOf(8), 3); 
});

test("vector.max", function()  {
  expect(2);
  v1 = new Vector();
  v1.setElements([ 2, 4, 6]);
  ok(v1.max() == 6, "max passed");
  v1.setElements([ -5, 2, 4, 6, -1]);
  ok(v1.max() == 6, "max passed");
});

test("vector.modulus", function()  {
  expect(3)
 
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  square = function(x) { return x * x };
  v5 = v1.map(square);
  v6 = v5.add(v5)
  v7 = v6.subtract(v1.multiply(2))
  v9 = v6.cross(v7)
 
  equal(34.87119154832539, v9.modulus()); 
});

test("vector.to3D", function()  {
  expect(5)
  v1 = Vector.Random(2);
  equal(2, v1.dimensions());
  v2 = v1.to3D()
  equal(3, v2.dimensions());
  ok(v2.e(1) >= 0 && v2.e(1) <= 1, "element within range")
  ok(v2.e(2) >= 0 && v2.e(2) <= 1, "element within range")
  ok(v2.e(3) == 0, "element within range")
});

test("vector.toUnitVector", function()  {
  expect(3)
 
  v1 = new Vector();
  v1.setElements([ 1, 2, 3]);
  square = function(x) { return x * x };
  v5 = v1.map(square);
  v6 = v5.add(v5)
  v7 = v6.subtract(v1.multiply(2))
  v9 = v6.cross(v7).toUnitVector();
 
  equal(v9.e(1), 0.6882472016116852); 
  equal(v9.e(2), -0.6882472016116852); 
  equal(v9.e(3), 0.22941573387056174); 
});

test("vector.Random", function()  {
  expect(6)
  v1 = Vector.Random(5);
  equal(5, v1.dimensions());
  ok(v1.e(1) >= 0 && v1.e(1) <= 1, "element within range")
  ok(v1.e(2) >= 0 && v1.e(2) <= 1, "element within range")
  ok(v1.e(3) >= 0 && v1.e(3) <= 1, "element within range")
  ok(v1.e(4) >= 0 && v1.e(4) <= 1, "element within range")
  ok(v1.e(5) >= 0 && v1.e(5) <= 1, "element within range")
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
The Random class method test suite creates a random vector with five dimensions, and then verifies that all the elements are within the expected range (>= 0 and <= 1).

HTML Tutorial:
http://www.w3schools.com/html/default.asp

Javascript Tutorial:
http://www.w3schools.com/js/default.asp

Official Q-unit Site:
http://qunitjs.com/

