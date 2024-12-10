import{_ as o,c as n,a2 as t,o as a}from"./chunks/framework.CKGreiRV.js";const c=JSON.parse('{"title":"FEATURE OVERVIEW:","description":"","frontmatter":{},"headers":[],"relativePath":"resource/sokol/nuklear.md","filePath":"resource/sokol/nuklear.md","lastUpdated":1732720247000}'),r={name:"resource/sokol/nuklear.md"};function i(l,e,s,d,p,h){return a(),n("div",null,e[0]||(e[0]=[t(`<p>sokol_nuklear.h -- drop-in Nuklear renderer/event-handler for sokol_gfx.h</p><p>Project URL: <a href="https://github.com/floooh/sokol" target="_blank" rel="noreferrer">https://github.com/floooh/sokol</a></p><p>Do this: #define SOKOL_IMPL or #define SOKOL_NUKLEAR_IMPL</p><p>before you include this file in <em>one</em> C or C++ file to create the implementation.</p><p>The following defines are used by the implementation to select the platform-specific embedded shader code (these are the same defines as used by sokol_gfx.h and sokol_app.h):</p><p>SOKOL_GLCORE33 SOKOL_GLES2 SOKOL_GLES3 SOKOL_D3D11 SOKOL_METAL SOKOL_WGPU</p><p>Optionally provide the following configuration defines before including the implementation:</p><p>SOKOL_NUKLEAR_NO_SOKOL_APP - don&#39;t depend on sokol_app.h (see below for details)</p><p>Optionally provide the following macros before including the implementation to override defaults:</p><p>SOKOL_ASSERT(c) - your own assert macro (default: assert(c)) SOKOL_NUKLEAR_API_DECL- public function declaration prefix (default: extern) SOKOL_API_DECL - same as SOKOL_NUKLEAR_API_DECL SOKOL_API_IMPL - public function implementation prefix (default: -)</p><p>If sokol_nuklear.h is compiled as a DLL, define the following before including the declaration or implementation:</p><p>SOKOL_DLL</p><p>On Windows, SOKOL_DLL will define SOKOL_NUKLEAR_API_DECL as __declspec(dllexport) or __declspec(dllimport) as needed.</p><p>Include the following headers before sokol_nuklear.h (both before including the declaration and implementation):</p><pre><code>sokol_gfx.h
sokol_app.h     (except SOKOL_NUKLEAR_NO_SOKOL_APP)
</code></pre><p>Additionally, include the following headers before including the implementation:</p><pre><code>nuklear.h
</code></pre><p>NOTE: Unlike most other sokol-headers, the implementation must be compiled as C, compiling as C++ isn&#39;t supported. The interface is callable from C++ of course.</p><h1 id="feature-overview" tabindex="-1">FEATURE OVERVIEW: <a class="header-anchor" href="#feature-overview" aria-label="Permalink to &quot;FEATURE OVERVIEW:&quot;">​</a></h1><p>sokol_nuklear.h implements the initialization, rendering and event-handling code for Nuklear (<a href="https://github.com/Immediate-Mode-UI/Nuklear" target="_blank" rel="noreferrer">https://github.com/Immediate-Mode-UI/Nuklear</a>) on top of sokol_gfx.h and (optionally) sokol_app.h.</p><p>The sokol_app.h dependency is optional and used for input event handling. If you only use sokol_gfx.h but not sokol_app.h in your application, define SOKOL_NUKLEAR_NO_SOKOL_APP before including the implementation of sokol_nuklear.h, this will remove any dependency to sokol_app.h, but you must feed input events into Nuklear yourself.</p><p>sokol_nuklear.h is not thread-safe, all calls must be made from the same thread where sokol_gfx.h is running.</p><h1 id="howto" tabindex="-1">HOWTO: <a class="header-anchor" href="#howto" aria-label="Permalink to &quot;HOWTO:&quot;">​</a></h1><p>--- To initialize sokol-nuklear, call:</p><pre><code>snk_setup(const snk_desc_t* desc)

This will initialize Nuklear and create sokol-gfx resources
(two buffers for vertices and indices, a font texture and a pipeline-
state-object).

Use the following snk_desc_t members to configure behaviour:

    int max_vertices
        The maximum number of vertices used for UI rendering, default is 65536.
        sokol-nuklear will use this to compute the size of the vertex-
        and index-buffers allocated via sokol_gfx.h

    sg_pixel_format color_format
        The color pixel format of the render pass where the UI
        will be rendered. The default is SG_PIXELFORMAT_RGBA8

    sg_pixel_format depth_format
        The depth-buffer pixel format of the render pass where
        the UI will be rendered. The default is SG_PIXELFORMAT_DEPTHSTENCIL.

    int sample_count
        The MSAA sample-count of the render pass where the UI
        will be rendered. The default is 1.

    float dpi_scale
        DPI scaling factor. Set this to the result of sapp_dpi_scale().
        To render in high resolution on a Retina Mac this would
        typically be 2.0. The default value is 1.0

    bool no_default_font
        Set this to true if you don&#39;t want to use Nuklear&#39;s default
        font. In this case you need to initialize the font
        yourself after snk_setup() is called.
</code></pre><p>--- At the start of a frame, call:</p><pre><code>struct nk_context *snk_new_frame()

This updates Nuklear&#39;s event handling state and then returns
a Nuklear context pointer which you use to build the UI. For
example:

struct nk_context *ctx = snk_new_frame();
if (nk_begin(ctx, &quot;Demo&quot;, nk_rect(50, 50, 200, 200), ...
</code></pre><p>--- at the end of the frame, before the sg_end_pass() where you want to render the UI, call:</p><pre><code>snk_render(int width, int height)

where &#39;width&#39; and &#39;height&#39; are the dimensions of the rendering surface.
For example, if you&#39;re using sokol_app.h and render to the default
framebuffer:

snk_render(sapp_width(), sapp_height());

This will convert Nuklear&#39;s command list into a vertex and index buffer,
and then render that through sokol_gfx.h
</code></pre><p>--- if you&#39;re using sokol_app.h, from inside the sokol_app.h event callback, call:</p><pre><code>void snk_handle_event(const sapp_event* ev);
</code></pre><p>--- finally, on application shutdown, call</p><pre><code>snk_shutdown()
</code></pre><p>--- Note that for touch-based systems, like iOS, there is a wrapper around nk_edit_string(...), called snk_edit_string(...) which will show and hide the onscreen keyboard as required.</p><h1 id="license" tabindex="-1">LICENSE <a class="header-anchor" href="#license" aria-label="Permalink to &quot;LICENSE&quot;">​</a></h1><p>zlib/libpng license</p><p>Copyright (c) 2020 Warren Merrifield</p><p>This software is provided &#39;as-is&#39;, without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.</p><p>Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:</p><pre><code>1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software in a
product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not
be misrepresented as being the original software.

3. This notice may not be removed or altered from any source
distribution.
</code></pre>`,40)]))}const f=o(r,[["render",i]]);export{c as __pageData,f as default};
