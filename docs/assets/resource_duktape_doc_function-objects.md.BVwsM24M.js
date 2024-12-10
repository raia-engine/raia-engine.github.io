import{_ as t,c as o,a2 as n,o as a}from"./chunks/framework.CKGreiRV.js";const f=JSON.parse('{"title":"関数テンプレートとインスタンスオブジェクト","description":"","frontmatter":{},"headers":[],"relativePath":"resource/duktape/doc/function-objects.md","filePath":"resource/duktape/doc/function-objects.md","lastUpdated":1732350347000}'),i={name:"resource/duktape/doc/function-objects.md"};function r(s,e,c,l,p,d){return a(),o("div",null,e[0]||(e[0]=[n(`<h1 id="関数テンプレートとインスタンスオブジェクト" tabindex="-1">関数テンプレートとインスタンスオブジェクト <a class="header-anchor" href="#関数テンプレートとインスタンスオブジェクト" aria-label="Permalink to &quot;関数テンプレートとインスタンスオブジェクト&quot;">​</a></h1><h2 id="テンプレートとインスタンスの違い" tabindex="-1">テンプレートとインスタンスの違い <a class="header-anchor" href="#テンプレートとインスタンスの違い" aria-label="Permalink to &quot;テンプレートとインスタンスの違い&quot;">​</a></h2><p><em>ファンクション・テンプレート</em>は、Duktape内部のECMAScript Functionオブジェクトです。関数テンプレートはユーザーコードに公開されず、具体的な周辺環境なしにコンパイルされた関数を表します。関数テンプレートは、すべての関数と内部関数に対してコンパイラによって作成されます。テンプレートは周囲の字句環境を持たないため、関数として呼び出すことはできません。</p><p>関数テンプレートは、新しいFunctionオブジェクトを作成し、テンプレートフィールドのほとんど（すべてではない）をFunctionオブジェクトにコピーし、外側の辞書環境のようなインスタンス固有のフィールドを適切に初期化することによって、具体的な<em>関数インスタンス</em>（<em>closure</em>とも呼ばれる）にインスタンス化されます。関数インスタンスは、関数のコンパイル結果や、内部関数が後で（CLOSURE命令で）インスタンス化されるときに作成されます。</p><p>この分離が必要なのは、ある関数テンプレートが、毎回異なる外部環境で複数回インスタンス化される可能性があるからです。次のようなことを考えてみましょう：</p><pre><code>function mkPrinter(str) {
  // inner function
  return function() { print(str); }
}

var p1 = mkPrinter(&quot;Hello world&quot;);
var p2 = mkPrinter(&quot;still here&quot;);
p1();
p2();
print(p1 === p2);  // =&gt; false
</code></pre><p>In this example:</p><ul><li>The <code>mkPrinter</code> function is first compiled into a function template and then immediately converted to a function instance. The function instance has the global environment as its outer environment. The instance is then associated with the <code>mkPrinter</code> property of the global object.</li><li>The inner function inside <code>mkPrinter</code> is represented by a function template stored as part of the <code>mkPrinter</code> function inner function table.</li><li>The <code>p1</code> and <code>p2</code> function objects are separate Function objects created by a CLOSURE instruction occurring in the bytecode of <code>mkPrinter</code>. They have their own properties and separate outer lexical environments, but shared the same bytecode, pc-to-line conversion data, etc. The outer lexical environment for <code>p1</code> and <code>p2</code> is the declarative environment created when <code>mkPrinter</code> was entered, and contains the <code>str</code> binding needed to print separate texts when <code>p1</code> and <code>p2</code> are called.</li></ul><p>A function instance does not reference a function template from a garbage collection point of view. The function template can be collected while the function instance remains reachable.</p><h2 id="properties-of-a-function-template" tabindex="-1">Properties of a function template <a class="header-anchor" href="#properties-of-a-function-template" aria-label="Permalink to &quot;Properties of a function template&quot;">​</a></h2><p>The E5 specification does not recognize a &quot;function template&quot;, so there are no standard properties for function templates. The properties can also change from release to release because they are not exposed to user code. The following properties are used:</p><hr><p>Property Description</p><hr><p><code>_Varmap</code> Maps register-bound variable names to their register numbers. Example: <code>{ arg1: 0, arg2: 1, myvar: 2 }</code>.</p><p><code>_Formals</code> An array of formal argument names. <code>formals.length</code> provides the number of formal arguments. Note that the number of formal arguments does not need to match function <code>nargs</code>: the function might access all args through the arguments object and have <code>nargs</code> set to zero. This property is used to initialize the arguments object (in non-strict code); the compiler should omit this whenever possible. Example: <code>[ &quot;arg1&quot;, &quot;arg2&quot; ]</code>.</p><p><code>name</code> Function name, set for function declarations and named function expressions. If DUK_HOBJECT_FLAG_NAMEBINDING is set, the value of this property is bound in the function&#39;s environment (used for named function expressions). Example: <code>&quot;func&quot;</code>.</p><p><code>fileName</code> Source filename (or equivalent). Used to add source file information to error objects and tracebacks.</p><p><code>_Source</code> Function source code. E5 specifies that the source code of a function must be valid syntax.</p><h2 id="pc2line-debug-information-maps-bytecode-index-to-a-source-linenumber-space-optimized-binary-format" tabindex="-1"><code>_Pc2line</code> Debug information: maps bytecode index to a source line number. Space-optimized binary format. <a class="header-anchor" href="#pc2line-debug-information-maps-bytecode-index-to-a-source-linenumber-space-optimized-binary-format" aria-label="Permalink to &quot;\`_Pc2line\`      Debug information: maps bytecode index to a source line
                  number. Space-optimized binary format.&quot;">​</a></h2><p>The compiler should omit whatever internal properties are not needed to save space. For instance:</p><ul><li><code>_Varmap</code> is not needed if the function can never perform a slow path identifier reference.</li><li><code>_Formals</code> is not needed unless a non-strict arguments object is potentially constructed. (However, <code>_Formals</code> is also used for deriving the &quot;length&quot; of the instance. If _Formals is omitted, something else needs to be set in the template to allow instance &quot;length&quot; to be initialized.)</li></ul><p>When debugging, it may be necessary to store more function properties than needed by plain execution. For instance, source code should be available even for dynamically generated code.</p><h2 id="properties-of-a-function-instance" tabindex="-1">Properties of a function instance <a class="header-anchor" href="#properties-of-a-function-instance" aria-label="Permalink to &quot;Properties of a function instance&quot;">​</a></h2><p>The creation of function instances is described in E5 Section 13.2. Each function instance (each closure created from a function expression or declaration) has the following standard properties:</p><ul><li><code>length</code>: set to number of formal parameters (length of <code>_Formals</code>).</li><li><code>prototype</code>: points to a fresh object which has a <code>constructor</code> property pointing back to the function</li><li><code>caller</code>: thrower (strict functions only)</li><li><code>arguments</code>: thrower (strict functions only)</li></ul><p>There is considerable variance in practical implementations:</p><ul><li><p>smjs:</p><pre><code>// the &quot;name&quot; property is non-standard; &quot;arguments&quot; and &quot;caller&quot; are
// present for a non-strict function

js&gt; f = function foo() {}
(function () {})
js&gt; Object.getOwnPropertyNames(f)
[&quot;prototype&quot;, &quot;length&quot;, &quot;name&quot;, &quot;arguments&quot;, &quot;caller&quot;]

// for strict mode, the same properties are present.

js&gt; f = function foo() { &quot;use strict&quot;; }
(function foo() {&quot;use strict&quot;;})
js&gt; Object.getOwnPropertyNames(f);
[&quot;prototype&quot;, &quot;length&quot;, &quot;name&quot;, &quot;arguments&quot;, &quot;caller&quot;]

// the &quot;name&quot; property contains the function expression name

js&gt; f.name
&quot;foo&quot;

// &quot;name&quot; is non-writable, non-configurable (and non-enumerable)
// -&gt; works as a reliable &quot;internal&quot; property too

js&gt; Object.getOwnPropertyDescriptor(f, &#39;name&#39;)
({configurable:false, enumerable:false, value:&quot;foo&quot;, writable:false})
</code></pre></li><li><p>nodejs (v8):</p><pre><code>// &quot;name&quot; is non-standard; &quot;arguments&quot; and &quot;caller&quot; are present
// for even a non-strict function

&gt; f = function foo() {}
[Function: foo]
&gt; Object.getOwnPropertyNames(f)
[ &#39;length&#39;,
  &#39;caller&#39;,
  &#39;arguments&#39;,
  &#39;name&#39;,
  &#39;prototype&#39; ]
&gt; f.name
&#39;foo&#39;

// strict mode is the same

&gt; f = function foo() { &quot;use strict&quot;; }
[Function: foo]
&gt; Object.getOwnPropertyNames(f)
[ &#39;name&#39;,
  &#39;length&#39;,
  &#39;arguments&#39;,
  &#39;prototype&#39;,
  &#39;caller&#39; ]

// &#39;name&#39; is writable but not configurable/enumerable

&gt; f.name
&#39;foo&#39;
&gt; Object.getOwnPropertyDescriptor(f, &#39;name&#39;)
{ value: &#39;foo&#39;,
  writable: true,
  enumerable: false,
  configurable: false }
</code></pre></li><li><p>rhino:</p><pre><code>// &quot;name&quot; is non-standard, &quot;arity&quot; is non-standard, &quot;arguments&quot;
// is present (but &quot;caller&quot; is not)

js&gt; f = function foo() {}
[...]
js&gt; Object.getOwnPropertyNames(f)
arguments,prototype,name,arity,length

// name is non-writable, non-enumerable, non-configurable

js&gt; pd = Object.getOwnPropertyDescriptor(f, &#39;name&#39;)
[object Object]
js&gt; pd.writable
false
js&gt; pd.enumerable
false
js&gt; pd.configurable
false

// strict mode functions are similar
</code></pre></li></ul><p>Notes:</p><ul><li>&quot;caller&quot; and &quot;arguments&quot; would be nice as virtual properties to minimize object property count. They can&#39;t be inherited in the ordinary way without breaking compliance (the standard requires they be own properties).</li><li>&quot;prototype&quot; would be nice as a virtual property: it&#39;s quite expensive to have for every function instance.</li></ul><p>The properties for function instances are (these are also documented in user documentation for the exposed parts):</p><hr><p>Property Description</p><hr><p><code>length</code> Set to the number of formal parameters. For normal functions parsed from ECMAScript source code, this is set to <code>_Formals.length</code>. Built-in functions may be special.</p><p><code>prototype</code> Points to a fresh object which has a <code>constructor</code> property pointing back to the function instance.</p><p><code>caller</code> For strict functions, set to the <code>[[ThrowTypeError]]</code> function object defined in E5 Section 13.2.3.</p><p><code>arguments</code> Like <code>caller</code>.</p><p><code>name</code> See function templates.</p><p><code>fileName</code> See function templates.</p><p><code>_Varmap</code> See function templates.</p><p><code>_Formals</code> See function templates.</p><p><code>_Source</code> See function templates.</p><h2 id="pc2line-see-function-templates" tabindex="-1"><code>_Pc2line</code> See function templates. <a class="header-anchor" href="#pc2line-see-function-templates" aria-label="Permalink to &quot;\`_Pc2line\`      See function templates.&quot;">​</a></h2><h2 id="built-in-functions" tabindex="-1">Built-in functions <a class="header-anchor" href="#built-in-functions" aria-label="Permalink to &quot;Built-in functions&quot;">​</a></h2><p>The properties of built-in functions are a special case, because they are not created with the algorithm in E5 Section 13.2; instead, their properties are described explicitly in E5 Section 15.</p><p>There is considerable variance between implementations on what properties built-in functions get.</p><h2 id="duktape-c-functions" tabindex="-1">Duktape/C functions <a class="header-anchor" href="#duktape-c-functions" aria-label="Permalink to &quot;Duktape/C functions&quot;">​</a></h2><p>Duktape/C functions are also represented by an ECMAScript Function object. The properties of such functions are extremely minimal; for instance, they are missing the <code>length</code> property. This is done to keep the object size as small as possible. This means, however, that the Function objects are non-standard.</p><p>Duktape/C functions also don&#39;t have any need for control variables such as <code>_Lexenv</code>, <code>_Pc2line</code>, etc.</p><h2 id="pc2line-format" tabindex="-1">pc2line format <a class="header-anchor" href="#pc2line-format" aria-label="Permalink to &quot;pc2line format&quot;">​</a></h2><p><code>_Pc2line</code> property allows a program counter (bytecode index) to be converted to an approximate line number of the expression which generated the bytecode instruction in question. Logically it can be considered an array (in fact, Lua implements a similar structure as a simple array):</p><hr><p>PC Line</p><hr><p>0 1</p><p>1 1</p><p>2 3</p><p>3 4</p><h2 id="_4-7" tabindex="-1">4 7 <a class="header-anchor" href="#_4-7" aria-label="Permalink to &quot;4    7&quot;">​</a></h2><p>If the line number is represented as a 4-byte integer, the structure would take as much memory as the related bytecode, doubling memory usage. Clearly a more space efficient format is desirable, as long as performance is not impacted too much when throwing and catching errors.</p><p>Although the line number generally stays the same or increases when PC increases, this is not always the case (e.g. in loop structures). This rules out search structures relying on monotonicity properties. It&#39;s nice if an arbitrary mapping can be expressed if necessary.</p><p>Error line number is needed when:</p><ul><li>Accessing the non-standard <code>lineNumber</code> property. This property can be implemented as a getter in the Error prototype, which will get the PC from the traceback data (if any), and do the PC-to-line conversion only when actually needed.</li><li>Creating a string-formatted traceback. PC-to-line conversions are needed for most traceback lines.</li></ul><p>The current format is based on the observation that when PC increases by one, the typical delta for the line number is very small (and is usually zero or positive). Deltas can be expressed efficiently with variable bit length encoding. To provide a reasonably fast random access, explicit starting point values are recorded for every nth bytecode instruction (currently, every 64th; SKIP=64 below). During a lookup one can first skip close to the desired mapping entry and then scan the bit-packed format forwards.</p><p>The format consists of a header structure followed by bit packed diff streams (each bit packed stream begins at a byte boundary):</p><hr><p>Offset Type Description</p><hr><p>0 u32 PC limit (maximum PC, exclusive)</p><p>4 u32 Line number for PC 0*SKIP</p><p>8 u32 Byte offset of diff bitstream for PC 0*SKIP</p><p>12 u32 Line number for PC 1*SKIP</p><p>16 u32 Byte offset of diff bitstream for PC 1*SKIP</p><p>... A total of ceil(bytecode_length/SKIP) line/offset entries</p><h2 id="diff-bitstreams" tabindex="-1">... Diff bitstreams <a class="header-anchor" href="#diff-bitstreams" aria-label="Permalink to &quot;\\...            Diff bitstreams&quot;">​</a></h2><p>The diff bitstream consists of SKIP-1 diff entries for a certain starting point. Each diff entry simply encodes the line number difference when PC increases by one; the difference may be negative, zero, or positive. The diff is encoded as one of the following entry types:</p><hr><p>Bits Description</p><hr><p>0 Difference is +0</p><p>1 0 &lt;2 bits&gt; Difference is: +1, +2, +3, or +4 (encoded as 2 bits)</p><p>1 1 0 &lt;8 bits&gt; Difference is a signed 8-bit value, encoded with bias +0x80 (as unsigned 0x00 ... 0xff)</p><h2 id="_1-1-1-32-bits-fallback-linenumber-encoded-as-absolute-32-bit-value" tabindex="-1">1 1 1 &lt;32 bits&gt; Fallback, linenumber encoded as absolute 32-bit value <a class="header-anchor" href="#_1-1-1-32-bits-fallback-linenumber-encoded-as-absolute-32-bit-value" aria-label="Permalink to &quot;1 1 1 \\&lt;32 bits\\&gt; Fallback, linenumber encoded as absolute 32-bit value&quot;">​</a></h2><p>These cases are not optimized, but rather best guesses combined with some experimentation:</p><ul><li>Usually multiple bytecode instructions are generated from a single line of source code, hence the case +0 is important to encode efficiently.</li><li>When line changes, there are either no lines without code, or there are a few such lines (empty lines for readability, perhaps a few comment lines). The cases +1...+4 are encoded compactly for these cases.</li><li>The signed 8-bit offset covers large comment blocks, and the occasional negative steps (e.g. in loop structures).</li><li>As a fallback, an absolute 32-bit line number can be encoded. This covers any remaining cases and provides completeness.</li></ul><p>As an example, the bitstream for the diffs [+0, +2, +9, -3, +0] would be:</p><pre><code>0 1001 11000001001 11011111101 0
=&gt; 01001110 00001001 11011111 10100000  (padded with 0)
=&gt; 0x4e 0x09 0xdf 0xa0
</code></pre><p>Typically the pc2line data is about 10-15% of the size of the corresponding bytecode, a very modest addition to footprint compared to the 100% addition of a straight table approach.</p>`,89)]))}const m=t(i,[["render",r]]);export{f as __pageData,m as default};
