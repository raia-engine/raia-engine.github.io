import{_ as e,c as t,a2 as p,j as n,a,t as o,o as i}from"./chunks/framework.CKGreiRV.js";const m=JSON.parse('{"title":"skia/gn/toolchain/BUILD.gn の解説","description":"","frontmatter":{},"headers":[],"relativePath":"resource/skia/skia_gn_toolchain_build_gn.md","filePath":"resource/skia/skia_gn_toolchain_build_gn.md","lastUpdated":1732376957000}'),c={name:"resource/skia/skia_gn_toolchain_build_gn.md"};function u(l,s,d,r,g,h){return i(),t("div",null,[s[97]||(s[97]=p(`<h1 id="skia-gn-toolchain-build-gn-の解説" tabindex="-1">skia/gn/toolchain/BUILD.gn の解説 <a class="header-anchor" href="#skia-gn-toolchain-build-gn-の解説" aria-label="Permalink to &quot;skia/gn/toolchain/BUILD.gn の解説&quot;">​</a></h1><nav class="table-of-contents"><ul><li><a href="#wasmおよびfuchsia用の設定ファイルのインポート">WASMおよびFuchsia用の設定ファイルのインポート</a></li><li><a href="#コンパイラとリンカの設定">コンパイラとリンカの設定</a></li><li><a href="#android用の設定">Android用の設定</a></li><li><a href="#fuchsia用の設定">Fuchsia用の設定</a></li><li><a href="#デフォルトの設定">デフォルトの設定</a></li><li><a href="#dsymutilプールの深さ設定">dsymutilプールの深さ設定</a></li><li><a href="#リンクプールの深さ設定">リンクプールの深さ設定</a></li><li><a href="#リンク設定の宣言">リンク設定の宣言</a></li><li><a href="#シェルコマンドの設定">シェルコマンドの設定</a></li><li><a href="#プール設定">プール設定</a></li><li><a href="#全体の流れ">全体の流れ</a></li><li><a href="#msvcツールチェインのテンプレート">MSVCツールチェインのテンプレート</a></li><li><a href="#環境設定のスクリプト">環境設定のスクリプト</a></li><li><a href="#clangを使用する場合の設定">Clangを使用する場合の設定</a></li><li><a href="#アセンブリツールの設定">アセンブリツールの設定</a></li><li><a href="#c言語コンパイラの設定-cc">C言語コンパイラの設定 (cc)</a></li><li><a href="#c-コンパイラの設定-cxx">C++コンパイラの設定 (cxx)</a></li><li><a href="#アセンブラの設定">アセンブラの設定</a></li><li><a href="#アーカイブツールの設定-alink">アーカイブツールの設定 (alink)</a></li><li><a href="#共有ライブラリのリンク設定-solink">共有ライブラリのリンク設定 (solink)</a></li><li><a href="#実行ファイルのリンク設定-link">実行ファイルのリンク設定 (link)</a></li><li><a href="#スタンプツールの設定-stamp">スタンプツールの設定 (stamp)</a></li><li><a href="#コピーツールの設定-copy">コピーツールの設定 (copy)</a></li><li><a href="#ツールチェインの引数設定">ツールチェインの引数設定</a></li><li><a href="#msvcツールチェインの設定">MSVCツールチェインの設定</a></li><li><a href="#gccライクなツールチェインの設定">GCCライクなツールチェインの設定</a></li><li><a href="#macおよびios用の設定">MacおよびiOS用の設定</a></li><li><a href="#静的ライブラリのリンク設定-alink">静的ライブラリのリンク設定 (alink)</a></li><li><a href="#共有ライブラリのリンク設定-solink-1">共有ライブラリのリンク設定 (solink)</a></li><li><a href="#実行ファイルのリンク設定-link-1">実行ファイルのリンク設定 (link)</a></li><li><a href="#スタンプツールの設定-stamp-1">スタンプツールの設定 (stamp)</a></li><li><a href="#コピーツールの設定-copy-1">コピーツールの設定 (copy)</a></li><li><a href="#バンドルデータのコピーツールの設定-copy-bundle-data">バンドルデータのコピーツールの設定 (copy_bundle_data)</a></li><li><a href="#xcodeアセットのコンパイルツールの設定-compile-xcassets">Xcodeアセットのコンパイルツールの設定 (compile_xcassets)</a></li><li><a href="#ツールチェインの引数設定-1">ツールチェインの引数設定</a></li><li><a href="#標準的なgccライクツールチェインの設定">標準的なGCCライクツールチェインの設定</a></li><li><a href="#ホスト環境用gccライクツールチェインの設定">ホスト環境用GCCライクツールチェインの設定</a></li><li><a href="#webassembly-wasm-用ツールチェインの設定">WebAssembly（WASM）用ツールチェインの設定</a></li></ul></nav><h3 id="wasmおよびfuchsia用の設定ファイルのインポート" tabindex="-1">WASMおよびFuchsia用の設定ファイルのインポート <a class="header-anchor" href="#wasmおよびfuchsia用の設定ファイルのインポート" aria-label="Permalink to &quot;WASMおよびFuchsia用の設定ファイルのインポート&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (is_wasm) {</span></span>
<span class="line"><span>  import(&quot;wasm.gni&quot;)</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>if (is_fuchsia) {</span></span>
<span class="line"><span>  import(&quot;//build/fuchsia/sdk.gni&quot;)</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>is_wasm</code> が <code>true</code> の場合、<code>wasm.gni</code> ファイルをインポートします。</li><li><code>is_fuchsia</code> が <code>true</code> の場合、<code>//build/fuchsia/sdk.gni</code> ファイルをインポートします。</li></ul></li></ul><h3 id="コンパイラとリンカの設定" tabindex="-1">コンパイラとリンカの設定 <a class="header-anchor" href="#コンパイラとリンカの設定" aria-label="Permalink to &quot;コンパイラとリンカの設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>declare_args() {</span></span>
<span class="line"><span>  host_ar = ar</span></span>
<span class="line"><span>  host_cc = cc</span></span>
<span class="line"><span>  host_cxx = cxx</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>host_ar</code>, <code>host_cc</code>, <code>host_cxx</code> をそれぞれ <code>ar</code>, <code>cc</code>, <code>cxx</code> で初期化します。これはホスト環境で使用するツールの設定です。</li></ul></li></ul><h3 id="android用の設定" tabindex="-1">Android用の設定 <a class="header-anchor" href="#android用の設定" aria-label="Permalink to &quot;Android用の設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  if (is_android) {</span></span>
<span class="line"><span>    _prefix = &quot;$ndk/toolchains/llvm/prebuilt/$ndk_host/bin&quot;</span></span>
<span class="line"><span>    if (host_os == &quot;win&quot;) {</span></span>
<span class="line"><span>      target_ar = &quot;$_prefix/llvm-ar.exe&quot;</span></span>
<span class="line"><span>      target_cc = &quot;$_prefix/clang.exe --target=$ndk_target$ndk_api -fno-addrsig&quot;</span></span>
<span class="line"><span>      target_cxx =</span></span>
<span class="line"><span>          &quot;$_prefix/clang++.exe --target=$ndk_target$ndk_api -fno-addrsig&quot;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      target_ar = &quot;$_prefix/llvm-ar&quot;</span></span>
<span class="line"><span>      target_cc = &quot;$_prefix/$ndk_target$ndk_api-clang&quot;</span></span>
<span class="line"><span>      target_cxx = &quot;$_prefix/$ndk_target$ndk_api-clang++&quot;</span></span>
<span class="line"><span>    }</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>is_android</code> が <code>true</code> の場合、Android用のコンパイラおよびリンカの設定を行います。</li><li><code>_prefix</code> はNDKツールチェインのパスです。</li><li><code>host_os</code> がWindowsの場合とそれ以外の場合で、それぞれ <code>target_ar</code>, <code>target_cc</code>, <code>target_cxx</code> のパスとコマンドを設定します。</li></ul></li></ul><h3 id="fuchsia用の設定" tabindex="-1">Fuchsia用の設定 <a class="header-anchor" href="#fuchsia用の設定" aria-label="Permalink to &quot;Fuchsia用の設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  } else if (is_fuchsia &amp;&amp; using_fuchsia_sdk) {</span></span>
<span class="line"><span>    target_ar = rebase_path(&quot;$fuchsia_toolchain_path/bin/llvm-ar&quot;)</span></span>
<span class="line"><span>    target_cc = rebase_path(&quot;$fuchsia_toolchain_path/bin/clang&quot;)</span></span>
<span class="line"><span>    target_cxx = rebase_path(&quot;$fuchsia_toolchain_path/bin/clang++&quot;)</span></span>
<span class="line"><span>    cflags = &quot;--sysroot=&quot; +</span></span>
<span class="line"><span>             rebase_path(&quot;$fuchsia_toolchain_path/$target_cpu/sysroot&quot;)</span></span>
<span class="line"><span>    link = rebase_path(&quot;$fuchsia_toolchain_path/bin/ld.lld&quot;)</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>is_fuchsia</code> が <code>true</code> で <code>using_fuchsia_sdk</code> も <code>true</code> の場合、Fuchsia用のコンパイラおよびリンカの設定を行います。</li><li><code>target_ar</code>, <code>target_cc</code>, <code>target_cxx</code> のパスをFuchsiaツールチェインのパスに設定します。</li><li><code>cflags</code> にFuchsia用のシステムルートを設定します。</li><li><code>link</code> にリンカのパスを設定します。</li></ul></li></ul><h3 id="デフォルトの設定" tabindex="-1">デフォルトの設定 <a class="header-anchor" href="#デフォルトの設定" aria-label="Permalink to &quot;デフォルトの設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  } else {</span></span>
<span class="line"><span>    target_ar = ar</span></span>
<span class="line"><span>    target_cc = cc</span></span>
<span class="line"><span>    target_cxx = cxx</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  cc_wrapper = &quot;&quot;</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li>AndroidでもFuchsiaでもない場合、<code>target_ar</code>, <code>target_cc</code>, <code>target_cxx</code> をデフォルトの <code>ar</code>, <code>cc</code>, <code>cxx</code> に設定します。</li><li><code>cc_wrapper</code> は空文字列に設定します。</li></ul></li></ul><h3 id="dsymutilプールの深さ設定" tabindex="-1">dsymutilプールの深さ設定 <a class="header-anchor" href="#dsymutilプールの深さ設定" aria-label="Permalink to &quot;dsymutilプールの深さ設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  # dsymutil seems to kill the machine when too many processes are run in</span></span>
<span class="line"><span>  # parallel, so we need to use a pool to limit the concurrency when passing</span></span>
<span class="line"><span>  # large -j to Ninja (e.g. Goma build). Unfortunately this is also one of the</span></span>
<span class="line"><span>  # slowest steps in a build, so we don&#39;t want to limit too much. Use the number</span></span>
<span class="line"><span>  # of CPUs as a default.</span></span>
<span class="line"><span>  dlsymutil_pool_depth = exec_script(&quot;num_cpus.py&quot;, [], &quot;value&quot;)</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>dsymutil</code> は並列に実行されるとパフォーマンスが低下するため、Ninjaで大量の <code>-j</code> を使用する場合にはプールを使って同時実行数を制限します。</li><li><code>dlsymutil_pool_depth</code> を <code>num_cpus.py</code> スクリプトの実行結果（CPUの数）に設定します。</li></ul></li></ul><h3 id="リンクプールの深さ設定" tabindex="-1">リンクプールの深さ設定 <a class="header-anchor" href="#リンクプールの深さ設定" aria-label="Permalink to &quot;リンクプールの深さ設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>  # Too many linkers running at once causes issues for some builders. Allow</span></span>
<span class="line"><span>  # such builders to limit the number of concurrent link steps.</span></span>
<span class="line"><span>  # link_pool_depth &lt; 0 means no pool, 0 means cpu count, &gt; 0 sets pool size.</span></span>
<span class="line"><span>  link_pool_depth = -1</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li>多くのリンカが同時に実行されると問題が発生することがあるため、リンクステップの同時実行数を制限できるようにします。</li><li><code>link_pool_depth</code> が0より小さい場合はプールを使用せず、0の場合はCPUの数を使用し、0より大きい場合は指定されたプールサイズを使用します。</li><li>デフォルト値として <code>-1</code> を設定します。</li></ul></li></ul><h3 id="リンク設定の宣言" tabindex="-1">リンク設定の宣言 <a class="header-anchor" href="#リンク設定の宣言" aria-label="Permalink to &quot;リンク設定の宣言&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>declare_args() {</span></span>
<span class="line"><span>  host_link = host_cxx</span></span>
<span class="line"><span>  target_link = target_cxx</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>host_link</code> と <code>target_link</code> をそれぞれ <code>host_cxx</code> と <code>target_cxx</code> に設定します。これにより、ホストとターゲットのリンクに使用するデフォルトのリンクコマンドが決まります。</li></ul></li></ul><h3 id="シェルコマンドの設定" tabindex="-1">シェルコマンドの設定 <a class="header-anchor" href="#シェルコマンドの設定" aria-label="Permalink to &quot;シェルコマンドの設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># For &#39;shell&#39; see https://ninja-build.org/manual.html#ref_rule_command</span></span>
<span class="line"><span>if (host_os == &quot;win&quot;) {</span></span>
<span class="line"><span>  shell = &quot;cmd.exe /c &quot;</span></span>
<span class="line"><span>  stamp = &quot;$shell echo &gt;&quot;</span></span>
<span class="line"><span>} else {</span></span>
<span class="line"><span>  shell = &quot;&quot;</span></span>
<span class="line"><span>  stamp = &quot;touch&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>Windowsの場合</strong>: <ul><li><code>shell</code> を <code>&quot;cmd.exe /c &quot;</code> に設定します。これにより、コマンドを実行する際にWindowsのコマンドプロンプトを使用します。</li><li><code>stamp</code> を <code>&quot;cmd.exe /c echo &gt;&quot;</code> に設定します。これは、ファイルに何かを書き込むことでタイムスタンプを更新するためのコマンドです。</li></ul></li><li><strong>その他のプラットフォームの場合</strong>: <ul><li><code>shell</code> を空文字列に設定します。これにより、標準のシェル（通常は <code>/bin/sh</code>）が使用されます。</li><li><code>stamp</code> を <code>touch</code> に設定します。これは、ファイルのタイムスタンプを更新する標準的なUNIXコマンドです。</li></ul></li></ul></li></ul><h3 id="プール設定" tabindex="-1">プール設定 <a class="header-anchor" href="#プール設定" aria-label="Permalink to &quot;プール設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (current_toolchain == default_toolchain) {</span></span>
<span class="line"><span>  pool(&quot;dsymutil_pool&quot;) {</span></span>
<span class="line"><span>    depth = dlsymutil_pool_depth</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  if (0 &lt;= link_pool_depth) {</span></span>
<span class="line"><span>    pool(&quot;link_pool&quot;) {</span></span>
<span class="line"><span>      if (link_pool_depth == 0) {</span></span>
<span class="line"><span>        depth = exec_script(&quot;num_cpus.py&quot;, [], &quot;value&quot;)</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>        depth = link_pool_depth</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>current_toolchain</code> が <code>default_toolchain</code> と一致する場合にプール設定を行います。</li><li><strong><code>dsymutil_pool</code> の設定</strong>: <ul><li><code>dsymutil_pool</code> プールを作成し、その深さを <code>dlsymutil_pool_depth</code> に設定します。これは、<code>dsymutil</code> コマンドの並列実行数を制限するためのものです。</li></ul></li><li><strong><code>link_pool</code> の設定</strong>: <ul><li><code>link_pool_depth</code> が0以上の場合に <code>link_pool</code> プールを作成します。</li><li><code>link_pool_depth</code> が0の場合、スクリプト <code>num_cpus.py</code> を実行してCPUの数を取得し、それを <code>depth</code> に設定します。</li><li><code>link_pool_depth</code> が0より大きい場合、その値を <code>depth</code> に設定します。</li></ul></li></ul></li></ul><h3 id="全体の流れ" tabindex="-1">全体の流れ <a class="header-anchor" href="#全体の流れ" aria-label="Permalink to &quot;全体の流れ&quot;">​</a></h3><ol><li><strong>リンク設定</strong>: ホストとターゲットのリンクコマンドを設定します。</li><li><strong>シェルコマンドの設定</strong>: ホストOSに応じて、シェルコマンドとファイルのタイムスタンプ更新コマンドを設定します。</li><li><strong>プール設定</strong>: 並列ビルド時のコマンド実行数を制限するために、<code>dsymutil</code> と <code>link</code> のプールを設定します。</li></ol><h3 id="msvcツールチェインのテンプレート" tabindex="-1">MSVCツールチェインのテンプレート <a class="header-anchor" href="#msvcツールチェインのテンプレート" aria-label="Permalink to &quot;MSVCツールチェインのテンプレート&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>template(&quot;msvc_toolchain&quot;) {</span></span>
<span class="line"><span>  toolchain(target_name) {</span></span>
<span class="line"><span>    toolchain_target_cpu = invoker.cpu</span></span>
<span class="line"><span>    lib_switch = &quot;&quot;</span></span>
<span class="line"><span>    lib_dir_switch = &quot;/LIBPATH:&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    bin = &quot;$win_vc/Tools/MSVC/$win_toolchain_version/bin/HostX64/$toolchain_target_cpu&quot;</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>template(&quot;msvc_toolchain&quot;)</code> は、MSVCツールチェインを設定するためのテンプレートです。</li><li><code>toolchain(target_name)</code> ブロック内でツールチェインの設定が行われます。</li><li><code>toolchain_target_cpu</code> は、呼び出し元から渡されるCPUアーキテクチャです。</li><li><code>lib_switch</code> と <code>lib_dir_switch</code> は、ライブラリパス設定用のスイッチです。</li><li><code>bin</code> は、MSVCツールのバイナリが存在するディレクトリパスです。</li></ul></li></ul><h3 id="環境設定のスクリプト" tabindex="-1">環境設定のスクリプト <a class="header-anchor" href="#環境設定のスクリプト" aria-label="Permalink to &quot;環境設定のスクリプト&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    env_setup = &quot;&quot;</span></span>
<span class="line"><span>    if (toolchain_target_cpu == &quot;x86&quot;) {</span></span>
<span class="line"><span>      env_setup = &quot;$shell $win_sdk/bin/SetEnv.cmd /x86 &amp;&amp; &quot;</span></span>
<span class="line"><span>    } else if (toolchain_target_cpu == &quot;arm64&quot;) {</span></span>
<span class="line"><span>      env_setup = &quot;$shell set \\&quot;PATH=%PATH%;$win_vc\\\\Tools\\\\MSVC\\\\$win_toolchain_version\\\\bin\\\\HostX64\\\\x64\\&quot; &amp;&amp; &quot;</span></span>
<span class="line"><span>    }</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>env_setup</code> は、特定のCPUアーキテクチャに応じた環境設定コマンドです。</li><li><code>x86</code> 用のビルドでは、<code>SetEnv.cmd</code> スクリプトを実行して環境を設定します。</li><li><code>arm64</code> 用のビルドでは、必要なDLLを含むディレクトリをパスに追加します。</li></ul></li></ul><h3 id="clangを使用する場合の設定" tabindex="-1">Clangを使用する場合の設定 <a class="header-anchor" href="#clangを使用する場合の設定" aria-label="Permalink to &quot;Clangを使用する場合の設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    cl_m32_flag = &quot;&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    if (clang_win != &quot;&quot;) {</span></span>
<span class="line"><span>      if (toolchain_target_cpu == &quot;x86&quot;) {</span></span>
<span class="line"><span>        cl_m32_flag = &quot;-m32&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      if (host_os == &quot;win&quot;) {</span></span>
<span class="line"><span>        cl = &quot;\\&quot;$clang_win/bin/clang-cl.exe\\&quot;&quot;</span></span>
<span class="line"><span>        lib = &quot;\\&quot;$clang_win/bin/lld-link.exe\\&quot; /lib&quot;</span></span>
<span class="line"><span>        link = &quot;\\&quot;$clang_win/bin/lld-link.exe\\&quot;&quot;</span></span>
<span class="line"><span>      } else {</span></span>
<span class="line"><span>        cl = &quot;\\&quot;$clang_win/bin/clang-cl\\&quot;&quot;</span></span>
<span class="line"><span>        lib = &quot;\\&quot;$clang_win/bin/lld-link\\&quot; /lib&quot;</span></span>
<span class="line"><span>        link = &quot;\\&quot;$clang_win/bin/lld-link\\&quot;&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      cl = &quot;\\&quot;$bin/cl.exe\\&quot;&quot;</span></span>
<span class="line"><span>      lib = &quot;\\&quot;$bin/lib.exe\\&quot;&quot;</span></span>
<span class="line"><span>      link = &quot;\\&quot;$bin/link.exe\\&quot;&quot;</span></span>
<span class="line"><span>    }</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>clang_win</code> が設定されている場合、Clangを使用する設定を行います。</li><li><code>x86</code> の場合、<code>-m32</code> フラグを追加して32ビットターゲットを指定します。</li><li><code>host_os</code> がWindowsの場合とそれ以外の場合で、使用するコンパイラとリンカのパスを設定します。</li><li>Clangが使用されない場合、MSVCの標準ツール (<code>cl.exe</code>, <code>lib.exe</code>, <code>link.exe</code>) を使用します。</li></ul></li></ul><h3 id="アセンブリツールの設定" tabindex="-1">アセンブリツールの設定 <a class="header-anchor" href="#アセンブリツールの設定" aria-label="Permalink to &quot;アセンブリツールの設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    tool(&quot;asm&quot;) {</span></span>
<span class="line"><span>      _ml = &quot;ml&quot;</span></span>
<span class="line"><span>      if (toolchain_target_cpu == &quot;x64&quot;) {</span></span>
<span class="line"><span>        _ml += &quot;64&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>      command = &quot;$env_setup \\&quot;$bin/$_ml.exe\\&quot; {{asmflags}} /nologo /c /Fo {{output}} {{source}}&quot;</span></span>
<span class="line"><span>      outputs = [</span></span>
<span class="line"><span>        &quot;{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.obj&quot;,</span></span>
<span class="line"><span>      ]</span></span>
<span class="line"><span>      description = &quot;assemble {{source}}&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>tool(&quot;asm&quot;)</code> ブロックは、アセンブリツールの設定を行います。</li><li><code>_ml</code> にはアセンブラツール <code>ml</code> の名前を設定し、<code>x64</code> ターゲットの場合は <code>ml64</code> を使用します。</li><li><code>command</code> には、アセンブルコマンドを設定します。環境設定コマンド（<code>$env_setup</code>）と共に、アセンブラツールを実行します。</li><li><code>outputs</code> には、生成されるオブジェクトファイルのパスを指定します。</li><li><code>description</code> は、ビルドログに出力されるコマンドの説明です。</li></ul></li></ul><h3 id="c言語コンパイラの設定-cc" tabindex="-1">C言語コンパイラの設定 (<code>cc</code>) <a class="header-anchor" href="#c言語コンパイラの設定-cc" aria-label="Permalink to &quot;C言語コンパイラの設定 (\`cc\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;cc&quot;) {</span></span>
<span class="line"><span>  precompiled_header_type = &quot;msvc&quot;</span></span>
<span class="line"><span>  pdbname = &quot;{{target_out_dir}}/{{label_name}}_c.pdb&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # Label names may have spaces so pdbname must be quoted.</span></span>
<span class="line"><span>  command = &quot;$env_setup $cc_wrapper $cl /nologo /showIncludes /FC {{defines}} {{include_dirs}} {{cflags}} $cl_m32_flag {{cflags_c}} /c {{source}} /Fo{{output}} /Fd\\&quot;$pdbname\\&quot;&quot;</span></span>
<span class="line"><span>  depsformat = &quot;msvc&quot;</span></span>
<span class="line"><span>  outputs = [</span></span>
<span class="line"><span>    &quot;{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.obj&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  description = &quot;compile {{source}}&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,48)),n("ul",null,[n("li",null,[s[17]||(s[17]=n("strong",null,"説明",-1)),s[18]||(s[18]=a(": ")),n("ul",null,[s[14]||(s[14]=n("li",null,[n("strong",null,"プリコンパイルヘッダのタイプ"),a(": "),n("code",null,"precompiled_header_type"),a(" を "),n("code",null,'"msvc"'),a(" に設定。")],-1)),s[15]||(s[15]=n("li",null,[n("strong",null,"PDBファイル名"),a(": デバッグ情報のファイル名を "),n("code",null,"pdbname"),a(" に設定。")],-1)),n("li",null,[s[6]||(s[6]=n("strong",null,"コンパイルコマンド",-1)),s[7]||(s[7]=a(": ")),s[8]||(s[8]=n("code",null,"command",-1)),s[9]||(s[9]=a(" で指定。環境設定コマンド（")),s[10]||(s[10]=n("code",null,"$env_setup",-1)),s[11]||(s[11]=a("）と共に、コンパイラツール（")),s[12]||(s[12]=n("code",null,"$cl",-1)),s[13]||(s[13]=a("）を実行。その他のフラグや設定も含まれます。 ")),n("ul",null,[n("li",null,[n("code",null,o(l.defines),1),s[0]||(s[0]=a(": 定義済みマクロ"))]),n("li",null,[n("code",null,o(l.include_dirs),1),s[1]||(s[1]=a(": インクルードディレクトリ"))]),n("li",null,[n("code",null,o(l.cflags),1),s[2]||(s[2]=a(", ")),n("code",null,o(l.cflags_c),1),s[3]||(s[3]=a(": コンパイルフラグ"))]),n("li",null,[n("code",null,o(l.source),1),s[4]||(s[4]=a(", ")),n("code",null,o(l.output),1),s[5]||(s[5]=a(": ソースファイルと出力ファイル"))])])]),s[16]||(s[16]=p("<li><strong>依存関係フォーマット</strong>: <code>depsformat</code> を <code>&quot;msvc&quot;</code> に設定。</li><li><strong>出力ファイル</strong>: <code>outputs</code> で、オブジェクトファイルのパスを設定。</li><li><strong>説明</strong>: <code>description</code> にコンパイルタスクの説明を設定。</li>",3))])])]),s[98]||(s[98]=p(`<h3 id="c-コンパイラの設定-cxx" tabindex="-1">C++コンパイラの設定 (<code>cxx</code>) <a class="header-anchor" href="#c-コンパイラの設定-cxx" aria-label="Permalink to &quot;C++コンパイラの設定 (\`cxx\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;cxx&quot;) {</span></span>
<span class="line"><span>  precompiled_header_type = &quot;msvc&quot;</span></span>
<span class="line"><span>  pdbname = &quot;{{target_out_dir}}/{{label_name}}_c.pdb&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # Label names may have spaces so pdbname must be quoted.</span></span>
<span class="line"><span>  command = &quot;$env_setup $cc_wrapper $cl /nologo /showIncludes /FC {{defines}} {{include_dirs}} {{cflags}} $cl_m32_flag {{cflags_cc}} /c {{source}} /Fo{{output}} /Fd\\&quot;$pdbname\\&quot;&quot;</span></span>
<span class="line"><span>  depsformat = &quot;msvc&quot;</span></span>
<span class="line"><span>  outputs = [</span></span>
<span class="line"><span>    &quot;{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.obj&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  description = &quot;compile {{source}}&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,2)),n("ul",null,[n("li",null,[s[19]||(s[19]=n("strong",null,"説明",-1)),s[20]||(s[20]=a(": ")),s[21]||(s[21]=n("code",null,"cc",-1)),s[22]||(s[22]=a(" ツールの設定と同様に、C++コンパイラの設定を行います。違いは ")),n("code",null,o(l.cflags_cc),1),s[23]||(s[23]=a(" が使用される点のみです。"))])]),s[99]||(s[99]=p(`<h3 id="アセンブラの設定" tabindex="-1">アセンブラの設定 <a class="header-anchor" href="#アセンブラの設定" aria-label="Permalink to &quot;アセンブラの設定&quot;">​</a></h3><p>前の回答に含まれていた部分ですので省略しますが、<code>tool(&quot;asm&quot;)</code> ブロックでアセンブラツールの設定を行っています。</p><h3 id="アーカイブツールの設定-alink" tabindex="-1">アーカイブツールの設定 (<code>alink</code>) <a class="header-anchor" href="#アーカイブツールの設定-alink" aria-label="Permalink to &quot;アーカイブツールの設定 (\`alink\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;alink&quot;) {</span></span>
<span class="line"><span>  rspfile = &quot;{{output}}.rsp&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  command = &quot;$env_setup $lib /nologo /ignore:4221 {{arflags}} /OUT:{{output}} @$rspfile&quot;</span></span>
<span class="line"><span>  outputs = [</span></span>
<span class="line"><span>    # Ignore {{output_extension}} and always use .lib, there&#39;s no reason to</span></span>
<span class="line"><span>    # allow targets to override this extension on Windows.</span></span>
<span class="line"><span>    &quot;{{root_out_dir}}/{{target_output_name}}{{output_extension}}&quot;,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  default_output_extension = &quot;.lib&quot;</span></span>
<span class="line"><span>  default_output_dir = &quot;{{target_out_dir}}&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # inputs_newline works around a fixed per-line buffer size in the linker.</span></span>
<span class="line"><span>  rspfile_content = &quot;{{inputs_newline}}&quot;</span></span>
<span class="line"><span>  description = &quot;link {{output}}&quot;</span></span>
<span class="line"><span>  if (0 &lt;= link_pool_depth) {</span></span>
<span class="line"><span>    pool = &quot;:link_pool($default_toolchain)&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,4)),n("ul",null,[n("li",null,[s[37]||(s[37]=n("strong",null,"説明",-1)),s[38]||(s[38]=a(": ")),n("ul",null,[s[35]||(s[35]=n("li",null,[n("strong",null,"レスポンスファイル"),a(": "),n("code",null,"rspfile"),a(" に出力ファイルのレスポンスファイルパスを設定。")],-1)),n("li",null,[s[27]||(s[27]=n("strong",null,"コマンド",-1)),s[28]||(s[28]=a(": ")),s[29]||(s[29]=n("code",null,"command",-1)),s[30]||(s[30]=a(" で指定。環境設定コマンド（")),s[31]||(s[31]=n("code",null,"$env_setup",-1)),s[32]||(s[32]=a("）と共に、アーカイブツール（")),s[33]||(s[33]=n("code",null,"$lib",-1)),s[34]||(s[34]=a("）を実行。 ")),n("ul",null,[n("li",null,[n("code",null,o(l.arflags),1),s[24]||(s[24]=a(": アーカイブフラグ"))]),n("li",null,[n("code",null,o(l.output),1),s[25]||(s[25]=a(": 出力ファイル"))]),s[26]||(s[26]=n("li",null,[n("code",null,"@$rspfile"),a(": レスポンスファイルの内容を使用")],-1))])]),s[36]||(s[36]=p("<li><strong>出力ファイル</strong>: <code>outputs</code> で、出力ライブラリファイルのパスを設定。Windowsでは常に <code>.lib</code> 拡張子を使用。</li><li><strong>デフォルト出力拡張子</strong>: <code>default_output_extension</code> を <code>&quot;.lib&quot;</code> に設定。</li><li><strong>デフォルト出力ディレクトリ</strong>: <code>default_output_dir</code> を設定。</li><li><strong>レスポンスファイルの内容</strong>: <code>rspfile_content</code> で入力ファイルを改行で区切ってリスト化。</li><li><strong>説明</strong>: <code>description</code> にリンクタスクの説明を設定。</li><li><strong>プール設定</strong>: <code>link_pool_depth</code> が0以上の場合、<code>link_pool</code> を使用してリンクタスクの同時実行数を制限。</li>",6))])])]),s[100]||(s[100]=p(`<h3 id="共有ライブラリのリンク設定-solink" tabindex="-1">共有ライブラリのリンク設定 (<code>solink</code>) <a class="header-anchor" href="#共有ライブラリのリンク設定-solink" aria-label="Permalink to &quot;共有ライブラリのリンク設定 (\`solink\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;solink&quot;) {</span></span>
<span class="line"><span>  dllname = &quot;{{output_dir}}/{{target_output_name}}{{output_extension}}&quot;</span></span>
<span class="line"><span>  libname = &quot;\${dllname}.lib&quot;</span></span>
<span class="line"><span>  pdbname = &quot;\${dllname}.pdb&quot;</span></span>
<span class="line"><span>  rspfile = &quot;\${dllname}.rsp&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  command = &quot;$env_setup $link /nologo /IMPLIB:$libname /DLL /OUT:$dllname /PDB:$pdbname @$rspfile&quot;</span></span>
<span class="line"><span>  outputs = [</span></span>
<span class="line"><span>    dllname,</span></span>
<span class="line"><span>    libname,</span></span>
<span class="line"><span>    pdbname,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>  default_output_extension = &quot;.dll&quot;</span></span>
<span class="line"><span>  default_output_dir = &quot;{{root_out_dir}}&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  link_output = libname</span></span>
<span class="line"><span>  depend_output = libname</span></span>
<span class="line"><span>  runtime_outputs = [</span></span>
<span class="line"><span>    dllname,</span></span>
<span class="line"><span>    pdbname,</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # I don&#39;t quite understand this.  Aping Chrome&#39;s toolchain/win/BUILD.gn.</span></span>
<span class="line"><span>  restat = true</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # inputs_newline works around a fixed per-line buffer size in the linker.</span></span>
<span class="line"><span>  rspfile_content = &quot;{{inputs_newline}} {{libs}} {{solibs}} {{ldflags}}&quot;</span></span>
<span class="line"><span>  description = &quot;link {{output}}&quot;</span></span>
<span class="line"><span>  if (0 &lt;= link_pool_depth) {</span></span>
<span class="line"><span>    pool = &quot;:link_pool($default_toolchain)&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>dllname</strong>: 出力されるDLLファイルの名前。</li><li><strong>libname</strong>: DLLに対応するインポートライブラリの名前。</li><li><strong>pdbname</strong>: デバッグ情報のファイル名。</li><li><strong>rspfile</strong>: リンカコマンドのレスポンスファイル名。</li><li><strong>command</strong>: リンクコマンド。<code>$env_setup</code> と <code>$link</code> を使用し、DLLの出力ファイル、PDBファイル、レスポンスファイルを指定。</li><li><strong>outputs</strong>: リンクコマンドの出力ファイルリスト。</li><li><strong>default_output_extension</strong>: デフォルトの出力ファイル拡張子を <code>.dll</code> に設定。</li><li><strong>default_output_dir</strong>: デフォルトの出力ディレクトリを設定。</li><li><strong>link_output</strong> と <strong>depend_output</strong>: リンクと依存の出力ファイルを <code>libname</code> に設定。</li><li><strong>runtime_outputs</strong>: 実行時に必要な出力ファイルリスト。</li><li><strong>restat</strong>: ファイルの再スタンプを有効にするフラグ。</li><li><strong>rspfile_content</strong>: リンカコマンドのレスポンスファイル内容。</li><li><strong>description</strong>: リンクタスクの説明。</li><li><strong>pool</strong>: <code>link_pool_depth</code> が0以上の場合にリンクプールを設定。</li></ul></li></ul><h3 id="実行ファイルのリンク設定-link" tabindex="-1">実行ファイルのリンク設定 (<code>link</code>) <a class="header-anchor" href="#実行ファイルのリンク設定-link" aria-label="Permalink to &quot;実行ファイルのリンク設定 (\`link\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;link&quot;) {</span></span>
<span class="line"><span>  exename = &quot;{{root_out_dir}}/{{target_output_name}}{{output_extension}}&quot;</span></span>
<span class="line"><span>  pdbname = &quot;$exename.pdb&quot;</span></span>
<span class="line"><span>  rspfile = &quot;$exename.rsp&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  command = &quot;$env_setup $link /nologo /OUT:$exename /PDB:$pdbname @$rspfile&quot;</span></span>
<span class="line"><span>  default_output_extension = &quot;.exe&quot;</span></span>
<span class="line"><span>  default_output_dir = &quot;{{root_out_dir}}&quot;</span></span>
<span class="line"><span>  outputs = [ exename ]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  # inputs_newline works around a fixed per-line buffer size in the linker.</span></span>
<span class="line"><span>  rspfile_content = &quot;{{inputs_newline}} {{libs}} {{solibs}} {{ldflags}}&quot;</span></span>
<span class="line"><span>  description = &quot;link {{output}}&quot;</span></span>
<span class="line"><span>  if (0 &lt;= link_pool_depth) {</span></span>
<span class="line"><span>    pool = &quot;:link_pool($default_toolchain)&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>exename</strong>: 出力される実行ファイルの名前。</li><li><strong>pdbname</strong>: デバッグ情報のファイル名。</li><li><strong>rspfile</strong>: リンカコマンドのレスポンスファイル名。</li><li><strong>command</strong>: リンクコマンド。<code>$env_setup</code> と <code>$link</code> を使用し、実行ファイルの出力ファイル、PDBファイル、レスポンスファイルを指定。</li><li><strong>default_output_extension</strong>: デフォルトの出力ファイル拡張子を <code>.exe</code> に設定。</li><li><strong>default_output_dir</strong>: デフォルトの出力ディレクトリを設定。</li><li><strong>outputs</strong>: リンクコマンドの出力ファイルリスト。</li><li><strong>rspfile_content</strong>: リンカコマンドのレスポンスファイル内容。</li><li><strong>description</strong>: リンクタスクの説明。</li><li><strong>pool</strong>: <code>link_pool_depth</code> が0以上の場合にリンクプールを設定。</li></ul></li></ul><h3 id="スタンプツールの設定-stamp" tabindex="-1">スタンプツールの設定 (<code>stamp</code>) <a class="header-anchor" href="#スタンプツールの設定-stamp" aria-label="Permalink to &quot;スタンプツールの設定 (\`stamp\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;stamp&quot;) {</span></span>
<span class="line"><span>  command = &quot;$stamp {{output}}&quot;</span></span>
<span class="line"><span>  description = &quot;stamp {{output}}&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>command</strong>: スタンプコマンド。<code>$stamp</code> を使用して出力ファイルをスタンプします。</li><li><strong>description</strong>: スタンプタスクの説明。</li></ul></li></ul><h3 id="コピーツールの設定-copy" tabindex="-1">コピーツールの設定 (<code>copy</code>) <a class="header-anchor" href="#コピーツールの設定-copy" aria-label="Permalink to &quot;コピーツールの設定 (\`copy\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;copy&quot;) {</span></span>
<span class="line"><span>  cp_py = rebase_path(&quot;../cp.py&quot;)</span></span>
<span class="line"><span>  command = &quot;$shell python3 \\&quot;$cp_py\\&quot; {{source}} {{output}}&quot;</span></span>
<span class="line"><span>  description = &quot;copy {{source}} {{output}}&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>cp_py</strong>: コピー用のPythonスクリプト <code>cp.py</code> のパス。</li><li><strong>command</strong>: コピーコマンド。<code>$shell</code> と <code>python3</code> を使用して <code>cp.py</code> スクリプトを実行し、ソースファイルを出力ファイルにコピーします。</li><li><strong>description</strong>: コピータスクの説明。</li></ul></li></ul><h3 id="ツールチェインの引数設定" tabindex="-1">ツールチェインの引数設定 <a class="header-anchor" href="#ツールチェインの引数設定" aria-label="Permalink to &quot;ツールチェインの引数設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>toolchain_args = {</span></span>
<span class="line"><span>  current_cpu = invoker.cpu</span></span>
<span class="line"><span>  current_os = invoker.os</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>toolchain_args</strong>: 現在のCPUとOSの情報を設定します。<code>invoker.cpu</code> と <code>invoker.os</code> を使用します。</li></ul></li></ul><h3 id="msvcツールチェインの設定" tabindex="-1">MSVCツールチェインの設定 <a class="header-anchor" href="#msvcツールチェインの設定" aria-label="Permalink to &quot;MSVCツールチェインの設定&quot;">​</a></h3><h4 id="msvcツールチェインの宣言" tabindex="-1">MSVCツールチェインの宣言 <a class="header-anchor" href="#msvcツールチェインの宣言" aria-label="Permalink to &quot;MSVCツールチェインの宣言&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>msvc_toolchain(&quot;msvc&quot;) {</span></span>
<span class="line"><span>  cpu = current_cpu</span></span>
<span class="line"><span>  os = current_os</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <code>msvc</code> という名前のツールチェインを定義します。 <ul><li><code>cpu</code> は <code>current_cpu</code> に設定されます。</li><li><code>os</code> は <code>current_os</code> に設定されます。</li></ul></li></ul><h4 id="msvcホストツールチェインの宣言" tabindex="-1">MSVCホストツールチェインの宣言 <a class="header-anchor" href="#msvcホストツールチェインの宣言" aria-label="Permalink to &quot;MSVCホストツールチェインの宣言&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>msvc_toolchain(&quot;msvc_host&quot;) {</span></span>
<span class="line"><span>  cpu = host_cpu</span></span>
<span class="line"><span>  os = host_os</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <code>msvc_host</code> という名前のホストツールチェインを定義します。 <ul><li><code>cpu</code> は <code>host_cpu</code> に設定されます。</li><li><code>os</code> は <code>host_os</code> に設定されます。</li></ul></li></ul><h3 id="gccライクなツールチェインの設定" tabindex="-1">GCCライクなツールチェインの設定 <a class="header-anchor" href="#gccライクなツールチェインの設定" aria-label="Permalink to &quot;GCCライクなツールチェインの設定&quot;">​</a></h3><h4 id="gccライクなツールチェインのテンプレート" tabindex="-1">GCCライクなツールチェインのテンプレート <a class="header-anchor" href="#gccライクなツールチェインのテンプレート" aria-label="Permalink to &quot;GCCライクなツールチェインのテンプレート&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>template(&quot;gcc_like_toolchain&quot;) {</span></span>
<span class="line"><span>  toolchain(target_name) {</span></span>
<span class="line"><span>    ar = invoker.ar</span></span>
<span class="line"><span>    cc = invoker.cc</span></span>
<span class="line"><span>    cxx = invoker.cxx</span></span>
<span class="line"><span>    link = invoker.link</span></span>
<span class="line"><span>    lib_switch = &quot;-l&quot;</span></span>
<span class="line"><span>    lib_dir_switch = &quot;-L&quot;</span></span></code></pre></div><ul><li><strong>説明</strong>: <code>gcc_like_toolchain</code> というテンプレートを定義します。このテンプレートはGCCライクなツールチェインを設定します。 <ul><li><code>ar</code>, <code>cc</code>, <code>cxx</code>, <code>link</code> は、呼び出し元（<code>invoker</code>）からの引数を使用します。</li><li><code>lib_switch</code> はライブラリ指定用のスイッチを <code>&quot;-l&quot;</code> に設定します。</li><li><code>lib_dir_switch</code> はライブラリディレクトリ指定用のスイッチを <code>&quot;-L&quot;</code> に設定します。</li></ul></li></ul><h4 id="cコンパイラの設定" tabindex="-1">Cコンパイラの設定 <a class="header-anchor" href="#cコンパイラの設定" aria-label="Permalink to &quot;Cコンパイラの設定&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    tool(&quot;cc&quot;) {</span></span>
<span class="line"><span>      depfile = &quot;{{output}}.d&quot;</span></span>
<span class="line"><span>      command = &quot;$cc_wrapper $cc -MD -MF $depfile {{defines}} {{include_dirs}} {{cflags}} {{cflags_c}} -c {{source}} -o {{output}}&quot;</span></span>
<span class="line"><span>      depsformat = &quot;gcc&quot;</span></span>
<span class="line"><span>      outputs = [ &quot;{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.o&quot; ]</span></span>
<span class="line"><span>      description = &quot;compile {{source}}&quot;</span></span>
<span class="line"><span>    }</span></span></code></pre></div><ul><li><strong>説明</strong>: <code>cc</code> ツール（Cコンパイラ）の設定を行います。 <ul><li><code>depfile</code> は依存関係ファイルの名前です。</li><li><code>command</code> にはコンパイルコマンドを設定します。<code>$cc_wrapper</code> と <code>$cc</code> を使用し、必要なフラグやパスを指定します。</li><li><code>depsformat</code> は依存関係のフォーマットを <code>&quot;gcc&quot;</code> に設定します。</li><li><code>outputs</code> には出力ファイルのパスを設定します。</li><li><code>description</code> にはコンパイルタスクの説明を設定します。</li></ul></li></ul><h4 id="c-コンパイラの設定" tabindex="-1">C++コンパイラの設定 <a class="header-anchor" href="#c-コンパイラの設定" aria-label="Permalink to &quot;C++コンパイラの設定&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    tool(&quot;cxx&quot;) {</span></span>
<span class="line"><span>      depfile = &quot;{{output}}.d&quot;</span></span>
<span class="line"><span>      command = &quot;$cc_wrapper $cxx -MD -MF $depfile {{defines}} {{include_dirs}} {{cflags}} {{cflags_cc}} -c {{source}} -o {{output}}&quot;</span></span>
<span class="line"><span>      depsformat = &quot;gcc&quot;</span></span>
<span class="line"><span>      outputs = [ &quot;{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.o&quot; ]</span></span>
<span class="line"><span>      description = &quot;compile {{source}}&quot;</span></span>
<span class="line"><span>    }</span></span></code></pre></div>`,31)),n("ul",null,[n("li",null,[s[44]||(s[44]=n("strong",null,"説明",-1)),s[45]||(s[45]=a(": ")),s[46]||(s[46]=n("code",null,"cxx",-1)),s[47]||(s[47]=a(" ツール（C++コンパイラ）の設定を行います。 ")),n("ul",null,[n("li",null,[s[39]||(s[39]=n("code",null,"cc",-1)),s[40]||(s[40]=a(" ツールとほぼ同じ設定ですが、")),s[41]||(s[41]=n("code",null,"cxx",-1)),s[42]||(s[42]=a(" コンパイラを使用し、")),n("code",null,o(l.cflags_cc),1),s[43]||(s[43]=a(" を追加しています。"))])])])]),s[101]||(s[101]=p(`<h4 id="objective-cコンパイラの設定" tabindex="-1">Objective-Cコンパイラの設定 <a class="header-anchor" href="#objective-cコンパイラの設定" aria-label="Permalink to &quot;Objective-Cコンパイラの設定&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    tool(&quot;objc&quot;) {</span></span>
<span class="line"><span>      depfile = &quot;{{output}}.d&quot;</span></span>
<span class="line"><span>      command = &quot;$cc_wrapper $cc -MD -MF $depfile {{defines}} {{include_dirs}} {{framework_dirs}} {{cflags}} {{cflags_objc}} -c {{source}} -o {{output}}&quot;</span></span>
<span class="line"><span>      depsformat = &quot;gcc&quot;</span></span>
<span class="line"><span>      outputs = [ &quot;{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.o&quot; ]</span></span>
<span class="line"><span>      description = &quot;compile {{source}}&quot;</span></span>
<span class="line"><span>    }</span></span></code></pre></div>`,2)),n("ul",null,[n("li",null,[s[50]||(s[50]=n("strong",null,"説明",-1)),s[51]||(s[51]=a(": ")),s[52]||(s[52]=n("code",null,"objc",-1)),s[53]||(s[53]=a(" ツール（Objective-Cコンパイラ）の設定を行います。 ")),n("ul",null,[s[49]||(s[49]=n("li",null,[n("code",null,"framework_dirs"),a(" を追加して、フレームワークディレクトリを指定します。")],-1)),n("li",null,[n("code",null,o(l.cflags_objc),1),s[48]||(s[48]=a(" を追加しています。"))])])])]),s[102]||(s[102]=p(`<h4 id="objective-c-コンパイラの設定" tabindex="-1">Objective-C++コンパイラの設定 <a class="header-anchor" href="#objective-c-コンパイラの設定" aria-label="Permalink to &quot;Objective-C++コンパイラの設定&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    tool(&quot;objcxx&quot;) {</span></span>
<span class="line"><span>      depfile = &quot;{{output}}.d&quot;</span></span>
<span class="line"><span>      command = &quot;$cc_wrapper $cxx -MD -MF $depfile {{defines}} {{include_dirs}} {{framework_dirs}} {{cflags}} {{cflags_objcc}} -c {{source}} -o {{output}}&quot;</span></span>
<span class="line"><span>      depsformat = &quot;gcc&quot;</span></span>
<span class="line"><span>      outputs = [ &quot;{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.o&quot; ]</span></span>
<span class="line"><span>      description = &quot;compile {{source}}&quot;</span></span>
<span class="line"><span>    }</span></span></code></pre></div>`,2)),n("ul",null,[n("li",null,[s[59]||(s[59]=n("strong",null,"説明",-1)),s[60]||(s[60]=a(": ")),s[61]||(s[61]=n("code",null,"objcxx",-1)),s[62]||(s[62]=a(" ツール（Objective-C++コンパイラ）の設定を行います。 ")),n("ul",null,[n("li",null,[s[54]||(s[54]=n("code",null,"objc",-1)),s[55]||(s[55]=a(" ツールと同様ですが、")),s[56]||(s[56]=n("code",null,"cxx",-1)),s[57]||(s[57]=a(" コンパイラを使用し、")),n("code",null,o(l.cflags_objcc),1),s[58]||(s[58]=a(" を追加しています。"))])])])]),s[103]||(s[103]=p(`<h4 id="アセンブラの設定-1" tabindex="-1">アセンブラの設定 <a class="header-anchor" href="#アセンブラの設定-1" aria-label="Permalink to &quot;アセンブラの設定&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>    tool(&quot;asm&quot;) {</span></span>
<span class="line"><span>      depfile = &quot;{{output}}.d&quot;</span></span>
<span class="line"><span>      command = &quot;$cc_wrapper $cc -MD -MF $depfile {{defines}} {{include_dirs}} {{asmflags}} -c {{source}} -o {{output}}&quot;</span></span>
<span class="line"><span>      depsformat = &quot;gcc&quot;</span></span>
<span class="line"><span>      outputs = [ &quot;{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.o&quot; ]</span></span>
<span class="line"><span>      description = &quot;assemble {{source}}&quot;</span></span>
<span class="line"><span>    }</span></span></code></pre></div>`,2)),n("ul",null,[n("li",null,[s[65]||(s[65]=n("strong",null,"説明",-1)),s[66]||(s[66]=a(": ")),s[67]||(s[67]=n("code",null,"asm",-1)),s[68]||(s[68]=a(" ツール（アセンブラ）の設定を行います。 ")),n("ul",null,[s[64]||(s[64]=n("li",null,[n("code",null,"cc"),a(" コンパイラを使用してアセンブルを行います。")],-1)),n("li",null,[n("code",null,o(l.asmflags),1),s[63]||(s[63]=a(" を追加しています。"))])])])]),s[104]||(s[104]=p(`<h3 id="macおよびios用の設定" tabindex="-1">MacおよびiOS用の設定 <a class="header-anchor" href="#macおよびios用の設定" aria-label="Permalink to &quot;MacおよびiOS用の設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (is_mac || is_ios) {</span></span>
<span class="line"><span>  not_needed([ &quot;ar&quot; ])  # We use libtool instead.</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li>MacおよびiOSでは、<code>ar</code> ツールが必要ないため、<code>libtool</code> を使用します。</li></ul></li></ul><h3 id="静的ライブラリのリンク設定-alink" tabindex="-1">静的ライブラリのリンク設定 (<code>alink</code>) <a class="header-anchor" href="#静的ライブラリのリンク設定-alink" aria-label="Permalink to &quot;静的ライブラリのリンク設定 (\`alink\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;alink&quot;) {</span></span>
<span class="line"><span>  if (is_mac || is_ios) {</span></span>
<span class="line"><span>    command = &quot;libtool -static -o {{output}} -no_warning_for_no_symbols {{inputs}}&quot;</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    rspfile = &quot;{{output}}.rsp&quot;</span></span>
<span class="line"><span>    rspfile_content = &quot;{{inputs}}&quot;</span></span>
<span class="line"><span>    rm_py = rebase_path(&quot;../rm.py&quot;)</span></span>
<span class="line"><span>    command = &quot;$shell python3 \\&quot;$rm_py\\&quot; \\&quot;{{output}}\\&quot; &amp;&amp; $ar rcs {{output}} @$rspfile&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  outputs = [ &quot;{{root_out_dir}}/{{target_output_name}}{{output_extension}}&quot; ]</span></span>
<span class="line"><span>  default_output_extension = &quot;.a&quot;</span></span>
<span class="line"><span>  output_prefix = &quot;lib&quot;</span></span>
<span class="line"><span>  description = &quot;link {{output}}&quot;</span></span>
<span class="line"><span>  if (0 &lt;= link_pool_depth) {</span></span>
<span class="line"><span>    pool = &quot;:link_pool($default_toolchain)&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,5)),n("ul",null,[n("li",null,[s[77]||(s[77]=n("strong",null,"説明",-1)),s[78]||(s[78]=a(": ")),n("ul",null,[s[75]||(s[75]=n("li",null,[n("strong",null,"MacおよびiOSの場合"),a(": "),n("ul",null,[n("li",null,[n("code",null,"libtool"),a(" コマンドを使用して静的ライブラリをリンクします。"),n("code",null,"-static"),a(" オプションで静的ライブラリを作成し、"),n("code",null,"-no_warning_for_no_symbols"),a(" オプションでシンボルがない場合の警告を抑制します。")])])],-1)),n("li",null,[s[73]||(s[73]=n("strong",null,"その他のプラットフォームの場合",-1)),s[74]||(s[74]=a(": ")),n("ul",null,[n("li",null,[s[69]||(s[69]=a("レスポンスファイル ")),n("code",null,o(l.output)+".rsp",1),s[70]||(s[70]=a(" を作成し、その内容に ")),n("code",null,o(l.inputs),1),s[71]||(s[71]=a(" を含めます。"))]),s[72]||(s[72]=n("li",null,[a("リンクコマンドでは、"),n("code",null,"rm.py"),a(" スクリプトを使用して既存の出力ファイルを削除し、その後 "),n("code",null,"ar"),a(" コマンドで静的ライブラリを作成します。")],-1))])]),s[76]||(s[76]=p("<li><strong>共通設定</strong>: <ul><li><code>outputs</code>: 出力ファイルのリストを設定。</li><li><code>default_output_extension</code>: デフォルトの出力ファイル拡張子を <code>.a</code> に設定。</li><li><code>output_prefix</code>: 出力ファイルのプレフィックスを <code>lib</code> に設定。</li><li><code>description</code>: リンクタスクの説明を設定。</li><li><code>link_pool_depth</code> が0以上の場合、リンクプールを設定。</li></ul></li>",1))])])]),s[105]||(s[105]=p(`<h3 id="共有ライブラリのリンク設定-solink-1" tabindex="-1">共有ライブラリのリンク設定 (<code>solink</code>) <a class="header-anchor" href="#共有ライブラリのリンク設定-solink-1" aria-label="Permalink to &quot;共有ライブラリのリンク設定 (\`solink\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;solink&quot;) {</span></span>
<span class="line"><span>  soname = &quot;{{target_output_name}}{{output_extension}}&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  rpath = &quot;-Wl,-soname,$soname&quot;</span></span>
<span class="line"><span>  if (is_mac || is_ios) {</span></span>
<span class="line"><span>    rpath = &quot;-Wl,-install_name,@rpath/$soname&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  rspfile = &quot;{{output}}.rsp&quot;</span></span>
<span class="line"><span>  rspfile_content = &quot;{{inputs}}&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  _start_group = &quot;-Wl,--start-group&quot;</span></span>
<span class="line"><span>  _end_group = &quot;-Wl,--end-group&quot;</span></span>
<span class="line"><span>  if (is_mac || is_ios || is_fuchsia) {</span></span>
<span class="line"><span>    _start_group = &quot;&quot;</span></span>
<span class="line"><span>    _end_group = &quot;&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  command = &quot;$link -shared {{ldflags}} $_start_group @$rspfile {{frameworks}} {{solibs}} $_end_group {{libs}} $rpath -o {{output}}&quot;</span></span>
<span class="line"><span>  outputs = [ &quot;{{root_out_dir}}/$soname&quot; ]</span></span>
<span class="line"><span>  output_prefix = &quot;lib&quot;</span></span>
<span class="line"><span>  if (is_mac || is_ios) {</span></span>
<span class="line"><span>    default_output_extension = &quot;.dylib&quot;</span></span>
<span class="line"><span>  } else {</span></span>
<span class="line"><span>    default_output_extension = &quot;.so&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  description = &quot;link {{output}}&quot;</span></span>
<span class="line"><span>  if (0 &lt;= link_pool_depth) {</span></span>
<span class="line"><span>    pool = &quot;:link_pool($default_toolchain)&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,2)),n("ul",null,[n("li",null,[s[95]||(s[95]=n("strong",null,"説明",-1)),s[96]||(s[96]=a(": ")),n("ul",null,[s[92]||(s[92]=p("<li><strong>共有ライブラリの名前</strong>: <code>soname</code> に設定。</li><li><strong>ランタイム検索パス（RPATH）</strong>: <ul><li>通常のプラットフォームでは、<code>-Wl,-soname,$soname</code> を使用。</li><li>MacおよびiOSでは、<code>-Wl,-install_name,@rpath/$soname</code> を使用。</li></ul></li>",2)),n("li",null,[s[79]||(s[79]=n("strong",null,"レスポンスファイル",-1)),s[80]||(s[80]=a(": ")),n("code",null,o(l.output)+".rsp",1),s[81]||(s[81]=a(" に ")),n("code",null,o(l.inputs),1),s[82]||(s[82]=a(" を含めます。"))]),s[93]||(s[93]=n("li",null,[n("strong",null,"リンクグループ"),a(": "),n("ul",null,[n("li",null,[a("通常のプラットフォームでは、"),n("code",null,"--start-group"),a(" と "),n("code",null,"--end-group"),a(" を使用して複数の "),n("code",null,".a"),a(" ファイルをリンク。")]),n("li",null,"Mac、iOS、およびFuchsiaではこれらのフラグを使用しない。")])],-1)),n("li",null,[s[90]||(s[90]=n("strong",null,"リンクコマンド",-1)),s[91]||(s[91]=a(": ")),n("ul",null,[n("li",null,[s[83]||(s[83]=n("code",null,"$link -shared",-1)),s[84]||(s[84]=a(" で共有ライブラリを作成し、")),n("code",null,o(l.ldflags),1),s[85]||(s[85]=a("、")),n("code",null,o(l.frameworks),1),s[86]||(s[86]=a("、")),n("code",null,o(l.solibs),1),s[87]||(s[87]=a("、")),n("code",null,o(l.libs),1),s[88]||(s[88]=a(" を含めます。"))]),n("li",null,[n("code",null,"-o "+o(l.output),1),s[89]||(s[89]=a(" で出力ファイルを指定。"))])])]),s[94]||(s[94]=p("<li><strong>共通設定</strong>: <ul><li><code>outputs</code>: 出力ファイルのリストを設定。</li><li><code>output_prefix</code>: 出力ファイルのプレフィックスを <code>lib</code> に設定。</li><li><code>default_output_extension</code>: MacおよびiOSでは <code>.dylib</code>、それ以外では <code>.so</code> に設定。</li><li><code>description</code>: リンクタスクの説明を設定。</li><li><code>link_pool_depth</code> が0以上の場合、リンクプールを設定。</li></ul></li>",1))])])]),s[106]||(s[106]=p(`<h3 id="実行ファイルのリンク設定-link-1" tabindex="-1">実行ファイルのリンク設定 (<code>link</code>) <a class="header-anchor" href="#実行ファイルのリンク設定-link-1" aria-label="Permalink to &quot;実行ファイルのリンク設定 (\`link\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;link&quot;) {</span></span>
<span class="line"><span>  exe_name = &quot;{{root_out_dir}}/{{target_output_name}}{{output_extension}}&quot;</span></span>
<span class="line"><span>  rspfile = &quot;$exe_name.rsp&quot;</span></span>
<span class="line"><span>  rspfile_content = &quot;{{inputs}}&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  _start_group = &quot;-Wl,--start-group&quot;</span></span>
<span class="line"><span>  _end_group = &quot;-Wl,--end-group&quot;</span></span>
<span class="line"><span>  if (is_mac || is_ios || is_fuchsia) {</span></span>
<span class="line"><span>    _start_group = &quot;&quot;</span></span>
<span class="line"><span>    _end_group = &quot;&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>  command = &quot;$link {{ldflags}} $_start_group @$rspfile {{frameworks}} {{solibs}} $_end_group {{libs}} -o $exe_name&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  outputs = [ &quot;$exe_name&quot; ]</span></span>
<span class="line"><span>  description = &quot;link {{output}}&quot;</span></span>
<span class="line"><span>  if (0 &lt;= link_pool_depth) {</span></span>
<span class="line"><span>    pool = &quot;:link_pool($default_toolchain)&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>exe_name</strong>: 出力される実行ファイルの名前。</li><li><strong>rspfile</strong>: リンカコマンドのレスポンスファイルの名前。</li><li><strong>rspfile_content</strong>: レスポンスファイルに含める入力ファイルリスト。</li><li><strong>リンクグループ</strong>: <code>--start-group</code> と <code>--end-group</code> を使用して複数の <code>.a</code> ファイルをリンク。これはGNU ldやGoldリンカで必要です。ただし、Mac/iOSリンカやLLDでは不要です。</li><li><strong>command</strong>: リンクコマンド。<code>$link</code> を使用し、必要なフラグや入力ファイルを指定して実行ファイルを作成します。</li><li><strong>outputs</strong>: 出力ファイルのリスト。</li><li><strong>description</strong>: リンクタスクの説明。</li><li><strong>pool</strong>: <code>link_pool_depth</code> が0以上の場合、リンクプールを設定。</li></ul></li></ul><h3 id="スタンプツールの設定-stamp-1" tabindex="-1">スタンプツールの設定 (<code>stamp</code>) <a class="header-anchor" href="#スタンプツールの設定-stamp-1" aria-label="Permalink to &quot;スタンプツールの設定 (\`stamp\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;stamp&quot;) {</span></span>
<span class="line"><span>  command = &quot;$stamp {{output}}&quot;</span></span>
<span class="line"><span>  description = &quot;stamp {{output}}&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>command</strong>: スタンプコマンド。<code>$stamp</code> を使用して出力ファイルをスタンプします。</li><li><strong>description</strong>: スタンプタスクの説明。</li></ul></li></ul><h3 id="コピーツールの設定-copy-1" tabindex="-1">コピーツールの設定 (<code>copy</code>) <a class="header-anchor" href="#コピーツールの設定-copy-1" aria-label="Permalink to &quot;コピーツールの設定 (\`copy\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;copy&quot;) {</span></span>
<span class="line"><span>  cp_py = rebase_path(&quot;../cp.py&quot;)</span></span>
<span class="line"><span>  command = &quot;python3 \\&quot;$cp_py\\&quot; {{source}} {{output}}&quot;</span></span>
<span class="line"><span>  description = &quot;copy {{source}} {{output}}&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>cp_py</strong>: コピー用のPythonスクリプト <code>cp.py</code> のパス。</li><li><strong>command</strong>: コピーコマンド。<code>python3</code> を使用して <code>cp.py</code> スクリプトを実行し、ソースファイルを出力ファイルにコピーします。</li><li><strong>description</strong>: コピータスクの説明。</li></ul></li></ul><h3 id="バンドルデータのコピーツールの設定-copy-bundle-data" tabindex="-1">バンドルデータのコピーツールの設定 (<code>copy_bundle_data</code>) <a class="header-anchor" href="#バンドルデータのコピーツールの設定-copy-bundle-data" aria-label="Permalink to &quot;バンドルデータのコピーツールの設定 (\`copy_bundle_data\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;copy_bundle_data&quot;) {</span></span>
<span class="line"><span>  cp_py = rebase_path(&quot;../cp.py&quot;)</span></span>
<span class="line"><span>  command = &quot;python3 \\&quot;$cp_py\\&quot; {{source}} {{output}}&quot;</span></span>
<span class="line"><span>  description = &quot;copy_bundle_data {{source}} {{output}}&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>cp_py</strong>: コピー用のPythonスクリプト <code>cp.py</code> のパス。</li><li><strong>command</strong>: コピーコマンド。<code>python3</code> を使用して <code>cp.py</code> スクリプトを実行し、バンドルデータをコピーします。</li><li><strong>description</strong>: バンドルデータのコピータスクの説明。</li></ul></li></ul><h3 id="xcodeアセットのコンパイルツールの設定-compile-xcassets" tabindex="-1">Xcodeアセットのコンパイルツールの設定 (<code>compile_xcassets</code>) <a class="header-anchor" href="#xcodeアセットのコンパイルツールの設定-compile-xcassets" aria-label="Permalink to &quot;Xcodeアセットのコンパイルツールの設定 (\`compile_xcassets\`)&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tool(&quot;compile_xcassets&quot;) {</span></span>
<span class="line"><span>  command = &quot;true&quot;</span></span>
<span class="line"><span>  description = &quot;compile_xcassets {{output}}&quot;</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>command</strong>: ダミーコマンド <code>true</code> を設定。現在、Xcodeアセットのコンパイルは不要なため、何もしません。</li><li><strong>description</strong>: Xcodeアセットのコンパイルタスクの説明。</li></ul></li></ul><h3 id="ツールチェインの引数設定-1" tabindex="-1">ツールチェインの引数設定 <a class="header-anchor" href="#ツールチェインの引数設定-1" aria-label="Permalink to &quot;ツールチェインの引数設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>toolchain_args = {</span></span>
<span class="line"><span>  current_cpu = invoker.cpu</span></span>
<span class="line"><span>  current_os = invoker.os</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><strong>toolchain_args</strong>: 現在のCPUとOSの情報を設定します。<code>invoker.cpu</code> と <code>invoker.os</code> を使用します。</li></ul></li></ul><h3 id="標準的なgccライクツールチェインの設定" tabindex="-1">標準的なGCCライクツールチェインの設定 <a class="header-anchor" href="#標準的なgccライクツールチェインの設定" aria-label="Permalink to &quot;標準的なGCCライクツールチェインの設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc_like_toolchain(&quot;gcc_like&quot;) {</span></span>
<span class="line"><span>  cpu = current_cpu</span></span>
<span class="line"><span>  os = current_os</span></span>
<span class="line"><span>  ar = target_ar</span></span>
<span class="line"><span>  cc = target_cc</span></span>
<span class="line"><span>  cxx = target_cxx</span></span>
<span class="line"><span>  link = target_link</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>gcc_like_toolchain(&quot;gcc_like&quot;)</code> は標準的なGCCライクツールチェインを定義します。</li><li><code>cpu</code> と <code>os</code> はそれぞれ <code>current_cpu</code> と <code>current_os</code> に設定されます。</li><li><code>ar</code>、<code>cc</code>、<code>cxx</code>、<code>link</code> は、それぞれターゲット環境用のアーカイブ、Cコンパイラ、C++コンパイラ、リンカのパスを設定します。</li></ul></li></ul><h3 id="ホスト環境用gccライクツールチェインの設定" tabindex="-1">ホスト環境用GCCライクツールチェインの設定 <a class="header-anchor" href="#ホスト環境用gccライクツールチェインの設定" aria-label="Permalink to &quot;ホスト環境用GCCライクツールチェインの設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>gcc_like_toolchain(&quot;gcc_like_host&quot;) {</span></span>
<span class="line"><span>  cpu = host_cpu</span></span>
<span class="line"><span>  os = host_os</span></span>
<span class="line"><span>  ar = host_ar</span></span>
<span class="line"><span>  cc = host_cc</span></span>
<span class="line"><span>  cxx = host_cxx</span></span>
<span class="line"><span>  link = host_link</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>gcc_like_toolchain(&quot;gcc_like_host&quot;)</code> はホスト環境用のGCCライクツールチェインを定義します。</li><li><code>cpu</code> と <code>os</code> はそれぞれ <code>host_cpu</code> と <code>host_os</code> に設定されます。</li><li><code>ar</code>、<code>cc</code>、<code>cxx</code>、<code>link</code> は、それぞれホスト環境用のアーカイブ、Cコンパイラ、C++コンパイラ、リンカのパスを設定します。</li></ul></li></ul><h3 id="webassembly-wasm-用ツールチェインの設定" tabindex="-1">WebAssembly（WASM）用ツールチェインの設定 <a class="header-anchor" href="#webassembly-wasm-用ツールチェインの設定" aria-label="Permalink to &quot;WebAssembly（WASM）用ツールチェインの設定&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>if (is_wasm) {</span></span>
<span class="line"><span>  gcc_like_toolchain(&quot;wasm&quot;) {</span></span>
<span class="line"><span>    cpu = &quot;wasm&quot;</span></span>
<span class="line"><span>    os = &quot;wasm&quot;</span></span>
<span class="line"><span>    if (host_os == &quot;win&quot;) {</span></span>
<span class="line"><span>      ar = &quot;$skia_emsdk_dir/upstream/emscripten/emar.bat&quot;</span></span>
<span class="line"><span>      cc = &quot;$skia_emsdk_dir/upstream/emscripten/emcc.bat&quot;</span></span>
<span class="line"><span>      cxx = &quot;$skia_emsdk_dir/upstream/emscripten/em++.bat&quot;</span></span>
<span class="line"><span>    } else {</span></span>
<span class="line"><span>      ar = &quot;$skia_emsdk_dir/upstream/emscripten/emar&quot;</span></span>
<span class="line"><span>      cc = &quot;$skia_emsdk_dir/upstream/emscripten/emcc&quot;</span></span>
<span class="line"><span>      cxx = &quot;$skia_emsdk_dir/upstream/emscripten/em++&quot;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    link = cxx</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><ul><li><strong>説明</strong>: <ul><li><code>is_wasm</code> が <code>true</code> の場合、WebAssembly（WASM）用のGCCライクツールチェインを定義します。</li><li><code>cpu</code> と <code>os</code> はそれぞれ <code>&quot;wasm&quot;</code> に設定されます。</li><li><strong>Windowsの場合</strong>: <ul><li><code>ar</code>、<code>cc</code>、<code>cxx</code> はそれぞれ、<code>$skia_emsdk_dir/upstream/emscripten</code> ディレクトリにある <code>emar.bat</code>、<code>emcc.bat</code>、<code>em++.bat</code> を使用します。</li></ul></li><li><strong>その他のプラットフォームの場合</strong>: <ul><li><code>ar</code>、<code>cc</code>、<code>cxx</code> はそれぞれ、<code>$skia_emsdk_dir/upstream/emscripten</code> ディレクトリにある <code>emar</code>、<code>emcc</code>、<code>em++</code> を使用します。</li></ul></li><li><code>link</code> は <code>cxx</code> に設定します。</li></ul></li></ul>`,27))])}const b=e(c,[["render",u]]);export{m as __pageData,b as default};
