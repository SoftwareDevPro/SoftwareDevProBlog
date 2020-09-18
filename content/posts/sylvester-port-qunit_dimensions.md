---
title: "Sylvester Port - Qunit, dimensions"
date: 2020-09-18T13:45:52-07:00
draft: true
---

Now, we are going to develop essentially a webpage, with Javascript intermixed.  If you don't know what HTML is (which is the language behind web pages), there is plenty of resources on the Internet which can help you out.  In this example, we start out by developing a test for the dimension method.

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
In this first example, you can see we have a basic webpage.  If you want to see it, copy the above code into a file with an HTML extension, and open the file up with your web browser.  The inclusion of scripts and link's in the header (head element) bring in a lot of functionality, and aesthetic value to the presentation of the webpage.  The meat of the web page is in the Javascript section which pulls in the derived Javascript (from Coffeescript).  As you can see from the inline Javascript, there is one method call, test, with "vector.dimension.zero" as the name, and the inline function where the majority of the work happens.  In this test, we simply create a new Vector object, and assert (test) that the dimensions are zero.  The first parameter to the equal method is the resulting value, and the second parameter is the expected value.  The expect method asserts that one test will run, if there isn't at least one test, the test itself will fail.  The module function simply lets us sub-divide the tests into logical modules.

HTML Tutorial:
http://www.w3schools.com/html/default.asp 

Javascript Tutorial:
http://www.w3schools.com/js/default.asp 

Official Q-unit Site:
http://qunitjs.com/ 


