import{_ as n,c as a,a2 as p,o as e}from"./chunks/framework.DzmM640o.js";const _=JSON.parse('{"title":"skia/BUILD.gn の解説","description":"","frontmatter":{},"headers":[],"relativePath":"resource/skia/skia_build_gn.md","filePath":"resource/skia/skia_build_gn.md","lastUpdated":1732376957000}'),l={name:"resource/skia/skia_build_gn.md"};function i(t,s,o,c,u,r){return e(),a("div",null,s[0]||(s[0]=[p(`<h1 id="skia-build-gn-の解説" tabindex="-1">skia/BUILD.gn の解説 <a class="header-anchor" href="#skia-build-gn-の解説" aria-label="Permalink to &quot;skia/BUILD.gn の解説&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#著作権情報とライセンス">著作権情報とライセンス</a></li><li><a href="#インポートセクション">インポートセクション</a></li><li><a href="#fuchsia-sdkのインポート">Fuchsia SDKのインポート</a></li><li><a href="#dawnライブラリのインポート">Dawnライブラリのインポート</a></li><li><a href="#カスタム設定のインポート">カスタム設定のインポート</a></li><li><a href="#ios設定のインポート">iOS設定のインポート</a></li><li><a href="#skia-public-apiの設定">Skia Public APIの設定</a></li><li><a href="#skia-private-apiの設定">Skia Private APIの設定</a></li><li><a href="#skiaライブラリの設定">Skiaライブラリの設定</a></li><li><a href="#skiaライブラリの設定をまとめたリスト">Skiaライブラリの設定をまとめたリスト</a></li><li><a href="#cpu特化のskiaコード用テンプレート">CPU特化のSkiaコード用テンプレート</a></li><li><a href="#プラットフォームの確認と最適化オプションの設定">プラットフォームの確認と最適化オプションの設定</a></li><li><a href="#haswell向けの最適化設定">Haswell向けの最適化設定</a></li><li><a href="#skylake向けの最適化設定">Skylake向けの最適化設定</a></li><li><a href="#オプション機能のテンプレート">オプション機能のテンプレート</a></li><li><a href="#androidユーティリティのオプション設定">Androidユーティリティのオプション設定</a></li><li><a href="#android用フォントマネージャーのオプション設定">Android用フォントマネージャーのオプション設定</a></li><li><a href="#カスタムフォントマネージャーのオプション設定">カスタムフォントマネージャーのオプション設定</a></li><li><a href="#カスタムディレクトリフォントマネージャーのオプション設定">カスタムディレクトリフォントマネージャーのオプション設定</a></li><li><a href="#カスタム埋め込みフォントマネージャーのオプション設定">カスタム埋め込みフォントマネージャーのオプション設定</a></li><li><a href="#カスタム空フォントマネージャーのオプション設定">カスタム空フォントマネージャーのオプション設定</a></li><li><a href="#fontconfigフォントマネージャーのオプション設定">Fontconfigフォントマネージャーのオプション設定</a></li><li><a href="#fontconfiginterfaceフォントマネージャーのオプション設定">FontConfigInterfaceフォントマネージャーのオプション設定</a></li><li><a href="#fuchsia用フォントマネージャーのオプション設定">Fuchsia用フォントマネージャーのオプション設定</a></li><li><a href="#mac用coretextフォントマネージャーのオプション設定">Mac用CoreTextフォントマネージャーのオプション設定</a></li><li><a href="#windows用フォントマネージャーのオプション設定">Windows用フォントマネージャーのオプション設定</a></li><li><a href="#windows用gdiフォントマネージャーのオプション設定">Windows用GDIフォントマネージャーのオプション設定</a></li><li><a href="#sksl-skia-shading-language-のlexファイルを生成する設定">SKSL（Skia Shading Language）のlexファイルを生成する設定</a></li><li><a href="#skslモジュールのコピー設定">SKSLモジュールのコピー設定</a></li></ul></nav><h3 id="著作権情報とライセンス" tabindex="-1">著作権情報とライセンス <a class="header-anchor" href="#著作権情報とライセンス" aria-label="Permalink to &quot;著作権情報とライセンス&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Copyright 2016 Google Inc.</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># Use of this source code is governed by a BSD-style license that can be</span></span>
<span class="line"><span># found in the LICENSE file.</span></span></code></pre></div><p>このコードブロックは、ファイルの著作権情報とライセンスの情報を示しています。</p><h3 id="インポートセクション" tabindex="-1">インポートセクション <a class="header-anchor" href="#インポートセクション" aria-label="Permalink to &quot;インポートセクション&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import(&quot;gn/flutter_defines.gni&quot;)</span></span>
<span class="line"><span>import(&quot;gn/fuchsia_defines.gni&quot;)</span></span>
<span class="line"><span>import(&quot;gn/shared_sources.gni&quot;)</span></span>
<span class="line"><span>import(&quot;gn/skia.gni&quot;)</span></span>
<span class="line"><span>import(&quot;gn/toolchain/wasm.gni&quot;)</span></span></code></pre></div><p>必要な定義や設定ファイルをインポートします。</p><h3 id="fuchsia-sdkのインポート" tabindex="-1">Fuchsia SDKのインポート <a class="header-anchor" href="#fuchsia-sdkのインポート" aria-label="Permalink to &quot;Fuchsia SDKのインポート&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (is_fuchsia) {</span></span>
<span class="line"><span>  import(&quot;//build/fuchsia/sdk.gni&quot;)</span></span>
<span class="line"><span>  import(&quot;build/fuchsia/fuchsia_download_sdk.gni&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Fuchsiaプラットフォーム向けのSDKをインポートします。</p><h3 id="dawnライブラリのインポート" tabindex="-1">Dawnライブラリのインポート <a class="header-anchor" href="#dawnライブラリのインポート" aria-label="Permalink to &quot;Dawnライブラリのインポート&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (skia_use_dawn) {</span></span>
<span class="line"><span>  import(&quot;//third_party/externals/dawn/scripts/dawn_features.gni&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Dawnライブラリを使用する場合、その定義をインポートします。</p><h3 id="カスタム設定のインポート" tabindex="-1">カスタム設定のインポート <a class="header-anchor" href="#カスタム設定のインポート" aria-label="Permalink to &quot;カスタム設定のインポート&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (defined(skia_settings)) {</span></span>
<span class="line"><span>  import(skia_settings)</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>カスタム設定が定義されている場合、それをインポートします。</p><h3 id="ios設定のインポート" tabindex="-1">iOS設定のインポート <a class="header-anchor" href="#ios設定のインポート" aria-label="Permalink to &quot;iOS設定のインポート&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import(&quot;gn/ios.gni&quot;)</span></span></code></pre></div><p>iOS向けの設定をインポートします。</p><h3 id="skia-public-apiの設定" tabindex="-1">Skia Public APIの設定 <a class="header-anchor" href="#skia-public-apiの設定" aria-label="Permalink to &quot;Skia Public APIの設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>config(&quot;skia_public&quot;) {</span></span>
<span class="line"><span>  include_dirs = [ &quot;.&quot; ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  defines = [ &quot;SK_DISABLE_LEGACY_VULKAN_MUTABLE_TEXTURE_STATE&quot; ]</span></span>
<span class="line"><span>  cflags_objcc = []</span></span>
<span class="line"><span>  if (is_component_build) {</span></span>
<span class="line"><span>    defines += [ &quot;SKIA_DLL&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (is_fuchsia || is_linux) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_R32_SHIFT=16&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_enable_flutter_defines) {</span></span>
<span class="line"><span>    defines += flutter_defines</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_enable_optimize_size) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_ENABLE_OPTIMIZE_SIZE&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_enable_precompile) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_ENABLE_PRECOMPILE&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_enable_sksl_tracing) {</span></span>
<span class="line"><span>    defines += [ &quot;SKSL_ENABLE_TRACING&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (is_fuchsia) {</span></span>
<span class="line"><span>    defines += fuchsia_defines</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (is_wasm) {</span></span>
<span class="line"><span>    defines += wasm_defines</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_gl_standard == &quot;gles&quot;) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_ASSUME_GL_ES=1&quot; ]</span></span>
<span class="line"><span>  } else if (skia_gl_standard == &quot;gl&quot;) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_ASSUME_GL=1&quot; ]</span></span>
<span class="line"><span>  } else if (skia_gl_standard == &quot;webgl&quot;) {</span></span>
<span class="line"><span>    defines += [</span></span>
<span class="line"><span>      &quot;SK_ASSUME_WEBGL=1&quot;,</span></span>
<span class="line"><span>      &quot;SK_USE_WEBGL&quot;,</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_enable_ganesh) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_GANESH&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_enable_graphite) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_GRAPHITE&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_disable_tracing) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_DISABLE_TRACING&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_use_perfetto) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_USE_PERFETTO&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_use_safe_libcxx) {</span></span>
<span class="line"><span>    defines += [ &quot;_LIBCPP_ENABLE_ASSERTIONS=1&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (is_mac || is_ios) {</span></span>
<span class="line"><span>    if (skia_enable_api_available_macro) {</span></span>
<span class="line"><span>      defines += [ &quot;SK_ENABLE_API_AVAILABLE&quot; ]</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      cflags_objcc += [ &quot;-Wno-unguarded-availability&quot; ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>SkiaのパブリックAPIに関連する設定を定義します。様々なプラットフォームや機能に応じてコンパイルオプションや定義を追加しています。</p><h3 id="skia-private-apiの設定" tabindex="-1">Skia Private APIの設定 <a class="header-anchor" href="#skia-private-apiの設定" aria-label="Permalink to &quot;Skia Private APIの設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>config(&quot;skia_private&quot;) {</span></span>
<span class="line"><span>  visibility = [ &quot;./*&quot; ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  defines = [ &quot;SK_GAMMA_APPLY_TO_A8&quot; ]</span></span>
<span class="line"><span>  if (skia_use_fixed_gamma_text) {</span></span>
<span class="line"><span>    defines += [</span></span>
<span class="line"><span>      &quot;SK_GAMMA_EXPONENT=1.4&quot;,</span></span>
<span class="line"><span>      &quot;SK_GAMMA_CONTRAST=0.0&quot;,</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (is_skia_dev_build &amp;&amp; !is_wasm) {</span></span>
<span class="line"><span>    defines += [</span></span>
<span class="line"><span>      &quot;SK_ALLOW_STATIC_GLOBAL_INITIALIZERS=1&quot;,</span></span>
<span class="line"><span>      &quot;GR_TEST_UTILS=1&quot;,</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>    if (skia_enable_graphite) {</span></span>
<span class="line"><span>      defines += [ &quot;GRAPHITE_TEST_UTILS=1&quot; ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  libs = []</span></span>
<span class="line"><span>  lib_dirs = []</span></span>
<span class="line"><span>  if (skia_use_gl &amp;&amp; skia_use_angle) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_ANGLE&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_use_vma) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_USE_VMA&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_enable_winuwp) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_WINUWP&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_print_sksl_shaders) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_PRINT_SKSL_SHADERS&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (skia_print_native_shaders) {</span></span>
<span class="line"><span>    defines += [ &quot;SK_PRINT_NATIVE_SHADERS&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  defines += [ &quot;SK_ENABLE_AVX512_OPTS&quot; ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Skiaの内部APIに関連する設定を定義します。開発ビルドや特定の機能に応じた定義を追加しています。</p><h3 id="skiaライブラリの設定" tabindex="-1">Skiaライブラリの設定 <a class="header-anchor" href="#skiaライブラリの設定" aria-label="Permalink to &quot;Skiaライブラリの設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>config(&quot;skia_library&quot;) {</span></span>
<span class="line"><span>  visibility = [ &quot;./*&quot; ]</span></span>
<span class="line"><span>  defines = [ &quot;SKIA_IMPLEMENTATION=1&quot; ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>Skiaライブラリに関連する設定を定義します。</p><h3 id="skiaライブラリの設定をまとめたリスト" tabindex="-1">Skiaライブラリの設定をまとめたリスト <a class="header-anchor" href="#skiaライブラリの設定をまとめたリスト" aria-label="Permalink to &quot;Skiaライブラリの設定をまとめたリスト&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>skia_library_configs = [</span></span>
<span class="line"><span>  &quot;:skia_public&quot;,</span></span>
<span class="line"><span>  &quot;:skia_private&quot;,</span></span>
<span class="line"><span>  &quot;:skia_library&quot;,</span></span>
<span class="line"><span>]</span></span></code></pre></div><p>Skiaライブラリの設定を一つのリストにまとめています。</p><h3 id="cpu特化のskiaコード用テンプレート" tabindex="-1">CPU特化のSkiaコード用テンプレート <a class="header-anchor" href="#cpu特化のskiaコード用テンプレート" aria-label="Permalink to &quot;CPU特化のSkiaコード用テンプレート&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>template(&quot;opts&quot;) {</span></span>
<span class="line"><span>  if (invoker.enabled) {</span></span>
<span class="line"><span>    skia_source_set(target_name) {</span></span>
<span class="line"><span>      visibility = [ &quot;:*&quot; ]</span></span>
<span class="line"><span>      check_includes = false</span></span>
<span class="line"><span>      configs = skia_library_configs</span></span>
<span class="line"><span>      forward_variables_from(invoker, &quot;*&quot;)</span></span>
<span class="line"><span>      if (defined(invoker.configs)) {</span></span>
<span class="line"><span>        configs += invoker.configs</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    skia_source_set(target_name) {</span></span>
<span class="line"><span>      visibility = [ &quot;:*&quot; ]</span></span>
<span class="line"><span>      check_includes = false</span></span>
<span class="line"><span>      forward_variables_from(invoker,</span></span>
<span class="line"><span>                             &quot;*&quot;,</span></span>
<span class="line"><span>                             [</span></span>
<span class="line"><span>                               &quot;sources&quot;,</span></span>
<span class="line"><span>                               &quot;cflags&quot;,</span></span>
<span class="line"><span>                             ])</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>CPU特化のSkiaコードをビルドするためのテンプレートを定義します。有効化されている場合、特定の設定を適用し、無効化されている場合は空のターゲットを作成します。</p><h3 id="プラットフォームの確認と最適化オプションの設定" tabindex="-1">プラットフォームの確認と最適化オプションの設定 <a class="header-anchor" href="#プラットフォームの確認と最適化オプションの設定" aria-label="Permalink to &quot;プラットフォームの確認と最適化オプションの設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>is_x86 = current_cpu == &quot;x64&quot; || current_cpu == &quot;x86&quot;</span></span></code></pre></div><p><code>is_x86</code>変数は、現在のCPUアーキテクチャがx64またはx86であるかどうかを確認しています。</p><h3 id="haswell向けの最適化設定" tabindex="-1">Haswell向けの最適化設定 <a class="header-anchor" href="#haswell向けの最適化設定" aria-label="Permalink to &quot;Haswell向けの最適化設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>opts(&quot;hsw&quot;) {</span></span>
<span class="line"><span>  enabled = is_x86</span></span>
<span class="line"><span>  sources = skia_opts.hsw_sources</span></span>
<span class="line"><span>  if (is_win) {</span></span>
<span class="line"><span>    cflags = [ &quot;/arch:AVX2&quot; ]</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    cflags = [ &quot;-march=haswell&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このブロックは、Haswellアーキテクチャ向けの最適化設定を定義しています。x86アーキテクチャの場合、有効化されます。Windowsプラットフォームでは<code>/arch:AVX2</code>、それ以外のプラットフォームでは<code>-march=haswell</code>フラグを使用します。</p><h3 id="skylake向けの最適化設定" tabindex="-1">Skylake向けの最適化設定 <a class="header-anchor" href="#skylake向けの最適化設定" aria-label="Permalink to &quot;Skylake向けの最適化設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>opts(&quot;skx&quot;) {</span></span>
<span class="line"><span>  enabled = is_x86</span></span>
<span class="line"><span>  sources = skia_opts.skx_sources</span></span>
<span class="line"><span>  if (is_win) {</span></span>
<span class="line"><span>    cflags = [ &quot;/arch:AVX512&quot; ]</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    cflags = [ &quot;-march=skylake-avx512&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このブロックは、Skylakeアーキテクチャ向けの最適化設定を定義しています。x86アーキテクチャの場合、有効化されます。Windowsプラットフォームでは<code>/arch:AVX512</code>、それ以外のプラットフォームでは<code>-march=skylake-avx512</code>フラグを使用します。</p><h3 id="オプション機能のテンプレート" tabindex="-1">オプション機能のテンプレート <a class="header-anchor" href="#オプション機能のテンプレート" aria-label="Permalink to &quot;オプション機能のテンプレート&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>template(&quot;optional&quot;) {</span></span>
<span class="line"><span>  if (invoker.enabled) {</span></span>
<span class="line"><span>    config(target_name + &quot;_public&quot;) {</span></span>
<span class="line"><span>      if (defined(invoker.public_defines)) {</span></span>
<span class="line"><span>        defines = invoker.public_defines</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      if (defined(invoker.public_configs)) {</span></span>
<span class="line"><span>        configs = invoker.public_configs</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      if (defined(invoker.public_include_dirs)) {</span></span>
<span class="line"><span>        include_dirs = invoker.public_include_dirs</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    skia_source_set(target_name) {</span></span>
<span class="line"><span>      visibility = [ &quot;:*&quot; ]</span></span>
<span class="line"><span>      check_includes = false</span></span>
<span class="line"><span>      configs = skia_library_configs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      forward_variables_from(invoker,</span></span>
<span class="line"><span>                             &quot;*&quot;,</span></span>
<span class="line"><span>                             [</span></span>
<span class="line"><span>                               &quot;configs&quot;,</span></span>
<span class="line"><span>                               &quot;public_defines&quot;,</span></span>
<span class="line"><span>                               &quot;sources_for_tests&quot;,</span></span>
<span class="line"><span>                               &quot;sources_when_disabled&quot;,</span></span>
<span class="line"><span>                             ])</span></span>
<span class="line"><span>      if (defined(invoker.configs)) {</span></span>
<span class="line"><span>        configs += invoker.configs</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      all_dependent_configs = [ &quot;:&quot; + target_name + &quot;_public&quot; ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (defined(invoker.sources_for_tests) &amp;&amp; skia_enable_tools) {</span></span>
<span class="line"><span>      skia_source_set(target_name + &quot;_tests&quot;) {</span></span>
<span class="line"><span>        visibility = [ &quot;:*&quot; ]</span></span>
<span class="line"><span>        check_includes = false</span></span>
<span class="line"><span>        configs = skia_library_configs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        forward_variables_from(invoker,</span></span>
<span class="line"><span>                               &quot;*&quot;,</span></span>
<span class="line"><span>                               [</span></span>
<span class="line"><span>                                 &quot;configs&quot;,</span></span>
<span class="line"><span>                                 &quot;public_defines&quot;,</span></span>
<span class="line"><span>                                 &quot;sources&quot;,</span></span>
<span class="line"><span>                                 &quot;sources_for_tests&quot;,</span></span>
<span class="line"><span>                                 &quot;sources_when_disabled&quot;,</span></span>
<span class="line"><span>                               ])</span></span>
<span class="line"><span>        if (defined(invoker.configs)) {</span></span>
<span class="line"><span>          configs += invoker.configs</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        testonly = true</span></span>
<span class="line"><span>        sources = invoker.sources_for_tests</span></span>
<span class="line"><span>        if (!defined(deps)) {</span></span>
<span class="line"><span>          deps = []</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        deps += [ &quot;:test&quot; ]</span></span>
<span class="line"><span>        all_dependent_configs = [ &quot;:&quot; + target_name + &quot;_public&quot; ]</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    skia_source_set(target_name) {</span></span>
<span class="line"><span>      visibility = [ &quot;:*&quot; ]</span></span>
<span class="line"><span>      configs = skia_library_configs</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      forward_variables_from(invoker,</span></span>
<span class="line"><span>                             &quot;*&quot;,</span></span>
<span class="line"><span>                             [</span></span>
<span class="line"><span>                               &quot;configs&quot;,</span></span>
<span class="line"><span>                               &quot;public&quot;,</span></span>
<span class="line"><span>                               &quot;public_defines&quot;,</span></span>
<span class="line"><span>                               &quot;public_deps&quot;,</span></span>
<span class="line"><span>                               &quot;deps&quot;,</span></span>
<span class="line"><span>                               &quot;libs&quot;,</span></span>
<span class="line"><span>                               &quot;frameworks&quot;,</span></span>
<span class="line"><span>                               &quot;sources&quot;,</span></span>
<span class="line"><span>                               &quot;sources_for_tests&quot;,</span></span>
<span class="line"><span>                               &quot;sources_when_disabled&quot;,</span></span>
<span class="line"><span>                             ])</span></span>
<span class="line"><span>      if (defined(invoker.configs)) {</span></span>
<span class="line"><span>        configs += invoker.configs</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      if (defined(invoker.sources_when_disabled)) {</span></span>
<span class="line"><span>        sources = invoker.sources_when_disabled</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    if (defined(invoker.sources_for_tests)) {</span></span>
<span class="line"><span>      skia_source_set(target_name + &quot;_tests&quot;) {</span></span>
<span class="line"><span>        visibility = [ &quot;:*&quot; ]</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このテンプレートは、Skiaのオプション機能を定義するためのものです。<code>enabled</code>が有効である場合、公開設定やソースセットを定義し、テスト用のソースセットも設定します。<code>enabled</code>が無効である場合、空のターゲットを作成し、必要な変数を転送します。</p><h3 id="androidユーティリティのオプション設定" tabindex="-1">Androidユーティリティのオプション設定 <a class="header-anchor" href="#androidユーティリティのオプション設定" aria-label="Permalink to &quot;Androidユーティリティのオプション設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>optional(&quot;android_utils&quot;) {</span></span>
<span class="line"><span>  enabled = skia_enable_android_utils</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  public = [</span></span>
<span class="line"><span>    &quot;client_utils/android/BRDAllocator.h&quot;,</span></span>
<span class="line"><span>    &quot;client_utils/android/BitmapRegionDecoder.h&quot;,</span></span>
<span class="line"><span>    &quot;client_utils/android/FrontBufferedStream.h&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  public_defines = [ &quot;SK_ENABLE_ANDROID_UTILS&quot; ]</span></span>
<span class="line"><span>  sources = [</span></span>
<span class="line"><span>    &quot;client_utils/android/BitmapRegionDecoder.cpp&quot;,</span></span>
<span class="line"><span>    &quot;client_utils/android/FrontBufferedStream.cpp&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このブロックは、Android向けのユーティリティ機能をオプションとして定義しています。<code>skia_enable_android_utils</code>が有効である場合、Androidユーティリティ関連のヘッダーファイルやソースファイルを公開し、<code>SK_ENABLE_ANDROID_UTILS</code>定義を追加します。</p><h3 id="android用フォントマネージャーのオプション設定" tabindex="-1">Android用フォントマネージャーのオプション設定 <a class="header-anchor" href="#android用フォントマネージャーのオプション設定" aria-label="Permalink to &quot;Android用フォントマネージャーのオプション設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>optional(&quot;fontmgr_android&quot;) {</span></span>
<span class="line"><span>  enabled = skia_enable_fontmgr_android</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  deps = [</span></span>
<span class="line"><span>    &quot;:typeface_freetype&quot;,</span></span>
<span class="line"><span>    &quot;//third_party/expat&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  public_defines = [ &quot;SK_FONTMGR_ANDROID_AVAILABLE&quot; ]</span></span>
<span class="line"><span>  public = [ &quot;include/ports/SkFontMgr_android.h&quot; ]</span></span>
<span class="line"><span>  sources = [</span></span>
<span class="line"><span>    &quot;src/ports/SkFontMgr_android.cpp&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkFontMgr_android_parser.cpp&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkFontMgr_android_parser.h&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  sources_for_tests = [ &quot;tests/FontMgrAndroidParserTest.cpp&quot; ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このオプションは、Android用のフォントマネージャーを有効化します。必要な依存関係として、FreeTypeとexpatライブラリが指定されています。関連するヘッダーファイルやソースファイルが定義され、テスト用のソースファイルも含まれています。</p><h3 id="カスタムフォントマネージャーのオプション設定" tabindex="-1">カスタムフォントマネージャーのオプション設定 <a class="header-anchor" href="#カスタムフォントマネージャーのオプション設定" aria-label="Permalink to &quot;カスタムフォントマネージャーのオプション設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>optional(&quot;fontmgr_custom&quot;) {</span></span>
<span class="line"><span>  enabled =</span></span>
<span class="line"><span>      skia_enable_fontmgr_custom_directory ||</span></span>
<span class="line"><span>      skia_enable_fontmgr_custom_embedded || skia_enable_fontmgr_custom_empty</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  deps = [ &quot;:typeface_freetype&quot; ]</span></span>
<span class="line"><span>  public = [ &quot;src/ports/SkFontMgr_custom.h&quot; ]</span></span>
<span class="line"><span>  sources = [ &quot;src/ports/SkFontMgr_custom.cpp&quot; ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このオプションは、カスタムフォントマネージャーを有効化します。ディレクトリ、埋め込み、空のいずれかのカスタムフォントマネージャーが有効な場合に適用されます。依存関係としてFreeTypeライブラリが指定されています。</p><h3 id="カスタムディレクトリフォントマネージャーのオプション設定" tabindex="-1">カスタムディレクトリフォントマネージャーのオプション設定 <a class="header-anchor" href="#カスタムディレクトリフォントマネージャーのオプション設定" aria-label="Permalink to &quot;カスタムディレクトリフォントマネージャーのオプション設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>optional(&quot;fontmgr_custom_directory&quot;) {</span></span>
<span class="line"><span>  enabled = skia_enable_fontmgr_custom_directory</span></span>
<span class="line"><span>  public_defines = [ &quot;SK_FONTMGR_FREETYPE_DIRECTORY_AVAILABLE&quot; ]</span></span>
<span class="line"><span>  deps = [</span></span>
<span class="line"><span>    &quot;:fontmgr_custom&quot;,</span></span>
<span class="line"><span>    &quot;:typeface_freetype&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  public = [ &quot;include/ports/SkFontMgr_directory.h&quot; ]</span></span>
<span class="line"><span>  sources = [ &quot;src/ports/SkFontMgr_custom_directory.cpp&quot; ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このオプションは、カスタムディレクトリフォントマネージャーを有効化します。関連するヘッダーファイルとソースファイルが定義されています。</p><h3 id="カスタム埋め込みフォントマネージャーのオプション設定" tabindex="-1">カスタム埋め込みフォントマネージャーのオプション設定 <a class="header-anchor" href="#カスタム埋め込みフォントマネージャーのオプション設定" aria-label="Permalink to &quot;カスタム埋め込みフォントマネージャーのオプション設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>optional(&quot;fontmgr_custom_embedded&quot;) {</span></span>
<span class="line"><span>  enabled = skia_enable_fontmgr_custom_embedded</span></span>
<span class="line"><span>  public_defines = [ &quot;SK_FONTMGR_FREETYPE_EMBEDDED_AVAILABLE&quot; ]</span></span>
<span class="line"><span>  deps = [</span></span>
<span class="line"><span>    &quot;:fontmgr_custom&quot;,</span></span>
<span class="line"><span>    &quot;:typeface_freetype&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  sources = [ &quot;src/ports/SkFontMgr_custom_embedded.cpp&quot; ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このオプションは、カスタム埋め込みフォントマネージャーを有効化します。関連するソースファイルが定義されています。</p><h3 id="カスタム空フォントマネージャーのオプション設定" tabindex="-1">カスタム空フォントマネージャーのオプション設定 <a class="header-anchor" href="#カスタム空フォントマネージャーのオプション設定" aria-label="Permalink to &quot;カスタム空フォントマネージャーのオプション設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>optional(&quot;fontmgr_custom_empty&quot;) {</span></span>
<span class="line"><span>  enabled = skia_enable_fontmgr_custom_empty</span></span>
<span class="line"><span>  public_defines = [ &quot;SK_FONTMGR_FREETYPE_EMPTY_AVAILABLE&quot; ]</span></span>
<span class="line"><span>  deps = [</span></span>
<span class="line"><span>    &quot;:fontmgr_custom&quot;,</span></span>
<span class="line"><span>    &quot;:typeface_freetype&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  public = [ &quot;include/ports/SkFontMgr_empty.h&quot; ]</span></span>
<span class="line"><span>  sources = [ &quot;src/ports/SkFontMgr_custom_empty.cpp&quot; ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このオプションは、カスタム空フォントマネージャーを有効化します。関連するヘッダーファイルとソースファイルが定義されています。</p><h3 id="fontconfigフォントマネージャーのオプション設定" tabindex="-1">Fontconfigフォントマネージャーのオプション設定 <a class="header-anchor" href="#fontconfigフォントマネージャーのオプション設定" aria-label="Permalink to &quot;Fontconfigフォントマネージャーのオプション設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>optional(&quot;fontmgr_fontconfig&quot;) {</span></span>
<span class="line"><span>  enabled = skia_enable_fontmgr_fontconfig</span></span>
<span class="line"><span>  public_defines = [ &quot;SK_FONTMGR_FONTCONFIG_AVAILABLE&quot; ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  public_deps = [ &quot;//third_party:fontconfig&quot; ]</span></span>
<span class="line"><span>  public = [ &quot;include/ports/SkFontMgr_fontconfig.h&quot; ]</span></span>
<span class="line"><span>  deps = [ &quot;:typeface_freetype&quot; ]</span></span>
<span class="line"><span>  sources = [ &quot;src/ports/SkFontMgr_fontconfig.cpp&quot; ]</span></span>
<span class="line"><span>  sources_for_tests = [ &quot;tests/FontMgrFontConfigTest.cpp&quot; ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このオプションは、Fontconfigフォントマネージャーを有効化します。Fontconfigライブラリに依存しており、関連するヘッダーファイル、ソースファイル、テストファイルが定義されています。</p><h3 id="fontconfiginterfaceフォントマネージャーのオプション設定" tabindex="-1">FontConfigInterfaceフォントマネージャーのオプション設定 <a class="header-anchor" href="#fontconfiginterfaceフォントマネージャーのオプション設定" aria-label="Permalink to &quot;FontConfigInterfaceフォントマネージャーのオプション設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>optional(&quot;fontmgr_FontConfigInterface&quot;) {</span></span>
<span class="line"><span>  enabled = skia_enable_fontmgr_FontConfigInterface</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  deps = [</span></span>
<span class="line"><span>    &quot;:typeface_freetype&quot;,</span></span>
<span class="line"><span>    &quot;//third_party:fontconfig&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  public = [</span></span>
<span class="line"><span>    &quot;include/ports/SkFontConfigInterface.h&quot;,</span></span>
<span class="line"><span>    &quot;include/ports/SkFontMgr_FontConfigInterface.h&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  sources = [</span></span>
<span class="line"><span>    &quot;src/ports/SkFontConfigInterface.cpp&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkFontConfigInterface_direct.cpp&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkFontConfigInterface_direct_factory.cpp&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkFontConfigTypeface.h&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkFontMgr_FontConfigInterface.cpp&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  sources_for_tests = [ &quot;tests/FCITest.cpp&quot; ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このオプションは、FontConfigInterfaceフォントマネージャーを有効化します。Fontconfigライブラリに依存しており、関連するヘッダーファイル、ソースファイル、テストファイルが定義されています。</p><h3 id="fuchsia用フォントマネージャーのオプション設定" tabindex="-1">Fuchsia用フォントマネージャーのオプション設定 <a class="header-anchor" href="#fuchsia用フォントマネージャーのオプション設定" aria-label="Permalink to &quot;Fuchsia用フォントマネージャーのオプション設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>optional(&quot;fontmgr_fuchsia&quot;) {</span></span>
<span class="line"><span>  enabled = skia_enable_fontmgr_fuchsia</span></span>
<span class="line"><span>  public_defines = [ &quot;SK_FONTMGR_FUCHSIA_AVAILABLE&quot; ]</span></span>
<span class="line"><span>  deps = []</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (is_fuchsia &amp;&amp; using_fuchsia_sdk) {</span></span>
<span class="line"><span>    deps += [ &quot;//build/fuchsia/fidl:fuchsia.fonts&quot; ]</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    deps = [ &quot;//sdk/fidl/fuchsia.fonts&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  public = [ &quot;src/ports/SkFontMgr_fuchsia.h&quot; ]</span></span>
<span class="line"><span>  sources = [ &quot;src/ports/SkFontMgr_fuchsia.cpp&quot; ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このオプションは、Fuchsia用のフォントマネージャーを有効化します。Fuchsia SDKに依存しており、関連するヘッダーファイルとソースファイルが定義されています。</p><h3 id="mac用coretextフォントマネージャーのオプション設定" tabindex="-1">Mac用CoreTextフォントマネージャーのオプション設定 <a class="header-anchor" href="#mac用coretextフォントマネージャーのオプション設定" aria-label="Permalink to &quot;Mac用CoreTextフォントマネージャーのオプション設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>optional(&quot;fontmgr_mac_ct&quot;) {</span></span>
<span class="line"><span>  enabled = skia_use_fonthost_mac</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  public_defines = [</span></span>
<span class="line"><span>    &quot;SK_TYPEFACE_FACTORY_CORETEXT&quot;,</span></span>
<span class="line"><span>    &quot;SK_FONTMGR_CORETEXT_AVAILABLE&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  public = [</span></span>
<span class="line"><span>    &quot;include/ports/SkFontMgr_mac_ct.h&quot;,</span></span>
<span class="line"><span>    &quot;include/ports/SkTypeface_mac.h&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  sources = [</span></span>
<span class="line"><span>    &quot;src/ports/SkFontMgr_mac_ct.cpp&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkScalerContext_mac_ct.cpp&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkScalerContext_mac_ct.h&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkTypeface_mac_ct.cpp&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkTypeface_mac_ct.h&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  sources_for_tests = [ &quot;tests/TypefaceMacTest.cpp&quot; ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (is_mac) {</span></span>
<span class="line"><span>    frameworks = [</span></span>
<span class="line"><span>      &quot;AppKit.framework&quot;,</span></span>
<span class="line"><span>      &quot;ApplicationServices.framework&quot;,</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  if (is_ios) {</span></span>
<span class="line"><span>    frameworks = [</span></span>
<span class="line"><span>      &quot;CoreFoundation.framework&quot;,</span></span>
<span class="line"><span>      &quot;CoreGraphics.framework&quot;,</span></span>
<span class="line"><span>      &quot;CoreText.framework&quot;,</span></span>
<span class="line"><span>      &quot;UIKit.framework&quot;,</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このオプションは、Mac用のCoreTextフォントマネージャーを有効化します。関連するフレームワーク、ヘッダーファイル、ソースファイル、テストファイルが定義されています。MacおよびiOSプラットフォーム向けの特定のフレームワークが追加されています。</p><p>このSkiaのBUILD.gnファイルのコードは、Windows用のフォントマネージャー機能や、SKSL（Skia Shading Language）関連の設定を定義しています。以下に、このコードの日本語での解説を行います。</p><h3 id="windows用フォントマネージャーのオプション設定" tabindex="-1">Windows用フォントマネージャーのオプション設定 <a class="header-anchor" href="#windows用フォントマネージャーのオプション設定" aria-label="Permalink to &quot;Windows用フォントマネージャーのオプション設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>optional(&quot;fontmgr_win&quot;) {</span></span>
<span class="line"><span>  enabled = skia_enable_fontmgr_win</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  public_defines = [</span></span>
<span class="line"><span>    &quot;SK_TYPEFACE_FACTORY_DIRECTWRITE&quot;,</span></span>
<span class="line"><span>    &quot;SK_FONTMGR_DIRECTWRITE_AVAILABLE&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  public = [ &quot;include/ports/SkTypeface_win.h&quot; ]</span></span>
<span class="line"><span>  sources = [</span></span>
<span class="line"><span>    &quot;include/ports/SkFontMgr_indirect.h&quot;,</span></span>
<span class="line"><span>    &quot;include/ports/SkRemotableFontMgr.h&quot;,</span></span>
<span class="line"><span>    &quot;src/fonts/SkFontMgr_indirect.cpp&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkFontMgr_win_dw.cpp&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkScalerContext_win_dw.cpp&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkScalerContext_win_dw.h&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkTypeface_win_dw.cpp&quot;,</span></span>
<span class="line"><span>    &quot;src/ports/SkTypeface_win_dw.h&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  if (skia_dwritecore_sdk != &quot;&quot;) {</span></span>
<span class="line"><span>    defines = [ &quot;DWRITE_CORE&quot; ]</span></span>
<span class="line"><span>    if (is_win &amp;&amp; is_clang) {</span></span>
<span class="line"><span>      cflags = [</span></span>
<span class="line"><span>        &quot;-imsvc&quot;,</span></span>
<span class="line"><span>        &quot;\${skia_dwritecore_sdk}/include&quot;,</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      include_dirs = [ &quot;\${skia_dwritecore_sdk}/include&quot; ]</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このオプションは、Windows用のフォントマネージャーを有効化します。<code>skia_enable_fontmgr_win</code>が有効である場合に適用されます。DirectWriteを使用するための定義が追加され、関連するヘッダーファイルとソースファイルが指定されています。また、<code>skia_dwritecore_sdk</code>が指定されている場合、追加のインクルードディレクトリやコンパイルフラグが設定されます。</p><h3 id="windows用gdiフォントマネージャーのオプション設定" tabindex="-1">Windows用GDIフォントマネージャーのオプション設定 <a class="header-anchor" href="#windows用gdiフォントマネージャーのオプション設定" aria-label="Permalink to &quot;Windows用GDIフォントマネージャーのオプション設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>optional(&quot;fontmgr_win_gdi&quot;) {</span></span>
<span class="line"><span>  enabled = skia_enable_fontmgr_win_gdi</span></span>
<span class="line"><span>  public_defines = [ &quot;SK_FONTMGR_GDI_AVAILABLE&quot; ]</span></span>
<span class="line"><span>  public = [ &quot;include/ports/SkTypeface_win.h&quot; ]</span></span>
<span class="line"><span>  sources = [ &quot;src/ports/SkFontHost_win.cpp&quot; ]</span></span>
<span class="line"><span>  libs = [ &quot;Gdi32.lib&quot; ]</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このオプションは、Windows用のGDIフォントマネージャーを有効化します。<code>skia_enable_fontmgr_win_gdi</code>が有効である場合に適用され、GDI関連のヘッダーファイル、ソースファイル、ライブラリが指定されています。</p><h3 id="sksl-skia-shading-language-のlexファイルを生成する設定" tabindex="-1">SKSL（Skia Shading Language）のlexファイルを生成する設定 <a class="header-anchor" href="#sksl-skia-shading-language-のlexファイルを生成する設定" aria-label="Permalink to &quot;SKSL（Skia Shading Language）のlexファイルを生成する設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (skia_lex) {</span></span>
<span class="line"><span>  skia_executable(&quot;sksllex&quot;) {</span></span>
<span class="line"><span>    sources = [</span></span>
<span class="line"><span>      &quot;src/sksl/lex/DFA.h&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/lex/DFAState.h&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/lex/LexUtil.h&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/lex/Main.cpp&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/lex/NFA.cpp&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/lex/NFA.h&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/lex/NFAState.h&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/lex/NFAtoDFA.h&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/lex/RegexNode.cpp&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/lex/RegexNode.h&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/lex/RegexParser.cpp&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/lex/RegexParser.h&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/lex/TransitionTable.cpp&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/lex/TransitionTable.h&quot;,</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>    include_dirs = [ &quot;.&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  action(&quot;run_sksllex&quot;) {</span></span>
<span class="line"><span>    script = &quot;gn/run_sksllex.py&quot;</span></span>
<span class="line"><span>    deps = [ &quot;:sksllex(//gn/toolchain:$host_toolchain)&quot; ]</span></span>
<span class="line"><span>    sources = [ &quot;src/sksl/lex/sksl.lex&quot; ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    outputs = [</span></span>
<span class="line"><span>      &quot;$target_out_dir/&quot; + rebase_path(&quot;src/sksl/SkSLLexer.h&quot;, target_out_dir),</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>    sksllex_path = &quot;$root_out_dir/&quot;</span></span>
<span class="line"><span>    sksllex_path += &quot;sksllex&quot;</span></span>
<span class="line"><span>    if (host_os == &quot;win&quot;) {</span></span>
<span class="line"><span>      sksllex_path += &quot;.exe&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    args = [</span></span>
<span class="line"><span>      rebase_path(sksllex_path),</span></span>
<span class="line"><span>      rebase_path(&quot;bin/clang-format&quot;),</span></span>
<span class="line"><span>      rebase_path(&quot;bin/fetch-clang-format&quot;),</span></span>
<span class="line"><span>      rebase_path(&quot;src&quot;),</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>  group(&quot;run_sksllex&quot;) {</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このブロックは、<code>skia_lex</code>が有効な場合、SKSLのlexファイルを生成するための設定を行います。<code>sksllex</code>という実行可能ファイルを生成し、<code>run_sksllex.py</code>スクリプトを実行してlexファイルを生成します。生成されたヘッダーファイルの出力先も指定されています。</p><h3 id="skslモジュールのコピー設定" tabindex="-1">SKSLモジュールのコピー設定 <a class="header-anchor" href="#skslモジュールのコピー設定" aria-label="Permalink to &quot;SKSLモジュールのコピー設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (skia_compile_modules || skia_compile_sksl_tests) {</span></span>
<span class="line"><span>  copy(&quot;sksl_modules&quot;) {</span></span>
<span class="line"><span>    sources = [</span></span>
<span class="line"><span>      &quot;src/sksl/sksl_compute.sksl&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/sksl_frag.sksl&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/sksl_gpu.sksl&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/sksl_graphite_frag.sksl&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/sksl_graphite_frag_es2.sksl&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/sksl_graphite_vert.sksl&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/sksl_graphite_vert_es2.sksl&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/sksl_public.sksl&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/sksl_rt_shader.sksl&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/sksl_shared.sksl&quot;,</span></span>
<span class="line"><span>      &quot;src/sksl/sksl_vert.sksl&quot;,</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>    skslc_dir = &quot;$root_out_dir/&quot;</span></span>
<span class="line"><span>    if (host_toolchain != default_toolchain_name) {</span></span>
<span class="line"><span>      skslc_dir += &quot;$host_toolchain/&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    outputs = [ &quot;$skslc_dir/{{source_file_part}}&quot; ]</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>このブロックは、<code>skia_compile_modules</code>または<code>skia_compile_sksl_tests</code>が有効な場合、SKSLモジュールのソースファイルを指定のディレクトリにコピーする設定を行います。コピー元のソースファイルとコピー先のディレクトリが定義されています。</p><p>571行まで</p>`,91)]))}const q=n(l,[["render",i]]);export{_ as __pageData,q as default};
