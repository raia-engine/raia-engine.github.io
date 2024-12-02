import{_ as i,c as n,a2 as o,o as t}from"./chunks/framework.CuCbyi2k.js";const c=JSON.parse('{"title":"STEP BY STEP:","description":"","frontmatter":{},"headers":[],"relativePath":"resource/sokol/gfx_imgui.md","filePath":"resource/sokol/gfx_imgui.md","lastUpdated":1732720247000}'),a={name:"resource/sokol/gfx_imgui.md"};function s(r,e,l,u,m,d){return t(),n("div",null,e[0]||(e[0]=[o(`<p>sokol_gfx_imgui.h -- debug-inspection UI for sokol_gfx.h using Dear ImGui</p><p>Project URL: <a href="https://github.com/floooh/sokol" target="_blank" rel="noreferrer">https://github.com/floooh/sokol</a></p><p>Do this: #define SOKOL_IMPL or #define SOKOL_GFX_IMGUI_IMPL</p><p>before you include this file in <em>one</em> C or C++ file to create the implementation.</p><p>NOTE that the implementation can be compiled either as C++ or as C. When compiled as C++, sokol_gfx_imgui.h will directly call into the Dear ImGui C++ API. When compiled as C, sokol_gfx_imgui.h will call cimgui.h functions instead.</p><p>Include the following file(s) before including sokol_gfx_imgui.h:</p><pre><code>sokol_gfx.h
</code></pre><p>Additionally, include the following headers before including the implementation:</p><p>If the implementation is compiled as C++: imgui.h</p><p>If the implementation is compiled as C: cimgui.h</p><p>The sokol_gfx.h implementation must be compiled with debug trace hooks enabled by defining:</p><pre><code>SOKOL_TRACE_HOOKS
</code></pre><p>...before including the sokol_gfx.h implementation.</p><p>Before including the sokol_gfx_imgui.h implementation, optionally override the following macros:</p><pre><code>SOKOL_ASSERT(c)     -- your own assert macro, default: assert(c)
SOKOL_UNREACHABLE   -- your own macro to annotate unreachable code,
                       default: SOKOL_ASSERT(false)
SOKOL_GFX_IMGUI_API_DECL      - public function declaration prefix (default: extern)
SOKOL_API_DECL      - same as SOKOL_GFX_IMGUI_API_DECL
SOKOL_API_IMPL      - public function implementation prefix (default: -)
</code></pre><p>If sokol_gfx_imgui.h is compiled as a DLL, define the following before including the declaration or implementation:</p><p>SOKOL_DLL</p><p>On Windows, SOKOL_DLL will define SOKOL_GFX_IMGUI_API_DECL as __declspec(dllexport) or __declspec(dllimport) as needed.</p><h1 id="step-by-step" tabindex="-1">STEP BY STEP: <a class="header-anchor" href="#step-by-step" aria-label="Permalink to &quot;STEP BY STEP:&quot;">​</a></h1><p>--- create an sg_imgui_t struct (which must be preserved between frames) and initialize it with:</p><pre><code>    sg_imgui_init(&amp;sg_imgui, &amp;(sg_imgui_desc_t){ 0 });

Note that from C++ you can&#39;t inline the desc structure initialization:

    const sg_imgui_desc_t desc = { };
    sg_imgui_init(&amp;sg_imgui, &amp;desc);

Provide optional memory allocator override functions (compatible with malloc/free) like this:

    sg_imgui_init(&amp;sg_imgui, &amp;(sg_imgui_desc_t){
        .allocator = {
            .alloc = my_malloc,
            .free = my_free,
        }
    });
</code></pre><p>--- somewhere in the per-frame code call:</p><pre><code>    sg_imgui_draw(&amp;sg_imgui)

this won&#39;t draw anything yet, since no windows are open.
</code></pre><p>--- open and close windows directly by setting the following public booleans in the sg_imgui_t struct:</p><pre><code>    sg_imgui.buffers.open = true;
    sg_imgui.images.open = true;
    sg_imgui.shaders.open = true;
    sg_imgui.pipelines.open = true;
    sg_imgui.passes.open = true;
    sg_imgui.capture.open = true;

...for instance, to control the window visibility through
menu items, the following code can be used:

    if (ImGui::BeginMainMenuBar()) {
        if (ImGui::BeginMenu(&quot;sokol-gfx&quot;)) {
            ImGui::MenuItem(&quot;Buffers&quot;, 0, &amp;sg_imgui.buffers.open);
            ImGui::MenuItem(&quot;Images&quot;, 0, &amp;sg_imgui.images.open);
            ImGui::MenuItem(&quot;Shaders&quot;, 0, &amp;sg_imgui.shaders.open);
            ImGui::MenuItem(&quot;Pipelines&quot;, 0, &amp;sg_imgui.pipelines.open);
            ImGui::MenuItem(&quot;Passes&quot;, 0, &amp;sg_imgui.passes.open);
            ImGui::MenuItem(&quot;Calls&quot;, 0, &amp;sg_imgui.capture.open);
            ImGui::EndMenu();
        }
        ImGui::EndMainMenuBar();
    }
</code></pre><p>--- before application shutdown, call:</p><pre><code>    sg_imgui_discard(&amp;sg_imgui);

...this is not strictly necessary because the application exits
anyway, but not doing this may trigger memory leak detection tools.
</code></pre><p>--- finally, your application needs an ImGui renderer, you can either provide your own, or drop in the sokol_imgui.h utility header</p><h1 id="alternative-drawing-functions" tabindex="-1">ALTERNATIVE DRAWING FUNCTIONS: <a class="header-anchor" href="#alternative-drawing-functions" aria-label="Permalink to &quot;ALTERNATIVE DRAWING FUNCTIONS:&quot;">​</a></h1><p>Instead of the convenient, but all-in-one sg_imgui_draw() function, you can also use the following granular functions which might allow better integration with your existing UI:</p><p>The following functions only render the window <em>content</em> (so you can integrate the UI into you own windows):</p><pre><code>void sg_imgui_draw_buffers_content(sg_imgui_t* ctx);
void sg_imgui_draw_images_content(sg_imgui_t* ctx);
void sg_imgui_draw_shaders_content(sg_imgui_t* ctx);
void sg_imgui_draw_pipelines_content(sg_imgui_t* ctx);
void sg_imgui_draw_passes_content(sg_imgui_t* ctx);
void sg_imgui_draw_capture_content(sg_imgui_t* ctx);
</code></pre><p>And these are the &#39;full window&#39; drawing functions:</p><pre><code>void sg_imgui_draw_buffers_window(sg_imgui_t* ctx);
void sg_imgui_draw_images_window(sg_imgui_t* ctx);
void sg_imgui_draw_shaders_window(sg_imgui_t* ctx);
void sg_imgui_draw_pipelines_window(sg_imgui_t* ctx);
void sg_imgui_draw_passes_window(sg_imgui_t* ctx);
void sg_imgui_draw_capture_window(sg_imgui_t* ctx);
</code></pre><p>Finer-grained drawing functions may be moved to the public API in the future as needed.</p><h1 id="memory-allocation-override" tabindex="-1">MEMORY ALLOCATION OVERRIDE <a class="header-anchor" href="#memory-allocation-override" aria-label="Permalink to &quot;MEMORY ALLOCATION OVERRIDE&quot;">​</a></h1><p>You can override the memory allocation functions at initialization time like this:</p><pre><code>void* my_alloc(size_t size, void* user_data) {
    return malloc(size);
}

void my_free(void* ptr, void* user_data) {
    free(ptr);
}

...
    sg_imgui_init(&amp;(&amp;ctx, &amp;(sg_imgui_desc_t){
        // ...
        .allocator = {
            .alloc = my_alloc,
            .free = my_free,
            .user_data = ...;
        }
    });
...
</code></pre><p>This only affects memory allocation calls done by sokol_gfx_imgui.h itself though, not any allocations in OS libraries.</p><h1 id="license" tabindex="-1">LICENSE <a class="header-anchor" href="#license" aria-label="Permalink to &quot;LICENSE&quot;">​</a></h1><p>zlib/libpng license</p><p>Copyright (c) 2018 Andre Weissflog</p><p>This software is provided &#39;as-is&#39;, without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.</p><p>Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:</p><pre><code>1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software in a
product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not
be misrepresented as being the original software.

3. This notice may not be removed or altered from any source
distribution.
</code></pre>`,45)]))}const g=i(a,[["render",s]]);export{c as __pageData,g as default};
