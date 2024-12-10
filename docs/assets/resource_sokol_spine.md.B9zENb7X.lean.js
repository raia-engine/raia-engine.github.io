import{_ as n,c as s,a2 as t,o as i}from"./chunks/framework.DzmM640o.js";const h=JSON.parse('{"title":"FEATURE OVERVIEW","description":"","frontmatter":{},"headers":[],"relativePath":"resource/sokol/spine.md","filePath":"resource/sokol/spine.md","lastUpdated":1732720247000}'),a={name:"resource/sokol/spine.md"};function o(r,e,l,p,d,c){return i(),s("div",null,e[0]||(e[0]=[t(`<p>sokol_spine.h -- a sokol-gfx renderer for the spine-c runtime (see <a href="https://github.com/EsotericSoftware/spine-runtimes/tree/4.1/spine-c" target="_blank" rel="noreferrer">https://github.com/EsotericSoftware/spine-runtimes/tree/4.1/spine-c</a>)</p><p>Project URL: <a href="https://github.com/floooh/sokol" target="_blank" rel="noreferrer">https://github.com/floooh/sokol</a></p><p>Do this: #define SOKOL_IMPL or #define SOKOL_SPINE_IMPL</p><p>before you include this file in <em>one</em> C or C++ file to create the implementation.</p><p>The following defines are used by the implementation to select the platform-specific embedded shader code (these are the same defines as used by sokol_gfx.h and sokol_app.h):</p><p>SOKOL_GLCORE33 SOKOL_GLES2 SOKOL_GLES3 SOKOL_D3D11 SOKOL_METAL</p><p>...optionally provide the following macros to override defaults:</p><p>SOKOL_ASSERT(c) - your own assert macro (default: assert(c)) SOKOL_SPINE_API_DECL - public function declaration prefix (default: extern) SOKOL_API_DECL - same as SOKOL_SPINE_API_DECL SOKOL_API_IMPL - public function implementation prefix (default: -) SOKOL_UNREACHABLE() - a guard macro for unreachable code (default: assert(false))</p><p>If sokol_spine.h is compiled as a DLL, define the following before including the declaration or implementation:</p><p>SOKOL_DLL</p><p>On Windows, SOKOL_DLL will define SOKOL_SPINE_API_DECL as __declspec(dllexport) or __declspec(dllimport) as needed.</p><p>Include the following headers before including sokol_spine.h:</p><pre><code>sokol_gfx.h
</code></pre><p>Include the following headers before include the sokol_spine.h <em>IMPLEMENTATION</em>:</p><pre><code>spine/spine.h
</code></pre><p>You&#39;ll also need to compile and link with the spine-c runtime:</p><pre><code>https://github.com/EsotericSoftware/spine-runtimes/tree/4.1/spine-c/spine-c
</code></pre><h1 id="feature-overview" tabindex="-1">FEATURE OVERVIEW <a class="header-anchor" href="#feature-overview" aria-label="Permalink to &quot;FEATURE OVERVIEW&quot;">​</a></h1><p>sokol_spine.h is a sokol-gfx renderer and &#39;handle wrapper&#39; for Spine (<a href="http://en.esotericsoftware.com/spine-in-depth" target="_blank" rel="noreferrer">http://en.esotericsoftware.com/spine-in-depth</a>) on top of the spine-c runtime: <a href="http://en.esotericsoftware.com/spine-c" target="_blank" rel="noreferrer">http://en.esotericsoftware.com/spine-c</a> (source code: <a href="https://github.com/EsotericSoftware/spine-runtimes/tree/4.1/spine-c/spine-c" target="_blank" rel="noreferrer">https://github.com/EsotericSoftware/spine-runtimes/tree/4.1/spine-c/spine-c</a>).</p><p>The sokol-gfx renderer allows to manage multiple contexts for rendering Spine scenes into different sokol-gfx render passes (similar to sokol-gl and sokol-debugtext), allows to split rendering into layers to mix Spine rendering with other rendering operations, and it automatically batches adjacent draw calls for Spine objects that use the same texture and in the same layer.</p><p>Sokol-spine wraps &#39;raw&#39; spine-c objects with tagged index handles. This eliminates the risk of memory corruption via dangling pointers. Any API calls involving invalid objects either result in a no-op, or in a proper error.</p><p>The sokol-spine API exposes four &#39;base object types&#39;, and a number of &#39;subobject types&#39; which are owned by base objects.</p><p>Base object types are:</p><ul><li><p>sspine_atlas: A wrapper around a spine-c spAtlas object, each spAtlas object owns at least one spAtlasPage object, and each spAtlasPage object owns exactly one sokol-gfx image object.</p></li><li><p>sspine_skeleton: A skeleton object requires an atlas object for creation, and is a wrapper around one spine-c spSkeletonData and one spAnimationStateData object. both contain the shared static data for individual spine instances</p></li><li><p>sspine_instance: Instance objects are created from skeleton objects. Instances are the objects that are actually getting rendered. Each instance tracks its own transformation and animation state, but otherwise just references shared data of the skeleton object it was created from. An sspine_instance object is a wrapper around one spine-c spSkeleton, spAnimationState and spSkeletonClipping object each.</p></li><li><p>sspine_skinset: Skin-set objects are collections of skins which define the look of an instance. Some Spine scenes consist of combinable skins (for instance a human character could offer different skins for different types of clothing, hats, scarfs, shirts, pants, and so on..., and a skin set would represent a specific outfit).</p></li></ul><p>Subobject types allow to inspect and manipulate Spine objects in more detail:</p><ul><li><p>sspine_anim: Each skeleton object usually offers animations which can then be scheduled and mixed on an instance.</p></li><li><p>sspine_bone: Bone objects are the hierarchical transform nodes of a skeleton. The sokol-spine API allows both to inspect the shared static bone attributes of an sspine_skeleton object, as well as inspecting and manipulating the per-instance bone attributes on an sspine_instance object.</p></li><li><p>sspine_event: A running Spine animation may fire &#39;events&#39; at certain positions in time (for instance a &#39;footstep&#39; event whenever a foot hits the ground). Events can be used to play sound effects (or visual effects) at the right time.</p></li><li><p>sspine_iktarget: Allows to set the target position for a group of bones controlled by inverse kinematics.</p></li></ul><p>There&#39;s a couple of other subobject types which are mostly useful to inspect the interior structure of skeletons. Those will be explained in detail further down.</p><h1 id="minimal-api-usage-overview" tabindex="-1">MINIMAL API USAGE OVERVIEW <a class="header-anchor" href="#minimal-api-usage-overview" aria-label="Permalink to &quot;MINIMAL API USAGE OVERVIEW&quot;">​</a></h1><p>During initialization:</p><pre><code>- call sspine_setup() after initializating sokol-gfx
- create an atlas object from a Spine atlas file with sspine_make_atlas()
- load and initialize the sokol-gfx image objects referenced by the atlas
- create a skeleton object from a Spine skeleton file with sspine_make_skeleton()
- create at least one instance object with sspine_make_instance()
</code></pre><p>In the frame loop, outside of sokol-gfx render passes:</p><pre><code>- if needed, move instances around with sspine_set_position()
- if needed, schedule new animations with sspine_set_animation() and sspine_add_animation()
- each frame, advance the current instance animation state with sspine_update_instance()
- each frame, render instances with sspine_draw_instance_in_layer(), this just records
  vertices, indices and draw commands into internal buffers, but does no actual
  sokol-gfx rendering
</code></pre><p>In the frame loop, inside a sokol-gfx render pass:</p><pre><code>- call sspine_draw_layer() to draw all previously recorded instances in a specific layer
</code></pre><p>On shutdown:</p><pre><code>- call sspine_shutdown(), ideally before shutting down sokol-gfx
</code></pre><h1 id="quickstart-step-by-step" tabindex="-1">QUICKSTART STEP BY STEP <a class="header-anchor" href="#quickstart-step-by-step" aria-label="Permalink to &quot;QUICKSTART STEP BY STEP&quot;">​</a></h1><p>For a simple demo program using sokol_app.h, sokol_gfx.h and sokol_fetch.h, see here: [TODO: add link to spine-simple-sapp wasm demo].</p><ul><li><p>sokol_spine.h must be included after sokol_gfx.h (this is true both for the declaration and implementation):</p><p>#include &quot;sokol_gfx.h&quot; #include &quot;sokol_spine.h&quot;</p></li><li><p>...and sokol_gfx.h must be initialized before sokol_spine.h:</p><p>sg_setup(&amp;(sg_desc){ ... }); sspine_setup(&amp;(sspine_desc){ ... });</p></li><li><p>You can tweak the memory usage of sokol-spine by limiting or expanding the maximum number of vertices, draw commands and pool sizes:</p><p>sspine_setup(&amp;(sspine_desc){ .max_vertices = 1024, // default: (1&lt;&lt;16) = 65536 .max_commands = 128, // default: (1&lt;&lt;14) = 16384 .context_pool_size = 1, // default: 4 .atlas_pool_size = 1, // default: 64 .skeleton_pool_size = 1, // default: 64 .skinset_pool_size = 1, // default: 64 .instance_pool_size = 16, // default: 1024 });</p><p>Sokol-spine uses 32-bit vertex-indices for rendering (SG_INDEXTYPE_UINT32), so that the maximum number of Spine vertices in a frame isn&#39;t limited to (1&lt;&lt;16).</p></li><li><p>You can override the default memory allocation and error logging functions, this is explained in detail further down:</p><p>sspine_setup(&amp;(sspine_desc){ .allocator = { ... }, .logger = { ... } });</p></li><li><p>After initialization, the first thing you need is an sspine_atlas object. Sokol-spine doesn&#39;t concern itself with file IO, it expects all external data to be provided as pointer/size pairs:</p><p>sspine_atlas atlas = sspine_make_atlas(&amp;(sspine_atlas_desc){ .data = { .ptr = ..., // pointer to Spine atlas file data in memory .size = ..., // atlas file data size in bytes } }); assert(sspine_atlas_valid(atlas));</p><p>If you load the atlas data asynchronously, you can still run your per-frame rendering code without waiting for the atlas data to be loaded and the atlas to be created. This works because calling sokol-spine functions with &#39;invalid&#39; object handles is a valid no-op.</p></li><li><p>Optionally you can override some or all of the atlas texture creation parameters:</p><p>sspine_atlas atlas = sspine_make_atlas(&amp;(sspine_atlas_desc){ .data = { ... }, .overrides = { .min_filter = SG_FILTER_NEAREST, .mag_filter = SG_FILTER_NEAREST, .wrap_u = SG_WRAP_MIRROR, .wrap_v = SG_WRAP_MIRROR, .premul_alpha_enabled = ..., .premul_alpha_disabled = ..., } });</p></li><li><p>The atlas file itself doesn&#39;t contain any texture data, it only contains filenames of the required textures. Sokol-spine has already allocated a sokol-gfx sg_image handle for each required texture, but the actual texture loading and initialization must be performed by user code:</p><p>// iterate over atlas textures and initialize sokol-gfx image objects // with existing handles const int num = sspine_num_images(atlas); for (int i = 0; i &lt; num; i++) { const sspine_image img = sspine_image_by_index(atlas, i); const sspine_image_info img_info = sspine_get_image_info(img); assert(img_info.valid); assert(!img_info.filename.truncated);</p><pre><code>  // the filename is now in img_info.filename.cstr, &#39;somehow&#39;
  // load and decode the image data into memory, and then
  // initialize the sokol-gfx image from the existing sg_image handle
  // in img_info.sgimage:
  sg_init_image(img_info.sgimage, &amp;(sg_image_desc){
      .width = ...,
      .height = ...,
      .pixel_format = ...,
      .min_filter = img_info.min_filter,
      .mag_filter = img_info.mag_filter,
      .wrap_u = img_info.wrap_u,
      .wrap_v = img_info.wrap_v,
      .data.subimage[0][0] = {
          .ptr = ...,     // pointer to decoded image pixel data
          .size = ...,    // size of decoded image pixel data in bytes
      }
  });
</code></pre><p>}</p><p>If you load the image data asynchronously, you can still simply start rendering before the image data is loaded. This works because sokol-gfx will silently drop any rendering operations that involve &#39;incomplete&#39; objects.</p></li><li><p>Once an atlas object has been created (independently from loading any image data), an sspine_skeleton object is needed next. This requires a valid atlas object handle as input, and a pointer to the Spine skeleton file data loaded into memory.</p><p>Spine skeleton files come in two flavours: binary or json, for binary data, a ptr/size pair must be provided:</p><p>sspine_skeleton skeleton = sspine_make_skeleton(&amp;(sspine_skeleton_desc){ .atlas = atlas, // atlas must be a valid sspine_atlas handle .binary_data = { .ptr = ..., // pointer to binary skeleton data in memory .size = ..., // size of binary skeleton data in bytes } }); assert(sspine_skeleton_valid(skeleton));</p><p>For JSON skeleton file data, the data must be provided as a zero-terminated C string:</p><p>sspine_skeleton skeleton = sspine_make_skeleton(&amp;(sspine_skeleton_desc){ .atlas = atlas, .json_data = ..., // JSON skeleton data as zero-terminated(!) C-string });</p><p>Like with all sokol-spine objects, if you load the skeleton data asynchronously and only then create a skeleton object, you can already start rendering before the data is loaded and the Spine objects have been created. Any operations involving &#39;incomplete&#39; handles will be dropped.</p></li><li><p>You can pre-scale the Spine scene size, and you can provide a default cross-fade duration for animation mixing:</p><p>sspine_skeleton skeleton = sspine_make_skeleton(&amp;(sspine_skeleton_desc){ .atlas = atlas, .binary_data = { ... }, .prescale = 0.5f, // scale to half-size .anim_default_mix = 0.2f, // default anim mixing cross-fade duration 0.2 seconds });</p></li><li><p>Once the skeleton object has been created, it&#39;s finally time to create one or many instance objects. If you want to independently render and animate the &#39;same&#39; Spine object many times in a frame, you should only create one sspine_skeleton object, and then as many sspine_instance object as needed from the shared skeleton object:</p><p>sspine_instance instance = sspine_make_instance(&amp;(sspine_instance_desc){ .skeleton = skeleton, // must be a valid skeleton handle }); assert(sspine_instance_valid(instance));</p><p>After creation, the sspine_instance will have a &#39;default skin&#39; set as its appearance.</p></li><li><p>To set the position of an instance:</p><p>sspine_set_position(inst, (sspine_vec2){ .x=..., .y=... });</p><p>Sokol-spine doesn&#39;t define a specific unit (like pixels or meters), instead the rendering coordinate system is defined later at &#39;render time&#39;.</p></li><li><p>To schedule an initial looping animation by its name:</p><p>// first lookup up the animation by name on the skeleton: sspine_anim anim = sspine_anim_by_name(skeleton, &quot;walk&quot;); assert(sspine_anim_valid(anim));</p><p>// then schedule the animation on the instance, on mixer track 0, as looping: sspine_set_animation(instance, anim, 0, true);</p><p>Scheduling and mixing animations will be explained in more detail further down.</p></li><li><p>To advance and mix instance animations:</p><p>sspine_update_instance(instance, delta_time_in_seconds);</p><p>Usually you&#39;d call this each frame for each active instance with the frame duration in seconds.</p></li><li><p>Now it&#39;s finally time to &#39;render&#39; the instance at its current position and animation state:</p><p>sspine_draw_instance_in_layer(instance, 0);</p><p>Instances are generally rendered into numbered virtual &#39;render layers&#39; (in this case, layer 0). Layers are useful for interleaving sokol-spine rendering with other rendering commands (like background and foreground tile maps, sprites or text).</p></li><li><p>It&#39;s important to note that no actual sokol-gfx rendering happens in sspine_draw_instance_in_layer(), instead only vertices, indices and draw commands are recorded into internal memory buffes.</p></li><li><p>The only sokol-spine function which <em>must</em> (and should) be called inside a sokol-gfx rendering pass is sspine_draw_layer().</p><p>This renders all draw commands that have been recorded previously in a specific layer via sspine_draw_instance_in_layer().</p><p>const sspine_layer_transform tform = { ... };</p><p>sg_begin_default_pass(...); sspine_draw_layer(0, tform); sg_end_pass(); sg_commit();</p><p>IMPORTANT: DO <em>NOT</em> MIX any calls to sspine_draw_instance_in_layer() with sspine_draw_layer(), as this will confuse the internal draw command recording. Ideally, move all sokol-gfx pass rendering (including all sspine_draw_layer() calls) towards the end of the frame, separate from any other sokol-spine calls.</p><p>The sspine_layer_transform struct defines the layer&#39;s screen space coordinate system. For instance to map Spine coordinates to framebuffer pixels, with the origin in the screen center, you&#39;d setup the layer transform like this:</p><p>const float width = sapp_widthf(); const float height = sapp_heightf(); const sspine_layer_transform tform = { .size = { .x = width, .y = height }, .origin = { .x = width * 0.5f, .y = height * 0.5f }, };</p><p>With this pixel mapping, the Spine scene would <em>not</em> scale with window size, which often is not very useful. Instead it might make more sense to render to a fixed &#39;virtual&#39; resolution, for instance 1024 * 768:</p><p>const sspine_layer_transform tform = { .size = { .x = 1024.0f, .y = 768.0f }, .origin = { .x = 512.0f, .y = 384.0f }, };</p><p>How to configure a virtual resolution with a fixed aspect ratio is left as an exercise to the reader 😉</p></li><li><p>That&#39;s it for basic sokol-spine setup and rendering. Any existing objects will automatically be cleaned up when calling sspine_shutdown(), this should be called before shutting down sokol-gfx, but this is not required:</p><p>sspine_shutdown(); sg_shutdown();</p></li><li><p>You can explicitely destroy the base object types if you don&#39;t need them any longer. This will cause the underlying spine-c objects to be freed and the memory to be returned to the operating system:</p><p>sspine_destroy_instance(instance); sspine_destroy_skinset(skinset); sspine_destroy_skeleton(skeleton); sspine_destroy_atlas(atlas);</p><p>You can destroy these objects in any order without causing memory corruption issues. Instead any dependent object handles will simply become invalid (e.g. if you destroy an atlas object, all skeletons and instances created from this atlas will &#39;technically&#39; still exist, but their handles will resolve to &#39;invalid&#39; and all sokol-spine calls involving these handles will silently fail).</p><p>For instance:</p><p>// create an atlas, skeleton and instance sspine_atlas atlas = sspine_make_atlas(&amp;(sspine_atlas_desc){ ... }); assert(sspine_atlas_valid(atlas));</p><p>sspine_skeleton skeleton = sspine_make_skeleton(&amp;(sspine_skeleton_desc){ .atlas = atlas, ... }); assert(sspine_skeleton_valid(skeleton));</p><p>sspine_instance instance = sspine_make_instance(&amp;(sspine_instance_desc){ .skeleton = skeleton, }); assert(sspine_instance_valid(instance));</p><p>// destroy the atlas object: sspine_destroy_atlas(atlas);</p><p>// the skeleton and instance handle should now be invalid, but // otherwise, nothing bad will happen: if (!sspine_skeleton_valid(skeleton)) { ... } if (!sspine_instance_valid(instance)) { ... }</p></li></ul><h1 id="renderer-details" tabindex="-1">RENDERER DETAILS <a class="header-anchor" href="#renderer-details" aria-label="Permalink to &quot;RENDERER DETAILS&quot;">​</a></h1><p>Any rendering related work happens in the functions sspine_draw_instance_in_layer() and sspine_draw_layer().</p><p>sspine_draw_instance_in_layer() will result in vertices, indices and internal draw commands which will be recorded into internal memory buffers (e.g. no sokol-gfx functions will be called here).</p><p>If possible, batching will be performed by merging a new draw command with the previously recorded draw command. For two draw commands to be merged, the following conditions must be tru:</p><pre><code>- rendering needs to go into the same layer
- the same atlas texture must be used
- the blend mode must be compatible (the Spine blending modes
  &#39;normal&#39; and &#39;additive&#39; can be merged, but not &#39;multiply&#39;)
- the same premultiplied alpha mode must be used
</code></pre><p>To make the most out of batching:</p><pre><code>- use Spine objects which only have a single atlas texture
  and blend mode across all slots
- group sspine_draw_instance_in_layer() calls by layer
</code></pre><p>After all instances have been &#39;rendered&#39; (or rather: recorded) into layers, the actually rendering happens inside a sokol-gfx pass by calling the function sspine_draw_layer() for each layer in &#39;z order&#39; (e.g. the layer index doesn&#39;t matter for z-ordering, only the order how sspine_draw_layer() is called).</p><p>Only the first call to sspine_draw_layer() in a frame will copy the recorded vertices and indices into sokol-gfx buffers.</p><p>Each call to sspine_draw_layer() will iterate over all recorded (and hopefully well-batched) draw commands, skip any draw commands with a non-matching layer index, and draw only those with a matching layer by calling:</p><pre><code>- if the pipeline object has changed:
    - sg_apply_pipeline()
    - sg_apply_uniforms() for the vertex stage
- if the atlas texture has changed:
    - sg_apply_bindings()
- if the premultiplied-alpha mode has changed:
    - sg_apply_uniforms() for the fragment stage
- and finally sg_draw()
</code></pre><p>The main purpose of render layers is to mix Spine rendering with other render operations. In the not too distant future, the same render layer idea will also be implemented at least for sokol-gl and sokol-debugtext.</p><p>FIXME: does this section need more details about layer transforms?</p><h1 id="rendering-with-contexts" tabindex="-1">RENDERING WITH CONTEXTS <a class="header-anchor" href="#rendering-with-contexts" aria-label="Permalink to &quot;RENDERING WITH CONTEXTS&quot;">​</a></h1><p>At first glance, render contexts may look like more heavy-weight render layers, but they serve a different purpose: they are useful if Spine rendering needs to happen in different sokol-gfx render passes with different pixel formats and MSAA sample counts.</p><p>All Spine rendering happens within a context, even you don&#39;t call any of the context API functions, in this case, an internal &#39;default context&#39; will be used.</p><p>Each context has its own internal vertex-, index- and command buffer and all context state is completely independent from any other contexts.</p><p>To create a new context object, call:</p><pre><code>sspine_context ctx = sspine_make_context(&amp;(sspine_context_desc){
    .max_vertices = ...,
    .max_commands = ...,
    .color_format = SG_PIXELFORMAT_...,
    .depth_format = SG_PIXELFORMAT_...,
    .sample_count = ...,
    .color_write_mask = SG_COLORMASK_...,
});
</code></pre><p>The color_format, depth_format and sample_count items must be compatible with the sokol-gfx render pass you&#39;re going to render into.</p><p>If you omit the color_format, depth_format and sample_count designators, the new context will be compatible with the sokol-gfx default pass (which is most likely not what you want, unless your offscreen render passes exactly match the default pass attributes).</p><p>Once a context has been created, it can be made active with:</p><pre><code>sspine_set_context(ctx);
</code></pre><p>To set the default context again:</p><pre><code>sspine_set_contxt(sspine_default_context());
</code></pre><p>...and to get the currently active context:</p><pre><code>sspine_context cur_ctx = sspine_get_context();
</code></pre><p>The currently active context only matter for two functions:</p><pre><code>- sspine_draw_instance_in_layer()
- sspine_draw_layer()
</code></pre><p>Alternatively you can bypass the currently set context with these alternative functions:</p><pre><code>- sspine_context_draw_layer_in_instance(ctx, ...)
- sspine_context_draw_layer(ctx, ...)
</code></pre><p>These explicitely take a context argument, completely ignore and don&#39;t change the active context.</p><p>You can query some information about the a context with the function:</p><pre><code>sspine_context_info info = ssgpine_get_context_info(ctx);
</code></pre><p>This returns the current number of recorded vertices, indices and draw commands.</p><h1 id="resource-states" tabindex="-1">RESOURCE STATES: <a class="header-anchor" href="#resource-states" aria-label="Permalink to &quot;RESOURCE STATES:&quot;">​</a></h1><p>Similar to sokol-gfx, you can query the current &#39;resource state&#39; of Spine objects:</p><pre><code>sspine_resource_state sspine_get_atlas_resource_state(sspine_atlas atlas);
sspine_resource_state sspine_get_skeleton_resource_state(sspine_atlas atlas);
sspine_resource_state sspine_get_instance_resource_state(sspine_atlas atlas);
sspine_resource_state sspine_get_skinset_resource_state(sspine_atlas atlas);
sspine_resource_state sspine_get_context_resource_state(sspine_atlas atlas);
</code></pre><p>This returns one of</p><pre><code>- SSPINE_RESOURCE_VALID: the object is valid and ready to use
- SSPINE_RESOURCE_FAILED: the object creation has failed
- SSPINE_RESOURCE_INVALID: the object or one of its dependencies is
  invalid, it either no longer exists, or the the handle hasn&#39;t been
  initialized with a call to one of the object creation functions
</code></pre><h1 id="misc-helper-functions" tabindex="-1">MISC HELPER FUNCTIONS: <a class="header-anchor" href="#misc-helper-functions" aria-label="Permalink to &quot;MISC HELPER FUNCTIONS:&quot;">​</a></h1><p>There&#39;s a couple of helper functions which don&#39;t fit into a big enough category of their own:</p><p>You can ask a skeleton for the atlas it has been created from:</p><pre><code>sspine_atlas atlas = sspine_get_skeleton_atlas(skeleton);
</code></pre><p>...and likewise, ask an instance for the skeleton it has been created from:</p><pre><code>sspine_skeleton skeleton = sspine_get_instance_skeleton(instance);
</code></pre><p>...and finally you can convert a layer transform struct into a 4x4 projection matrix that&#39;s memory-layout compatible with sokol-gl:</p><pre><code>const sspine_layer_transform tform = { ... };
const sspine_mat4 proj = sspine_layer_transform_to_mat4(&amp;tform);
sgl_matrix_mode_projection();
sgl_load_matrix(proj.m);
</code></pre><h1 id="animations" tabindex="-1">ANIMATIONS <a class="header-anchor" href="#animations" aria-label="Permalink to &quot;ANIMATIONS&quot;">​</a></h1><p>Animations have their own handle type sspine_anim. A valid sspine_anim handle is either obtained by looking up an animation by name from a skeleton:</p><pre><code>sspine_anim anim = sspine_anim_by_name(skeleton, &quot;walk&quot;);
</code></pre><p>...or by index:</p><pre><code>sspine_anim anim = sspine_anim_by_index(skeleton, 0);
</code></pre><p>The returned anim handle will be invalid if an animation of that name doesn&#39;t exist, or the provided index is out-of-range:</p><pre><code>if (!sspine_anim_is_valid(anim)) {
    // animation handle is not valid
 }
</code></pre><p>An animation handle will also become invalid when the skeleton object it was created is destroyed, or otherwise becomes invalid.</p><p>You can iterate over all animations in a skeleton:</p><pre><code>const int num_anims = sspine_num_anims(skeleton);
for (int anim_index = 0; anim_index &lt; num_anims; anim_index++) {
    sspine_anim anim = sspine_anim_by_index(skeleton, anim_index);
    ...
}
</code></pre><p>Since sspine_anim is a &#39;fat handle&#39; (it houses a skeleton handle and an index), there&#39;s a helper function which checks if two anim handles are equal:</p><pre><code>if (sspine_anim_equal(anim0, anim1)) {
    ...
}
</code></pre><p>To query information about an animation:</p><pre><code>const sspine_anim_info info = sspine_get_anim_info(anim);
if (info.valid) {
    printf(&quot;index: %d, duration: %f, name: %s&quot;, info.index, info.duration, info.name.cstr);
}
</code></pre><p>Scheduling and mixing animations is controlled through the following functions:</p><pre><code>void sspine_clear_animation_tracks(sspine_instance instance);
void sspine_clear_animation_track(sspine_instance instance, int track_index);
void sspine_set_animation(sspine_instance instance, sspine_anim anim, int track_index, bool loop);
void sspine_add_animation(sspine_instance instance, sspine_anim anim, int track_index, bool loop, float delay);
void sspine_set_empty_animation(sspine_instance instance, int track_index, float mix_duration);
void sspine_add_empty_animation(sspine_instance instance, int track_index, float mix_duration, float delay);
</code></pre><p>Please refer to the spine-c documentation to get an idea what these functions do:</p><pre><code>http://en.esotericsoftware.com/spine-c#Applying-animations
</code></pre><h1 id="events" tabindex="-1">EVENTS <a class="header-anchor" href="#events" aria-label="Permalink to &quot;EVENTS&quot;">​</a></h1><p>For a general idea of Spine events, see here: <a href="http://esotericsoftware.com/spine-events" target="_blank" rel="noreferrer">http://esotericsoftware.com/spine-events</a></p><p>After calling sspine_update_instance() to advance the currently configured animations, you can poll for triggered events like this:</p><pre><code>const int num_triggered_events = sspine_num_triggered_events(instance);
for (int i = 0; i &lt; num_triggered_events; i++) {
    const sspine_triggered_event_info info = sspine_get_triggered_event_info(instance, i);
    if (info.valid) {
        ...
    }
}
</code></pre><p>The returned sspine_triggered_event_info struct gives you the current runtime properties of the event (in case the event has keyed properties). For the actual list of event properties please see the actual sspine_triggered_event_info struct declaration.</p><p>It&#39;s also possible to inspect the static event definition on a skeleton, this works the same as iterating through animations. You can lookup an event by name, get the number of events, lookup an event by its index, and get detailed information about an event:</p><pre><code>int sspine_num_events(sspine_skeleton skeleton);
sspine_event sspine_event_by_name(sspine_skeleton skeleton, const char* name);
sspine_event sspine_event_by_index(sspine_skeleton skeleton, int index);
bool sspine_event_valid(sspine_event event);
bool sspine_event_equal(sspine_event first, sspine_event second);
sspine_event_info sspine_get_event_info(sspine_event event);
</code></pre><p>(FIXME: shouldn&#39;t the event info struct contains an sspine_anim handle?)</p><h1 id="ik-targets" tabindex="-1">IK TARGETS <a class="header-anchor" href="#ik-targets" aria-label="Permalink to &quot;IK TARGETS&quot;">​</a></h1><p>The IK target function group allows to iterate over the IK targets that have been defined on a skeleton, find an IK target by name, get detailed information about an IK target, and most importantly, set the world space position of an IK target which updates the position of all bones influenced by the IK target:</p><pre><code>int sspine_num_iktargets(sspine_skeleton skeleton);
sspine_iktarget sspine_iktarget_by_name(sspine_skeleton skeleton, const char* name);
sspine_iktarget sspine_iktarget_by_index(sspine_skeleton skeleton, int index);
bool sspine_iktarget_valid(sspine_iktarget iktarget);
bool sspine_iktarget_equal(sspine_iktarget first, sspine_iktarget second);
sspine_iktarget_info sspine_get_iktarget_info(sspine_iktarget iktarget);
void sspine_set_iktarget_world_pos(sspine_instance instance, sspine_iktarget iktarget, sspine_vec2 world_pos);
</code></pre><h1 id="bones" tabindex="-1">BONES <a class="header-anchor" href="#bones" aria-label="Permalink to &quot;BONES&quot;">​</a></h1><p>Skeleton bones are wrapped with an sspine_bone handle which can be created from a skeleton handle, and either a bone name:</p><pre><code>sspine_bone bone = sspine_bone_by_name(skeleton, &quot;root&quot;);
assert(sspine_bone_valid(bone));
</code></pre><p>...or a bone index:</p><pre><code>sspine_bone bone = sspine_bone_by_index(skeleton, 0);
assert(sspine_bone_valid(bone));
</code></pre><p>...to iterate over all bones of a skeleton and query information about each bone:</p><pre><code>const int num_bones = sspine_num_bones(skeleton);
for (int bone_index = 0; bone_index &lt; num_bones; bone_index++) {
    sspine_bone bone = sspine_bone_by_index(skeleton, bone_index);
    const sspine_bone_info info = sspine_get_bone_info(skeleton, bone);
    if (info.valid) {
        ...
    }
}
</code></pre><p>The sspine_bone_info struct provides the shared, static bone state in the skeleton (like the name, a parent bone handle, bone length, pose transform and a color attribute), but doesn&#39;t contain any dynamic information of per-instance bones.</p><p>To manipulate the per-instance bone attributes use the following setter functions:</p><pre><code>void sspine_set_bone_transform(sspine_instance instance, sspine_bone bone, const sspine_bone_transform* transform);
void sspine_set_bone_position(sspine_instance instance, sspine_bone bone, sspine_vec2 position);
void sspine_set_bone_rotation(sspine_instance instance, sspine_bone bone, float rotation);
void sspine_set_bone_scale(sspine_instance instance, sspine_bone bone, sspine_vec2 scale);
void sspine_set_bone_shear(sspine_instance instance, sspine_bone bone, sspine_vec2 shear);
</code></pre><p>...and to query the per-instance bone attributes, the following getters:</p><pre><code>sspine_bone_transform sspine_get_bone_transform(sspine_instance instance, sspine_bone bone);
sspine_vec2 sspine_get_bone_position(sspine_instance instance, sspine_bone bone);
float sspine_get_bone_rotation(sspine_instance instance, sspine_bone bone);
sspine_vec2 sspine_get_bone_scale(sspine_instance instance, sspine_bone bone);
sspine_vec2 sspine_get_bone_shear(sspine_instance instance, sspine_bone bone);
</code></pre><p>These functions all work in the local bone coordinate system (relative to a bone&#39;s parent bone).</p><p>To transform positions between bone-local and global space use the following helper functions:</p><pre><code>sspine_vec2 sspine_bone_local_to_world(sspine_instance instance, sspine_bone bone, sspine_vec2 local_pos);
sspine_vec2 sspine_bone_world_to_local(sspine_instance instance, sspine_bone bone, sspine_vec2 world_pos);
</code></pre><p>...and as a convenience, there&#39;s a helper function which obtains the bone position in global space directly:</p><pre><code>sspine_vec2 sspine_get_bone_world_position(sspine_instance instance, sspine_bone bone);
</code></pre><h1 id="skins-and-skinsets" tabindex="-1">SKINS AND SKINSETS <a class="header-anchor" href="#skins-and-skinsets" aria-label="Permalink to &quot;SKINS AND SKINSETS&quot;">​</a></h1><p>Skins are named pieces of geometry which can be turned on and off, what makes Spine skins a bit confusing is that they are hierarchical. A skin can itself be a collection of other skins. Setting the &#39;root skin&#39; will also make all &#39;child skins&#39; visible. In sokol-spine collections of skins are managed through dedicated &#39;skin set&#39; objects. Under the hood they create a &#39;root skin&#39; where the skins of the skin set are attached to, but from the outside it just looks like a &#39;flat&#39; collection of skins without the tricky hierarchical management.</p><p>Like other &#39;subobjects&#39;, skin handles can be obtained by the skin name from a skeleton handle:</p><pre><code>sspine_skin skin = sspine_skin_by_name(skeleton, &quot;jacket&quot;);
assert(sspine_skin_valid(skin));
</code></pre><p>...or by a skin index:</p><pre><code>sspine_skin skin = sspine_skin_by_index(skeleton, 0);
assert(sspine_skin_valid(skin));
</code></pre><p>...you can iterate over all skins of a skeleton and query some information about the skin:</p><pre><code>const int num_skins = sspine_num_skins(skeleton);
for (int skin_index = 0; skin_index &lt; num_skins; skin_index++) {
    sspine_skin skin = sspine_skin_by_index(skin_index);
    sspine_skin_info info = sspine_get_skin_info(skin);
    if (info.valid) {
        ...
    }
}
</code></pre><p>Currently, the only useful query item is the skin name though.</p><p>To make a skin visible on an instance, just call:</p><pre><code>sspine_set_skin(instance, skin);
</code></pre><p>...this will first deactivate the previous skin before setting a new skin.</p><p>A more powerful way to configure the skin visibility is through &#39;skin sets&#39;. Skin sets are simply flat collections of skins which should be made visible at once. A new skin set is created like this:</p><pre><code>sspine_skinset skinset = sspine_make_skinset(&amp;(sspine_skinset_desc){
    .skeleton = skeleton,
    .skins = {
        sspine_skin_by_name(skeleton, &quot;blue-jacket&quot;),
        sspine_skin_by_name(skeleton, &quot;green-pants&quot;),
        sspine_skin_by_name(skeleton, &quot;blonde-hair&quot;),
        ...
    }
});
assert(sspine_skinset_valid(skinset))
</code></pre><p>...then simply set the skinset on an instance to reconfigure the appearance of the instance:</p><pre><code>sspine_set_skinset(instance, skinset);
</code></pre><p>The functions sspine_set_skinset() and sspine_set_skin() will cancel each other. Calling sspine_set_skinset() deactivates the effect of sspine_set_skin() and vice versa.</p><h1 id="error-reporting-and-logging" tabindex="-1">ERROR REPORTING AND LOGGING <a class="header-anchor" href="#error-reporting-and-logging" aria-label="Permalink to &quot;ERROR REPORTING AND LOGGING&quot;">​</a></h1><p>sokol_spine.h introduces a new combined logging- and error-reporting mechanism which replaces the old SOKOL_LOG macro, and the more recent logging callback.</p><p>The new reporting uses a more elaborate logger callback which provides:</p><pre><code>- a short tag string identifying the header (for instance &#39;sspine&#39;)
- a numeric log level (panic, error, warning, info)
- a numeric error code (SSPINE_ERROR_*)
- in debug mode: the error code as human readable string
- a line number, where in the header the problem occured
- in debug mode: the filename of the header
- and a user data parameter
</code></pre><p>The logging callback will be standardized across all sokol headers, so that it will be possible to use the same logging function with all headers.</p><p>To override logging, first write a logging function like this:</p><pre><code>void my_log(const char* tag,        // e.g. &#39;sspine&#39;
            uint32_t log_level,     // 0=panic, 1=error, 2=warn, 3=info
            uint32_t error_code,    // SSPINE_ERROR_*
            const char* error_id,   // error as string, only in debug mode, otherwise empty string
            int line_nr,            // line number in sokol_spine.h
            const char* filename,   // debug mode only, otherwise empty string
            void* user_data)
{
    ...
}
</code></pre><p>...and then setup sokol-spine like this:</p><pre><code>sspine_setup(&amp;(sspine_desc){
    .logger = {
        .func = my_log,
        .user_data = ...,
    }
});
</code></pre><p>If no custom logger is provided, verbose default logging goes to stderr (this means you won&#39;t see any logging messages on Android, or on Windows unless the problem is attached to a terminal!).</p><p>Eventually there will be a more luxurious sokol_log.h header, which will provide more control over logging, also on Windows or Android.</p><h1 id="memory-allocation-override" tabindex="-1">MEMORY ALLOCATION OVERRIDE <a class="header-anchor" href="#memory-allocation-override" aria-label="Permalink to &quot;MEMORY ALLOCATION OVERRIDE&quot;">​</a></h1><p>You can override the memory allocation functions at initialization time like this:</p><pre><code>void* my_alloc(size_t size, void* user_data) {
    return malloc(size);
}

void my_free(void* ptr, void* user_data) {
    free(ptr);
}

...
    sspine_setup(&amp;(sspine_desc){
        // ...
        .allocator = {
            .alloc = my_alloc,
            .free = my_free,
            .user_data = ...;
        }
    });
...
</code></pre><p>If no overrides are provided, malloc and free will be used.</p><p>This only affects memory allocation calls done by sokol_gfx.h itself though, not any allocations in OS libraries.</p><h1 id="license" tabindex="-1">LICENSE <a class="header-anchor" href="#license" aria-label="Permalink to &quot;LICENSE&quot;">​</a></h1><p>zlib/libpng license</p><p>Copyright (c) 2022 Andre Weissflog</p><p>This software is provided &#39;as-is&#39;, without any express or implied warranty. In no event will the authors be held liable for any damages arising from the use of this software.</p><p>Permission is granted to anyone to use this software for any purpose, including commercial applications, and to alter it and redistribute it freely, subject to the following restrictions:</p><pre><code>1. The origin of this software must not be misrepresented; you must not
claim that you wrote the original software. If you use this software in a
product, an acknowledgment in the product documentation would be
appreciated but is not required.

2. Altered source versions must be plainly marked as such, and must not
be misrepresented as being the original software.

3. This notice may not be removed or altered from any source
distribution.
</code></pre>`,172)]))}const m=n(a,[["render",o]]);export{h as __pageData,m as default};
