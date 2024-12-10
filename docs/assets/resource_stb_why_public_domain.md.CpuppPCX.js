import{_ as n,c as a,a2 as p,o as l}from"./chunks/framework.CKGreiRV.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"resource/stb/why_public_domain.md","filePath":"resource/stb/why_public_domain.md","lastUpdated":1732350347000}'),e={name:"resource/stb/why_public_domain.md"};function i(t,s,c,o,r,d){return l(),a("div",null,s[0]||(s[0]=[p(`<p>私が集めた、これらのライブラリをパブリックドメインにする根拠。</p><ol><li>パブリックドメインとバイラルライセンスの比較</li></ol><p>なぜこのライブラリはパブリックドメインなのか？より多くの人が使うからです。バイラルではないので、人々は還元する義務がありません。そのため、開発に支障をきたし、開発が進まないので、あまり良くないと主張することもできますし、良くないので、長い目で見れば、使う人が少なくなるかもしれません。その意見には全く敬意を表しますが、私自身はほとんどのソフトウェアでそう思っていません。</p><ol start="2"><li>パブリックドメインと帰属が必要なライセンス</li></ol><p>パブリックドメインと、たとえばクリエイティブ・コモンズの商用/非共有類似/帰属ライセンスの主な違いは、単に帰属の要件だけです。(同様にBSDライセンスやそのようなもの) わたしは謝意と帰属を<em>感謝しますが、帰属を得るために</em>単独で*ソフトウェアに法的拘束(すなわちライセンス)を置くのは愚かなことだと思います。</p><p>言い換えれば、わたしはPDがBSDライセンスやクリエイティブ・コモンズの「帰属」ライセンスよりも優れていると主張しているのです。もしライセンスが帰属以外のものを提供するならば--たとえば、CC NonCommercial-ShareAlikeやGPLのように--それは別の議論になります。</p><ol start="3"><li>BSDスタイル・ライセンスの帰属以外の側面</li></ol><p>zlibやBSDライセンスのような寛容なライセンスは、その要求においては完全に合理的ですが、非常に言葉が多く、パブリックドメインと比較すると二つの利点しかありません: 法的に要求される帰属と責任の制御です。わたしは、これらのライセンスがもたらす過剰な冗長性とユーザへの不親切さに見合うとは思いません。特に、これらのライセンスがファイルの先頭、最初に目に入るところにある傾向がある単一ファイルの場合には、なおさらです。</p><p>具体的な指摘をすると、私は自分のライブラリについて帰属表示を受けることに何の問題もありませんでした。責任についての明示的な免責事項がない場合の責任は未解決の問題ですが、裁判で実際に疑われることを想像するのはかなり難しい問題です。時々、私は自分のライブラリに、それが目的に適っていることを保証しないことを明示的に記しますが、これをするのはかなり無茶です。全体として、それは「ここにvorbisオーディオファイルをデコードするライブラリがありますが、実際には動作しないかもしれないし、もし問題があってもそれは私のせいではありません。</p><ol start="4"><li>stb_howto.txt にある、あなたのライブラリのために何をすべきかについての完全な議論</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>EASY-TO-COMPLY LICENSE</span></span>
<span class="line"><span></span></span>
<span class="line"><span>私は自分のライブラリーをパブリックドメインにしています。あなたがそうする必要はありません。しかし、私がstbスタイルのライブラリをリリースする目的は、潜在的なユーザーの摩擦を可能な限り減らすことです。つまり、以下のようなことです。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  a. easy to build (このファイルの主な内容)</span></span>
<span class="line"><span>  b. easy to invoke (そのため、優れたAPI設計が必要)</span></span>
<span class="line"><span>  c. easy to deploy (というのは、ライセンスについて)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>私は、自分のライブラリーをライセンスするのではなく、著作権を放棄してパブリックドメインに置くことを選択しました。これには利点もあれば欠点もあります。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>改変に対して「ウイルス的」なライセンスは、たとえプログラマーが改変していなくても、弁護士にとって心配の種となる。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ドキュメントにクレジットを要求するようなライセンスは、摩擦を生み、それが積み重なることもあります。Valve は、出荷する各ゲームに含まれるこれらすべてのライセンスの膨大なリスト (http://nothings.org/remote/ThirdPartyLegalNotices_steam_2019.html) を持っていて、それは正気ではありません。明らかに誰もそれを見ていないのに、なぜあなたのクレジットがそこに表示されるかどうかを気にするのでしょうか?</span></span>
<span class="line"><span></span></span>
<span class="line"><span>zlibやBSDライセンスのような寛容なライセンスは完全に合理的ですが、非常に言葉足らずで、パブリックドメインに勝る利点はたった二つ、法的に要求される帰属と責任の制御です。わたしは、これらのライセンスがもたらす過剰な冗長性とユーザへの不親切さに見合うとは思いません。特に、これらのライセンスがファイルの一番上、最初に目に入るところにありがちなシングルファイルの場合には、なおさらです。(具体的な指摘ですが、私は自分のライブラリの帰属表示を受け取るのに何の問題もありませんでした。責任の免責が明示されていない場合の責任については未解決の問題です。)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>しかし、パブリックドメインは、米国などではパブリックドメイン宣言が必ずしも認められていないため、それなりの摩擦がある。そのため、私はこのような線での宣言を推奨しています。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// このソフトウェアは、パブリックドメインと以下のライセンスの二重ライセンスです：あなたは、このファイルをコピー、変更、公開、配布するための永久的かつ取消不能のライセンスを付与されます。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>私は通常、この宣言をファイルの最初のコメントブロックの最後に置き、一番上に「パブリックドメイン」とだけ書いています。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>私のライブラリは「パブリックドメイン」でしかなく、フォールバック条項がないので使えないと言う人がいて、従来のライセンスでデュアルライセンスできないか、と言ってきたことがあります。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>私の答えは、彼らは一文字を変更することで二次的著作物を作成し、それを好きなようにライセンスすることができる、というものです。(実際、zlibやBSDのライセンスを*追加することは、そのような変更になります!) 残念ながら、彼らの弁護士はこの答えを好まなかったと言われています :(</span></span></code></pre></div>`,11)]))}const _=n(e,[["render",i]]);export{b as __pageData,_ as default};
