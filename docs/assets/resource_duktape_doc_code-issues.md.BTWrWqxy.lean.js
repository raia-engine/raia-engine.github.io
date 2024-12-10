import{_ as t,c as o,a2 as a,o as i}from"./chunks/framework.DzmM640o.js";const h=JSON.parse('{"title":"コードの問題","description":"","frontmatter":{},"headers":[],"relativePath":"resource/duktape/doc/code-issues.md","filePath":"resource/duktape/doc/code-issues.md","lastUpdated":1732350347000}'),n={name:"resource/duktape/doc/code-issues.md"};function r(s,e,l,d,c,u){return i(),o("div",null,e[0]||(e[0]=[a(`<h1 id="コードの問題" tabindex="-1">コードの問題 <a class="header-anchor" href="#コードの問題" aria-label="Permalink to &quot;コードの問題&quot;">​</a></h1><p>本ドキュメントは、Duktapeの実装に関連するCコーディングの問題点をカバーしています。 のようなものです：</p><ul><li>Conventions</li><li>Portability concerns</li><li>Specific platforms and compilers</li><li>Size and performance optimization issues</li></ul><p>Some code conventions are checked by the <code>make codepolicycheck</code> target.</p><p>Source code is now formatted using clang-format so some of the conventions below are out-of-date.</p><h2 id="basic-conventions" tabindex="-1">Basic conventions <a class="header-anchor" href="#basic-conventions" aria-label="Permalink to &quot;Basic conventions&quot;">​</a></h2><h3 id="indentation-naming-etc" tabindex="-1">Indentation, naming, etc. <a class="header-anchor" href="#indentation-naming-etc" aria-label="Permalink to &quot;Indentation, naming, etc.&quot;">​</a></h3><p>Indent with tab. On continuation lines indent with tab to shared indent depth and then indent with spaces. For example, denoting tab indent with colon and space indent with period:</p><pre><code>::::::::snprintf(buf,
::::::::.........sizeof(buf), 
::::::::.........&quot;%d&quot;,
::::::::.........123);
</code></pre><p>Names are lowercase, underscore separated:</p><pre><code>void duk_func(void) {
        /* ... */
}
</code></pre><p>Local functions, arrays, structs, typedefs, etc. have a double underscore after &quot;duk&quot;:</p><pre><code>typedef int duk__temptype;

static void duk__frobnicate_helper(void) {
        /* ... */
}
</code></pre><p>The prefix is useful when looking at object files to clearly identify an internal symbol as originating from Duktape. It will also show up in debugger tracebacks and such.</p><p>Macros are uppercase, underscore separated:</p><pre><code>#define DUK_MACRO(x) /* ... */
</code></pre><p>Macro names must not begin with an underscore. Macros which are of local interest only can have a local name or have a double underscore after &quot;DUK&quot;:</p><pre><code>/* &#39;foo&#39; alternatives, not to be used directly */
#define DUK__FOO_ALT1 /* ... */
#define DUK__FOO_ALT2 /* ... */

/* select DUK_FOO provider */
#define DUK_FOO DUK_FOO_ALT2
</code></pre><p>There is only one space after a <code>#define</code>, <code>#if</code>, etc., but there may be multiple spaces between the a macro name and its definition. There is no strict rule on the alignment of a macro value; successive definitions usually keep values in the same column.</p><p>Comments are always traditional C comments, never <code>//</code>, as they are not portable to older compilers:</p><pre><code>/* always used traditional C comments */
</code></pre><p>Opening brace on the same line as the start of the construct, even for functions:</p><pre><code>void func(int x) {
        if (x) {
                /* ... */
        } else {
                /* ... */
        }
}
</code></pre><p>The case-statements of a switch are at the same level as the switch to reduce indent. If case clauses have their own blocks, this leads to a confusing closing brace, so a comment for that may be in order:</p><pre><code>switch (x) {
case A: {
        /* ... */
        break;
}
case B: {
        /* ... */
        break;
}
default: {
}
}  /* switch */
</code></pre><p>Space after <code>if</code>, <code>switch</code>, etc:</p><pre><code>if (x) { ... } /* correct */
if(x) { ... } /* incorrect */

switch (x) { ... } /* correct */
switch(x) { ... } /* incorrect */
</code></pre><p>Use of goto for error cleanup and shared error handling is not only allowed but encouraged. Some goto notes:</p><ul><li>Avoid goto to an inner block as that might have portability impact.</li><li>Jumping to skip blocks should be used only when it saves considerable indentation.</li></ul><p>No naked statements in e.g. <code>if-then-else</code>, always use a block. This is more macro compatible. Example:</p><pre><code>if (x) {
        return 1;  /* correct */
}

if (x)
        return 1;  /* incorrect */
</code></pre><p>Multi-statement macros should use a <code>do-while(0)</code> construct:</p><pre><code>#define FROBNICATE(x,y) \\
        do { \\
                x = x * x; \\
                y = y * y; \\
        } while (0)
</code></pre><p>When the body of a macro is sometimes empty, use an empty do-while so that the macro still yields a statement:</p><pre><code>#if defined(DUK_USE_FROB)
#define FROBNICATE(x,y) \\
        do { \\
                x = x * x; \\
                y = y * y; \\
        } while (0)
#else
#define FROBNICATE(x,y) \\
        do { \\
        } while (0)
#endif
</code></pre><p>Use parentheses when referring to macro arguments and the final macro result to minimize error proneness:</p><pre><code>#define MULTIPLY(a,b) ((a) * (b))

/* Now MULTIPLY(1 + 2, 3) expands to ((1 + 2) * (3)) == 9, not
 * 1 + 2 * 3 == 7.  Parentheses are used around macro result for
 * similar reasons.
 */
</code></pre><p>Labels are intended by one space relative to the parent tab depth:</p><pre><code>DUK_LOCAL void duk__helper(duk_hthread *thr) {
        if (!thr) {
                DUK_D(DUK_DPRINT(&quot;thr is NULL&quot;));
                goto fail;
        }

        return;

 fail:
        DUK_D(DUK_DPRINT(&quot;failed, detaching&quot;));
}
</code></pre><h3 id="comment-styles" tabindex="-1">Comment styles <a class="header-anchor" href="#comment-styles" aria-label="Permalink to &quot;Comment styles&quot;">​</a></h3><p>A block or &quot;banner&quot; comment is used in file headers and to distinguish logical sections containing (typically) multiple functions, definitions, variables, etc.:</p><pre><code>/*
 * First line is empty.
 *
 * There are two spaces after a period ending a sentence.  This is
 * used throughout the Duktape code base and documentation.
 */
</code></pre><p>A compact comment is typically used to describe a single function/variable, or a sequence of small defines grouped together:</p><pre><code>/* Text starts on the first line with a capital letter.
 * Text ends with a period.
 */

/* Can also be a single line. */
static void duk__helper(void) {
        /* ... */
}
</code></pre><p>A compact comment may also appear intended inside a function. The style is the same:</p><pre><code>static void duk__helper(char *values, int count) {
        int i;

        /* Frobnicate all the elements in the user supplied
         * list of values.
         */
        for (i = 0; i &lt; count; i++) {
            /* ... */
        }
}
</code></pre><p>If a comment doesn&#39;t begin with a capital letter, it also doesn&#39;t have an ending period (i.e. the text is not a sentence):</p><pre><code>static void duk__helper(char *values, int count) {
        int i;

        /* frobnicate values */
        for (i = 0; i &lt; count; i++) {
            /* ... */
        }
}
</code></pre><p>A comment on the same line as a statement is separated by one space (two spaces would be nicer, but clang-format doesn&#39;t seem to support it for C-style comments). Don&#39;t use C++ style comments, as they&#39;re not portable:</p><pre><code>static void duk__helper(char *values, int count) {
        int i; /* loop counter */

        /* ... */

        return; /* No return value. */
}
</code></pre><p>The text in the comment may be a sentence (<code>/* No return value. */</code>, ends in a period) or not (<code>/* no return value */</code>, no period).</p><h3 id="local-variable-declarations" tabindex="-1">Local variable declarations <a class="header-anchor" href="#local-variable-declarations" aria-label="Permalink to &quot;Local variable declarations&quot;">​</a></h3><p>C variables should only be declared in the beginning of the block. Although this is usually not a portability concern, some older still compilers require it. In particular, MSVC (at least Visual Studio 2010 Express) seems to require this.</p><p>Be careful especially of assertions, debug prints, and other macros:</p><pre><code>int x, y;
DUK_UNREF(y);
int flags = 0;  /* problem: DUK_UNREF() */
</code></pre><p>Note that even <strong>disabled</strong> debug prints break the variable declaration part because disabled debug prints are replaced with <code>do {} while (0)</code> (this is intentional to flush out this kind of errors even in release builds):</p><pre><code>{
        int x;

        DUK_DDD(DUK_DDDPRINT(&quot;debug print&quot;));

        int y; /* error here */

        x = 123;
        ...
}
</code></pre><p>The fix is:</p><pre><code>{
        int x;
        int y;

        DUK_DDD(DUK_DDDPRINT(&quot;debug print&quot;));

        x = 123;
        ...
}
</code></pre><h3 id="local-variable-naming" tabindex="-1">Local variable naming <a class="header-anchor" href="#local-variable-naming" aria-label="Permalink to &quot;Local variable naming&quot;">​</a></h3><p>Variables are generally lowercase and underscore separated, but no strict guidelines otherwise.</p><p>Avoid local variable names which might shadow with global symbols defined in platform headers (not just one platform but potentially any platform). For example, using <code>alloc</code> would be a bad idea, and <code>index</code> also causes concrete problems with some GCC versions. There are a few blacklisted identifiers in the code policy check.</p><h3 id="other-variable-declarations" tabindex="-1">Other variable declarations <a class="header-anchor" href="#other-variable-declarations" aria-label="Permalink to &quot;Other variable declarations&quot;">​</a></h3><p>Use symbol visibility macros throughout.</p><p>For DUK_INTERNAL_DECL macro use a DUK_SINGLE_FILE wrapper check to avoid both declaring and defining a static variable (see GH-63):</p><pre><code>/* Header: declare internal variable visible across files. */
#if !defined(DUK_SINGLE_FILE)
DUK_INTERNAL_DECL int duk_internal_foo;
#endif  /* !DUK_SINGLE_FILE */

/* Source: define the variable. */
DUK_INTERNAL int duk_internal_foo;
</code></pre><h3 id="function-declarations-and-definitions" tabindex="-1">Function declarations and definitions <a class="header-anchor" href="#function-declarations-and-definitions" aria-label="Permalink to &quot;Function declarations and definitions&quot;">​</a></h3><p>For functions with a small number of arguments:</p><pre><code>DUK_INTERNAL_DECL void foo(duk_hthread *thr, duk_idx_t idx);
</code></pre><p>In definition opening brace on same line:</p><pre><code>DUK_INTERNAL void foo(duk_hthread *thr, duk_idx_t idx) {
        /* ... */
}
</code></pre><p>If there are too many arguments to fit one line comfortably, symbol visibility macro (and other macros) on a separate line, arguments aligned with spaces:</p><pre><code>DUK_INTERNAL_DECL
void foo(duk_hthread *thr,
         duk_idx_t idx,
         duk_uint_t foo,
         duk_uint_t bar,
         duk_uint_t quux,
         duk_uint_t baz);
</code></pre><p>Again opening brace on the same line:</p><pre><code>DUK_INTERNAL
void foo(duk_hthread *thr,
         duk_idx_t idx,
         duk_uint_t foo,
         duk_uint_t bar,
         duk_uint_t quux,
         duk_uint_t baz) {
        /* ... */
}
</code></pre><h3 id="function-calls-with-many-difficult-to-identify-arguments" tabindex="-1">Function calls with many difficult-to-identify arguments <a class="header-anchor" href="#function-calls-with-many-difficult-to-identify-arguments" aria-label="Permalink to &quot;Function calls with many difficult-to-identify arguments&quot;">​</a></h3><p>Example helper:</p><pre><code>duk_bool_t frob(duk_hthread *thr, int allow_foo, int allow_bar, int allow_quux);
</code></pre><p>Such helpers lead to call sites which are difficult to read:</p><pre><code>duk_bool_t rc = frob(thr, 1, 0, 1);
</code></pre><p>In such cases, inline comments can be used to clarify the argument names:</p><pre><code>duk_bool_t rc = frob(thr, 1 /*allow_foo*/, 0 /*allow_bar*/, 1 /*allow_quux*/);
</code></pre><h3 id="include-guards" tabindex="-1">Include guards <a class="header-anchor" href="#include-guards" aria-label="Permalink to &quot;Include guards&quot;">​</a></h3><p>There are several popular include guard conventions. Leading underscores are reserved and should be avoided in user code. The current include guard convention is:</p><pre><code>/* duk_foo.h */

#if !defined(DUK_FOO_H_INCLUDED)
#define DUK_FOO_H_INCLUDED

...

#endif /* DUK_FOO_H_INCLUDED */
</code></pre><p>See:</p><ul><li><a href="http://en.wikipedia.org/wiki/Include_guard" target="_blank" rel="noreferrer">http://en.wikipedia.org/wiki/Include_guard</a></li></ul><p><code>#pragma once</code> is not portable, and is not used.</p><h3 id="preprocessor-value-comparisons-with-empty-arguments-must-be-avoided" tabindex="-1">Preprocessor value comparisons with empty arguments must be avoided <a class="header-anchor" href="#preprocessor-value-comparisons-with-empty-arguments-must-be-avoided" aria-label="Permalink to &quot;Preprocessor value comparisons with empty arguments must be avoided&quot;">​</a></h3><p>This will cause a compile error even with newer compilers:</p><pre><code>/* FOO and BAR are defined, BAR is defined with an empty value. */
#define FOO 123
#define BAR

#if defined(FOO) &amp;&amp; defined(BAR) &amp;&amp; (FOO == BAR)
/* ... */
#endif
</code></pre><p>It doesn&#39;t help to guard the comparison because the root cause is the comparison having an empty argument:</p><pre><code>#define FOO 123
#define BAR

#if defined(FOO) &amp;&amp; defined(BAR) /* will match */
#if (FOO == BAR) /* still fails */
/* ... */
#endif
#endif
</code></pre><p>The &quot;guarded&quot; form above is still preferred because it works also with compilers which fail a comparison with an undefined value.</p><p>Explicitly detecting an empty value seems difficult to do properly, so there doesn&#39;t seem to be an easy way to avoid this:</p><ul><li><a href="http://stackoverflow.com/questions/3781520/how-to-test-if-preprocessor-symbol-is-defined-but-has-no-value" target="_blank" rel="noreferrer">http://stackoverflow.com/questions/3781520/how-to-test-if-preprocessor-symbol-is-defined-but-has-no-value</a></li></ul><p>The comparison is not an issue in Duktape internals when comparing against <strong>required config options</strong>. This is safe, for example:</p><pre><code>#if (DUK_USE_ALIGN_BY == 8)
/* ... */
#endif
</code></pre><p>The comparison is a concrete issue in <code>duk_config.h</code> where the defines provided by the environment vary a great deal. See for example:</p><ul><li><a href="https://github.com/judofyr/duktape.rb/pull/33#issuecomment-159488580" target="_blank" rel="noreferrer">https://github.com/judofyr/duktape.rb/pull/33#issuecomment-159488580</a></li></ul><h3 id="preprocessor-ifdef-vs-if-defined" tabindex="-1">Preprocessor ifdef vs. if defined <a class="header-anchor" href="#preprocessor-ifdef-vs-if-defined" aria-label="Permalink to &quot;Preprocessor ifdef vs. if defined&quot;">​</a></h3><p>This form is preferred:</p><pre><code>#if defined(FROB)
...
#endif
</code></pre><p>instead of:</p><pre><code>#ifdef FROB
...
#endif
</code></pre><h3 id="fixme-todo-xxx-note-etc-markers" tabindex="-1">FIXME, TODO, XXX, NOTE, etc markers <a class="header-anchor" href="#fixme-todo-xxx-note-etc-markers" aria-label="Permalink to &quot;FIXME, TODO, XXX, NOTE, etc markers&quot;">​</a></h3><p>The following markers are used inside comments:</p><p>FIXME:</p><p>: Issue should be fixed before a stable release. Does not block an intermediate release.</p><p>TODO:</p><p>: Issue should be fixed but does not block a release (even a stable one).</p><p>XXX:</p><p>: Like TODO, but it may be unclear what the proper fix is.</p><p>NOTE:</p><p>: Noteworthy issue important for e.g. maintenance, but no action needed.</p><p>SCANBUILD:</p><p>: Scan-build note: describe why a warning is produced for warnings that cannot be easily fixed or silenced.</p><p>The markers must appear verbatim and be followed by a colon without any space in between. This is important so that the markers can be grep&#39;d. Example:</p><pre><code>/* FIXME: foo should have a different type */
</code></pre><h3 id="unused-variables" tabindex="-1">Unused variables <a class="header-anchor" href="#unused-variables" aria-label="Permalink to &quot;Unused variables&quot;">​</a></h3><p>Suppressing unused variable warnings use the following macro:</p><pre><code>DUK_UNREF(my_unused_var);
</code></pre><p>Internally, this currently uses the form:</p><pre><code>(void) my_unused_var;  /* suppress warning */
</code></pre><p>This seems to work with both GCC and Clang. The form:</p><pre><code>my_unused_var = my_unused_var;  /* suppress warning */
</code></pre><p>works with GCC but not with Clang.</p><h3 id="unreachable-code-and-noreturn-functions" tabindex="-1">Unreachable code and &quot;noreturn&quot; functions <a class="header-anchor" href="#unreachable-code-and-noreturn-functions" aria-label="Permalink to &quot;Unreachable code and \\&quot;noreturn\\&quot; functions&quot;">​</a></h3><p>Noreturn functions must have a void return type and are declared as:</p><pre><code>DUK_NORETURN(void myfunc(void));
</code></pre><p>The macro style is awkward but is not easy to implement in another way.</p><p>Unreachable points in code are declared as:</p><pre><code>DUK_UNREACHABLE();
</code></pre><h3 id="likely-unlikely-comparisons" tabindex="-1">Likely/unlikely comparisons <a class="header-anchor" href="#likely-unlikely-comparisons" aria-label="Permalink to &quot;Likely/unlikely comparisons&quot;">​</a></h3><p>Providing &quot;branch hints&quot; may provide benefits on some platforms but not on others. <code>DUK_LIKELY()</code> and <code>DUK_UNLIKELY()</code> can always be used in code, and will be defined as a no-op if using branch hints on the target platform is not possible or useful.</p><p><code>DUK_UNLIKELY()</code> should be used at least for conditions which are almost never true, like invalid API call arguments, string size overflows, etc:</p><pre><code>if (DUK_UNLIKELY(ptr == NULL)) {
        /* ... */
}
</code></pre><p>Similarly, <code>DUK_LIKELY()</code> should be used for conditions which are almost always true:</p><pre><code>if (DUK_LIKELY(ptr != NULL)) {
        /* ... */
}
</code></pre><p>The argument to these macros must be an integer:</p><pre><code>/* correct */
if (DUK_LIKELY(ptr != NULL)) {
        /* ... */
}

/* incorrect */
if (DUK_LIKELY(ptr)) {
        /* ... */
}
</code></pre><h3 id="inlining-control" tabindex="-1">Inlining control <a class="header-anchor" href="#inlining-control" aria-label="Permalink to &quot;Inlining control&quot;">​</a></h3><p>For the vast majority of functions it&#39;s unnecessary to force a specific inlining behavior (which is compiler specific). There are a few inlining control macros that can be applied when necessary for performance or code size.</p><p>Inline control macros are applied to function definition, not declaration:</p><pre><code>/* Declaration */
DUK_INTERNAL_DECL duk_foo(...);

/* Definition */
DUK_INTERNAL DUK_ALWAYS_INLINE duk_foo(...) {
        ...
}
</code></pre><p>Applying inline control in the declaration causes issues with e.g. gcc.</p><h3 id="c-compatibility" tabindex="-1">C++ compatibility <a class="header-anchor" href="#c-compatibility" aria-label="Permalink to &quot;C++ compatibility&quot;">​</a></h3><p>The source code is meant to be C++ compatible so that you can both:</p><ol><li>Compile Duktape with C but use it from C++.</li><li>Compile Duktape with C++ and use it from C++ (preferred when using C++).</li></ol><p>To achieve this:</p><ul><li>Avoid variable names conflicting with C++ keywords (<code>throw</code>, <code>class</code>, <code>this</code>, etc).</li><li>Use explicit casts for all pointer conversions.</li><li>Make sure there are no <code>static</code> forward declarations for <em>data symbols</em>, see symbol visibility section.</li></ul><h3 id="debug-macros" tabindex="-1">Debug macros <a class="header-anchor" href="#debug-macros" aria-label="Permalink to &quot;Debug macros&quot;">​</a></h3><p>Debug macros unfortunately need double wrapping to deal with lack of variadic macros on pre-C99 platforms:</p><pre><code>DUK_D(DUK_DPRINT(&quot;foo&quot;));
DUK_DD(DUK_DDPRINT(&quot;bar&quot;));
DUK_DDD(DUK_DDDPRINT(&quot;quux&quot;));
</code></pre><p>The outer and inner defines must match in their debug level. On non-C99 platforms the outer macro allows a debug log write to be omitted entirely. If the log writes are not omitted, the workaround for lack of variadic macros causes a lot of warnings with some compilers. With this wrapping, at least the non-debug build will be clean on non-C99 compilers.</p><h3 id="gcc-clang-wcast-align" tabindex="-1">Gcc/clang -Wcast-align <a class="header-anchor" href="#gcc-clang-wcast-align" aria-label="Permalink to &quot;Gcc/clang -Wcast-align&quot;">​</a></h3><p>When casting from e.g. a <code>duk_uint8_t *</code> to a struct pointer clang will emit a warning when <code>-Wcast-align</code> is used; see <code>misc/clang_cast_align.c</code> and <a href="https://github.com/svaarala/duktape/issues/270" target="_blank" rel="noreferrer">https://github.com/svaarala/duktape/issues/270</a>.</p><p>One fix is to change the original pointer being cast into a <code>void *</code> from a char/byte-based pointer (e.g. <code>duk_uint8_t *</code>):</p><pre><code>void *p = DUK_FICTIONAL_GET_BUFFER_BASE(...);
struct dummy *dummy = (struct dummy *) p;
</code></pre><p>However, this doesn&#39;t work well when pointer arithmetic on the pointer is needed; pointer arithmetic on a void pointer works on many compilers but is non-standard, non-portable behavior. Instead, raw (byte-based) pointer arithmetic should be done on a char/byte pointer (e.g. <code>duk_uint8_t *</code>). In such situations casting through a <code>void *</code> avoids the warning:</p><pre><code>duk_uint8_t *p = DUK_FICTIONAL_GET_BUFFER_BASE(...);
struct dummy *dummy = (struct dummy *) (void *) (p + 16);
</code></pre><p>Code doing casts like this must of course be aware of actual target alignment requirements and respect them properly.</p><h3 id="gcc-clang-wcast-qual" tabindex="-1">Gcc/clang -Wcast-qual <a class="header-anchor" href="#gcc-clang-wcast-qual" aria-label="Permalink to &quot;Gcc/clang -Wcast-qual&quot;">​</a></h3><p>As a general rule casting from e.g. <code>const char *</code> to <code>char *</code> should be avoided by reworking code structure. Sometimes this can&#39;t be avoided though; for example, <code>duk_push_pointer()</code> takes a <code>void *</code> argument and if the source pointer is <code>const char *</code> a cast may be necessary.</p><p>There doesn&#39;t seem to be a nice portable approach:</p><ul><li>Casting through a <code>void *</code> is not enough to silence the warning.</li><li>Casting through an integer (e.g. <code>(void *) (duk_uintptr_t) const_ptr</code>) works but assumes that pointers can be safely cast through an integer. This is not necessarily portable to platforms with segmented pointers. Also, <code>(u)intptr_t</code> is an optional type in C99.</li></ul><p>If a const-losing cast is required internally, the following macro is used to cast an arbitrary const pointer into a <code>void *</code>:</p><pre><code>const my_type *src;

dst = (char *) DUK_LOSE_CONST(src);
</code></pre><p>It is defined in <code>duk_config.h</code> so that it can be hacked if necessary. If nothing else, it signals the intent of the call site.</p><p>A similar issue exists for volatile pointers. Technically casting from a volatile pointer to a non-volatile pointer and then using the non-volatile pointer has &quot;undefined behavior&quot;. In practice the compiler may generate code which conflicts with assumed behavior, e.g. not reading or writing the value behind the pointer every time. Rework the code to avoid the cast. For example:</p><pre><code>void write_something(int *target);

void test(void) {
    volatile int x = 123;

    write_something((int *) &amp;x);
}
</code></pre><p>can be reworked to:</p><pre><code>void write_something(int *target);

void test(void) {
    volatile int x = 123;
    int tmp;

    write_something(&amp;tmp);
    x = tmp;
}
</code></pre><p>For volatile byte arrays a workaround is awkward because you can&#39;t use a non-volatile temporary and then <code>memcpy()</code> from the temporary into the volatile buffer: a volatile-to-non-volatile cast would happen for the <code>memcpy()</code> call. You&#39;d need to copy the bytes one by one manually or use an external helper which accepts a volatile source and a non-volatile destination.</p><h3 id="gcc-clang-wfloat-equal" tabindex="-1">Gcc/clang -Wfloat-equal <a class="header-anchor" href="#gcc-clang-wfloat-equal" aria-label="Permalink to &quot;Gcc/clang -Wfloat-equal&quot;">​</a></h3><p>When comparing floats for equality (<code>==</code>) or inequality (<code>!=</code>) there are subtle portability issues. For example, with x87 the compiler may use extended precision (80 bits) even when the arguments are nominally IEEE doubles. Gcc/clang warn about such comparisons when <code>-Wfloat-equal</code> is used. Useful discussion: <a href="https://randomascii.wordpress.com/2012/03/21/intermediate-floating-point-precision/" target="_blank" rel="noreferrer">https://randomascii.wordpress.com/2012/03/21/intermediate-floating-point-precision/</a></p><p>Duktape needs to do float equality comparisons in some cases, and when the comparisons are done properly they&#39;re not an actual portability issue. Unfortunately there doesn&#39;t seem to be an idiom which avoids the warning, see: <a href="https://github.com/svaarala/duktape/issues/234" target="_blank" rel="noreferrer">https://github.com/svaarala/duktape/issues/234</a>. So at present Duktape code base is not <code>-Wfloat-equal</code> clean.</p><p>One workaround would be to implement all comparisons by looking at the IEEE byte representation directly (using a union with double and byte array). This is a rather heavy workaround though.</p><h3 id="avoid-u-intptr-t-arithmetic" tabindex="-1">Avoid (u)intptr_t arithmetic <a class="header-anchor" href="#avoid-u-intptr-t-arithmetic" aria-label="Permalink to &quot;Avoid (u)intptr_t arithmetic&quot;">​</a></h3><p>The <code>(u)intptr_t</code> types are optional in C99 so it&#39;s best to avoid using them whenever possible. Duktape provides <code>duk_(u)intptr_t</code> even when they&#39;re missing.</p><p>Platforms/compilers with exotic pointer models may have unexpected behavior when a pointer is cast to <code>(u)intptr_t</code> and then used in arithmetic or binary operations. For more details, see:</p><ul><li><a href="https://github.com/svaarala/duktape/issues/530#issuecomment-171654860" target="_blank" rel="noreferrer">https://github.com/svaarala/duktape/issues/530#issuecomment-171654860</a></li><li><a href="https://github.com/svaarala/duktape/issues/530#issuecomment-171697759" target="_blank" rel="noreferrer">https://github.com/svaarala/duktape/issues/530#issuecomment-171697759</a></li></ul><p>Arithmetic on integer cast pointer values may be needed e.g. for alignment:</p><pre><code>/* Align to 4. */
while (((duk_size_t) (p)) &amp; 0x03) {
    p++;
}
</code></pre><p><strong>Don&#39;t</strong> use <code>duk_(u)intptr_t</code> in such cases to avoid portability issues with exotic pointer models:</p><pre><code>/* AVOID THIS */
while (((duk_uintptr_t) (p)) &amp; 0x03) {
    p++;
}
</code></pre><h2 id="argument-order" tabindex="-1">Argument order <a class="header-anchor" href="#argument-order" aria-label="Permalink to &quot;Argument order&quot;">​</a></h2><p>Having a consistent argument order makes it easier to read and maintain code. Also when the argument position of functions match it often saves some move instructions in the compiled code.</p><p>Current conventions:</p><ul><li>The <code>thr</code> or <code>heap</code> argument, if present, is always first.</li><li>For callbacks, a userdata argument follows <code>thr</code> or <code>heap</code>; if neither is present, the userdata argument is first. Same applies to user-defined macros which accept a userdata argument (e.g. pointer compression macros).</li><li>When registering a callback, the userdata argument to be given in later callbacks is immediately after the callback(s) related to the userdata.</li><li>Flags fields are typically last.</li></ul><h2 id="duk-context-vs-duk-hthread" tabindex="-1">duk_context vs. duk_hthread <a class="header-anchor" href="#duk-context-vs-duk-hthread" aria-label="Permalink to &quot;duk_context vs. duk_hthread&quot;">​</a></h2><p>Both <code>duk_context</code> and <code>duk_hthread</code> typedefs resolve to <code>struct duk_hthread</code> so they&#39;re interchangeable. Guidelines:</p><ul><li>Use <code>duk_context *ctx</code> only in public API declarations.</li><li>Use <code>duk_hthread *thr</code> everywhere else, in all internals, including the definitions of public API functions.</li></ul><h2 id="symbol-visibility" tabindex="-1">Symbol visibility <a class="header-anchor" href="#symbol-visibility" aria-label="Permalink to &quot;Symbol visibility&quot;">​</a></h2><h3 id="symbol-visibility-issues" tabindex="-1">Symbol visibility issues <a class="header-anchor" href="#symbol-visibility-issues" aria-label="Permalink to &quot;Symbol visibility issues&quot;">​</a></h3><p>There are several issues related to symbol visibility:</p><ul><li>Minimality: Duktape should only expose the function and data symbols that are used by calling programs. This is a hygiene issue but also affects compiler optimization: if a function is internal, it doesn&#39;t need to conform to a rigid ABI, which allows some optimizations. See e.g. <a href="https://gcc.gnu.org/wiki/Visibility" target="_blank" rel="noreferrer">https://gcc.gnu.org/wiki/Visibility</a>.</li><li>Single file vs. separate files: symbols need to be declared differently depending on whether Duktape is compiled from a single file source or multiple source files.</li><li>Compiling Duktape vs. compiling application: some compiler attributes need to be set differently when compiling Duktape vs. compiling the application (see MSVC below).</li><li>Compiler dependency: controlling link visibility of non-static symbols requires compiler specific mechanisms.</li></ul><h3 id="symbol-visibility-macros" tabindex="-1">Symbol visibility macros <a class="header-anchor" href="#symbol-visibility-macros" aria-label="Permalink to &quot;Symbol visibility macros&quot;">​</a></h3><p>All Duktape symbols are declared with one of the following prefix macros:</p><ul><li><code>DUK_EXTERNAL_DECL</code> and <code>DUK_EXTERNAL</code>: symbol is exposed to calling application. May require compiler specific link specification.</li><li><code>DUK_INTERNAL_DECL</code> and <code>DUK_INTERNAL</code>: symbol is internal to Duktape, but may reside in another compilation unit. May require compiler specific link specification.</li><li><code>DUK_LOCAL_DECL</code> and <code>DUK_LOCAL</code>: symbol is file local. This maps to <code>static</code> and currently requires no compiler specific treatment.</li></ul><p>As usual, <code>duk_config.h</code> defines these visibility symbols as appropriate, taking into account both the compiler and whether Duktape is being compiled from a single or multiple files.</p><p>Missing a visibility macro is not critical on GCC: it will just pollute the symbol table. On MSVC it can make break a DLL build of Duktape.</p><h3 id="avoid-static-forward-declarations-for-data-symbols" tabindex="-1">Avoid &quot;static&quot; forward declarations for data symbols <a class="header-anchor" href="#avoid-static-forward-declarations-for-data-symbols" aria-label="Permalink to &quot;Avoid \\&quot;static\\&quot; forward declarations for data symbols&quot;">​</a></h3><p>C++ does not allow a <code>static</code> variable to be both forward declared and defined (see GH-63 for more discussion). It&#39;s also not ideal for C and is a potential portability issue. This issue is avoided by:</p><ul><li>Not using <code>DUK_LOCAL_DECL</code> for local data symbols: it would always map to a <code>static</code> data declaration.</li><li>Not using <code>DUK_INTERNAL_DECL</code> for data symbols when compiling from the single file distribution: such data symbols would map to <code>static</code> in the single file distribution (but not in the multiple files distribution where the declarations are needed).</li></ul><p>The <code>DUK_INTERNAL_DECL</code> idiom is:</p><pre><code>#if !defined(DUK_SINGLE_FILE)
DUK_INTERNAL_DECL const char *duk_str_not_object;
#endif /* !DUK_SINGLE_FILE */
</code></pre><p>For this to work in the single file case, configure tooling must ensure that the symbol definition appears before its use. This is currently handled via manual file reordering.</p><h3 id="concrete-example" tabindex="-1">Concrete example <a class="header-anchor" href="#concrete-example" aria-label="Permalink to &quot;Concrete example&quot;">​</a></h3><p>As a concrete example, this is how these defines work with GCC 4.x.x. For function declaration in header:</p><pre><code>/* Header file */
DUK_EXTERNAL_DECL void foo(void);
DUK_INTERNAL_DECL void foo(void);
DUK_LOCAL_DECL void foo(void);

/* Single file */
__attribute__ ((visibility(&quot;default&quot;))) extern void foo(void);
static void foo(void);
static void foo(void);

/* Separate files */
__attribute__ ((visibility(&quot;default&quot;))) extern void foo(void);
__attribute__ ((visibility(&quot;hidden&quot;))) extern void foo(void);
static void foo(void);
</code></pre><p>For the actual function declaration:</p><pre><code>/* Source file */
DUK_EXTERNAL void foo(void) { ... }
DUK_INTERNAL void foo(void) { ... }
DUK_LOCAL void foo(void) { ... }

/* Single file */
__attribute__ ((visibility(&quot;default&quot;))) void foo(void) { ... }
static void foo(void) { ... }
static void foo(void) { ... }

/* Separate files */
__attribute__ ((visibility(&quot;default&quot;))) void foo(void) { ... }
__attribute__ ((visibility(&quot;hidden&quot;))) void foo(void) { ... }
static void foo(void) { ... }
</code></pre><p>As seen from this example, different outcomes are needed for forward declaring a symbol and actually defining the symbol. For now, the same macros work for function and data symbols.</p><h3 id="msvc-dll-import-export" tabindex="-1">MSVC DLL import/export <a class="header-anchor" href="#msvc-dll-import-export" aria-label="Permalink to &quot;MSVC DLL import/export&quot;">​</a></h3><p>For MSVC, DLL import/export attributes are needed to build as a DLL. When compiling Duktape, public symbols should be declared as &quot;dllexport&quot; in both header files and the actual declarations. When compiling a user application, the same header symbols must be declared as &quot;dllimport&quot;. The compilation context is available through <code>DUK_COMPILING_DUKTAPE</code>. For more on MSVC dllimport/dllexport, see:</p><ul><li><a href="http://msdn.microsoft.com/en-us/library/y4h7bcy6.aspx" target="_blank" rel="noreferrer">http://msdn.microsoft.com/en-us/library/y4h7bcy6.aspx</a></li></ul><h2 id="shared-strings" tabindex="-1">Shared strings <a class="header-anchor" href="#shared-strings" aria-label="Permalink to &quot;Shared strings&quot;">​</a></h2><p>Sharing of constant internal strings has multiple considerations:</p><ul><li><p>Some very old compilers won&#39;t share the same string value for multiple occurrences of the same literal string; newer compilers will treat such strings as <code>const</code> and share them.</p></li><li><p>If strings are declared with explicit symbols which are referred to from code (explicit sharing), sharing is guaranteed but such strings may end up in a symbol table without some kind of compiler specific &quot;linker script&quot; (although for a combined duktape.c/duktape.h the strings can be declared static):</p><pre><code>const char *shared_string = &quot;shared string;

/* foo.c */
duk_push_sprintf(thr, &quot;%s&quot;, shared_string);

/* bar.c */
sprintf(buf, &quot;%s: %d&quot;, shared_string, 123);
</code></pre></li><li><p>In low memory environments it may be desirable to simplify or shorten messages, or perhaps merge multiple strings into a more generic shared message (e.g. &quot;parse error: invalid token&quot;, &quot;parse error: expect lparen&quot; could be mapped to &quot;parse error&quot;).</p></li></ul><p>The current approach for shared strings is as follows:</p><ul><li><p>Shared strings are referred to using macros in Duktape internals. The macros begin with a <code>DUK_STR_</code> prefix:</p><pre><code>DUK_ERROR(thr, DUK_ERR_SYNTAX_ERROR, DUK_STR_PARSE_ERROR);
</code></pre></li><li><p><code>duk_strings.h</code> provides the necessary macros and decides what string each macro maps to (depending on e.g. memory footprint target). In case string literals are automatically shared by the compiler, the preferred definition may be e.g.:</p><pre><code>#define DUK_STR_PARSE_ERROR &quot;parse error&quot;
</code></pre><p>If not, an explicit shared string may be better:</p><pre><code>/* Note: the extern should be rewritten to &quot;static&quot; in a single
 * file distributable.
 */

#define DUK_STR_PARSE_ERROR duk_str_parse_error
extern const char *duk_str_parse_error;
</code></pre></li><li><p><code>duk_strings.c</code> contains the actual shared string values required by the macros (assuming the macros don&#39;t provide the strings directly).</p></li></ul><p>The upsides include:</p><ul><li>Call sites are relatively clean.</li><li>Footprint tuning is quite flexible.</li><li>Message consistency is easier to achieve than by having strings in the call sites.</li><li>Non-ASCII (EBCDIC) portability may be easier to achieve.</li></ul><p>The downsides include:</p><ul><li><p>Conditional strings need to be conditional in <code>duk_strings.c</code> too. This easily becomes messy and easy to get wrong. Unused strings are difficult to detect. By using literal strings directly in <code>duk_strings.h</code> this is not an issue (but requires a compiler that shares string constants).</p></li><li><p>Format strings don&#39;t abstract entirely. The arguments of a formatted call must match the format string, so whatever footprint variants are used, they must have the same argument list. For example:</p><pre><code>&quot;parse error, got: %d&quot;
</code></pre><p>cannot be replaced with a shared:</p><pre><code>&quot;parse error&quot;
</code></pre><p>for this reason.</p></li><li><p>Indirection obscures the strings emitted from each call site a bit, and makes the code less modular.</p></li></ul><h2 id="portability-concerns" tabindex="-1">Portability concerns <a class="header-anchor" href="#portability-concerns" aria-label="Permalink to &quot;Portability concerns&quot;">​</a></h2><h3 id="no-variadic-macros" tabindex="-1">No variadic macros <a class="header-anchor" href="#no-variadic-macros" aria-label="Permalink to &quot;No variadic macros&quot;">​</a></h3><p>Lack of variadic macros can be worked around by using comma expressions. The <code>duk_push_error_object()</code> API call is a good example. It needs to capture the call site&#39;s <code>__FILE__</code> and <code>__LINE__</code> which needs some macro expansions to be included in the function call arguments.</p><p>Without variadic macros it&#39;s defined as:</p><pre><code>DUK_EXTERNAL_DECL duk_idx_t duk_push_error_object_stash(duk_hthread *thr, duk_errcode_t err_code, const char *fmt, ...);
/* Note: parentheses are required so that the comma expression works in assignments. */
#define duk_push_error_object  \\
        (duk_api_global_filename = __FILE__, \\
         duk_api_global_line = (duk_int_t) (__LINE__), \\
         duk_push_error_object_stash) /* last value is func pointer, arguments follow in parens */
</code></pre><p>When you call it as:</p><pre><code>int err_idx = duk_push_error_object(thr, 123, &quot;foo %s&quot;, &quot;bar&quot;);
</code></pre><p>It gets expanded to:</p><pre><code>int err_idx = (duk_api_global_filename = __FILE__, \\
               duk_api_global_line = (duk_int_t) (__LINE__), \\
               duk_push_error_object_stash) (thr, 123, &quot;foo %s&quot;, &quot;bar&quot;);
</code></pre><p>The comma expression is evaluated in order performing the stash assignments. The final expression is a function pointer (<code>duk_push_error_object_stash</code>), and the parenthesized argument list is used to call the function.</p><p>Note that the parentheses around the comma expression are required. This would not work:</p><pre><code>int err_idx = duk_api_global_filename = __FILE__, \\
              duk_api_global_line = (duk_int_t) (__LINE__), \\
              duk_push_error_object_stash (thr, 123, &quot;foo %s&quot;, &quot;bar&quot;);
</code></pre><p>The problem is that <code>__FILE__</code> gets assigned to err_idx.</p><p>The limitation in this technique is the need to &quot;stash&quot; the file/line information temporarily which is not thread safe unless the stash is located e.g. in the <code>duk_hthread</code> or <code>duk_heap</code> structure. (At least up to Duktape 1.4.x the stashes for file/line are global and thus not thread safe; the potential issues don&#39;t compromise memory safety though.)</p><h3 id="missing-or-broken-platform-functions" tabindex="-1">Missing or broken platform functions <a class="header-anchor" href="#missing-or-broken-platform-functions" aria-label="Permalink to &quot;Missing or broken platform functions&quot;">​</a></h3><p>Sometimes platform functions are missing, even when they&#39;re supposed to be present. For instance, a compiler might advertise as being C99 compliant but lack some mandatory functions.</p><p>Sometimes platform functions may be present but broken. For instance, some old uclibc versions have a broken <code>memcpy()</code> but a working <code>memmove()</code>.</p><h3 id="platform-functions-which-cannot-be-referred-to-using-function-pointers" tabindex="-1">Platform functions which cannot be referred to using function pointers <a class="header-anchor" href="#platform-functions-which-cannot-be-referred-to-using-function-pointers" aria-label="Permalink to &quot;Platform functions which cannot be referred to using function pointers&quot;">​</a></h3><p>On some platforms built-in functions may be defined as inline functions or macros. Any code which assumes that built-in functions can be used as function pointers will then break. There are some platform &quot;polyfills&quot; which use macros in this way, and it seems that Microsoft VS2013 may behave like this at least with some options.</p><p>This problem can be avoided by using explicit function wrappers when a function pointer is needed:</p><pre><code>double duk__acos(double x) {
        return acos(x);
}

/* ... use duk__acos as a function pointer */
</code></pre><h3 id="va-copy" tabindex="-1">va_copy <a class="header-anchor" href="#va-copy" aria-label="Permalink to &quot;va_copy&quot;">​</a></h3><p>Duktape needs <code>va_copy()</code> to implement <code>duk_push_sprintf()</code> which needs trial printing of a formatted string into a buffer whose required size is not known beforehand.</p><p>Most vararg macros are C89 but <code>va_copy()</code> is C99 / C++11, so a replacement is needed for older environments. This replacement is difficult to implement in a portable fashion because the type of <code>va_list</code> varies a lot.</p><h3 id="strict-aliasing-rules" tabindex="-1">Strict aliasing rules <a class="header-anchor" href="#strict-aliasing-rules" aria-label="Permalink to &quot;Strict aliasing rules&quot;">​</a></h3><p>Strict aliasing rules and prohibition of dereferencing type-punned pointers are good for portability so the implementation should adhere to the common rules, e.g. use a union to convert between types. Sometimes this is not straightforward. For instance, the indirect realloc approach currently in use needs a getter callback to avoid type-punning.</p><p>Current goal is to compile and work without warnings even with strict aliasing rules enforced.</p><h3 id="numeric-types" tabindex="-1">Numeric types <a class="header-anchor" href="#numeric-types" aria-label="Permalink to &quot;Numeric types&quot;">​</a></h3><p>This is a complicated topic covered in a separate section below.</p><h3 id="numeric-constants" tabindex="-1">Numeric constants <a class="header-anchor" href="#numeric-constants" aria-label="Permalink to &quot;Numeric constants&quot;">​</a></h3><p>For the most part the rules are simple:</p><ul><li>For signed values, use &quot;L&quot; if the value is at most 32 bits wide and &quot;LL&quot; if at most 64 bits wide (keeping in mind that 64-bit constants are not always available).</li><li>For unsigned values, use &quot;UL&quot; and &quot;ULL&quot;, similarly.</li></ul><p>There is an interesting corner case when trying to define minimum signed integer value constants. For instance, trying to define a constant for the minimum 32-bit signed integer as follows is non-portable:</p><pre><code>#define MIN_VALUE (-0x80000000L)
</code></pre><p>Apparently the compiler will first evaluate &quot;0x80000000L&quot; and, despite being a signed constant, determine that it won&#39;t fit into a signed integer so it must be an unsigned value. Applying a unary minus to this unsigned value may then cause a warning and cause the negated value to be 0x80000000, i.e. a positive value (this happens on at least 64-bit VS2010).</p><p>This may then result in very unintuitive behavior. For instance:</p><pre><code>/* &#39;d&#39; is an input double to be clamped */
if (d &lt; (double) MIN_VALUE) {
        return (duk_int_t) MIN_VALUE;
}
</code></pre><p>The compiler will actually end up doing:</p><pre><code>if (d &lt; (double) 0x80000000) {  /* positive! */
        return (duk_int_t) 0x80000000;
}
</code></pre><p>Given zero as an input, the comparison will match (which is undesired), and the return statement will also contain a positive constant which is coerced to a signed integer. Although the input to the coercion is unsigned, the final result is -0x80000000. So, zero would &quot;clip&quot; to -0x80000000. This actually caused a non-trivial lexer bug in practice.</p><p>There seem to be only bad alternatives for defining signed integer minimum constants:</p><ul><li><code>(-0x7fffffffL - 1L)</code>: works, but constant will be computed and the C preprocessor won&#39;t necessarily be able to compare against it.</li><li><code>((int) -2147483648.0)</code>: same problem as above</li><li><code>(-0x80000000LL)</code>: works if 64-bit constants are available, but since this is not always the case, not really an option</li></ul><p>Linux <code>stdint.h</code> seems to be using the first option:</p><pre><code># define INT8_MIN               (-128)
# define INT16_MIN              (-32767-1)
# define INT32_MIN              (-2147483647-1)
# define INT64_MIN              (-__INT64_C(9223372036854775807)-1)
</code></pre><p>The fix should be applied to at least 32-bit and 64-bit constants, but the <code>stdint.h</code> header also applies to 16-bit constants.</p><p>For now:</p><ul><li>Use a computed value for minimum signed int value for 16, 32, and 64 bit constants.</li></ul><p>Also see:</p><ul><li><a href="http://stackoverflow.com/questions/6728900/hexadecimal-constant-in-c-is-unsigned-even-though-i-used-the-l-suffix" target="_blank" rel="noreferrer">http://stackoverflow.com/questions/6728900/hexadecimal-constant-in-c-is-unsigned-even-though-i-used-the-l-suffix</a></li></ul><h3 id="alignment" tabindex="-1">Alignment <a class="header-anchor" href="#alignment" aria-label="Permalink to &quot;Alignment&quot;">​</a></h3><p>Platforms vary in their alignment requirements:</p><ul><li>Some platforms cause an error (&quot;bus error&quot;) when alignment requirements are violated. Such platforms may have unaligned access instructions but unaligned accesses may need to be flagged to the compiler.</li><li>Some platforms have slower unaligned accesses but which behave externally just like aligned accesses. &quot;Slower&quot; may mean that an interrupt / trap handler is invoked, at a considerable penalty.</li><li>Some platforms support aligned and unaligned accesses with more or less the same performance.</li></ul><p>Alignment level may also vary, e.g. platform may require 4-byte alignment for both 32-bit integers and IEEE doubles, or it may require 4-byte alignment for 32-bit integers but 8-byte alignment for doubles, etc.</p><p>The user provided allocation functions are required to return memory aligned in a way which matches platform requirements. In particular, if the platform requires 8-byte alignment for doubles, returned memory is required to be 8-byte aligned (at least if the allocation size is 8 bytes or more). This ensures that single allocated structures are properly allocated by default. It also ensures that arrays of structures are properly aligned. The C compiler will pad a structure to ensure that proper alignment is kept in arrays too. For instance, if the platform requires 8-byte alignment and a struct contains a double (8 bytes) and a 32-bit integer (4 bytes), the struct will be padded from 12 bytes to 16 bytes to ensure that arrays of such structures work as expected.</p><p>There are a few places in Duktape where alignment may still be broken. They are related to &quot;byte packing tricks&quot; which are necessary to maintain a small footprint:</p><ul><li>Object property table must ensure that duk_tval values and pointer values are properly aligned. This is a particular issue with duk_tval values on platforms which require 8-byte alignment.</li><li>Buffer data after the <code>duk_hbuffer_fixed</code> header must be properly aligned. The <code>duk_hbuffer_fixed</code> structure always contains 4-byte elements but not necessarily 8-byte elements, so data following the structure is 4-byte aligned but not automatically 8-byte aligned.</li><li>The <code>duk_hstring</code> struct contains 4-byte values so it guarantees 4-byte alignment for string data, but there is no guarantee of an 8-byte alignment. This is not necessary, as strings don&#39;t need a specific alignment on any known platform.</li></ul><p>Forcing a struct size to a multiple of 4 or 8 can be done in a compiler specific manner with pragmas or struct attributes. The only somewhat portable solution is to add a suitably sized dummy member to the end of the struct (e.g. a <code>duk_uint64_t</code> to force the struct size to be a multiple of 8) or somewhere inside the struct. See <code>duk_hbuffer.h</code> for a concrete example.</p><h3 id="_64-bit-arithmetic" tabindex="-1">64-bit arithmetic <a class="header-anchor" href="#_64-bit-arithmetic" aria-label="Permalink to &quot;64-bit arithmetic&quot;">​</a></h3><p>Some compilers on 32-bit platforms may have 64-bit arithmetic problems (this seems to be the case with VBCC for example). There are also older compiles with no 64-bit support at all.</p><p>Duktape must compile with only 32-bit operations if necessary, so replacements are needed in the few places where 32 bits are not enough.</p><h3 id="array-indexing" tabindex="-1">Array indexing <a class="header-anchor" href="#array-indexing" aria-label="Permalink to &quot;Array indexing&quot;">​</a></h3><p>This is a common 64-bit portability bug:</p><pre><code>char *buf = /*something*/;
uint32_t idx = /*something*/
char *p;

p = &amp;buf[idx - 1];
</code></pre><p>The index computation happens using unsigned integers, so with <code>idx == 0</code> the index becomes 0xffffffffUL. With 32-bit pointers adding this value to the base (<code>buf</code>) is the same as subtracting one from the base. But with 64-bit pointers, these two operations are not the same.</p><p>A safer expression, preferred in Duktape internals, is:</p><pre><code>p = buf + idx - 1;
</code></pre><p>See <code>misc/arridx_unsigned.c</code> for more concrete examples.</p><h3 id="integer-overflows" tabindex="-1">Integer overflows <a class="header-anchor" href="#integer-overflows" aria-label="Permalink to &quot;Integer overflows&quot;">​</a></h3><p>Signed integer overflows are undefined behavior:</p><ul><li><a href="https://www.securecoding.cert.org/confluence/display/seccode/INT32-C.+Ensure+that+operations+on+signed+integers+do+not+result+in+overflow?showComments=false" target="_blank" rel="noreferrer">https://www.securecoding.cert.org/confluence/display/seccode/INT32-C.+Ensure+that+operations+on+signed+integers+do+not+result+in+overflow?showComments=false</a></li></ul><p>At least unsigned overflow handling is important, as it is needed to make &quot;add with carry&quot; etc convenient.</p><p>Detecting overflow in simple addition is straightforward when unsigned integer type bit size is exact:</p><pre><code>duk_uint32_t x, y, z;
/* ... */
z = x + y;
if (z &lt; x) {
        /* Overflow: (z &lt; x) or equivalently (z &lt; y) cannot be true unless
         * overflow occurs.  This relies on unsigned overflow behavior and
         * an exact bit size for the type.
         */
}
</code></pre><p>Detecting overflow in multiplication is a bit trickier. This comes up e.g. in array join/concat helper when it computes the combined size of separators (separator_size times separator_count). The check is easy if a larger type is available:</p><pre><code>duk_uint32_t x, y, z;
duk_uint64_t t;

t = (duk_uint64_t) x * (duk_uint64_t) y;
if (t &gt;= (duk_uint64_t) LIMIT) {
        /* Overflow. */
}
z = (duk_uint32_t) t;
</code></pre><p>However, for portability a 64-bit type cannot (for instance) be assumed. The following approach works without a larger temporary type, but is conservative and may indicate overflow even when one wouldn&#39;t occur:</p><pre><code>/*
 * Basic idea:
 *
 *      x * y &gt; limit     // limit is e.g. 2**32-1
 * &lt;=&gt;  x &gt; limit / y     // y != 0
 * &lt;=&gt;  y &gt; limit / x     // equivalent, x != 0
 *
 * When a truncating division is used on the right size, the result
 * is no longer equivalent:
 *
 *      x &gt; floor(limit / y)  &lt;==  x &gt; limit / y   // not ==&gt;
 *
 * Limit must fit into the integer type.
 */

duk_uint32_t x, y, z;

if (y != 0 &amp;&amp; x &gt; (duk_uint32_t) 0xffffffffU / y) {
        /* Probable overflow. */
}
z = x * y;
</code></pre><p>One can also simply test by division (but careful for division-by-zero):</p><pre><code>z = x * y;
if (x != 0 &amp;&amp; z / x != y) {
        /* Overflow. */
}
</code></pre><p>For 32-bit types the check is actually exact, see test in:</p><pre><code>misc/c_overflow_test.py 
</code></pre><h3 id="shifting" tabindex="-1">Shifting <a class="header-anchor" href="#shifting" aria-label="Permalink to &quot;Shifting&quot;">​</a></h3><p>With 32-bit integers the following may cause warnings on some compilers when the value is used in conjunction with unsigned values (see <code>duk_hobject.h</code>):</p><pre><code>#define FOO(v) ((v) &lt;&lt; 24)
</code></pre><p>Suppose <code>v</code> is 0x80 (signed constant). The result of the shift now has the highest bit (bit 31) set which causes the result to become unsigned. This can be fixed e.g. as:</p><pre><code>#define FOO(v) (((duk_uint_t) (v)) &lt;&lt; 24)
</code></pre><p>On a more general note, suppose a macro does:</p><pre><code>#define BAR(v) ((v) &lt;&lt; N)
</code></pre><p>What is a plain value coerced to during shifting? If the platform has 16-bit integers, can it be coerced to a 16-bit integer, with the left shift then overflowing? If so, all such shifts would need to be replaced with:</p><pre><code>#define BAR(v) (((duk_uint_t) (v)) &lt;&lt; N)
</code></pre><p><strong>This is not done now for shifts (as of Duktape 0.11.0).</strong></p><h3 id="switch-statement" tabindex="-1">Switch statement <a class="header-anchor" href="#switch-statement" aria-label="Permalink to &quot;Switch statement&quot;">​</a></h3><p>Any integral type should work as a switch argument, so avoid casting it.</p><h3 id="differences-in-malloc-realloc-and-free" tabindex="-1">Differences in malloc(), realloc(), and free() <a class="header-anchor" href="#differences-in-malloc-realloc-and-free" aria-label="Permalink to &quot;Differences in malloc(), realloc(), and free()&quot;">​</a></h3><p>For malloc(), zero size is special:</p><ul><li>A malloc() with zero size cannot fail, but may return either NULL or a non-NULL pointer which must be free()&#39;d.</li><li>Safest strategy is to: <ul><li>Consider malloc() failed if return value is NULL <em>and</em> requested size != 0. Otherwise consider successful.</li><li>If successful, store result pointer in internal data structures. Ensure that eventually free() is called for the pointer; free(NULL) is acceptable so no guard is needed.</li></ul></li></ul><p>For free():</p><ul><li>free(NULL) is allowed and guaranteed to be a no-op. Duktape relies on this.</li></ul><p>For realloc(), zero size is special as well:</p><ul><li>A realloc() with a zero size cannot fail, but may return either NULL or a non-NULL pointer which must be free()&#39;d.</li><li>Safest strategy is to: <ul><li>Consider realloc() failed if return value is NULL <em>and</em> requested size != 0. Otherwise consider successful.</li><li>If successful, store result pointer in internal data structures (replacing a previous value). Ensure that eventually free() is called for the pointer; free(NULL) is acceptable so no guard is needed.</li></ul></li></ul><h3 id="string-handling" tabindex="-1">String handling <a class="header-anchor" href="#string-handling" aria-label="Permalink to &quot;String handling&quot;">​</a></h3><h4 id="snprintf-buffer-size" tabindex="-1">snprintf buffer size <a class="header-anchor" href="#snprintf-buffer-size" aria-label="Permalink to &quot;snprintf buffer size&quot;">​</a></h4><p>NUL terminator behavior for snprintf() (and its friends) is inconsistent across implementations. Some ensure a NUL terminator added when truncated (unless of course the buffer size is zero) while others do not. The most portable way seems to be to:</p><pre><code>char buf[256];
snprintf(buf, sizeof(buf), &quot;format&quot;, args);
buf[sizeof(buf) - 1] = (char) 0;
</code></pre><p>Using sizeof(buf) - 1 for size may cause a NUL terminator to appear at the second to last character of buf in some implementations.</p><p>Examples of snprintf() calls which don&#39;t NUL terminate on truncation:</p><ul><li>Windows <code>_snprintf()</code>: <a href="http://msdn.microsoft.com/en-us/library/2ts7cx93.aspx" target="_blank" rel="noreferrer">http://msdn.microsoft.com/en-us/library/2ts7cx93.aspx</a></li></ul><h4 id="s-n-printf-s-and-null-value" tabindex="-1">s(n)printf %s and NULL value <a class="header-anchor" href="#s-n-printf-s-and-null-value" aria-label="Permalink to &quot;s(n)printf %s and NULL value&quot;">​</a></h4><p>Giving a NULL argument to <code>%s</code> format string may cause a segfault in some old compilers. Avoid NULL values for <code>%s</code>.</p><h4 id="use-of-sprintf-vs-snprintf" tabindex="-1">Use of sprintf vs. snprintf <a class="header-anchor" href="#use-of-sprintf-vs-snprintf" aria-label="Permalink to &quot;Use of sprintf vs. snprintf&quot;">​</a></h4><p>Use snprintf instead of sprintf by default, even when legal output size is known beforehand. There can always be bugs in the underlying standard library implementation. Sometimes the output size is known to be limited because input values are known to be constrained (e.g. year values are kept between [-999999,999999]). However, if there is a bug, it&#39;s better to corrupt a printed output value than to cause a memory error.</p><h3 id="ebcdic" tabindex="-1">EBCDIC <a class="header-anchor" href="#ebcdic" aria-label="Permalink to &quot;EBCDIC&quot;">​</a></h3><p>No longer considered. Assume compiler and target are ASCII based.</p><h2 id="setjmp-longjmp-and-volatile" tabindex="-1">Setjmp, longjmp, and volatile <a class="header-anchor" href="#setjmp-longjmp-and-volatile" aria-label="Permalink to &quot;Setjmp, longjmp, and volatile&quot;">​</a></h2><h3 id="volatile-variables" tabindex="-1">Volatile variables <a class="header-anchor" href="#volatile-variables" aria-label="Permalink to &quot;Volatile variables&quot;">​</a></h3><p>When a local variable in the function containing a <code>setjmp()</code> gets changed between <code>setjmp()</code> and <code>longjmp()</code> there is no guarantee that the change is visible after a <code>longjmp()</code> unless the variable is declared volatile. It should be safe to:</p><ul><li>Use non-volatile variables that are written before <code>setjmp()</code> and then only read.</li><li>Use volatile variables which can be read and written at any point.</li></ul><p>When pointer values are changed, be careful with placement of &quot;volatile&quot;:</p><pre><code>/* Non-volatile pointer, which points to a volatile integer. */
volatile int *ptr_x;

/* Volatile pointer, which points to a non-volatile integer. */
int * volatile x;
</code></pre><p>When a pointer itself may be reassigned, the latter is correct, e.g.:</p><pre><code>duk_hthread * volatile curr_thread;

curr_thread = thr;
</code></pre><p>In practice it seems that some compilers have trouble guaranteeing these semantics for variables that are assigned to before <code>setjmp()</code> and not changed before <code>longjmp()</code>. For instance, there are crashes on macOS when using <code>_setjmp()</code> in such cases. These crashes can be eliminated by declaring the variables volatile. (It might be that adding the &quot;volatile&quot; changes the compiler output enough to mask a different bug though.)</p><p>Optimizations may also cause odd situations, see e.g.:</p><ul><li><a href="http://blog.sam.liddicott.com/2013/09/why-are-setjmp-volatile-hacks-still.html" target="_blank" rel="noreferrer">http://blog.sam.liddicott.com/2013/09/why-are-setjmp-volatile-hacks-still.html</a></li></ul><p>With Emscripten a function containing <code>setjmp()</code> executes much more slowly than a function without it. For example, for the bytecode executor the speed improvement of refactoring <code>setjmp()</code> out of the main executor function was around 25%:</p><ul><li><a href="https://github.com/svaarala/duktape/pull/370" target="_blank" rel="noreferrer">https://github.com/svaarala/duktape/pull/370</a></li></ul><p>Some compilers generate incorrect code with setjmp. Some workarounds may be needed (e.g. optimizations may need to be disabled completely) for functions containing a setjmp:</p><ul><li><a href="https://github.com/svaarala/duktape/issues/369" target="_blank" rel="noreferrer">https://github.com/svaarala/duktape/issues/369</a></li></ul><p>To minimize the chances of the compiler handling setjmp/longjmp incorrectly, the cleanest approach would probable be to:</p><ul><li>Minimize the size of functions containing a <code>setjmp()</code>; use a wrapper with just the <code>setjmp()</code> and an inner function with the rest of the function when that&#39;s possible.</li><li>Declare all variables used in the <code>setjmp()</code> non-zero return case (when called through <code>longjmp()</code>) as volatile, so that we don&#39;t ever rely on non-volatile variable values in that code path.</li></ul><p>Because volatile variables are slow (explicit read/write operations are generated for each access) it may be more practical to use explicit &quot;save&quot; variables, e.g.:</p><pre><code>volatile int save_x;
int x;

if (setjmp(...)) {
        x = save_x;
        /* use &#39;x&#39; normally */
        return;
}

/* Assume foo(), bar(), quux() never longjmp(). */
x = foo();
x += bar();
x += quux();
save_x = x; /* Save before any potential longjmp(). */

/* ... */
</code></pre><p>(As of Duktape 1.3 this has not yet been done for all setjmp/longjmp functions. Rather, volatile declarations have been added where they seem to be needed in practice.)</p><h3 id="limitations-in-setjmp-call-site" tabindex="-1">Limitations in setjmp() call site <a class="header-anchor" href="#limitations-in-setjmp-call-site" aria-label="Permalink to &quot;Limitations in setjmp() call site&quot;">​</a></h3><p>There are limitations to what a <code>setjmp()</code> call site can look like, see e.g.:</p><ul><li><a href="https://www.securecoding.cert.org/confluence/display/c/MSC22-C.+Use+the+setjmp%28%29,+longjmp%28%29+facility+securely" target="_blank" rel="noreferrer">https://www.securecoding.cert.org/confluence/display/c/MSC22-C.+Use+the+setjmp(),+longjmp()+facility+securely</a></li></ul><p>This is fine for example:</p><pre><code>if (DUK_SETJMP(jb) == 0) {
        /* ... */
}
</code></pre><p>But this is not:</p><pre><code>/* NOT OK */
if (DUK_LIKELY(DUK_SETJMP(jb) == 0)) {
        /* ... */
}
</code></pre><h3 id="setjmp-and-floating-points" tabindex="-1">Setjmp and floating points <a class="header-anchor" href="#setjmp-and-floating-points" aria-label="Permalink to &quot;Setjmp and floating points&quot;">​</a></h3><p>There may be limitations on what floating point registers or state is actually saved and restored, see e.g.:</p><ul><li><a href="http://www-personal.umich.edu/~williams/archive/computation/setjmp-fpmode.html" target="_blank" rel="noreferrer">http://www-personal.umich.edu/~williams/archive/computation/setjmp-fpmode.html</a></li></ul><p>To minimize portability issues, floating point variables used in the setjmp longjmp path should be volatile so that they won&#39;t be stored in registers.</p><h2 id="numeric-types-1" tabindex="-1">Numeric types <a class="header-anchor" href="#numeric-types-1" aria-label="Permalink to &quot;Numeric types&quot;">​</a></h2><p>C data types, especially integer types, are a bit of a hassle: the best choice of types depends on the platform and the compiler, and also the C specification version. Types also affect e.g. printf() and scanf() format specifiers which are, of course, potentially compiler specific. To remain portable, (almost) all C types are wrapped behind a typedef.</p><p>The <code>duktape.h</code> header handles all platform and feature detection and provides all necessary type wrappers, both for the public API and for internal use.</p><h3 id="preferred-integer-type-with-at-least-32-bits" tabindex="-1">Preferred integer type with at least 32 bits <a class="header-anchor" href="#preferred-integer-type-with-at-least-32-bits" aria-label="Permalink to &quot;Preferred integer type with at least 32 bits&quot;">​</a></h3><p>A large amount of code needs an integer type which is convenient for the CPU but still guaranteed to be 32 bits or more. The <code>int</code> type is NOT a good choice because it may be 16 bits even on platforms with a 32-bit type and even 32-bit registers (e.g. PureC on M68K). The <code>long</code> type is also not a good choice as it may be too wide (e.g. GCC on x86-64, int is 32 bits while long is 64 bits).</p><p>For this use, there are two typedefs:</p><ul><li><code>duk_int_t</code>: an integer convenient on the target, but always guaranteed to be 32 bits or more. This may be mapped to <code>int</code> if it&#39;s large enough, or possibly <code>int_fast32_t</code>, or something else depending on the target.</li><li><code>duk_uint_t</code>: same but unsigned.</li></ul><p>There are also typedefs for the case where a 32 bits or more are needed but the types also need to be fastest for the CPU. This is useful for true fast paths like executor loops and such:</p><ul><li><code>duk_int_fast_t</code>: an integer fastest on the target, but always guaranteed to be 32 bits or more. This is usually mapped to <code>int_fast32_t</code> when C99 types are available.</li><li><code>duk_uint_fast_t</code>: same but unsigned.</li></ul><p>For cases where 16 bits are enough, the following wrapped types are provided (they are essentially <code>int</code> and <code>unsigned int</code> but wrapped for consistency):</p><ul><li><code>duk_small_int_t</code>: an integer convenient on the target, guaranteed to be 16 bits or more.</li><li><code>duk_small_uint_t</code>: same but unsigned.</li></ul><p>For these, too, there are fast variants:</p><ul><li><code>duk_small_int_fast_t</code>: an integer fastest of the target, guaranteed to be 16 bits or more, usually mapped to <code>int_fast16_t</code> when C99 types are available.</li><li><code>duk_small_uint_fast_t</code>: same but unsigned.</li></ul><p>Exact 32-bit types are needed in some cases e.g. for ECMAScript semantics and or guaranteeing portable overflow / underflow handling. Also, 64-bit arithmetic emulation (implemented on 32 bit types) relies on exact unsigned overflows / underflows. The wrapped C99 types are used in these cases.</p><h3 id="format-specifiers" tabindex="-1">Format specifiers <a class="header-anchor" href="#format-specifiers" aria-label="Permalink to &quot;Format specifiers&quot;">​</a></h3><p>Format specifiers are more or less standardized, e.g. <code>%d</code> is used to format an <code>int</code> in decimal, but:</p><ul><li>When typedef wrappers are used, how can calling code know the correct format specifier for the wrapped type? The target type may be differ between platforms. In practice there are two reasonable strategies: <ol><li>Define preprocessor macros for the format specifiers (C99 uses this approach, e.g. <code>PRId32</code>).</li><li>Cast upwards to a reasonable guess, e.g. all signed integers to <code>long</code> or (if C99 can be assumed) <code>maxint_t</code> (<code>unsigned long</code> and <code>umaxint_t</code> for unsigned integers) and use a known format specifier.</li></ol></li><li>There are separate format codes for <code>printf()</code> and <code>scanf()</code>. They are sometimes different. As a concrete example, the proper print format code for an IEEE double is <code>%f</code> while the scan format code is <code>%lf</code>. <ul><li>Inside Duktape code, use <code>%lf</code> for the print format code: it&#39;s also an acceptable format and perhaps more clear</li></ul></li><li>Some useful portable format codes: <ul><li><code>%s</code>: string, use <code>(const char *)</code> cast</li><li><code>%p</code>: pointer, use <code>(void *)</code> cast</li><li><code>%d</code>: int, use <code>(int)</code> cast</li><li><code>%u</code>: unsigned int, use <code>(unsigned int)</code> cast</li><li><code>%ld</code>: long, use <code>(long)</code> cast</li><li><code>%lu</code>: unsigned long, use <code>(unsigned long)</code> cast</li></ul></li><li>These are useful but unfortunately C99 (C++11): <ul><li><code>%zu</code>: size_t (C99), use <code>%lu</code> and <code>(unsigned long)</code> cast instead</li><li><code>%jd</code>: maxint_t (C99), use <code>%lu</code> and <code>(unsigned long)</code> cast instead</li></ul></li><li>Format argument types, see e.g.: <ul><li><a href="http://www.gnu.org/software/libc/manual/html_node/Formatted-Output.html#Formatted-Output" target="_blank" rel="noreferrer">http://www.gnu.org/software/libc/manual/html_node/Formatted-Output.html#Formatted-Output</a></li><li><a href="http://www.gnu.org/software/libc/manual/html_node/Other-Output-Conversions.html#Other-Output-Conversions" target="_blank" rel="noreferrer">http://www.gnu.org/software/libc/manual/html_node/Other-Output-Conversions.html#Other-Output-Conversions</a></li><li><a href="http://www.gnu.org/software/libc/manual/html_node/Integer-Conversions.html#Integer-Conversions" target="_blank" rel="noreferrer">http://www.gnu.org/software/libc/manual/html_node/Integer-Conversions.html#Integer-Conversions</a></li></ul></li></ul><h3 id="types-used-inside-duktape" tabindex="-1">Types used inside Duktape <a class="header-anchor" href="#types-used-inside-duktape" aria-label="Permalink to &quot;Types used inside Duktape&quot;">​</a></h3><ul><li><code>duktape.h</code> performs all the detection needed and provide typedefs for types used in the public API and inside Duktape.</li><li>C99 types are <strong>not</strong> used directly, wrapper types are used instead. For instance, use <code>duk_uint32_t</code> instead of <code>uint32_t</code>. Wrapper types are used because we don&#39;t want to rely on C99 types or define them if they are missing.</li><li>Only use <code>duk_XXX_t</code> typedefs for integer types unless there is a special reason not to. For instance, if a platform API requires a specific type, that type must of course be used (or casted to).</li><li>Integer constants should generally use <code>L</code> or <code>UL</code> suffix, i.e. makes them <code>long int</code> or <code>unsigned long int</code>, and they are guaranteed to be 32 bits or more. Without a suffix integer constants may be only 16 bits. 64-bit constants need <code>LL</code> or <code>ULL</code> suffix. Small constants (16 bits or less) don&#39;t need a suffix and are still portable. This is convenient for codepoint constants and such. Note the absurd corner case when trying to represent the smallest signed integer value for 32 and 64 bits (see separate section).</li><li>Integer constant sign should match the type the constant is related to. For instance, <code>duk_codepoint_t</code> is a signed type, so a signed constant should be used. This is more than a style issue: suppose signed codepoint <code>cp</code> had value <code>-1</code>. The comparison <code>(cp &lt; 0x7fL)</code> is true while the comparison <code>(cp &lt; 0x7fUL)</code> is false because of C coercion rules.</li><li>Value stack indices which are relative to the current activation use <code>duk_idx_t</code>. Value stack sizes and value stack indices related to the entire value stack are <code>duk_size_t</code>. In principle the value stack could be larger than 32 bits while individual activations could be limited to a signed 32 bit index space.</li></ul><h3 id="formatting-considerations" tabindex="-1">Formatting considerations <a class="header-anchor" href="#formatting-considerations" aria-label="Permalink to &quot;Formatting considerations&quot;">​</a></h3><ul><li>Use standard format specifiers (<code>%d</code>, <code>%p</code>, <code>%s</code>, etc) instead of relying on compiler specific or C99 format specifiers: they may not be available on all platforms.</li><li>Select a standard specifier which is guaranteed to be wide enough for the argument type and cast the argument explicitly to a matching type. <ul><li>Casting all arguments explicitly is a compromise: an explicit cast removes some useful warnings but also removes some pointless warnings. Since type detection ends up with different typing across platforms, the only way to format portably is to use a portable format specifier and an explicit cast; the format specifier/type must be chosen to be wide enough to match all possible type detection results.</li></ul></li><li>For integers, use <code>long</code> variants by default because it is guaranteed to be 32 bits or more: <ul><li><code>%ld</code> with <code>(long)</code> cast</li><li><code>%lu</code> with <code>(unsigned long)</code> cast</li><li><code>%lx</code> with <code>(unsigned long)</code> cast; there seems to be some variance whether a signed or unsigned cast should be used, GCC seems to expect an unsigned argument: <ul><li><a href="http://www.gnu.org/software/libc/manual/html_node/Integer-Conversions.html#Integer-Conversions" target="_blank" rel="noreferrer">http://www.gnu.org/software/libc/manual/html_node/Integer-Conversions.html#Integer-Conversions</a></li></ul></li></ul></li><li>For debug code, use <code>long</code> variants for all integers for simplicity, even for short fields like booleans.</li><li>For release code using <code>int</code> variants (<code>%d</code>, <code>%u</code>, <code>%x</code>) is OK if a 16-bit range suffices. It&#39;s probably nice to mention this in code so that there is no doubt.</li><li>Selecting signed/unsigned variant for debug logs is not that critical, as most values don&#39;t use the full range. The current code base contains both signed and unsigned formatting for e.g. lengths (which are never negative).</li><li>Use <code>%lf</code> for IEEE doubles; <code>%f</code> is the other alternative.</li><li>When using <code>%c</code>, cast the argument explicitly with <code>(int)</code> (not <code>(char)</code>). This is the &quot;promoted type&quot; expected, see e.g.: <ul><li><a href="http://www.gnu.org/software/libc/manual/html_node/Formatted-Output.html#Formatted-Output" target="_blank" rel="noreferrer">http://www.gnu.org/software/libc/manual/html_node/Formatted-Output.html#Formatted-Output</a></li></ul></li><li>When using hexadecimal formats <code>%lx</code> (or <code>%x</code>), cast the argument to an unsigned type (<code>unsigned long</code> or <code>unsigned int</code>). There seems to be some variation between compilers whether they expect a signed or an unsigned argument. GCC seems to expect an unsigned argument.</li><li>Don&#39;t rely on <code>%s</code> accepting a NULL pointer, this breaks on some platforms. Check pointer before formatting; if the string argument is obtained with Duktape API without an explicit NULL check (which is mostly preferable), use <code>duk_require_string()</code> instead of <code>duk_get_string()</code>.</li><li>For debug prints, the debug formatter special cases <code>%s</code> so that the platform never sees a NULL pointer with <code>%s</code>. NULL pointers can thus be safely debug logged with <code>%s</code>.</li><li>For debug custom formatting, use the following casts: <ul><li><code>%!T</code> and variants: <code>(duk_tval *)</code></li><li><code>%!O</code> and variants: <code>(duk_heaphdr *)</code></li></ul></li></ul><h4 id="duk-size-t" tabindex="-1">duk_size_t <a class="header-anchor" href="#duk-size-t" aria-label="Permalink to &quot;duk_size_t&quot;">​</a></h4><p>Use <code>duk_size_t</code> for internal uses of <code>size_t</code>. Coerce it explicitly to <code>size_t</code> for library API calls.</p><h4 id="duk-double-t" tabindex="-1">duk_double_t <a class="header-anchor" href="#duk-double-t" aria-label="Permalink to &quot;duk_double_t&quot;">​</a></h4><p>Use <code>duk_double_t</code> for IEEE double precision float. This is slight paranoia but may be handy if e.g. built-in soft float library is introduced.</p><h4 id="void" tabindex="-1">void <a class="header-anchor" href="#void" aria-label="Permalink to &quot;void&quot;">​</a></h4><p>The <code>void</code> type is used as is, cannot imagine a reason why it would need to be reassigned for portability.</p><h4 id="duk-int-t" tabindex="-1">duk_int_t <a class="header-anchor" href="#duk-int-t" aria-label="Permalink to &quot;duk_int_t&quot;">​</a></h4><p>Use <code>duk_int_t</code> as an <code>int</code> replacement; it behaves like an <code>int</code> but, unlike <code>int</code>, is guaranteed to be at least 32 bits wide. Similarly <code>duk_uint_t</code> should be used as an <code>unsigned int</code> replacement.</p><h4 id="duk-int-fast-t" tabindex="-1">duk_int_fast_t <a class="header-anchor" href="#duk-int-fast-t" aria-label="Permalink to &quot;duk_int_fast_t&quot;">​</a></h4><p>This is a type at least the size of <code>duk_int_t</code> but which is guaranteed to be a &quot;fast&quot; variant if that distinction matters for the CPU. This type is mainly used in the executor where performance really matters. <code>duk_uint_fast_t</code> is used similarly.</p><h4 id="duk-small-int-t" tabindex="-1">duk_small_int_t <a class="header-anchor" href="#duk-small-int-t" aria-label="Permalink to &quot;duk_small_int_t&quot;">​</a></h4><p>The <code>duk_small_int_t</code> should be used in internal code e.g. for flags. It is guaranteed to be 16 bits or more. Similarly <code>duk_small_uint_t</code>.</p><h4 id="duk-small-int-fast-t" tabindex="-1">duk_small_int_fast_t <a class="header-anchor" href="#duk-small-int-fast-t" aria-label="Permalink to &quot;duk_small_int_fast_t&quot;">​</a></h4><p>Same as <code>duk_small_int_t</code> but guaranteed to be a fast variant. Used mainly for fast paths like the executor. Similarly for <code>duk_small_uint_fast_t</code>.</p><h4 id="duk-bool-t" tabindex="-1">duk_bool_t <a class="header-anchor" href="#duk-bool-t" aria-label="Permalink to &quot;duk_bool_t&quot;">​</a></h4><p>The <code>duk_bool_t</code> should be used for boolean values. It must be wide enough to accommodate results from C comparisons (e.g. <code>x == y</code>). In practice it&#39;s defined as an <code>int</code>. (Currently some internal code uses <code>duk_small_int_t</code> for booleans, but this will be fixed.)</p><h4 id="duk-uint8-t" tabindex="-1">duk_uint8_t <a class="header-anchor" href="#duk-uint8-t" aria-label="Permalink to &quot;duk_uint8_t&quot;">​</a></h4><p><code>duk_uint8_t</code> should be used as a replacement for <code>unsigned char</code> and often for <code>char</code> too. Since <code>char</code> may be signed, it is often a problematic type when comparing ranges, indexing lookup tables, etc, so a <code>char</code> or a <code>signed char</code> is often not the best type. Note that proper string comparison of UTF-8 character strings, for instance, relies on unsigned byte comparisons.</p><h4 id="duk-idx-t" tabindex="-1">duk_idx_t <a class="header-anchor" href="#duk-idx-t" aria-label="Permalink to &quot;duk_idx_t&quot;">​</a></h4><p><code>duk_idx_t</code> is used for value stack indices.</p><h4 id="duk-arridx-t" tabindex="-1">duk_arridx_t <a class="header-anchor" href="#duk-arridx-t" aria-label="Permalink to &quot;duk_arridx_t&quot;">​</a></h4><p><code>duk_arridx_t</code> is used for array indices.</p><h2 id="portability-issues-on-very-old-compilers" tabindex="-1">Portability issues on very old compilers <a class="header-anchor" href="#portability-issues-on-very-old-compilers" aria-label="Permalink to &quot;Portability issues on very old compilers&quot;">​</a></h2><h3 id="initialization-of-auto-arrays" tabindex="-1">Initialization of auto arrays <a class="header-anchor" href="#initialization-of-auto-arrays" aria-label="Permalink to &quot;Initialization of auto arrays&quot;">​</a></h3><p>Some old compilers (such as bcc) refuse to compile the following (error message is something along the lines of: initialization of auto arrays is illegal):</p><pre><code>int myarray[] = { 123, 234 };
</code></pre><p>or even:</p><pre><code>int myarray[2] = { 123, 234 };
</code></pre><p>Apparently the following would be legal:</p><pre><code>static int myarray[2] = { 123, 234 };
</code></pre><p>The workaround is to use a static array or initialize explicitly:</p><pre><code>int myarray[2];

myarray[0] = 123;
myarray[1] = 234;
</code></pre><h3 id="initializer-is-too-complicated-bcc" tabindex="-1">Initializer is too complicated (bcc) <a class="header-anchor" href="#initializer-is-too-complicated-bcc" aria-label="Permalink to &quot;Initializer is too complicated (bcc)&quot;">​</a></h3><p>BCC complains about &quot;initializer is too complicated&quot; when a function pointer array contains casts:</p><pre><code>...
(duk_c_function) my_function,
...
</code></pre><p>This works:</p><pre><code>...
my_function,
...
</code></pre><h3 id="non-integral-selector-in-switch-bcc" tabindex="-1">Non-integral selector in switch (bcc) <a class="header-anchor" href="#non-integral-selector-in-switch-bcc" aria-label="Permalink to &quot;Non-integral selector in switch (bcc)&quot;">​</a></h3><p>For some reason BCC fails to compile switch statements where the value is obtained with a macro such as:</p><pre><code>switch (DUK_DEC_OP(ins)) {
        ...
}
</code></pre><p>This is probably caused by the fact that <code>DUK_DEC_OP(ins)</code> is a 32-bit value while BCC&#39;s integer type is 16 bits. Switch argument needs to be <code>int</code>, so one needs to:</p><pre><code>switch ((int) DUK_DEC_OP(ins)) {
        ...
}
</code></pre><p>Or perhaps (using type wrappers):</p><pre><code>switch ((duk_small_int_t) DUK_DEC_OP(ins)) {
        ...
}
</code></pre><h3 id="division-by-zero-is-a-compile-error" tabindex="-1">Division by zero is a compile error <a class="header-anchor" href="#division-by-zero-is-a-compile-error" aria-label="Permalink to &quot;Division by zero is a compile error&quot;">​</a></h3><p>Attempting to create NaN or infinity values with expressions like <code>0/0</code> and <code>1/0</code> are treated as compile errors by some compilers (such as BCC) while others will just replace them with an incorrect value (e.g. VBCC replaces them with zero). Run-time computed NaN / infinity values are needed on such platforms.</p><h3 id="ull-integer-constants-may-cause-an-error" tabindex="-1">ULL integer constants may cause an error <a class="header-anchor" href="#ull-integer-constants-may-cause-an-error" aria-label="Permalink to &quot;ULL integer constants may cause an error&quot;">​</a></h3><p>The following may cause a compilation error (e.g. BCC):</p><pre><code>#if defined(ULONG_MAX) &amp;&amp; (ULONG_MAX == 18446744073709551615ULL)
</code></pre><p>The error happens even if <code>ULONG_MAX</code> is not defined. Instead, this needs to be restructured in one of several ways. For instance, old compilers can be rejected explicitly:</p><pre><code>#if defined(DUK_F_BCC)
/* cannot check ULONG_MAX */
#else
#if defined(ULONG_MAX) &amp;&amp; (ULONG_MAX == 18446744073709551615ULL)
/* ... */
#endif
#endif
</code></pre><p>The important point is that the old compiler cannot process the preprocessor line containing the integer constant; if it processes even part of the line, it may choke on a syntax error.</p><h3 id="comments-inside-macro-arguments-may-cause-an-error-bcc" tabindex="-1">Comments inside macro arguments may cause an error (BCC) <a class="header-anchor" href="#comments-inside-macro-arguments-may-cause-an-error-bcc" aria-label="Permalink to &quot;Comments inside macro arguments may cause an error (BCC)&quot;">​</a></h3><p>The following causes an error on BCC:</p><pre><code>DUK_ASSERT(FOO ||   /* foo happens */
           BAR);
</code></pre><p>The comment causes BCC to produce an error like &quot;incorrect number of macro arguments&quot;. The fix is to remove the comment from inside the macro:</p><pre><code>DUK_ASSERT(FOO ||
           BAR);
</code></pre><h2 id="calling-platform-functions" tabindex="-1">Calling platform functions <a class="header-anchor" href="#calling-platform-functions" aria-label="Permalink to &quot;Calling platform functions&quot;">​</a></h2><p>All platform function calls (ANSI C and other) are wrapped through macros defined in <code>duk_config.h</code>. For example, <code>fwrite()</code> calls are made using <code>DUK_FWRITE()</code>.</p><p>Many of these wrappers are not currently needed but some are, so it&#39;s simplest to wrap just about everything in case something needs to be tweaked. As an example, on some old uclibc versions <code>memcpy()</code> is broken and can be replaced with <code>memmove()</code> in <code>duk_config.h</code>.</p><p>The only exception is platform specific Date built-in code. As this code is always platform specific and contained to the Date code, wrapping them is not necessary or useful. Any tweaks can be more comfortably applied directly in the Date code.</p><p>The following can be used to find &quot;leaks&quot;, accidental unwrapped calls:</p><pre><code>$ python util/find_func_calls.py src-input/*.c src-input/*.h | \\
  grep -v -i -P ^duk_ | grep -v -P &#39;^(sizeof|va_start|va_end|va_arg)&#39; | \\
  sort | uniq
</code></pre><h2 id="other-considerations" tabindex="-1">Other considerations <a class="header-anchor" href="#other-considerations" aria-label="Permalink to &quot;Other considerations&quot;">​</a></h2><h3 id="const-qualifiers-for-tables" tabindex="-1">Const qualifiers for tables <a class="header-anchor" href="#const-qualifiers-for-tables" aria-label="Permalink to &quot;Const qualifiers for tables&quot;">​</a></h3><p>Using <code>const</code> for tables allows tables to compiled into the text section. This is important on some embedded platforms where RAM is tight but there is more space for code and fixed data.</p><h2 id="config-options" tabindex="-1">Config options <a class="header-anchor" href="#config-options" aria-label="Permalink to &quot;Config options&quot;">​</a></h2><p>All feature detection is concentrated into <code>duk_config.h</code> which detects the compiler, platform, and architecture via preprocessor defines.</p><p>As a result, <code>duk_config.h</code> defines <code>DUK_USE_xxx</code> macros which enable and disable specific features and provide parameter values (such as traceback depth). These are the <strong>only</strong> feature defines which should be used in internal Duktape code. The <code>duk_config.h</code> defines, especially typedefs, are also visible for the public API header.</p><p>When adding specific hacks and workarounds which might not be of interest to all users, add a <code>DUK_USE_xxx</code> flag metadata into the build.</p><h2 id="platforms-and-compilers" tabindex="-1">Platforms and compilers <a class="header-anchor" href="#platforms-and-compilers" aria-label="Permalink to &quot;Platforms and compilers&quot;">​</a></h2><h3 id="vbcc" tabindex="-1">VBCC <a class="header-anchor" href="#vbcc" aria-label="Permalink to &quot;VBCC&quot;">​</a></h3><p>Even in C99 mode VBCC 0.9b:</p><ul><li>Does not have <code>inttypes.h</code>.</li><li>Does not have <code>fpclassify()</code> and friends.</li><li>Does not have <code>NAN</code> or <code>INFINITY</code>.</li><li>The expression <code>0.0 / 0.0</code> causes a warning and results in <code>0.0</code> instead of <code>NaN</code> as expected.</li><li>The expression <code>1.0 / 0.0</code> causes a warning and results in <code>0.0</code> instead of infinity as expected.</li></ul><p>The following program demonstrates the NaN issue:</p><pre><code>#include &lt;stdio.h&gt;

void main(void) {
        double z = 0.0;
        double t;
        volatile union {
                double d;
                unsigned char b[8];
        } u;
        int i;

        /* this results in 0.0 */
        t = 0.0 / 0.0;
        printf(&quot;result: %lf\\n&quot;, t);

        /* this results in NaN */
        t = z / z;
        printf(&quot;result: %lf\\n&quot;, t);

        u.d = t;
        for (i = 0; i &lt; 8; i++) {
            printf(&quot;%02x\\n&quot;, u.b[i]);
        }
}
</code></pre><p>To work with compiler optimization, the above approach needs to have the <code>double</code> values in <code>volatile</code> variables. Otherwise VBCC will end up replacing the result with zero. So something like this is probably safest:</p><pre><code>volatile double a = 0.0;
volatile double b = 0.0;
double t = a / b;  /* -&gt; NaN */
</code></pre><h3 id="tcc" tabindex="-1">tcc <a class="header-anchor" href="#tcc" aria-label="Permalink to &quot;tcc&quot;">​</a></h3><p>Tcc has trouble with negative zeroes. See <code>misc/tcc_zerosign1.c</code>. For instance:</p><ul><li>Assign d = 0.0</li><li>Assign d = -d</li><li>Now d should be a negative zero, but in tcc (with default options) it has not changed sign: the memory dump verified this, signbit() returns zero, etc.</li></ul><p>This happens at least in tcc versions 0.9.25, 0.9.26.</p><h3 id="clang" tabindex="-1">clang <a class="header-anchor" href="#clang" aria-label="Permalink to &quot;clang&quot;">​</a></h3><p>Clang has some issues with union aliasing. See <code>misc/clang_aliasing.c</code>.</p><h3 id="bcc" tabindex="-1">bcc <a class="header-anchor" href="#bcc" aria-label="Permalink to &quot;bcc&quot;">​</a></h3><p>BCC is not a realistic compilation target at the moment but serves as a nice &quot;torture target&quot;. Various issues have been documented above in portability issues.</p><h2 id="resources" tabindex="-1">Resources <a class="header-anchor" href="#resources" aria-label="Permalink to &quot;Resources&quot;">​</a></h2><ul><li><a href="http://graphics.stanford.edu/~seander/bithacks.html" target="_blank" rel="noreferrer">http://graphics.stanford.edu/~seander/bithacks.html</a></li></ul>`,479)]))}const m=t(n,[["render",r]]);export{h as __pageData,m as default};
