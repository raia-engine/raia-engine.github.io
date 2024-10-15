import{_ as a,c as n,a2 as e,o}from"./chunks/framework.6x3wfQve.js";const g=JSON.parse('{"title":"skia/gn/BUILDCONFIG.gn の解説","description":"","frontmatter":{},"headers":[],"relativePath":"reference/skia/skia_gn_buildconfig_gn.md","filePath":"reference/skia/skia_gn_buildconfig_gn.md","lastUpdated":null}'),i={name:"reference/skia/skia_gn_buildconfig_gn.md"};function l(c,s,p,t,d,u){return o(),n("div",null,s[0]||(s[0]=[e(`<h1 id="skia-gn-buildconfig-gn-の解説" tabindex="-1">skia/gn/BUILDCONFIG.gn の解説 <a class="header-anchor" href="#skia-gn-buildconfig-gn-の解説" aria-label="Permalink to &quot;skia/gn/BUILDCONFIG.gn の解説&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#著作権とライセンス">著作権とライセンス</a></li><li><a href="#グローバルフラグの定義">グローバルフラグの定義</a></li><li><a href="#ビルド引数の宣言-第一部">ビルド引数の宣言（第一部）</a></li><li><a href="#ビルド引数の宣言-第二部">ビルド引数の宣言（第二部）</a></li><li><a href="#デバッグビルドと公式ビルドの矛盾チェック">デバッグビルドと公式ビルドの矛盾チェック</a></li><li><a href="#webassemblyターゲットの設定">WebAssemblyターゲットの設定</a></li><li><a href="#プラットフォームの検出">プラットフォームの検出</a></li><li><a href="#プラットフォームのフラグ設定">プラットフォームのフラグ設定</a></li><li><a href="#chromeosおよびappleプラットフォームの設定">ChromeOSおよびAppleプラットフォームの設定</a></li><li><a href="#ターゲットcpuの設定">ターゲットCPUの設定</a></li><li><a href="#clangコンパイラの判定">Clangコンパイラの判定</a></li><li><a href="#android-ndkの設定">Android NDKの設定</a></li><li><a href="#windows用msvcコンパイラの検出">Windows用MSVCコンパイラの検出</a></li><li><a href="#windowsプラットフォームの設定">Windowsプラットフォームの設定</a></li><li><a href="#visual-studioツールチェインのバージョン設定">Visual Studioツールチェインのバージョン設定</a></li><li><a href="#windows-sdkのバージョン設定">Windows SDKのバージョン設定</a></li><li><a href="#clang-for-windowsのバージョン設定">Clang for Windowsのバージョン設定</a></li><li><a href="#全体の流れ">全体の流れ</a></li><li><a href="#コンポーネントの定義">コンポーネントの定義</a></li><li><a href="#デフォルトコンフィグの定義">デフォルトコンフィグの定義</a></li><li><a href="#ターゲットごとのデフォルト設定">ターゲットごとのデフォルト設定</a></li><li><a href="#skiaのデフォルトコンフィグ設定">Skiaのデフォルトコンフィグ設定</a></li><li><a href="#skiaのヘッダ用デフォルトコンフィグ設定">Skiaのヘッダ用デフォルトコンフィグ設定</a></li><li><a href="#ツールチェインの設定">ツールチェインの設定</a></li></ul></nav><h3 id="著作権とライセンス" tabindex="-1">著作権とライセンス <a class="header-anchor" href="#著作権とライセンス" aria-label="Permalink to &quot;著作権とライセンス&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Copyright 2016 Google Inc.</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># Use of this source code is governed by a BSD-style license that can be</span></span>
<span class="line"><span># found in the LICENSE file.</span></span></code></pre></div><ul><li><strong>説明</strong>: この部分はファイルの著作権が2016年のGoogle Inc.にあり、BSDスタイルのライセンスに従うことを示しています。</li></ul><h3 id="グローバルフラグの定義" tabindex="-1">グローバルフラグの定義 <a class="header-anchor" href="#グローバルフラグの定義" aria-label="Permalink to &quot;グローバルフラグの定義&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>is_skia_standalone = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span># It&#39;s best to keep the names and defaults of is_foo flags consistent with Chrome.</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>is_skia_standalone</code> を <code>true</code> に設定します。これはSkiaが独立したプロジェクトとしてビルドされることを示します。</li><li>フラグ名とデフォルト値をChromeと一致させることを推奨しています。</li></ul></li></ul><h3 id="ビルド引数の宣言-第一部" tabindex="-1">ビルド引数の宣言（第一部） <a class="header-anchor" href="#ビルド引数の宣言-第一部" aria-label="Permalink to &quot;ビルド引数の宣言（第一部）&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>declare_args() {</span></span>
<span class="line"><span>  is_official_build = false</span></span>
<span class="line"><span>  is_component_build = false</span></span>
<span class="line"><span>  ndk = &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # Android 5.0, Lollipop</span></span>
<span class="line"><span>  ndk_api = 21</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  sanitize = &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ar = &quot;ar&quot;</span></span>
<span class="line"><span>  cc = &quot;cc&quot;</span></span>
<span class="line"><span>  cxx = &quot;c++&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  win_sdk = &quot;C:/Program Files (x86)/Windows Kits/10&quot;</span></span>
<span class="line"><span>  win_sdk_version = &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  win_vc = &quot;&quot;</span></span>
<span class="line"><span>  win_toolchain_version = &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  clang_win = &quot;&quot;</span></span>
<span class="line"><span>  clang_win_version = &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ios_min_target = &quot;&quot;</span></span>
<span class="line"><span>  ios_use_simulator =</span></span>
<span class="line"><span>      target_os == &quot;ios&quot; &amp;&amp; (target_cpu == &quot;x86&quot; || target_cpu == &quot;x64&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # Enable -H, which prints the include tree during compilation.</span></span>
<span class="line"><span>  # For use by external tools for analyzing include files.</span></span>
<span class="line"><span>  show_includes = false</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: ここでは、ビルドに関連するさまざまな引数を宣言しています。 <ul><li><code>is_official_build</code>: 公式ビルドかどうかを示すフラグ。デフォルトは <code>false</code>。</li><li><code>is_component_build</code>: コンポーネントビルドかどうかを示すフラグ。デフォルトは <code>false</code>。</li><li><code>ndk</code>: Android NDKのパス。</li><li><code>ndk_api</code>: 使用するNDKのAPIレベル。デフォルトは21（Android 5.0, Lollipop）。</li><li><code>sanitize</code>: サニタイザーの種類。</li><li><code>ar</code>: アーカイブツールの名前。デフォルトは <code>&quot;ar&quot;</code>。</li><li><code>cc</code>: Cコンパイラの名前。デフォルトは <code>&quot;cc&quot;</code>。</li><li><code>cxx</code>: C++コンパイラの名前。デフォルトは <code>&quot;c++&quot;</code>。</li><li><code>win_sdk</code>: Windows SDKのパス。</li><li><code>win_sdk_version</code>: Windows SDKのバージョン。</li><li><code>win_vc</code>: Visual C++のパス。</li><li><code>win_toolchain_version</code>: Visual C++ツールチェインのバージョン。</li><li><code>clang_win</code>: Windows用Clangのパス。</li><li><code>clang_win_version</code>: Windows用Clangのバージョン。</li><li><code>ios_min_target</code>: iOSの最小ターゲットバージョン。</li><li><code>ios_use_simulator</code>: iOSシミュレータを使用するかどうかを示すフラグ。<code>target_os</code> が <code>ios</code> かつ <code>target_cpu</code> が <code>x86</code> または <code>x64</code> の場合に <code>true</code>。</li><li><code>show_includes</code>: コンパイル時にインクルードツリーを表示するかどうかを示すフラグ。デフォルトは <code>false</code>。</li></ul></li></ul><h3 id="ビルド引数の宣言-第二部" tabindex="-1">ビルド引数の宣言（第二部） <a class="header-anchor" href="#ビルド引数の宣言-第二部" aria-label="Permalink to &quot;ビルド引数の宣言（第二部）&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>declare_args() {</span></span>
<span class="line"><span>  is_debug = !is_official_build</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # This affects Skia&#39;s ABI; must be set consistently for Skia and dependents.</span></span>
<span class="line"><span>  is_trivial_abi = !is_official_build</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: ここでは追加のビルド引数を宣言しています。 <ul><li><code>is_debug</code>: デバッグビルドかどうかを示すフラグ。<code>is_official_build</code> が <code>false</code> の場合に <code>true</code> になります。</li><li><code>is_trivial_abi</code>: Trivial ABIを使用するかどうかを示すフラグ。<code>is_official_build</code> が <code>false</code> の場合に <code>true</code> になります。この設定はSkiaのABIに影響を与え、Skiaとその依存関係で一貫して設定する必要があります。</li></ul></li></ul><h3 id="デバッグビルドと公式ビルドの矛盾チェック" tabindex="-1">デバッグビルドと公式ビルドの矛盾チェック <a class="header-anchor" href="#デバッグビルドと公式ビルドの矛盾チェック" aria-label="Permalink to &quot;デバッグビルドと公式ビルドの矛盾チェック&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>assert(!(is_debug &amp;&amp; is_official_build))</span></span></code></pre></div><ul><li><strong>説明</strong>: デバッグビルドと公式ビルドが同時に設定されていないことを確認します。両方が同時に <code>true</code> になることは許容されません。</li></ul><h3 id="webassemblyターゲットの設定" tabindex="-1">WebAssemblyターゲットの設定 <a class="header-anchor" href="#webassemblyターゲットの設定" aria-label="Permalink to &quot;WebAssemblyターゲットの設定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (target_cpu == &quot;wasm&quot;) {</span></span>
<span class="line"><span>  target_os = &quot;wasm&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <code>target_cpu</code> が <code>&quot;wasm&quot;</code> の場合、<code>target_os</code> を <code>&quot;wasm&quot;</code> に設定します。</li></ul><h3 id="プラットフォームの検出" tabindex="-1">プラットフォームの検出 <a class="header-anchor" href="#プラットフォームの検出" aria-label="Permalink to &quot;プラットフォームの検出&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (target_os == &quot;&quot;) {</span></span>
<span class="line"><span>  target_os = host_os</span></span>
<span class="line"><span>  if (ndk != &quot;&quot;) {</span></span>
<span class="line"><span>    target_os = &quot;android&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>if (current_os == &quot;&quot;) {</span></span>
<span class="line"><span>  current_os = target_os</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>target_os</code> が空の場合、<code>host_os</code> を <code>target_os</code> に設定します。</li><li>さらに、<code>ndk</code> が設定されている場合、<code>target_os</code> を <code>&quot;android&quot;</code> に設定します。</li><li><code>current_os</code> が空の場合、<code>current_os</code> を <code>target_os</code> に設定します。</li></ul></li></ul><h3 id="プラットフォームのフラグ設定" tabindex="-1">プラットフォームのフラグ設定 <a class="header-anchor" href="#プラットフォームのフラグ設定" aria-label="Permalink to &quot;プラットフォームのフラグ設定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>is_android = current_os == &quot;android&quot;</span></span>
<span class="line"><span>is_fuchsia = current_os == &quot;fuchsia&quot;</span></span>
<span class="line"><span>is_ios = current_os == &quot;ios&quot; || current_os == &quot;tvos&quot;</span></span>
<span class="line"><span>is_tvos = current_os == &quot;tvos&quot;</span></span>
<span class="line"><span>is_linux = current_os == &quot;linux&quot;</span></span>
<span class="line"><span>is_mac = current_os == &quot;mac&quot;</span></span>
<span class="line"><span>is_wasm = current_os == &quot;wasm&quot;</span></span>
<span class="line"><span>is_win = current_os == &quot;win&quot;</span></span></code></pre></div><ul><li><strong>説明</strong>: <code>current_os</code> に基づいて各プラットフォームのフラグを設定します。 <ul><li><code>is_android</code>: <code>current_os</code> が <code>&quot;android&quot;</code> の場合に <code>true</code>。</li><li><code>is_fuchsia</code>: <code>current_os</code> が <code>&quot;fuchsia&quot;</code> の場合に <code>true</code>。</li><li><code>is_ios</code>: <code>current_os</code> が <code>&quot;ios&quot;</code> または <code>&quot;tvos&quot;</code> の場合に <code>true</code>。</li><li><code>is_tvos</code>: <code>current_os</code> が <code>&quot;tvos&quot;</code> の場合に <code>true</code>。</li><li><code>is_linux</code>: <code>current_os</code> が <code>&quot;linux&quot;</code> の場合に <code>true</code>。</li><li><code>is_mac</code>: <code>current_os</code> が <code>&quot;mac&quot;</code> の場合に <code>true</code>。</li><li><code>is_wasm</code>: <code>current_os</code> が <code>&quot;wasm&quot;</code> の場合に <code>true</code>。</li><li><code>is_win</code>: <code>current_os</code> が <code>&quot;win&quot;</code> の場合に <code>true</code>。</li></ul></li></ul><h3 id="chromeosおよびappleプラットフォームの設定" tabindex="-1">ChromeOSおよびAppleプラットフォームの設定 <a class="header-anchor" href="#chromeosおよびappleプラットフォームの設定" aria-label="Permalink to &quot;ChromeOSおよびAppleプラットフォームの設定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># This is just to make the Dawn build files happy. Skia itself uses target_os = &quot;linux&quot;</span></span>
<span class="line"><span># for ChromeOS, so this variable will not affect Skia proper.</span></span>
<span class="line"><span>is_chromeos = false</span></span>
<span class="line"><span></span></span>
<span class="line"><span># This is to make the ANGLE build files happy. Skia always uses is_mac and/or is_ios.</span></span>
<span class="line"><span>is_apple = is_mac || is_ios</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>is_chromeos</code>: <code>false</code> に設定。これはDawnのビルドファイルのために存在しますが、Skia自体には影響しません。</li><li><code>is_apple</code>: <code>is_mac</code> または <code>is_ios</code> が <code>true</code> の場合に <code>true</code>。これはANGLEのビルドファイルのために存在します。</li></ul></li></ul><h3 id="ターゲットcpuの設定" tabindex="-1">ターゲットCPUの設定 <a class="header-anchor" href="#ターゲットcpuの設定" aria-label="Permalink to &quot;ターゲットCPUの設定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (target_cpu == &quot;&quot;) {</span></span>
<span class="line"><span>  target_cpu = host_cpu</span></span>
<span class="line"><span>  if (is_android || is_ios) {</span></span>
<span class="line"><span>    target_cpu = &quot;arm64&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>if (target_cpu == &quot;x86_64&quot;) {</span></span>
<span class="line"><span>  target_cpu = &quot;x64&quot;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>if (current_cpu == &quot;&quot;) {</span></span>
<span class="line"><span>  current_cpu = target_cpu</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>target_cpu</code> が空の場合、<code>host_cpu</code> を <code>target_cpu</code> に設定します。</li><li>さらに、<code>is_android</code> または <code>is_ios</code> が <code>true</code> の場合、<code>target_cpu</code> を <code>&quot;arm64&quot;</code> に設定します。</li><li><code>target_cpu</code> が <code>&quot;x86_64&quot;</code> の場合、<code>target_cpu</code> を <code>&quot;x64&quot;</code> に設定します。</li><li><code>current_cpu</code> が空の場合、<code>current_cpu</code> を <code>target_cpu</code> に設定します。</li></ul></li></ul><h3 id="clangコンパイラの判定" tabindex="-1">Clangコンパイラの判定 <a class="header-anchor" href="#clangコンパイラの判定" aria-label="Permalink to &quot;Clangコンパイラの判定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>is_clang = is_android || is_ios || is_mac || is_fuchsia || is_wasm ||</span></span>
<span class="line"><span>           (cc == &quot;clang&quot; &amp;&amp; cxx == &quot;clang++&quot;) || clang_win != &quot;&quot;</span></span>
<span class="line"><span>if (!is_clang &amp;&amp; !is_win) {</span></span>
<span class="line"><span>  is_clang = exec_script(&quot;//gn/is_clang.py&quot;,</span></span>
<span class="line"><span>                         [</span></span>
<span class="line"><span>                           cc,</span></span>
<span class="line"><span>                           cxx,</span></span>
<span class="line"><span>                         ],</span></span>
<span class="line"><span>                         &quot;value&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>is_clang</code> は、以下のいずれかの条件が満たされた場合に <code>true</code> になります: <ul><li><code>is_android</code>, <code>is_ios</code>, <code>is_mac</code>, <code>is_fuchsia</code>, <code>is_wasm</code> のいずれかが <code>true</code></li><li><code>cc</code> が <code>&quot;clang&quot;</code> で <code>cxx</code> が <code>&quot;clang++&quot;</code></li><li><code>clang_win</code> が空でない</li></ul></li><li>これらの条件に当てはまらず、かつ <code>is_win</code> でもない場合、スクリプト <code>is_clang.py</code> を実行して <code>cc</code> と <code>cxx</code> を引数に渡し、Clangコンパイラであるかを判定します。</li></ul></li></ul><h3 id="android-ndkの設定" tabindex="-1">Android NDKの設定 <a class="header-anchor" href="#android-ndkの設定" aria-label="Permalink to &quot;Android NDKの設定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (is_android) {</span></span>
<span class="line"><span>  ndk_host = &quot;&quot;</span></span>
<span class="line"><span>  ndk_target = &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (host_os == &quot;linux&quot;) {</span></span>
<span class="line"><span>    ndk_host = &quot;linux-x86_64&quot;</span></span>
<span class="line"><span>  } else if (host_os == &quot;mac&quot;) {</span></span>
<span class="line"><span>    ndk_host = &quot;darwin-x86_64&quot;</span></span>
<span class="line"><span>  } else if (host_os == &quot;win&quot;) {</span></span>
<span class="line"><span>    ndk_host = &quot;windows-x86_64&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (target_cpu == &quot;arm64&quot;) {</span></span>
<span class="line"><span>    ndk_target = &quot;aarch64-linux-android&quot;</span></span>
<span class="line"><span>  } else if (target_cpu == &quot;arm&quot;) {</span></span>
<span class="line"><span>    ndk_target = &quot;armv7a-linux-androideabi&quot;</span></span>
<span class="line"><span>  } else if (target_cpu == &quot;x64&quot;) {</span></span>
<span class="line"><span>    ndk_target = &quot;x86_64-linux-android&quot;</span></span>
<span class="line"><span>  } else if (target_cpu == &quot;x86&quot;) {</span></span>
<span class="line"><span>    ndk_target = &quot;i686-linux-android&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>is_android</code> が <code>true</code> の場合、Android NDKのホストシステムおよびターゲットシステムを設定します。</li><li><code>host_os</code> に基づいて <code>ndk_host</code> を設定します: <ul><li>Linux: <code>&quot;linux-x86_64&quot;</code></li><li>macOS: <code>&quot;darwin-x86_64&quot;</code></li><li>Windows: <code>&quot;windows-x86_64&quot;</code></li></ul></li><li><code>target_cpu</code> に基づいて <code>ndk_target</code> を設定します: <ul><li><code>arm64</code>: <code>&quot;aarch64-linux-android&quot;</code></li><li><code>arm</code>: <code>&quot;armv7a-linux-androideabi&quot;</code></li><li><code>x64</code>: <code>&quot;x86_64-linux-android&quot;</code></li><li><code>x86</code>: <code>&quot;i686-linux-android&quot;</code></li></ul></li></ul></li></ul><h3 id="windows用msvcコンパイラの検出" tabindex="-1">Windows用MSVCコンパイラの検出 <a class="header-anchor" href="#windows用msvcコンパイラの検出" aria-label="Permalink to &quot;Windows用MSVCコンパイラの検出&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (target_os == &quot;win&quot;) {</span></span>
<span class="line"><span>  # By default we look for 2017 (Enterprise, Pro, and Community), then 2015. If MSVC is installed in a</span></span>
<span class="line"><span>  # non-default location, you can set win_vc to inform us where it is.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (win_vc == &quot;&quot;) {</span></span>
<span class="line"><span>    win_vc = exec_script(&quot;//gn/find_msvc.py&quot;, [], &quot;trim string&quot;)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  assert(win_vc != &quot;&quot;)  # Could not find VC installation. Set win_vc to your VC</span></span>
<span class="line"><span>                        # directory.</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>target_os</code> が <code>&quot;win&quot;</code> の場合、MSVCコンパイラのインストール場所を検出します。</li><li>デフォルトでは、Visual Studio 2017（Enterprise、Pro、Community）の順に探し、それが見つからなければ2015を探します。MSVCがデフォルト以外の場所にインストールされている場合は、<code>win_vc</code> を設定して場所を指定できます。</li><li><code>win_vc</code> が空の場合、スクリプト <code>find_msvc.py</code> を実行してMSVCのインストール場所を取得します。</li><li><code>win_vc</code> が空でないことを確認するために <code>assert</code> を使用し、空の場合はエラーメッセージを出力します。</li></ul></li></ul><h3 id="windowsプラットフォームの設定" tabindex="-1">Windowsプラットフォームの設定 <a class="header-anchor" href="#windowsプラットフォームの設定" aria-label="Permalink to &quot;Windowsプラットフォームの設定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (target_os == &quot;win&quot;) {</span></span></code></pre></div><ul><li><strong>説明</strong>: この部分は、ターゲットOSがWindowsである場合にのみ実行される設定を含んでいます。</li></ul><h3 id="visual-studioツールチェインのバージョン設定" tabindex="-1">Visual Studioツールチェインのバージョン設定 <a class="header-anchor" href="#visual-studioツールチェインのバージョン設定" aria-label="Permalink to &quot;Visual Studioツールチェインのバージョン設定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  if (win_toolchain_version == &quot;&quot;) {</span></span>
<span class="line"><span>    win_toolchain_version = exec_script(&quot;//gn/highest_version_dir.py&quot;,</span></span>
<span class="line"><span>                                        [</span></span>
<span class="line"><span>                                          &quot;$win_vc/Tools/MSVC&quot;,</span></span>
<span class="line"><span>                                          &quot;[0-9]{2}\\.[0-9]{2}\\.[0-9]{5}&quot;,</span></span>
<span class="line"><span>                                        ],</span></span>
<span class="line"><span>                                        &quot;trim string&quot;)</span></span>
<span class="line"><span>  }</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>win_toolchain_version</code> が空の場合、スクリプト <code>highest_version_dir.py</code> を実行して、Visual Studioツールチェインのバージョンを取得します。</li><li>スクリプトには、<code>$win_vc/Tools/MSVC</code> ディレクトリと、バージョン形式を指定する正規表現 <code>[0-9]{2}\\.[0-9]{2}\\.[0-9]{5}</code> を渡します。</li><li>結果を <code>trim string</code> 形式で返し、<code>win_toolchain_version</code> に設定します。</li></ul></li></ul><h3 id="windows-sdkのバージョン設定" tabindex="-1">Windows SDKのバージョン設定 <a class="header-anchor" href="#windows-sdkのバージョン設定" aria-label="Permalink to &quot;Windows SDKのバージョン設定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  if (win_sdk_version == &quot;&quot;) {</span></span>
<span class="line"><span>    win_sdk_version = exec_script(&quot;//gn/highest_version_dir.py&quot;,</span></span>
<span class="line"><span>                                  [</span></span>
<span class="line"><span>                                    &quot;$win_sdk/Include&quot;,</span></span>
<span class="line"><span>                                    &quot;[0-9]{2}\\.[0-9]\\.[0-9]{5}\\.[0-9]&quot;,</span></span>
<span class="line"><span>                                  ],</span></span>
<span class="line"><span>                                  &quot;trim string&quot;)</span></span>
<span class="line"><span>  }</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>win_sdk_version</code> が空の場合、スクリプト <code>highest_version_dir.py</code> を実行して、Windows SDKのバージョンを取得します。</li><li>スクリプトには、<code>$win_sdk/Include</code> ディレクトリと、バージョン形式を指定する正規表現 <code>[0-9]{2}\\.[0-9]\\.[0-9]{5}\\.[0-9]</code> を渡します。</li><li>結果を <code>trim string</code> 形式で返し、<code>win_sdk_version</code> に設定します。</li></ul></li></ul><h3 id="clang-for-windowsのバージョン設定" tabindex="-1">Clang for Windowsのバージョン設定 <a class="header-anchor" href="#clang-for-windowsのバージョン設定" aria-label="Permalink to &quot;Clang for Windowsのバージョン設定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  if (clang_win != &quot;&quot; &amp;&amp; clang_win_version == &quot;&quot;) {</span></span>
<span class="line"><span>    clang_win_version = exec_script(&quot;//gn/highest_version_dir.py&quot;,</span></span>
<span class="line"><span>                                    [</span></span>
<span class="line"><span>                                      &quot;$clang_win/lib/clang&quot;,</span></span>
<span class="line"><span>                                      &quot;[0-9]+\\.[0-9]+\\.[0-9]+&quot;,</span></span>
<span class="line"><span>                                    ],</span></span>
<span class="line"><span>                                    &quot;trim string&quot;)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>clang_win</code> が空でなく、かつ <code>clang_win_version</code> が空の場合、スクリプト <code>highest_version_dir.py</code> を実行して、Clang for Windowsのバージョンを取得します。</li><li>スクリプトには、<code>$clang_win/lib/clang</code> ディレクトリと、バージョン形式を指定する正規表現 <code>[0-9]+\\.[0-9]+\\.[0-9]+</code> を渡します。</li><li>結果を <code>trim string</code> 形式で返し、<code>clang_win_version</code> に設定します。</li></ul></li></ul><h3 id="全体の流れ" tabindex="-1">全体の流れ <a class="header-anchor" href="#全体の流れ" aria-label="Permalink to &quot;全体の流れ&quot;">​</a></h3><ul><li>この設定は、Windows環境でのビルドに必要なツールチェインとSDKのバージョンを自動的に検出し、設定することを目的としています。これにより、開発者は特定のバージョンを手動で設定する手間を省くことができます。</li><li><code>highest_version_dir.py</code> スクリプトは、指定されたディレクトリ内で最も高いバージョン番号を持つサブディレクトリを検索し、その名前を返すように設計されています。</li></ul><h3 id="コンポーネントの定義" tabindex="-1">コンポーネントの定義 <a class="header-anchor" href="#コンポーネントの定義" aria-label="Permalink to &quot;コンポーネントの定義&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># A component is either a static or a shared library.</span></span>
<span class="line"><span>template(&quot;component&quot;) {</span></span>
<span class="line"><span>  _component_mode = &quot;static_library&quot;</span></span>
<span class="line"><span>  if (is_component_build) {</span></span>
<span class="line"><span>    _component_mode = &quot;shared_library&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  target(_component_mode, target_name) {</span></span>
<span class="line"><span>    forward_variables_from(invoker, &quot;*&quot;)</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>テンプレート名</strong>: <code>component</code></li><li><strong>目的</strong>: コンポーネントは静的ライブラリまたは共有ライブラリとして定義されます。</li><li><strong>条件</strong>: <code>is_component_build</code> が <code>true</code> の場合、<code>_component_mode</code> を <code>&quot;shared_library&quot;</code> に設定し、それ以外の場合は <code>&quot;static_library&quot;</code> に設定します。</li><li><strong>ターゲットの定義</strong>: <code>_component_mode</code> に基づいてターゲットを定義し、<code>invoker</code> からすべての変数を引き継ぎます。</li></ul></li></ul><h3 id="デフォルトコンフィグの定義" tabindex="-1">デフォルトコンフィグの定義 <a class="header-anchor" href="#デフォルトコンフィグの定義" aria-label="Permalink to &quot;デフォルトコンフィグの定義&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Default configs</span></span>
<span class="line"><span>default_configs = [</span></span>
<span class="line"><span>  &quot;//gn/skia:default&quot;,</span></span>
<span class="line"><span>  &quot;//gn/skia:no_exceptions&quot;,</span></span>
<span class="line"><span>  &quot;//gn/skia:no_rtti&quot;,</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>if (!is_debug) {</span></span>
<span class="line"><span>  default_configs += [</span></span>
<span class="line"><span>    &quot;//gn/skia:optimize&quot;,</span></span>
<span class="line"><span>    &quot;//gn/skia:NDEBUG&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>if (is_trivial_abi) {</span></span>
<span class="line"><span>  default_configs += [ &quot;//gn/skia:trivial_abi&quot; ]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>if (!is_official_build) {</span></span>
<span class="line"><span>  default_configs += [ &quot;//gn/skia:debug_symbols&quot; ]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>default_configs += [ &quot;//gn/skia:extra_flags&quot; ]</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>基本コンフィグ</strong>: <ul><li><code>&quot;//gn/skia:default&quot;</code></li><li><code>&quot;//gn/skia:no_exceptions&quot;</code></li><li><code>&quot;//gn/skia:no_rtti&quot;</code></li></ul></li><li><strong>追加コンフィグ</strong>: <ul><li><code>!is_debug</code> の場合: <code>&quot;//gn/skia:optimize&quot;</code> と <code>&quot;//gn/skia:NDEBUG&quot;</code></li><li><code>is_trivial_abi</code> の場合: <code>&quot;//gn/skia:trivial_abi&quot;</code></li><li><code>!is_official_build</code> の場合: <code>&quot;//gn/skia:debug_symbols&quot;</code></li></ul></li><li><strong>共通コンフィグ</strong>: <code>&quot;//gn/skia:extra_flags&quot;</code></li></ul></li></ul><h3 id="ターゲットごとのデフォルト設定" tabindex="-1">ターゲットごとのデフォルト設定 <a class="header-anchor" href="#ターゲットごとのデフォルト設定" aria-label="Permalink to &quot;ターゲットごとのデフォルト設定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>set_defaults(&quot;executable&quot;) {</span></span>
<span class="line"><span>  configs = [ &quot;//gn/skia:executable&quot; ] + default_configs</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set_defaults(&quot;source_set&quot;) {</span></span>
<span class="line"><span>  configs = default_configs</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set_defaults(&quot;static_library&quot;) {</span></span>
<span class="line"><span>  configs = default_configs</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set_defaults(&quot;shared_library&quot;) {</span></span>
<span class="line"><span>  configs = default_configs</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set_defaults(&quot;component&quot;) {</span></span>
<span class="line"><span>  configs = default_configs</span></span>
<span class="line"><span>  if (!is_component_build) {</span></span>
<span class="line"><span>    complete_static_lib = true</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong><code>executable</code> ターゲット</strong>: <ul><li><code>configs</code> に <code>&quot;//gn/skia:executable&quot;</code> と <code>default_configs</code> を設定。</li></ul></li><li><strong><code>source_set</code> ターゲット</strong>: <ul><li><code>configs</code> に <code>default_configs</code> を設定。</li></ul></li><li><strong><code>static_library</code> ターゲット</strong>: <ul><li><code>configs</code> に <code>default_configs</code> を設定。</li></ul></li><li><strong><code>shared_library</code> ターゲット</strong>: <ul><li><code>configs</code> に <code>default_configs</code> を設定。</li></ul></li><li><strong><code>component</code> ターゲット</strong>: <ul><li><code>configs</code> に <code>default_configs</code> を設定。</li><li><code>is_component_build</code> が <code>false</code> の場合、<code>complete_static_lib</code> を <code>true</code> に設定。</li></ul></li></ul></li></ul><h3 id="skiaのデフォルトコンフィグ設定" tabindex="-1">Skiaのデフォルトコンフィグ設定 <a class="header-anchor" href="#skiaのデフォルトコンフィグ設定" aria-label="Permalink to &quot;Skiaのデフォルトコンフィグ設定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>skia_target_default_configs = []</span></span>
<span class="line"><span>if (!is_official_build) {</span></span>
<span class="line"><span>  skia_target_default_configs += [ &quot;//gn/skia:warnings&quot; ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>skia_target_default_configs</code> は、Skiaのターゲットに適用されるデフォルトのビルドコンフィグのリストです。</li><li><code>is_official_build</code> が <code>false</code> の場合、デフォルトの警告設定 <code>//gn/skia:warnings</code> を追加します。</li></ul></li></ul><h3 id="skiaのヘッダ用デフォルトコンフィグ設定" tabindex="-1">Skiaのヘッダ用デフォルトコンフィグ設定 <a class="header-anchor" href="#skiaのヘッダ用デフォルトコンフィグ設定" aria-label="Permalink to &quot;Skiaのヘッダ用デフォルトコンフィグ設定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>skia_header_target_default_configs = []</span></span>
<span class="line"><span>if (!is_official_build) {</span></span>
<span class="line"><span>  skia_header_target_default_configs +=</span></span>
<span class="line"><span>      [ &quot;//gn/skia:warnings_for_public_headers&quot; ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>skia_header_target_default_configs</code> は、Skiaの公開ヘッダに適用されるデフォルトのビルドコンフィグのリストです。</li><li><code>is_official_build</code> が <code>false</code> の場合、公開ヘッダ用の警告設定 <code>//gn/skia:warnings_for_public_headers</code> を追加します。</li></ul></li></ul><h3 id="ツールチェインの設定" tabindex="-1">ツールチェインの設定 <a class="header-anchor" href="#ツールチェインの設定" aria-label="Permalink to &quot;ツールチェインの設定&quot;">​</a></h3><div class="language-gn vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gn</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (is_win) {</span></span>
<span class="line"><span>  # Windows tool chain</span></span>
<span class="line"><span>  set_default_toolchain(&quot;//gn/toolchain:msvc&quot;)</span></span>
<span class="line"><span>  default_toolchain_name = &quot;msvc&quot;</span></span>
<span class="line"><span>  host_toolchain = &quot;msvc_host&quot;</span></span>
<span class="line"><span>} else if (is_wasm) {</span></span>
<span class="line"><span>  set_default_toolchain(&quot;//gn/toolchain:wasm&quot;)</span></span>
<span class="line"><span>  default_toolchain_name = &quot;wasm&quot;</span></span>
<span class="line"><span>  host_toolchain = &quot;wasm&quot;</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>  # GCC-like toolchains, including Clang.</span></span>
<span class="line"><span>  set_default_toolchain(&quot;//gn/toolchain:gcc_like&quot;)</span></span>
<span class="line"><span>  default_toolchain_name = &quot;gcc_like&quot;</span></span>
<span class="line"><span>  host_toolchain = &quot;gcc_like_host&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>Windowsの場合</strong>（<code>is_win</code> が <code>true</code>）: <ul><li>デフォルトのツールチェインを <code>//gn/toolchain:msvc</code> に設定します。</li><li><code>default_toolchain_name</code> を <code>&quot;msvc&quot;</code> に設定します。</li><li><code>host_toolchain</code> を <code>&quot;msvc_host&quot;</code> に設定します。</li></ul></li><li><strong>WebAssemblyの場合</strong>（<code>is_wasm</code> が <code>true</code>）: <ul><li>デフォルトのツールチェインを <code>//gn/toolchain:wasm</code> に設定します。</li><li><code>default_toolchain_name</code> を <code>&quot;wasm&quot;</code> に設定します。</li><li><code>host_toolchain</code> を <code>&quot;wasm&quot;</code> に設定します。</li></ul></li><li><strong>その他のプラットフォーム</strong>: <ul><li>デフォルトのツールチェインを <code>//gn/toolchain:gcc_like</code> に設定します。</li><li><code>default_toolchain_name</code> を <code>&quot;gcc_like&quot;</code> に設定します。</li><li><code>host_toolchain</code> を <code>&quot;gcc_like_host&quot;</code> に設定します。</li></ul></li></ul></li></ul>`,73)]))}const _=a(i,[["render",l]]);export{g as __pageData,_ as default};
