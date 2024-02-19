import{j as s,a,C as n}from"./index-a865b264.js";import{C as o}from"./index-032fce13.js";import"./Skeleton-6487b1eb.js";const l=`
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
`,r=()=>s.jsx(s.Fragment,{children:s.jsx(a,{className:"gutter-row",children:s.jsx(n,{md:24,className:"gutter-col",children:s.jsx(o,{title:"组件按需加载（Code Splitting）",children:s.jsx("div",{className:"fmt",dangerouslySetInnerHTML:{__html:l}})})})})});export{r as default};
//# sourceMappingURL=index-aa2baadb.js.map
