import{j as s}from"./react-12b51ca5.js";import{d as o,e as p,Y as a}from"./antd-e2492052.js";import"./@ant-design-63539318.js";import"./rc-util-8976b5fa.js";import"./react-dom-e71a48dd.js";import"./@babel-c46ce09a.js";import"./classnames-3ded05b8.js";import"./resize-observer-polyfill-0f9f8adb.js";import"./rc-resize-observer-5c9960e4.js";import"./@umijs-02c6bdf5.js";import"./swr-1237c4b3.js";import"./use-sync-external-store-ad55a9d4.js";import"./@dnd-kit-908a095e.js";import"./dayjs-6d610299.js";import"./@ctrl-bad846bd.js";import"./omit.js-929edb61.js";import"./lodash.merge-9922d51b.js";import"./safe-stable-stringify-023075f7.js";import"./@chenshuai2144-5a33ccd2.js";import"./reactcss-f166c0a9.js";import"./lodash-40f09dbd.js";import"./tinycolor2-ea5bcbb6.js";import"./lodash.tonumber-b59040d8.js";import"./rc-field-form-e46b50c8.js";import"./async-validator-dee29e8b.js";import"./@emotion-70f0a3ab.js";import"./stylis-d04dd720.js";import"./rc-motion-25d44171.js";import"./rc-notification-3ca02e51.js";import"./rc-overflow-7fc9dc70.js";import"./rc-picker-d202c760.js";import"./@rc-component-60bdd203.js";import"./rc-tabs-f080ce12.js";import"./rc-dropdown-1fd4539e.js";import"./rc-menu-c99c3faa.js";import"./rc-cascader-238c5b8d.js";import"./rc-select-8e380119.js";import"./rc-virtual-list-5b0902fa.js";import"./rc-tree-898f7873.js";import"./rc-input-number-f64f90f1.js";import"./rc-input-3682369a.js";import"./rc-collapse-3e02f0e2.js";import"./rc-drawer-9ef263c4.js";import"./scroll-into-view-if-needed-582d6ca4.js";import"./compute-scroll-into-view-e3f0ecc2.js";import"./rc-image-3cfe7923.js";import"./rc-dialog-8eb1683d.js";import"./rc-mentions-9823f19c.js";import"./rc-textarea-b098f88a.js";import"./rc-tooltip-01b6b839.js";import"./qrcode.react-e22f0a27.js";import"./rc-rate-2d3465a8.js";import"./rc-segmented-6536d122.js";import"./rc-slider-e91f05e6.js";import"./rc-steps-f39c48c2.js";import"./rc-switch-8d316ace.js";import"./rc-table-a211065a.js";import"./rc-checkbox-ae7b2d99.js";import"./throttle-debounce-87e7e444.js";import"./rc-pagination-334fefa5.js";import"./rc-tree-select-5a273e06.js";import"./copy-to-clipboard-47a2b094.js";import"./toggle-selection-93f4ad84.js";import"./rc-upload-71d17dfe.js";import"./rc-progress-a416f280.js";const n=`
    <p><strong>React 的按需加载</strong></p>
    <h3 id="1-import-">1. <a href="#">import方法</a></h3>
    <pre><code><span class="hljs-comment">//asyncComponent.js</span>
    <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> loadComponent =&gt; (
        <span class="hljs-keyword">class</span> AsyncComponent <span class="hljs-keyword">extends</span> React.Component {
            state = {
                Component: <span class="hljs-literal">null</span>,
            }
            <span class="hljs-keyword">async</span> componentDidMount() {
                <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.state.Component !== <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span>

                <span class="hljs-keyword">try</span> {
                    <span class="hljs-keyword">const</span> {<span class="hljs-keyword">default</span>: Component} = <span class="hljs-keyword">await</span> loadComponent()
                    <span class="hljs-keyword">this</span>.setState({ Component })
                }<span class="hljs-keyword">catch</span> (err) {
                    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Cannot load component in &lt;AsyncComponent /&gt;'</span>);
                    <span class="hljs-keyword">throw</span> err
                }
            }

            render() {
                <span class="hljs-keyword">const</span> { Component } = <span class="hljs-keyword">this</span>.state
                <span class="hljs-keyword">return</span> (Component) ? &lt;Component {...this.props} /&gt; : <span class="hljs-literal">null</span>
            }
        }
    )


    <span class="hljs-comment">// index.js</span>
    <span class="hljs-keyword">import</span> asyncComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./asyncComponent.js'</span>
    <span class="hljs-keyword">const</span> _import_ = <span class="hljs-function"><span class="hljs-params">file</span> =&gt;</span> asyncComponent(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(file))
    _import_(<span class="hljs-string">'components/Home/index.js'</span>)
    </code></pre><p>原理很简单:</p>
    <ol>
    <li><code>import()</code>接受相应的模块然后返回Promise对象</li>
    <li>asyncComponent 接收一个函数，且这个函数返回promise对象</li>
    <li>在<code>componentDidMount</code>钩子函数通过 async/await 执行接受进来的loadComponent方法，得到<code>import</code>返回的结果，赋值给state.Component,</li>
    <li>因为我们import的是一个React组件，所以我们得到的也是React组件，到时候只需要把该组件 <code>render</code>出去就行了</li>
    </ol>
    <h3 id="2-bundle-import-">2. <a href="#">Bundle组件 + import</a></h3>
    <h3 id="3-react-loadable">3. <a href="#">react-loadable</a></h3>
    <h3 id="4-bundle-loader">4. <a href="#">bundle-loader</a></h3>
`,ws=()=>s.jsx(s.Fragment,{children:s.jsx(o,{className:"gutter-row",children:s.jsx(p,{md:24,className:"gutter-col",children:s.jsx(a,{title:"组件按需加载（Code Splitting）",children:s.jsx("div",{className:"fmt",dangerouslySetInnerHTML:{__html:n}})})})})});export{ws as default};
