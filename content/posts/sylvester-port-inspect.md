---
title: "Sylvester Port - Qunit, inspect"
date: 2020-09-19T20:26:20-07:00
draft: true
---

In the last segment we introduced a web page, with some Javascript and the Q-unit test framework.  Continuing on with our automated testing development, we add a test point for the inspect method of the Vector class.

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
As before if you want to see it, copy the above code into a file with an HTML extension, and open the file up with your web browser.  You can see we added an additional call to the Q-unit test method with "vector.inspect" as the test name.  We simply create a new vector, and test for equality on the string value returned by the inspect method.

HTML Tutorial:
http://www.w3schools.com/html/default.asp

Javascript Tutorial:
http://www.w3schools.com/js/default.asp

Official Q-unit Site:
http://qunitjs.com/ 

