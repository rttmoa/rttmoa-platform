import{c4 as i,r as n,j as t,c5 as m,C as x,c6 as e}from"./.pnpm-e6eae8df.js";const g=i.main`
	/* position: relative; */
	/* min-height: 100vh; */
	width: 100%;
	/* background-color: red;/ */
`,r=i.div`
	padding: 8px;
	width: 100%;
	max-width: 960px;
	margin: 30px auto 0;
	box-sizing: border-box;
`,y=i.h1`
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
`,b=i.div`
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
`,_=["https://cdn.pixabay.com/photo/2017/06/12/19/02/cat-2396473__480.jpg","https://cdn.pixabay.com/photo/2015/06/03/13/13/cats-796437__480.jpg","https://cdn.pixabay.com/photo/2012/11/26/13/58/cat-67345__480.jpg","https://cdn.pixabay.com/photo/2014/09/18/20/17/cat-451377__480.jpg","https://cdn.pixabay.com/photo/2015/01/31/12/36/cat-618470__480.jpg","https://cdn.pixabay.com/photo/2014/07/24/18/40/cat-401124__480.jpg","https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__480.jpg","https://cdn.pixabay.com/photo/2015/02/14/10/16/cat-636172__480.jpg","https://cdn.pixabay.com/photo/2013/10/28/14/30/cat-201855__480.jpg","https://cdn.pixabay.com/photo/2015/04/16/15/21/cat-725793__480.jpg","https://cdn.pixabay.com/photo/2016/01/20/13/05/cat-1151519__480.jpg","https://cdn.pixabay.com/photo/2017/05/31/21/52/cat-2361787__480.jpg","https://cdn.pixabay.com/photo/2014/10/01/10/46/cat-468232__480.jpg","https://cdn.pixabay.com/photo/2014/04/29/13/19/cat-334383__480.jpg","https://cdn.pixabay.com/photo/2014/01/17/14/53/cat-246933__480.jpg","https://cdn.pixabay.com/photo/2017/05/31/21/46/cats-2361762__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/22/06/cat-2332444__480.jpg","https://cdn.pixabay.com/photo/2014/03/30/23/35/cat-301720__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/22/07/cat-2332451__480.jpg","https://cdn.pixabay.com/photo/2014/08/03/00/51/kitten-408798__480.jpg","https://cdn.pixabay.com/photo/2017/05/11/07/27/cat-2303146__480.jpg","https://cdn.pixabay.com/photo/2014/03/30/23/49/cat-301723__480.jpg","https://cdn.pixabay.com/photo/2013/07/18/20/27/cat-165068__480.jpg","https://cdn.pixabay.com/photo/2017/05/25/07/40/cat-2342562__480.jpg","https://cdn.pixabay.com/photo/2012/02/27/16/57/animal-17430__480.jpg","https://cdn.pixabay.com/photo/2017/04/06/15/15/cat-2208535__480.jpg","https://cdn.pixabay.com/photo/2017/05/18/10/57/cat-2323258__480.jpg","https://cdn.pixabay.com/photo/2016/11/18/21/26/cat-1836936__480.jpg","https://cdn.pixabay.com/photo/2017/03/19/22/09/cat-2157747__480.jpg","https://cdn.pixabay.com/photo/2017/04/21/13/24/red-headed-cat-2248705__480.jpg","https://cdn.pixabay.com/photo/2017/04/10/18/52/cat-2219427__480.jpg","https://cdn.pixabay.com/photo/2017/05/22/20/54/rest-2335341__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/09/46/cat-2309126__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/20/53/cat-2310623__480.jpg","https://cdn.pixabay.com/photo/2017/03/30/14/14/cat-2188612__480.jpg","https://cdn.pixabay.com/photo/2017/05/30/14/57/hunter-2357204__480.jpg","https://cdn.pixabay.com/photo/2017/05/12/06/00/cat-2306185__480.jpg","https://cdn.pixabay.com/photo/2017/05/23/21/31/cat-2338666__480.jpg","https://cdn.pixabay.com/photo/2017/05/03/05/25/cat-2280148__480.jpg","https://cdn.pixabay.com/photo/2017/04/08/13/53/cat-2213342__480.jpg","https://cdn.pixabay.com/photo/2017/03/22/00/13/cat-2163594__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/21/14/british-shorthair-2310671__480.jpg","https://cdn.pixabay.com/photo/2017/02/27/09/09/cat-2102418__480.jpg","https://cdn.pixabay.com/photo/2017/03/05/16/21/cat-2118990__480.jpg","https://cdn.pixabay.com/photo/2017/05/26/15/25/cat-2346301__480.jpg","https://cdn.pixabay.com/photo/2017/02/12/11/52/cat-house-physician-2059812__480.jpg","https://cdn.pixabay.com/photo/2017/04/27/08/26/animal-2264818__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/16/36/cat-2331692__480.jpg","https://cdn.pixabay.com/photo/2017/03/12/19/09/cat-2137810__480.jpg","https://cdn.pixabay.com/photo/2017/03/16/18/36/summer-2149911__480.jpg","https://cdn.pixabay.com/photo/2017/04/06/19/16/cat-2209109__480.jpg","https://cdn.pixabay.com/photo/2017/04/05/10/31/cat-baby-2204590__480.jpg","https://cdn.pixabay.com/photo/2017/02/24/17/10/chartreux-2095661__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/07/18/cat-2308849__480.jpg","https://cdn.pixabay.com/photo/2017/05/18/11/21/cat-2323326__480.jpg","https://cdn.pixabay.com/photo/2017/03/06/09/16/cat-2120915__480.jpg","https://cdn.pixabay.com/photo/2017/05/23/09/01/cat-2336605__480.jpg","https://cdn.pixabay.com/photo/2016/11/21/12/52/animal-1845248__480.jpg","https://cdn.pixabay.com/photo/2017/04/07/18/37/cat-2211609__480.jpg","https://cdn.pixabay.com/photo/2017/05/10/14/46/cat-2301015__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/09/47/cat-2309127__480.jpg","https://cdn.pixabay.com/photo/2017/05/22/07/40/cat-2333413__480.jpg","https://cdn.pixabay.com/photo/2017/03/12/01/29/cats-2136245__480.jpg","https://cdn.pixabay.com/photo/2017/05/29/10/30/kitten-2353403__480.jpg","https://cdn.pixabay.com/photo/2017/05/15/09/59/cat-2314326__480.jpg","https://cdn.pixabay.com/photo/2016/11/07/22/49/kitten-1807071__480.jpg","https://cdn.pixabay.com/photo/2016/12/16/20/44/cat-1912330__480.jpg","https://cdn.pixabay.com/photo/2016/11/06/19/42/cat-1803904__480.jpg","https://cdn.pixabay.com/photo/2016/11/15/12/36/cat-1826117__480.jpg","https://cdn.pixabay.com/photo/2016/03/27/16/55/cats-1283110__480.jpg","https://cdn.pixabay.com/photo/2016/08/30/18/15/cat-1631648__480.jpg","https://cdn.pixabay.com/photo/2017/06/11/11/14/cat-2392058__480.jpg","https://cdn.pixabay.com/photo/2017/01/07/14/33/cat-1960537__480.jpg","https://cdn.pixabay.com/photo/2016/10/16/10/00/cat-1744750__480.jpg","https://cdn.pixabay.com/photo/2017/02/26/14/12/cat-2100306__480.jpg","https://cdn.pixabay.com/photo/2017/05/05/21/51/cat-2288326__480.jpg","https://cdn.pixabay.com/photo/2017/05/26/15/25/cat-2346303__480.jpg","https://cdn.pixabay.com/photo/2016/09/16/19/47/cat-1674990__480.jpg","https://cdn.pixabay.com/photo/2016/10/16/10/00/cat-1744749__480.jpg","https://cdn.pixabay.com/photo/2017/02/03/09/26/cat-2034833__480.jpg","https://cdn.pixabay.com/photo/2016/10/20/05/50/cat-1754702__480.jpg","https://cdn.pixabay.com/photo/2016/11/21/11/41/animal-1844835__480.jpg","https://cdn.pixabay.com/photo/2017/03/05/18/05/cat-2119283__480.jpg","https://cdn.pixabay.com/photo/2017/02/02/18/18/cat-2033451__480.jpg","https://cdn.pixabay.com/photo/2016/12/13/19/12/cat-1904907__480.jpg","https://cdn.pixabay.com/photo/2016/12/23/15/58/cat-1927512__480.jpg","https://cdn.pixabay.com/photo/2016/12/11/02/41/cat-1898659__480.jpg","https://cdn.pixabay.com/photo/2016/08/16/14/40/cat-1598113__480.jpg","https://cdn.pixabay.com/photo/2016/07/13/10/34/cat-1514076__480.jpg","https://cdn.pixabay.com/photo/2016/12/30/17/27/cat-1941089__480.jpg","https://cdn.pixabay.com/photo/2016/05/17/17/16/cat-1398627__480.jpg","https://cdn.pixabay.com/photo/2016/09/18/12/29/cat-1678009__480.jpg","https://cdn.pixabay.com/photo/2016/12/11/02/51/cat-1898678__480.jpg","https://cdn.pixabay.com/photo/2017/05/26/15/25/cat-2346301__480.jpg","https://cdn.pixabay.com/photo/2017/02/12/11/52/cat-house-physician-2059812__480.jpg","https://cdn.pixabay.com/photo/2017/04/27/08/26/animal-2264818__480.jpg","https://cdn.pixabay.com/photo/2017/05/21/16/36/cat-2331692__480.jpg","https://cdn.pixabay.com/photo/2017/03/12/19/09/cat-2137810__480.jpg","https://cdn.pixabay.com/photo/2017/03/16/18/36/summer-2149911__480.jpg","https://cdn.pixabay.com/photo/2017/04/06/19/16/cat-2209109__480.jpg","https://cdn.pixabay.com/photo/2017/04/05/10/31/cat-baby-2204590__480.jpg","https://cdn.pixabay.com/photo/2017/02/24/17/10/chartreux-2095661__480.jpg","https://cdn.pixabay.com/photo/2017/05/13/07/18/cat-2308849__480.jpg","https://cdn.pixabay.com/photo/2017/05/18/11/21/cat-2323326__480.jpg","https://cdn.pixabay.com/photo/2017/03/06/09/16/cat-2120915__480.jpg","https://cdn.pixabay.com/photo/2017/05/23/09/01/cat-2336605__480.jpg","https://cdn.pixabay.com/photo/2016/11/21/12/52/animal-1845248__480.jpg"],j=""+new URL("../gif/loadiing-e416279f.gif",import.meta.url).href,l=({src:p,alt:c})=>{const[a,s]=n.useState(""),h=n.useRef(null);return n.useEffect(()=>{setTimeout(()=>{let o=null;return h.current&&(o=new IntersectionObserver(d=>{d[0].isIntersecting&&(s(p),o.unobserve(h.current))},{rootMargin:"0px 0px 200px 0px"}),o.observe(h.current)),()=>{o&&o.unobserve}},3e3)},[p]),t.jsx("img",{ref:h,src:a||j,alt:c})},v=()=>{const[p,c]=n.useState(()=>{let a=0;return Array.from(Array(100),()=>({id:a++,name:m.random(),src:_[Math.floor(Math.random()*_.length)]}))});return t.jsx(t.Fragment,{children:t.jsxs(x,{className:"max-w-full relative",children:[t.jsxs(y,{minify:"false",children:[t.jsx("span",{role:"img","aria-hidden":"true",children:"🧱"}),"MASONIC"]}),t.jsx(g,{children:t.jsx(r,{children:t.jsx(e,{items:p,columnGutter:8,columnWidth:172,overscanBy:5,render:u})})})]})})};function u({data:{id:p,name:c,src:a}}){return t.jsxs(b,{children:[t.jsx(l,{src:a||"",alt:"正在加载..."}),t.jsx("span",{children:c})]})}export{v as default};
