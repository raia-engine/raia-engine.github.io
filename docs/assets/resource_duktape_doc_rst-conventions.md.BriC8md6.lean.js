import{_ as t,c as n,a2 as o,o as a}from"./chunks/framework.DzmM640o.js";const h=JSON.parse('{"title":"reStructuredText conventions","description":"","frontmatter":{},"headers":[],"relativePath":"resource/duktape/doc/rst-conventions.md","filePath":"resource/duktape/doc/rst-conventions.md","lastUpdated":1732350347000}'),r={name:"resource/duktape/doc/rst-conventions.md"};function s(i,e,l,d,c,u){return a(),n("div",null,e[0]||(e[0]=[o(`<h1 id="restructuredtext-conventions" tabindex="-1">reStructuredText conventions <a class="header-anchor" href="#restructuredtext-conventions" aria-label="Permalink to &quot;reStructuredText conventions&quot;">​</a></h1><h2 id="file-extension" tabindex="-1">File extension <a class="header-anchor" href="#file-extension" aria-label="Permalink to &quot;File extension&quot;">​</a></h2><p>Although <code>.txt</code> extension is probably technically correct for RST files, use <code>.rst</code> for internal documentation for better compatibility with editors, GitHub, etc.</p><h2 id="section-markers" tabindex="-1">Section markers <a class="header-anchor" href="#section-markers" aria-label="Permalink to &quot;Section markers&quot;">​</a></h2><p>Book level:</p><ol><li>Over- and underlined hash marks (<code>#</code>) for book title</li><li>Over- and underlined stars (<code>*</code>) for book sub-title</li></ol><p>File level:</p><ol><li>Over- and underlined equals signs (<code>=</code>) once at top of file (file topic)</li><li>Underlined equals signs (<code>=</code>)</li><li>Underlined minus signs (<code>-</code>)</li><li>Underlined colons (<code>:</code>)</li><li>Underlined periods (<code>.</code>)</li></ol><p>The book level notation is reserved for future use. It allows the internal documentation to be easily built into a single HTML/PDF file for ease of browsing.</p><h2 id="page-breaks" tabindex="-1">Page breaks <a class="header-anchor" href="#page-breaks" aria-label="Permalink to &quot;Page breaks&quot;">​</a></h2><p>See <a href="http://comments.gmane.org/gmane.text.docutils.user/6473" target="_blank" rel="noreferrer">http://comments.gmane.org/gmane.text.docutils.user/6473</a>.</p><p>You can use:</p><pre><code>.. raw:: LaTeX

   \\newpage
</code></pre><h2 id="lists" tabindex="-1">Lists <a class="header-anchor" href="#lists" aria-label="Permalink to &quot;Lists&quot;">​</a></h2><h3 id="numbering" tabindex="-1">Numbering <a class="header-anchor" href="#numbering" aria-label="Permalink to &quot;Numbering&quot;">​</a></h3><p>List numbering styles can be mixed, e.g.:</p><pre><code>1. Foo

  a. Bar

     1. Quux
</code></pre><p>However, e.g. GitHub will renumber the bullets and may also change the numbering style. This will make references to list elements confusing; e.g. if you refer to Quux as element 1.a.1 above, the reference is quite confusing if Quux was renumbered to 1.1.1 or 1.a.iii. Even so, such references are sometimes necessary, so they can be used. Start at zero indent.</p><h3 id="bullets" tabindex="-1">Bullets <a class="header-anchor" href="#bullets" aria-label="Permalink to &quot;Bullets&quot;">​</a></h3><p>Recommended bullet styles by level:</p><pre><code>* Foo

  + Bar

    - Quux
</code></pre><h3 id="start-at-zero-indent" tabindex="-1">Start at zero indent <a class="header-anchor" href="#start-at-zero-indent" aria-label="Permalink to &quot;Start at zero indent&quot;">​</a></h3><p>Start lists at zero indent, e.g.:</p><pre><code>* Foo

* Bar
</code></pre><p>If you don&#39;t, GitHub will render the list as a quoted block.</p><h3 id="empty-lines" tabindex="-1">Empty lines <a class="header-anchor" href="#empty-lines" aria-label="Permalink to &quot;Empty lines&quot;">​</a></h3><p>Use empty lines between elements and sub-elements for readability and to minimize formatting issues:</p><pre><code>1. Foo

  a. sub-foo

     + sub-sub-foo

  b. sub-bar

2. Bar

3. Quux
</code></pre><h3 id="nested-lists" tabindex="-1">Nested lists <a class="header-anchor" href="#nested-lists" aria-label="Permalink to &quot;Nested lists&quot;">​</a></h3><p>While <code>rst2pdf</code> and friends are somewhat lenient with respect to nested lists, some RST formatters are a bit more picky. To work well with all formatters, make sure that a nested list&#39;s bullet mark is indented to the level of the previous level&#39;s body, e.g.:</p><pre><code>1. Foo

   a. sub-foo

   b. sub-bar

2. Bar
</code></pre><p>The following is <strong>incorrect</strong> and may render the nested list as a quoted block:</p><pre><code>1. Foo

  a. sub-foo

  b. sub-bar

2. Bar
</code></pre><p>Note that the required level depends on the length of the parent bullet. This matters for numbered lists:</p><pre><code>9. Foo

   a. sub-foo

   b. sub-bar

10. Bar

    a. sub-foo (with one more indent than above)

    b. sub-bar
</code></pre>`,35)]))}const p=t(r,[["render",s]]);export{h as __pageData,p as default};
