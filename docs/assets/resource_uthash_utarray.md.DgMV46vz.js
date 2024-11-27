import{_ as n,c as s,a2 as p,o as e}from"./chunks/framework.CuCbyi2k.js";const h=JSON.parse('{"title":"utarray: dynamic array macros for C","description":"","frontmatter":{},"headers":[],"relativePath":"resource/uthash/utarray.md","filePath":"resource/uthash/utarray.md","lastUpdated":1732350347000}'),t={name:"resource/uthash/utarray.md"};function l(i,a,r,c,o,u){return e(),s("div",null,a[0]||(a[0]=[p(`<h1 id="utarray-dynamic-array-macros-for-c" tabindex="-1">utarray: dynamic array macros for C <a class="header-anchor" href="#utarray-dynamic-array-macros-for-c" aria-label="Permalink to &quot;utarray: dynamic array macros for C&quot;">​</a></h1><p>Troy D. Hanson <a href="mailto:tdh@tkhanson.net" target="_blank" rel="noreferrer">tdh@tkhanson.net</a> v2.3.0, February 2021</p><p>Here&#39;s a link back to the <a href="https://github.com/troydhanson/uthash" target="_blank" rel="noreferrer">https://github.com/troydhanson/uthash</a>[GitHub project page].</p><h2 id="introduction" tabindex="-1">Introduction <a class="header-anchor" href="#introduction" aria-label="Permalink to &quot;Introduction&quot;">​</a></h2><p>A set of general-purpose dynamic array macros for C structures are included with uthash in <code>utarray.h</code>. To use these macros in your own C program, just copy <code>utarray.h</code> into your source directory and use it in your programs.</p><p>#include &quot;utarray.h&quot;</p><p>The dynamic array supports basic operations such as push, pop, and erase on the array elements. These array elements can be any simple datatype or structure. The array &lt;&lt;operations,operations&gt;&gt; are based loosely on the C++ STL vector methods.</p><p>Internally the dynamic array contains a contiguous memory region into which the elements are copied. This buffer is grown as needed using <code>realloc</code> to accommodate all the data that is pushed into it.</p><p>Download</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>To download the \`utarray.h\` header file,</span></span>
<span class="line"><span>follow the links on https://github.com/troydhanson/uthash to clone uthash or get a zip file,</span></span>
<span class="line"><span>then look in the src/ sub-directory.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>BSD licensed</span></span></code></pre></div><p>This software is made available under the link:license.html[revised BSD license]. It is free and open source.</p><p>Platforms</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>The &#39;utarray&#39; macros have been tested on:</span></span>
<span class="line"><span></span></span>
<span class="line"><span> * Linux,</span></span>
<span class="line"><span> * Mac OS X,</span></span>
<span class="line"><span> * Windows, using Visual Studio 2008 and Visual Studio 2010</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Usage</span></span>
<span class="line"><span>-----</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Declaration</span></span></code></pre></div><p>The array itself has the data type <code>UT_array</code>, regardless of the type of elements to be stored in it. It is declared like,</p><p>UT_array *nums;</p><p>New and free</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>The next step is to create the array using \`utarray_new\`. Later when you&#39;re</span></span>
<span class="line"><span>done with the array, \`utarray_free\` will free it and all its elements.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Push, pop, etc</span></span></code></pre></div><p>The central features of the utarray involve putting elements into it, taking them out, and iterating over them. There are several &lt;&lt;operations,operations&gt;&gt; to pick from that deal with either single elements or ranges of elements at a time. In the examples below we will use only the push operation to insert elements.</p><h2 id="elements" tabindex="-1">Elements <a class="header-anchor" href="#elements" aria-label="Permalink to &quot;Elements&quot;">​</a></h2><p>Support for dynamic arrays of integers or strings is especially easy. These are best shown by example:</p><p>Integers</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>This example makes a utarray of integers, pushes 0-9 into it, then prints it.</span></span>
<span class="line"><span>Lastly it frees it.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.Integer elements</span></span>
<span class="line"><span>-------------------------------------------------------------------------------</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &quot;utarray.h&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main() {</span></span>
<span class="line"><span>  UT_array *nums;</span></span>
<span class="line"><span>  int i, *p;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  utarray_new(nums,&amp;ut_int_icd);</span></span>
<span class="line"><span>  for(i=0; i &lt; 10; i++) utarray_push_back(nums,&amp;i);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  for(p=(int*)utarray_front(nums);</span></span>
<span class="line"><span>      p!=NULL;</span></span>
<span class="line"><span>      p=(int*)utarray_next(nums,p)) {</span></span>
<span class="line"><span>    printf(&quot;%d\\n&quot;,*p);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  utarray_free(nums);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>-------------------------------------------------------------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>The second argument to \`utarray_push_back\` is always a &#39;pointer&#39; to the type</span></span>
<span class="line"><span>(so a literal cannot be used). So for integers, it is an \`int*\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Strings</span></span>
<span class="line"><span>~~~~~~~</span></span>
<span class="line"><span>In this example we make a utarray of strings, push two strings into it, print</span></span>
<span class="line"><span>it and free it.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.String elements</span></span>
<span class="line"><span>-------------------------------------------------------------------------------</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &quot;utarray.h&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main() {</span></span>
<span class="line"><span>  UT_array *strs;</span></span>
<span class="line"><span>  char *s, **p;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  utarray_new(strs,&amp;ut_str_icd);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  s = &quot;hello&quot;; utarray_push_back(strs, &amp;s);</span></span>
<span class="line"><span>  s = &quot;world&quot;; utarray_push_back(strs, &amp;s);</span></span>
<span class="line"><span>  p = NULL;</span></span>
<span class="line"><span>  while ( (p=(char**)utarray_next(strs,p))) {</span></span>
<span class="line"><span>    printf(&quot;%s\\n&quot;,*p);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  utarray_free(strs);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>-------------------------------------------------------------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>In this example, since the element is a \`char*\`, we pass a pointer to it</span></span>
<span class="line"><span>(\`char**\`) as the second argument to \`utarray_push_back\`. Note that &quot;push&quot; makes</span></span>
<span class="line"><span>a copy of the source string and pushes that copy into the array.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>About UT_icd</span></span></code></pre></div><p>Arrays be made of any type of element, not just integers and strings. The elements can be basic types or structures. Unless you&#39;re dealing with integers and strings (which use pre-defined <code>ut_int_icd</code> and <code>ut_str_icd</code>), you&#39;ll need to define a <code>UT_icd</code> helper structure. This structure contains everything that utarray needs to initialize, copy or destruct elements.</p><p>typedef struct { size_t sz; init_f *init; ctor_f *copy; dtor_f *dtor; } UT_icd;</p><p>The three function pointers <code>init</code>, <code>copy</code>, and <code>dtor</code> have these prototypes:</p><p>typedef void (ctor_f)(void *dst, const void *src); typedef void (dtor_f)(void *elt); typedef void (init_f)(void *elt);</p><p>The <code>sz</code> is just the size of the element being stored in the array.</p><p>The <code>init</code> function will be invoked whenever utarray needs to initialize an empty element. This only happens as a byproduct of <code>utarray_resize</code> or <code>utarray_extend_back</code>. If <code>init</code> is <code>NULL</code>, it defaults to zero filling the new element using memset.</p><p>The <code>copy</code> function is used whenever an element is copied into the array. It is invoked during <code>utarray_push_back</code>, <code>utarray_insert</code>, <code>utarray_inserta</code>, or <code>utarray_concat</code>. If <code>copy</code> is <code>NULL</code>, it defaults to a bitwise copy using memcpy.</p><p>The <code>dtor</code> function is used to clean up an element that is being removed from the array. It may be invoked due to <code>utarray_resize</code>, <code>utarray_pop_back</code>, <code>utarray_erase</code>, <code>utarray_clear</code>, <code>utarray_done</code> or <code>utarray_free</code>. If the elements need no cleanup upon destruction, <code>dtor</code> may be <code>NULL</code>.</p><p>Scalar types</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>The next example uses \`UT_icd\` with all its defaults to make a utarray of</span></span>
<span class="line"><span>\`long\` elements. This example pushes two longs, prints them, and frees the</span></span>
<span class="line"><span>array.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.long elements</span></span>
<span class="line"><span>-------------------------------------------------------------------------------</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &quot;utarray.h&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>UT_icd long_icd = {sizeof(long), NULL, NULL, NULL };</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main() {</span></span>
<span class="line"><span>  UT_array *nums;</span></span>
<span class="line"><span>  long l, *p;</span></span>
<span class="line"><span>  utarray_new(nums, &amp;long_icd);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  l=1; utarray_push_back(nums, &amp;l);</span></span>
<span class="line"><span>  l=2; utarray_push_back(nums, &amp;l);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  p=NULL;</span></span>
<span class="line"><span>  while( (p=(long*)utarray_next(nums,p))) printf(&quot;%ld\\n&quot;, *p);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  utarray_free(nums);</span></span>
<span class="line"><span>  return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>-------------------------------------------------------------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Structures</span></span>
<span class="line"><span>~~~~~~~~~~</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Structures can be used as utarray elements. If the structure requires no</span></span>
<span class="line"><span>special effort to initialize, copy or destruct, we can use \`UT_icd\` with all</span></span>
<span class="line"><span>its defaults. This example shows a structure that consists of two integers. Here</span></span>
<span class="line"><span>we push two values, print them and free the array.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.Structure (simple)</span></span>
<span class="line"><span>-------------------------------------------------------------------------------</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &quot;utarray.h&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    int a;</span></span>
<span class="line"><span>    int b;</span></span>
<span class="line"><span>} intpair_t;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>UT_icd intpair_icd = {sizeof(intpair_t), NULL, NULL, NULL};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main() {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  UT_array *pairs;</span></span>
<span class="line"><span>  intpair_t ip, *p;</span></span>
<span class="line"><span>  utarray_new(pairs,&amp;intpair_icd);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ip.a=1;  ip.b=2;  utarray_push_back(pairs, &amp;ip);</span></span>
<span class="line"><span>  ip.a=10; ip.b=20; utarray_push_back(pairs, &amp;ip);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  for(p=(intpair_t*)utarray_front(pairs);</span></span>
<span class="line"><span>      p!=NULL;</span></span>
<span class="line"><span>      p=(intpair_t*)utarray_next(pairs,p)) {</span></span>
<span class="line"><span>    printf(&quot;%d %d\\n&quot;, p-&gt;a, p-&gt;b);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  utarray_free(pairs);</span></span>
<span class="line"><span>  return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>-------------------------------------------------------------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>The real utility of \`UT_icd\` is apparent when the elements of the utarray are</span></span>
<span class="line"><span>structures that require special work to initialize, copy or destruct.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>For example, when a structure contains pointers to related memory areas that</span></span>
<span class="line"><span>need to be copied when the structure is copied (and freed when the structure is</span></span>
<span class="line"><span>freed), we can use custom \`init\`, \`copy\`, and \`dtor\` members in the \`UT_icd\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Here we take an example of a structure that contains an integer and a string.</span></span>
<span class="line"><span>When this element is copied (such as when an element is pushed into the array),</span></span>
<span class="line"><span>we want to &quot;deep copy&quot; the \`s\` pointer (so the original element and the new</span></span>
<span class="line"><span>element point to their own copies of \`s\`). When an element is destructed, we</span></span>
<span class="line"><span>want to &quot;deep free&quot; its copy of \`s\`. Lastly, this example is written to work</span></span>
<span class="line"><span>even if \`s\` has the value \`NULL\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>.Structure (complex)</span></span>
<span class="line"><span>-------------------------------------------------------------------------------</span></span>
<span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;stdlib.h&gt;</span></span>
<span class="line"><span>#include &quot;utarray.h&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>typedef struct {</span></span>
<span class="line"><span>    int a;</span></span>
<span class="line"><span>    char *s;</span></span>
<span class="line"><span>} intchar_t;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void intchar_copy(void *_dst, const void *_src) {</span></span>
<span class="line"><span>  intchar_t *dst = (intchar_t*)_dst, *src = (intchar_t*)_src;</span></span>
<span class="line"><span>  dst-&gt;a = src-&gt;a;</span></span>
<span class="line"><span>  dst-&gt;s = src-&gt;s ? strdup(src-&gt;s) : NULL;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void intchar_dtor(void *_elt) {</span></span>
<span class="line"><span>  intchar_t *elt = (intchar_t*)_elt;</span></span>
<span class="line"><span>  if (elt-&gt;s) free(elt-&gt;s);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>UT_icd intchar_icd = {sizeof(intchar_t), NULL, intchar_copy, intchar_dtor};</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main() {</span></span>
<span class="line"><span>  UT_array *intchars;</span></span>
<span class="line"><span>  intchar_t ic, *p;</span></span>
<span class="line"><span>  utarray_new(intchars, &amp;intchar_icd);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  ic.a=1; ic.s=&quot;hello&quot;; utarray_push_back(intchars, &amp;ic);</span></span>
<span class="line"><span>  ic.a=2; ic.s=&quot;world&quot;; utarray_push_back(intchars, &amp;ic);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  p=NULL;</span></span>
<span class="line"><span>  while( (p=(intchar_t*)utarray_next(intchars,p))) {</span></span>
<span class="line"><span>    printf(&quot;%d %s\\n&quot;, p-&gt;a, (p-&gt;s ? p-&gt;s : &quot;null&quot;));</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  utarray_free(intchars);</span></span>
<span class="line"><span>  return 0;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>-------------------------------------------------------------------------------</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[[operations]]</span></span>
<span class="line"><span>Reference</span></span>
<span class="line"><span>---------</span></span>
<span class="line"><span>This table lists all the utarray operations. These are loosely based on the C++</span></span>
<span class="line"><span>vector class.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Operations</span></span>
<span class="line"><span>~~~~~~~~~~</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[width=&quot;100%&quot;,cols=&quot;50&lt;m,40&lt;&quot;,grid=&quot;none&quot;,options=&quot;none&quot;]</span></span>
<span class="line"><span>|===============================================================================</span></span>
<span class="line"><span>| utarray_new(UT_array *a, UT_icd *icd)| allocate a new array</span></span>
<span class="line"><span>| utarray_free(UT_array *a)            | free an allocated array</span></span>
<span class="line"><span>| utarray_init(UT_array *a,UT_icd *icd)| init an array (non-alloc)</span></span>
<span class="line"><span>| utarray_done(UT_array *a)            | dispose of an array (non-allocd)</span></span>
<span class="line"><span>| utarray_reserve(UT_array *a,int n)  | ensure space available for &#39;n&#39; more elements</span></span>
<span class="line"><span>| utarray_push_back(UT_array *a,void *p) | push element p onto a</span></span>
<span class="line"><span>| utarray_pop_back(UT_array *a)        | pop last element from a</span></span>
<span class="line"><span>| utarray_extend_back(UT_array *a)     | push empty element onto a</span></span>
<span class="line"><span>| utarray_len(UT_array *a)             | get length of a</span></span>
<span class="line"><span>| utarray_eltptr(UT_array *a,int j)    | get pointer of element from index</span></span>
<span class="line"><span>| utarray_eltidx(UT_array *a,void *e)  | get index of element from pointer</span></span>
<span class="line"><span>| utarray_insert(UT_array *a,void *p, int j) | insert element p to index j</span></span>
<span class="line"><span>| utarray_inserta(UT_array *a,UT_array *w, int j) | insert array w into array a at index j</span></span>
<span class="line"><span>| utarray_resize(UT_array *dst,int num)  | extend or shrink array to num elements</span></span>
<span class="line"><span>| utarray_concat(UT_array *dst,UT_array *src) | copy src to end of dst array</span></span>
<span class="line"><span>| utarray_erase(UT_array *a,int pos,int len) | remove len elements from a[pos]..a[pos+len-1]</span></span>
<span class="line"><span>| utarray_clear(UT_array *a) | clear all elements from a, setting its length to zero</span></span>
<span class="line"><span>| utarray_sort(UT_array *a,cmpfcn *cmp) | sort elements of a using comparison function</span></span>
<span class="line"><span>| utarray_find(UT_array *a,void *v, cmpfcn *cmp) | find element v in utarray (must be sorted)</span></span>
<span class="line"><span>| utarray_front(UT_array *a) | get first element of a</span></span>
<span class="line"><span>| utarray_next(UT_array *a,void *e) | get element of a following e (front if e is NULL)</span></span>
<span class="line"><span>| utarray_prev(UT_array *a,void *e) | get element of a before e (back if e is NULL)</span></span>
<span class="line"><span>| utarray_back(UT_array *a) | get last element of a</span></span>
<span class="line"><span>|===============================================================================</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Notes</span></span>
<span class="line"><span>~~~~~</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. \`utarray_new\` and \`utarray_free\` are used to allocate a new array and free it,</span></span>
<span class="line"><span>   while \`utarray_init\` and \`utarray_done\` can be used if the UT_array is already</span></span>
<span class="line"><span>   allocated and just needs to be initialized or have its internal resources</span></span>
<span class="line"><span>   freed.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. \`utarray_reserve\` takes the &quot;delta&quot; of elements to reserve, not the total</span></span>
<span class="line"><span>   desired capacity of the array. This differs from the C++ STL &quot;reserve&quot; notion.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. \`utarray_sort\` expects a comparison function having the usual \`strcmp\`-like</span></span>
<span class="line"><span>   convention where it accepts two elements (a and b) and returns a negative</span></span>
<span class="line"><span>   value if a precedes b, 0 if a and b sort equally, and positive if b precedes a.</span></span>
<span class="line"><span>   This is an example of a comparison function:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  int intsort(const void *a, const void *b) {</span></span>
<span class="line"><span>      int _a = *(const int *)a;</span></span>
<span class="line"><span>      int _b = *(const int *)b;</span></span>
<span class="line"><span>      return (_a &lt; _b) ? -1 : (_a &gt; _b);</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. \`utarray_find\` uses a binary search to locate an element having a certain value</span></span>
<span class="line"><span>   according to the given comparison function. The utarray must be first sorted</span></span>
<span class="line"><span>   using the same comparison function. An example of using \`utarray_find\` with</span></span>
<span class="line"><span>   a utarray of strings is included in \`tests/test61.c\`.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>5. A &#39;pointer&#39; to a particular element (obtained using \`utarray_eltptr\` or</span></span>
<span class="line"><span>   \`utarray_front\`, \`utarray_next\`, \`utarray_prev\`, \`utarray_back\`) becomes invalid whenever</span></span>
<span class="line"><span>   another element is inserted into the utarray. This is because the internal</span></span>
<span class="line"><span>   memory management may need to \`realloc\` the element storage to a new address.</span></span>
<span class="line"><span>   For this reason, it&#39;s usually better to refer to an element by its integer</span></span>
<span class="line"><span>   &#39;index&#39; in code whose duration may include element insertion.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>6. To override the default out-of-memory handling behavior (which calls \`exit(-1)\`),</span></span>
<span class="line"><span>   override the \`utarray_oom()\` macro before including \`utarray.h\`.</span></span>
<span class="line"><span>   For example,</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  #define utarray_oom() do { longjmp(error_handling_location); } while (0)</span></span>
<span class="line"><span>  ...</span></span>
<span class="line"><span>  #include &quot;utarray.h&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// vim: set nowrap syntax=asciidoc:</span></span></code></pre></div>`,32)]))}const y=n(t,[["render",l]]);export{h as __pageData,y as default};
