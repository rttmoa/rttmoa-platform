import{b as a,j as s,C as d,A as h,F as e,T as o,bC as l,bD as y,bE as C}from"./.pnpm-e6eae8df.js";import{tempJsx as w}from"./tempJsx-93f51537.js";import{tempJava as x}from"./tempJava-3ef93966.js";const u=`
    <p>React按需加载：<span id="1-import-"><a href="javascript;;">import方法</a></span></p>
    
    <pre><code><span class="hljs-comment">//	asyncComponent.js</span> 
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
`;function v(){const[p,t]=a.useState(w),[c,r]=a.useState(x),i=a.useCallback((n,j)=>{t(n)},[]),m=a.useCallback((n,j)=>{r(n)},[]);return s.jsxs(d,{className:"px-12",children:[s.jsx(h,{message:"React CodeMirror 🌈",type:"info",showIcon:!0,className:"mb20"}),s.jsx(e,{}),s.jsx(o.Title,{level:5,className:"mb20",children:"jsx"}),s.jsx(l,{value:p,height:"300px",extensions:[y({jsx:!0})],onChange:i}),s.jsx(e,{}),s.jsx(o.Title,{level:5,className:"mb20",children:"java"}),s.jsx(l,{value:c,height:"300px",extensions:[C()],onChange:m}),s.jsx(e,{}),s.jsx(o.Title,{level:5,className:"mb20",children:"dangerouslySetInnerHTML"}),s.jsx("div",{className:"fmt",dangerouslySetInnerHTML:{__html:u}})]})}export{v as default};
