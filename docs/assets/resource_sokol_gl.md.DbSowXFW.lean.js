import{_ as t,c as n,a2 as o,o as a}from"./chunks/framework.CuCbyi2k.js";const u=JSON.parse('{"title":"FEATURE OVERVIEW:","description":"","frontmatter":{},"headers":[],"relativePath":"resource/sokol/gl.md","filePath":"resource/sokol/gl.md","lastUpdated":1732720247000}'),r={name:"resource/sokol/gl.md"};function l(i,e,s,d,c,p){return a(),n("div",null,e[0]||(e[0]=[o(`<p>sokol_gl.h -- OpenGL 1.x style rendering on top of sokol_gfx.h</p><p>Project URL: <a href="https://github.com/floooh/sokol" target="_blank" rel="noreferrer">https://github.com/floooh/sokol</a></p><p>Do this: #define SOKOL_IMPL or #define SOKOL_GL_IMPL before you include this file in <em>one</em> C or C++ file to create the implementation.</p><p>The following defines are used by the implementation to select the platform-specific embedded shader code (these are the same defines as used by sokol_gfx.h and sokol_app.h):</p><p>SOKOL_GLCORE33 SOKOL_GLES2 SOKOL_GLES3 SOKOL_D3D11 SOKOL_METAL SOKOL_WGPU</p><p>...optionally provide the following macros to override defaults:</p><p>SOKOL_ASSERT(c) - your own assert macro (default: assert(c)) SOKOL_GL_API_DECL - public function declaration prefix (default: extern) SOKOL_API_DECL - same as SOKOL_GL_API_DECL SOKOL_API_IMPL - public function implementation prefix (default: -) SOKOL_UNREACHABLE() - a guard macro for unreachable code (default: assert(false))</p><p>If sokol_gl.h is compiled as a DLL, define the following before including the declaration or implementation:</p><p>SOKOL_DLL</p><p>On Windows, SOKOL_DLL will define SOKOL_GL_API_DECL as __declspec(dllexport) or __declspec(dllimport) as needed.</p><p>Include the following headers before including sokol_gl.h:</p><pre><code>sokol_gfx.h
</code></pre><p>Matrix functions have been taken from MESA and Regal.</p><h1 id="feature-overview" tabindex="-1">FEATURE OVERVIEW: <a class="header-anchor" href="#feature-overview" aria-label="Permalink to &quot;FEATURE OVERVIEW:&quot;">​</a></h1><p>sokol_gl.h implements a subset of the OpenGLES 1.x feature set useful for when you just want to quickly render a bunch of colored triangles or lines without having to mess with buffers and shaders.</p><p>The current feature set is mostly useful for debug visualizations and simple UI-style 2D rendering:</p><p>What&#39;s implemented: - vertex components: - position (x, y, z) - 2D texture coords (u, v) - color (r, g, b, a) - primitive types: - triangle list and strip - line list and strip - quad list (TODO: quad strips) - point list - one texture layer (no multi-texturing) - viewport and scissor-rect with selectable origin (top-left or bottom-left) - all GL 1.x matrix stack functions, and additionally equivalent functions for gluPerspective and gluLookat</p><p>Notable GLES 1.x features that are <em>NOT</em> implemented: - vertex lighting (this is the most likely GL feature that might be added later) - vertex arrays (although providing whole chunks of vertex data at once might be a useful feature for a later version) - texture coordinate generation - line width - all pixel store functions - no ALPHA_TEST - no clear functions (clearing is handled by the sokol-gfx render pass) - fog</p><p>Notable differences to GL: - No &quot;enum soup&quot; for render states etc, instead there&#39;s a &#39;pipeline stack&#39;, this is similar to GL&#39;s matrix stack, but for pipeline-state-objects. The pipeline object at the top of the pipeline stack defines the active set of render states - All angles are in radians, not degrees (note the sgl_rad() and sgl_deg() conversion functions) - No enable/disable state for scissor test, this is always enabled</p><h1 id="step-by-step" tabindex="-1">STEP BY STEP: <a class="header-anchor" href="#step-by-step" aria-label="Permalink to &quot;STEP BY STEP:&quot;">​</a></h1><p>--- To initialize sokol-gl, call:</p><pre><code>    sgl_setup(const sgl_desc_t* desc)

NOTE that sgl_setup() must be called *after* initializing sokol-gfx
(via sg_setup). This is because sgl_setup() needs to create
sokol-gfx resource objects.

If you&#39;re intending to render to the default pass, and also don&#39;t
want to tweak memory usage, you can just keep sgl_desc_t zero-initialized:

    sgl_setup(&amp;(sgl_desc_t*){ 0 });

In this case, sokol-gl will create internal sg_pipeline objects that
are compatible with the sokol-app default framebuffer. If you want
to render into a framebuffer with different pixel-format and MSAA
attributes you need to provide the matching attributes in the
sgl_setup() call:

    sgl_setup(&amp;(sgl_desc_t*){
        .color_format = SG_PIXELFORMAT_...,
        .depth_format = SG_PIXELFORMAT_...,
        .sample_count = ...,
    });

To reduce memory usage, or if you need to create more then the default number of
contexts, pipelines, vertices or draw commands, set the following sgl_desc_t
members:

    .context_pool_size      (default: 4)
    .pipeline_pool_size     (default: 64)
    .max_vertices       (default: 64k)
    .max_commands       (default: 16k)

Finally you can change the face winding for front-facing triangles
and quads:

    .face_winding    - default is SG_FACEWINDING_CCW

The default winding for front faces is counter-clock-wise. This is
the same as OpenGL&#39;s default, but different from sokol-gfx.
</code></pre><p>--- Optionally create additional context objects if you want to render into multiple sokol-gfx render passes (or generally if you want to use multiple independent sokol-gl &quot;state buckets&quot;)</p><pre><code>    sgl_context ctx = sgl_make_context(const sgl_context_desc_t* desc)

For details on rendering with sokol-gl contexts, search below for
WORKING WITH CONTEXTS.
</code></pre><p>--- Optionally create pipeline-state-objects if you need render state that differs from sokol-gl&#39;s default state:</p><pre><code>    sgl_pipeline pip = sgl_make_pipeline(const sg_pipeline_desc* desc)

...this creates a pipeline object that&#39;s compatible with the currently
active context, alternatively call:

    sgl_pipeline_pip = sgl_context_make_pipeline(sgl_context ctx, const sg_pipeline_desc* desc)

...to create a pipeline object that&#39;s compatible with an explicitly
provided context.

The similarity with sokol_gfx.h&#39;s sg_pipeline type and sg_make_pipeline()
function is intended. sgl_make_pipeline() also takes a standard
sokol-gfx sg_pipeline_desc object to describe the render state, but
without:
    - shader
    - vertex layout
    - color- and depth-pixel-formats
    - primitive type (lines, triangles, ...)
    - MSAA sample count
Those will be filled in by sgl_make_pipeline(). Note that each
call to sgl_make_pipeline() needs to create several sokol-gfx
pipeline objects (one for each primitive type).

&#39;depth.write_enabled&#39; will be forced to &#39;false&#39; if the context this
pipeline object is intended for has its depth pixel format set to
SG_PIXELFORMAT_NONE (which means the framebuffer this context is used
with doesn&#39;t have a depth-stencil surface).
</code></pre><p>--- if you need to destroy sgl_pipeline objects before sgl_shutdown():</p><pre><code>    sgl_destroy_pipeline(sgl_pipeline pip)
</code></pre><p>--- After sgl_setup() you can call any of the sokol-gl functions anywhere in a frame, <em>except</em> sgl_draw(). The &#39;vanilla&#39; functions will only change internal sokol-gl state, and not call any sokol-gfx functions.</p><p>--- Unlike OpenGL, sokol-gl has a function to reset internal state to a known default. This is useful at the start of a sequence of rendering operations:</p><pre><code>    void sgl_defaults(void)

This will set the following default state:

    - current texture coordinate to u=0.0f, v=0.0f
    - current color to white (rgba all 1.0f)
    - current point size to 1.0f
    - unbind the current texture and texturing will be disabled
    - *all* matrices will be set to identity (also the projection matrix)
    - the default render state will be set by loading the &#39;default pipeline&#39;
      into the top of the pipeline stack

The current matrix- and pipeline-stack-depths will not be changed by
sgl_defaults().
</code></pre><p>--- change the currently active renderstate through the pipeline-stack functions, this works similar to the traditional GL matrix stack:</p><pre><code>    ...load the default pipeline state on the top of the pipeline stack:

        sgl_load_default_pipeline()

    ...load a specific pipeline on the top of the pipeline stack:

        sgl_load_pipeline(sgl_pipeline pip)

    ...push and pop the pipeline stack:
        sgl_push_pipeline()
        sgl_pop_pipeline()
</code></pre><p>--- control texturing with:</p><pre><code>    sgl_enable_texture()
    sgl_disable_texture()
    sgl_texture(sg_image img)
</code></pre><p>--- set the current viewport and scissor rect with:</p><pre><code>    sgl_viewport(int x, int y, int w, int h, bool origin_top_left)
    sgl_scissor_rect(int x, int y, int w, int h, bool origin_top_left)

...or call these alternatives which take float arguments (this might allow
to avoid casting between float and integer in more strongly typed languages
when floating point pixel coordinates are used):

    sgl_viewportf(float x, float y, float w, float h, bool origin_top_left)
    sgl_scissor_rectf(float x, float y, float w, float h, bool origin_top_left)

...these calls add a new command to the internal command queue, so
that the viewport or scissor rect are set at the right time relative
to other sokol-gl calls.
</code></pre><p>--- adjust the transform matrices, matrix manipulation works just like the OpenGL matrix stack:</p><pre><code>...set the current matrix mode:

    sgl_matrix_mode_modelview()
    sgl_matrix_mode_projection()
    sgl_matrix_mode_texture()

...load the identity matrix into the current matrix:

    sgl_load_identity()

...translate, rotate and scale the current matrix:

    sgl_translate(float x, float y, float z)
    sgl_rotate(float angle_rad, float x, float y, float z)
    sgl_scale(float x, float y, float z)

NOTE that all angles in sokol-gl are in radians, not in degree.
Convert between radians and degree with the helper functions:

    float sgl_rad(float deg)        - degrees to radians
    float sgl_deg(float rad)        - radians to degrees

...directly load the current matrix from a float[16] array:

    sgl_load_matrix(const float m[16])
    sgl_load_transpose_matrix(const float m[16])

...directly multiply the current matrix from a float[16] array:

    sgl_mult_matrix(const float m[16])
    sgl_mult_transpose_matrix(const float m[16])

The memory layout of those float[16] arrays is the same as in OpenGL.

...more matrix functions:

    sgl_frustum(float left, float right, float bottom, float top, float near, float far)
    sgl_ortho(float left, float right, float bottom, float top, float near, float far)
    sgl_perspective(float fov_y, float aspect, float near, float far)
    sgl_lookat(float eye_x, float eye_y, float eye_z, float center_x, float center_y, float center_z, float up_x, float up_y, float up_z)

These functions work the same as glFrustum(), glOrtho(), gluPerspective()
and gluLookAt().

...and finally to push / pop the current matrix stack:

    sgl_push_matrix(void)
    sgl_pop_matrix(void)

Again, these work the same as glPushMatrix() and glPopMatrix().
</code></pre><p>--- perform primitive rendering:</p><pre><code>...set the current texture coordinate and color &#39;registers&#39; with or
point size with:

    sgl_t2f(float u, float v)   - set current texture coordinate
    sgl_c*(...)                 - set current color
    sgl_point_size(float size)  - set current point size

There are several functions for setting the color (as float values,
unsigned byte values, packed as unsigned 32-bit integer, with
and without alpha).

NOTE that these are the only functions that can be called both inside
sgl_begin_*() / sgl_end() and outside.

Also NOTE that point size is currently hardwired to 1.0f if the D3D11
backend is used.

...start a primitive vertex sequence with:

    sgl_begin_points()
    sgl_begin_lines()
    sgl_begin_line_strip()
    sgl_begin_triangles()
    sgl_begin_triangle_strip()
    sgl_begin_quads()

...after sgl_begin_*() specify vertices:

    sgl_v*(...)
    sgl_v*_t*(...)
    sgl_v*_c*(...)
    sgl_v*_t*_c*(...)

These functions write a new vertex to sokol-gl&#39;s internal vertex buffer,
optionally with texture-coords and color. If the texture coordinate
and/or color is missing, it will be taken from the current texture-coord
and color &#39;register&#39;.

...finally, after specifying vertices, call:

    sgl_end()

This will record a new draw command in sokol-gl&#39;s internal command
list, or it will extend the previous draw command if no relevant
state has changed since the last sgl_begin/end pair.
</code></pre><p>--- inside a sokol-gfx rendering pass, call the sgl_draw() function to render the currently active context:</p><pre><code>    sgl_draw()

...or alternatively call:

    sgl_context_draw(ctx)

...to render an explicitly provided context.

This will render everything that has been recorded in the context since
the last call to sgl_draw() through sokol-gfx, and will &#39;rewind&#39; the internal
vertex-, uniform- and command-buffers.
</code></pre><p>--- each sokol-gl context tracks an internal error code, to query the current error code for the currently active context call:</p><pre><code>    sgl_error_t sgl_error()

...alternatively with an explicit context argument:

    sgl_error_t sgl_context_error(ctx);

...which can return the following error codes:

SGL_NO_ERROR                - all OK, no error occurred since last sgl_draw()
SGL_ERROR_VERTICES_FULL     - internal vertex buffer is full (checked in sgl_end())
SGL_ERROR_UNIFORMS_FULL     - the internal uniforms buffer is full (checked in sgl_end())
SGL_ERROR_COMMANDS_FULL     - the internal command buffer is full (checked in sgl_end())
SGL_ERROR_STACK_OVERFLOW    - matrix- or pipeline-stack overflow
SGL_ERROR_STACK_UNDERFLOW   - matrix- or pipeline-stack underflow
SGL_ERROR_NO_CONTEXT        - the active context no longer exists

...if sokol-gl is in an error-state, sgl_draw() will skip any rendering,
and reset the error code to SGL_NO_ERROR.
</code></pre><h1 id="render-layers" tabindex="-1">RENDER LAYERS <a class="header-anchor" href="#render-layers" aria-label="Permalink to &quot;RENDER LAYERS&quot;">​</a></h1><p>Render layers allow to split sokol-gl rendering into separate draw-command groups which can then be rendered separately in a sokol-gfx draw pass. This allows to mix/interleave sokol-gl rendering with other render operations.</p><p>Layered rendering is controlled through two functions:</p><pre><code>sgl_layer(int layer_id)
sgl_draw_layer(int layer_id)
</code></pre><p>(and the context-variant sgl_draw_layer(): sgl_context_draw_layer()</p><p>The sgl_layer() function sets the &#39;current layer&#39;, any sokol-gl calls which internally record draw commands will also store the current layer in the draw command, and later in a sokol-gfx render pass, a call to sgl_draw_layer() will only render the draw commands that have a matching layer.</p><p>The default layer is &#39;0&#39;, this is active after sokol-gl setup, and is also restored at the start of a new frame (but <em>not</em> by calling sgl_defaults()).</p><p>NOTE that calling sgl_draw() is equivalent with sgl_draw_layer(0) (in general you should either use either use sgl_draw() or sgl_draw_layer() in an application, but not both).</p><h1 id="working-with-contexts" tabindex="-1">WORKING WITH CONTEXTS: <a class="header-anchor" href="#working-with-contexts" aria-label="Permalink to &quot;WORKING WITH CONTEXTS:&quot;">​</a></h1><p>If you want to render to more than one sokol-gfx render pass you need to work with additional sokol-gl context objects (one context object for each offscreen rendering pass, in addition to the implicitly created &#39;default context&#39;.</p><p>All sokol-gl state is tracked per context, and there is always a &quot;current context&quot; (with the notable exception that the currently set context is destroyed, more on that later).</p><p>Using multiple contexts can also be useful if you only render in a single pass, but want to maintain multiple independent &quot;state buckets&quot;.</p><p>To create new context object, call:</p><pre><code>sgl_context ctx = sgl_make_context(&amp;(sgl_context_desc){
    .max_vertices = ...,        // default: 64k
    .max_commands = ...,        // default: 16k
    .color_format = ...,
    .depth_format = ...,
    .sample_count = ...,
});
</code></pre><p>The color_format, depth_format and sample_count items must be compatible with the render pass the sgl_draw() or sgL_context_draw() function will be called in.</p><p>Creating a context does <em>not</em> make the context current. To do this, call:</p><pre><code>sgl_set_context(ctx);
</code></pre><p>The currently active context will implicitely be used by most sokol-gl functions which don&#39;t take an explicit context handle as argument.</p><p>To switch back to the default context, pass the global constant SGL_DEFAULT_CONTEXT:</p><pre><code>sgl_set_context(SGL_DEFAULT_CONTEXT);
</code></pre><p>...or alternatively use the function sgl_default_context() instead of the global constant:</p><pre><code>sgl_set_context(sgl_default_context());
</code></pre><p>To get the currently active context, call:</p><pre><code>sgl_context cur_ctx = sgl_get_context();
</code></pre><p>The following functions exist in two variants, one which use the currently active context (set with sgl_set_context()), and another version which takes an explicit context handle instead:</p><pre><code>sgl_make_pipeline() vs sgl_context_make_pipeline()
sgl_error() vs sgl_context_error();
sgl_draw() vs sgl_context_draw();
</code></pre><p>Except for using the currently active context versus a provided context handle, the two variants are exactlyidentical, e.g. the following code sequences do the same thing:</p><pre><code>sgl_set_context(ctx);
sgl_pipeline pip = sgl_make_pipeline(...);
sgl_error_t err = sgl_error();
sgl_draw();

vs

sgl_pipeline pip = sgl_context_make_pipeline(ctx, ...);
sgl_error_t err = sgl_context_error(ctx);
sgl_context_draw(ctx);
</code></pre><p>Destroying the currently active context is a &#39;soft error&#39;. All following calls which require a currently active context will silently fail, and sgl_error() will return SGL_ERROR_NO_CONTEXT.</p><h1 id="under-the-hood" tabindex="-1">UNDER THE HOOD: <a class="header-anchor" href="#under-the-hood" aria-label="Permalink to &quot;UNDER THE HOOD:&quot;">​</a></h1><p>sokol_gl.h works by recording vertex data and rendering commands into memory buffers, and then drawing the recorded commands via sokol_gfx.h</p><p>The only functions which call into sokol_gfx.h are: - sgl_setup() - sgl_shutdown() - sgl_draw() (and variants)</p><p>sgl_setup() must be called after initializing sokol-gfx. sgl_shutdown() must be called before shutting down sokol-gfx. sgl_draw() must be called once per frame inside a sokol-gfx render pass.</p><p>All other sokol-gl function can be called anywhere in a frame, since they just record data into memory buffers owned by sokol-gl.</p><p>What happens in:</p><pre><code>sgl_setup():
    Unique resources shared by all contexts are created:
        - a shader object (using embedded shader source or byte code)
        - an 8x8 white default texture
    The default context is created, which involves:
        - 3 memory buffers are created, one for vertex data,
          one for uniform data, and one for commands
        - a dynamic vertex buffer is created
        - the default sgl_pipeline object is created, which involves
          creating 5 sg_pipeline objects

    One vertex is 24 bytes:
        - float3 position
        - float2 texture coords
        - uint32_t color

    One uniform block is 128 bytes:
        - mat4 model-view-projection matrix
        - mat4 texture matrix

    One draw command is ca. 24 bytes for the actual
    command code plus command arguments.

    Each sgl_end() consumes one command, and one uniform block
    (only when the matrices have changed).
    The required size for one sgl_begin/end pair is (at most):

        (152 + 24 * num_verts) bytes

sgl_shutdown():
    - all sokol-gfx resources (buffer, shader, default-texture and
      all pipeline objects) are destroyed
    - the 3 memory buffers are freed

sgl_draw() (and variants)
    - copy all recorded vertex data into the dynamic sokol-gfx buffer
      via a call to sg_update_buffer()
    - for each recorded command:
        - if the layer number stored in the command doesn&#39;t match
          the layer that&#39;s to be rendered, skip to the next
          command
        - if it&#39;s a viewport command, call sg_apply_viewport()
        - if it&#39;s a scissor-rect command, call sg_apply_scissor_rect()
        - if it&#39;s a draw command:
            - depending on what has changed since the last draw command,
              call sg_apply_pipeline(), sg_apply_bindings() and
              sg_apply_uniforms()
            - finally call sg_draw()
</code></pre><p>All other functions only modify the internally tracked state, add data to the vertex, uniform and command buffers, or manipulate the matrix stack.</p><h1 id="on-draw-command-merging" tabindex="-1">ON DRAW COMMAND MERGING <a class="header-anchor" href="#on-draw-command-merging" aria-label="Permalink to &quot;ON DRAW COMMAND MERGING&quot;">​</a></h1><p>Not every call to sgl_end() will automatically record a new draw command. If possible, the previous draw command will simply be extended, resulting in fewer actual draw calls later in sgl_draw().</p><p>A draw command will be merged with the previous command if &quot;no relevant state has changed&quot; since the last sgl_end(), meaning:</p><ul><li>no calls to sgl_viewport() and sgl_scissor_rect()</li><li>the primitive type hasn&#39;t changed</li><li>the primitive type isn&#39;t a &#39;strip type&#39; (no line or triangle strip)</li><li>the pipeline state object hasn&#39;t changed</li><li>the current layer hasn&#39;t changed</li><li>none of the matrices has changed</li><li>none of the texture state has changed</li></ul><p>Merging a draw command simply means that the number of vertices to render in the previous draw command will be incremented by the number of vertices in the new draw command.</p><h1 id="memory-allocation-override" tabindex="-1">MEMORY ALLOCATION OVERRIDE <a class="header-anchor" href="#memory-allocation-override" aria-label="Permalink to &quot;MEMORY ALLOCATION OVERRIDE&quot;">​</a></h1><p>You can override the memory allocation functions at initialization time like this:</p><pre><code>void* my_alloc(size_t size, void* user_data) {
    return malloc(size);
}

void my_free(void* ptr, void* user_data) {
    free(ptr);
}

...
    sgl_setup(&amp;(sgl_desc_t){
        // ...
        .allocator = {
            .alloc = my_alloc,
            .free = my_free,
            .user_data = ...;
        }
    });
...
</code></pre><p>If no overrides are provided, malloc and free will be used.</p><h1 id="log-function-override" tabindex="-1">LOG FUNCTION OVERRIDE <a class="header-anchor" href="#log-function-override" aria-label="Permalink to &quot;LOG FUNCTION OVERRIDE&quot;">​</a></h1><p>You can override the log function at initialization time like this:</p><pre><code>void my_log(const char* message, void* user_data) {
    printf(&quot;sgl says: \\s\\n&quot;, message);
}

...
    sgl_setup(&amp;(sgl_desc_t){
        // ...
        .logger = {
            .log_cb = my_log,
            .user_data = ...,
        }
    });
...
</code></pre><p>If no overrides are provided, puts will be used on most platforms. On Android, __android_log_write will be used instead.</p><h1 id="license" tabindex="-1">LICENSE <a class="header-anchor" href="#license" aria-label="Permalink to &quot;LICENSE&quot;">​</a></h1><p>zlib/libpng license</p><p>Copyright (c) 2018 Andre Weissflog</p><p>This software is provided &#39;as-is&#39;, without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.</p><p>Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:</p><pre><code>1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software in a
product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not
be misrepresented as being the original software.

3. This notice may not be removed or altered from any source
distribution.
</code></pre>`,101)]))}const f=t(r,[["render",l]]);export{u as __pageData,f as default};
