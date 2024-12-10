import{_ as a,c as n,a2 as i,o as p}from"./chunks/framework.CKGreiRV.js";const k=JSON.parse('{"title":"Natural Docsによるコードの文書化（日本語訳）","description":"","frontmatter":{},"headers":[],"relativePath":"resource/natural-docs/getting_started/documenting_you_code.md","filePath":"resource/natural-docs/getting_started/documenting_you_code.md","lastUpdated":1732720247000}'),e={name:"resource/natural-docs/getting_started/documenting_you_code.md"};function l(t,s,h,c,r,d){return p(),n("div",null,s[0]||(s[0]=[i(`<h1 id="natural-docsによるコードの文書化-日本語訳" tabindex="-1">Natural Docsによるコードの文書化（日本語訳） <a class="header-anchor" href="#natural-docsによるコードの文書化-日本語訳" aria-label="Permalink to &quot;Natural Docsによるコードの文書化（日本語訳）&quot;">​</a></h1><p><a href="https://www.naturaldocs.org/getting_started/documenting_your_code/" target="_blank" rel="noreferrer">原文</a></p><h2 id="基本" tabindex="-1">基本 <a class="header-anchor" href="#基本" aria-label="Permalink to &quot;基本&quot;">​</a></h2><p>いよいよコードの文書化を開始するときが来ました。文書化を非常に簡単かつ苦痛にならないようにするため、すぐに飛び込んでみましょう。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Function: Multiply</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Multiplies two integers and returns the result.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Multiply</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> y</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    {  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> y;  }</span></span></code></pre></div><p>必要なのはこれだけです。Natural Docsを実行するとこのような出力が表示されます。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Multiply</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int Multiply (	</span></span>
<span class="line"><span>int 	x,</span></span>
<span class="line"><span>int 	y</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Multiplies two integers and returns the result.</span></span></code></pre></div><p>各コメントは簡単なものから詳細なものまで自由に作ることができます。以下は、より凝ったものです。明らかにやりすぎですが、あくまでデモンストレーションです。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* Function: Multiply</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   Multiplies two integers.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   Parameters:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      x - The first integer.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      y - The second integer.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   Returns:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      The two integers multiplied together.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   See Also:</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">      Divide</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">*/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Multiply</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> y</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> x </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> y;  }</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Multiply</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int Multiply (	</span></span>
<span class="line"><span>int 	x,</span></span>
<span class="line"><span>int 	y</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Multiplies two integers.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Parameters</span></span>
<span class="line"><span>x</span></span>
<span class="line"><span>int</span></span>
<span class="line"><span>The first integer.</span></span>
<span class="line"><span>y</span></span>
<span class="line"><span>int</span></span>
<span class="line"><span>The second integer.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Returns</span></span>
<span class="line"><span>The two integers multiplied together.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>See Also</span></span>
<span class="line"><span>Divide</span></span></code></pre></div><p>それでもあまり怖くはないでしょう？ コメントも出力と同じように読みやすいものです。タグが散乱しているわけでもなく、構造も非常に自然です。見ただけでわかると思いますが、とりあえず1つずつ見ていきましょう。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Function: Multiply</span></span></code></pre></div><p>コメントはどれも「キーワード: タイトル」という形式の行から始まることになります。キーワードはたくさんありますが、それらはあなたが期待する通りのものです。関数、クラス、変数など。また同義語や略語も多く、Functionの代わりにFunc・Procedure・Methodなどを使うこともできます。このように何も覚えなくても記述しているものをそのまま使えるように設計されています。キーワードリストに目を通すことができますが、あまり頻繁に参照する必要はないでしょう。</p><p>この行のもう一つの部分はタイトルです。これはあなたが文書化しているもの、この場合は関数名Multiplyと一致させる必要があります。Natural Docsはプログラミング言語の大文字と小文字を区別しないので、正確に一致させないと出力にプロトタイプ（関数宣言を示す小さな灰色のボックス）が表示されない可能性があることに注意してください。タイトルにパラメータを含める必要はありません。 むしろ、そうしないほうがよいでしょう。</p><p>コメント記号は /** などの特別なものを使う必要はありません。重要なのは「キーワード: タイトル」の行で始まることだけです。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Parameters:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Returns:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>See Also:</span></span></code></pre></div><p>また、行を飛ばしてコロンでテキストを終了させることによっても見出しを定義することができます。他のドキュメントシステムに慣れていると選べる見出しはほんの一握りだと思うかもしれませんが、この方法でフォーマットされたテキストはすべて見出しになります。もし、Dependenciesという見出しを付けたいのであれば、そのまま追加してください。ただタイトルケース（本のタイトルのようにほとんどの単語を大文字にすること）を使用する必要があることに注意してください。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>x - The first integer.</span></span>
<span class="line"><span>y - The second integer.</span></span></code></pre></div><p>これはいわゆる定義リストと呼ばれるものです。行を飛ばすまで止まらないので複数の行を使って定義を終わらせることができます。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>x - The first integer.</span></span>
<span class="line"><span>y - The second integer with a long description.</span></span>
<span class="line"><span>    This is still part of the description.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>This is a new paragraph because we skipped a line</span></span>
<span class="line"><span>and didn&#39;t indent.</span></span></code></pre></div><p>2行目は1行目と同じようにずっとインデントする必要はありませんが、少なくともスペース2つ分インデントする必要があります。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&lt;Divide&gt;</span></span></code></pre></div><p>これがNatural Docsでのリンクの仕方で角括弧を使います。これについては後で詳しく説明しますが、今はクールなものをお見せします。下の出力でマウスをその上に持っていってください。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Divide</span></span></code></pre></div><p>生成されたドキュメントのいたるところでこのようなことが書かれていますね。</p><h2 id="クラスと範囲" tabindex="-1">クラスと範囲 <a class="header-anchor" href="#クラスと範囲" aria-label="Permalink to &quot;クラスと範囲&quot;">​</a></h2><p>しかし、有用性に疑問のあるクラス全体がある場合はどうでしょうか。各要素のすぐ上にNatural Docsのコメントを付けて個々の関数をドキュメント化したのと同じように、クラスとそのメンバーをドキュメント化することができます。この例では管理しやすいように短い説明文に戻します。</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Class: Counter</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// A class that manages an incrementing counter.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">public </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Counter</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // Constructor: Counter</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // Initializes the object.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   public </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Counter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {  value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // Function: Increment</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // Adds one to the counter.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   public </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Increment</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {  value</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // Property: Value</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // Returns the value of the counter.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   public </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Value</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      get</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">         {  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> value;  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // Variable: value</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   // The value of the counter.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   private </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> value;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   }</span></span></code></pre></div><p>すべて同じでClass、Property、VariableをFunctionキーワードに置き換えただけです。Constructorも使いましたが、これもFunctionと同じように簡単に使うことができます。どちらも同じものを表すキーワードなので問題ありません。</p><h3 id="対象範囲" tabindex="-1">対象範囲 <a class="header-anchor" href="#対象範囲" aria-label="Permalink to &quot;対象範囲&quot;">​</a></h3><p>ソースコード自体と同様にNatural Docsのコメントにはスコープがあります。ValueとIncrementはコードにあるようにクラスCounterの一部と見なされます。なぜこれが重要なのでしょうか。リンクです。あるコメントから別のコメントへのリンクは、ある関数が別の関数を呼び出す方法と同様の規則があります。ValueはIncrementと同じクラスなので、そのコメントは単に<code>&lt;Increment&gt;</code>でリンクすることができます。しかし、別のクラスからIncrementにリンクする場合は、代わりに<code>&lt;Counter.Increment&gt;</code>が必要です。実際には、3つの最も一般的なクラス/メンバの記法を使用できます。<code>&lt;Counter.Increment&gt;</code>、<code>&lt;Counter::Increment&gt;</code>、そして<code>&lt;Counter-&gt;Increment&gt;</code>です。</p><p>プログラミング言語が完全な言語サポートを持っている場合、スコープはコードによって決定され、自動的に適用されます。しかし、基本的な言語サポートしかない場合は、以下のルールに従います。</p><ul><li>Class のコメント（または Starts Scope と書かれたもの）の後に表示されるコメントは、そのクラスの一部となります。</li><li>Section コメント（または Ends Scope と書かれたもの）の後に表示されるコメントはすべて、再びグローバルになります。</li><li>Fileコメント（またはAlways Globalと書かれたもの）は、何があってもグローバルであり、他のコメントには影響しません。</li></ul><p>これを知らなくても同じことを書いていて、そのまま通用した可能性があります。通常は全く考える必要はないでしょう。しかし、何かがあなたの期待通りに動作しない場合に備えて、これらのルールを意識しておくのは良いことです。<a href="https://www.naturaldocs.org/reference/scope" target="_blank" rel="noreferrer">リファレンスの全文</a>はもっと詳しく書かれています。</p><p>あなたは今、ドキュメントを書き始めるのに十分な知識を持っています。もっと学べることはありますが、それらは付加的なものです。</p><h2 id="その他の書式" tabindex="-1">その他の書式 <a class="header-anchor" href="#その他の書式" aria-label="Permalink to &quot;その他の書式&quot;">​</a></h2><h3 id="段落、太字、下線" tabindex="-1">段落、太字、下線 <a class="header-anchor" href="#段落、太字、下線" aria-label="Permalink to &quot;段落、太字、下線&quot;">​</a></h3><p>これらの構文は非常に簡単です。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>*Bold text*</span></span>
<span class="line"><span></span></span>
<span class="line"><span>_Underlined text_</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Paragraphs are broken by skipping lines.  So the two</span></span>
<span class="line"><span>lines above each have their own paragraph, but these</span></span>
<span class="line"><span>three lines are all part of the same one.</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Bold text</span></span>
<span class="line"><span>Underlined text</span></span>
<span class="line"><span>Paragraphs are broken by skipping lines.  So the two lines above each have their own paragraph, but these three lines are all part of the same one.</span></span></code></pre></div><p>複数の単語に下線を引く場合、それぞれのスペースにアンダースコアを使うこともできますし、上記のように端につけることもできます。どちらの方法も有効です。</p><h3 id="箇条書きリスト" tabindex="-1">箇条書きリスト <a class="header-anchor" href="#箇条書きリスト" aria-label="Permalink to &quot;箇条書きリスト&quot;">​</a></h3><p>行頭にダッシュやアスタリスクを付けると、箇条書きにすることができます。内容は複数行にまたがることがあるので、終わらせるには1行飛ばす必要があります。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>- Bullet one.</span></span>
<span class="line"><span>- Bullet two.</span></span>
<span class="line"><span>  Bullet two continued.</span></span>
<span class="line"><span>- Bullet three.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Some text after the bullet list.</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Bullet one.</span></span>
<span class="line"><span>Bullet two.  Bullet two continued.</span></span>
<span class="line"><span>Bullet three.</span></span>
<span class="line"><span>Some text after the bullet list.</span></span></code></pre></div><p>各レベルが前のレベルより少なくとも2スペース以上インデントされていれば、複数のレベルを持つことができます。また、1つの箇条書きの中に複数の段落があっても、そこから少なくとも2つのスペースでインデントされていれば問題ありません。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>* Level one.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  * Level two, first paragraph.</span></span>
<span class="line"><span>    Level two, first paragraph continued.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    Level two, second paragraph.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>      * Level three.</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Level one.</span></span>
<span class="line"><span>Level two, first paragraph.  Level two, first paragraph continued.</span></span>
<span class="line"><span>Level two, second paragraph.</span></span>
<span class="line"><span>Level three.</span></span></code></pre></div><h3 id="定義リスト" tabindex="-1">定義リスト <a class="header-anchor" href="#定義リスト" aria-label="Permalink to &quot;定義リスト&quot;">​</a></h3><p>定義リストは「項目 - 定義」という形式の行です。箇条書きのリストと同様、行を飛ばすまで続き、インデントされていれば定義の中に複数の段落を持つことができます。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Item 1 - The first paragraph.</span></span>
<span class="line"><span>         The first paragraph continued.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         The second paragraph</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Item 2 - The first paragraph.</span></span>
<span class="line"><span>  The first paragraph continued.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  The second paragraph.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Some text after the definition list.</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Item 1	</span></span>
<span class="line"><span>The first paragraph.  The first paragraph continued.</span></span>
<span class="line"><span>The second paragraph</span></span>
<span class="line"><span>Item 2	</span></span>
<span class="line"><span>The first paragraph.  The first paragraph continued.</span></span>
<span class="line"><span>The second paragraph.</span></span>
<span class="line"><span>Some text after the definition list.</span></span></code></pre></div><p>関数を文書化し、パラメータ（またはパラメータ、引数など）という見出しの下に定義リストを置くとNatural Docsは自動的にプロトタイプでそれぞれを検索し、リストにそのタイプを含めます。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* Function: MyFunction</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * Parameters:</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *    x - Description of x.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *    y - Description of y.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> *    z - Description of z.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> MyFunction</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> x</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, string </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">y</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, Counter </span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">z</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   { ... }</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Parameters</span></span>
<span class="line"><span>x</span></span>
<span class="line"><span>int</span></span>
<span class="line"><span>Description of x.</span></span>
<span class="line"><span>y</span></span>
<span class="line"><span>string</span></span>
<span class="line"><span>Description of y.</span></span>
<span class="line"><span>z</span></span>
<span class="line"><span>Counter</span></span>
<span class="line"><span>Description of z.</span></span></code></pre></div><p>Counterのような文書化されたタイプの場合、その定義へのリンクとなり、マウスを乗せると概要がポップアップ表示されます。</p><h3 id="コードとテキスト図" tabindex="-1">コードとテキスト図 <a class="header-anchor" href="#コードとテキスト図" aria-label="Permalink to &quot;コードとテキスト図&quot;">​</a></h3><p>コードのセクションを追加するには、少なくとも3つのダッシュ・等号・またはアンダースコアで行を開始し、「Code」を続けてください。同じ記号が3つ以上並ぶ別の行が現れるまで続けられます。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>This is a normal paragraph.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>--- Code</span></span>
<span class="line"><span>int x = 12;</span></span>
<span class="line"><span>int y = 0;</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>This is a normal paragraph.</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>This is a normal paragraph.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int x = 12;</span></span>
<span class="line"><span>int y = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>This is a normal paragraph.</span></span></code></pre></div><p>必要なら3文字以上使ってもよいですし、また、その方が視覚的にはっきりするのであれば、キーワードの後にもっと続けても構いません。</p><p>また、Codeの代わりに言語名を指定すると、正しいシンタックスハイライトが使用されます。また、Textを使用するとハイライトを全く使用せず、各ブロックを個別に閉じることなく、あるモードから別のモードへ切り替えることができます。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>This is a normal paragraph.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>======= C# =======</span></span>
<span class="line"><span>int x = 12;</span></span>
<span class="line"><span>int y = 0;</span></span>
<span class="line"><span>====== Perl ======</span></span>
<span class="line"><span>my $x = 12;</span></span>
<span class="line"><span>my $y = 0;</span></span>
<span class="line"><span>====== Text ======</span></span>
<span class="line"><span>This is plain text</span></span>
<span class="line"><span>==================</span></span>
<span class="line"><span></span></span>
<span class="line"><span>This is a normal paragraph.</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>This is a normal paragraph.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int x = 12;</span></span>
<span class="line"><span>int y = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>my $x = 12;</span></span>
<span class="line"><span>my $y = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>This is plain text</span></span>
<span class="line"><span></span></span>
<span class="line"><span>This is a normal paragraph.</span></span></code></pre></div><p>もし、ここやあそこに簡単な行を入れたいだけなら、それぞれの行を「&gt;」「|」または「:」で始めることができます。ただし、ハイライトはされません。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>This is a normal paragraph.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; int x = 12;</span></span>
<span class="line"><span>&gt; int y = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>This is a normal paragraph.</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>This is a normal paragraph.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int x = 12;</span></span>
<span class="line"><span>int y = 0;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>This is a normal paragraph.</span></span></code></pre></div><h2 id="リンクの詳細" tabindex="-1">リンクの詳細 <a class="header-anchor" href="#リンクの詳細" aria-label="Permalink to &quot;リンクの詳細&quot;">​</a></h2><p>リンクにはまだ続きがあります。URLやメールアドレスにリンクすることができますが、この場合、角括弧は任意です。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Visit &lt;http://www.website.com&gt; or send messages to email@address.com.</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Visit http://​www​.website​.com or send messages to email@address.com.</span></span></code></pre></div><p>テキスト、「at」、そしてアドレスを角括弧に入れることで、名前付きリンクを作成することができます。この形式だと、文章の中で自然に読むことができます。また、「at」の代わりにコロンを使用することもできます。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Visit &lt;the website: http://www.website.com&gt; or &lt;e-mail me at email@address.com&gt;.</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Visit the website or e-mail me.</span></span></code></pre></div><p>電子メールアドレスは、見た目は通常のリンクと同じですが、HTMLが難読化されており、スパム・クローラーから保護することができます。</p><h3 id="複数形と所有格" tabindex="-1">複数形と所有格 <a class="header-anchor" href="#複数形と所有格" aria-label="Permalink to &quot;複数形と所有格&quot;">​</a></h3><p>通常のリンクについては、文章になじみやすいように、角括弧の中に複数形や所有格を入れることができます。言い換えれば、<code>&lt;Object&gt;</code>sのような使いにくい構文を使用する必要はありません（それもサポートされています）。単純に<code>&lt;Objects&gt;</code>と書けば、シンボルObjectにうまくリンクしてくれます。複数形や所有格など、どのような形でも扱うことができます。冗談ではありません。Foxes, Fox&#39;s, Foxes&#39;, Children, Mice, Alumni, Indices, Amoebae, Teeth, などなど、とにかく試してみてください。</p><h2 id="追加ドキュメント" tabindex="-1">追加ドキュメント <a class="header-anchor" href="#追加ドキュメント" aria-label="Permalink to &quot;追加ドキュメント&quot;">​</a></h2><p>時にはコード要素に直接対応しないドキュメントを含めたいことがあります。例えば、ライセンス情報やアーキテクチャの注記を含めたい場合です。これには2つの方法があります。</p><h3 id="単体でのコメント" tabindex="-1">単体でのコメント <a class="header-anchor" href="#単体でのコメント" aria-label="Permalink to &quot;単体でのコメント&quot;">​</a></h3><p>あなたが書くコメントのほとんどは、ソースコードの要素に直接対応するものですが、そうでなければならないというわけではありません。利用可能なキーワードのいずれかを選び、そのキーワードで独立したコメントを作成することができます。例えば:</p><div class="language-cpp vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">cpp</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* Class: Counter</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * A class that manages an incrementing counter.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">public </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">class</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Counter</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   /* About: Thread Safety</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    * This class is not designed to be thread safe.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   /* Constructor: Counter</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    * Initializes the object.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   public </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Counter</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      {  value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;  }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ...</span></span></code></pre></div><p>余分なコメントは関数と同じように出力に追加されます。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Thread Safety</span></span>
<span class="line"><span>This class is not designed to be thread safe.</span></span></code></pre></div><p>スコープのため、コメントは実際には上記のようにCounterの一部とみなされることを忘れないでください。あなたは、<code>&lt;Counter.Thread Safety&gt;</code>で、Counter の外側からそれにリンクすることになります。この考えには慣れが必要かもしれませんが、もし余分なコメントが1つのクラスだけに適用されるなら、それは実際にそれを行う最も適切な方法です。プロジェクト全体に適用されるライセンスのようなものであれば、関数をそこに移動するのと同じように、それをグローバルにするためにクラスの上に置くことになります。</p><h3 id="テキストファイル" tabindex="-1">テキストファイル <a class="header-anchor" href="#テキストファイル" aria-label="Permalink to &quot;テキストファイル&quot;">​</a></h3><p>また、テキストファイルを使用して追加のドキュメントを追加することもできます。拡張子が.txtのファイルをソースフォルダに置き、「キーワード: タイトル」行で始めると、その内容はソースコード内のコメントと同じように扱われるようになります。つまり、複数の「keyword: title」行を使用して複数の内容を定義したり、ソースコード内のコメントとリンクしたり、利用可能なすべての書式オプションを使用することができるのです。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Title: License</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   This file is licensed under the GPL.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   I can link to &lt;Counter&gt; and &lt;Counter.Increment&gt;, and the</span></span>
<span class="line"><span>   documentation in that class can even link back with &lt;License&gt;.</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>About: Second Topic</span></span>
<span class="line"><span></span></span>
<span class="line"><span>   I can create a *second* topic in here too, complete with</span></span>
<span class="line"><span>   formatting.</span></span></code></pre></div><p>「タイトル」のように「キーワード: タイトル」の行で始めることを忘れてはいけません。上記の「License」のように「keyword: title」行で始めることを忘れてはなりません。これはNatural Docsが通常のテキストファイルと区別する方法です。</p><h2 id="リストの文書化" tabindex="-1">リストの文書化 <a class="header-anchor" href="#リストの文書化" aria-label="Permalink to &quot;リストの文書化&quot;">​</a></h2><p>もう一つ知っておくと便利なことがあります。例えば、定数のような小さなドキュメントをたくさん持っているとします。それぞれに個別のコメントを書くのは、いくら圧縮しても非常に面倒です。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Constant: COUNTER_NORMAL</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Causes the counter to increment normally.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> COUNTER_NORMAL </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Constant: COUNTER_ODD</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Causes the counter to only increment in odd numbers.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> COUNTER_ODD </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Constant: COUNTER_EVEN</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Causes the counter to only increment in even numbers.</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> COUNTER_EVEN </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>キーワードリストを見て、ほとんどすべてのキーワードが複数形であることにお気づきでしょうか。これは、リストコメントと呼ばれるものを作成するために使用されます。複数形のキーワードを使ってコメントを定義すると、その中の定義リストに表示されるものは、あたかもそれぞれがコメントを持っているかのようにリンク可能になります。例えば:</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* Constants: Counter Modes</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   COUNTER_NORMAL - Causes the counter to increment normally.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   COUNTER_ODD    - Causes the counter to only increment in odd numbers.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   COUNTER_EVEN   - Causes the counter to only increment in even numbers.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">*/</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> COUNTER_NORMAL </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> COUNTER_ODD </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> COUNTER_EVEN </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>これで<code>&lt;COUNTER_ODD&gt;</code>と書けば、最初の例と同じように動作するようになります。</p><p>enumキーワードを使用すると、自動的に同様の動作をするため、特別です。これによりenumとその値の両方が同じ場所で文書化されます。</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* Enum: CounterMode</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   Normal - Causes the counter to increment normally.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   Odd    - Causes the counter to only increment in odd numbers.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">   Even   - Causes the counter to only increment in even numbers.</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">*/</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">enum</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> CounterMode { Normal, Odd, Even };</span></span></code></pre></div><p>CounterModeだけでなく、CounterMode.Oddへのリンクも可能になりました。</p>`,98)]))}const g=a(e,[["render",l]]);export{k as __pageData,g as default};
