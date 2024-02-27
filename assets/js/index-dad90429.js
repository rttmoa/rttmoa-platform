import{r as m,j as t}from"./react-12b51ca5.js";import{u as h}from"./styled-components-0b39ac28.js";import{c as _}from"./cat-names-ce35a20f.js";import{Y as d}from"./antd-e2492052.js";import{M as e}from"./masonic-13edbc3c.js";import"./@ant-design-63539318.js";import"./rc-util-8976b5fa.js";import"./react-dom-e71a48dd.js";import"./@babel-c46ce09a.js";import"./classnames-3ded05b8.js";import"./resize-observer-polyfill-0f9f8adb.js";import"./rc-resize-observer-5c9960e4.js";import"./@umijs-02c6bdf5.js";import"./swr-1237c4b3.js";import"./use-sync-external-store-ad55a9d4.js";import"./@dnd-kit-908a095e.js";import"./dayjs-6d610299.js";import"./@ctrl-bad846bd.js";import"./omit.js-929edb61.js";import"./lodash.merge-9922d51b.js";import"./safe-stable-stringify-023075f7.js";import"./@chenshuai2144-5a33ccd2.js";import"./reactcss-f166c0a9.js";import"./lodash-40f09dbd.js";import"./tinycolor2-ea5bcbb6.js";import"./lodash.tonumber-b59040d8.js";import"./rc-field-form-e46b50c8.js";import"./async-validator-dee29e8b.js";import"./@emotion-70f0a3ab.js";import"./stylis-d04dd720.js";import"./unique-random-array-9fa1c876.js";import"./unique-random-98f394fc.js";import"./rc-motion-25d44171.js";import"./rc-notification-3ca02e51.js";import"./rc-overflow-7fc9dc70.js";import"./rc-picker-d202c760.js";import"./@rc-component-60bdd203.js";import"./rc-tabs-f080ce12.js";import"./rc-dropdown-1fd4539e.js";import"./rc-menu-c99c3faa.js";import"./rc-cascader-238c5b8d.js";import"./rc-select-8e380119.js";import"./rc-virtual-list-5b0902fa.js";import"./rc-tree-898f7873.js";import"./rc-input-number-f64f90f1.js";import"./rc-input-3682369a.js";import"./rc-collapse-3e02f0e2.js";import"./rc-drawer-9ef263c4.js";import"./scroll-into-view-if-needed-582d6ca4.js";import"./compute-scroll-into-view-e3f0ecc2.js";import"./rc-image-3cfe7923.js";import"./rc-dialog-8eb1683d.js";import"./rc-mentions-9823f19c.js";import"./rc-textarea-b098f88a.js";import"./rc-tooltip-01b6b839.js";import"./qrcode.react-e22f0a27.js";import"./rc-rate-2d3465a8.js";import"./rc-segmented-6536d122.js";import"./rc-slider-e91f05e6.js";import"./rc-steps-f39c48c2.js";import"./rc-switch-8d316ace.js";import"./rc-table-a211065a.js";import"./rc-checkbox-ae7b2d99.js";import"./throttle-debounce-87e7e444.js";import"./rc-pagination-334fefa5.js";import"./rc-tree-select-5a273e06.js";import"./copy-to-clipboard-47a2b094.js";import"./toggle-selection-93f4ad84.js";import"./rc-upload-71d17dfe.js";import"./rc-progress-a416f280.js";import"./@react-hook-02d17d07.js";import"./@essentials-eb570bce.js";import"./trie-memoize-0729506e.js";import"./@juggle-41516555.js";import"./raf-schd-5404ed65.js";const x=h.main`
	/* position: relative; */
	/* min-height: 100vh; */
	width: 100%;
	/* background-color: red;/ */
`,g=h.div`
	padding: 8px;
	width: 100%;
	max-width: 960px;
	margin: 30px auto 0;
	box-sizing: border-box;
`,y=h.h1`
	font-family: Quantico, sans-serif;
	font-size: 1.5rem;
	font-weight: 900;
	letter-spacing: -0.075em;
	/* color: ; */
	/* position: fixed; */
	/* left: 0; */
	/* right: 0; */
	/* top: 0; */
	/* padding: 2rem; */
	z-index: 999;
	/* width: 80%; */
	text-align: center;
	transition:
		padding 200ms ease-in-out,
		background-color 200ms 200ms linear;

	/* minify */
	padding: ${p=>p.minify?"0.5rem":null};
	color: ${p=>p.minify?"#f2fafe":null};
	background-color: ${p=>p.minify?"#1d2326":null};
`,b=h.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100px;
	background-color: #1d2326;
	border-radius: 1rem;
	transition: transform 400ms ease-in-out;

	span:last-of-type {
		color: #fff;
		padding: 0.5rem;
	}
	&:hover {
		position: relative;
		background-color: #fff;
		transform: scale(1.125);
		z-index: 1000;
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);

		span:last-of-type {
			color: #1d2326;
			padding: 0.5rem;
		}
	}
`,n=["https://cdn.pixabay.com/photo/2017/06/12/19/02/cat-2396473__480.jpg","https://cdn.pixabay.com/photo/2015/06/03/13/13/cats-796437__480.jpg","https://cdn.pixabay.com/photo/2012/11/26/13/58/cat-67345__480.jpg","https://cdn.pixabay.com/photo/2014/09/18/20/17/cat-451377__480.jpg","https://cdn.pixabay.com/photo/2015/01/31/12/36/cat-618470__480.jpg","https://cdn.pixabay.com/photo/2014/07/24/18/40/cat-401124__480.jpg","https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__480.jpg","https://cdn.pixabay.com/photo/2015/02/14/10/16/cat-636172__480.jpg","https://cdn.pixabay.com/photo/2013/10/28/14/30/cat-201855__480.jpg","https://cdn.pixabay.com/photo/2015/04/16/15/21/cat-725793__480.jpg","https://cdn.pixabay.com/photo/2016/01/20/13/05/cat-1151519__480.jpg","https://cdn.pixabay.com/photo/2017/05/31/21/52/cat-2361787__480.jpg","https://cdn.pixabay.com/photo/2014/10/01/10/46/cat-468232__480.jpg","https://cdn.pixabay.com/photo/2014/04/29/13/19/cat-334383__480.jpg","https://cdn.pixabay.com/photo/2014/01/17/14/53/cat-246933__480.jpg","https://cdn.pixabay.com/photo/2017/05/31/21/46/cats-2361762__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/22/06/cat-2332444__480.jpg","https://cdn.pixabay.com/photo/2014/03/30/23/35/cat-301720__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/22/07/cat-2332451__480.jpg","https://cdn.pixabay.com/photo/2014/08/03/00/51/kitten-408798__480.jpg","https://cdn.pixabay.com/photo/2017/05/11/07/27/cat-2303146__480.jpg","https://cdn.pixabay.com/photo/2014/03/30/23/49/cat-301723__480.jpg","https://cdn.pixabay.com/photo/2013/07/18/20/27/cat-165068__480.jpg","https://cdn.pixabay.com/photo/2017/05/25/07/40/cat-2342562__480.jpg","https://cdn.pixabay.com/photo/2012/02/27/16/57/animal-17430__480.jpg","https://cdn.pixabay.com/photo/2017/04/06/15/15/cat-2208535__480.jpg","https://cdn.pixabay.com/photo/2017/05/18/10/57/cat-2323258__480.jpg","https://cdn.pixabay.com/photo/2016/11/18/21/26/cat-1836936__480.jpg","https://cdn.pixabay.com/photo/2017/03/19/22/09/cat-2157747__480.jpg","https://cdn.pixabay.com/photo/2017/04/21/13/24/red-headed-cat-2248705__480.jpg","https://cdn.pixabay.com/photo/2017/04/10/18/52/cat-2219427__480.jpg","https://cdn.pixabay.com/photo/2017/05/22/20/54/rest-2335341__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/09/46/cat-2309126__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/20/53/cat-2310623__480.jpg","https://cdn.pixabay.com/photo/2017/03/30/14/14/cat-2188612__480.jpg","https://cdn.pixabay.com/photo/2017/05/30/14/57/hunter-2357204__480.jpg","https://cdn.pixabay.com/photo/2017/05/12/06/00/cat-2306185__480.jpg","https://cdn.pixabay.com/photo/2017/05/23/21/31/cat-2338666__480.jpg","https://cdn.pixabay.com/photo/2017/05/03/05/25/cat-2280148__480.jpg","https://cdn.pixabay.com/photo/2017/04/08/13/53/cat-2213342__480.jpg","https://cdn.pixabay.com/photo/2017/03/22/00/13/cat-2163594__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/21/14/british-shorthair-2310671__480.jpg","https://cdn.pixabay.com/photo/2017/02/27/09/09/cat-2102418__480.jpg","https://cdn.pixabay.com/photo/2017/03/05/16/21/cat-2118990__480.jpg","https://cdn.pixabay.com/photo/2017/05/26/15/25/cat-2346301__480.jpg","https://cdn.pixabay.com/photo/2017/02/12/11/52/cat-house-physician-2059812__480.jpg","https://cdn.pixabay.com/photo/2017/04/27/08/26/animal-2264818__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/16/36/cat-2331692__480.jpg","https://cdn.pixabay.com/photo/2017/03/12/19/09/cat-2137810__480.jpg","https://cdn.pixabay.com/photo/2017/03/16/18/36/summer-2149911__480.jpg","https://cdn.pixabay.com/photo/2017/04/06/19/16/cat-2209109__480.jpg","https://cdn.pixabay.com/photo/2017/04/05/10/31/cat-baby-2204590__480.jpg","https://cdn.pixabay.com/photo/2017/02/24/17/10/chartreux-2095661__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/07/18/cat-2308849__480.jpg","https://cdn.pixabay.com/photo/2017/05/18/11/21/cat-2323326__480.jpg","https://cdn.pixabay.com/photo/2017/03/06/09/16/cat-2120915__480.jpg","https://cdn.pixabay.com/photo/2017/05/23/09/01/cat-2336605__480.jpg","https://cdn.pixabay.com/photo/2016/11/21/12/52/animal-1845248__480.jpg","https://cdn.pixabay.com/photo/2017/04/07/18/37/cat-2211609__480.jpg","https://cdn.pixabay.com/photo/2017/05/10/14/46/cat-2301015__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/09/47/cat-2309127__480.jpg","https://cdn.pixabay.com/photo/2017/05/22/07/40/cat-2333413__480.jpg","https://cdn.pixabay.com/photo/2017/03/12/01/29/cats-2136245__480.jpg","https://cdn.pixabay.com/photo/2017/05/29/10/30/kitten-2353403__480.jpg","https://cdn.pixabay.com/photo/2017/05/15/09/59/cat-2314326__480.jpg","https://cdn.pixabay.com/photo/2016/11/07/22/49/kitten-1807071__480.jpg","https://cdn.pixabay.com/photo/2016/12/16/20/44/cat-1912330__480.jpg","https://cdn.pixabay.com/photo/2016/11/06/19/42/cat-1803904__480.jpg","https://cdn.pixabay.com/photo/2016/11/15/12/36/cat-1826117__480.jpg","https://cdn.pixabay.com/photo/2016/03/27/16/55/cats-1283110__480.jpg","https://cdn.pixabay.com/photo/2016/08/30/18/15/cat-1631648__480.jpg","https://cdn.pixabay.com/photo/2017/06/11/11/14/cat-2392058__480.jpg","https://cdn.pixabay.com/photo/2017/01/07/14/33/cat-1960537__480.jpg","https://cdn.pixabay.com/photo/2016/10/16/10/00/cat-1744750__480.jpg","https://cdn.pixabay.com/photo/2017/02/26/14/12/cat-2100306__480.jpg","https://cdn.pixabay.com/photo/2017/05/05/21/51/cat-2288326__480.jpg","https://cdn.pixabay.com/photo/2017/05/26/15/25/cat-2346303__480.jpg","https://cdn.pixabay.com/photo/2016/09/16/19/47/cat-1674990__480.jpg","https://cdn.pixabay.com/photo/2016/10/16/10/00/cat-1744749__480.jpg","https://cdn.pixabay.com/photo/2017/02/03/09/26/cat-2034833__480.jpg","https://cdn.pixabay.com/photo/2016/10/20/05/50/cat-1754702__480.jpg","https://cdn.pixabay.com/photo/2016/11/21/11/41/animal-1844835__480.jpg","https://cdn.pixabay.com/photo/2017/03/05/18/05/cat-2119283__480.jpg","https://cdn.pixabay.com/photo/2017/02/02/18/18/cat-2033451__480.jpg","https://cdn.pixabay.com/photo/2016/12/13/19/12/cat-1904907__480.jpg","https://cdn.pixabay.com/photo/2016/12/23/15/58/cat-1927512__480.jpg","https://cdn.pixabay.com/photo/2016/12/11/02/41/cat-1898659__480.jpg","https://cdn.pixabay.com/photo/2016/08/16/14/40/cat-1598113__480.jpg","https://cdn.pixabay.com/photo/2016/07/13/10/34/cat-1514076__480.jpg","https://cdn.pixabay.com/photo/2016/12/30/17/27/cat-1941089__480.jpg","https://cdn.pixabay.com/photo/2016/05/17/17/16/cat-1398627__480.jpg","https://cdn.pixabay.com/photo/2016/09/18/12/29/cat-1678009__480.jpg","https://cdn.pixabay.com/photo/2016/12/11/02/51/cat-1898678__480.jpg"],j=""+new URL("../gif/loadiing-e416279f.gif",import.meta.url).href,l=({src:p,alt:c})=>{const[o,r]=m.useState(""),i=m.useRef(null);return m.useEffect(()=>{setTimeout(()=>{let a=null;return i.current&&(a=new IntersectionObserver(s=>{s[0].isIntersecting&&(r(p),a.unobserve(i.current))},{rootMargin:"0px 0px 200px 0px"}),a.observe(i.current)),()=>{a&&a.unobserve}},3e3)},[p]),t.jsx("img",{ref:i,src:o||j,alt:c})},Ht=()=>{const[p,c]=m.useState(()=>{let o=0;return Array.from(Array(100),()=>({id:o++,name:_.random(),src:n[Math.floor(Math.random()*n.length)]}))});return t.jsx(t.Fragment,{children:t.jsxs(d,{className:"max-w-full relative",children:[t.jsxs(y,{minify:"false",children:[t.jsx("span",{role:"img","aria-hidden":"true",children:"🧱"}),"MASONIC"]}),t.jsx(x,{children:t.jsx(g,{children:t.jsx(e,{items:p,columnGutter:8,columnWidth:172,overscanBy:5,render:f})})})]})})};function f({data:{id:p,name:c,src:o}}){return t.jsxs(b,{children:[t.jsx(l,{src:o||"",alt:"正在加载..."}),t.jsx("span",{children:c})]})}export{Ht as default};
