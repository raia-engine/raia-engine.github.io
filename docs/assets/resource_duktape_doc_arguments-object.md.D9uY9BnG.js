import{_ as t,c as n,a2 as o,o as a}from"./chunks/framework.DzmM640o.js";const h=JSON.parse('{"title":"引数オブジェクト","description":"","frontmatter":{},"headers":[],"relativePath":"resource/duktape/doc/arguments-object.md","filePath":"resource/duktape/doc/arguments-object.md","lastUpdated":1732350347000}'),r={name:"resource/duktape/doc/arguments-object.md"};function i(c,e,s,d,l,u){return a(),n("div",null,e[0]||(e[0]=[o(`<h1 id="引数オブジェクト" tabindex="-1">引数オブジェクト <a class="header-anchor" href="#引数オブジェクト" aria-label="Permalink to &quot;引数オブジェクト&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><p>The <em>arguments object</em> is a very special kind of object in ECMAScript E5 from an implementation perspective.</p><p>The arguments object is created during function entry, as part of declaration binding instantiation (Section 10.5), and is bound to the <code>arguments</code> identifier unless a shadowing declaration exists. It is then accessed by program code through the bound identifier <code>arguments</code>. The arguments object and its exotic properties and behavior is described in E5 Section 10.6.</p><p>An arguments object created for a strict callee (referred to as a <em>strict arguments object</em> below) is essentially a normal object from a property behavior standpoint (it does have some error-throwing accessor properties, but these have standard behavior).</p><p>An arguments object created for a non-strict callee (referred to as a <em>non-strict arguments object</em> below) is entirely different. It has non-standard variants for many core algorithms: <code>[[Get]]</code>, <code>[[GetOwnProperty]]</code>, <code>[[DefineOwnProperty]]</code>, <code>[[Delete]]</code>. The non-standard variants provide the following main exotic behaviors:</p><ul><li><strong>Magic argument bindings</strong>: numbered indices (&quot;0&quot;, &quot;1&quot;, ...) matching formal arguments are &quot;magically&quot; bound to the corresponding variables. Book-keeping of these magical bindings happens through the internal <em>parameter map</em>, see more discussion below.</li><li><strong>The &quot;caller&quot; property</strong>: if <code>arguments.caller</code> <em>value</em> is a strict mode function, it cannot be read with <code>[[Get]]</code>. This is interesting because the arguments object is non-strict, and in fact contains no <code>caller</code> property initially.</li></ul><p>Because creating an <code>arguments</code> object on function entry is very expensive, the Duktape compiler attempts to avoid creating an arguments object at all if possible. This can be done if we can be sure during compilation that no reference to the <code>arguments</code> object can happen at run time: either the arguments object is shadowed by another (non-deletable) declaration, or the function contains no direct references to <code>arguments</code> and there can be no indirect run time references (e.g. through a direct <code>eval</code>). See the compiler documentation for details.</p><h2 id="arguments-object-and-its-properties" tabindex="-1">Arguments object and its properties <a class="header-anchor" href="#arguments-object-and-its-properties" aria-label="Permalink to &quot;Arguments object and its properties&quot;">​</a></h2><h3 id="binding-type" tabindex="-1">Binding type <a class="header-anchor" href="#binding-type" aria-label="Permalink to &quot;Binding type&quot;">​</a></h3><p>The arguments object is bound to the <code>arguments</code> identifier of a callee&#39;s variable environment provided that it is not shadowed (see E5 Section 10.5). The <code>arguments</code> binding type depends on callee strictness:</p><ul><li>Strict callee: immutable binding (prevents deletion and write).</li><li>Non-strict callee: non-deletable mutable binding (prevents deletion but not write).</li></ul><h3 id="object-type-and-internal-flags" tabindex="-1">Object type and internal flags <a class="header-anchor" href="#object-type-and-internal-flags" aria-label="Permalink to &quot;Object type and internal flags&quot;">​</a></h3><ul><li>Object class: <code>Arguments</code></li><li>Internal prototype: standard built-in Object prototype</li><li>The <code>DUK_HOBJECT_FLAG_EXOTIC_ARGUMENTS</code> flag needs to be set for non-strict arguments object instances. This flag enables the exotic variable map and <code>caller</code> post-check behaviors.</li></ul><p>Although the arguments object looks like an array, it is a normal object. In particular, the <code>length</code> property has no array-like automatic behavior.</p><h3 id="properties" tabindex="-1">Properties <a class="header-anchor" href="#properties" aria-label="Permalink to &quot;Properties&quot;">​</a></h3><p>The properties of an arguments object (including the internal properties specific to our implementation) are as follows (<code>nargs</code> refers to the number of actual call arguments given and <code>nformals</code> to the number of formal arguments declared):</p><hr><p>Property Non-strict mode Strict mode</p><hr><p>indexes Actual call arguments. Actual call arguments. No [0,nargs[ Exotic behavior for those exotic behavior. magically bound to formal<br> arguments.</p><p><code>length</code> Set to <code>nargs</code>, i.e. the Same as non-strict mode. number of actual call arguments (may be less or<br> more than the number of formals).</p><p><code>callee</code> Function being called. Accessor property with setter (Function is non-strict.) and getter set to the <code>[[ThrowTypeError]]</code> shared function.</p><p><code>caller</code> Not set. Still, exotic Accessor property with setter behavior for <code>[[Get]]</code> if and getter set to the later assigned value is a <code>[[ThrowTypeError]]</code> shared strict function instance. function.</p><p><code>_Map</code> Points to the internal Not set. (internal) parameter map (see below). Set if there are any mapped formal names.</p><h2 id="varenv-points-to-the-variable-not-set-internal-environment-record-of-thecallee-internal-objectfor-a-declarativeenvironment-record-setif-there-are-any-mappedformal-names" tabindex="-1"><code>_Varenv</code> Points to the variable Not set (internal) environment record of the<br> callee (internal object for a declarative environment record). Set if there are any mapped formal names. <a class="header-anchor" href="#varenv-points-to-the-variable-not-set-internal-environment-record-of-thecallee-internal-objectfor-a-declarativeenvironment-record-setif-there-are-any-mappedformal-names" aria-label="Permalink to &quot;\`_Varenv\`     Points to the variable     Not set
  (internal)    environment record of the  
                callee (internal object
                for a declarative
                environment record). Set
                if there are any mapped
                formal names.&quot;">​</a></h2><p>The exact property attributes are defined in E5 Section 10.6:</p><ul><li>No properties are enumerable except the index properties.</li><li>All properties are configurable except the strict mode <code>caller</code> and <code>callee</code> properties.</li><li>All (data) properties are writable.</li></ul><h3 id="strict-mode-callee-and-caller" tabindex="-1">Strict mode &quot;callee&quot; and &quot;caller&quot; <a class="header-anchor" href="#strict-mode-callee-and-caller" aria-label="Permalink to &quot;Strict mode \\&quot;callee\\&quot; and \\&quot;caller\\&quot;&quot;">​</a></h3><p>The strict mode <code>callee</code> and <code>caller</code> properties must be set to the specific <code>[[ThrowTypeError]]</code> function described in E5 Section 13.2.3. In particular, all the arguments object &quot;throwers&quot; must point to the same function (not just a similar one). Example:</p><pre><code>function f(x,y) { &#39;use strict&#39;; return arguments; };
function g(x,y) { &#39;use strict&#39;; return arguments; };

a = f(1,2,3);
b = g(3,2,1);

pd1 = Object.getOwnPropertyDescriptor(a, &quot;caller&quot;);
pd2 = Object.getOwnPropertyDescriptor(a, &quot;callee&quot;);
pd3 = Object.getOwnPropertyDescriptor(b, &quot;caller&quot;);
pd4 = Object.getOwnPropertyDescriptor(b, &quot;callee&quot;);

// all of these should print true

print(pd1.get === pd1.set);
print(pd2.get === pd2.set);
print(pd3.get === pd3.set);
print(pd4.get === pd4.set);

print(pd1.get === pd2.get);
print(pd2.get === pd3.get);
print(pd3.get === pd4.get);
</code></pre><h2 id="parameter-map" tabindex="-1">Parameter map <a class="header-anchor" href="#parameter-map" aria-label="Permalink to &quot;Parameter map&quot;">​</a></h2><p>The parameter map is not directly visible to program code, so it does not have to be implemented exactly as specified. Indeed, the current implementation differs from what is specified in E5 Section 10.6 to avoid creating a bunch of setter/getter functions.</p><p>The parameter map contains accessor properties for the mapped indices: e.g. &quot;0&quot; might be mapped to a setter/getter pair which reads and writes the magically bound variable. The accessors are created with the <code>MakeArgSetter</code> and <code>MakeArgGetter</code> helpers in E5 Section 10.6. The setters and getters read/write a certain identifier name in the callee&#39;s variable environment (the initial, top level declarative lexical environment used for argument, variable, and function bindings). The variants of the standard algorithms (for e.g. <code>[[Get]]</code>) then look up the parameter map, and if appropriate, call the setter or getter to interact with the bound variable usually after the standard behavior has finished without error.</p><p>To illustrate this more concretely, consider:</p><pre><code>function f(x,y,x) { ... }

f(1,2,3,4);
</code></pre><p>The arguments object and its parameter map would be something like:</p><pre><code>arguments = {
  &quot;0&quot;: 1,       // shadowed, no magic binding
  &quot;1&quot;: 2,       // magic binding to &#39;y&#39;
  &quot;2&quot;: 3,       // magic binding to &#39;x&#39;
  &quot;3&quot;: 4,       // not a formal argument, no magic binding
  &quot;length&quot;: 4,
  &quot;callee&quot;: f,
}

// &#39;arguments&#39; has an internal [[ParameterMap]] set to the following
// object. The get/set functions have &#39;env&#39; as their lexical environment,
// where &#39;env&#39; is the variable environment for the f() call.

[[ParameterMap]] = {
  get 1() { return y; },
  set 1(v) { y = v; },
  get 2() { return x; },
  set 2(v) { x = v; }
}
</code></pre><p>Note that the magic bindings <em>do not keep</em> variables and the corresponding arguments object entries in perfect sync, although the exotic behavior tries to hide this from the program. For instance:</p><pre><code>function f(x) {
  // Initially, arguments[0] == x == 1.

  // After this, the underlying arguments[0] value is still 1, but
  // &#39;x&#39; has the value 2.  The underlying value for arguments[0] is
  // no longer in sync with &#39;x&#39;.

  x = 2;

  // ... however, this is not externally visible.  The following
  // prints &#39;2&#39;.  The initial property lookup returns 1, but the
  // exotic [[GetOwnProperty]] behavior overwrites the value with
  // the current value of &#39;x&#39;.

  print(arguments[0]);

  // Similarly, the overridden value (current value of &#39;x&#39;) is
  // visible through the property descriptor, hiding the discrepancy.
  // The following prints:
  //
  //   { value: 2, writable: true, enumerable: true, configurable: true }

  print(Object.getOwnPropertyDescriptor(arguments, &quot;0&quot;));

  // After this, the underlying arguments[0] value and &#39;x&#39; have the
  // same value, 3.  The values are again in sync.

  arguments[0] = 3;
}

f(1);
</code></pre><p>From an implementation point of view using explicit getter/setter objects for the internal parameter map would be very wasteful: there would be lots of stub getters/setter objects.</p><p>So, the current implementation keeps a parameter map which simply maps an index to a formal argument name (e.g. &quot;2&quot; to &quot;x&quot;). An internal reference to the variable environment of the callee is stored in the arguments object to allow the correct variables to be read/written.</p><p>Consider, for instance:</p><pre><code>function f(x,y,x) { arguments[2] = 10; print(x); }
f(1,2,3,4);  // prints 10
</code></pre><p>The implementation specific arguments object here would contain:</p><pre><code>arguments = {
  &quot;0&quot;: 1,       // shadowed, no magic binding
  &quot;1&quot;: 2,       // magic binding to &#39;y&#39;
  &quot;2&quot;: 3,       // magic binding to &#39;x&#39;
  &quot;3&quot;: 4,       // not a formal argument, no magic binding
  &quot;length&quot;: 4,
  &quot;callee&quot;: f,

  // internal, implementation specific properties
  &quot;_Map&quot;: { &quot;1&quot;: &quot;y&quot;, &quot;2&quot;: &quot;x&quot; },
  &quot;_Varenv&quot;: &lt;varenv of callee&gt;
}
</code></pre><p>Here, the assignment to <code>arguments[2]</code> would be processed as follows:</p><ul><li>The standard <code>[[Put]]</code> operation eventually calls <code>[[DefineOwnProperty]]</code> which has an arguments object specific variant (E5 Section 10.6).</li><li>The variant algorithm consults the parameter map associated with the arguments object and sees that &quot;2&quot; is mapped to identifier &quot;x&quot;.</li><li>The variant algorithm performs a standard <code>[[DefineOwnProperty]]</code> and if that succeeds, winds up calling <code>[[Put]]</code> on the variable map (key &quot;2&quot;): <ul><li>Ordinarily this would invoke the setter created for &quot;2&quot; created with <em>MakeArgSetter</em>, writing to &quot;x&quot; in the callee&#39;s variable environment.</li><li>In our implementation we look up the callee&#39;s variable environment from an internal property stored in the arguments object during its creation. We then perform an identifier write for the identifier name &quot;x&quot; in the variable environment. The end result is the same but no getter/setter objects need to be explicitly created.</li></ul></li></ul><p>The initial entries in the parameter map are established during arguments object creation, based on function formal arguments. New entries cannot be established after that, but existing ones can be deleted if the corresponding arguments object property is deleted or sufficiently modified (e.g. converted into an accessor). Bindings deleted from the map lose their &quot;magic&quot; binding and don&#39;t regain the magic binding even if they are later re-added to the arguments object. Example:</p><pre><code>function f(x,y) {
  print(x,y);           // -&gt; &quot;1 2&quot;

  arguments[0] = 10;    // magically bound to &#39;x&#39;
  print(x,y);           // -&gt; &quot;10 2&quot;

  delete arguments[0];  // magic binding is lost (removed from
                        // parameter map)
  arguments[0] = 20;    // reintroduced but no magic binding
  print(x,y);           // -&gt; &quot;10 2&quot;
}

f(1,2)

1 2
10 2
10 2
</code></pre><p>In more detail, a property map binding is deleted (and never reintroduced) if:</p><ul><li>The corresponding arguments object property is deleted.</li><li>The corresponding arguments object property is write-protected with a <code>[[DefineOwnProperty]]</code> call with <code>[[Writable]]=false</code>.</li><li>The corresponding arguments object property is changed into an accessor property with a <code>[[DefineOwnProperty]]</code> call.</li></ul><p>In principle, if the parameter map became empty at run time (through deletions), it could be deleted from the arguments object along with the variable environment reference. This is not worth while: this does not happen in relevant cases and would require additional checks.</p><h2 id="exotic-get-behavior" tabindex="-1">Exotic [[Get]] behavior <a class="header-anchor" href="#exotic-get-behavior" aria-label="Permalink to &quot;Exotic \\[\\[Get\\]\\] behavior&quot;">​</a></h2><p>A non-strict arguments object has an exotic <code>[[Get]]</code> implementation. This is unusual, because most exotic behaviors are defined through a custom <code>[[GetOwnProperty]]</code> or <code>[[DefineOwnProperty]</code>. Because this exotic behavior operates at the <code>[[Get]]</code> level, it affects the reading of property values, but is not visible through property descriptors or e.g. <code>[[GetOwnProperty]]</code>.</p><p>The exotic behavior is covered in E5 Section 10.6, description for <code>[[Get]]</code>. To summarize, if:</p><ul><li>the property being looked up is not currently mapped in the arguments &quot;parameter map&quot; (<code>caller</code> never is, because only numeric indices like &quot;0&quot; are mapped);</li><li>the name of the property is <code>caller</code>; and</li><li>the standard lookup from the arguments object succeeds</li></ul><p>Then:</p><ul><li>Check the result value of the property lookup (i.e. the value for <code>arguments.caller</code>). If the result value is a strict mode function, throw a <code>TypeError</code>.</li></ul><p>Note that this behavior is only defined for a non-strict arguments object (i.e. arguments object created for a non-strict callee), and protects the <code>caller</code> property from being read, if the caller is strict. Quite oddly, if the function has no formal parameters, it gets no &quot;parameter map&quot; and also doesn&#39;t get the exotic <code>[[Get]]</code> behavior for <code>caller</code>!</p><p>However, the <code>caller</code> property <em>can</em> be read through e.g. <code>Object.getOwnPropertyDescriptor()</code> (which uses <code>[[GetOwnProperty]]</code>). The exotic behavior does not protect against this because the check is at the <code>[[Get]]</code> level. Example:</p><pre><code>function f(x,y) { return arguments; }
function g() { &#39;use strict&#39;; return f(1,2); }

a = g();
a.caller = g;  // this is not set by default, see below

// this is OK
print(Object.getOwnPropertyDescriptor(a, &quot;caller&quot;));

// this fails due to exotic behavior
// (though doesn&#39;t in Rhino, V8, or Smjs)
print(a.caller);
</code></pre><p>Finally, this exotic behavior is puzzling because a non-strict mode arguments object <em>does not even have</em> a <code>caller</code> property. The strict mode arguments object does have a <code>caller</code> property, but it is a &quot;<code>TypeError</code> thrower&quot;, and strict mode arguments objects don&#39;t have any exotic behavior (like <code>[[Get]]</code> here).</p><h2 id="function-objects-and-argument-creation" tabindex="-1">Function objects and argument creation <a class="header-anchor" href="#function-objects-and-argument-creation" aria-label="Permalink to &quot;Function objects and argument creation&quot;">​</a></h2><p>The relevant <code>duk_hobject</code> flags for a function object are:</p><ul><li><code>DUK_HOBJECT_FLAG_CREATEARGS</code>: indicates that an arguments object needs to be created upon function call. Must be set for functions where the arguments object might be accessed.</li><li><code>DUK_HOBJECT_FLAG_NEWENV</code>: always set (for all functions).</li></ul><h2 id="misc-notes" tabindex="-1">Misc notes <a class="header-anchor" href="#misc-notes" aria-label="Permalink to &quot;Misc notes&quot;">​</a></h2><h3 id="shadowing" tabindex="-1">Shadowing <a class="header-anchor" href="#shadowing" aria-label="Permalink to &quot;Shadowing&quot;">​</a></h3><p>In strict mode <code>arguments</code> shadowing is not possible:</p><ul><li>An attempt to declare a variable, a function, a formal parameter named <code>arguments</code> or to use <code>catch (arguments) { ... }</code> is a <code>SyntaxError</code>, see E5 Sections 12.2.1, 12.4.1, 13.1.</li><li>The <code>with</code> statement in its entirety is a <code>SyntaxError</code> in strict mode, so no shadowing is possible, see E5 Section 12.10.1.</li><li>Any <code>eval</code> calls cannot declare variables in the function variable environment, because a direct <code>eval</code> call gets a new variable environment in strict mode (E5 Section 10.4.2, step 3), and an indirect <code>eval</code> call is &quot;bound&quot; to the global object (E5 Section 10.4.2, step 1). This is not an issue as such anyway, because the <code>eval</code> call happens at run time and does not affect binding initialization on function entry.</li></ul><p>In non-strict mode shadowing is possible and any argument, variable, or function declaration with the name <code>arguments</code> shadows the arguments object and results in the arguments object not being created at all (E5 Section 10.5, step 7 is skipped entirely).</p><p>A temporary shadowing created by e.g. <code>catch</code> does not prevent the creation of an arguments object, as it happens after the declaration binding instantiation.</p><p>Example: shadowing formal argument:</p><pre><code>js&gt; function f(a, arguments) {
  &gt;   print(typeof arguments, arguments);
  &gt; }
js&gt; f(1,2);
number 2
</code></pre><p>Example: shadowing variable declaration:</p><pre><code>js&gt; function g() {
  &gt;   var arguments = 5;
  &gt;   print(typeof arguments, arguments);
  &gt; }
js&gt; g();
number 5
</code></pre><p>Example: shadowing function declaration:</p><pre><code>js&gt; function h() {
  &gt;   function arguments() {}
  &gt;   print(typeof arguments, arguments);
  &gt; }
js&gt; h();
function 
function arguments() {
}
</code></pre><p>Example: temporary shadowing by a <code>catch</code> clause (arguments object <em>is</em> created):</p><pre><code>js&gt; function i() {
  &gt;   try {
  &gt;     throw new Error(&quot;test&quot;);
  &gt;   } catch(arguments) {
  &gt;     // arguments temporarily shadowed here
  &gt;     print(typeof arguments, arguments);
  &gt;   }
  &gt;   print(&quot;...&quot;, typeof arguments, arguments);
  &gt; }
js&gt; i();
object Error: test
... object [object Object]
</code></pre><h3 id="multiple-formal-arguments-of-the-same-name" tabindex="-1">Multiple formal arguments of the same name <a class="header-anchor" href="#multiple-formal-arguments-of-the-same-name" aria-label="Permalink to &quot;Multiple formal arguments of the same name&quot;">​</a></h3><p>In strict mode multiple formal arguments of the same name are a <code>SyntaxError</code>.</p><p>In non-strict mode the last occurrence of a certain name &quot;wins&quot;:</p><pre><code>function f(a,a) { print(a); }

f(1,2);  // prints &#39;2&#39;
</code></pre><p>The magic arguments binding also binds to the last occurrence:</p><pre><code>function f(a,a) {
  // arguments[0] is not magically bound
  // arguments[1] is magically bound to &#39;a&#39;

  arguments[0] = 10;
  print(a);  // prints &#39;2&#39;

  arguments[1] = 20;
  print(a);  // prints &#39;20&#39;
}

f(1,2);
</code></pre><p>This behavior is apparent from E5 Sections 10.5 and 10.6. In particular:</p><ul><li>In E5 Section 10.5, the declaration of formal argument bindings and their values in step 4 runs through the formal names from left to right. The argument binding is declared when the first occurrence of a certain name is encountered, but the last occurrence updates any previously assigned value, leaving the formal bound to the value of the last (rightmost) occurrence.</li><li>In E5 Section 10.6, the parameter map initialization for a non-strict callee goes over the formal arguments from <em>right to left</em> and creates the magic binding from the first (rightmost) occurrence. If the same name is encountered again, the mapping is not updated. The result is that magic bindings go to the rightmost occurrence of a certain name.</li></ul><h3 id="accessing-arguments-from-an-inner-function" tabindex="-1">Accessing arguments from an inner function <a class="header-anchor" href="#accessing-arguments-from-an-inner-function" aria-label="Permalink to &quot;Accessing arguments from an inner function&quot;">​</a></h3><p>An inner function cannot access the arguments object of an outer function using the <code>arguments</code> identifier, as the inner function will always have an <code>arguments</code> binding of one type or another. Either the function has a non-deletable shadowing declaration with the name <code>arguments</code>, or an actual non-deletable arguments object binding for <code>arguments</code> is created.</p><p>From a compiler standpoint this means that if an outer function does not directly or indirectly (e.g. through a direct <code>eval</code>) access its arguments object, the arguments object does not need to be created. There is no need to analyze the inner functions to see whether they could somehow access the arguments object: they will have a &quot;blocking&quot; binding with the name <code>arguments</code>.</p><p>Of course, an outer function can make the arguments object available to the inner object indirectly, e.g. through a variable binding of a different name. Example:</p><pre><code>function f() {
  var foo = arguments;
  function g() {
    print(foo[2]);
  }
  return g;
}

t = f(&#39;foo&#39;, &#39;bar&#39;, &#39;quux&#39;);
t();  // prints &#39;quux&#39;
</code></pre><p>From a compiler standpoint, here the outer function does access its <code>arguments</code> binding directly, requiring an arguments object to be created upon a call to <code>f()</code>.</p><h3 id="argument-count" tabindex="-1">Argument count <a class="header-anchor" href="#argument-count" aria-label="Permalink to &quot;Argument count&quot;">​</a></h3><p>The number of arguments given in a function call is theoretically unlimited. In particular, it is theoretically possible that there are more than 2**32-1 arguments and thus some of the numeric keys of an arguments object are beyond the range of &quot;valid array indices&quot; (see <code>hobject-design.rst</code> for detailed discussion).</p><p>The current implementation assumes that this never happens in practice. As a result, arguments exotic behavior can do a fast reject if the key being accessed is not a valid array index.</p>`,97)]))}const m=t(r,[["render",i]]);export{h as __pageData,m as default};
