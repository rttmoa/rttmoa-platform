import{O as h,r as m,j as c,R as d,C as a}from"./index-44a46bca.js";import{E as s}from"./index-a865658e.js";import{C as o}from"./index-5a99146c.js";import{D as r}from"./index-75f31e24.js";import{T as p}from"./index-902a08c2.js";import"./Skeleton-1ea6ca93.js";import"./styleChecker-bba53070.js";import"./transButton-91a5311c.js";const u=e=>({xAxis:{type:"category",data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},grid:{left:"5%",right:"5%",bottom:"3%",top:"8%",containLabel:!0},yAxis:{type:"value",splitLine:{show:!0,lineStyle:{color:e?"#5e5e5e":"#e0e6f1"}}},series:[{data:[20,200,150,80,70,110,130],type:"bar",color:"#1890FF",barWidth:10,showBackground:!0,backgroundStyle:{color:"rgba(180, 180, 180, 0.2)"}},{data:[62,31,76,23,3,123,223],type:"bar",color:"#acd897",barWidth:10,showBackground:!0,backgroundStyle:{color:"rgba(180, 180, 180, 0.2)"}}]}),x=e=>({tooltip:{trigger:"axis"},grid:{left:"3%",right:"4%",bottom:"3%",top:"3%",containLabel:!0},xAxis:{type:"category",boundaryGap:!1,data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{type:"value",splitLine:{show:!0,lineStyle:{color:e?"#5e5e5e":"#e0e6f1"}}},series:[{name:"Email",type:"line",stack:"Total",data:[120,132,101,134,90,230,210]},{name:"Union Ads",type:"line",stack:"Total",data:[220,182,191,234,290,330,310]},{name:"Video Ads",type:"line",stack:"Total",data:[150,232,201,154,190,330,410]},{name:"Direct",type:"line",stack:"Total",data:[320,332,301,334,390,330,320]}]}),b=e=>({grid:{left:"3%",right:"4%",bottom:"3%",top:"3%",containLabel:!0},xAxis:{axisLabel:{color:e?"#757780":"#5e5e5e"},axisLine:{lineStyle:{color:e?"#5e5e5e":"#e0e6f1"}},splitLine:{lineStyle:{color:e?"#5e5e5e":"#e0e6f1"}}},yAxis:{axisLabel:{color:e?"#757780":"#5e5e5e"},axisLine:{lineStyle:{color:e?"#5e5e5e":"#e0e6f1"}},splitLine:{lineStyle:{color:e?"#5e5e5e":"#e0e6f1"}}},series:[{symbolSize:20,data:[[10,8.04],[8.07,6.95],[13,7.58],[9.05,2.81],[12.2,1.83]],type:"scatter"},{symbolSize:20,data:[[11,8.33],[14,7.66],[13.4,2.81],[10,6.33],[3.03,4.23]],type:"scatter"},{symbolSize:20,data:[[14,8.96],[12.5,6.82],[9.15,7.2],[12.5,3.2],[2.02,4.47]],type:"scatter"},{symbolSize:20,data:[[1.05,3.33],[4.05,4.96],[6.03,7.24],[12,6.26],[12,8.84],[7.08,5.82],[5.02,5.68]],type:"scatter"}]}),y=()=>({tooltip:{trigger:"item"},legend:{type:"scroll",bottom:10,data:function(){for(var e=[],t=1;t<=28;t++)e.push(t+2e3+"");return e}()},visualMap:{top:"middle",right:10,color:["red","yellow"],calculable:!0},radar:{indicator:[{text:"IE8-",max:400},{text:"IE9+",max:400},{text:"Safari",max:400},{text:"Firefox",max:400},{text:"Chrome",max:400}]},series:function(){for(var e=[],t=1;t<=28;t++)e.push({type:"radar",symbol:"none",lineStyle:{width:1},emphasis:{areaStyle:{color:"rgba(0,250,0,0.3)"}},data:[{value:[(40-t)*10,(38-t)*4+60,t*5+10,t*9,t*t/2],name:t+2e3+""}]});return e}()}),g=()=>({tooltip:{trigger:"item"},series:[{name:"Access From",type:"pie",radius:["47%","80%"],itemStyle:{borderRadius:10,borderColor:"#fff",borderWidth:5},label:{show:!0,fontSize:12},labelLine:{show:!0},data:[{value:1048,name:"Search Engine"},{value:735,name:"Direct"},{value:580,name:"Email"},{value:484,name:"Union Ads"},{value:300,name:"Video Ads"}]}]}),v=()=>({tooltip:{formatter:"{a} <br/>{b} : {c}%"},series:[{name:"Pressure",type:"gauge",radius:"90%",progress:{show:!0},detail:{valueAnimation:!0,formatter:"{value}"},data:[{value:28,name:"温度",itemStyle:{}}]}]}),z=()=>{const t={show:!0,position:"top",offset:[0,-20],formatter:function(n){return(n.value/150*100).toFixed(0)+"%"},fontSize:18,fontFamily:"Arial"},i={symbol:"none",lineStyle:{opacity:.3},data:[{type:"max",label:{formatter:"max: {c}"}},{type:"min",label:{formatter:"min: {c}"}}]},l=["path://M36.7,102.84c-1.17,2.54-2.99,4.98-3.39,7.63c-1.51,9.89-3.31,19.58-1.93,29.95 c0.95,7.15-2.91,14.82-3.57,22.35c-0.64,7.36-0.2,14.86,0.35,22.25c0.12,1.68,2.66,3.17,4.67,5.4c-0.6,0.82-1.5,2.22-2.58,3.48 c-0.96,1.12-1.96,2.35-3.21,3.04c-1.71,0.95-3.71,2.03-5.51,1.9c-1.18-0.08-3.04-2.13-3.16-3.43c-0.44-4.72,0-9.52-0.41-14.25 c-0.94-10.88-2.32-21.72-3.24-32.61c-0.49-5.84-1.63-12.01-0.35-17.54c3.39-14.56,2.8-28.84,0.36-43.4 c-2.71-16.16-1.06-32.4,0.54-48.59c0.91-9.22,4.62-17.36,8.53-25.57c1.32-2.77,1.88-6.84,0.87-9.62C21.89-3.77,18.09-11,14.7-18.38 c-0.56,0.1-1.13,0.21-1.69,0.31C10.17-11.52,6.29-5.2,4.71,1.65C2.05,13.21-4.42,22.3-11.43,31.28c-1.32,1.69-2.51,3.5-3.98,5.04 c-4.85,5.08-3.25,10.98-2.32,16.82c0.25,1.53,0.52,3.06,0.77,4.59c-0.53,0.22-1.07,0.43-1.6,0.65c-1.07-2.09-2.14-4.19-3.28-6.44 c-6.39,2.91-2.67,9.6-5.23,15.16c-1.61-3.31-2.77-5.68-3.93-8.06c0-0.33,0-0.67,0-1c6.96-16.08,14.63-31.9,20.68-48.31 C-5.24-4.07-2.03-18.55,2-32.73c0.36-1.27,0.75-2.53,0.98-3.82c1.36-7.75,4.19-10.23,11.88-10.38c1.76-0.04,3.52-0.21,5.76-0.35 c-0.55-3.95-1.21-7.3-1.45-10.68c-0.61-8.67,0.77-16.69,7.39-23.19c2.18-2.14,4.27-4.82,5.25-7.65c2.39-6.88,11.66-9,16.94-8.12 c5.92,0.99,12.15,7.93,12.16,14.12c0.01,9.89-5.19,17.26-12.24,23.68c-2.17,1.97-5.35,4.77-5.17,6.94c0.31,3.78,4.15,5.66,8.08,6.04 c1.82,0.18,3.7,0.37,5.49,0.1c5.62-0.85,8.8,2.17,10.85,6.73C73.38-27.19,78.46-14.9,84.2-2.91c1.52,3.17,4.52,5.91,7.41,8.09 c7.64,5.77,15.57,11.16,23.45,16.61c2.28,1.58,4.64,3.23,7.21,4.14c5.18,1.84,8.09,5.63,9.82,10.46c0.45,1.24,0.19,3.71-0.6,4.18 c-1.06,0.63-3.15,0.27-4.44-0.38c-7.05-3.54-12.84-8.88-19.14-13.5c-3.5-2.57-7.9-4-12.03-5.6c-9.44-3.66-17.73-8.42-22.5-18.09 c-2.43-4.94-6.09-9.27-9.69-14.61c-1.2,10.98-4.46,20.65,1.14,31.19c6.62,12.47,5.89,26.25,1.21,39.49 c-2.52,7.11-6.5,13.74-8.67,20.94c-1.91,6.33-2.2,13.15-3.23,19.75c-0.72,4.63-0.84,9.48-2.36,13.84 c-2.49,7.16-6.67,13.83-5.84,21.82c0.42,4.02,1.29,7.99,2.1,12.8c-3.74-0.49-7.47-0.4-10.67-1.66c-1.33-0.53-2.43-4.11-2.07-6.01 c1.86-9.94,3.89-19.69,0.07-29.74C34.55,108.63,36.19,105.52,36.7,102.84c1.25-8.45,2.51-16.89,3.71-24.9 c-0.83-0.58-0.85-0.59-0.87-0.61c-0.03,0.16-0.07,0.32-0.09,0.48C38.53,86.15,37.62,94.5,36.7,102.84z","path://M40.02-99c2.07,1.21,4.26,2.25,6.19,3.66c5.94,4.34,8.23,12.57,4.95,19.79 c-3.21,7.08-6.82,14.03-10.86,20.67c-2.17,3.56-1.25,5.38,1.99,6.36c2.94,0.89,6.36,1.91,9.15,1.21c5.51-1.4,8.33,1.23,10.66,5.29 c4.71,8.22,9.72,16.29,13.84,24.8C81.06-6.65,89,0.4,99.56,5.17C109.82,9.8,120,14.7,129.85,20.15c4.72,2.61,9.09,6.37,10.24,12.97 c-2.89-1.93-5.2-3.75-7.78-5.04c-0.99-0.5-2.6,0.22-4.83,0.5c-5.36-9.35-16.8-9.4-26.74-12.62C91.68,13.04,81.82,11.37,75.66,3 c-5.98-8.13-11.61-16.52-17.4-24.79c-0.46-0.66-0.98-1.27-1.66-2.16c-3.21,7.75-6.78,15-9.12,22.63c-1.15,3.76-0.64,8.37,0.26,12.33 c0.81,3.59,3.01,6.92,4.87,10.22c6.73,11.95,2.41,22.89-2.91,33.75c-0.35,0.72-0.86,1.43-1.46,1.97 c-7.11,6.38-14.48,12.5-21.24,19.22c-2.08,2.07-3.1,5.7-3.62,8.77c-1.92,11.44-3.81,22.92-4.93,34.46 c-0.5,5.16,1.06,10.49,1.28,15.75c0.23,5.7,0.39,11.47-0.15,17.13c-1.15,12.11-2.83,24.17-4.11,36.27c-0.18,1.72,0.8,3.53,1.13,5.33 c0.88,4.76-0.22,6.23-4.71,5.17c-4.53-1.06-8.86-2.94-14.27-4.8c1.98-1.62,2.84-2.83,3.94-3.12c5.42-1.44,7-5.2,6.39-10.23 c-1.39-11.39-3.15-22.73-4.24-34.14c-0.53-5.56,0.16-11.23,0.24-16.85c0.06-4.49,0.01-8.97,0.01-14.72 c-2.79,1.53-5.2,2.27-6.79,3.83c-4.26,4.19-8.39,8.56-12.11,13.22c-1.55,1.95-2.19,4.76-2.79,7.29c-0.47,1.99,0.6,5.02-0.48,6.05 c-2.17,2.08-5.2,3.79-8.13,4.38c-3.61,0.73-7.49,0.18-12.26,0.18c6.34-8.69,11.91-16.11,17.22-23.71c3.29-4.71,6.23-9.67,9.24-14.58 c2.15-3.5,3.76-7.4,6.3-10.57c5.38-6.73,6.74-14.28,6.72-22.64C0.88,68.3,1.36,57.91,2.26,47.58c0.69-7.85,2.15-15.67,3.7-23.41 c0.77-3.83,2.89-7.39,3.72-11.22c1.83-8.4-1.9-16-4.38-23.95C2.96-5.34-0.31,0.12-1.5,6c-1.96,9.72-7.34,17.44-12.26,25.57 c-4.39,7.25-8.79,14.52-12.75,22.01c-2.64,5-4.5,10.41-6.83,15.92c-4.82-5.28-4.65-10.59-0.94-16.97 C-21.4,30.4-12.08,6.78-6.17-18.12c1.4-5.88,1.24-12.11,2.23-18.12c1.2-7.27,4.15-9.56,11.39-9.69c8.65-0.14,13.86-4.77,14.48-13.51 c0.35-5.01,0.16-10.11-0.28-15.12c-0.82-9.3,2.49-16.57,10.17-21.69c2.08-1.39,4.78-1.87,7.2-2.76C39.35-99,39.69-99,40.02-99z","path://M-39,33.03c3.72-9.74,12.97-12.87,20.96-17.43c9.51-5.43,19.2-10.54,28.69-16 c1.77-1.02,3.35-2.85,4.33-4.67C21.44-17,27.82-28.95,33.95-41.04c2.13-4.2,4.95-6.01,9.7-6.09c3.68-0.06,7.52-0.92,10.97-2.25 c5.09-1.95,4.85-5.2,1.1-9.01c-5.12-5.21-10.89-10.1-13.23-17.54c-1.71-5.44,0.78-15.62,4.87-18.74 c4.12-3.15,12.55-3.84,16.69-0.12c3.39,3.04,6.44,7.27,7.8,11.56c1.96,6.16,3.31,12.9,2.99,19.29 c-0.45,9.21,6.35,16.71,15.73,16.97c7.94,0.21,9.27,0.78,10.69,8.61c5.23,28.73,19.4,53.73,32.21,79.33 c1.95,3.9,4.32,7.71,5.51,11.84c1.03,3.61,0.66,7.61,0.91,11.45c-0.73,0.14-1.45,0.28-2.18,0.42c-0.49-1.57-0.98-3.15-1.47-4.72 c-0.22,0.09-0.44,0.19-0.66,0.28c-0.85-2.62-1.7-5.24-2.74-8.45c-0.9,2.53-1.55,4.4-2.21,6.26c-0.41-0.03-0.83-0.06-1.24-0.08 c-0.19-2.78-0.35-5.56-0.56-8.34c-0.67-9.04-7.05-14.8-12.04-21.47c-5.2-6.95-10.31-14.09-14.36-21.73 c-3.56-6.7-5.59-14.21-9-21.29c-3.02,9.7-8.69,18.66-6.3,29.2c0.63,2.78,2.68,5.21,3.87,7.9c4.73,10.64,5.56,22.14,6.92,33.46 c1.21,10.13,1.88,20.38,1.96,30.59c0.06,7.02-1.67,14.04-1.85,21.08c-0.12,4.66,0.83,9.41,1.73,14.03 c1.21,6.22,2.81,12.36,4.28,18.52c0.3,1.26,0.69,2.51,1.23,3.69c3.92,8.54,7.79,17.1,11.88,25.55c1.3,2.67,3.24,5.04,5.07,7.83 c-2.19,0.86-3.64,1.76-5.17,1.97c-3.53,0.47-6.9,0.64-8.13-4.11c-1.71-6.58-3.78-13.07-5.87-19.54c-0.44-1.35-1.6-2.47-3.21-3.33 c0,16.17-7.35,32.86,6.17,48.11c-3.55,0-5.95,0.01-8.36,0c-7.59-0.03-7.66-0.54-7.72-7.64c-0.11-13.74-0.69-27.4-5.27-40.71 c-1.72-5.01-0.38-11.01-1.01-16.49c-0.67-5.79-2.11-11.48-3.08-17.24c-2.52-14.91-12.01-26.06-20.01-38.12 c-5.34-8.06-10.18-16.56-14.25-25.32c-5.18-11.16-5.52-22.61,1.24-33.57c3.68-5.96,3.12-12.27,1.17-18.55 c-2.5-8.03-5.22-16-8.05-24.61c-0.91,1.44-1.76,2.86-2.68,4.24C32.9-10.29,28.04-2.46,22.63,4.96c-5.34,7.34-14.22,8.45-22.08,10.9 c-8.48,2.65-17.2,4.46-23.03,12.01c-1.84,2.39-3.61,4.84-5.41,7.26c-0.39-0.17-0.78-0.34-1.16-0.51c0.81-2.38,1.62-4.76,2.43-7.14 c-0.2-0.22-0.39-0.44-0.59-0.66c-1.24,1.3-2.31,2.88-3.77,3.83c-2.54,1.66-5.33,2.94-8.02,4.37C-39,34.36-39,33.7-39,33.03z","path://M80,100.49c0,5.23,0.13,10.46-0.03,15.69c-0.2,6.3-0.57,12.6-0.99,18.9 c-0.94,14.08-2.08,28.14-2.87,42.22c-0.41,7.29,4.95,14.31,12.03,16.62c1.22,0.4,2.43,0.84,3.65,2.16c-1.8,0.35-3.59,0.91-5.4,1 c-5.4,0.3-10.83,0.7-16.22,0.42c-1.44-0.07-3.7-2.25-3.95-3.74c-0.56-3.4,0.14-6.98-0.13-10.45c-0.77-9.67-0.8-19.56-3-28.92 c-1.97-8.39-2.18-16.07-0.02-24.35c1.28-4.91,1.34-10.48,0.5-15.52c-2.09-12.71-4.95-25.31-7.65-37.92 c-0.34-1.57-1.3-3.33-2.52-4.33c-3.71-3.01-7.37-6.38-11.62-8.38c-13.61-6.41-19.23-28.93-9.14-42.66 c5.41-7.36,5.32-13.85,0.74-21.4c-4.33-7.14-7.8-14.79-11.71-22.32C16.35-14.03,11.08-4.82,4.94,3.76 C1.8,8.13-2.43,12.19-7.04,14.93c-5.3,3.15-11.39,5.39-17.43,6.76c-9.05,2.05-14.31,7.59-17.67,15.68 c-0.43,1.05-1.13,1.99-1.76,2.95c-0.15,0.22-0.52,0.29-1.8,0.94c0.32-2.2,0.61-3.74,0.74-5.3c0.09-1.14-0.04-2.3-0.07-3.46 c-1.38,0.26-3.21,0.05-4.06,0.86c-2,1.91-3.5,4.33-5.27,6.49c-0.5,0.61-1.22,1.03-1.95,1.61c-1.02-5.19,1.42-10.27,7.11-13.9 C-36.09,19.24-22.82,11.2-9.77,2.82c2.12-1.36,3.99-3.6,5.17-5.85C1.52-14.72,7.44-26.52,13.29-38.35 c2.21-4.48,5.11-7.27,10.48-7.83c3.23-0.34,6.27-2.47,9.89-4.01c-4.23-4.83-8.31-8.74-11.49-13.28c-6.34-9.03-7.03-22.38,3.14-29.92 c6.9-5.12,13.79-4.47,20.85,0.69c6.15,4.5,6.15,11.2,7.55,17.13c1.32,5.6,0.82,11.84,0.1,17.67c-0.73,5.9-0.29,7.53,5.3,8.73 c0.96,0.21,1.99,0.17,2.98,0.19C72.51-48.76,74.44-47.06,76-36.52c1.83,12.35,2.1,25.03,6.99,36.77 c3.28,7.88,6.57,15.79,10.47,23.38c3.66,7.12,8.05,13.87,12.25,20.7c2.97,4.84,3.11,12.13-0.65,17c-1.8-2.05-3.45-3.92-5.01-5.7 c0.04-0.04-0.45,0.53-1.46,1.71C94.83,37.86,80.48,24.72,71.82,8.18c0.46,3.43,0.09,7.26,1.54,10.2c3.95,8.01,1.92,16.67,3.56,24.91 c1.63,8.22,1.87,16.74,3.79,24.88c0.88,3.73,4.32,6.84,6.58,10.25c1.09,1.65,2.2,3.29,3.17,5.01c4.84,8.58,9.09,17.55,14.58,25.69 c7.27,10.79,15.21,21.16,23.39,31.28c6.19,7.67,13.08,14.8,19.92,21.92c2.93,3.04,6.54,5.42,9.96,8.2 c-6.92,4.09-12.67,3.33-19.87-2.17c-1.82-1.39-3.76-2.79-5.87-3.62c-4.12-1.63-4.47-4.54-3.73-8.3c0.26-1.33,0.17-3.42-0.66-4.18 c-7.53-6.87-14.85-14.07-23.04-20.07c-7.75-5.68-12.26-13.2-16.11-21.54c-1.44-3.12-3.31-6.06-5.14-8.98 c-0.5-0.8-1.57-1.24-2.38-1.85C81.01,100.03,80.5,100.26,80,100.49z","path://M-57,41.03c3.65-4.15,7.17-8.43,10.98-12.42c6.53-6.83,13.31-13.41,19.84-20.23 c1.76-1.84,3.51-3.98,4.4-6.31c3.8-9.99,6.99-20.23,10.99-30.14c2.74-6.79,5.65-13.62,12.37-17.95c4.17-2.68,5.12-7.31,4.29-11.96 c-0.3-1.67-2.02-3.08-3.35-4.97c-2.57,5.59-4.62,10.03-7.21,15.66c-4.79-6.43-9.76-10.83-11.68-16.31 c-1.77-5.04-1.18-11.44,0.04-16.86c1.27-5.62,5.24-9.71,12.03-9.7c1.55,0,3.1-1.68,4.66-2.55c9.3-5.22,20.47-1.53,25.73,7.59 c4.06,7.04,4.84,14.6,5.57,22.26c0.65,6.82-0.32,7.59-8.26,8.11c0,1.97,0,3.96,0,5.95c8.01-0.17,8.01,0.43,12.02,7.52 c2.09,3.69,6.34,6.1,9.41,9.29c2.48,2.58,7.04,3.14,7.24,8c0.29,6.79,0.46,6.78-6.43,11.08c0,15.78-0.02,31.49,0.03,47.2 c0,1.23,0.29,2.51,0.71,3.67c1.64,4.59,3.27,9.19,5.13,13.7c0.79,1.92,1.88,3.83,3.26,5.36c7.54,8.36,15.45,16.41,22.75,24.96 c5.09,5.97,9.05,12.9,14.18,18.84c9.73,11.26,19.47,22.59,30.08,33c8.84,8.67,18.88,16.13,28.51,23.98 c2.52,2.06,5.48,3.58,8.27,5.36c-4.02,3.54-10.94,4.01-16.34,1.62c-4.76-2.11-9.63-4.03-14.6-5.56c-5.6-1.72-6.59-3.72-4.42-9.32 c0.47-1.22-0.12-3.8-1.11-4.5c-7.36-5.15-14.66-10.53-22.55-14.78c-8.49-4.57-15.35-10.3-19.59-19.04 c-4.29-8.84-11.6-14.85-19.48-20.29c-3.2-2.21-6.43-4.4-9.64-6.6c-0.53,0.17-1.05,0.33-1.58,0.5c-0.11,11.17,0.12,22.36-0.45,33.51 c-0.29,5.72-2.33,11.33-3,17.05c-1.68,14.31-3.04,28.65-4.51,42.98c-0.34,3.34,0.94,5.76,4.12,7.18c6.09,2.73,12.14,5.56,18.61,9.26 c-3.96,0.36-7.93,0.72-11.89,1.08c-4.92,0.45-9.91,0.53-14.76,1.42c-6.96,1.28-9.68-0.99-8.69-8.02c1.73-12.28,0.67-24.36-1.4-36.56 c-1.08-6.36-2.02-14.02,0.49-19.47c5.62-12.19,2.4-23.48,0.01-35.2c-2.05-10.04-3.8-20.14-5.9-30.17c-0.32-1.52-1.72-2.91-2.87-4.13 c-3.6-3.83-8.03-7.09-10.85-11.41c-6.61-10.14-2.6-19.6,3.74-28.13c5.27-7.1,6.85-14.1,2.15-21.95c-3.79-6.34-7.53-12.7-11.38-19 c-0.46-0.75-1.41-1.2-2.77-2.3c-3.27,7.28-6.98,13.9-9.24,20.98c-3.58,11.2-12.11,17.05-21.53,22.3c-1.86,1.04-3.57,2.44-5.53,3.21 c-4.29,1.67-6.09,3.88-4.9,9.01c0.69,2.96-1.31,6.55-2.1,9.86c-0.5,0.03-0.99,0.06-1.49,0.08c-0.18-2.57-0.36-5.14-0.66-9.41 c-3.45,4.38-6.11,7.75-9.33,11.84c-1.07-2.08-1.61-3.13-2.15-4.18C-57,43.7-57,42.36-57,41.03z"];return{tooltip:{},legend:{data:["typeA","typeB"],selectedMode:"single"},xAxis:{data:["a","b","c","d","e"],axisTick:{show:!1},axisLine:{show:!1},axisLabel:{show:!1}},yAxis:{max:150,offset:20,splitLine:{show:!1}},grid:{top:"center",height:230},markLine:{z:-100},series:[{name:"typeA",type:"pictorialBar",symbolClip:!0,symbolBoundingData:150,label:t,data:[{value:123,symbol:l[0]},{value:34,symbol:l[1]},{value:101,symbol:l[2]},{value:89,symbol:l[3]},{value:72,symbol:l[4]}],markLine:i,z:10},{name:"typeB",type:"pictorialBar",symbolClip:!0,symbolBoundingData:150,label:t,data:[{value:12,symbol:l[0]},{value:44,symbol:l[1]},{value:131,symbol:l[2]},{value:33,symbol:l[3]},{value:142,symbol:l[4]}],markLine:i,z:10},{name:"full",type:"pictorialBar",symbolBoundingData:150,animationDuration:0,itemStyle:{color:"#ccc"},data:[{value:1,symbol:l[0]},{value:1,symbol:l[1]},{value:1,symbol:l[2]},{value:1,symbol:l[3]},{value:1,symbol:l[4]}]}]}},C=()=>{const e={reindeer:"path://M-22.788,24.521c2.08-0.986,3.611-3.905,4.984-5.892 c-2.686,2.782-5.047,5.884-9.102,7.312c-0.992,0.005-0.25-2.016,0.34-2.362l1.852-0.41c0.564-0.218,0.785-0.842,0.902-1.347 c2.133-0.727,4.91-4.129,6.031-6.194c1.748-0.7,4.443-0.679,5.734-2.293c1.176-1.468,0.393-3.992,1.215-6.557 c0.24-0.754,0.574-1.581,1.008-2.293c-0.611,0.011-1.348-0.061-1.959-0.608c-1.391-1.245-0.785-2.086-1.297-3.313 c1.684,0.744,2.5,2.584,4.426,2.586C-8.46,3.012-8.255,2.901-8.04,2.824c6.031-1.952,15.182-0.165,19.498-3.937 c1.15-3.933-1.24-9.846-1.229-9.938c0.008-0.062-1.314-0.004-1.803-0.258c-1.119-0.771-6.531-3.75-0.17-3.33 c0.314-0.045,0.943,0.259,1.439,0.435c-0.289-1.694-0.92-0.144-3.311-1.946c0,0-1.1-0.855-1.764-1.98 c-0.836-1.09-2.01-2.825-2.992-4.031c-1.523-2.476,1.367,0.709,1.816,1.108c1.768,1.704,1.844,3.281,3.232,3.983 c0.195,0.203,1.453,0.164,0.926-0.468c-0.525-0.632-1.367-1.278-1.775-2.341c-0.293-0.703-1.311-2.326-1.566-2.711 c-0.256-0.384-0.959-1.718-1.67-2.351c-1.047-1.187-0.268-0.902,0.521-0.07c0.789,0.834,1.537,1.821,1.672,2.023 c0.135,0.203,1.584,2.521,1.725,2.387c0.102-0.259-0.035-0.428-0.158-0.852c-0.125-0.423-0.912-2.032-0.961-2.083 c-0.357-0.852-0.566-1.908-0.598-3.333c0.4-2.375,0.648-2.486,0.549-0.705c0.014,1.143,0.031,2.215,0.602,3.247 c0.807,1.496,1.764,4.064,1.836,4.474c0.561,3.176,2.904,1.749,2.281-0.126c-0.068-0.446-0.109-2.014-0.287-2.862 c-0.18-0.849-0.219-1.688-0.113-3.056c0.066-1.389,0.232-2.055,0.277-2.299c0.285-1.023,0.4-1.088,0.408,0.135 c-0.059,0.399-0.131,1.687-0.125,2.655c0.064,0.642-0.043,1.768,0.172,2.486c0.654,1.928-0.027,3.496,1,3.514 c1.805-0.424,2.428-1.218,2.428-2.346c-0.086-0.704-0.121-0.843-0.031-1.193c0.221-0.568,0.359-0.67,0.312-0.076 c-0.055,0.287,0.031,0.533,0.082,0.794c0.264,1.197,0.912,0.114,1.283-0.782c0.15-0.238,0.539-2.154,0.545-2.522 c-0.023-0.617,0.285-0.645,0.309,0.01c0.064,0.422-0.248,2.646-0.205,2.334c-0.338,1.24-1.105,3.402-3.379,4.712 c-0.389,0.12-1.186,1.286-3.328,2.178c0,0,1.729,0.321,3.156,0.246c1.102-0.19,3.707-0.027,4.654,0.269 c1.752,0.494,1.531-0.053,4.084,0.164c2.26-0.4,2.154,2.391-1.496,3.68c-2.549,1.405-3.107,1.475-2.293,2.984 c3.484,7.906,2.865,13.183,2.193,16.466c2.41,0.271,5.732-0.62,7.301,0.725c0.506,0.333,0.648,1.866-0.457,2.86 c-4.105,2.745-9.283,7.022-13.904,7.662c-0.977-0.194,0.156-2.025,0.803-2.247l1.898-0.03c0.596-0.101,0.936-0.669,1.152-1.139 c3.16-0.404,5.045-3.775,8.246-4.818c-4.035-0.718-9.588,3.981-12.162,1.051c-5.043,1.423-11.449,1.84-15.895,1.111 c-3.105,2.687-7.934,4.021-12.115,5.866c-3.271,3.511-5.188,8.086-9.967,10.414c-0.986,0.119-0.48-1.974,0.066-2.385l1.795-0.618 C-22.995,25.682-22.849,25.035-22.788,24.521z",plane:"path://M1.112,32.559l2.998,1.205l-2.882,2.268l-2.215-0.012L1.112,32.559z M37.803,23.96 c0.158-0.838,0.5-1.509,0.961-1.904c-0.096-0.037-0.205-0.071-0.344-0.071c-0.777-0.005-2.068-0.009-3.047-0.009 c-0.633,0-1.217,0.066-1.754,0.18l2.199,1.804H37.803z M39.738,23.036c-0.111,0-0.377,0.325-0.537,0.924h1.076 C40.115,23.361,39.854,23.036,39.738,23.036z M39.934,39.867c-0.166,0-0.674,0.705-0.674,1.986s0.506,1.986,0.674,1.986 s0.672-0.705,0.672-1.986S40.102,39.867,39.934,39.867z M38.963,38.889c-0.098-0.038-0.209-0.07-0.348-0.073 c-0.082,0-0.174,0-0.268-0.001l-7.127,4.671c0.879,0.821,2.42,1.417,4.348,1.417c0.979,0,2.27-0.006,3.047-0.01 c0.139,0,0.25-0.034,0.348-0.072c-0.646-0.555-1.07-1.643-1.07-2.967C37.891,40.529,38.316,39.441,38.963,38.889z M32.713,23.96 l-12.37-10.116l-4.693-0.004c0,0,4,8.222,4.827,10.121H32.713z M59.311,32.374c-0.248,2.104-5.305,3.172-8.018,3.172H39.629 l-25.325,16.61L9.607,52.16c0,0,6.687-8.479,7.95-10.207c1.17-1.6,3.019-3.699,3.027-6.407h-2.138 c-5.839,0-13.816-3.789-18.472-5.583c-2.818-1.085-2.396-4.04-0.031-4.04h0.039l-3.299-11.371h3.617c0,0,4.352,5.696,5.846,7.5 c2,2.416,4.503,3.678,8.228,3.87h30.727c2.17,0,4.311,0.417,6.252,1.046c3.49,1.175,5.863,2.7,7.199,4.027 C59.145,31.584,59.352,32.025,59.311,32.374z M22.069,30.408c0-0.815-0.661-1.475-1.469-1.475c-0.812,0-1.471,0.66-1.471,1.475 s0.658,1.475,1.471,1.475C21.408,31.883,22.069,31.224,22.069,30.408z M27.06,30.408c0-0.815-0.656-1.478-1.466-1.478 c-0.812,0-1.471,0.662-1.471,1.478s0.658,1.477,1.471,1.477C26.404,31.885,27.06,31.224,27.06,30.408z M32.055,30.408 c0-0.815-0.66-1.475-1.469-1.475c-0.808,0-1.466,0.66-1.466,1.475s0.658,1.475,1.466,1.475 C31.398,31.883,32.055,31.224,32.055,30.408z M37.049,30.408c0-0.815-0.658-1.478-1.467-1.478c-0.812,0-1.469,0.662-1.469,1.478 s0.656,1.477,1.469,1.477C36.389,31.885,37.049,31.224,37.049,30.408z M42.039,30.408c0-0.815-0.656-1.478-1.465-1.478 c-0.811,0-1.469,0.662-1.469,1.478s0.658,1.477,1.469,1.477C41.383,31.885,42.039,31.224,42.039,30.408z M55.479,30.565 c-0.701-0.436-1.568-0.896-2.627-1.347c-0.613,0.289-1.551,0.476-2.73,0.476c-1.527,0-1.639,2.263,0.164,2.316 C52.389,32.074,54.627,31.373,55.479,30.565z",train:"path://M67.335,33.596L67.335,33.596c-0.002-1.39-1.153-3.183-3.328-4.218h-9.096v-2.07h5.371 c-4.939-2.07-11.199-4.141-14.89-4.141H19.72v12.421v5.176h38.373c4.033,0,8.457-1.035,9.142-5.176h-0.027 c0.076-0.367,0.129-0.751,0.129-1.165L67.335,33.596L67.335,33.596z M27.999,30.413h-3.105v-4.141h3.105V30.413z M35.245,30.413 h-3.104v-4.141h3.104V30.413z M42.491,30.413h-3.104v-4.141h3.104V30.413z M49.736,30.413h-3.104v-4.141h3.104V30.413z  M14.544,40.764c1.143,0,2.07-0.927,2.07-2.07V35.59V25.237c0-1.145-0.928-2.07-2.07-2.07H-9.265c-1.143,0-2.068,0.926-2.068,2.07 v10.351v3.105c0,1.144,0.926,2.07,2.068,2.07H14.544L14.544,40.764z M8.333,26.272h3.105v4.141H8.333V26.272z M1.087,26.272h3.105 v4.141H1.087V26.272z M-6.159,26.272h3.105v4.141h-3.105V26.272z M-9.265,41.798h69.352v1.035H-9.265V41.798z",ship:"path://M16.678,17.086h9.854l-2.703,5.912c5.596,2.428,11.155,5.575,16.711,8.607c3.387,1.847,6.967,3.75,10.541,5.375 v-6.16l-4.197-2.763v-5.318L33.064,12.197h-11.48L20.43,15.24h-4.533l-1.266,3.286l0.781,0.345L16.678,17.086z M49.6,31.84 l0.047,1.273L27.438,20.998l0.799-1.734L49.6,31.84z M33.031,15.1l12.889,8.82l0.027,0.769L32.551,16.1L33.031,15.1z M22.377,14.045 h9.846l-1.539,3.365l-2.287-1.498h1.371l0.721-1.352h-2.023l-0.553,1.037l-0.541-0.357h-0.34l0.359-0.684h-2.025l-0.361,0.684 h-3.473L22.377,14.045z M23.695,20.678l-0.004,0.004h0.004V20.678z M24.828,18.199h-2.031l-0.719,1.358h2.029L24.828,18.199z  M40.385,34.227c-12.85-7.009-25.729-14.667-38.971-12.527c1.26,8.809,9.08,16.201,8.213,24.328 c-0.553,4.062-3.111,0.828-3.303,7.137c15.799,0,32.379,0,48.166,0l0.066-4.195l1.477-7.23 C50.842,39.812,45.393,36.961,40.385,34.227z M13.99,35.954c-1.213,0-2.195-1.353-2.195-3.035c0-1.665,0.98-3.017,2.195-3.017 c1.219,0,2.195,1.352,2.195,3.017C16.186,34.604,15.213,35.954,13.99,35.954z M23.691,20.682h-2.02l-0.588,1.351h2.023 L23.691,20.682z M19.697,18.199l-0.721,1.358h2.025l0.727-1.358H19.697z",car:"path://M49.592,40.883c-0.053,0.354-0.139,0.697-0.268,0.963c-0.232,0.475-0.455,0.519-1.334,0.475 c-1.135-0.053-2.764,0-4.484,0.068c0,0.476,0.018,0.697,0.018,0.697c0.111,1.299,0.697,1.342,0.931,1.342h3.7 c0.326,0,0.628,0,0.861-0.154c0.301-0.196,0.43-0.772,0.543-1.78c0.017-0.146,0.025-0.336,0.033-0.56v-0.01 c0-0.068,0.008-0.154,0.008-0.25V41.58l0,0C49.6,41.348,49.6,41.09,49.592,40.883L49.592,40.883z M6.057,40.883 c0.053,0.354,0.137,0.697,0.268,0.963c0.23,0.475,0.455,0.519,1.334,0.475c1.137-0.053,2.762,0,4.484,0.068 c0,0.476-0.018,0.697-0.018,0.697c-0.111,1.299-0.697,1.342-0.93,1.342h-3.7c-0.328,0-0.602,0-0.861-0.154 c-0.309-0.18-0.43-0.772-0.541-1.78c-0.018-0.146-0.027-0.336-0.035-0.56v-0.01c0-0.068-0.008-0.154-0.008-0.25V41.58l0,0 C6.057,41.348,6.057,41.09,6.057,40.883L6.057,40.883z M49.867,32.766c0-2.642-0.344-5.224-0.482-5.507 c-0.104-0.207-0.766-0.749-2.271-1.773c-1.522-1.042-1.487-0.887-1.766-1.566c0.25-0.078,0.492-0.224,0.639-0.241 c0.326-0.034,0.345,0.274,1.023,0.274c0.68,0,2.152-0.18,2.453-0.48c0.301-0.303,0.396-0.405,0.396-0.672 c0-0.268-0.156-0.818-0.447-1.146c-0.293-0.327-1.541-0.49-2.273-0.585c-0.729-0.095-0.834,0-1.022,0.121 c-0.304,0.189-0.32,1.919-0.32,1.919l-0.713,0.018c-0.465-1.146-1.11-3.452-2.117-5.269c-1.103-1.979-2.256-2.599-2.737-2.754 c-0.474-0.146-0.904-0.249-4.131-0.576c-3.298-0.344-5.922-0.388-8.262-0.388c-2.342,0-4.967,0.052-8.264,0.388 c-3.229,0.336-3.66,0.43-4.133,0.576s-1.633,0.775-2.736,2.754c-1.006,1.816-1.652,4.123-2.117,5.269L9.87,23.109 c0,0-0.008-1.729-0.318-1.919c-0.189-0.121-0.293-0.225-1.023-0.121c-0.732,0.104-1.98,0.258-2.273,0.585 c-0.293,0.327-0.447,0.878-0.447,1.146c0,0.267,0.094,0.379,0.396,0.672c0.301,0.301,1.773,0.48,2.453,0.48 c0.68,0,0.697-0.309,1.023-0.274c0.146,0.018,0.396,0.163,0.637,0.241c-0.283,0.68-0.24,0.524-1.764,1.566 c-1.506,1.033-2.178,1.566-2.271,1.773c-0.139,0.283-0.482,2.865-0.482,5.508s0.189,5.02,0.189,5.86c0,0.354,0,0.976,0.076,1.565 c0.053,0.354,0.129,0.697,0.268,0.966c0.232,0.473,0.447,0.516,1.334,0.473c1.137-0.051,2.779,0,4.477,0.07 c1.135,0.043,2.297,0.086,3.33,0.11c2.582,0.051,1.826-0.379,2.928-0.36c1.102,0.016,5.447,0.196,9.424,0.196 c3.976,0,8.332-0.182,9.423-0.196c1.102-0.019,0.346,0.411,2.926,0.36c1.033-0.018,2.195-0.067,3.332-0.11 c1.695-0.062,3.348-0.121,4.477-0.07c0.886,0.043,1.103,0,1.332-0.473c0.132-0.269,0.218-0.611,0.269-0.966 c0.086-0.592,0.078-1.213,0.078-1.565C49.678,37.793,49.867,35.408,49.867,32.766L49.867,32.766z M13.219,19.735 c0.412-0.964,1.652-2.9,2.256-3.244c0.145-0.087,1.426-0.491,4.637-0.706c2.953-0.198,6.217-0.276,7.73-0.276 c1.513,0,4.777,0.078,7.729,0.276c3.201,0.215,4.502,0.611,4.639,0.706c0.775,0.533,1.842,2.28,2.256,3.244 c0.412,0.965,0.965,2.858,0.861,3.116c-0.104,0.258,0.104,0.388-1.291,0.275c-1.387-0.103-10.088-0.216-14.185-0.216 c-4.088,0-12.789,0.113-14.184,0.216c-1.395,0.104-1.188-0.018-1.291-0.275C12.254,22.593,12.805,20.708,13.219,19.735 L13.219,19.735z M16.385,30.511c-0.619,0.155-0.988,0.491-1.764,0.482c-0.775,0-2.867-0.353-3.314-0.371 c-0.447-0.017-0.842,0.302-1.076,0.362c-0.23,0.06-0.688-0.104-1.377-0.318c-0.688-0.216-1.092-0.155-1.316-1.094 c-0.232-0.93,0-2.264,0-2.264c1.488-0.068,2.928,0.069,5.621,0.826c2.693,0.758,4.191,2.213,4.191,2.213 S17.004,30.357,16.385,30.511L16.385,30.511z M36.629,37.293c-1.23,0.164-6.386,0.207-8.794,0.207c-2.412,0-7.566-0.051-8.799-0.207 c-1.256-0.164-2.891-1.67-1.764-2.865c1.523-1.627,1.24-1.576,4.701-2.023C24.967,32.018,27.239,32,27.834,32 c0.584,0,2.865,0.025,5.859,0.404c3.461,0.447,3.178,0.396,4.699,2.022C39.521,35.623,37.887,37.129,36.629,37.293L36.629,37.293z  M48.129,29.582c-0.232,0.93-0.629,0.878-1.318,1.093c-0.688,0.216-1.145,0.371-1.377,0.319c-0.231-0.053-0.627-0.371-1.074-0.361 c-0.448,0.018-2.539,0.37-3.313,0.37c-0.772,0-1.146-0.328-1.764-0.481c-0.621-0.154-0.966-0.154-0.966-0.154 s1.49-1.464,4.191-2.213c2.693-0.758,4.131-0.895,5.621-0.826C48.129,27.309,48.361,28.643,48.129,29.582L48.129,29.582z"},t={show:!0,position:"right",offset:[10,0],fontSize:16};return{title:{text:"Vehicles"},legend:{data:["2021","2022"]},tooltip:{trigger:"axis",axisPointer:{type:"shadow"}},grid:{containLabel:!0,left:20},yAxis:{data:["reindeer","ship","plane","train","car"],inverse:!0,axisLine:{show:!1},axisTick:{show:!1},axisLabel:{margin:30,fontSize:14},axisPointer:{label:{show:!0,margin:30}}},xAxis:{splitLine:{show:!1},axisLabel:{show:!1},axisTick:{show:!1},axisLine:{show:!1}},series:[{name:"2021",type:"pictorialBar",label:t,symbolRepeat:!0,symbolSize:["80%","60%"],barCategoryGap:"40%",data:[{value:157,symbol:e.reindeer},{value:21,symbol:e.ship},{value:66,symbol:e.plane},{value:78,symbol:e.train},{value:123,symbol:e.car}]},{name:"2022",type:"pictorialBar",barGap:"10%",label:t,symbolRepeat:!0,symbolSize:["80%","60%"],data:[{value:184,symbol:e.reindeer},{value:29,symbol:e.ship},{value:73,symbol:e.plane},{value:91,symbol:e.train},{value:95,symbol:e.car}]}]}};const{Link:f}=p,V=()=>{const e=h(i=>i.global.isDark),t=m.useRef(null);return c.jsxs(d,{gutter:[12,10],children:[c.jsx(a,{xl:8,lg:12,md:12,sm:24,xs:24,children:c.jsx(o,{hoverable:!0,title:"柱状图",children:c.jsx(s,{ref:t,height:284,option:u(e)})})}),c.jsx(a,{xl:8,lg:12,md:12,sm:24,xs:24,children:c.jsx(o,{hoverable:!0,title:"折线图",children:c.jsx(s,{height:284,option:x(e)})})}),c.jsx(a,{xl:8,lg:12,md:12,sm:24,xs:24,children:c.jsx(o,{hoverable:!0,title:"散点图",children:c.jsx(s,{height:284,option:b(e)})})}),c.jsx(a,{xl:8,lg:12,md:12,sm:24,xs:24,children:c.jsx(o,{hoverable:!0,title:"雷达图",children:c.jsx(s,{height:284,option:y()})})}),c.jsx(a,{xl:8,lg:12,md:12,sm:24,xs:24,children:c.jsx(o,{hoverable:!0,title:"饼状图",children:c.jsx(s,{height:284,option:g()})})}),c.jsx(a,{xl:8,lg:12,md:12,sm:24,xs:24,children:c.jsx(o,{hoverable:!0,title:"仪表图",children:c.jsx(s,{height:284,option:v()})})}),c.jsx(a,{xl:8,lg:12,md:12,sm:24,xs:24,children:c.jsx(o,{hoverable:!0,title:"仪表图",children:c.jsx(s,{height:284,option:z()})})}),c.jsx(a,{xl:8,lg:12,md:12,sm:24,xs:24,children:c.jsx(o,{hoverable:!0,title:"关系图"})}),c.jsx(a,{xl:8,lg:12,md:12,sm:24,xs:24,children:c.jsx(o,{hoverable:!0,title:"城市车辆",children:c.jsx(s,{height:284,option:C()})})}),c.jsx(a,{xl:24,lg:24,md:24,sm:24,xs:24,children:c.jsx(o,{children:c.jsxs(r,{title:"Echarts 配置项 📚",bordered:!0,column:1,labelStyle:{width:"150px"},children:[c.jsxs(r.Item,{label:"option",children:["ECharts option：",c.jsx(f,{href:"https://echarts.apache.org/zh/option.html#title",target:"_blank",children:"https://echarts.apache.org/zh/option.html#title"})]}),c.jsx(r.Item,{label:"isResize",children:" ECharts 响应式：默认为 true "}),c.jsx(r.Item,{label:"width",children:" ECharts 宽度：默认为 100% "}),c.jsx(r.Item,{label:"height",children:" ECharts 高度：默认为 100% "}),c.jsx(r.Item,{label:"onClick",children:" ECharts 点击事件 "})]})})})]})};export{V as default};