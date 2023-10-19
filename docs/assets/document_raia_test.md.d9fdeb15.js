import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.32d25f99.js";const u=JSON.parse('{"title":"Raiaのソフトウェアテスト","description":"","frontmatter":{},"headers":[],"relativePath":"document/raia_test.md","filePath":"document/raia_test.md","lastUpdated":1697381634000}'),p={name:"document/raia_test.md"},e=l(`<h1 id="raiaのソフトウェアテスト" tabindex="-1">Raiaのソフトウェアテスト <a class="header-anchor" href="#raiaのソフトウェアテスト" aria-label="Permalink to &quot;Raiaのソフトウェアテスト&quot;">​</a></h1><p>C言語で書かれた Raia のライブラリは、テストフレームワークに <code>sharedom/utest.h</code> を採用し、テストコードはC++で記述されます。</p><h2 id="utest-h" tabindex="-1">utest.h <a class="header-anchor" href="#utest-h" aria-label="Permalink to &quot;utest.h&quot;">​</a></h2><p><code>~/Documents/</code> ディレクトリに raia リポジトリをクローンしていると仮定します。</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">~/Documents/raia/src/third_party/cpp</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">~/Documents/raia/src/third_party/cpp</span></span></code></pre></div><h2 id="google-testの取得を取得する" tabindex="-1">Google Testの取得を取得する <a class="header-anchor" href="#google-testの取得を取得する" aria-label="Permalink to &quot;Google Testの取得を取得する&quot;">​</a></h2><p>サブモジュールとしてgitリポジトリに追加します</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">submodule</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">add</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">https://github.com/google/googletest.git</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">googletest</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">submodule</span><span style="color:#24292E;"> </span><span style="color:#032F62;">add</span><span style="color:#24292E;"> </span><span style="color:#032F62;">https://github.com/google/googletest.git</span><span style="color:#24292E;"> </span><span style="color:#032F62;">googletest</span></span></code></pre></div><h2 id="cmakelists-txtの設定" tabindex="-1">CMakeLists.txtの設定* <a class="header-anchor" href="#cmakelists-txtの設定" aria-label="Permalink to &quot;CMakeLists.txtの設定*&quot;">​</a></h2><p>プロジェクトの <code>CMakeLists.txt</code> ファイルに以下の設定を追加します。</p><div class="language-cmake vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cmake</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">cmake_minimum_required</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">VERSION</span><span style="color:#E1E4E8;"> 3.10)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">project</span><span style="color:#E1E4E8;">(YourProjectName)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># メインのC言語ソースコードをターゲットとして追加</span></span>
<span class="line"><span style="color:#F97583;">add_executable</span><span style="color:#E1E4E8;">(main_app src/main.c)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Google TestをCMakeに組み込む</span></span>
<span class="line"><span style="color:#F97583;">add_subdirectory</span><span style="color:#E1E4E8;">(extern/googletest)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Google Testのインクルードディレクトリを追加</span></span>
<span class="line"><span style="color:#F97583;">include_directories</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">\${gtest_SOURCE_DIR}</span><span style="color:#E1E4E8;">/include </span><span style="color:#F97583;">\${gtest_SOURCE_DIR}</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># テスト用のC++ファイルをターゲットとして追加</span></span>
<span class="line"><span style="color:#F97583;">add_executable</span><span style="color:#E1E4E8;">(tests tests/test_main.cpp)</span></span>
<span class="line"><span style="color:#F97583;">target_link_libraries</span><span style="color:#E1E4E8;">(tests gtest gtest_main)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># メインのC言語ソースとテストのC++ソースをリンク</span></span>
<span class="line"><span style="color:#F97583;">target_link_libraries</span><span style="color:#E1E4E8;">(tests main_app)</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">cmake_minimum_required</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">VERSION</span><span style="color:#24292E;"> 3.10)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">project</span><span style="color:#24292E;">(YourProjectName)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># メインのC言語ソースコードをターゲットとして追加</span></span>
<span class="line"><span style="color:#D73A49;">add_executable</span><span style="color:#24292E;">(main_app src/main.c)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Google TestをCMakeに組み込む</span></span>
<span class="line"><span style="color:#D73A49;">add_subdirectory</span><span style="color:#24292E;">(extern/googletest)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># Google Testのインクルードディレクトリを追加</span></span>
<span class="line"><span style="color:#D73A49;">include_directories</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">\${gtest_SOURCE_DIR}</span><span style="color:#24292E;">/include </span><span style="color:#D73A49;">\${gtest_SOURCE_DIR}</span><span style="color:#24292E;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># テスト用のC++ファイルをターゲットとして追加</span></span>
<span class="line"><span style="color:#D73A49;">add_executable</span><span style="color:#24292E;">(tests tests/test_main.cpp)</span></span>
<span class="line"><span style="color:#D73A49;">target_link_libraries</span><span style="color:#24292E;">(tests gtest gtest_main)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;"># メインのC言語ソースとテストのC++ソースをリンク</span></span>
<span class="line"><span style="color:#D73A49;">target_link_libraries</span><span style="color:#24292E;">(tests main_app)</span></span></code></pre></div><ol start="3"><li><strong>テストの記述</strong>: <ul><li><code>tests/test_main.cpp</code>のようなファイルを作成して、C++を使用してテストを記述します。</li></ul></li></ol><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">#include</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&lt;gtest/gtest.h&gt;</span></span>
<span class="line"><span style="color:#F97583;">extern</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;C&quot;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">#include</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;path_to_your_c_header.h&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#B392F0;">TEST</span><span style="color:#E1E4E8;">(YourTestCase, YourTestName) {</span></span>
<span class="line"><span style="color:#6A737D;">    // テストの内容を記述</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">main</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">int</span><span style="color:#E1E4E8;"> </span><span style="color:#FFAB70;">argc</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">char</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">**</span><span style="color:#FFAB70;">argv</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ::</span><span style="color:#B392F0;">testing</span><span style="color:#E1E4E8;">::</span><span style="color:#B392F0;">InitGoogleTest</span><span style="color:#E1E4E8;">(</span><span style="color:#F97583;">&amp;</span><span style="color:#E1E4E8;">argc, argv);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">RUN_ALL_TESTS</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">#include</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&lt;gtest/gtest.h&gt;</span></span>
<span class="line"><span style="color:#D73A49;">extern</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;C&quot;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">#include</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;path_to_your_c_header.h&quot;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6F42C1;">TEST</span><span style="color:#24292E;">(YourTestCase, YourTestName) {</span></span>
<span class="line"><span style="color:#6A737D;">    // テストの内容を記述</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">main</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">int</span><span style="color:#24292E;"> </span><span style="color:#E36209;">argc</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">char</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">**</span><span style="color:#E36209;">argv</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    ::</span><span style="color:#6F42C1;">testing</span><span style="color:#24292E;">::</span><span style="color:#6F42C1;">InitGoogleTest</span><span style="color:#24292E;">(</span><span style="color:#D73A49;">&amp;</span><span style="color:#24292E;">argc, argv);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">RUN_ALL_TESTS</span><span style="color:#24292E;">();</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>注意: <code>extern &quot;C&quot;</code>ブロックを使用して、CのヘッダファイルをC++コードから読み込むことで、Cの関数や変数を正しくリンクすることができます。</p><ol start="4"><li><strong>テストのビルドと実行</strong>: <ul><li>CMakeを使用してプロジェクトをビルドし、生成されたテストバイナリを実行してテストを実施します。</li></ul></li></ol><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">mkdir</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span></span>
<span class="line"><span style="color:#79B8FF;">cd</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">build</span></span>
<span class="line"><span style="color:#B392F0;">cmake</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">..</span></span>
<span class="line"><span style="color:#B392F0;">make</span></span>
<span class="line"><span style="color:#B392F0;">./tests</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">mkdir</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span></span>
<span class="line"><span style="color:#005CC5;">cd</span><span style="color:#24292E;"> </span><span style="color:#032F62;">build</span></span>
<span class="line"><span style="color:#6F42C1;">cmake</span><span style="color:#24292E;"> </span><span style="color:#032F62;">..</span></span>
<span class="line"><span style="color:#6F42C1;">make</span></span>
<span class="line"><span style="color:#6F42C1;">./tests</span></span></code></pre></div><p>これで、CMakeプロジェクトにGoogle Testを組み込み、C言語のコードに対してC++でテストを実行する設定が完了しました。</p>`,17),o=[e];function t(c,r,i,y,E,d){return a(),n("div",null,o)}const h=s(p,[["render",t]]);export{u as __pageData,h as default};
