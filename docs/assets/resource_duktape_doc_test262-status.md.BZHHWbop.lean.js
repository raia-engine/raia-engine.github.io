import{_ as r,c as n,a2 as a,j as e,a as o,o as s}from"./chunks/framework.DzmM640o.js";const m=JSON.parse('{"title":"Status of test262 testcases","description":"","frontmatter":{},"headers":[],"relativePath":"resource/duktape/doc/test262-status.md","filePath":"resource/duktape/doc/test262-status.md","lastUpdated":1732350347000}'),i={name:"resource/duktape/doc/test262-status.md"};function c(d,t,l,h,p,u){return s(),n("div",null,t[0]||(t[0]=[a(`<h1 id="status-of-test262-testcases" tabindex="-1">Status of test262 testcases <a class="header-anchor" href="#status-of-test262-testcases" aria-label="Permalink to &quot;Status of test262 testcases&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>Test262 provides testcases for various ECMAScript features. It also includes features and behavior beyond E5/E5.1 standard (for instance the tests related to the <code>Intl</code> module and E6).</p><p>This document summarizes the currently failing testcases and why they fail. The test run was executed against:</p><pre><code>595a36b252ee97110724e6fa89fc92c9aa9a206a.zip
</code></pre><p>A full list of known bugs is documented in:</p><pre><code>test262-known-issues.yaml
</code></pre><p>This file describes a subset of test cases whose reasons for failure require a longer explanation.</p><h2 id="summary-of-failure-reasons" tabindex="-1">Summary of failure reasons <a class="header-anchor" href="#summary-of-failure-reasons" aria-label="Permalink to &quot;Summary of failure reasons&quot;">​</a></h2><p>In addition to unfixed bugs, the following reasons cause some test262 test cases to fail:</p><ul><li>Anything under <code>intl402</code> fails as Duktape does not provide the <code>Intl</code> object which is not part of E5/E5.1. Same for <code>es6</code>, which tests for E6 features.</li><li>Duktape has internal limitations for arrays exceeding 2G or 4G entries (even sparse ones, the limitations related to the indices). These cause some array tests to fail.</li><li>Duktape does not provice <code>RegExp.prototype.compile</code> which is not part of E5/E5.1.</li><li>Duktape follows the E5.1 regexp syntax strictly (except for allowing the <code>\\$</code> identity escape). Some things that fail in test cases: <ul><li>invalid backreferences (e.g. <code>/\\1/</code>)</li><li>invalid identity escapes (e.g. <code>/\\a/</code>)</li><li>invalid decimal escapes in character classes (e.g. <code>[\\12-\\14]</code>)</li><li>special characters appearing literally without escape (e.g. <code>]</code>)</li></ul></li><li>Duktape has a conservative limit on the C recursion required to execute regexps. This limit can cause several test cases to fail.</li><li>When an empty quantifier is being matched with a quantifier such as <code>+</code>, Duktape may now get stuck and match the empty quantified over and over (it should match the quantified a minimum number of times and then continue). To protect against infinite loop, Duktape eventually bails out with a RangeError.</li><li>Duktape does not support specific locales, which affect e.g. case conversion and locale sensitive string comparison. <code>String.prototype.localeCompare()</code> is the same as an ordinary compare which breaks e.g. ch15/15.5/15.5.4/15.5.4.9/15.5.4.9_CE: <code>&quot;\\u006f\\u0308&quot;</code> is considered different from <code>&quot;\\u00f6&quot;</code> (precomposed).</li><li>Duktape allows octal syntax. There is a test case which requires that <code>parseInt()</code> should not accept octal syntax; this test case fails.</li><li>An enumeration corner case test (ch12/12.6/12.6.4/12.6.4-2) currently fails, see <code>test-bug-enum-shadow-nonenumerable.js</code>.</li><li>There seem to be several bugs in the Date testcases of test262 (see detailed error description).</li><li>Duktape now allows non-standard function declaration outside Program or FunctionBody top level (such statements are technically not part of E5/E5.1). Unfortunately the semantics for these differ from engine to engine; Duktape uses the V8 semantics of &quot;hoisting&quot; the definition so that the function has only access to the top level variable scope. Although test262 test cases do have non-standard function declarations (outside top level), they seem to be compatible with the V8 semantics and no known issues remain.</li></ul><h2 id="notes-on-individual-errors" tabindex="-1">Notes on individual errors <a class="header-anchor" href="#notes-on-individual-errors" aria-label="Permalink to &quot;Notes on individual errors&quot;">​</a></h2><p>Some notes on individual errors. This list is not exhaustive.</p><h3 id="annexb-b-regexp-prototype-compile" tabindex="-1">annexB/B.RegExp.prototype.compile <a class="header-anchor" href="#annexb-b-regexp-prototype-compile" aria-label="Permalink to &quot;annexB/B.RegExp.prototype.compile&quot;">​</a></h3><p>Same failure in strict and non-strict modes:</p><pre><code>=== annexB/B.RegExp.prototype.compile failed in non-strict mode ===
--- errors ---
TypeError: invalid base reference for property read
        duk_hobject_props.c:1694
        testcase /tmp/test262-T1pW1o.js:2217
        runTestCase /tmp/test262-T1pW1o.js:901
        global /tmp/test262-T1pW1o.js:2059 preventsyield
===
</code></pre><p>The E5/E5.1 specification does not include a <code>RegExp.prototype.compile()</code>, so this testcase should actually fail.</p><h3 id="ch07-7-8-7-8-5-s7-8-5-a1-4-t1" tabindex="-1">ch07/7.8/7.8.5/S7.8.5_A1.4_T1 <a class="header-anchor" href="#ch07-7-8-7-8-5-s7-8-5-a1-4-t1" aria-label="Permalink to &quot;ch07/7.8/7.8.5/S7.8.5_A1.4_T1&quot;">​</a></h3><p>Same failure in strict and non-strict modes:</p><pre><code>=== ch07/7.8/7.8.5/S7.8.5_A1.4_T1 failed in non-strict mode ===
--- errors ---
SyntaxError: invalid backreference(s) (line 2216)
        duk_regexp_compiler.c:889
===
</code></pre><p>The test case uses a RegExp of the form <code>/\\1/</code>. Based on E5.1 Section 15.10.2.9 this form is invalid (V8 and Rhino allow these broken regexps though):</p><blockquote><p>NOTE An escape sequence of the form followed by a nonzero decimal number n matches the result of the nth set of capturing parentheses (see 15.10.2.11). It is an error if the regular expression has fewer than n capturing parentheses. If the regular expression has n or more capturing parentheses but the nth one is undefined because it has not captured anything, then the backreference always succeeds.</p></blockquote><p>If you comment out the offending regexp, the test case then fails with the following in response to an invalid RegExp <code>/\\a/</code> (again, accepted by V8 and Rhino):</p><pre><code>SyntaxError: invalid regexp escape (line 2221)
        duk_lexer.c:1551
</code></pre><p>This RegExp is invalid because &quot;a&quot; is not allowed as an identity escape. E5.1 Section 15.10.1:</p><pre><code>IdentityEscape ::
  SourceCharacter but not IdentifierPart
  &lt;ZWJ&gt;
  &lt;ZWNJ&gt;
</code></pre><p>Because &quot;a&quot; belongs to IdentifierPart, it is an invalid identity escape. Because it doesn&#39;t match any other alternatives for an AtomEscape either, it should cause a SyntaxError.</p><p>Commenting out the <code>/\\a/</code> regexp, the test case finishes.</p><p>This test case is a bit dubious anyway, because it asserts that a RegExp <code>source</code> property should have a specific form. E5.1 Section 15.10.4.1:</p><blockquote><p>Let S be a String in the form of a Pattern equivalent to P, in which certain characters are escaped as described below. S may or may not be identical to P or pattern; however, the internal procedure that would result from evaluating S as a Pattern must behave identically to the internal procedure given by the constructed object&#39;s [[Match]] internal property.</p></blockquote><p>So, for instance, it would be compliant to have a regexp <code>/x/</code> with a <code>source</code> property of either <code>x</code> or <code>\\u0078</code> or even <code>(?:\\u0078){1}</code>.</p><h3 id="ch07-7-8-7-8-5-s7-8-5-a1-4-t2" tabindex="-1">ch07/7.8/7.8.5/S7.8.5_A1.4_T2 <a class="header-anchor" href="#ch07-7-8-7-8-5-s7-8-5-a1-4-t2" aria-label="Permalink to &quot;ch07/7.8/7.8.5/S7.8.5_A1.4_T2&quot;">​</a></h3><p>Same failure in strict and non-strict modes:</p><pre><code>=== ch07/7.8/7.8.5/S7.8.5_A1.4_T2 failed in non-strict mode ===
--- errors ---
Test262 Error: #0031
===
</code></pre><p>This is caused by trying to eval the regexp <code>/\\1/</code>, which contains a SyntaxError (invalid back-reference, see above).</p><h3 id="ch12-12-6-12-6-4-12-6-4-2" tabindex="-1">ch12/12.6/12.6.4/12.6.4-2 <a class="header-anchor" href="#ch12-12-6-12-6-4-12-6-4-2" aria-label="Permalink to &quot;ch12/12.6/12.6.4/12.6.4-2&quot;">​</a></h3><p>Enumeration corner case issue, see <code>test-bug-enum-shadow-nonenumerable.js</code>.</p><h3 id="ch15-15-1-15-1-2-15-1-2-2-s15-1-2-2-a5-1-t1" tabindex="-1">ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A5.1_T1 <a class="header-anchor" href="#ch15-15-1-15-1-2-15-1-2-2-s15-1-2-2-a5-1-t1" aria-label="Permalink to &quot;ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A5.1_T1&quot;">​</a></h3><pre><code>=== ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A5.1_T1 failed in non-strict mode ===
--- errors ---
Test262 Error: parseInt should no longer accept octal
===
</code></pre><p>Duktape <code>parseInt()</code> accepts octal:</p><pre><code>duk&gt; parseInt(&#39;077&#39;)
= 63
</code></pre><p>This matches Rhino and V8 behavior.</p><h3 id="ch15-15-10-15-10-2-s15-10-2-a1-t1" tabindex="-1">ch15/15.10/15.10.2/S15.10.2_A1_T1 <a class="header-anchor" href="#ch15-15-10-15-10-2-s15-10-2-a1-t1" aria-label="Permalink to &quot;ch15/15.10/15.10.2/S15.10.2_A1_T1&quot;">​</a></h3><pre><code>=== ch15/15.10/15.10.2/S15.10.2_A1_T1 failed in non-strict mode ===
--- errors ---
Test262 Error: #4: XML Shallow Parsing with Regular Expression: [^]]*]([^]]+])*]+
===
</code></pre><p>First error happens with index 4 into the regexp set, the precise error is:</p><pre><code>SyntaxError: invalid regexp character
        duk_lexer.c:1598
        RegExp (null) native strict construct preventsyield
        global /tmp/foo.js:2285 preventsyield
</code></pre><p>The character class <code>[^]]</code> contains an unescaped <code>]</code> (probably <code>[^\\]]</code> was intended, so it gets parsed as a character class <code>[^]</code> followed by a literal, unescaped <code>]</code> which is a SyntaxError. There are two other instances like this in the test case.</p><h3 id="ch15-15-10-15-10-2-15-10-2-5-s15-10-2-5-a1-t5" tabindex="-1">ch15/15.10/15.10.2/15.10.2.5/S15.10.2.5_A1_T5 <a class="header-anchor" href="#ch15-15-10-15-10-2-15-10-2-5-s15-10-2-5-a1-t5" aria-label="Permalink to &quot;ch15/15.10/15.10.2/15.10.2.5/S15.10.2.5_A1_T5&quot;">​</a></h3><pre><code>=== ch15/15.10/15.10.2/15.10.2.5/S15.10.2.5_A1_T5 failed in non-strict mode ===
--- errors ---
RangeError: regexp executor recursion limit
        duk_regexp_executor.c:145
        exec (null) native strict preventsyield
        global /tmp/test262-yJCwFh.js:2215 preventsyield
===
</code></pre><p>Duktape bug: matching <code>/(a*)b\\1+/</code> against <code>&quot;baaaac&quot;</code> first matches an empty string to capture group 1, then matches a &quot;b&quot;, and finally ends up matching the empty string with a <code>+</code> quantifier. Duktape doesn&#39;t currently always handle empty quantified expressions correctly, so it gets stuck and bails out eventually with a RangeError. See test-regexp-empty-quantified.js.</p><h3 id="ch15-15-10-15-10-2-15-10-2-9-s15-10-2-9-a1-t5" tabindex="-1">ch15/15.10/15.10.2/15.10.2.9/S15.10.2.9_A1_T5 <a class="header-anchor" href="#ch15-15-10-15-10-2-15-10-2-9-s15-10-2-9-a1-t5" aria-label="Permalink to &quot;ch15/15.10/15.10.2/15.10.2.9/S15.10.2.9_A1_T5&quot;">​</a></h3><p>Same cause as: ch15/15.10/15.10.2/15.10.2.5/S15.10.2.5_A1_T5.</p><h3 id="ch15-15-10-15-10-2-15-10-2-10-s15-10-2-10-a2-1-t3" tabindex="-1">ch15/15.10/15.10.2/15.10.2.10/S15.10.2.10_A2.1_T3 <a class="header-anchor" href="#ch15-15-10-15-10-2-15-10-2-10-s15-10-2-10-a2-1-t3" aria-label="Permalink to &quot;ch15/15.10/15.10.2/15.10.2.10/S15.10.2.10_A2.1_T3&quot;">​</a></h3><pre><code>=== ch15/15.10/15.10.2/15.10.2.10/S15.10.2.10_A2.1_T3 failed in non-strict mode ===
--- errors ---
SyntaxError: invalid regexp control escape
        duk_lexer.c:1492
        RegExp (null) native strict construct preventsyield
        global /tmp/test262-heB_na.js:2219 preventsyield
===
</code></pre><p>This test case does e.g.:</p><pre><code>for (alpha = 0x0410; alpha &lt;= 0x042F; alpha++) {
  str = String.fromCharCode(alpha % 32);
  arr = (new RegExp(&quot;\\\\c&quot; + String.fromCharCode(alpha))).exec(str);
  // ...
}
</code></pre><p>The syntax error comes from parsing a RegExp <code>\\cX</code> where <code>X</code> is a non-ASCII character (e.g. U+0410 and onwards). This is clearly not allowed by the RegExp syntax in E5.1 Section 15.10.1 (see CharacterEscape and ControlLetter productions).</p><h3 id="ch15-15-10-15-10-2-15-10-2-10-s15-10-2-10-a5-1-t1" tabindex="-1">ch15/15.10/15.10.2/15.10.2.10/S15.10.2.10_A5.1_T1 <a class="header-anchor" href="#ch15-15-10-15-10-2-15-10-2-10-s15-10-2-10-a5-1-t1" aria-label="Permalink to &quot;ch15/15.10/15.10.2/15.10.2.10/S15.10.2.10_A5.1_T1&quot;">​</a></h3><pre><code>=== ch15/15.10/15.10.2/15.10.2.10/S15.10.2.10_A5.1_T1 failed in non-strict mode ===
--- errors ---
SyntaxError: decode error
        duk_lexer.c:404
        RegExp (null) native strict construct preventsyield
        global /tmp/test262-4ZVGcj.js:2220 preventsyield
===
</code></pre><p>There seems to be a test case error:</p><pre><code>var non_ident = &quot;~\`!@#$%^&amp;*()-+={[}]|\\\\:;&#39;&lt;,&gt;./?&quot; + &#39;&quot;&#39;;
var k = -1;
do {
   k++;
   print(&quot;\\\\&quot; + non_ident[k], &quot;g&quot;)
   arr = new RegExp(&quot;\\\\&quot; + non_ident[k], &quot;g&quot;).exec(non_ident);
} while ((arr !== null) &amp;&amp; (arr[0] === non_ident[k]))
</code></pre><p>The loop works correctly until <code>k</code> points outside the <code>non_ident</code> array. The loop then tries to create a regexp with:</p><pre><code>new RegExp(&quot;\\\\&quot; + undefined, &quot;g&quot;);
</code></pre><p>The RegExp input will be <code>\\undefined</code> which contains an invalid Unicode escape, causing the SyntaxError from Duktape. There is no valid way of parsing <code>\\u</code> in a regexp. Note that <code>\\u</code> is not allowed as an identity escape (IdentityEscape explicitly rejects IdentifierPart characters), and there are no other rules allowing it either.</p><h3 id="ch15-15-10-15-10-2-15-10-2-13-s15-10-2-13-a1-t16" tabindex="-1">ch15/15.10/15.10.2/15.10.2.13/S15.10.2.13_A1_T16 <a class="header-anchor" href="#ch15-15-10-15-10-2-15-10-2-13-s15-10-2-13-a1-t16" aria-label="Permalink to &quot;ch15/15.10/15.10.2/15.10.2.13/S15.10.2.13_A1_T16&quot;">​</a></h3><pre><code>=== ch15/15.10/15.10.2/15.10.2.13/S15.10.2.13_A1_T16 failed in non-strict mode ===
--- errors ---
SyntaxError: invalid decimal escape (line 2215)
        duk_lexer.c:1786
===
</code></pre><p>The SyntaxError is caused by:</p><pre><code>__executed = /[\\d][\\12-\\14]{1,}[^\\d]/.exec(&quot;line1\\n\\n\\n\\n\\nline2&quot;);
</code></pre><p>Here, a <code>\\12</code> DecimalEscape occurs inside a character class. The DecimalEscape evaluates to the integer 12 (see E5.1 Section 15.10.2.11, step 3). Then, the ClassEscape throws a SyntaxError; see E5.1 Section 15.10.2.19 steps 1-2:</p><pre><code>1. Evaluate DecimalEscape to obtain an EscapeValue E.

2. If E is not a character then throw a SyntaxError exception.
</code></pre><h3 id="ch15-15-10-15-10-2-15-10-2-6-s15-10-2-6-a4-t7" tabindex="-1">ch15/15.10/15.10.2/15.10.2.6/S15.10.2.6_A4_T7 <a class="header-anchor" href="#ch15-15-10-15-10-2-15-10-2-6-s15-10-2-6-a4-t7" aria-label="Permalink to &quot;ch15/15.10/15.10.2/15.10.2.6/S15.10.2.6_A4_T7&quot;">​</a></h3><p>A SyntaxError occurs with the RegExp:</p><pre><code>__executed = /\\B\\[^z]{4}\\B/.test(&quot;devil arise\\tforzzx\\nevils&quot;);
</code></pre><p>The <code>\\[</code> is accepted as an identity escape, which then leads to SyntaxError because none of <code>^</code>, <code>]</code>, <code>{</code>, or <code>}</code> are accepted unescaped by E5.1 (see PatternCharacter production).</p><p>The point of the testcase is probably to test that <code>\\[</code> is not evaluated as <code>[</code>. If the escape is removed, the RegExp matches with the result <code>&quot;il a&quot;</code> with both Duktape and Rhino. This causes a test case failure, the test case is expected not to match.</p><p>If the invalid characters are escaped, the test case passes:</p><pre><code>__executed = /\\B\\[\\^z\\]\\{4\\}\\B/.test(&quot;devil arise\\tforzzx\\nevils&quot;);
</code></pre><h3 id="ch15-15-4-15-4-4-15-4-4-10-s15-4-4-10-a3-t3" tabindex="-1">ch15/15.4/15.4.4/15.4.4.10/S15.4.4.10_A3_T3 <a class="header-anchor" href="#ch15-15-4-15-4-4-15-4-4-10-s15-4-4-10-a3-t3" aria-label="Permalink to &quot;ch15/15.4/15.4.4/15.4.4.10/S15.4.4.10_A3_T3&quot;">​</a></h3><pre><code>=== ch15/15.4/15.4.4/15.4.4.10/S15.4.4.10_A3_T3 failed in non-strict mode ===
--- errors ---
Test262 Error: #1: var obj = {}; obj.slice = Array.prototype.slice; obj[4294967294] = &quot;x&quot;; obj.length = 4294967295; var arr = obj.slice(4294967294,4294967295); arr.length === 1. Actual: 0
===
</code></pre><p>This bug is probably caused by C typing related to array length handling. Arrays over 2G elements long will probably have such issues. There are several similar failing test cases, e.g.:</p><ul><li>ch15/15.4/15.4.4/15.4.4.12/S15.4.4.12_A3_T3</li><li>ch15/15.4/15.4.4/15.4.4.14/15.4.4.14-9-9</li><li>ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-5-12</li><li>ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-5-16</li><li>ch15/15.4/15.4.4/15.4.4.15/15.4.4.15-8-9</li></ul><p>Fortunately these don&#39;t have much real world relevance.</p><h3 id="ch15-15-5-15-5-4-15-5-4-7-s15-5-4-7-a1-t11" tabindex="-1">ch15/15.5/15.5.4/15.5.4.7/S15.5.4.7_A1_T11 <a class="header-anchor" href="#ch15-15-5-15-5-4-15-5-4-7-s15-5-4-7-a1-t11" aria-label="Permalink to &quot;ch15/15.5/15.5.4/15.5.4.7/S15.5.4.7_A1_T11&quot;">​</a></h3><pre><code>=== ch15/15.5/15.5.4/15.5.4.7/S15.5.4.7_A1_T11 failed in non-strict mode ===
--- errors ---
Test262 Error: #1: __instance = new Date(0); __instance.indexOf = String.prototype.indexOf;  (__instance.getTimezoneOffset()&gt;0 ? __instance.indexOf(&#39;31&#39;) : __instance.indexOf(&#39;01&#39;)) === 8. Actual: 5
===
</code></pre><p>The test case relies on the <code>toString()</code> coercion of a Date instance. For instance, Rhino formats the <code>__instance</code> as:</p><pre><code>Thu Jan 01 1970 02:00:00 GMT+0200 (EET)
</code></pre><p>The index for &quot;01&quot; here is 8. Note that this format is locale and platform specific so the test case is not reliable. Duktape uses ISO 8601 also for <code>toString()</code>:</p><pre><code>1970-01-01 02:00:00.000+02:00
</code></pre><p>Here the index for &quot;01&quot; is 5, which causes a test case failure.</p>`,89),e("h3",{id:"ch15-15-9-15-9-3-s15-9-3-1-a5",tabindex:"-1"},[o("ch15/15.9/15.9.3/"),e("a",{href:"./.html","T1,T2,T3,T4,T5,T6":""},"S15.9.3.1_A5"),o(),e("a",{class:"header-anchor",href:"#ch15-15-9-15-9-3-s15-9-3-1-a5","aria-label":'Permalink to "ch15/15.9/15.9.3/[S15.9.3.1_A5](){T1,T2,T3,T4,T5,T6}"'},"​")],-1),a(`<p>These tests fail with:</p><pre><code>=== ch15/15.9/15.9.3/S15.9.3.1_A5_T1 failed in non-strict mode ===
--- errors ---
Test262 Error: #1: Incorrect value of Date
===
</code></pre><p>There seem to be incorrect comparison values for the Dates. For example, in T6:</p><pre><code>if (-2208960000001 !== new Date(1899, 11, 31, 23, 59, 59, 999).valueOf()) {
  $FAIL(&quot;#1: Incorrect value of Date&quot;);
}
</code></pre><p>The date expression yields <code>-2208996000001</code> in both Rhino and V8, so the test case is probably incorrect (there is a missing <code>9</code> digit and extra <code>0</code> digit)). There are similar issues in test 2 and 3 too. Test 4 also seems incorrect:</p><pre><code>if (28799999 !== new Date(1969, 11, 31, 23, 59, 59, 999).valueOf()) {
  $FAIL(&quot;#4: Incorrect value of Date&quot;);
}
</code></pre><p>Because Jan 1, 1970 is the &quot;zero point&quot;, all dates before that will have negative time values, so the test case is obviously incorrect. Rhino and V8 agree, returning <code>-7200001</code> for the expression.</p><p>All of these test cases also fail with Rhino, and the errors seem to be in the comparison values of the test case.</p>`,8)]))}const g=r(i,[["render",c]]);export{m as __pageData,g as default};
