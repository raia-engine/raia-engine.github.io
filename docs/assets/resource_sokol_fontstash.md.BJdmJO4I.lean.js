import{_ as t,c as o,a2 as n,o as a}from"./chunks/framework.CuCbyi2k.js";const f=JSON.parse('{"title":"HOW TO","description":"","frontmatter":{},"headers":[],"relativePath":"resource/sokol/fontstash.md","filePath":"resource/sokol/fontstash.md","lastUpdated":null}'),s={name:"resource/sokol/fontstash.md"};function r(l,e,i,d,c,p){return a(),o("div",null,e[0]||(e[0]=[n(`<p>sokol_fontstash.h -- renderer for <a href="https://github.com/memononen/fontstash" target="_blank" rel="noreferrer">https://github.com/memononen/fontstash</a> on top of sokol_gl.h</p><p>Project URL: <a href="https://github.com/floooh/sokol" target="_blank" rel="noreferrer">https://github.com/floooh/sokol</a></p><p>Do this: #define SOKOL_IMPL or #define SOKOL_FONTSTASH_IMPL</p><p>before you include this file in <em>one</em> C or C++ file to create the implementation.</p><p>The following defines are used by the implementation to select the platform-specific embedded shader code (these are the same defines as used by sokol_gfx.h and sokol_app.h):</p><p>SOKOL_GLCORE33 SOKOL_GLES2 SOKOL_GLES3 SOKOL_D3D11 SOKOL_METAL</p><p>...optionally provide the following macros to override defaults:</p><p>SOKOL_ASSERT(c) - your own assert macro (default: assert(c)) SOKOL_FONTSTASH_API_DECL - public function declaration prefix (default: extern) SOKOL_API_DECL - same as SOKOL_FONTSTASH_API_DECL SOKOL_API_IMPL - public function implementation prefix (default: -) SOKOL_UNREACHABLE() - a guard macro for unreachable code (default: assert(false))</p><p>Include the following headers before including sokol_fontstash.h:</p><pre><code>sokol_gfx.h
</code></pre><p>Additionally include the following headers for including the sokol_fontstash.h implementation:</p><pre><code>sokol_gl.h
</code></pre><h1 id="how-to" tabindex="-1">HOW TO <a class="header-anchor" href="#how-to" aria-label="Permalink to &quot;HOW TO&quot;">​</a></h1><p>--- First initialize sokol-gfx and sokol-gl as usual:</p><pre><code>    sg_setup(&amp;(sg_desc){...});
    sgl_setup(&amp;(sgl_desc){...});
</code></pre><p>--- Create at least one fontstash context with sfons_create() (this replaces glfonsCreate() from fontstash.h&#39;s example GL renderer:</p><pre><code>    FONScontext* ctx = sfons_create(&amp;(sfons_desc_t){
        .width = atlas_width,
        .height = atlas_height,
    });

Each FONScontext manages one font atlas texture which can hold rasterized
glyphs for multiple fonts.
</code></pre><p>--- From here on, use fontstash.h&#39;s functions &quot;as usual&quot; to add TTF font data and draw text. Note that (just like with sokol-gl), text rendering can happen anywhere in the frame, not only inside a sokol-gfx rendering pass.</p><p>--- You can use the helper function</p><pre><code>    uint32_t sfons_rgba(uint8_t r, uint8_t g, uint8_t b, uint8_t a)

To convert a 0..255 RGBA color into a packed uint32_t color value
expected by fontstash.h.
</code></pre><p>--- Once per frame before calling sgl_draw(), call:</p><pre><code>    sfons_flush(FONScontext* ctx)

...this will update the dynamic sokol-gfx texture with the latest font
atlas content.
</code></pre><p>--- To actually render the text (and any other sokol-gl draw commands), call sgl_draw() inside a sokol-gfx frame.</p><p>--- NOTE that you can mix fontstash.h calls with sokol-gl calls to mix text rendering with sokol-gl rendering. You can also use sokol-gl&#39;s matrix stack to position fontstash.h text in 3D.</p><p>--- finally on application shutdown, call:</p><pre><code>    sfons_destroy(FONScontext* ctx)

before sgl_shutdown() and sg_shutdown()
</code></pre><h1 id="what-happens-under-the-hood" tabindex="-1">WHAT HAPPENS UNDER THE HOOD: <a class="header-anchor" href="#what-happens-under-the-hood" aria-label="Permalink to &quot;WHAT HAPPENS UNDER THE HOOD:&quot;">​</a></h1><p>FONScontext* sfons_create(const sfons_desc_t* desc) - creates a sokol-gfx shader compatible with sokol-gl - creates an sgl_pipeline object with alpha-blending using this shader - creates a 1-byte-per-pixel font atlas texture via sokol-gfx (pixel format SG_PIXELFORMAT_R8)</p><p>fonsDrawText(): - this will call the following sequence of sokol-gl functions:</p><pre><code>    sgl_enable_texture();
    sgl_texture(...);
    sgl_push_pipeline();
    sgl_load_pipeline(...);
    sgl_begin_triangles();
    for each vertex:
        sgl_v2f_t2f_c1i(...);
    sgl_end();
    sgl_pop_pipeline();
    sgl_disable_texture();

- note that sokol-gl will merge several sgl_*_begin/sgl_end pairs
  into a single draw call if no relevant state has changed, typically
  all calls to fonsDrawText() will be merged into a single draw call
  as long as all calls use the same FONScontext
</code></pre><p>sfons_flush(FONScontext* ctx): - this will call sg_update_image() on the font atlas texture if fontstash.h has added any rasterized glyphs since the last frame</p><p>sfons_destroy(FONScontext* ctx): - destroy the font atlas texture, sgl_pipeline and sg_shader objects</p><h1 id="memory-allocation-override" tabindex="-1">MEMORY ALLOCATION OVERRIDE <a class="header-anchor" href="#memory-allocation-override" aria-label="Permalink to &quot;MEMORY ALLOCATION OVERRIDE&quot;">​</a></h1><p>You can override the memory allocation functions at initialization time like this:</p><pre><code>void* my_alloc(size_t size, void* user_data) {
    return malloc(size);
}

void my_free(void* ptr, void* user_data) {
    free(ptr);
}

...
FONScontext* fons_context = sfons_create(&amp;(sfons_desc_t){
    ...
    .allocator = {
        .alloc = my_alloc,
        .free = my_free,
        .user_data = ...,
    }
});
...
</code></pre><p>If no overrides are provided, malloc and free will be used. Please note that this doesn&#39;t affect any memory allocation performed in fontstash.h (unfortunately those are hardwired to malloc/free).</p><h1 id="license" tabindex="-1">LICENSE <a class="header-anchor" href="#license" aria-label="Permalink to &quot;LICENSE&quot;">​</a></h1><p>zlib/libpng license</p><p>Copyright (c) 2018 Andre Weissflog</p><p>This software is provided &#39;as-is&#39;, without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.</p><p>Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:</p><pre><code>1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software in a
product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not
be misrepresented as being the original software.

3. This notice may not be removed or altered from any source
distribution.
</code></pre>`,42)]))}const u=t(s,[["render",r]]);export{f as __pageData,u as default};
