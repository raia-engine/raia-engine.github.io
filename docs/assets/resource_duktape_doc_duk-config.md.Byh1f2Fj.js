import{_ as o,c as i,a2 as n,o as a}from"./chunks/framework.DPuwY6B9.js";const f=JSON.parse('{"title":"Duktape config header, duk_config.h","description":"","frontmatter":{},"headers":[],"relativePath":"resource/duktape/doc/duk-config.md","filePath":"resource/duktape/doc/duk-config.md","lastUpdated":null}'),t={name:"resource/duktape/doc/duk-config.md"};function r(d,e,c,s,l,u){return a(),i("div",null,e[0]||(e[0]=[n(`<h1 id="duktape-config-header-duk-config-h" tabindex="-1">Duktape config header, duk_config.h <a class="header-anchor" href="#duktape-config-header-duk-config-h" aria-label="Permalink to &quot;Duktape config header, duk_config.h&quot;">​</a></h1><h2 id="purpose-of-duk-config-h" tabindex="-1">Purpose of duk_config.h <a class="header-anchor" href="#purpose-of-duk-config-h" aria-label="Permalink to &quot;Purpose of duk_config.h&quot;">​</a></h2><p><strong>duk_config.h is an external configuration header (&quot;config header&quot;) which provides all platform, compiler, and architecture specific features</strong> so that the main Duktape source code can compile without relying on platform specific headers or functionality. The header also provides active Duktape config options (<code>DUK_USE_xxx</code>) for enabling/disabling various optional Duktape features.</p><p>Some Duktape features (like ROM built-in support and Unicode tables used) also require changes to &quot;prepared&quot; Duktape source code. The <code>configure.py</code> utility combines the preparation of a <code>duk_config.h</code> header and Duktape source files; it accepts the same command line options as genconfig.py (and more). <strong>Since Duktape 2.0 \`\`tools/configure.py\`\` is the recommended tool to create both a config header and prepared Duktape sources for build</strong>. This document describes genconfig.py usage but you should normally use configure.py wherever genconfig.py is used.</p><p>The <code>DUK_VERSION</code> define is available for duk_config.h, so that application configuration snippets can react to Duktape version if necessary (e.g. enable features only for a newer version).</p><p>While an external config header provides much more flexibility it also needs a bit more thought especially when adapting Duktape to an exotic environment. This document describes various approaches on creating a config header and updating it when a new Duktape release is taken into use.</p><h2 id="coming-up-with-a-duk-config-h" tabindex="-1">Coming up with a duk_config.h <a class="header-anchor" href="#coming-up-with-a-duk-config-h" aria-label="Permalink to &quot;Coming up with a duk_config.h&quot;">​</a></h2><p><code>duk_config.h</code> is always external to Duktape main source code so that it&#39;s always possible, if necessary as a last resort, to manually edit the configuration file or even create one from scratch.</p><p>As such there are multiple ways to come up with a config header; for common platforms you don&#39;t usually need to do much while for more exotic platforms more manual work may be needed. There&#39;s no &quot;right way&quot;, but the more manual modifications are made, the more effort is needed to deal with Duktape updates.</p><p>The basic options are:</p><ul><li><strong>Use default duk_config.h in distribution</strong>: Duktape distributable includes a default duk_config.h which autodetects the the platform, compiler, and architecture, and uses default values for all Duktape configuration options. This header should work &quot;out of the box&quot; for Linux, macOS, Windows, and also for several more exotic platforms. If you&#39;re using one of the supported platform and default options are acceptable, this should be your default choice. Note that <code>DUK_OPT_xxx</code> compiler command line options are no longer supported in Duktape 2.x; to use non-default options, run either configure.py (recommended) or genconfig.py.</li><li><strong>Use default duk_config.h with manual modifications</strong>: You can modify the default duk_config.h directly if only a small change is needed. Such changes can be manual, or scripted using e.g. <code>sed</code>. Using scripting is less error prone when Duktape is upgraded and the source duk_config.h changes (which is usual for new versions). See separate section below on how to tweak a header using a script.</li><li><strong>Use genconfig.py to create an autodetect duk_config.h</strong>: You can use <code>genconfig.py</code> to create a custom autodetecting duk_config.h and specify config option overrides on genconfig command line. See separate section below on how to use genconfig.</li><li><strong>Use genconfig.py to create a barebones duk_config.h</strong>: While the autodetect duk_config.h is convenient, it won&#39;t work on exotic platforms. To support exotic platforms, <code>genconfig.py</code> can generate a template duk_config.h for a specified platform, compiler, and architecture combination (each can be either specified or left as &quot;autodetect&quot;) which should match your target as closely as possible. You can then modify the header manually or through scripting.</li><li><strong>Edit the genconfig metadata and regenerate duk_config.h</strong>: You can also add support for your custom platform directly into the genconfig metadata. For example, to support a custom compiler, you&#39;ll need to add a compiler-specific C header snippets to detect the compiler and to override default macros which are inappropriate for that compiler. The <code>duk_config.h</code> can then be regenerated using updated metadata.</li><li><strong>Write a duk_config.h from scratch</strong>: You could also write a duk_config.h from scratch, but because there are quite many typedefs, macros, and config options, it&#39;s probably easiest to modify the default or genconfig-generated <code>duk_config.h</code>.</li></ul><p>NOTE: While you can run <code>genconfig.py</code> directly, it&#39;s recommended to use <code>tools/configure.py</code> instead. The same configuration options (and more) are accepted by configure.py.</p><h2 id="using-genconfig" tabindex="-1">Using genconfig <a class="header-anchor" href="#using-genconfig" aria-label="Permalink to &quot;Using genconfig&quot;">​</a></h2><h3 id="overview-of-genconfig" tabindex="-1">Overview of genconfig <a class="header-anchor" href="#overview-of-genconfig" aria-label="Permalink to &quot;Overview of genconfig&quot;">​</a></h3><p>Genconfig (<code>tools/genconfig.py</code>) is a small utility for config handling with two basic purposes:</p><ul><li>Generate a <code>duk_config.h</code> for a specified platform, compiler, and architecture. Each can be specified explicitly (e.g. use &quot;gcc&quot; for the compiler) or be left up to automatic compile-time detection. The default <code>duk_config.h</code> is generated with everything left up to automatic detection. A barebones, target specific header can be generated by defining platform, compiler, and architecture explicitly.</li><li>Generate documentation for config options.</li></ul><p>Config headers are generated based on config option and target metadata files, and manually edited header snippets which are combined to create a final header. Documentation is generated based on config option metadata. Metadata is expressed as YAML files for easy editing and good diff/merge behavior.</p><p>This document doesn&#39;t cover all available tool options; use <code>python tools/genconfig.py --help</code> or <code>python tools/configure.py --help</code> for a full list of current options.</p><h3 id="generating-an-autodetect-duk-config-h" tabindex="-1">Generating an autodetect duk_config.h <a class="header-anchor" href="#generating-an-autodetect-duk-config-h" aria-label="Permalink to &quot;Generating an autodetect duk_config.h&quot;">​</a></h3><p>To generate an autodetect header suitable for directly supported platforms:</p><pre><code>$ cd duktape-2.0.0
$ python tools/genconfig.py \\
    --metadata config/ \\
    --output /tmp/duk_config.h \\
    duk-config-header
</code></pre><p>The resulting header in <code>/tmp/duk_config.h</code> can then either be used as is or edited manually or through scripting. The equivalent operation using <code>tools/configure.py</code> is:</p><pre><code>$ cd duktape-2.0.0
$ python tools/configure.py \\
    --source-directory src-input \\
    --config-metadata config/ \\
    --output-directory /tmp/output
</code></pre><p>The result directory <code>/tmp/output</code> contains a <code>duk_config.h</code> header but also <code>duktape.c</code> and <code>duktape.h</code> to be included in your build.</p><p>You can override individual defines using in several ways (see &quot;Option overrides&quot; section below for more details): C compiler format (-D and -U options) and YAML config through a file or inline.</p><p>If you&#39;re building Duktape as a DLL, you should use the <code>--dll</code> option:</p><pre><code>$ python tools/genconfig.py \\
    --metadata config/ \\
    --dll \\
    --output /tmp/duk_config.h \\
    duk-config-header
</code></pre><p>The <code>configure.py</code> equivalent:</p><pre><code>$ python tools/configure.py \\
    --source-directory src-input \\
    --config-metadata config/ \\
    --output-directory /tmp/output \\
    --dll
</code></pre><p>DLL builds cannot be detected automatically and they affect symbol visibility attributes on Windows. The <code>-dll</code> option creates a header which assumes that a DLL will be built.</p><p>Some changes such as reworking <code>#include</code> statements cannot be represented as override files; you&#39;ll need to edit the resulting config header manually or using some scripting approach.</p><h3 id="generating-a-barebones-duk-config-h" tabindex="-1">Generating a barebones duk_config.h <a class="header-anchor" href="#generating-a-barebones-duk-config-h" aria-label="Permalink to &quot;Generating a barebones duk_config.h&quot;">​</a></h3><p>To generate a barebones header you need to specify a platform, compiler, and architecture for genconfig:</p><pre><code>$ python tools/genconfig.py \\
    --metadata config/ \\
    --platform linux \\
    --compiler gcc \\
    --architecture x64 \\
    --output /tmp/duk_config.h \\
    duk-config-header
</code></pre><p>The barebones header in <code>/tmp/duk_config.h</code> can then either be used as is or edited manually or through scripting.</p><p>The platform, compiler, and architecture names map to genconfig header snippet files. Duktape config options will be assigned their default values specified in config option metadata files in <code>config/config-options/</code>.</p><p>You can override individual defines using in several ways (see &quot;Option overrides&quot; section below for more details): C compiler format (-D and -U options) or YAML config through a file or inline.</p><p>Some changes such as reworking <code>#include</code> statements cannot be represented as override files; you&#39;ll need to edit the resulting config header manually or using some scripting approach.</p><h2 id="genconfig-option-overrides" tabindex="-1">Genconfig option overrides <a class="header-anchor" href="#genconfig-option-overrides" aria-label="Permalink to &quot;Genconfig option overrides&quot;">​</a></h2><p>Genconfig provides multiple ways of overriding config options when generating an autodetect or barebones <code>duk_config.h</code> header:</p><ul><li><p>C compiler format:</p><pre><code>-DDUK_USE_TRACEBACK_DEPTH=100
-DDUK_USE_JX
-UDUK_USE_JC
</code></pre></li><li><p>YAML config read from a file or given inline on the command line:</p><pre><code>--option-file my_config.yaml
--option-yaml &#39;DUK_USE_FASTINT: true&#39;
</code></pre></li><li><p>A verbatim fixup header can declare custom prototypes and include custom headers, and can tweak <code>DUK_USE_xxx</code> options. However, since Duktape 2.x some config options control automatic pruning of built-in objects and properties, and such options (like <code>DUK_USE_BUFFEROBJECT_SUPPORT</code>) <strong>MUST NOT</strong> be modified by fixups. It&#39;s thus recommended to modify options via the C compiler format or YAML.</p></li></ul><p>These option formats can be mixed which allows you to specify an option baseline (say <code>--option-file low_memory.yaml</code>) and then apply further overrides in various ways. All forced options in C compiler format and YAML format are processed first, with the last override winning.</p><h3 id="c-compiler-format" tabindex="-1">C compiler format <a class="header-anchor" href="#c-compiler-format" aria-label="Permalink to &quot;C compiler format&quot;">​</a></h3><p>The usual C compiler like format is supported because it&#39;s quite familiar. In this example a low memory base configuration is read from a YAML config file, and a few options are then tweaked using the C compiler format. An autodetect header is then generated:</p><pre><code>$ cd duktape
$ python tools/genconfig.py \\
    --metadata config/ \\
    --option-file low_memory.yaml \\
    -DDUK_USE_TRACEBACK_DEPTH=100 \\
    -UDUK_USE_JX -UDUK_USE_JC \\
    --output /tmp/duk_config.h \\
    duk-config-header
</code></pre><h3 id="yaml-config" tabindex="-1">YAML config <a class="header-anchor" href="#yaml-config" aria-label="Permalink to &quot;YAML config&quot;">​</a></h3><p>A YAML config file allows options to be specified in a structured, programmatic manner. An example YAML config file, <code>my_config.yaml</code> could contain:</p><pre><code>DUK_USE_OS_STRING: &quot;\\&quot;hack-os\\&quot;&quot;  # force os name for Duktape.env
DUK_USE_ALIGN_BY: 8  # force align-by-8
DUK_USE_FASTINT: true
DUK_UNREF:
  verbatim: &quot;#define DUK_UNREF(x) do { (void) (x); } while (0)&quot;
</code></pre><p>This file, another override file, and a few inline YAML forced options could be used as follows to generate a barebones header:</p><pre><code>$ cd duktape
$ python tools/genconfig.py \\
    --metadata config/ \\
    --platform linux \\
    --compiler gcc \\
    --architecture x64 \\
    --option-file my_config.yaml \\
    --option-file more_overrides.yaml \\
    --option-yaml &#39;DUK_USE_JX: false&#39; \\
    --option-yaml &#39;DUK_USE_JC: false&#39; \\
    --output /tmp/duk_config.h \\
    duk-config-header
</code></pre><p>For inline YAML, multiple forced options can be given either by using a YAML value with multiple keys, or by using multiple options:</p><pre><code># Multiple values for one option
--option-yaml &#39;{ DUK_USE_JX: false, DUK_USE_DEBUG: true }&#39;

# Multiple options
--option-yaml &#39;DUK_USE_JX: false&#39; \\
--option-yaml &#39;DUK_USE_DEBUG: true&#39;
</code></pre><p>The YAML format for specifying options is simple: the top level value must be an object whose keys are define names to override. Values are as follows:</p><ul><li><p><code>false</code>: <code>#undef</code> option:</p><pre><code># Produces: #undef DUK_USE_DEBUG
DUK_USE_DEBUG: false
</code></pre></li><li><p><code>true</code>: <code>#define</code> option:</p><pre><code># Produces: #define DUK_USE_DEBUG
DUK_USE_DEBUG: true
</code></pre></li><li><p>number: decimal value for define:</p><pre><code># Produces: #define DUK_USE_TRACEBACK_DEPTH 10
DUK_USE_TRACEBACK_DEPTH: 10

# Produces: #define DUK_USE_TRACEBACK_DEPTH 100000L
# (a long constant is used automatically if necessary)
DUK_USE_TRACEBACK_DEPTH: 100000
</code></pre></li><li><p>string: verbatim string used as the define value:</p><pre><code># Produces: #define DUK_USE_TRACEBACK_DEPTH (10 + 7)
DUK_USE_TRACEBACK_DEPTH: &quot;(10 + 7)&quot;

# Produces: #define DUK_USE_OS_STRING &quot;linux&quot;
DUK_USE_OS_STRING: &quot;\\&quot;linux\\&quot;&quot;
</code></pre></li><li><p>C string for value:</p><pre><code># Produces: #define DUK_USE_OS_STRING &quot;linux&quot;
DUK_USE_OS_STRING:
  string: &quot;linux&quot;
</code></pre></li><li><p>verbatim text for entire define:</p><pre><code># Produces: #define DUK_UNREF(x) do {} while (0)
DUK_UNREF:
  verbatim: &quot;#define DUK_UNREF(x) do {} while (0)&quot;
</code></pre></li></ul><h3 id="fixup-header" tabindex="-1">Fixup header <a class="header-anchor" href="#fixup-header" aria-label="Permalink to &quot;Fixup header&quot;">​</a></h3><p>In addition to YAML-based option overrides, genconfig has an option for appending direct &quot;fixup headers&quot; to deal with situations which cannot be handled with individual option overrides. For example, you may want to inject specific environment sanity checks. This mechanism is similar to Duktape 1.x <code>duk_custom.h</code> header.</p><p>Since Duktape 2.x some config options control automatic pruning of built-in objects and properties, and such options (like <code>DUK_USE_BUFFEROBJECT_SUPPORT</code>) <strong>MUST NOT</strong> be modified by fixups. It&#39;s thus recommended to modify options via the C compiler format or YAML metadata files.</p><p>Fixup headers are emitted after all individual option overrides (in either C compiler or YAML format) have been resolved, but before emitting option sanity checks (if enabled).</p><p>For example, to generate a barebones header with two fixup headers:</p><pre><code>$ python tools/genconfig.py \\
    --metadata config/ \\
    --platform linux \\
    --compiler gcc \\
    --architecture x64 \\
    --fixup-file my_env_strings.h \\
    --fixup-file my_no_json_fastpath.h \\
    --output /tmp/duk_config.h \\
    duk-config-header
</code></pre><p>The <code>my_env_strings.h</code> fixup header could be:</p><pre><code>/* Force OS string. */
#undef DUK_USE_OS_STRING
#if !defined(__WIN32__)
#error this header is Windows only
#endif
#define DUK_USE_OS_STRING &quot;windows&quot;

/* Force arch string. */
#undef DUK_USE_ARCH_STRING
#if !defined(__amd64__)
#error this header is x64 only
#endif
#define DUK_USE_ARCH_STRING &quot;x64&quot;

/* Force compiler string. */
#undef DUK_USE_COMPILER_STRING
#if !defined(__GNUC__)
#error this header is gcc only
#endif
#if defined(__cplusplus__)
#define DUK_USE_COMPILER_STRING &quot;g++&quot;
#else
#define DUK_USE_COMPILER_STRING &quot;gcc&quot;
#endif
</code></pre><p>The example fixup header uses dynamic detection and other environment checks which cannot be easily expressed using individual option overrides.</p><p>The <code>my_no_json_fastpath.h</code> fixup header could be:</p><pre><code>/* Disable JSON fastpath for reduced footprint. */
#undef DUK_USE_JSON_STRINGIFY_FASTPATH
</code></pre><p>This could have also been expressed using a simple override, e.g. as <code>-UDUK_USE_JSON_STRINGIFY_FASTPATH</code>.</p><p>Fixup headers are appended verbatim so they must be valid C header files, contain appropriate newlines, and must <code>#undef</code> any defines before redefining them if necessary. Fixup headers can only be used to tweak C preprocessor defines, they naturally cannot un-include headers or un-typedef types.</p><p>There&#39;s also a command line option to append a single fixup line for convenience:</p><pre><code># Append two lines to forcibly enable fastints
--fixup-line &#39;#undef DUK_USE_FASTINT&#39; \\
--fixup-line &#39;#define DUK_USE_FASTINT&#39;
</code></pre><p>These can be mixed with <code>--fixup-file</code> options and are processed in sequence.</p><h2 id="modifying-a-duk-config-h-manually-or-using-scripting" tabindex="-1">Modifying a duk_config.h manually or using scripting <a class="header-anchor" href="#modifying-a-duk-config-h-manually-or-using-scripting" aria-label="Permalink to &quot;Modifying a duk_config.h manually or using scripting&quot;">​</a></h2><p>The basic approach when using scripted modifications is to take a base header (either an autodetect or barebones header) and then make specific changes using a script. The advantage of doing so is that if the base header is updated, the script may often still be valid without any manual changes.</p><p>Scripting provides much more flexibility than tweaking individual options in genconfig, but the cost is more complicated maintenance over time.</p><h3 id="using-diff-patch" tabindex="-1">Using diff/patch <a class="header-anchor" href="#using-diff-patch" aria-label="Permalink to &quot;Using diff/patch&quot;">​</a></h3><ul><li><p>Make the necessary changes to the base header manually.</p></li><li><p>Use <code>diff</code> to store the changes:</p><pre><code>$ diff -u duk_config.h.base duk_config.h.edited &gt; edits.diff
</code></pre></li><li><p>In your build script:</p><pre><code>$ cp duk_config.h.base duk_config.h
$ patch duk_config.h edits.diff
</code></pre></li><li><p>If the patch fails (e.g. there is too much offset), you need to rebuild the diff file manually.</p></li></ul><h3 id="using-sed-or-awk-etc-to-modify-an-option-in-place" tabindex="-1">Using sed (or awk, etc) to modify an option in-place <a class="header-anchor" href="#using-sed-or-awk-etc-to-modify-an-option-in-place" aria-label="Permalink to &quot;Using sed (or awk, etc) to modify an option in-place&quot;">​</a></h3><p>If an option is defined on a single line in the base header, e.. either as:</p><pre><code>#define DUK_USE_FOO
</code></pre><p>or as:</p><pre><code>#undef DUK_USE_FOO
</code></pre><p>you can use <code>sed</code> to easily flip such an option:</p><pre><code># enable shuffle torture
cat duk_config.h.base | \\
    sed -r -e &#39;s/^#\\w+\\s+DUK_USE_SHUFFLE_TORTURE.*$/#define DUK_USE_SHUFFLE_TORTURE  \\/*forced*\\//&#39; \\
    &gt; duk_config.h
</code></pre><p>The above example would flip DUK_USE_SHUFFLE_TORTURE on, regardless of its previous setting. You can also use a more verbose sed format which is easier to read especially if there are multiple changes:</p><pre><code>cat duk_config.h.base | sed -r -e &#39;
s/^#\\w+\\s+DUK_USE_SHUFFLE_TORTURE.*$/#define DUK_USE_SHUFFLE_TORTURE  \\/*forced*\\//
s/^#\\w+\\s+DUK_USE_OS_STRING.*$/#define DUK_USE_OS_STRING &quot;my-custom-os&quot;  \\/*forced*\\//
&#39; &gt; duk_config.h
</code></pre><p>This approach won&#39;t work if the defined option is defined/undefined multiple times or if the define has a multiline value.</p><p>For more stateful changes you can use <code>awk</code> or other scripting languages (Python, Perl, etc).</p><h3 id="modifying-defines-at-override-defines" tabindex="-1">Modifying defines at __OVERRIDE_DEFINES__ <a class="header-anchor" href="#modifying-defines-at-override-defines" aria-label="Permalink to &quot;Modifying defines at \\_\\_OVERRIDE_DEFINES\\_\\_&quot;">​</a></h3><p>Instead of modifying options in-place as in the sed example above, you can simply append additional preprocessor directives to undefine/redefine options as necessary. This is much easier to maintain in version updates than when modifications are made in-place.</p><p>Genconfig has a direct option to append &quot;fixups&quot; after the main generated header:</p><pre><code># my_custom.h is applied after generated header; functionally similar
# to Duktape 1.2.x duk_custom.h

$ python tools/genconfig.py [...] --fixup-file my_custom.h [...]
</code></pre><p>A genconfig-generated barebones header also has the following line near the end for detecting where to add override defines; this is easy to detect reliably:</p><pre><code>/* __OVERRIDE_DEFINES__ */
</code></pre><p>The <code>__OVERRIDE_DEFINES__</code> line is near the end of the file, before any automatically generated option sanity checks (which are optional) so that the sanity checks will be applied after your tweaks have been done:</p><pre><code>#!/bin/bash

CONFIG_IN=duk_config.h.base
CONFIG_OUT=duk_config.h.new

cat $CONFIG_IN | sed -e &#39;
/^\\/\\* __OVERRIDE_DEFINES__ \\*\\/$/ {
    r my_overrides.h
    d
}&#39; &gt; $CONFIG_OUT
</code></pre><p>Modifying defines near the end of the file is relatively easy but has a few limitations:</p><ul><li>You can&#39;t change typedefs this way because there&#39;s no way to un-typedef.</li><li>You can&#39;t undo any <code>#include</code> directives executed.</li></ul><h3 id="modifying-defines-at-the-end-of-the-file" tabindex="-1">Modifying defines at the end of the file <a class="header-anchor" href="#modifying-defines-at-the-end-of-the-file" aria-label="Permalink to &quot;Modifying defines at the end of the file&quot;">​</a></h3><p>Another simple approach is to simply assume that an <code>#endif</code> line (include guard) is the last line in the file, i.e. there are no trailing empty lines. Changes will then be applied after option sanity checks which is not ideal:</p><pre><code>#!/bin/bash

CONFIG_IN=duk_config.h.base
CONFIG_OUT=duk_config.h.new

if tail -1 $CONFIG_IN | grep endif ; then
    echo &quot;Final line of $CONFIG_IN is an #endif as expected, modifying config&quot;
else
    echo &quot;Final line of $CONFIG_IN is not an #endif!&quot;
    exit 1
fi

head -n -1 $CONFIG_IN &gt; $CONFIG_OUT
cat &gt;&gt; $CONFIG_OUT &lt;&lt;EOF
/*
 *  Config hacks for platform XYZ.
 */

#undef DUK_USE_FASTINT  /* undef first to avoid redefine */
#define DUK_USE_FASTINT

/* compiler on XYZ has a custom &quot;unreferenced&quot; syntax */
#undef DUK_UNREF
#define DUK_UNREF(x) do { __foo_compiler_unreferenced((x)); } while (0)

#endif  /* DUK_CONFIG_H_INCLUDED */
EOF

echo &quot;Wrote new config to $CONFIG_OUT, diff -u:&quot;
diff -u $CONFIG_IN $CONFIG_OUT
</code></pre><h3 id="dealing-with-include-files" tabindex="-1">Dealing with #include files <a class="header-anchor" href="#dealing-with-include-files" aria-label="Permalink to &quot;Dealing with #include files&quot;">​</a></h3><p>Include files are often a portability problem on exotic targets:</p><ul><li>System headers may be missing. You may need to provide replacement functions for even very basic features like string formatting functions.</li><li>System headers may be present but in non-standard include paths. Duktape can&#39;t easily autodetect such paths because there&#39;s no &quot;#include if available&quot; directive: an <code>#include</code> either succeeds or causes compilation to fail.</li><li>System headers may be present but broken in some fashion so you want to avoid them entirely.</li><li>Sometimes custom programming environments have &quot;SDK headers&quot; that conflict with standard headers so that you can&#39;t include them both at the same time. It may be necessary to include the SDK headers but provide manual declarations for the system functions needed.</li></ul><p>In such cases you may need to replace all the <code>#include</code> statements of a base header file and provide alternate include files or manual declarations.</p><h3 id="keeping-a-manually-created-duk-config-h-up-to-date" tabindex="-1">Keeping a manually created duk_config.h up-to-date <a class="header-anchor" href="#keeping-a-manually-created-duk-config-h-up-to-date" aria-label="Permalink to &quot;Keeping a manually created duk_config.h up-to-date&quot;">​</a></h3><p>When new Duktape versions are released, the set of config options and other macros required of the <code>duk_config.h</code> config header may change. This is the case for even minor version updates, though incompatible changes are of course avoided when possible.</p><p>Nevertheless, when a new version is taken into use, you may need to update your config header to match. How to do that depends on how you created the config header:</p><ul><li>If you&#39;re using the default header, no changes should be necessary. You should check out new config options and decide if the defaults are OK for them.</li><li>If you&#39;re using a script to modify the default or genconfig-generated header, you should ensure your script works when the source header is updated to the new Duktape release.</li><li>If you&#39;re editing a config header manually, you should look at the diff between the previous and new default config header to see what defines have changed, and then implement matching changes in your updated header.</li></ul><h2 id="adding-a-new-compiler-platform-or-architecture" tabindex="-1">Adding a new compiler, platform, or architecture <a class="header-anchor" href="#adding-a-new-compiler-platform-or-architecture" aria-label="Permalink to &quot;Adding a new compiler, platform, or architecture&quot;">​</a></h2><h3 id="adding-a-new-platform-acme-os" tabindex="-1">Adding a new platform &quot;Acme OS&quot; <a class="header-anchor" href="#adding-a-new-platform-acme-os" aria-label="Permalink to &quot;Adding a new platform \\&quot;Acme OS\\&quot;&quot;">​</a></h3><ul><li>Add a new detection snippet <code>config/helper-snippets/DUK_F_ACMEOS.h.in</code>.</li><li>Create a new <code>config/platforms/platform_acmeos.h.in</code>. Platform files should have the necessary <code>#include</code> statements, select the Date provider, and can override various broken platform calls. For example, if <code>realloc()</code> doesn&#39;t handle NULL and/or zero size correctly, you can override that. Compare to existing platform files for reference.</li><li>Add the platform to <code>config/platforms.yaml</code>, reference <code>DUK_F_ACMEOS</code> for detection.</li></ul><p>That should be enough for an autogenerated <code>duk_config.h</code> to support Acme OS detection.</p><h3 id="adding-a-compiler-or-an-architecture" tabindex="-1">Adding a compiler or an architecture <a class="header-anchor" href="#adding-a-compiler-or-an-architecture" aria-label="Permalink to &quot;Adding a compiler or an architecture&quot;">​</a></h3><p>The process is similar for compilers and architectures; see existing files for reference.</p><h3 id="notes" tabindex="-1">Notes <a class="header-anchor" href="#notes" aria-label="Permalink to &quot;Notes&quot;">​</a></h3><h4 id="byte-order" tabindex="-1">Byte order <a class="header-anchor" href="#byte-order" aria-label="Permalink to &quot;Byte order&quot;">​</a></h4><p>Byte order is a awkward to detect automatically:</p><ul><li>Sometimes byte order is best determined based on architecture, especially for architectures with a fixed byte order. Some architectures can support multiple endianness modes, however, and it depends on the platform which one is used.</li><li>Sometimes byte order is best determined from compiler defines; for example GCC and Clang provide built-in defines which mostly provide the necessary endianness information without the need to use system headers.</li><li>Sometimes byte order is best determined from platform <code>#include</code> headers. There&#39;s a lot of variability in what defines are available, and where the related headers are located.</li></ul><p>To allow endianness to be determined in each phase, platform, architecture, and compiler files should only define endianness when not already defined:</p><pre><code>#if !defined(DUK_USE_BYTE_ORDER)
#define DUK_USE_BYTE_ORDER 1
#endif
</code></pre><h4 id="alignment" tabindex="-1">Alignment <a class="header-anchor" href="#alignment" aria-label="Permalink to &quot;Alignment&quot;">​</a></h4><p>Alignment is similar to byte order for detection: it can be sometimes detected from architecture, sometimes from platform, etc. There are architectures where alignment requirements are configurable, e.g. on X86 it&#39;s up to the operating system to decide if AC (Alignment Check) is enabled for application code.</p><p>As a result, platform, architecture, and compiler files should avoid redefinition:</p><pre><code>#if !defined(DUK_USE_ALIGN_BY)
#define DUK_USE_ALIGN_BY 4
#endif
</code></pre><h2 id="defines-provided-by-duk-config-h" tabindex="-1">Defines provided by duk_config.h <a class="header-anchor" href="#defines-provided-by-duk-config-h" aria-label="Permalink to &quot;Defines provided by duk_config.h&quot;">​</a></h2><p>The role of <code>duk_config.h</code> is to provide all typedefs, macros, structures, system headers, etc, which are platform dependent. Duktape internals can then just assume these are in place and will remain clean of any detection.</p><p>These typedefs, macros, etc, include:</p><ul><li>Including platform specific headers (<code>#include &lt;...&gt;</code>) needed by any of the config header macros, including: <ul><li>Standard library functions like <code>sprintf()</code> and <code>memset()</code></li><li>Math functions like <code>acos()</code></li><li>Any other functions called by macros defined in duk_config.h, e.g. the functions needed by a custom Date provider</li></ul></li><li>Typedefs for integer and floating point types (<code>duk_uint8_t</code>, etc), and their limit defines.</li><li>Some IEEE double constants, including NaN and Infinity, because some constants cannot be reliably expressed as constants in all compilers.</li><li>Wrapper macros for platform functions, covering string operations, file I/O, math, etc. For example: <code>DUK_FOPEN()</code>, <code>DUK_SPRINTF()</code>, <code>DUK_ACOS()</code>), etc. Typically these are just mapped 1:1 to platform functions, but sometimes tweaks are needed.</li><li>Various compiler specific macros: unreachable code, unreferenced variable, symbol visibility attributes, inlining control, etc.</li><li>Duktape config options, <code>DUK_USE_xxx</code>, including a possible custom Date provider.</li></ul><p>Duktape config options are available in a machine parseable metadata form:</p><ul><li><code>config/config-options/DUK_USE_*.yaml</code>: Duktape config options.</li></ul>`,129)]))}const h=o(t,[["render",r]]);export{f as __pageData,h as default};
