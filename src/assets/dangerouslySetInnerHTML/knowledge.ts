export const asyncComponent = `
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
`
export const createComponent = {
	html1: `
        <h3 id="react-createclass">React.createClass</h3>
        <pre><code>    <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
            <span class="hljs-keyword">const</span> MyComponent = React.createClass({
                render () {
                    <span class="hljs-keyword">return</span> (
                        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是React.createClass生成的组件<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
                    )
                }
            })
        </code></pre><ul>
        <li>1.React.createClass会自绑定函数方法（不像React.Component只绑定需要关心的函数）导致不必要的性能开销，增加代码过时的可能性</li>
        <li>2.React.createClass的mixins不够自然、直观；</li>
        </ul>
    `,
	html2: `
        <h3 id="react-component">React.Component</h3>
        <pre><code>    <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
            <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-title">from</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
                render () {
                    <span class="hljs-keyword">return</span> (
                        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是React.Component生成的组件<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
                    )
                }
            }
        </code></pre><ul>
        <li>1.需要手动绑定this指向</li>
        <li>2.React.Component形式非常适合高阶组件（Higher Order Components--HOC）,它以更直观的形式展示了比mixins更强大的功能，并且HOC是纯净的JavaScript，不用担心他们会被废弃</li>
        </ul>
    `,
	html3: `
        <h3 id="-">无状态函数式组件</h3>
        <pre><code>    <span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
            <span class="hljs-keyword">const</span> MyComponent = <span class="hljs-function">(<span class="hljs-params">props</span>) =&gt;</span> (
                <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>我是无状态函数式组件<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
            )
            ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">MyComponent</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"Sebastian"</span> /&gt;</span>, mountNode)</span>
        </code></pre><ul>
        <li>1.无状态组件的创建形式使代码的可读性更好，并且减少了大量冗余的代码，精简至只有一个render方法，大大的增强了编写一个组件的便利</li>
        <li>2.组件不会被实例化，整体渲染性能得到提升</li>
        <li>3.组件不能访问<code>this</code>对象</li>
        <li>4.组件无法访问生命周期的方法</li>
        <li>5.无状态组件只能访问输入的props，同样的props会得到同样的渲染结果，不会有副作用</li>
        </ul>
    `,
}

export const syntax = {
	html1: `
        <pre><code><span class="hljs-keyword">const</span> html=<span class="hljs-string">'&lt;h1&gt;content&lt;/h1&gt;'</span>;  

        React.render(
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">dangerouslySetInnerHTML</span>=<span class="hljs-string">{{__html:</span> <span class="hljs-attr">html</span>}}&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>,
            <span class="hljs-built_in">document</span>.body
        );
        </code></pre>
    `,
	html2: `
        <pre><code><span class="hljs-keyword">let</span> <span class="hljs-attr">props</span> = {
            a: <span class="hljs-number">1</span>,
            b: <span class="hljs-number">2</span>,
            c: 'text'
        }

        // 常规
        <span class="hljs-keyword">let</span> <span class="hljs-attr">component</span> = &lt;Component <span class="hljs-attr">a={props.a}</span> <span class="hljs-attr">b={props.b}</span> <span class="hljs-attr">c={props.c}/&gt;</span>

        // 扩张运算符
        <span class="hljs-keyword">let</span> <span class="hljs-attr">component</span> = &lt;Component {...props} /&gt;
        </code></pre>
    `,
}
