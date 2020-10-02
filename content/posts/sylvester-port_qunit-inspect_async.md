---
title: "Sylvester Port - Qunit, inspect (asynchronous)"
date: 2020-10-02T08:31:52-07:00
draft: true
---
Here we see the same code, with the addition of the inspect method.  This is the same as the non-asynchronous version, simply changing from an synchronous test method call to an asynchronous asyncTest method call, and the addition of the start method call to kick off the test method.

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
