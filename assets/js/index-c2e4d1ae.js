import{j as t}from"./react-12b51ca5.js";import{u as i}from"./styled-components-0b39ac28.js";import{H as d,t as h}from"./prism-react-renderer-7e75e3e5.js";import{Y as u}from"./antd-e2492052.js";import"./@ant-design-63539318.js";import"./rc-util-8976b5fa.js";import"./react-dom-e71a48dd.js";import"./@babel-c46ce09a.js";import"./classnames-3ded05b8.js";import"./resize-observer-polyfill-0f9f8adb.js";import"./rc-resize-observer-5c9960e4.js";import"./@umijs-02c6bdf5.js";import"./swr-1237c4b3.js";import"./use-sync-external-store-ad55a9d4.js";import"./@dnd-kit-908a095e.js";import"./dayjs-6d610299.js";import"./@ctrl-bad846bd.js";import"./omit.js-929edb61.js";import"./lodash.merge-9922d51b.js";import"./safe-stable-stringify-023075f7.js";import"./@chenshuai2144-5a33ccd2.js";import"./reactcss-f166c0a9.js";import"./lodash-40f09dbd.js";import"./tinycolor2-ea5bcbb6.js";import"./lodash.tonumber-b59040d8.js";import"./rc-field-form-e46b50c8.js";import"./async-validator-dee29e8b.js";import"./@emotion-70f0a3ab.js";import"./stylis-d04dd720.js";import"./clsx-0839fdbe.js";import"./rc-motion-25d44171.js";import"./rc-notification-3ca02e51.js";import"./rc-overflow-7fc9dc70.js";import"./rc-picker-d202c760.js";import"./@rc-component-60bdd203.js";import"./rc-tabs-f080ce12.js";import"./rc-dropdown-1fd4539e.js";import"./rc-menu-c99c3faa.js";import"./rc-cascader-238c5b8d.js";import"./rc-select-8e380119.js";import"./rc-virtual-list-5b0902fa.js";import"./rc-tree-898f7873.js";import"./rc-input-number-f64f90f1.js";import"./rc-input-3682369a.js";import"./rc-collapse-3e02f0e2.js";import"./rc-drawer-9ef263c4.js";import"./scroll-into-view-if-needed-582d6ca4.js";import"./compute-scroll-into-view-e3f0ecc2.js";import"./rc-image-3cfe7923.js";import"./rc-dialog-8eb1683d.js";import"./rc-mentions-9823f19c.js";import"./rc-textarea-b098f88a.js";import"./rc-tooltip-01b6b839.js";import"./qrcode.react-e22f0a27.js";import"./rc-rate-2d3465a8.js";import"./rc-segmented-6536d122.js";import"./rc-slider-e91f05e6.js";import"./rc-steps-f39c48c2.js";import"./rc-switch-8d316ace.js";import"./rc-table-a211065a.js";import"./rc-checkbox-ae7b2d99.js";import"./throttle-debounce-87e7e444.js";import"./rc-pagination-334fefa5.js";import"./rc-tree-select-5a273e06.js";import"./copy-to-clipboard-47a2b094.js";import"./toggle-selection-93f4ad84.js";import"./rc-upload-71d17dfe.js";import"./rc-progress-a416f280.js";i.div`
  font-family: sans-serif;
  text-align: center;
`;const x=i.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;

  & .token-line {
    line-height: 1.3em;
    height: 1.3em;
  }
`,g=i.div`
  display: table-row;
`,f=i.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`,j=i.span`
  display: table-cell;
`,Nt=()=>{const p=`
import React, { useState } from "react"; 

function Example() {
  const [count, setCount] = useState(0); 
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`.trim();return t.jsx(t.Fragment,{children:t.jsxs(u,{children:[t.jsx("h2",{children:"Welcome to prism-react-renderer!"}),t.jsx(d,{theme:h.nightOwl,code:p,language:"tsx",children:({className:e,style:n,tokens:s,getLineProps:a,getTokenProps:l})=>t.jsx(x,{className:e,style:n,children:s.map((o,r)=>t.jsxs(g,{...a({line:o,key:r}),children:[t.jsx(f,{children:r+1}),t.jsx(j,{children:o.map((c,m)=>t.jsx("span",{...l({token:c,key:m})},m))})]},r))})})]})})};export{Nt as default};
