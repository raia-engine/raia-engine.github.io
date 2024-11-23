import{_ as t,c as s,a2 as a,o}from"./chunks/framework.DPuwY6B9.js";const h=JSON.parse('{"title":"Testcases","description":"","frontmatter":{},"headers":[],"relativePath":"resource/duktape/doc/testcases.md","filePath":"resource/duktape/doc/testcases.md","lastUpdated":1732350347000}'),n={name:"resource/duktape/doc/testcases.md"};function r(i,e,c,d,l,p){return o(),s("div",null,e[0]||(e[0]=[a(`<h1 id="testcases" tabindex="-1">Testcases <a class="header-anchor" href="#testcases" aria-label="Permalink to &quot;Testcases&quot;">​</a></h1><p>There are two main testcase sets for Duktape:</p><ul><li>ECMAScript testcases (<code>tests/ecmascript</code>) for testing ECMAScript compliance, &quot;real world&quot; behavior, and Duktape specific behavior.</li><li>API testcases (<code>tests/api</code>) for testing the Duktape specific C API.</li></ul><p>Testcases are written using an &quot;expected string&quot; approach: a testcase file describes the expected output using a custom markup (described below) and also contains the ECMAScript or C code that is intended to produce that output. A test runner compares actual output to expected; known issue files are used to document &quot;known bad&quot; outputs.</p><p>This document describes the testcase formats and current test tools.</p><h2 id="ecmascript-testcase-format" tabindex="-1">ECMAScript testcase format <a class="header-anchor" href="#ecmascript-testcase-format" aria-label="Permalink to &quot;ECMAScript testcase format&quot;">​</a></h2><p>Testcases are plain ECMAScript (<code>.js</code>) files with custom markup inside comments for providing test metadata, expected output, and include files. A testcase is &quot;prepared&quot; before execution using <code>util/runtest.py</code>:</p><ul><li>Testcase metadata and expected string are parsed from inside custom markup.</li><li>A minified prologue is injected to provide a global <code>Test</code> object. The prologue also harmonizes the execution environment so that e.g. <code>print()</code> and <code>console.log()</code> are available so that the prepared test can be executed using Duktape, V8, etc.</li><li>Include files are located, minified, and included into the prepared test. All utilities included must work in both strict and non-strict contexts because testcases may be either strict or non-strict programs.</li><li>A <code>&quot;use strict&quot;;</code> declaration is prepended (even before the prologue) if test metadata indicates it is needed. This is needed when the testcase is exercising strict program code behavior.</li></ul><p>The prologue and include files are minified to one-liners so that they don&#39;t offset the line numbers of the testcase. This is important for tests that exercise traceback line numbers for example.</p><p>Include files are specified using the following syntax:</p><pre><code>/*@include util-buffer.js@*/
</code></pre><p>Testcase metadata is provided as JSON or YAML inside a comment block. If multiple blocks are present they are merged, with the last occurrence of a key overwriting previous occurrences:</p><pre><code>/*---
{
    &quot;custom&quot;: true
}
---*/

// or

/*---
custom: true
---*/
</code></pre><p>The metadata keys change over time; current keys are described below. Metadata is optional.</p><p>Finally, the expected output is specified using the following syntax:</p><pre><code>/*===
hello world
===*/

print(&#39;hello world&#39;);
</code></pre><p>There&#39;s also a single-line shorthand:</p><pre><code>print(&#39;hello world&#39;);  //&gt;hello world
</code></pre><p>Full testcase example:</p><pre><code>/*
 *  Example test.
 */

/*@include util-foo.js@*/

/*---
# Optional metadata is encoded in JSON or YAML.
slow: false
---*/

/*===
hello world
===*/

if (1) {
    print(&quot;hello world&quot;);   /* automatic newline */
} else {
    print(&quot;not quite&quot;);
}

/*===
second test
===*/

/* there can be multiple &quot;expected&quot; blocks (but only one metadata block) */
print(&quot;second test&quot;);

/* Shorthand can also be used. */
print(&quot;shorthand&quot;);  //&gt;shorthand
</code></pre><h2 id="ecmascript-testcase-metadata-keys" tabindex="-1">ECMAScript testcase metadata keys <a class="header-anchor" href="#ecmascript-testcase-metadata-keys" aria-label="Permalink to &quot;ECMAScript testcase metadata keys&quot;">​</a></h2><p>Metadata keys are added and removed as necessary so this list may be out-of-date; see <code>util/runtest.py</code> for current keys. All keys are optional:</p><hr><p>Key Description</p><hr><p>comment Optional string to comment on the testcase briefly.</p><p>slow If true, test is (very) slow and increased time limits may be necessary to avoid test timeouts.</p><p>skip If true, test is skipped without causing a test failure. Useful for unfinished tests and tests that need to be executed manually.</p><p>custom If true, some implementation dependent behavior is expected and comparison to other ECMAScript engines is not relevant. The behavior may either be entirely Duktape specific (e.g. relying on JX format) or specific behavior not required by the ECMAScript specification (e.g. additional enumeration guarantees).</p><p>nonstandard If true, expected behavior is not standards compliant but matches &quot;real world&quot; expectations.</p><p>endianness If set, indicates that the testcase requires a specific endianness, needed for e.g. some TypedArray testcases. Values: <code>little</code>, <code>big</code>, <code>mixed</code>.</p><p>use_strict Testcase is a strict mode program. When preparing the test, prepend a <code>&quot;use strict&quot;;</code> declaration as very first statement of the test, before the test prologue.</p><h2 id="intended-uncaught-testcase-intentionally-fails-by-throwing-anuncaught-error-which-may-even-be-a-syntaxerror-this-is-needed-to-test-some-program-levelbehavior" tabindex="-1">intended_uncaught Testcase intentionally fails by throwing an uncaught error (which may even be a SyntaxError). This is needed to test some program level behavior. <a class="header-anchor" href="#intended-uncaught-testcase-intentionally-fails-by-throwing-anuncaught-error-which-may-even-be-a-syntaxerror-this-is-needed-to-test-some-program-levelbehavior" aria-label="Permalink to &quot;intended_uncaught    Testcase intentionally fails by throwing an
                       uncaught error (which may even be a SyntaxError).
                       This is needed to test some program level
                       behavior.&quot;">​</a></h2><h2 id="ecmascript-testcase-known-issues" tabindex="-1">ECMAScript testcase known issues <a class="header-anchor" href="#ecmascript-testcase-known-issues" aria-label="Permalink to &quot;ECMAScript testcase known issues&quot;">​</a></h2><p>Sometimes testcases fail due to known bugs or environment specific differences such as endianness. Known issue files describe the &quot;known bad&quot; testcase output and describes the reason for the failure. This allows a failing test to be flagged as a &quot;known issue&quot; rather than a failure.</p><p>Known issue files have a YAML metadata block, followed by <code>---</code>, followed by the &quot;known bad&quot; verbatim testcase output:</p><pre><code>summary: wurld is printed instead of world
---
hello wurld
</code></pre><p>The &quot;known bad&quot; output can also be provided as an MD5 hash which is useful if the full output is very large and uninteresting:</p><pre><code>summary: wurld is printed instead of world
md5: 49a9895803ec23a6b41dd346c32203b7
</code></pre><p>Each known issue file describes a single known failure for a specific testcase. A certain testcase may have several known issue files, for different Duktape versions, different config options, different environments, etc. The current naming convention is just a numbered sequence based on the testcase name:</p><pre><code># For test-dev-hello-world.js:
test-dev-hello-world-1.txt
test-dev-hello-world-2.txt
test-dev-hello-world-3.txt
...
</code></pre><h2 id="ecmascript-testcase-best-practices" tabindex="-1">ECMAScript testcase best practices <a class="header-anchor" href="#ecmascript-testcase-best-practices" aria-label="Permalink to &quot;ECMAScript testcase best practices&quot;">​</a></h2><h3 id="indentation" tabindex="-1">Indentation <a class="header-anchor" href="#indentation" aria-label="Permalink to &quot;Indentation&quot;">​</a></h3><p>Indent with 4 spaces, no tabs.</p><h3 id="verifying-exception-type" tabindex="-1">Verifying exception type <a class="header-anchor" href="#verifying-exception-type" aria-label="Permalink to &quot;Verifying exception type&quot;">​</a></h3><p>Since ECMAScript doesn&#39;t require specific error messages for errors thrown, the messages should not be inspected or printed out in test cases. ECMAScript does require specific error types though (such as <code>TypeError</code>. These can be verified by printing the <code>name</code> property of an error object.</p><p>For instance:</p><pre><code>try {
    null.foo = 1;
} catch (e) {
    print(e.name);
}
</code></pre><p>prints:</p><pre><code>TypeError
</code></pre><p>When an error is not supposed to occur in a successful test run, the exception message can (and should) be printed, as it makes it easier to resolve a failing testcase. This can be done most easily as:</p><pre><code>try {
    null.foo = 1;
} catch (e) {
    print(e.stack || e);
}
</code></pre><p>This is portable and prints a stack trace when available.</p><h3 id="printing-tracebacks-pointers-etc" tabindex="-1">Printing tracebacks, pointers, etc <a class="header-anchor" href="#printing-tracebacks-pointers-etc" aria-label="Permalink to &quot;Printing tracebacks, pointers, etc&quot;">​</a></h3><p>While it should be generally avoided, in some testcases it&#39;s necessary to print out tracebacks, JX-serialize pointers, etc. When doing so:</p><ul><li>Replace filenames and line numbers in tracebacks with e.g. <code>FILE:LINE</code>. Otherwise the test output will include temporary file names and it won&#39;t be possible to describe a stable expected output.</li><li>Replace pointers with e.g. <code>PTR</code>. Pointer format is platform dependent and can include <code>0x12345678</code>, <code>0x123456789abcdef</code>, and <code>12345678</code>.</li></ul><p>There are utility includes to perform these replacements.</p><h2 id="api-testcase-format" tabindex="-1">API testcase format <a class="header-anchor" href="#api-testcase-format" aria-label="Permalink to &quot;API testcase format&quot;">​</a></h2><p>Testcase files are C files with a <code>test()</code> function. The test function gets as its argument an already initialized <code>duk_context *</code> and print out text to <code>stdout</code>. The testcase can assume <code>duktape.h</code> and common headers like <code>stdio.h</code> have been included. There are also some predefined macros (like <code>TEST_SAFE_CALL()</code> and <code>TEST_PCALL()</code>) to minimize duplication in testcase code.</p><p>Expected output and metadata is defined as for ECMAScript testcases. However, the expected output shorthand syntax (<code>//&gt;output</code>) cannot be used because it&#39;s not portable C89.</p><p>Example:</p><pre><code>/*===
Hello world from ECMAScript!
Hello world from C!
===*/

void test(duk_context *ctx) {
    duk_push_string(&quot;print(&#39;Hello world from ECMAScript!&#39;);&quot;);
    duk_eval(ctx);
    printf(&quot;Hello world from C!\\n&quot;);
}
</code></pre><h2 id="api-testcase-known-issues" tabindex="-1">API testcase known issues <a class="header-anchor" href="#api-testcase-known-issues" aria-label="Permalink to &quot;API testcase known issues&quot;">​</a></h2><p>As for ECMAScript testcases, known issues are documented using known issue files providing the &quot;known bad&quot; output. The format is the same as for ECMAScript tests.</p><h2 id="test-tools" tabindex="-1">Test tools <a class="header-anchor" href="#test-tools" aria-label="Permalink to &quot;Test tools&quot;">​</a></h2><ul><li><code>util/runtest.py</code>: prepares and executes a single testcase, and prints out a readable result summary. Optionally writes JSON test result file, prepared testcase, and various other outputs to specified files. The tool can also be used to just prepare a test. The runtest.py tool can be used both manually and as part of running a test suite.</li><li><code>util/prep_test.py</code>: earlier version of <code>runtest.py</code>, used by runtests.js and likely be to deprecated.</li><li><code>runtests/runtests.js</code>: original Node.js based test runner which is likely to be rewritten as a Python program.</li><li><code>testrunner/</code>: distributed test runner jobs for GitHub commit/pull webhook tests. The testrunner client/server code is in its own repo <a href="https://github.com/svaarala/duktape-testrunner" target="_blank" rel="noreferrer">https://github.com/svaarala/duktape-testrunner</a>.</li></ul><h2 id="future-work" tabindex="-1">Future work <a class="header-anchor" href="#future-work" aria-label="Permalink to &quot;Future work&quot;">​</a></h2><ul><li>Put testcases in a directory hierarchy instead (<code>test/stmt/trycatch.js</code>), perhaps scales better (at the expense of adding hassle to e.g. grepping).</li></ul>`,68)]))}const m=t(n,[["render",r]]);export{h as __pageData,m as default};
