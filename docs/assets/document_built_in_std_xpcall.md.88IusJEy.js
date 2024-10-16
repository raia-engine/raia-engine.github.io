import{_ as s,c as i,a2 as e,o as l}from"./chunks/framework.6x3wfQve.js";const k=JSON.parse('{"title":"xpcall","description":"","frontmatter":{},"headers":[],"relativePath":"document/built_in/std/xpcall.md","filePath":"document/built_in/std/xpcall.md","lastUpdated":1729067310000}'),t={name:"document/built_in/std/xpcall.md"};function n(h,a,p,d,r,c){return l(),i("div",null,a[0]||(a[0]=[e(`<h1 id="xpcall" tabindex="-1">xpcall <a class="header-anchor" href="#xpcall" aria-label="Permalink to &quot;xpcall&quot;">​</a></h1><p>保護されたモードで関数を呼び出す（エラーハンドラを指定できる）</p><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">xpcall</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (f, err)</span></span></code></pre></div><h2 id="説明" tabindex="-1">説明 <a class="header-anchor" href="#説明" aria-label="Permalink to &quot;説明&quot;">​</a></h2><p>この関数は<code>pcall</code>に似ていますが、新しいエラーハンドラを設定できます。</p><p><code>xpcall</code>は<code>err</code>をエラーハンドラとして使用し、保護モードで関数<code>f</code>を呼び出します。<code>f</code>内の任意のエラーは伝播されません。代わりに、<code>xpcall</code>はエラーをキャッチし、元のエラーオブジェクトで<code>err</code>関数を呼び出し、ステータスコードを返します。最初の結果はステータスコード（真偽値）であり、エラーなしで呼び出しが成功した場合はtrueです。この場合、<code>xpcall</code>はこの最初の結果の後に、呼び出しからのすべての結果も返します。エラーが発生した場合、<code>xpcall</code>は<code>false</code>と<code>err</code>からの結果を返します。</p><h2 id="サンプルコード" tabindex="-1">サンプルコード <a class="header-anchor" href="#サンプルコード" aria-label="Permalink to &quot;サンプルコード&quot;">​</a></h2><div class="language-lua vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">lua</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">local</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> status, err </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> xpcall</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">error</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;error&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(e) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;Handled: &quot; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">..</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> e </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">end</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(status, err)</span></span></code></pre></div><p>この例では、エラーが発生してもエラーハンドラによって処理されます。</p><h2 id="互換性" tabindex="-1">互換性 <a class="header-anchor" href="#互換性" aria-label="Permalink to &quot;互換性&quot;">​</a></h2><ul><li>Lua5.1</li></ul><h2 id="関連項目" tabindex="-1">関連項目 <a class="header-anchor" href="#関連項目" aria-label="Permalink to &quot;関連項目&quot;">​</a></h2><ul><li><a href="./pcall.html"><code>pcall</code></a></li></ul>`,13)]))}const u=s(t,[["render",n]]);export{k as __pageData,u as default};
