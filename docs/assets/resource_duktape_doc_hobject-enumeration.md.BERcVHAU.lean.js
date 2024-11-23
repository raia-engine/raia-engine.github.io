import{_ as t,c as o,a2 as n,o as r}from"./chunks/framework.DPuwY6B9.js";const u=JSON.parse('{"title":"Object enumeration issues","description":"","frontmatter":{},"headers":[],"relativePath":"resource/duktape/doc/hobject-enumeration.md","filePath":"resource/duktape/doc/hobject-enumeration.md","lastUpdated":1732350347000}'),a={name:"resource/duktape/doc/hobject-enumeration.md"};function i(s,e,c,l,p,d){return r(),o("div",null,e[0]||(e[0]=[n(`<h1 id="object-enumeration-issues" tabindex="-1">Object enumeration issues <a class="header-anchor" href="#object-enumeration-issues" aria-label="Permalink to &quot;Object enumeration issues&quot;">​</a></h1><p>This document provides some design notes for pre-ES2015 and ES2015/ES2016 enumeration.</p><h2 id="key-order-during-enumeration" tabindex="-1">Key order during enumeration <a class="header-anchor" href="#key-order-during-enumeration" aria-label="Permalink to &quot;Key order during enumeration&quot;">​</a></h2><p>ECMAScript E3 or E5 do not require a specific key order during enumeration. However, some existing code apparently relies on some ordering behavior:</p><ul><li><p><a href="http://code.google.com/p/chromium/issues/detail?id=2605" target="_blank" rel="noreferrer">http://code.google.com/p/chromium/issues/detail?id=2605</a></p></li><li><p><a href="http://ejohn.org/blog/javascript-in-chrome/" target="_blank" rel="noreferrer">http://ejohn.org/blog/javascript-in-chrome/</a></p><blockquote><p>However, specification is quite different from implementation. All modern implementations of ECMAScript iterate through object properties in the order in which they were defined. Because of this the Chrome team has deemed this to be a bug and will be fixing it.</p></blockquote></li></ul><p>User code seems to rely roughly on the following order:</p><ul><li>For arrays, return all used array index keys in ascending order first</li><li>Then return all other keys in the order in which they have been first defined</li><li>The properties of the object itself are enumerated first, followed by its prototype&#39;s properties, and so on</li></ul><p>ES5 doesn&#39;t guarantee a specific ordering for enumeration. ES2015 and ES2016 also don&#39;t guarantee a specific ordering for <code>for-in</code> and <code>Object.keys()</code> but does guarantee ordering for e.g. <code>Object.getOwnPropertyNames()</code>.</p><h2 id="specification-e6-and-e7" tabindex="-1">Specification (E6 and E7) <a class="header-anchor" href="#specification-e6-and-e7" aria-label="Permalink to &quot;Specification (E6 and E7)&quot;">​</a></h2><p>The situation seems unchanged from ES5 for <code>for-in</code> and <code>Object.keys()</code>:</p><ul><li>For-in: <ul><li>ES2015 <a href="http://www.ecma-international.org/ecma-262/6.0/#sec-runtime-semantics-forin-div-ofheadevaluation-tdznames-expr-iterationkind" target="_blank" rel="noreferrer">http://www.ecma-international.org/ecma-262/6.0/#sec-runtime-semantics-forin-div-ofheadevaluation-tdznames-expr-iterationkind</a> algorithm step 7 is taken (iterationKind is &quot;enumerate&quot;), target is ToObject() coerced and <code>[[Enumerate]]</code> is applied. <a href="http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-enumerate" target="_blank" rel="noreferrer">http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-enumerate</a> states &quot;The mechanics and order of enumerating the properties is not specified but must conform to the rules specified below.&quot;.</li><li>ES2016 calls <code>EnumerateObjectProperties()</code>, <a href="http://www.ecma-international.org/ecma-262/7.0/#sec-enumerate-object-properties" target="_blank" rel="noreferrer">http://www.ecma-international.org/ecma-262/7.0/#sec-enumerate-object-properties</a>, which has the same requirements as ES2015: &quot;The mechanics and order of enumerating the properties is not specified but must conform to the rules specified below.&quot;.</li></ul></li><li>Object.keys(): <ul><li>ES2015 <a href="http://www.ecma-international.org/ecma-262/6.0/#sec-object.keys" target="_blank" rel="noreferrer">http://www.ecma-international.org/ecma-262/6.0/#sec-object.keys</a> states: &quot;If an implementation defines a specific order of enumeration for the for-in statement, the same order must be used for the elements of the array returned in step 4.&quot; The algorithm references EnumerableOwnNames, <a href="http://www.ecma-international.org/ecma-262/6.0/#sec-enumerableownnames" target="_blank" rel="noreferrer">http://www.ecma-international.org/ecma-262/6.0/#sec-enumerableownnames</a>, which states &quot;The order of elements in the returned list is the same as the enumeration order that is used by a for-in statement.&quot;.</li><li>ES2016 calls <code>EnumerableOwnNames()</code>, <a href="http://www.ecma-international.org/ecma-262/7.0/#sec-enumerableownnames" target="_blank" rel="noreferrer">http://www.ecma-international.org/ecma-262/7.0/#sec-enumerableownnames</a>, whose step 5 says &quot;Order the elements of names so they are in the same relative order as would be produced by the Iterator that would be returned if the EnumerateObjectProperties internal method was invoked with O.&quot;. So the guarantees are the same as for <code>for-in</code> in ES2016 too.</li></ul></li></ul><p>There are differences to ES5 in the following:</p><ul><li><code>Object.getOwnPropertyNames()</code> (a binding already present in ES5) <ul><li>ES5 has no guarantees for key ordering: <a href="http://www.ecma-international.org/ecma-262/5.1/#sec-15.2.3.4" target="_blank" rel="noreferrer">http://www.ecma-international.org/ecma-262/5.1/#sec-15.2.3.4</a>; the section just states &quot;For each named own property P of O&quot;.</li><li>ES2015 relies on <code>GetOwnPropertyKeys()</code> operation: <a href="http://www.ecma-international.org/ecma-262/6.0/#sec-object.getownpropertynames" target="_blank" rel="noreferrer">http://www.ecma-international.org/ecma-262/6.0/#sec-object.getownpropertynames</a> which in turn calls <code>[[OwnPropertyKeys]]</code> For ordinary objects, ES2015 <code>[[OwnPropertyKeys]]</code> provides the ordering often referred to as &quot;the ES2015 enumeration order&quot;, <a href="http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys" target="_blank" rel="noreferrer">http://www.ecma-international.org/ecma-262/6.0/#sec-ordinary-object-internal-methods-and-internal-slots-ownpropertykeys</a>: <ul><li>For each own property key P of O that is an integer index, in ascending numeric index order ...</li><li>For each own property key P of O that is a String but is not an integer index, in property creation order ...</li><li>For each own property key P of O that is a Symbol, in property creation order ...</li></ul></li><li>ES2016 matches ES2015 and invokes <code>GetOwnPropertyKeys()</code>.</li></ul></li><li><code>Object.getOwnPropertySymbols()</code> is new in ES2015 and has the same ordering guarantees as above. In practice, because it only returns symbols, the symbols must be returned in insertion order.</li></ul><p>The <code>[[OwnPropertyKeys]]</code> ordering is what&#39;s typically referred to as the &quot;ES2015 enumeration order&quot;. Most engines, including Duktape 2.x, use it also for <code>for-in</code> and <code>Object.keys()</code> even if it&#39;s not required for them.</p><h2 id="specification-e5" tabindex="-1">Specification (E5) <a class="header-anchor" href="#specification-e5" aria-label="Permalink to &quot;Specification (E5)&quot;">​</a></h2><p>A specific ordering is not required:</p><ul><li><p>Section 12.6.4 (The for-in statement):</p><blockquote><p>The mechanics and order of enumerating the properties [...] is not specified.</p></blockquote></li></ul><p>However, if an implementation provides a consistent ordering, it must do so in all relevant situations:</p><ul><li><p>Section 15.2.3.7 (Object.defineProperties):</p><blockquote><p>If an implementation defines a specific order of enumeration for the for-in statement, that same enumeration order must be used to order the list elements in step 3 of this algorithm.</p></blockquote></li><li><p>Section 15.2.3.14 (Object.keys):</p><blockquote><p>If an implementation defines a specific order of enumeration for the for-in statement, that same enumeration order must be used in step 5 of this algorithm.</p></blockquote></li></ul><p>As a side note, E5 defines a specific meaning for a &quot;sparse&quot; array in Section 15.4: an array is sparse essentially if it contains one or more &quot;undefined&quot; values in the range [0,length-1]. The &quot;sparse&quot; term used occasionally in the Duktape implementation is unfortunately slightly different (sparse enough to cause array part to be abandoned).</p><h2 id="rhino-1-7-release-2-2010-02-06" tabindex="-1">Rhino 1.7 release 2 2010 02 06 <a class="header-anchor" href="#rhino-1-7-release-2-2010-02-06" aria-label="Permalink to &quot;Rhino 1.7 release 2 2010 02 06&quot;">​</a></h2><h3 id="for-objects-no-prototype" tabindex="-1">For objects (no prototype) <a class="header-anchor" href="#for-objects-no-prototype" aria-label="Permalink to &quot;For objects (no prototype)&quot;">​</a></h3><pre><code>js&gt; var x = {};
    x.foo = 1;
    x.bar = 1;
    x[0] = 1;
    x.quux = 1;
    x[3] = 1;
    x[1] = 1;
    x.foo = 2;
    for (var i in x) { print(i); }
foo
bar
0
quux
3
1
</code></pre><p>The behavior is consistent: all keys (including array indices) are returned in the order in which they are first defined. If a key is deleted and re-added, its enumeration order changes:</p><pre><code>js&gt; var x = {};
    x.foo = 1;
    x.bar = 1;
    for (var i in x) { print(i); };
foo
bar
js&gt; delete x.foo;
    x.foo = 1;
    for (var i in x) { print(i); };
bar
foo
</code></pre><h3 id="for-arrays-no-prototype" tabindex="-1">For arrays (no prototype) <a class="header-anchor" href="#for-arrays-no-prototype" aria-label="Permalink to &quot;For arrays (no prototype)&quot;">​</a></h3><pre><code>js&gt; var x = [];
    x.foo = 1;
    x[0] = 1;
    x[3] = 1;
    x[1] = 1;
    x.bar = 1;
    for (var i in x) { print(i); };
0
1
3
foo
bar
</code></pre><p>For small, dense arrays, the behavior is consistent: array keys (with defined values) are enumerated first, followed by keys in definition order.</p><p>However, this behavior breaks down with sparse arrays:</p><pre><code>// still OK
js&gt; var x = [];
    x.foo = 1;
    x[0] = 1;
    x[8] = 1;
    x[5] = 1;
    x.bar = 1;
    for (var i in x) { print(i); };
0
5
8
foo
bar

// 1000 appears after keys
js&gt; x[1000] = 1;
    for (var i in x) { print(i); };
0
5
8
foo
bar
1000

// ... and is also followed by a newly defined key
js&gt; x.quux = 1;
    for (var i in x) { print(i); };
0
5
8
foo
bar
1000
quux

// here &#39;9&#39; is higher than last well-behaving index (8) but still
// enumerates before string keys -- while &#39;10&#39; enumerates like
// a string key
js&gt; x[10] = 1; x[9] = 1; for (var i in x) { print(i); };
0
5
8
9
foo
bar
1000
quux
10
</code></pre><h3 id="objects-with-prototype" tabindex="-1">Objects (with prototype) <a class="header-anchor" href="#objects-with-prototype" aria-label="Permalink to &quot;Objects (with prototype)&quot;">​</a></h3><p>One prototype level:</p><pre><code>js&gt; function F() { }
    F.prototype = { foo: 1, bar: 1 };
    x = new F();
    x.abc = 1;
    x.quux = 1;
    for (var i in x) { print(i); }
abc
quux
foo
bar
</code></pre><p>Object&#39;s keys are enumerated first, then prototype&#39;s keys. Prototype keys with same name as properties of the object are not enumerated:</p><pre><code>js&gt; function F() { }
    F.prototype = { foo: 1, bar: 1 };
    x = new F();
    x.quux = 1;
    x.foo = 1;
    x.xyz = 1;
    for (var i in x) { print(i); }
quux
foo
xyz
bar
</code></pre><p>Here <code>foo</code> is not enumerated again because it was already enumerated as part of the object&#39;s keys.</p><h3 id="object-with-an-array-prototype" tabindex="-1">Object with an Array prototype <a class="header-anchor" href="#object-with-an-array-prototype" aria-label="Permalink to &quot;Object with an Array prototype&quot;">​</a></h3><pre><code>// test 1
js&gt; function F() { }
    F.prototype = [1,2,3];
    x = new F();
    print(&quot;length: &quot; + x.length);
    for (var i in x) { print(i); }
length: 3
0
1
2

// test 2
js&gt; x[1] = 9;
    print(&quot;length: &quot; + x.length);
    for (var i in x) { print(i); }
length: 3
1
0
2

// test 3
js&gt; x.length = 2;  // sets enumerable own property &#39;length&#39;
    print(&quot;length: &quot; + x.length);
    for (var i in x) { print(i); }
length: 2
1
length
0
2

// test 4
js&gt; x[10] = 10;
    print(&quot;length: &quot; + x.length);
    for (var i in x) { print(i); }
length: 2
1
length
10
0
2
</code></pre><p>Test 1 demonstrates enumeration of an empty object whose prototype is an array of three elements. Enumeration lists the prototype keys (&quot;0&quot;, &quot;1&quot;, &quot;2&quot;).</p><p>Test 2 shows that object enumeration comes first (&quot;1&quot;) followed by prototype keys not &quot;shadowed&quot; by object keys (&quot;0&quot;, &quot;2&quot;; &quot;1&quot; is shadowed).</p><p>Test 3 shows that even though the object itself is forced to be of length 2, prototype enumeration still lists all keys of the prototype, including &quot;2&quot; which is beyond the array length.</p><p>Test 4 shows that &#39;length&#39; is not exotic for an object which has an array as a prototype. Exotic semantics of &#39;length&#39; do not apply to the object because the property write goes to the object, which is not an array. This also explains the result of test 3.</p>`,42)]))}const m=t(a,[["render",i]]);export{u as __pageData,m as default};
