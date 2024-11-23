import{_ as t,c as a,a2 as n,o as i}from"./chunks/framework.DPuwY6B9.js";const c=JSON.parse('{"title":"Fastint型","description":"","frontmatter":{},"headers":[],"relativePath":"resource/duktape/doc/fastint.md","filePath":"resource/duktape/doc/fastint.md","lastUpdated":null}'),o={name:"resource/duktape/doc/fastint.md"};function s(r,e,l,d,p,u){return i(),a("div",null,e[0]||(e[0]=[n(`<h1 id="fastint型" tabindex="-1">Fastint型 <a class="header-anchor" href="#fastint型" aria-label="Permalink to &quot;Fastint型&quot;">​</a></h1><h2 id="概要" tabindex="-1">概要 <a class="header-anchor" href="#概要" aria-label="Permalink to &quot;概要&quot;">​</a></h2><p>ECMAScriptには、IEEE doubleであることが要求される単一の数値型があります。これは、ハードウェア浮動小数点数（少なくともIEEE double）が利用できず、ソフトウェア浮動小数点エミュレーションの性能が低い一部の組み込み環境において、潜在的なパフォーマンス上の問題となります。</p><p>Duktapeはオプションで高速整数をサポートしており、Duktapeは内部で数値をIEEE doublesまたは48ビット符号付き整数として表現することが可能です。Duktape は、必要な場合（例：整数演算がオーバーフローした場合）には整数から2倍へ、可能な場合には2倍から整数へ透過的にアップグレードします。</p><p>2倍から整数へのダウングレードチェックは比較的高価であるため、特定の状況でのみ適用されます。現在では</p><ul><li>All compiler constants are represented as fastints if possible.</li><li>Unary plus performs a ToNumber() coercion and also downgrades an IEEE double to a fastint if possible.</li><li>All function return values are automatically downgraded to fastints if possible.</li><li>Thread yield/resume values are automatically downgraded to fastints if possible.</li></ul><p>Fastints don&#39;t affect ECMAScript semantics and are completely transparent to user C and ECMAScript code: all conversions are automatic.</p><p>To enable fastint support, simply define:</p><ul><li><code>DUK_USE_FASTINT</code></li></ul><p>You should measure the impact of enabling fastint support for your target platform and ECMAScript code base. Fastint support is not an automatic performance win: while the fast path is a clear improvement for soft float (and even some hard float) platforms, there is a run-time cost of doing fastint downgrade checks and other book-keeping. Very roughly:</p><ul><li>Code that benefits most from fastint upsides (e.g. heavy integer arithmetic in large loops) can run about 1000% faster on soft float platforms.</li><li>Code that suffers most from fastint downsides can run about 10% more slowly.</li><li>Executable size will increase by about 7-10kB.</li></ul><p>This document provides tips for using fastints, and provides some background on the approach chosen. Some specific fastint algorithms used by Duktape are also described in detail.</p><h2 id="application-considerations" tabindex="-1">Application considerations <a class="header-anchor" href="#application-considerations" aria-label="Permalink to &quot;Application considerations&quot;">​</a></h2><p>Because fastints are transparent to user code, the only real consideration is to make sure performance critical sections take advantage of fastints. Some tips for using fastints:</p><ul><li><p>Because a double-to-fastint downgrade check is only done for specific operations, make sure that integer values don&#39;t accidentally become IEEE doubles.</p><p>There&#39;s no easy way to check how a number is represented internally. However, <code>Duktape.info()</code> provides a way to peek into the internal representation. An example algorithm is provided in <code>polyfills/duktape-isfastint.js</code>. You can use this polyfill to debug your code if necessary.</p></li><li><p>When in doubt, you can use unary plus to force a number to be downgrade checked:</p><pre><code>// Result is exactly 1, but is represented internally as a double.
var t = Math.PI / Math.PI;

// Result is exactly 1, downgrade checked, and is represented
// internally as a fastint.
var t = +(Math.PI / Math.PI);
</code></pre></li><li><p>All function return values from both ECMAScript and Duktape/C functions are automatically downgraded to fastints. So, the following value can be trusted to be 3 and represented internally as a fastint:</p><pre><code>// Resulting &#39;three&#39; is a fastint because Math.floor() return
// value (double 3) is automatically downgraded to a fastint.
var three = Math.floor(Math.PI);
</code></pre><p>Same applies to any user functions:</p><pre><code>function my_max(a, b) {
    // For the call below, &#39;b&#39; is 1 but is not represented as a
    // fastint here.  Only when we return is the return value 1
    // downgraded into a fastint.
    return (a &gt;= b ? a : b);
}

// &#39;t&#39; is exactly 1, and represented internally as a fastint.
var t = my_max(0, Math.PI / Math.PI);
</code></pre></li><li><p>All compiler constants are automatically downgraded to fastints when possible. For example, all constants below will be fastints:</p><pre><code>var i, n;

for (i = 0, n = 1e6; i &lt; n; i++) {
    // All &#39;i&#39; values here will be fastints.
}
</code></pre></li><li><p>Note that the number syntax doesn&#39;t affect the fastint downgrade check; only the final value matters. All of the following will be represented as fastints:</p><pre><code>t = 1;
t = 1.0;
t = 100e-2;
t = 0.01e2;
</code></pre><p>Similarly, constant folding, when possible, will be done before doing the downgrade check, so the following will be represented as a fastint:</p><pre><code>t = 123.123 / 123.123;  // fastint 1
</code></pre><p>But because <code>Math.PI</code> needs a runtime lookup, the following will not be a fastint:</p><pre><code>t = Math.PI / Math.PI;  // double 1
</code></pre></li><li><p>Non-fastint values will &quot;taint&quot; fastints in operations so that the result will be represented as a double instead of a fastint:</p><pre><code>t1 = 123;            // fastint
t2 = 0.5;            // double
t3 = t1 + t2;        // &lt;fastint&gt; + &lt;double&gt; -&gt; &lt;double&gt;
t4 = t3 - t2;        // &lt;double&gt; - &lt;double&gt; -&gt; &lt;double&gt;
t5 = +t4;            // restore into fastint representation
</code></pre><p>While adding and subtracting <code>t2</code> is a net zero change and <code>t4</code> would be fastint compatible, it will not be represented as a fastint internally until the next explicit downgrade check. Here unary plus is used to get the result back into fastint representation.</p></li><li><p>Negative zero cannot be represented as a fastint. Ordinary ECMAScript code will very rarely deal with negative zeros. Negative zero can &quot;taint&quot; a fastint, too:</p><pre><code>t1 = 123;      // fastint
t2 = -0;       // double
t3 = t1 + t2;  // &lt;fastint&gt; + &lt;double&gt; -&gt; &lt;double&gt; (!)
</code></pre><p>Here the result is a double even when an innocent zero value is added to a fastint. When in doubt you can use unary plus to ensure the result is a fastint if it&#39;s fastint compatible.</p></li><li><p>When doing Duktape API calls from C code, prefer API calls which take integer arguments. Such API calls will typically have fastint support. For example:</p><pre><code>// Value pushed will be 1, represented internally as a double.
duk_push_number(ctx, 1.0);

// Value pushed will be 1, represented internally as a fastint.
duk_push_int(ctx, 1);
</code></pre></li><li><p>Because the fastint support is transparent from a semantics perspective, Duktape fastint fast path and downgrade behavior may change in future versions. Such changes won&#39;t change outward behavior but may affect code performance.</p><p>As a general rule, optimize for fastints only in code sections where it really matters for performance, e.g. heavy loops.</p></li></ul><h2 id="detecting-that-a-number-is-represented-as-a-fastint-internally" tabindex="-1">Detecting that a number is represented as a fastint internally <a class="header-anchor" href="#detecting-that-a-number-is-represented-as-a-fastint-internally" aria-label="Permalink to &quot;Detecting that a number is represented as a fastint internally&quot;">​</a></h2><p>There&#39;s no explicit API for this now, but <code>Duktape.info()</code> provides the necessary information (in a highly fragile manner though). For instance, you can use something like:</p><pre><code>/* Fastint tag depends on duk_tval packing */
var fastintTag = (Duktape.info(true)[1] &gt;= 0xfff0 ?
                 0xfff1 /* tag for packed duk_tval) :
                 1 /* tag for unpacked duk_tval */ );

function isFastint(x) {
    if (typeof x !== &#39;number&#39;) {
        return false;
    }
    return Duktape.info(x)[1] === fastintTag;
}
</code></pre><p>There&#39;s an example polyfill which provides <code>Duktape.isFastint()</code> in:</p><ul><li>polyfills/duktape-isfastint.js</li></ul><p>::: note ::: title Note :::</p><p>This is fragile and may stop working when internal tag number changes are made. Such changes are possible even in minor version updates. :::</p><h2 id="fastints-and-duktape-internals" tabindex="-1">Fastints and Duktape internals <a class="header-anchor" href="#fastints-and-duktape-internals" aria-label="Permalink to &quot;Fastints and Duktape internals&quot;">​</a></h2><p>A few notes on how fastints are used internally, what macros are used, etc.</p><p>Fastint aware vs. unaware code -----------------------------</p><p>Fastint support is optional and added between <code>#if defined()</code> guards:</p><pre><code>#if defined(DUK_USE_FASTINT)
...
#endif
</code></pre><p>Number handling will be either:</p><ul><li>fastint unaware: requires no changes to existing code</li><li>fastint aware: requires fastint detection, e.g. in switch-case statements and then usage of fastint aware macros</li></ul><h3 id="type-switch-cases" tabindex="-1">Type switch cases <a class="header-anchor" href="#type-switch-cases" aria-label="Permalink to &quot;Type switch cases&quot;">​</a></h3><p>The minimum change necessary is to ensure fastints are handled in type switch-cases:</p><pre><code>/* ... */

    switch(DUK_TVAL_GET_TAG(tv)) {
    case DUK_TAG_UNDEFINED:
        /* ... */
#if defined(DUK_USE_FASTINT)
    case DUK_TAG_FASTINT:
        /* no direct support, fall through */
#endif
    default:
        /* number, double or fastint; use fastint unaware macros
         * which will automatically upgrade a fastint to a double
         * when necessary:
         */

        duk_double_t d = DUK_TVAL_GET_NUMBER(tv);  /* auto upgrade */
        /* ... */
    }
</code></pre><p>Even without this change the default clause will capture <code>DUK_TAG_FASTINT</code> values but it&#39;s preferable to have the fall through happen explicitly.</p><p>Fastint aware code will have specific code in the <code>DUK_TAG_FASTINT</code> case, and the <code>default</code> case can then assume the number is represented as a double. The <code>default</code> case must be written carefully so that it also works correctly when fastints are disabled.</p><h3 id="getting-numbers-fastints" tabindex="-1">Getting numbers/fastints <a class="header-anchor" href="#getting-numbers-fastints" aria-label="Permalink to &quot;Getting numbers/fastints&quot;">​</a></h3><p>Fastint unaware code uses:</p><pre><code>DUK_TVAL_GET_NUMBER(tv)
</code></pre><p>which will always evaluate to a double, and automatically upgrades a fastint to a double. The implementation with fastints enabled is something like:</p><pre><code>#define DUK_TVAL_GET_NUMBER(v) \\
    (DUK_TVAL_IS_FASTINT(v) ? \\
        (duk_double_t) DUK_TVAL_GET_FASTINT(v) : \\
        DUK_TVAL_GET_DOUBLE(v))
</code></pre><p>The extra compared to a direct read has a small runtime cost, but only when fastints are enabled. When they&#39;re not enabled, <code>DUK_TVAL_GET_NUMBER()</code> will just read a double.</p><p>Fastint aware code uses the following:</p><pre><code>/* When &#39;tv&#39; is known to be a fastint, e.g. switch DUK_TAG_FASTINT or
 * explicit check.
 */
DUK_TVAL_GET_FASTINT(tv)  /* result is duk_int64_t */

/* When &#39;tv&#39; is known to be a fastint, and we just need the lowest 32 bits
 * as a duk_uint32_t.
 */
DUK_TVAL_GET_FASTINT_U32(tv)  /* result is duk_uint32_t */

/* Similarly for a duk_int32_t. */
DUK_TVAL_GET_FASTINT_I32(tv)  /* result is duk_int32_t */

/* When &#39;tv&#39; is known to be a double, e.g. switch or explicit check. */
DUK_TVAL_GET_DOUBLE(tv)
</code></pre><p>The <code>DUK_TVAL_GET_DOUBLE(tv)</code> macro is also defined when fastints are not enabled; in that case it&#39;s simply a synonym for <code>DUK_TVAL_GET_NUMBER()</code> because all numbers are represented as doubles. It should only be used when in the fastint enabled case the number is known to be represented as a double.</p><p>This allows control structures like:</p><pre><code>/* Fictional ToBoolean()-like operation. */

    switch(DUK_TVAL_GET_TAG(tv)) {
    ...
#if defined(DUK_USE_FASTINT)
    case DUK_TAG_FASTINT:
        /* Fastints enabled and &#39;tv&#39; is a fastint. */
        return (DUK_TVAL_GET_FASTINT(tv) != 0 ? 1 : 0);
#endif
    default:
        /* Fastints enabled and &#39;tv&#39; is a double, or fastints disabled. */
        return (DUK_TVAL_GET_DOUBLE(tv) != 0.0 ? 1 : 0);
    }
</code></pre><h3 id="setting-numbers-fastints" tabindex="-1">Setting numbers/fastints <a class="header-anchor" href="#setting-numbers-fastints" aria-label="Permalink to &quot;Setting numbers/fastints&quot;">​</a></h3><p>Fastint unaware code uses:</p><pre><code>DUK_TVAL_SET_NUMBER(tv, d);
</code></pre><p>This sets the number always into an internal double representation, i.e. no double-to-fastint downgrade is automatically done. (This was one design option, but it turns out double-to-fastint coercion test is quite expensive and adds a considerable overhead to the fastint unaware slow path.)</p><p>Fastint aware which wants to set a double and downgrade it automatically into a fastint when possible uses:</p><pre><code>DUK_TVAL_SET_NUMBER_CHKFAST(tv, d);
</code></pre><p>This macro concretely calls into a helper function so there&#39;s a performance penalty involved. Downgrade checks are only added to specific places where they provide the most benefit.</p><p>Fastint aware code which wants to set a double explicitly (with no fastint downgrade check) uses:</p><pre><code>DUK_TVAL_SET_DOUBLE(tv, d);
</code></pre><p>Fastint aware code which wants to set a fastint explicitly (and has ensured that the value is fastint compatible) uses:</p><pre><code>/* &#39;i&#39; must be in 48-bit signed range */
DUK_TVAL_SET_FASTINT(tv, i);  /* i is duk_int64_t */

/* &#39;i&#39; must be in 32-bit unsigned range */
DUK_TVAL_SET_FASTINT_U32(tv, i);  /* i is duk_uint32_t */

/* &#39;i&#39; must be in 32-bit signed range */
DUK_TVAL_SET_FASTINT_I32(tv, i);  /* i is duk_int32_t */
</code></pre><p>The macros are also available when fastints are disabled, and will just write a double with no checks or additional overhead. This is just a convenience to reduce the number of <code>#if defined()</code> guards in call sites. For example, <code>DUK_TVAL_SET_FASTINT_U32</code> coerces the uint32 argument to a double when fastints are disabled.</p><h3 id="in-place-double-to-fastint-downgrade-check" tabindex="-1">In-place double-to-fastint downgrade check <a class="header-anchor" href="#in-place-double-to-fastint-downgrade-check" aria-label="Permalink to &quot;In-place double-to-fastint downgrade check&quot;">​</a></h3><p>The following macro is used to perform an in-place double-to-fastint downgrade check:</p><pre><code>DUK_TVAL_CHKFAST_INPLACE(tv);
</code></pre><p>The target <code>tv</code> can have any type; the macro first checks if the value is a double and if so, if it can be fastint coerced.</p><p>When fastint support is disabled, the macro is a no-op.</p><h3 id="type-checks" tabindex="-1">Type checks <a class="header-anchor" href="#type-checks" aria-label="Permalink to &quot;Type checks&quot;">​</a></h3><p>Fastint unaware code checks for a number (either double or fastint) using:</p><pre><code>DUK_TVAL_IS_NUMBER(tv)
</code></pre><p>Fastint aware code uses:</p><pre><code>/* Number represented as a fastint */
DUK_TVAL_IS_FASTINT(tv)

/* Number represented as a double */
DUK_TVAL_IS_DOUBLE(tv)
</code></pre><p>The following is defined even when fastints are disabled to support the switch code structure described above:</p><pre><code>/* When fastints disabled, same as DUK_TVAL_IS_NUMBER() */
DUK_TVAL_IS_DOUBLE(tv)
</code></pre><h2 id="background" tabindex="-1">Background <a class="header-anchor" href="#background" aria-label="Permalink to &quot;Background&quot;">​</a></h2><p>This section provides some background, discussion, and issues on various approaches to integer support. It&#39;s not up to date with the current implementation.</p><h3 id="approaches-to-integer-support" tabindex="-1">Approaches to integer support <a class="header-anchor" href="#approaches-to-integer-support" aria-label="Permalink to &quot;Approaches to integer support&quot;">​</a></h3><ul><li>Replace the tagged IEEE double number type with an integer or a fixed point type. This will necessarily break ECMAScript compliance to some extent, but it would be nice if at least number range was sufficient for 32-bit bit ops and to represent e.g. Dates.</li><li>Same as above, but also reserve a few bits for one or more special values like NaNs, to maintain compatibility better. For instance, NaN is used to signify an invalid Date, and is also used as a coercion result to signal a coercion error.</li><li>Extend the tagged type to support both an IEEE double and an integer or a fixed point type. Convert between the two either fully transparently (to maintain full ECMAScript semantics) or in selected situations, chosen for either convenience or performance.</li><li>Extend the tagged type to support both an IEEE double and an integer or a fixed point type. Extend the public API and ECMAScript environment to expose the new integer type explicitly. The upside is minimal performance cost because there are fewer automatic conversion checks. The downside is a significant API change and introduction of custom language features.</li><li>Same as above, but expose the integer type only for user C code; keep the ECMAScript environment unaware of the change.</li></ul><h3 id="implementation-issues" tabindex="-1">Implementation issues <a class="header-anchor" href="#implementation-issues" aria-label="Permalink to &quot;Implementation issues&quot;">​</a></h3><ul><li><p>When there is no need to represent IEEE doubles, the 8-byte tagged duk_tval no longer needs to conform to the IEEE double constraints (NaN space reuse). Instead, it can be split e.g. into an 8-bit tag and 56-bit type-specific value.</p></li><li><p>When there is a need to represent both integers and IEEE doubles, the 8-byte duk_tval must conform to the IEEE double representation, i.e. there are 16 bits of a special tag value and 48-bit type specific value.</p></li><li><p>Should there be a C typedef for a Duktape number? Currently the public API and Duktape internals assume numbers can be read/written as doubles. Changing the public API will break compilation (or at least cause warnings) for user code, if the integer changes are visible in the API.</p></li><li><p>Does the integer change need to be made everywhere at once, so that all code (including the compiler, etc) must support the underlying integer type before the change is complete?</p><p>Alternatively, Duktape could read and write numbers as doubles by default internally (with automatic conversion back and forth as needed) and integer-aware optimizations would only be applied in places where it matters, such as arithmetic. In particular, there would be no need to deal with integer representation in the compiler as it would normally have a minimal impact.</p></li><li><p>Integer representations above 32 bits would normally use a 64-bit integer type for arithmetic. However, some older platforms don&#39;t have such a type (there are workarounds for this e.g. in <code>duk_numconv.c</code>). So either the integer arithmetic must also be implemented with 32-bit replacements, or the representation won&#39;t be available if 64-bit types are not available.</p></li></ul><h3 id="representation-options" tabindex="-1">Representation options <a class="header-anchor" href="#representation-options" aria-label="Permalink to &quot;Representation options&quot;">​</a></h3><h4 id="double-type-separate-integer-fixed-point-type-compliant" tabindex="-1">Double type + separate integer / fixed point type (compliant) <a class="header-anchor" href="#double-type-separate-integer-fixed-point-type-compliant" aria-label="Permalink to &quot;Double type + separate integer / fixed point type (compliant)&quot;">​</a></h4><p>In this case the 8-byte tagged type must conform to the IEEE NaN space reuse, so 16 bits are lost to the type tag and 48 bits are available for the value.</p><ul><li>Double and up to 48-bit integer (sign + 47-bit range). Integers are nice and intuitive, but won&#39;t fit the full 53-bit integer range supported by IEEE doubles, so some must fall back into the double representation (not a big limitation). Date values and binary operations work.</li><li>Double and a fixed point with up to 48 bit representation, e.g. sign + 41.6. To support reasonable Date values, the integer part must be at least 41 bits. To support bit operations without falling back to IEEE doubles, the integer part must support both signed and unsigned 32-bit values. Binary fractions require some additional shifting to implement, and user code is not very likely to contain specific binary fractions, so they would only benefit code specifically crafted to use them.</li><li>Double and 32-bit signed or unsigned integer: 32-bit arithmetic is nice but unfortunately not enough to support ECMAScript bit operations which require the range -0x80000000 to 0xffffffff (sign + 32 bits, a 33-bit representation). This would not be a compliance issue as Duktape would fall back to the IEEE double for some values, but if fast bit operations are important matter, this is not a good option. If bit operations don&#39;t matter, then this is a nice option in that it avoids the 64-bit arithmetic issue.</li></ul><h4 id="only-integer-fixed-point-type-non-compliant" tabindex="-1">Only integer / fixed point type (non-compliant) <a class="header-anchor" href="#only-integer-fixed-point-type-non-compliant" aria-label="Permalink to &quot;Only integer / fixed point type (non-compliant)&quot;">​</a></h4><p>Here the 8-byte tagged type can be split e.g. into a 8-bit type and a 56-bit value which allows more range.</p><ul><li>56-bit signed integer (sign + 55 bits): covers the IEEE integer range (53-bit), Date values work, bit ops work. Lack of any fractions makes built-in Math functions mostly useless (e.g. Math.random() will always return zero), and some user code is likely to break.</li><li>Sign and 47.8 or 45.10 fixed point: provides enough fractions to be useful, Date values work, bit ops work. Math functions are somewhat useful again.</li><li>Sign and 41.14 fixed point: maximum number of fraction bits while keeping Date values (and bit ops) working.</li><li>Sign and 32.23 fixed point: maximum number of fraction bits while keeping bit ops working and providing user code the reasonable and intuitive guarantee that 32-bit integers (signed and unsigned) work. Date values won&#39;t work.</li><li>32-bit unsigned integer or 32-bit signed integer: closest to what&#39;s fast and convenient on typical embedded systems, but some bit operations stop working because taken together they need the -0x80000000 to 0xffffffff range (there are both signed and unsigned bit ops). Date values won&#39;t work.</li></ul><h3 id="dependencies-on-ieee-double-or-range" tabindex="-1">Dependencies on IEEE double or range <a class="header-anchor" href="#dependencies-on-ieee-double-or-range" aria-label="Permalink to &quot;Dependencies on IEEE double or range&quot;">​</a></h3><p>Specification and Duktape dependencies:</p><ul><li>Signed integers are quite widely required, so having no support for negative values is probably not an option.</li><li>At least 32-bit unsigned integers are needed for array and string lengths.</li><li>A sign + a 32-bit range (33-bit representation) are needed for bit ops, which provide both signed and unsigned 32-bit results. The required range is -0x80000000 to 0xffffffff.</li><li>The Date built-in uses an integer millisecond value for time values. This representation is used both internally and in the external Date API. <ul><li>40 (unsigned) bits is not enough to represent the current time, it only represents timestamps up to November 2004.</li><li>41 (unsigned) bits is enough to represent timestamps up to September 2039.</li><li>The Date API never uses fractions, and in fact the specification requires that the internal value is integer coerced (to milliseconds), so Date does not require fractions to work properly.</li><li>The implication for using only an integer / fixed point representation is that the integer part must contain a sign and at least 41 bits. For example, for a 48-bit representation sign + 41.6 fixed point is enough, and would provide 1/64 fractions.</li><li>It would be easy to fix the internal Date representation to work with any fixed point representation with enough bits (e.g. sign + 32.15), but because the integer millisecond values are used in the public Date API too, this doesn&#39;t solve anything.</li></ul></li><li>Signed zero semantics (separation of negative and positive zero) are are required and explicitly specified, but ECMAScript itself doesn&#39;t really depend on being able to use a negative zero, and neither does Duktape.</li><li>NaN values are used in several places as significant internal or external values. Invalid Date values are represented by having a NaN as the Date object&#39;s internal time value. String-to-number coercion relies on using a NaN to indicate a coercion error (<code>Number(&#39;foo&#39;) === NaN</code>). If a NaN value is not available, the best replacement is probably zero.</li><li>Infinities are used in math functions but ECMAScript itself doesn&#39;t rely on being able to use them, and neither does Duktape.</li><li>Duktape packs some internal values into double representation, this is used at least by: <ul><li>The compiler for declaration book-keeping. The needed bit count is not large (32 bits should more than suffice, for 2**24 inner functions).</li><li>Error object tracedata format, which needs 32 bits + a few flags; 40 bits should suffice.</li></ul></li></ul><p>In addition to these, user code may have some practical dependencies, such as:</p><ul><li>Being able to represent at least signed and unsigned 32 bits, so that all ECMAScript bit operations work as expected.</li><li>Being able to represent at least some fractional values. For instance, suppose a custom scheduler used second-based timestamps for timers; it would then require a reasonable number of fractions to work properly. Signed 41.6 fixed point provides a fractional increment of 0.015625; for the scheduler, this would mean about 15.6ms resolution, which is not that great.</li></ul><h2 id="efficient-check-for-double-to-fastint-downgrade" tabindex="-1">Efficient check for double-to-fastint downgrade <a class="header-anchor" href="#efficient-check-for-double-to-fastint-downgrade" aria-label="Permalink to &quot;Efficient check for double-to-fastint downgrade&quot;">​</a></h2><h3 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h3><p>For an IEEE double to be representable as a fast integer, it must be:</p><ul><li>A whole number</li><li>In the signed 48-bit range</li><li>Not a negative zero, assuming that the integer zero is taken to represent a positive zero</li></ul><p>This algorithm is needed when Duktape does an explicit downgrade check to see if a double value can be represented as a fastint.</p><p>The &quot;fast path&quot; for fastint operations doesn&#39;t execute this algorithm because both inputs and outputs are fastints and Duktape detects this in the fast path preconditions. Even so, the performance of the downgrade check matters for overall performance.</p><h3 id="exponent-and-sign-by-cases" tabindex="-1">Exponent and sign by cases <a class="header-anchor" href="#exponent-and-sign-by-cases" aria-label="Permalink to &quot;Exponent and sign by cases&quot;">​</a></h3><p>An IEEE double has a sign (1 bit), an exponent (11 bits), and a 52-bit stored mantissa. The mantissa has an implicit (not stored) leading &#39;1&#39; digit, except for denormals, NaNs, and infinities.</p><p>Going through the possible exponent values:</p><ul><li>If exponent is 0: <ul><li>The number is a fastint only if the sign bit is zero (positive) and the entire mantissa is all zeroes. This corresponds to +0.</li><li>If the mantissa is non-zero, the number is a denormal.</li></ul></li><li>If the exponent is in the range [1, 1022] the number is not a fastint because the implicit mantissa bit corresponds to the number 0.5.</li><li>If exponent is exactly 1023: <ul><li>The number is only a fastint if the stored mantissa is all zeroes. This corresponds to +/- 1.</li></ul></li><li>If exponent is exactly 1024: <ul><li>The number is only a fastint if 51 lowest bits of the mantissa are all zeroes (with the top bit either zero or one). This corresponds to the numbers +/- 2 and +/- 3.</li></ul></li><li>Generalizing, if the exponent is in the range [1023,1069], the number is a fastint if and only if: <ul><li>The lowest N bits of the mantissa are zero, where N = 52 - (exp - 1023), with either sign.</li><li>N can also be expressed as: N = 1075 - exp.</li></ul></li><li>If exponent is exactly 1070: <ul><li>The number is only a fastint if the sign bit is set (negative) and the stored mantissa is all zeroes. This corresponds to -2^47. The positive counterpart +2^47 does not fit into the fastint range.</li></ul></li><li>If exponent is [1071,2047] the number is never a fastint: <ul><li>For exponents [1071,2046] the number is too large to be a fastint.</li><li>For exponent 2047 the number is a NaN or infinity depending on the mantissa contents, neither a valid fastint.</li></ul></li></ul><h3 id="pseudocode-1" tabindex="-1">Pseudocode 1 <a class="header-anchor" href="#pseudocode-1" aria-label="Permalink to &quot;Pseudocode 1&quot;">​</a></h3><p>The algorithm:</p><pre><code>is_fastint(sgn, exp, mant):
    if exp == 0:
        return sign == 0 and mzero(mant, 52)
    else if exp &lt; 1023:
        return false
    else if exp &lt; 1070:
        return mzero(mant, 1075 - exp)
    else if exp == 1070:
        return sign == 1 and mzero(mant, 52)
    else:
        return false
</code></pre><p>The <code>mzero</code> helper predicate returns true if the mantissa given has its lowest <code>n</code> bits zero.</p><p>Non-zero integers in the fastint range will fall into the case where a certain computed number of low mantissa bits must be checked to be zero. As discussed above, the algorithm should be optimized for the &quot;input fits fastint&quot; case.</p><h3 id="pseudocode-2" tabindex="-1">Pseudocode 2 <a class="header-anchor" href="#pseudocode-2" aria-label="Permalink to &quot;Pseudocode 2&quot;">​</a></h3><p>Some rewriting:</p><pre><code>is_fastint(sgn, exp, mant):
    nzero = 1075 - exp
    if nzero &gt;= 52 and nzero &lt;= 6:  // exp 1023 ... exp 1069
        // exponents 1023 to 1069: regular handling, common case
        return mzero(mant, nzero)
    else if nzero == 1075:
        // exponent 0: irregular handling, but still common (positive zero)
        return sign == 0 and mzero(mant, 52)
    else if nzero == 5:
        // exponent 1070: irregular handling, rare case
        return sign == 1 and mzero(mant, 52)
    else:
        // exponents [1,1022] and [1071,2047], rare case
        return false
</code></pre><h3 id="c-algorithm-with-a-lookup-table" tabindex="-1">C algorithm with a lookup table <a class="header-anchor" href="#c-algorithm-with-a-lookup-table" aria-label="Permalink to &quot;C algorithm with a lookup table&quot;">​</a></h3><p>The common case <code>nzero</code> values are between [6, 52] and correspond to mantissa masks. Compute a mask index instead as nzero - 6 = 1069 - exp:</p><pre><code>duk_uint64_t mzero_masks[47] = {
    0x000000000000003fULL,  /* exp 1069, nzero 6 */
    0x000000000000007fULL,  /* exp 1068, nzero 7 */
    0x00000000000000ffULL,  /* exp 1067, nzero 8 */
    0x00000000000001ffULL,  /* exp 1066, nzero 9 */
    /* ... */
    0x0003ffffffffffffULL,  /* exp 1025, nzero 50 */
    0x0007ffffffffffffULL,  /* exp 1024, nzero 51 */
    0x000fffffffffffffULL,  /* exp 1023, nzero 52 */
};

int is_fastint(duk_int64_t d) {
    int exp = (d &gt;&gt; 52) &amp; 0x07ff;
    int idx = 1069 - exp;

    if (idx &gt;= 0 &amp;&amp; idx &lt;= 46) {  /* exponents 1069 to 1023 */
        return (mzero_masks[idx] &amp; mant) == 0;
    } else if (idx == 1069) {  /* exponent 0 */
        return (d &gt;= 0) &amp;&amp; ((d &amp; 0x000fffffffffffffULL) == 0);
    } else if (idx == -1) {  /* exponent 1070 */
        return (d &lt; 0) &amp;&amp; ((d &amp; 0x000fffffffffffffULL) == 0);
    } else {
        return 0;
    }
};
</code></pre><p>The memory cost of the mask table is 8x47 = 376 bytes. This can be halved e.g. by using a table of 32-bit values with separate cases for nzero &gt;= 32 and nzero &lt; 32.</p><p>Unfortunately the expected case (exponents 1023 to 1069) involves a mask check with a variable mask, so it may be unsuitable for direct inlining in the most important hot spots.</p><h3 id="c-algorithm-with-a-computed-mask" tabindex="-1">C algorithm with a computed mask <a class="header-anchor" href="#c-algorithm-with-a-computed-mask" aria-label="Permalink to &quot;C algorithm with a computed mask&quot;">​</a></h3><p>Since this algorithm only runs outside the proper fastint &quot;fast path&quot; it may be more sensible to avoid a memory tradeoff and compute the masks:</p><pre><code>int is_fastint(duk_int64_t d) {
    int exp = (d &gt;&gt; 52) &amp; 0x07ff;
    int shift = exp - 1023;

    if (shift &gt;= 0 &amp;&amp; shift &lt;= 46) {  /* exponents 1023 to 1069 */
        return ((0x000fffffffffffffULL &gt;&gt; shift) &amp; mant) == 0;
    } else if (shift == -1023) {  /* exponent 0 */
        /* return (d &gt;= 0) &amp;&amp; ((d &amp; 0x000fffffffffffffULL) == 0); */
        return (d == 0);
    } else if (shift == 47) {  /* exponent 1070 */
        return (d &lt; 0) &amp;&amp; ((d &amp; 0x000fffffffffffffULL) == 0);
    } else {
        return 0;
    }
};
</code></pre><h3 id="c-algorithm-with-a-computed-mask-unsigned" tabindex="-1">C algorithm with a computed mask, unsigned <a class="header-anchor" href="#c-algorithm-with-a-computed-mask-unsigned" aria-label="Permalink to &quot;C algorithm with a computed mask, unsigned&quot;">​</a></h3><p>Using an unsigned 64-bit integer for the input:</p><pre><code>int is_fastint(duk_uint64_t d) {
    int exp = (d &gt;&gt; 52) &amp; 0x07ff;
    int shift = exp - 1023;

    if (shift &gt;= 0 &amp;&amp; shift &lt;= 46) {  /* exponents 1023 to 1069 */
        return ((0x000fffffffffffffULL &gt;&gt; shift) &amp; mant) == 0;
    } else if (shift == -1023) {  /* exponent 0 */
        /* return ((d &amp; 0x800fffffffffffffULL) == 0); */
        return (d == 0);
    } else if (shift == 47) {  /* exponent 1070 */
        return ((d &amp; 0x800fffffffffffffULL) == 0x8000000000000000ULL);
    } else {
        return 0;
    }
};
</code></pre><h3 id="c-algorithm-with-32-bit-operations-and-a-computed-mask" tabindex="-1">C algorithm with 32-bit operations and a computed mask <a class="header-anchor" href="#c-algorithm-with-32-bit-operations-and-a-computed-mask" aria-label="Permalink to &quot;C algorithm with 32-bit operations and a computed mask&quot;">​</a></h3><p>For middle endian machines (ARM) this algorithm first needs swapping of the 32-bit parts. By changing the mask checks to operate on 32-bit parts the algorithm would work on more platforms and would also remove the need for swapping the parts on middle endian platforms:</p><pre><code>int is_fastint(duk_uint32_t hi, duk_uint32_t lo) {
    int exp = (hi &gt;&gt; 20) &amp; 0x07ff;
    int shift = exp - 1023;

    if (shift &gt;= 0 &amp;&amp; shift &lt;= 46) {  /* exponents 1023 to 1069 */
        if (shift &lt;= 20) {
            /* 0x000fffff&#39;ffffffff -&gt; 0x00000000&#39;ffffffff */
            return (((0x000fffffUL &gt;&gt; shift) &amp; hi) == 0) &amp;&amp; (lo == 0);
        } else {
            /* 0x00000000&#39;ffffffff -&gt; 0x00000000&#39;0000003f */
            return (((0xffffffffUL &gt;&gt; (shift - 20)) &amp; lo) == 0);
        }
    } else if (shift == -1023) {  /* exponent 0 */
        /* return ((hi &amp; 0x800fffffUL) == 0x00000000UL) &amp;&amp; (lo == 0); */
        return (hi == 0) &amp;&amp; (lo == 0);
    } else if (shift == 47) {  /* exponent 1070 */
        return ((hi &amp; 0x800fffffUL) == 0x80000000UL) &amp;&amp; (lo == 0);
    } else {
        return 0;
    }
};
</code></pre><h3 id="performance-notes" tabindex="-1">Performance notes <a class="header-anchor" href="#performance-notes" aria-label="Permalink to &quot;Performance notes&quot;">​</a></h3><p>Coercing a double to an int64_t seems to be very slow on some platforms, so it may be faster to get the fastint out of the IEEE double value with custom C code. The code doesn&#39;t need to handle denormals, NaNs, etc, so it can be much simpler than a full coercion routine.</p><p>There&#39;s a standard trick which is based on adding a double constant that forces the mantissa to be shifted so that the integer value can be directly extracted. See e.g.:</p><ul><li><a href="http://stackoverflow.com/questions/17035464/a-fast-method-to-round-a-double-to-a-32-bit-int-explained" target="_blank" rel="noreferrer">http://stackoverflow.com/questions/17035464/a-fast-method-to-round-a-double-to-a-32-bit-int-explained</a></li></ul><p>A similar trick is used in the number-to-double upgrade, see below.</p><h2 id="efficient-check-for-number-to-double-upgrade" tabindex="-1">Efficient check for number-to-double upgrade <a class="header-anchor" href="#efficient-check-for-number-to-double-upgrade" aria-label="Permalink to &quot;Efficient check for number-to-double upgrade&quot;">​</a></h2><p>Slow path code often needs to handle a number which may be either a fastint or a double. The code needs to read the value efficiently as a double. To minimize the slow path penalty, this check and conversion from a fastint to a double (if necessary) needs to be fast.</p><p>The algorithm has two parts: (1) detecting that the value is a fastint, and (2) converting a fastint into a double if necessary.</p><h3 id="checking-for-a-fastint" tabindex="-1">Checking for a fastint <a class="header-anchor" href="#checking-for-a-fastint" aria-label="Permalink to &quot;Checking for a fastint&quot;">​</a></h3><p>Checking for a fastint is easy:</p><ul><li>For packed duk_tval: if 16 highest bits are 0xfff1 (DUK_TAG_FASTINT) the value is a fastint.</li><li>For unpacked duk_tval: compare tag value similarly.</li></ul><h3 id="trivial-fastint-to-double-conversion" tabindex="-1">Trivial fastint-to-double conversion <a class="header-anchor" href="#trivial-fastint-to-double-conversion" aria-label="Permalink to &quot;Trivial fastint-to-double conversion&quot;">​</a></h3><p>Converting a fastint into a double could be done by:</p><ol><li>Sign extending the 48-bit value into a signed 64-bit value; the sign extension can be achieved by two shifts.</li><li>Coercing the 64-bit value to a double.</li></ol><p>Example:</p><pre><code>duk_int64_t tmp = du.ull[DUK_DBL_IDX_ULL0];
tmp = (tmp &lt;&lt; 16) &gt;&gt; 16;  /* sign extend */
return (duk_double_t) tmp;
</code></pre><p>Unfortunately this is very slow, at least on some soft float platforms where this was tested on.</p><h3 id="alternate-fastint-to-double-conversion" tabindex="-1">Alternate fastint-to-double conversion <a class="header-anchor" href="#alternate-fastint-to-double-conversion" aria-label="Permalink to &quot;Alternate fastint-to-double conversion&quot;">​</a></h3><p>Because the input number range is 48-bit signed (and zero) the conversion can be optimized a great deal. Let&#39;s first consider a positive value [1,2^47-1]:</p><ul><li>Construct an IEEE double with: <ul><li>Sign = 0</li><li>Exponent field = 1023 + 52 = 1075</li><li>Mantissa = the 52-bit fastint value aligned to the right of the field, i.e. padded with zero bits on the left</li></ul></li><li>Because of the implicit leading 1-bit, the value represented is 2^52 + fastint_value. Floating point subtract 2^52 to yield the final result.</li></ul><p>The C code for this could be something like:</p><pre><code>/* For fastint value [1,2^47-1]. */
du.ull[DUK_DBL_IDX_ULL0] = (duk_uint64_t) fastint_value |
                           (duk_uint64_t) 0x4330000000000000ULL;
du.d = du.d - 4503599627370496.0;  /* 1&lt;&lt;52 */
return du.d;
</code></pre><p>Negative values need similar handling but the double sign bit needs to be set. It&#39;s good to avoid sign extending the 48-bit value:</p><pre><code>/* For fastint value [-2^47,-1]. */
du.ull[DUK_DBL_IDX_ULL0] = ((duk_uint64_t) (-fastint_value) &amp;
                            (duk_uint64_t) 0x000fffffffffffffULL) |
                           (duk_uint64_t) 0xc330000000000000ULL;
du.d = du.d + 4503599627370496.0;  /* 1&lt;&lt;52 */
return du.d;
</code></pre><p>Zero fastint is simply represented as an IEEE double with all bits zero, which unfortunately needs a separate case.</p><p>In the concrete implementation the fastint_value might include the fastint duk_tval tag and be masked out also for the positive number case.</p><h2 id="future-work" tabindex="-1">Future work <a class="header-anchor" href="#future-work" aria-label="Permalink to &quot;Future work&quot;">​</a></h2><h3 id="fastint-on-platforms-with-no-64-bit-integer-type" tabindex="-1">Fastint on platforms with no 64-bit integer type <a class="header-anchor" href="#fastint-on-platforms-with-no-64-bit-integer-type" aria-label="Permalink to &quot;Fastint on platforms with no 64-bit integer type&quot;">​</a></h3><p>Currently fastint support can only be used if the platform/compiler has support for a 64-bit integer type. This limitation could be removed by implementing alternative fastint fast paths which only relied on 32-bit arithmetic.</p><h3 id="_32-bit-fastint" tabindex="-1">32-bit fastint <a class="header-anchor" href="#_32-bit-fastint" aria-label="Permalink to &quot;32-bit fastint&quot;">​</a></h3><p>It might be worth investigating if a signed or unsigned 32-bit fastint (instead of a signed 48-bit fastint) would be more useful. Fast path arithmetic would certainly be faster.</p><p>The downside would be that some bit operations won&#39;t be possible: to fully support all bit operations both signed and unsigned 32-bit values are needed.</p><h3 id="optimize-upgrade-and-downgrade" tabindex="-1">Optimize upgrade and downgrade <a class="header-anchor" href="#optimize-upgrade-and-downgrade" aria-label="Permalink to &quot;Optimize upgrade and downgrade&quot;">​</a></h3><p>These operations are very important for performance so perhaps inline assembler optimization would be useful for specific platforms, e.g. ARM.</p><p>The current C algorithms can also be optimized further.</p>`,154)]))}const h=t(o,[["render",s]]);export{c as __pageData,h as default};
