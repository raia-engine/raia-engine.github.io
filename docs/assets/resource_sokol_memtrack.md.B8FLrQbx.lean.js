import{_ as o,c as t,a2 as a,o as n}from"./chunks/framework.CuCbyi2k.js";const u=JSON.parse('{"title":"USAGE","description":"","frontmatter":{},"headers":[],"relativePath":"resource/sokol/memtrack.md","filePath":"resource/sokol/memtrack.md","lastUpdated":null}'),r={name:"resource/sokol/memtrack.md"};function s(i,e,l,c,p,m){return n(),t("div",null,e[0]||(e[0]=[a(`<p>sokol_memtrack.h -- memory allocation wrapper to track memory usage of sokol libraries</p><p>Project URL: <a href="https://github.com/floooh/sokol" target="_blank" rel="noreferrer">https://github.com/floooh/sokol</a></p><p>Optionally provide the following defines with your own implementations:</p><p>SOKOL_MEMTRACK_API_DECL - public function declaration prefix (default: extern) SOKOL_API_DECL - same as SOKOL_MEMTRACK_API_DECL SOKOL_API_IMPL - public function implementation prefix (default: -)</p><p>If sokol_memtrack.h is compiled as a DLL, define the following before including the declaration or implementation:</p><p>SOKOL_DLL</p><h1 id="usage" tabindex="-1">USAGE <a class="header-anchor" href="#usage" aria-label="Permalink to &quot;USAGE&quot;">​</a></h1><p>Just plug the malloc/free wrapper functions into the desc.allocator struct provided by most sokol header setup functions:</p><pre><code>sg_setup(&amp;(sg_desc){
    //...
    .allocator = {
        .alloc = smemtrack_alloc,
        .free = smemtrack_free,
    }
});
</code></pre><p>Then call smemtrack_info() to get information about current number of allocations and overall allocation size:</p><pre><code>const smemtrack_info_t info = smemtrack_info();
const int num_allocs = info.num_allocs;
const int num_bytes = info.num_bytes;
</code></pre><p>Note the sokol_memtrack.h can only track allocations issued by the sokol headers, not allocations that happen under the hood in system libraries.</p><h1 id="license" tabindex="-1">LICENSE <a class="header-anchor" href="#license" aria-label="Permalink to &quot;LICENSE&quot;">​</a></h1><p>zlib/libpng license</p><p>Copyright (c) 2018 Andre Weissflog</p><p>This software is provided &#39;as-is&#39;, without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.</p><p>Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:</p><pre><code>1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software in a
product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not
be misrepresented as being the original software.

3. This notice may not be removed or altered from any source
distribution.
</code></pre>`,18)]))}const f=o(r,[["render",s]]);export{u as __pageData,f as default};
