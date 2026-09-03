import{r as h,bF as Te,R as Me,j as T}from"./index-8616376b.js";import{R as ve,I as mt,F as Fe,a as Ae,b as se,W as gt,B as Ce,S as Qe,V as P,c as H,U as Ne,d as Re,e as A,f as Ye,g as J,h as Je,M as et,L as xt,i as oe,j as X,k as De,l as V,O as St,u as ie,n as bt,m as yt,A as Et,v as _t,o as wt,p as ee,q as C,r as Tt,s as Mt,t as At,w as tt,x as N,y as fe,E as Pe,z as st,N as it,G as re,H as pe,J as Rt,K as He,Q as Ut,T as le,X as ue,Y as Bt,Z as S,_ as rt,$ as nt,a0 as te,a1 as Ct,a2 as Dt,a3 as Pt,a4 as Ot,a5 as It,C as zt,a6 as Lt}from"./constants-4c158840.js";let ae;function Ft(){var e;if(ae!==void 0)return ae;try{let t;const s=document.createElement("canvas");return ae=!!(window.WebGL2RenderingContext&&(t=s.getContext("webgl2"))),t&&((e=t.getExtension("WEBGL_lose_context"))==null||e.loseContext()),ae}catch{return ae=!1}}const at=(()=>parseInt(ve.replace(/\D+/g,"")))(),ot=at>=125?"uv1":"uv2",Ge=new Ce,ce=new P;class Oe extends mt{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],s=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Fe(t,3)),this.setAttribute("uv",new Fe(s,2))}applyMatrix4(t){const s=this.attributes.instanceStart,i=this.attributes.instanceEnd;return s!==void 0&&(s.applyMatrix4(t),i.applyMatrix4(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let s;t instanceof Float32Array?s=t:Array.isArray(t)&&(s=new Float32Array(t));const i=new Ae(s,6,1);return this.setAttribute("instanceStart",new se(i,3,0)),this.setAttribute("instanceEnd",new se(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t,s=3){let i;t instanceof Float32Array?i=t:Array.isArray(t)&&(i=new Float32Array(t));const r=new Ae(i,s*2,1);return this.setAttribute("instanceColorStart",new se(r,s,0)),this.setAttribute("instanceColorEnd",new se(r,s,s)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new gt(t.geometry)),this}fromLineSegments(t){const s=t.geometry;return this.setPositions(s.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ce);const t=this.attributes.instanceStart,s=this.attributes.instanceEnd;t!==void 0&&s!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Ge.setFromBufferAttribute(s),this.boundingBox.union(Ge))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qe),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,s=this.attributes.instanceEnd;if(t!==void 0&&s!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let r=0;for(let n=0,a=t.count;n<a;n++)ce.fromBufferAttribute(t,n),r=Math.max(r,i.distanceToSquared(ce)),ce.fromBufferAttribute(s,n),r=Math.max(r,i.distanceToSquared(ce));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}class lt extends Oe{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){const s=t.length-3,i=new Float32Array(2*s);for(let r=0;r<s;r+=3)i[2*r]=t[r],i[2*r+1]=t[r+1],i[2*r+2]=t[r+2],i[2*r+3]=t[r+3],i[2*r+4]=t[r+4],i[2*r+5]=t[r+5];return super.setPositions(i),this}setColors(t,s=3){const i=t.length-s,r=new Float32Array(2*i);if(s===3)for(let n=0;n<i;n+=s)r[2*n]=t[n],r[2*n+1]=t[n+1],r[2*n+2]=t[n+2],r[2*n+3]=t[n+3],r[2*n+4]=t[n+4],r[2*n+5]=t[n+5];else for(let n=0;n<i;n+=s)r[2*n]=t[n],r[2*n+1]=t[n+1],r[2*n+2]=t[n+2],r[2*n+3]=t[n+3],r[2*n+4]=t[n+4],r[2*n+5]=t[n+5],r[2*n+6]=t[n+6],r[2*n+7]=t[n+7];return super.setColors(r,s),this}fromLine(t){const s=t.geometry;return this.setPositions(s.attributes.position.array),this}}class Ie extends H{constructor(t){super({type:"LineMaterial",uniforms:Ne.clone(Ne.merge([Re.common,Re.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new A(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${at>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(s){this.uniforms.diffuse.value=s}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(s){s===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(s){this.uniforms.linewidth.value=s}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(s){!!s!="USE_DASH"in this.defines&&(this.needsUpdate=!0),s===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(s){this.uniforms.dashScale.value=s}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(s){this.uniforms.dashSize.value=s}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(s){this.uniforms.dashOffset.value=s}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(s){this.uniforms.gapSize.value=s}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(s){this.uniforms.opacity.value=s}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(s){this.uniforms.resolution.value.copy(s)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(s){!!s!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),s===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(t)}}const ge=new J,ke=new P,Ve=new P,R=new J,U=new J,G=new J,xe=new P,Se=new et,B=new xt,We=new P,de=new Ce,he=new Qe,k=new J;let W,Y;function je(e,t,s){return k.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),k.multiplyScalar(1/k.w),k.x=Y/s.width,k.y=Y/s.height,k.applyMatrix4(e.projectionMatrixInverse),k.multiplyScalar(1/k.w),Math.abs(Math.max(k.x,k.y))}function Nt(e,t){const s=e.matrixWorld,i=e.geometry,r=i.attributes.instanceStart,n=i.attributes.instanceEnd,a=Math.min(i.instanceCount,r.count);for(let o=0,l=a;o<l;o++){B.start.fromBufferAttribute(r,o),B.end.fromBufferAttribute(n,o),B.applyMatrix4(s);const c=new P,d=new P;W.distanceSqToSegment(B.start,B.end,d,c),d.distanceTo(c)<Y*.5&&t.push({point:d,pointOnLine:c,distance:W.origin.distanceTo(d),object:e,face:null,faceIndex:o,uv:null,[ot]:null})}}function Ht(e,t,s){const i=t.projectionMatrix,n=e.material.resolution,a=e.matrixWorld,o=e.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,d=Math.min(o.instanceCount,l.count),u=-t.near;W.at(1,G),G.w=1,G.applyMatrix4(t.matrixWorldInverse),G.applyMatrix4(i),G.multiplyScalar(1/G.w),G.x*=n.x/2,G.y*=n.y/2,G.z=0,xe.copy(G),Se.multiplyMatrices(t.matrixWorldInverse,a);for(let f=0,p=d;f<p;f++){if(R.fromBufferAttribute(l,f),U.fromBufferAttribute(c,f),R.w=1,U.w=1,R.applyMatrix4(Se),U.applyMatrix4(Se),R.z>u&&U.z>u)continue;if(R.z>u){const v=R.z-U.z,E=(R.z-u)/v;R.lerp(U,E)}else if(U.z>u){const v=U.z-R.z,E=(U.z-u)/v;U.lerp(R,E)}R.applyMatrix4(i),U.applyMatrix4(i),R.multiplyScalar(1/R.w),U.multiplyScalar(1/U.w),R.x*=n.x/2,R.y*=n.y/2,U.x*=n.x/2,U.y*=n.y/2,B.start.copy(R),B.start.z=0,B.end.copy(U),B.end.z=0;const M=B.closestPointToPointParameter(xe,!0);B.at(M,We);const g=Je.lerp(R.z,U.z,M),w=g>=-1&&g<=1,y=xe.distanceTo(We)<Y*.5;if(w&&y){B.start.fromBufferAttribute(l,f),B.end.fromBufferAttribute(c,f),B.start.applyMatrix4(a),B.end.applyMatrix4(a);const v=new P,E=new P;W.distanceSqToSegment(B.start,B.end,E,v),s.push({point:E,pointOnLine:v,distance:W.origin.distanceTo(E),object:e,face:null,faceIndex:f,uv:null,[ot]:null})}}}class ut extends Ye{constructor(t=new Oe,s=new Ie({color:Math.random()*16777215})){super(t,s),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,s=t.attributes.instanceStart,i=t.attributes.instanceEnd,r=new Float32Array(2*s.count);for(let a=0,o=0,l=s.count;a<l;a++,o+=2)ke.fromBufferAttribute(s,a),Ve.fromBufferAttribute(i,a),r[o]=o===0?0:r[o-1],r[o+1]=r[o]+ke.distanceTo(Ve);const n=new Ae(r,2,1);return t.setAttribute("instanceDistanceStart",new se(n,1,0)),t.setAttribute("instanceDistanceEnd",new se(n,1,1)),this}raycast(t,s){const i=this.material.worldUnits,r=t.camera;r===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const n=t.params.Line2!==void 0&&t.params.Line2.threshold||0;W=t.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;Y=l.linewidth+n,o.boundingSphere===null&&o.computeBoundingSphere(),he.copy(o.boundingSphere).applyMatrix4(a);let c;if(i)c=Y*.5;else{const u=Math.max(r.near,he.distanceToPoint(W.origin));c=je(r,u,l.resolution)}if(he.radius+=c,W.intersectsSphere(he)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),de.copy(o.boundingBox).applyMatrix4(a);let d;if(i)d=Y*.5;else{const u=Math.max(r.near,de.distanceToPoint(W.origin));d=je(r,u,l.resolution)}de.expandByScalar(d),W.intersectsBox(de)!==!1&&(i?Nt(this,s):Ht(this,r,s))}onBeforeRender(t){const s=this.material.uniforms;s&&s.resolution&&(t.getViewport(ge),this.material.uniforms.resolution.value.set(ge.z,ge.w))}}class Gt extends ut{constructor(t=new lt,s=new Ie({color:Math.random()*16777215})){super(t,s),this.isLine2=!0,this.type="Line2"}}const be=h.forwardRef(function({points:t,color:s="black",vertexColors:i,linewidth:r,lineWidth:n,segments:a,dashed:o,...l},c){const d=oe(_=>_.size),u=h.useMemo(()=>a?new ut:new Gt,[a]),[f]=h.useState(()=>new Ie),p=h.useMemo(()=>{const _=a?new Oe:new lt,M=t.map(g=>{const w=Array.isArray(g);return g instanceof P?[g.x,g.y,g.z]:g instanceof A?[g.x,g.y,0]:w&&g.length===3?[g[0],g[1],g[2]]:w&&g.length===2?[g[0],g[1],0]:g});if(_.setPositions(M.flat()),i){const g=i.map(w=>w instanceof X?w.toArray():w);_.setColors(g.flat())}return _},[t,a,i]);return h.useLayoutEffect(()=>{u.computeLineDistances()},[t,u]),h.useLayoutEffect(()=>{o?f.defines.USE_DASH="":delete f.defines.USE_DASH,f.needsUpdate=!0},[o,f]),h.useEffect(()=>()=>p.dispose(),[p]),h.createElement("primitive",Te({object:u,ref:c},l),h.createElement("primitive",{object:p,attach:"geometry"}),h.createElement("primitive",Te({object:f,attach:"material",color:s,vertexColors:!!i,resolution:[d.width,d.height],linewidth:r??n,dashed:o},l)))});var kt=Object.defineProperty,Vt=(e,t,s)=>t in e?kt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s,b=(e,t,s)=>(Vt(e,typeof t!="symbol"?t+"":t,s),s);function ye(e,t,s,i,r){let n;if(e=e.subarray||e.slice?e:e.buffer,s=s.subarray||s.slice?s:s.buffer,e=t?e.subarray?e.subarray(t,r&&t+r):e.slice(t,r&&t+r):e,s.set)s.set(e,i);else for(n=0;n<e.length;n++)s[n+i]=e[n];return s}function Wt(e){return e instanceof Float32Array?e:e instanceof De?e.getAttribute("position").array:e.map(t=>{const s=Array.isArray(t);return t instanceof P?[t.x,t.y,t.z]:t instanceof A?[t.x,t.y,0]:s&&t.length===3?[t[0],t[1],t[2]]:s&&t.length===2?[t[0],t[1],0]:t}).flat()}class jt extends De{constructor(){super(),b(this,"type","MeshLine"),b(this,"isMeshLine",!0),b(this,"positions",[]),b(this,"previous",[]),b(this,"next",[]),b(this,"side",[]),b(this,"width",[]),b(this,"indices_array",[]),b(this,"uvs",[]),b(this,"counters",[]),b(this,"widthCallback",null),b(this,"_attributes"),b(this,"_points",[]),b(this,"points"),b(this,"matrixWorld",new et),Object.defineProperties(this,{points:{enumerable:!0,get(){return this._points},set(t){this.setPoints(t,this.widthCallback)}}})}setMatrixWorld(t){this.matrixWorld=t}setPoints(t,s){if(t=Wt(t),this._points=t,this.widthCallback=s??null,this.positions=[],this.counters=[],t.length&&t[0]instanceof P)for(let i=0;i<t.length;i++){const r=t[i],n=i/(t.length-1);this.positions.push(r.x,r.y,r.z),this.positions.push(r.x,r.y,r.z),this.counters.push(n),this.counters.push(n)}else for(let i=0;i<t.length;i+=3){const r=i/(t.length-1);this.positions.push(t[i],t[i+1],t[i+2]),this.positions.push(t[i],t[i+1],t[i+2]),this.counters.push(r),this.counters.push(r)}this.process()}compareV3(t,s){const i=t*6,r=s*6;return this.positions[i]===this.positions[r]&&this.positions[i+1]===this.positions[r+1]&&this.positions[i+2]===this.positions[r+2]}copyV3(t){const s=t*6;return[this.positions[s],this.positions[s+1],this.positions[s+2]]}process(){const t=this.positions.length/6;this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[];let s,i;this.compareV3(0,t-1)?i=this.copyV3(t-2):i=this.copyV3(0),this.previous.push(i[0],i[1],i[2]),this.previous.push(i[0],i[1],i[2]);for(let r=0;r<t;r++){if(this.side.push(1),this.side.push(-1),this.widthCallback?s=this.widthCallback(r/(t-1)):s=1,this.width.push(s),this.width.push(s),this.uvs.push(r/(t-1),0),this.uvs.push(r/(t-1),1),r<t-1){i=this.copyV3(r),this.previous.push(i[0],i[1],i[2]),this.previous.push(i[0],i[1],i[2]);const n=r*2;this.indices_array.push(n,n+1,n+2),this.indices_array.push(n+2,n+1,n+3)}r>0&&(i=this.copyV3(r),this.next.push(i[0],i[1],i[2]),this.next.push(i[0],i[1],i[2]))}this.compareV3(t-1,0)?i=this.copyV3(1):i=this.copyV3(t-1),this.next.push(i[0],i[1],i[2]),this.next.push(i[0],i[1],i[2]),!this._attributes||this._attributes.position.count!==this.counters.length?this._attributes={position:new V(new Float32Array(this.positions),3),previous:new V(new Float32Array(this.previous),3),next:new V(new Float32Array(this.next),3),side:new V(new Float32Array(this.side),1),width:new V(new Float32Array(this.width),1),uv:new V(new Float32Array(this.uvs),2),index:new V(new Uint16Array(this.indices_array),1),counters:new V(new Float32Array(this.counters),1)}:(this._attributes.position.copyArray(new Float32Array(this.positions)),this._attributes.position.needsUpdate=!0,this._attributes.previous.copyArray(new Float32Array(this.previous)),this._attributes.previous.needsUpdate=!0,this._attributes.next.copyArray(new Float32Array(this.next)),this._attributes.next.needsUpdate=!0,this._attributes.side.copyArray(new Float32Array(this.side)),this._attributes.side.needsUpdate=!0,this._attributes.width.copyArray(new Float32Array(this.width)),this._attributes.width.needsUpdate=!0,this._attributes.uv.copyArray(new Float32Array(this.uvs)),this._attributes.uv.needsUpdate=!0,this._attributes.index.copyArray(new Uint16Array(this.indices_array)),this._attributes.index.needsUpdate=!0),this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setIndex(this._attributes.index),this.computeBoundingSphere(),this.computeBoundingBox()}advance({x:t,y:s,z:i}){const r=this._attributes.position.array,n=this._attributes.previous.array,a=this._attributes.next.array,o=r.length;ye(r,0,n,0,o),ye(r,6,r,0,o-6),r[o-6]=t,r[o-5]=s,r[o-4]=i,r[o-3]=t,r[o-2]=s,r[o-1]=i,ye(r,6,a,0,o-6),a[o-6]=t,a[o-5]=s,a[o-4]=i,a[o-3]=t,a[o-2]=s,a[o-1]=i,this._attributes.position.needsUpdate=!0,this._attributes.previous.needsUpdate=!0,this._attributes.next.needsUpdate=!0}}const Kt=`
  #include <common>
  #include <logdepthbuf_pars_vertex>
  #include <fog_pars_vertex>
  #include <clipping_planes_pars_vertex>

  attribute vec3 previous;
  attribute vec3 next;
  attribute float side;
  attribute float width;
  attribute float counters;
  
  uniform vec2 resolution;
  uniform float lineWidth;
  uniform vec3 color;
  uniform float opacity;
  uniform float sizeAttenuation;
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  vec2 fix(vec4 i, float aspect) {
    vec2 res = i.xy / i.w;
    res.x *= aspect;
    return res;
  }
  
  void main() {
    float aspect = resolution.x / resolution.y;
    vColor = vec4(color, opacity);
    vUV = uv;
    vCounters = counters;
  
    mat4 m = projectionMatrix * modelViewMatrix;
    vec4 finalPosition = m * vec4(position, 1.0) * aspect;
    vec4 prevPos = m * vec4(previous, 1.0);
    vec4 nextPos = m * vec4(next, 1.0);
  
    vec2 currentP = fix(finalPosition, aspect);
    vec2 prevP = fix(prevPos, aspect);
    vec2 nextP = fix(nextPos, aspect);
  
    float w = lineWidth * width;
  
    vec2 dir;
    if (nextP == currentP) dir = normalize(currentP - prevP);
    else if (prevP == currentP) dir = normalize(nextP - currentP);
    else {
      vec2 dir1 = normalize(currentP - prevP);
      vec2 dir2 = normalize(nextP - currentP);
      dir = normalize(dir1 + dir2);
  
      vec2 perp = vec2(-dir1.y, dir1.x);
      vec2 miter = vec2(-dir.y, dir.x);
      //w = clamp(w / dot(miter, perp), 0., 4. * lineWidth * width);
    }
  
    //vec2 normal = (cross(vec3(dir, 0.), vec3(0., 0., 1.))).xy;
    vec4 normal = vec4(-dir.y, dir.x, 0., 1.);
    normal.xy *= .5 * w;
    //normal *= projectionMatrix;
    if (sizeAttenuation == 0.) {
      normal.xy *= finalPosition.w;
      normal.xy /= (vec4(resolution, 0., 1.) * projectionMatrix).xy * aspect;
    }
  
    finalPosition.xy += normal.xy * side;
    gl_Position = finalPosition;
    #include <logdepthbuf_vertex>
    #include <fog_vertex>
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    #include <clipping_planes_vertex>
    #include <fog_vertex>
  }
`,$t=(()=>parseInt(ve.replace(/\D+/g,"")))(),Xt=$t>=154?"colorspace_fragment":"encodings_fragment",qt=`
  #include <fog_pars_fragment>
  #include <logdepthbuf_pars_fragment>
  #include <clipping_planes_pars_fragment>
  
  uniform sampler2D map;
  uniform sampler2D alphaMap;
  uniform float useGradient;
  uniform float useMap;
  uniform float useAlphaMap;
  uniform float useDash;
  uniform float dashArray;
  uniform float dashOffset;
  uniform float dashRatio;
  uniform float visibility;
  uniform float alphaTest;
  uniform vec2 repeat;
  uniform vec3 gradient[2];
  
  varying vec2 vUV;
  varying vec4 vColor;
  varying float vCounters;
  
  void main() {
    #include <logdepthbuf_fragment>
    vec4 diffuseColor = vColor;
    if (useGradient == 1.) diffuseColor = vec4(mix(gradient[0], gradient[1], vCounters), 1.0);
    if (useMap == 1.) diffuseColor *= texture2D(map, vUV * repeat);
    if (useAlphaMap == 1.) diffuseColor.a *= texture2D(alphaMap, vUV * repeat).a;
    if (diffuseColor.a < alphaTest) discard;
    if (useDash == 1.) diffuseColor.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
    diffuseColor.a *= step(vCounters, visibility);
    #include <clipping_planes_fragment>
    gl_FragColor = diffuseColor;     
    #include <fog_fragment>
    #include <tonemapping_fragment>
    #include <${Xt}>
  }
`;class Zt extends H{constructor(t){super({uniforms:{...Re.fog,lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new X(16777215)},gradient:{value:[new X(16711680),new X(65280)]},opacity:{value:1},resolution:{value:new A(1,1)},sizeAttenuation:{value:1},dashArray:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},useGradient:{value:0},visibility:{value:1},alphaTest:{value:0},repeat:{value:new A(1,1)}},vertexShader:Kt,fragmentShader:qt}),b(this,"lineWidth"),b(this,"map"),b(this,"useMap"),b(this,"alphaMap"),b(this,"useAlphaMap"),b(this,"color"),b(this,"gradient"),b(this,"resolution"),b(this,"sizeAttenuation"),b(this,"dashArray"),b(this,"dashOffset"),b(this,"dashRatio"),b(this,"useDash"),b(this,"useGradient"),b(this,"visibility"),b(this,"repeat"),this.type="MeshLineMaterial",Object.defineProperties(this,{lineWidth:{enumerable:!0,get(){return this.uniforms.lineWidth.value},set(s){this.uniforms.lineWidth.value=s}},map:{enumerable:!0,get(){return this.uniforms.map.value},set(s){this.uniforms.map.value=s}},useMap:{enumerable:!0,get(){return this.uniforms.useMap.value},set(s){this.uniforms.useMap.value=s}},alphaMap:{enumerable:!0,get(){return this.uniforms.alphaMap.value},set(s){this.uniforms.alphaMap.value=s}},useAlphaMap:{enumerable:!0,get(){return this.uniforms.useAlphaMap.value},set(s){this.uniforms.useAlphaMap.value=s}},color:{enumerable:!0,get(){return this.uniforms.color.value},set(s){this.uniforms.color.value=s}},gradient:{enumerable:!0,get(){return this.uniforms.gradient.value},set(s){this.uniforms.gradient.value=s}},opacity:{enumerable:!0,get(){return this.uniforms.opacity.value},set(s){this.uniforms.opacity.value=s}},resolution:{enumerable:!0,get(){return this.uniforms.resolution.value},set(s){this.uniforms.resolution.value.copy(s)}},sizeAttenuation:{enumerable:!0,get(){return this.uniforms.sizeAttenuation.value},set(s){this.uniforms.sizeAttenuation.value=s}},dashArray:{enumerable:!0,get(){return this.uniforms.dashArray.value},set(s){this.uniforms.dashArray.value=s,this.useDash=s!==0?1:0}},dashOffset:{enumerable:!0,get(){return this.uniforms.dashOffset.value},set(s){this.uniforms.dashOffset.value=s}},dashRatio:{enumerable:!0,get(){return this.uniforms.dashRatio.value},set(s){this.uniforms.dashRatio.value=s}},useDash:{enumerable:!0,get(){return this.uniforms.useDash.value},set(s){this.uniforms.useDash.value=s}},useGradient:{enumerable:!0,get(){return this.uniforms.useGradient.value},set(s){this.uniforms.useGradient.value=s}},visibility:{enumerable:!0,get(){return this.uniforms.visibility.value},set(s){this.uniforms.visibility.value=s}},alphaTest:{enumerable:!0,get(){return this.uniforms.alphaTest.value},set(s){this.uniforms.alphaTest.value=s}},repeat:{enumerable:!0,get(){return this.uniforms.repeat.value},set(s){this.uniforms.repeat.value.copy(s)}}}),this.setValues(t)}copy(t){return super.copy(t),this.lineWidth=t.lineWidth,this.map=t.map,this.useMap=t.useMap,this.alphaMap=t.alphaMap,this.useAlphaMap=t.useAlphaMap,this.color.copy(t.color),this.gradient=t.gradient,this.opacity=t.opacity,this.resolution.copy(t.resolution),this.sizeAttenuation=t.sizeAttenuation,this.dashArray=t.dashArray,this.dashOffset=t.dashOffset,this.dashRatio=t.dashRatio,this.useDash=t.useDash,this.useGradient=t.useGradient,this.visibility=t.visibility,this.alphaTest=t.alphaTest,this.repeat.copy(t.repeat),this}}const ct={width:.2,length:1,decay:1,local:!1,stride:0,interval:1},Qt=(e,t=1)=>(e.set(e.subarray(t)),e.fill(-1/0,-t),e);function Yt(e,t){const{length:s,local:i,decay:r,interval:n,stride:a}={...ct,...t},o=h.useRef(),[l]=h.useState(()=>new P);h.useLayoutEffect(()=>{e&&(o.current=Float32Array.from({length:s*10*3},(u,f)=>e.position.getComponent(f%3)))},[s,e]);const c=h.useRef(new P),d=h.useRef(0);return ie(()=>{if(e&&o.current){if(d.current===0){let u;i?u=e.position:(e.getWorldPosition(l),u=l);const f=1*r;for(let p=0;p<f;p++)u.distanceTo(c.current)<a||(Qt(o.current,3),o.current.set(u.toArray(),o.current.length-3));c.current.copy(u)}d.current++,d.current=d.current%n}}),o}const Jt=h.forwardRef((e,t)=>{const{children:s}=e,{width:i,length:r,decay:n,local:a,stride:o,interval:l}={...ct,...e},{color:c="hotpink",attenuation:d,target:u}=e,f=oe(E=>E.size),p=oe(E=>E.scene),_=h.useRef(null),[M,g]=h.useState(null),w=Yt(M,{length:r,decay:n,local:a,stride:o,interval:l});h.useEffect(()=>{const E=(u==null?void 0:u.current)||_.current.children.find(I=>I instanceof St);E&&g(E)},[w,u]);const y=h.useMemo(()=>new jt,[]),v=h.useMemo(()=>{var E;const I=new Zt({lineWidth:.1*i,color:c,sizeAttenuation:1,resolution:new A(f.width,f.height)});let q;if(s)if(Array.isArray(s))q=s.find(Z=>{const z=Z;return typeof z.type=="string"&&z.type==="meshLineMaterial"});else{const Z=s;typeof Z.type=="string"&&Z.type==="meshLineMaterial"&&(q=Z)}return typeof((E=q)==null?void 0:E.props)=="object"&&I.setValues(q.props),I},[i,c,f,s]);return h.useEffect(()=>{v.uniforms.resolution.value.set(f.width,f.height)},[f]),ie(()=>{w.current&&y.setPoints(w.current,d)}),h.createElement("group",null,bt(h.createElement("mesh",{ref:t,geometry:y,material:v}),p),h.createElement("group",{ref:_},s))});function es(e,t){const s=e+"Geometry";return h.forwardRef(({args:i,children:r,...n},a)=>{const o=h.useRef(null);return h.useImperativeHandle(a,()=>o.current),h.useLayoutEffect(()=>void(t==null?void 0:t(o.current))),h.createElement("mesh",Te({ref:o},n),h.createElement(s,{attach:"geometry",args:i}),r)})}const ts=es("sphere"),ss=h.forwardRef(({children:e,enabled:t=!0,speed:s=1,rotationIntensity:i=1,floatIntensity:r=1,floatingRange:n=[-.1,.1],...a},o)=>{const l=h.useRef(null),c=h.useRef(Math.random()*1e4);return ie(d=>{var u,f;if(!t||s===0)return;const p=c.current+d.clock.getElapsedTime();l.current.rotation.x=Math.cos(p/4*s)/8*i,l.current.rotation.y=Math.sin(p/4*s)/8*i,l.current.rotation.z=Math.sin(p/4*s)/20*i;let _=Math.sin(p/4*s)/10;_=Je.mapLinear(_,-.1,.1,(u=n==null?void 0:n[0])!==null&&u!==void 0?u:-.1,(f=n==null?void 0:n[1])!==null&&f!==void 0?f:.1),l.current.position.y=_*r,l.current.updateMatrix()}),h.createElement("group",a,h.createElement("group",{ref:yt([l,o]),matrixAutoUpdate:!1},e))});class is extends H{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
      uniform float time;
      attribute float size;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 0.5);
        gl_PointSize = size * (30.0 / -mvPosition.z) * (3.0 + sin(time + 100.0));
        gl_Position = projectionMatrix * mvPosition;
      }`,fragmentShader:`
      uniform sampler2D pointTexture;
      uniform float fade;
      varying vec3 vColor;
      void main() {
        float opacity = 1.0;
        if (fade == 1.0) {
          float d = distance(gl_PointCoord, vec2(0.5, 0.5));
          opacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
        }
        gl_FragColor = vec4(vColor, opacity);

        #include <tonemapping_fragment>
	      #include <${_t>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const rs=e=>new P().setFromSpherical(new wt(e,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),ns=h.forwardRef(({radius:e=100,depth:t=50,count:s=5e3,saturation:i=0,factor:r=4,fade:n=!1,speed:a=1},o)=>{const l=h.useRef(),[c,d,u]=h.useMemo(()=>{const p=[],_=[],M=Array.from({length:s},()=>(.5+.5*Math.random())*r),g=new X;let w=e+t;const y=t/s;for(let v=0;v<s;v++)w-=y*Math.random(),p.push(...rs(w).toArray()),g.setHSL(v/s,i,.9),_.push(g.r,g.g,g.b);return[new Float32Array(p),new Float32Array(_),new Float32Array(M)]},[s,t,r,e,i]);ie(p=>l.current&&(l.current.uniforms.time.value=p.clock.getElapsedTime()*a));const[f]=h.useState(()=>new is);return h.createElement("points",{ref:o},h.createElement("bufferGeometry",null,h.createElement("bufferAttribute",{attach:"attributes-position",args:[c,3]}),h.createElement("bufferAttribute",{attach:"attributes-color",args:[d,3]}),h.createElement("bufferAttribute",{attach:"attributes-size",args:[u,1]})),h.createElement("primitive",{ref:l,object:f,attach:"material",blending:Et,"uniforms-fade-value":n,depthWrite:!1,transparent:!0,vertexColors:!0}))});/**
 * postprocessing v6.39.4 build Mon Jul 27 2026
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2026 Raoul van Rüschen
 * @license Zlib
 */var as=(()=>{const e=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),t=new Float32Array([0,0,2,0,0,2]),s=new De;return s.setAttribute("position",new V(e,3)),s.setAttribute("uv",new V(t,2)),s})(),O=class Ue{static get fullscreenGeometry(){return as}constructor(t="Pass",s=new He,i=new Ut){this.name=t,this.renderer=null,this.scene=s,this.camera=i,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthBlit=!1,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(t){if(this.rtt===t){const s=this.fullscreenMaterial;s!==null&&(s.needsUpdate=!0),this.rtt=!t}}set mainScene(t){}set mainCamera(t){}setRenderer(t){this.renderer=t}isEnabled(){return this.enabled}setEnabled(t){this.enabled=t}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(t){let s=this.screen;s!==null?s.material=t:(s=new Ye(Ue.fullscreenGeometry,t),s.frustumCulled=!1,this.scene===null&&(this.scene=new He),this.scene.add(s),this.screen=s)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(t){this.fullscreenMaterial=t}getDepthTexture(){return null}setDepthTexture(t,s=re){}render(t,s,i,r,n){throw new Error("Render method not implemented!")}setSize(t,s){}initialize(t,s,i){}dispose(){for(const t of Object.keys(this)){const s=this[t];(s instanceof N||s instanceof rt||s instanceof nt||s instanceof Ue)&&this[t].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},os=class extends O{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(e,t,s,i,r){const n=e.state.buffers.stencil;n.setLocked(!1),n.setTest(!1)}},ls=`#ifdef COLOR_WRITE
#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#endif
#ifdef DEPTH_WRITE
#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}
#endif
#ifdef USE_WEIGHTS
uniform vec4 channelWeights;
#endif
uniform float opacity;varying vec2 vUv;void main(){
#ifdef COLOR_WRITE
vec4 texel=texture2D(inputBuffer,vUv);
#ifdef USE_WEIGHTS
texel*=channelWeights;
#endif
gl_FragColor=opacity*texel;
#ifdef COLOR_SPACE_CONVERSION
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
#else
gl_FragColor=vec4(0.0);
#endif
#ifdef DEPTH_WRITE
gl_FragDepth=readDepth(vUv);
#endif
}`,dt="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",ht=class extends H{constructor(){super({name:"CopyMaterial",defines:{COLOR_SPACE_CONVERSION:"1",DEPTH_PACKING:"0",COLOR_WRITE:"1"},uniforms:{inputBuffer:new S(null),depthBuffer:new S(null),channelWeights:new S(null),opacity:new S(1)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ls,vertexShader:dt}),this.depthFunc=Dt}get inputBuffer(){return this.uniforms.inputBuffer.value}set inputBuffer(e){const t=e!==null;this.colorWrite!==t&&(t?this.defines.COLOR_WRITE=!0:delete this.defines.COLOR_WRITE,this.colorWrite=t,this.needsUpdate=!0),this.uniforms.inputBuffer.value=e}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){const t=e!==null;this.depthWrite!==t&&(t?this.defines.DEPTH_WRITE=!0:delete this.defines.DEPTH_WRITE,this.depthTest=t,this.depthWrite=t,this.needsUpdate=!0),this.uniforms.depthBuffer.value=e}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}get colorSpaceConversion(){return this.defines.COLOR_SPACE_CONVERSION!==void 0}set colorSpaceConversion(e){this.colorSpaceConversion!==e&&(e?this.defines.COLOR_SPACE_CONVERSION=!0:delete this.defines.COLOR_SPACE_CONVERSION,this.needsUpdate=!0)}get channelWeights(){return this.uniforms.channelWeights.value}set channelWeights(e){e!==null?(this.defines.USE_WEIGHTS="1",this.uniforms.channelWeights.value=e):delete this.defines.USE_WEIGHTS,this.needsUpdate=!0}setInputBuffer(e){this.uniforms.inputBuffer.value=e}getOpacity(e){return this.uniforms.opacity.value}setOpacity(e){this.uniforms.opacity.value=e}},us=class extends O{constructor(e,t=!0){super("CopyPass"),this.fullscreenMaterial=new ht,this.needsSwap=!1,this.renderTarget=e,e===void 0&&(this.renderTarget=new N(1,1,{minFilter:fe,magFilter:fe,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=t}get resize(){return this.autoResize}set resize(e){this.autoResize=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(e){this.autoResize=e}render(e,t,s,i,r){this.fullscreenMaterial.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){this.autoResize&&this.renderTarget.setSize(e,t)}initialize(e,t,s){s!==void 0&&(this.renderTarget.texture.type=s,s!==ee?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":e!==null&&e.outputColorSpace===C&&(this.renderTarget.texture.colorSpace=C))}},Ke=new X,ft=class extends O{constructor(e=!0,t=!0,s=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=e,this.depth=t,this.stencil=s,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(e,t,s){this.color=e,this.depth=t,this.stencil=s}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(e){this.overrideClearColor=e}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(e){this.overrideClearAlpha=e}render(e,t,s,i,r){const n=this.overrideClearColor,a=this.overrideClearAlpha,o=e.getClearAlpha(),l=n!==null,c=a>=0;l?(e.getClearColor(Ke),e.setClearColor(n,c?a:o)):c&&e.setClearAlpha(a),e.setRenderTarget(this.renderToScreen?null:t),e.clear(this.color,this.depth,this.stencil),l?e.setClearColor(Ke,o):c&&e.setClearAlpha(o)}},cs=class extends O{constructor(e,t){super("MaskPass",e,t),this.needsSwap=!1,this.clearPass=new ft(!1,!1,!0),this.inverse=!1}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get inverted(){return this.inverse}set inverted(e){this.inverse=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(e){this.inverted=e}render(e,t,s,i,r){const n=e.getContext(),a=e.state.buffers,o=this.scene,l=this.camera,c=this.clearPass,d=this.inverted?0:1,u=1-d;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),a.stencil.setFunc(n.ALWAYS,d,4294967295),a.stencil.setClear(u),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(e,null):(c.render(e,t),c.render(e,s))),this.renderToScreen?(e.setRenderTarget(null),e.render(o,l)):(e.setRenderTarget(t),e.render(o,l),e.setRenderTarget(s),e.render(o,l)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(n.EQUAL,1,4294967295),a.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),a.stencil.setLocked(!0)}},Ee=1/1e3,ds=1e3,hs=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(e){typeof document<"u"&&document.hidden!==void 0&&(e?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=e)}get delta(){return this._delta*Ee}get fixedDelta(){return this._fixedDelta*Ee}set fixedDelta(e){this._fixedDelta=e*ds}get elapsed(){return this._elapsed*Ee}update(e){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(e!==void 0?e:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(e){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},fs=class{constructor(t=null,{depthBuffer:s=!0,stencilBuffer:i=!1,multisampling:r=0,frameBufferType:n}={}){this.renderer=null,this.inputBuffer=this.createBuffer(s,i,n,r),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new us,this.depthRenderTarget=null,this.passes=[],this.timer=new hs,this.autoRenderToScreen=!0,this.setRenderer(t)}get stableDepthTexture(){return this.depthRenderTarget===null?null:this.depthRenderTarget.depthTexture}get multisampling(){return this.inputBuffer.samples}set multisampling(t){this.multisampling!==t&&(this.inputBuffer.samples=t,this.outputBuffer.samples=t,this.inputBuffer.dispose(),this.outputBuffer.dispose())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(t){if(this.renderer=t,t!==null){const s=t.getSize(new A),i=t.getContext().getContextAttributes().alpha,r=this.inputBuffer.texture.type;r===ee&&t.outputColorSpace===C&&(this.inputBuffer.texture.colorSpace=C,this.outputBuffer.texture.colorSpace=C,this.inputBuffer.dispose(),this.outputBuffer.dispose()),t.autoClear=!1,this.setSize(s.width,s.height);for(const n of this.passes)n.initialize(t,i,r)}}replaceRenderer(t,s=!0){const i=this.renderer,r=i.domElement.parentNode;return this.setRenderer(t),s&&r!==null&&(r.removeChild(i.domElement),r.appendChild(t.domElement)),i}createDepthTexture(){const t=new Tt;t.name="EffectComposer.InputDepth",this.inputBuffer.stencilBuffer?(t.format=Mt,t.type=At):t.type=tt;const s=t.clone();s.name="EffectComposer.OutputDepth";const i=t.clone();i.name="EffectComposer.StableDepth",this.inputBuffer.depthTexture=t,this.outputBuffer.depthTexture=s,this.inputBuffer.dispose(),this.outputBuffer.dispose();const{width:r,height:n}=this.inputBuffer;this.depthRenderTarget=new N(r,n,{depthBuffer:!0,stencilBuffer:this.inputBuffer.stencilBuffer,depthTexture:i})}blitDepthBuffer(t){const s=this.renderer,i=this.depthRenderTarget,r=s.properties,n=s.getContext();s.setRenderTarget(i);const a=r.get(t).__webglFramebuffer,o=r.get(i).__webglFramebuffer,l=t.stencilBuffer?n.DEPTH_BUFFER_BIT|n.STENCIL_BUFFER_BIT:n.DEPTH_BUFFER_BIT;n.bindFramebuffer(n.READ_FRAMEBUFFER,a),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,o),n.blitFramebuffer(0,0,t.width,t.height,0,0,i.width,i.height,l,n.NEAREST),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),s.setRenderTarget(null)}deleteDepthTexture(){const t=this.stableDepthTexture;for(const s of this.passes)s.getDepthTexture()===t&&s.setDepthTexture(null);this.depthRenderTarget!==null&&(this.depthRenderTarget.dispose(),this.depthRenderTarget=null),this.inputBuffer.depthTexture!==null&&(this.inputBuffer.depthTexture.dispose(),this.inputBuffer.depthTexture=null),this.outputBuffer.depthTexture!==null&&(this.outputBuffer.depthTexture.dispose(),this.outputBuffer.depthTexture=null)}createBuffer(t,s,i,r){const n=this.renderer,a=n===null?new A:n.getDrawingBufferSize(new A),o=new N(a.width,a.height,{minFilter:fe,magFilter:fe,samples:r,stencilBuffer:s,depthBuffer:t,type:i});return i===ee&&n!==null&&n.outputColorSpace===C&&(o.texture.colorSpace=C),o.texture.name="EffectComposer.Buffer",o.texture.generateMipmaps=!1,o}setMainScene(t){for(const s of this.passes)s.mainScene=t}setMainCamera(t){for(const s of this.passes)s.mainCamera=t}addPass(t,s){const i=this.passes,r=this.renderer,n=r.getDrawingBufferSize(new A),a=r.getContext().getContextAttributes().alpha,o=this.inputBuffer.texture.type;if(t.renderer=r,t.setSize(n.width,n.height),t.initialize(r,a,o),this.autoRenderToScreen&&(i.length>0&&(i[i.length-1].renderToScreen=!1),t.renderToScreen&&(this.autoRenderToScreen=!1)),s!==void 0?i.splice(s,0,t):i.push(t),this.autoRenderToScreen&&(i[i.length-1].renderToScreen=!0),t.needsDepthTexture||this.depthRenderTarget!==null)if(this.depthRenderTarget===null){this.createDepthTexture();for(const l of i)l.setDepthTexture(this.stableDepthTexture)}else t.setDepthTexture(this.stableDepthTexture)}removePass(t){const s=this.passes,i=s.indexOf(t);if(i!==-1&&s.splice(i,1).length>0){const a=this.stableDepthTexture;if(a!==null){const o=(c,d)=>c||d.needsDepthTexture;s.reduce(o,!1)||(t.getDepthTexture()===a&&t.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&i===s.length&&(t.renderToScreen=!1,s.length>0&&(s[s.length-1].renderToScreen=!0))}}removeAllPasses(){const t=this.passes;this.deleteDepthTexture(),t.length>0&&(this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!1),this.passes=[])}render(t){const s=this.renderer,i=this.copyPass;let r=this.inputBuffer,n=this.outputBuffer,a,o=!1;t===void 0&&(this.timer.update(),t=this.timer.getDelta());for(const l of this.passes)if(l.enabled){if(l.render(s,r,n,t,o),l.needsDepthBlit&&this.depthRenderTarget!==null&&this.blitDepthBuffer(r),l.needsSwap){if(o){i.renderToScreen=l.renderToScreen;const c=s.getContext(),d=s.state.buffers.stencil;d.setFunc(c.NOTEQUAL,1,4294967295),i.render(s,r,n,t,o),d.setFunc(c.EQUAL,1,4294967295)}a=r,r=n,n=a}l instanceof cs?o=!0:l instanceof os&&(o=!1)}}setSize(t,s,i){const r=this.renderer,n=r.getSize(new A);(t===void 0||s===void 0)&&(t=n.width,s=n.height),(n.width!==t||n.height!==s)&&r.setSize(t,s,i);const a=r.getDrawingBufferSize(new A);this.inputBuffer.setSize(a.width,a.height),this.outputBuffer.setSize(a.width,a.height),this.depthRenderTarget!==null&&this.depthRenderTarget.setSize(a.width,a.height);for(const o of this.passes)o.setSize(a.width,a.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(const t of this.passes)t.dispose();this.deleteDepthTexture(),this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.copyPass.dispose(),this.timer.dispose(),this.passes=[],O.fullscreenGeometry.dispose()}},K={NONE:0,DEPTH:1,CONVOLUTION:2},x={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},ps=class{constructor(){this.shaderParts=new Map([[x.FRAGMENT_HEAD,null],[x.FRAGMENT_MAIN_UV,null],[x.FRAGMENT_MAIN_IMAGE,null],[x.VERTEX_HEAD,null],[x.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=K.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=st}},_e=!1,$e=class{constructor(e=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(e),this.meshCount=0,this.replaceMaterial=t=>{if(t.isMesh){let s;if(t.material.flatShading)switch(t.material.side){case ue:s=this.materialsFlatShadedDoubleSide;break;case le:s=this.materialsFlatShadedBackSide;break;default:s=this.materialsFlatShaded;break}else switch(t.material.side){case ue:s=this.materialsDoubleSide;break;case le:s=this.materialsBackSide;break;default:s=this.materials;break}this.originalMaterials.set(t,t.material),t.isSkinnedMesh?t.material=s[2]:t.isInstancedMesh?t.material=s[1]:t.material=s[0],++this.meshCount}}}cloneMaterial(e){if(!(e instanceof H))return e.clone();const t=e.uniforms,s=new Map;for(const r in t){const n=t[r].value;n.isRenderTargetTexture&&(t[r].value=null,s.set(r,n))}const i=e.clone();for(const r of s)t[r[0]].value=r[1],i.uniforms[r[0]].value=r[1];return i}setMaterial(e){if(this.disposeMaterials(),this.material=e,e!==null){const t=this.materials=[this.cloneMaterial(e),this.cloneMaterial(e),this.cloneMaterial(e)];for(const s of t)s.uniforms=Object.assign({},e.uniforms),s.side=Bt;t[2].skinning=!0,this.materialsBackSide=t.map(s=>{const i=this.cloneMaterial(s);return i.uniforms=Object.assign({},e.uniforms),i.side=le,i}),this.materialsDoubleSide=t.map(s=>{const i=this.cloneMaterial(s);return i.uniforms=Object.assign({},e.uniforms),i.side=ue,i}),this.materialsFlatShaded=t.map(s=>{const i=this.cloneMaterial(s);return i.uniforms=Object.assign({},e.uniforms),i.flatShading=!0,i}),this.materialsFlatShadedBackSide=t.map(s=>{const i=this.cloneMaterial(s);return i.uniforms=Object.assign({},e.uniforms),i.flatShading=!0,i.side=le,i}),this.materialsFlatShadedDoubleSide=t.map(s=>{const i=this.cloneMaterial(s);return i.uniforms=Object.assign({},e.uniforms),i.flatShading=!0,i.side=ue,i})}}render(e,t,s){const i=e.shadowMap.enabled;if(e.shadowMap.enabled=!1,_e){const r=this.originalMaterials;this.meshCount=0,t.traverse(this.replaceMaterial),e.render(t,s);for(const n of r)n[0].material=n[1];this.meshCount!==r.size&&r.clear()}else{const r=t.overrideMaterial;t.overrideMaterial=this.material,e.render(t,s),t.overrideMaterial=r}e.shadowMap.enabled=i}disposeMaterials(){if(this.material!==null){const e=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(const t of e)t.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return _e}static set workaroundEnabled(e){_e=e}},$=-1,D=class extends Pe{constructor(e=null,t=$,s=$,i=1){super(),e!==null&&this.addEventListener("change",()=>e.setSize(this.baseSize.width,this.baseSize.height)),this.baseSize=new A(1,1),this.preferredSize=new A(t,s),this.target=this.preferredSize,this.s=i,this.effectiveSize=new A,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){const e=this.baseSize,t=this.preferredSize,s=this.effectiveSize,i=this.scale;t.width!==$?s.width=t.width:t.height!==$?s.width=Math.round(t.height*(e.width/Math.max(e.height,1))):s.width=Math.round(e.width*i),t.height!==$?s.height=t.height:t.width!==$?s.height=Math.round(t.width/Math.max(e.width/Math.max(e.height,1),1)):s.height=Math.round(e.height*i)}get width(){return this.effectiveSize.width}set width(e){this.preferredWidth=e}get height(){return this.effectiveSize.height}set height(e){this.preferredHeight=e}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(e){this.s!==e&&(this.s=e,this.preferredSize.setScalar($),this.dispatchEvent({type:"change"}))}getScale(){return this.scale}setScale(e){this.scale=e}get baseWidth(){return this.baseSize.width}set baseWidth(e){this.baseSize.width!==e&&(this.baseSize.width=e,this.dispatchEvent({type:"change"}))}getBaseWidth(){return this.baseWidth}setBaseWidth(e){this.baseWidth=e}get baseHeight(){return this.baseSize.height}set baseHeight(e){this.baseSize.height!==e&&(this.baseSize.height=e,this.dispatchEvent({type:"change"}))}getBaseHeight(){return this.baseHeight}setBaseHeight(e){this.baseHeight=e}setBaseSize(e,t){(this.baseSize.width!==e||this.baseSize.height!==t)&&(this.baseSize.set(e,t),this.dispatchEvent({type:"change"}))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(e){this.preferredSize.width!==e&&(this.preferredSize.width=e,this.dispatchEvent({type:"change"}))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(e){this.preferredWidth=e}get preferredHeight(){return this.preferredSize.height}set preferredHeight(e){this.preferredSize.height!==e&&(this.preferredSize.height=e,this.dispatchEvent({type:"change"}))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(e){this.preferredHeight=e}setPreferredSize(e,t){(this.preferredSize.width!==e||this.preferredSize.height!==t)&&(this.preferredSize.set(e,t),this.dispatchEvent({type:"change"}))}copy(e){this.s=e.scale,this.baseSize.set(e.baseWidth,e.baseHeight),this.preferredSize.set(e.preferredWidth,e.preferredHeight),this.dispatchEvent({type:"change"})}static get AUTO_SIZE(){return $}},m={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},vs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ms="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,src.a*opacity);}",gs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=(dst.rgb+src.rgb)*0.5;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",xs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.xy,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ss="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/max(b,1e-9))),vec3(1.0),step(1.0,a));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",bs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=dst.rgb,b=src.rgb;vec3 c=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ys="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Es="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=abs(dst.rgb-src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",_s="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb/max(src.rgb,1e-9);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ws="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-2.0*dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ts="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb,1.0);vec3 b=min(src.rgb,1.0);vec3 c=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ms="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=step(1.0,dst.rgb+src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",As="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(b.x,a.yz));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Rs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Us="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=src.rgb*max(1.0-dst.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Bs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb,src.rgb);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Cs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ds="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=min(dst.rgb+src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ps="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=clamp(2.0*src.rgb+dst.rgb-1.0,0.0,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Os="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.xy,b.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Is="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb*src.rgb;return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",zs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(1.0-abs(1.0-dst.rgb-src.rgb),0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ls="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return mix(dst,src,opacity);}",Fs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=2.0*src.rgb*dst.rgb;vec3 b=1.0-2.0*(1.0-src.rgb)*(1.0-dst.rgb);vec3 c=mix(a,b,step(0.5,dst.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ns="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 c=mix(mix(src2,dst.rgb,step(0.5*dst.rgb,src.rgb)),max(src2-1.0,vec3(0.0)),step(dst.rgb,src2-1.0));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Hs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=min(dst.rgb*dst.rgb/max(1.0-src.rgb,1e-9),1.0);vec3 c=mix(a,src.rgb,step(1.0,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Gs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 a=RGBToHSL(dst.rgb);vec3 b=RGBToHSL(src.rgb);vec3 c=HSLToRGB(vec3(a.x,b.y,a.z));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",ks="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=dst.rgb+src.rgb-min(dst.rgb*src.rgb,1.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Vs="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 src2=2.0*src.rgb;vec3 d=dst.rgb+(src2-1.0);vec3 w=step(0.5,src.rgb);vec3 a=dst.rgb-(1.0-src2)*dst.rgb*(1.0-dst.rgb);vec3 b=mix(d*(sqrt(dst.rgb)-dst.rgb),d*dst.rgb*((16.0*dst.rgb-12.0)*dst.rgb+3.0),w*(1.0-step(0.25,dst.rgb)));vec3 c=mix(a,b,w);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ws="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){return src;}",js="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=max(dst.rgb-src.rgb,0.0);return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",Ks="vec4 blend(const in vec4 dst,const in vec4 src,const in float opacity){vec3 c=mix(max(1.0-min((1.0-dst.rgb)/(2.0*src.rgb),1.0),0.0),min(dst.rgb/(2.0*(1.0-src.rgb)),1.0),step(0.5,src.rgb));return mix(dst,vec4(c,max(dst.a,src.a)),opacity);}",$s=new Map([[m.ADD,vs],[m.ALPHA,ms],[m.AVERAGE,gs],[m.COLOR,xs],[m.COLOR_BURN,Ss],[m.COLOR_DODGE,bs],[m.DARKEN,ys],[m.DIFFERENCE,Es],[m.DIVIDE,_s],[m.DST,null],[m.EXCLUSION,ws],[m.HARD_LIGHT,Ts],[m.HARD_MIX,Ms],[m.HUE,As],[m.INVERT,Rs],[m.INVERT_RGB,Us],[m.LIGHTEN,Bs],[m.LINEAR_BURN,Cs],[m.LINEAR_DODGE,Ds],[m.LINEAR_LIGHT,Ps],[m.LUMINOSITY,Os],[m.MULTIPLY,Is],[m.NEGATION,zs],[m.NORMAL,Ls],[m.OVERLAY,Fs],[m.PIN_LIGHT,Ns],[m.REFLECT,Hs],[m.SATURATION,Gs],[m.SCREEN,ks],[m.SOFT_LIGHT,Vs],[m.SRC,Ws],[m.SUBTRACT,js],[m.VIVID_LIGHT,Ks]]),Xs=class extends Pe{constructor(e,t=1){super(),this._blendFunction=e,this.opacity=new S(t)}getOpacity(){return this.opacity.value}setOpacity(e){this.opacity.value=e}get blendFunction(){return this._blendFunction}set blendFunction(e){this._blendFunction=e,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(e){this.blendFunction=e}getShaderCode(){return $s.get(this.blendFunction)}},Be=class extends Pe{constructor(e,t,{attributes:s=K.NONE,blendFunction:i=m.NORMAL,defines:r=new Map,uniforms:n=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=e,this.renderer=null,this.attributes=s,this.fragmentShader=t,this.vertexShader=o,this.defines=r,this.uniforms=n,this.extensions=a,this.blendMode=new Xs(i),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=st,this._outputColorSpace=it}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(e){this._inputColorSpace=e,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e,this.setChanged()}set mainScene(e){}set mainCamera(e){}getName(){return this.name}setRenderer(e){this.renderer=e}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(e){this.attributes=e,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(e){this.fragmentShader=e,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(e){this.vertexShader=e,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(e,t=re){}update(e,t,s){}setSize(e,t){}initialize(e,t,s){}dispose(){for(const e of Object.keys(this)){const t=this[e];(t instanceof N||t instanceof rt||t instanceof nt||t instanceof O)&&this[e].dispose()}}},ze={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},qs=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,Zs="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",Qs=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],Ys=class extends H{constructor(e=new J){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new S(null),texelSize:new S(new J),scale:new S(1),kernel:new S(0)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:qs,vertexShader:Zs}),this.setTexelSize(e.x,e.y),this.kernelSize=ze.MEDIUM}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.inputBuffer=e}get kernelSequence(){return Qs[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(e){this.uniforms.scale.value=e}getScale(){return this.uniforms.scale.value}setScale(e){this.uniforms.scale.value=e}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(e){this.uniforms.kernel.value=e}setKernel(e){this.kernel=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t,e*.5,t*.5)}setSize(e,t){const s=1/e,i=1/t;this.uniforms.texelSize.value.set(s,i,s*.5,i*.5)}},Js=class extends O{constructor({kernelSize:e=ze.MEDIUM,resolutionScale:t=.5,width:s=D.AUTO_SIZE,height:i=D.AUTO_SIZE,resolutionX:r=s,resolutionY:n=i}={}){super("KawaseBlurPass"),this.renderTargetA=new N(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const a=this.resolution=new D(this,r,n,t);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new Ys,this._blurMaterial.kernelSize=e,this.copyMaterial=new ht}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(e){this._blurMaterial=e}get dithering(){return this.copyMaterial.dithering}set dithering(e){this.copyMaterial.dithering=e}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(e){this.blurMaterial.kernelSize=e}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get scale(){return this.blurMaterial.scale}set scale(e){this.blurMaterial.scale=e}getScale(){return this.blurMaterial.scale}setScale(e){this.blurMaterial.scale=e}getKernelSize(){return this.kernelSize}setKernelSize(e){this.kernelSize=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,s,i,r){const n=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,c=this.blurMaterial,d=c.kernelSequence;let u=t;this.fullscreenMaterial=c;for(let f=0,p=d.length;f<p;++f){const _=f&1?l:o;c.kernel=d[f],c.inputBuffer=u.texture,e.setRenderTarget(_),e.render(n,a),u=_}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=u.texture,e.setRenderTarget(this.renderToScreen?null:s),e.render(n,a)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t);const i=s.width,r=s.height;this.renderTargetA.setSize(i,r),this.renderTargetB.setSize(i,r),this.blurMaterial.setSize(e,t)}initialize(e,t,s){s!==void 0&&(this.renderTargetA.texture.type=s,this.renderTargetB.texture.type=s,s!==ee?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):e!==null&&e.outputColorSpace===C&&(this.renderTargetA.texture.colorSpace=C,this.renderTargetB.texture.colorSpace=C))}static get AUTO_SIZE(){return D.AUTO_SIZE}},ei=`#include <common>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef RANGE
uniform vec2 range;
#elif defined(THRESHOLD)
uniform float threshold;uniform float smoothing;
#endif
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);float mask=1.0;
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);mask=low*high;
#elif defined(THRESHOLD)
mask=smoothstep(threshold,threshold+smoothing,l);
#endif
#ifdef COLOR
gl_FragColor=texel*mask;
#else
gl_FragColor=vec4(l*mask);
#endif
}`,ti=class extends H{constructor(e=!1,t=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:ve.replace(/\D+/g,"")},uniforms:{inputBuffer:new S(null),threshold:new S(0),smoothing:new S(1),range:new S(null)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ei,vertexShader:dt}),this.colorOutput=e,this.luminanceRange=t}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}get threshold(){return this.uniforms.threshold.value}set threshold(e){this.smoothing>0||e>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=e}getThreshold(){return this.threshold}setThreshold(e){this.threshold=e}get smoothing(){return this.uniforms.smoothing.value}set smoothing(e){this.threshold>0||e>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=e}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(e){this.smoothing=e}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(e){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(e){e?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(e){return this.colorOutput}setColorOutputEnabled(e){this.colorOutput=e}get useRange(){return this.luminanceRange!==null}set useRange(e){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(e){e!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=e,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(e){this.luminanceRange=e}},si=class extends O{constructor({renderTarget:e,luminanceRange:t,colorOutput:s,resolutionScale:i=1,width:r=D.AUTO_SIZE,height:n=D.AUTO_SIZE,resolutionX:a=r,resolutionY:o=n}={}){super("LuminancePass"),this.fullscreenMaterial=new ti(s,t),this.needsSwap=!1,this.renderTarget=e,this.renderTarget===void 0&&(this.renderTarget=new N(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");const l=this.resolution=new D(this,a,o,i);l.addEventListener("change",c=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(e,t,s,i,r){const n=this.fullscreenMaterial;n.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t),this.renderTarget.setSize(s.width,s.height)}initialize(e,t,s){s!==void 0&&s!==ee&&(this.renderTarget.texture.type=s,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},ii=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.05556
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,ri="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",ni=class extends H{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new S(null),texelSize:new S(new A)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ii,vertexShader:ri})}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},ai=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,oi="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",li=class extends H{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new S(null),supportBuffer:new S(null),texelSize:new S(new A),radius:new S(.85)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ai,vertexShader:oi})}set inputBuffer(e){this.uniforms.inputBuffer.value=e}set supportBuffer(e){this.uniforms.supportBuffer.value=e}get radius(){return this.uniforms.radius.value}set radius(e){this.uniforms.radius.value=e}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},ui=class extends O{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new N(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new ni,this.upsamplingMaterial=new li,this.resolution=new A}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(e){if(this.levels!==e){const t=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let s=0;s<e;++s){const i=t.clone();i.texture.name="Downsampling.Mipmap"+s,this.downsamplingMipmaps.push(i)}this.upsamplingMipmaps.push(t);for(let s=1,i=e-1;s<i;++s){const r=t.clone();r.texture.name="Upsampling.Mipmap"+s,this.upsamplingMipmaps.push(r)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(e){this.upsamplingMaterial.radius=e}render(e,t,s,i,r){const{scene:n,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:c,upsamplingMipmaps:d}=this;let u=t;this.fullscreenMaterial=o;for(let f=0,p=c.length;f<p;++f){const _=c[f];o.setSize(u.width,u.height),o.inputBuffer=u.texture,e.setRenderTarget(_),e.render(n,a),u=_}this.fullscreenMaterial=l;for(let f=d.length-1;f>=0;--f){const p=d[f];l.setSize(u.width,u.height),l.inputBuffer=u.texture,l.supportBuffer=c[f].texture,e.setRenderTarget(p),e.render(n,a),u=p}}setSize(e,t){const s=this.resolution;s.set(e,t);let i=s.width,r=s.height;for(let n=0,a=this.downsamplingMipmaps.length;n<a;++n)i=Math.round(i*.5),r=Math.round(r*.5),this.downsamplingMipmaps[n].setSize(i,r),n<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[n].setSize(i,r)}initialize(e,t,s){if(s!==void 0){const i=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(const r of i)r.texture.type=s;if(s!==ee)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(e!==null&&e.outputColorSpace===C)for(const r of i)r.texture.colorSpace=C}}dispose(){super.dispose();for(const e of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))e.dispose()}},ci=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=texture2D(map,uv)*intensity;}`,di=class extends Be{constructor({blendFunction:e=m.SCREEN,luminanceThreshold:t=1,luminanceSmoothing:s=.03,mipmapBlur:i=!0,intensity:r=1,radius:n=.85,levels:a=8,kernelSize:o=ze.LARGE,resolutionScale:l=.5,width:c=D.AUTO_SIZE,height:d=D.AUTO_SIZE,resolutionX:u=c,resolutionY:f=d}={}){super("BloomEffect",ci,{blendFunction:e,uniforms:new Map([["map",new S(null)],["intensity",new S(r)]])}),this.renderTarget=new N(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new Js({kernelSize:o}),this.luminancePass=new si({colorOutput:!0}),this.luminanceMaterial.threshold=t,this.luminanceMaterial.smoothing=s,this.mipmapBlurPass=new ui,this.mipmapBlurPass.enabled=i,this.mipmapBlurPass.radius=n,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=i?this.mipmapBlurPass.texture:this.renderTarget.texture;const p=this.resolution=new D(this,u,f,l);p.addEventListener("change",_=>this.setSize(p.baseWidth,p.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get dithering(){return this.blurPass.dithering}set dithering(e){this.blurPass.dithering=e}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(e){this.blurPass.kernelSize=e}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(e){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(e){this.uniforms.get("intensity").value=e}getIntensity(){return this.intensity}setIntensity(e){this.intensity=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}update(e,t,s){const i=this.renderTarget,r=this.luminancePass;r.enabled?(r.render(e,t),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(e,r.renderTarget):this.blurPass.render(e,r.renderTarget,i)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(e,t):this.blurPass.render(e,t,i)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t),this.renderTarget.setSize(s.width,s.height),this.blurPass.resolution.copy(s),this.luminancePass.setSize(e,t),this.mipmapBlurPass.setSize(e,t)}initialize(e,t,s){this.blurPass.initialize(e,t,s),this.luminancePass.initialize(e,t,s),this.mipmapBlurPass.initialize(e,t,s),s!==void 0&&(this.renderTarget.texture.type=s,e!==null&&e.outputColorSpace===C&&(this.renderTarget.texture.colorSpace=C))}},pt=class extends O{constructor(e,t,s=null){super("RenderPass",e,t),this.needsSwap=!1,this.needsDepthBlit=!0,this.clearPass=new ft,this.overrideMaterialManager=s===null?null:new $e(s),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get renderToScreen(){return super.renderToScreen}set renderToScreen(e){super.renderToScreen=e,this.clearPass.renderToScreen=e}get overrideMaterial(){const e=this.overrideMaterialManager;return e!==null?e.material:null}set overrideMaterial(e){const t=this.overrideMaterialManager;e!==null?t!==null?t.setMaterial(e):this.overrideMaterialManager=new $e(e):t!==null&&(t.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(e){this.overrideMaterial=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getSelection(){return this.selection}setSelection(e){this.selection=e}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(e){this.ignoreBackground=e}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(e){this.skipShadowMapUpdate=e}getClearPass(){return this.clearPass}render(e,t,s,i,r){const n=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,c=n.background,d=e.shadowMap.autoUpdate,u=this.renderToScreen?null:t;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(e.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(n.background=null),this.clearPass.enabled&&this.clearPass.render(e,t),e.setRenderTarget(u),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(e,n,a):e.render(n,a),a.layers.mask=l,n.background=c,e.shadowMap.autoUpdate=d}},hi=`#include <packing>
#ifdef GL_FRAGMENT_PRECISION_HIGH
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
#ifdef DOWNSAMPLE_NORMALS
uniform lowp sampler2D normalBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}int findBestDepth(const in float samples[4]){float c=(samples[0]+samples[1]+samples[2]+samples[3])*0.25;float distances[4];distances[0]=abs(c-samples[0]);distances[1]=abs(c-samples[1]);distances[2]=abs(c-samples[2]);distances[3]=abs(c-samples[3]);float maxDistance=max(max(distances[0],distances[1]),max(distances[2],distances[3]));int remaining[3];int rejected[3];int i,j,k;for(i=0,j=0,k=0;i<4;++i){if(distances[i]<maxDistance){remaining[j++]=i;}else{rejected[k++]=i;}}for(;j<3;++j){remaining[j]=rejected[--k];}vec3 s=vec3(samples[remaining[0]],samples[remaining[1]],samples[remaining[2]]);c=(s.x+s.y+s.z)/3.0;distances[0]=abs(c-s.x);distances[1]=abs(c-s.y);distances[2]=abs(c-s.z);float minDistance=min(distances[0],min(distances[1],distances[2]));for(i=0;i<3;++i){if(distances[i]==minDistance){break;}}return remaining[i];}void main(){float d[4];d[0]=readDepth(vUv0);d[1]=readDepth(vUv1);d[2]=readDepth(vUv2);d[3]=readDepth(vUv3);int index=findBestDepth(d);
#ifdef DOWNSAMPLE_NORMALS
vec3 n[4];n[0]=texture2D(normalBuffer,vUv0).rgb;n[1]=texture2D(normalBuffer,vUv1).rgb;n[2]=texture2D(normalBuffer,vUv2).rgb;n[3]=texture2D(normalBuffer,vUv3).rgb;
#else
vec3 n[4];n[0]=vec3(0.0);n[1]=vec3(0.0);n[2]=vec3(0.0);n[3]=vec3(0.0);
#endif
gl_FragColor=vec4(n[index],d[index]);}`,fi="uniform vec2 texelSize;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vUv0=uv;vUv1=vec2(uv.x,uv.y+texelSize.y);vUv2=vec2(uv.x+texelSize.x,uv.y);vUv3=uv+texelSize;gl_Position=vec4(position.xy,1.0,1.0);}",pi=class extends H{constructor(){super({name:"DepthDownsamplingMaterial",defines:{DEPTH_PACKING:"0"},uniforms:{depthBuffer:new S(null),normalBuffer:new S(null),texelSize:new S(new A)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:hi,vertexShader:fi})}set depthBuffer(e){this.uniforms.depthBuffer.value=e}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=re){this.depthBuffer=e,this.depthPacking=t}set normalBuffer(e){this.uniforms.normalBuffer.value=e,e!==null?this.defines.DOWNSAMPLE_NORMALS="1":delete this.defines.DOWNSAMPLE_NORMALS,this.needsUpdate=!0}setNormalBuffer(e){this.normalBuffer=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t)}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},vi=class extends O{constructor({normalBuffer:e=null,resolutionScale:t=.5,width:s=D.AUTO_SIZE,height:i=D.AUTO_SIZE,resolutionX:r=s,resolutionY:n=i}={}){super("DepthDownsamplingPass");const a=new pi;a.normalBuffer=e,this.fullscreenMaterial=a,this.needsDepthTexture=!0,this.needsSwap=!1,this.renderTarget=new N(1,1,{minFilter:pe,magFilter:pe,depthBuffer:!1,type:tt}),this.renderTarget.texture.name="DepthDownsamplingPass.Target",this.renderTarget.texture.generateMipmaps=!1;const o=this.resolution=new D(this,r,n,t);o.addEventListener("change",l=>this.setSize(o.baseWidth,o.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}setDepthTexture(e,t=re){this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.depthPacking=t}render(e,t,s,i,r){e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t),this.renderTarget.setSize(s.width,s.height),this.fullscreenMaterial.setSize(e,t)}initialize(e,t,s){const i=e.getContext();if(!(i.getExtension("EXT_color_buffer_float")||i.getExtension("EXT_color_buffer_half_float")))throw new Error("Rendering to float texture is not supported.")}},mi=`#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
float depth=unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
float depth=texture2D(depthBuffer,uv).r;
#endif
#if defined(USE_LOGARITHMIC_DEPTH_BUFFER) || defined(LOG_DEPTH)
float d=pow(2.0,depth*log2(cameraFar+1.0))-1.0;float a=cameraFar/(cameraFar-cameraNear);float b=cameraFar*cameraNear/(cameraNear-cameraFar);depth=a+b/d;
#elif defined(USE_REVERSED_DEPTH_BUFFER)
depth=1.0-depth;
#endif
return depth;}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
}`,gi="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",xi=class extends H{constructor(e,t,s,i,r=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:ve.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new S(null),depthBuffer:new S(null),resolution:new S(new A),texelSize:new S(new A),cameraNear:new S(.3),cameraFar:new S(1e3),aspect:new S(1),time:new S(0)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:r}),e&&this.setShaderParts(e),t&&this.setDefines(t),s&&this.setUniforms(s),this.copyCameraSettings(i)}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){this.uniforms.depthBuffer.value=e}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=re){this.depthBuffer=e,this.depthPacking=t}setShaderData(e){this.setShaderParts(e.shaderParts),this.setDefines(e.defines),this.setUniforms(e.uniforms),this.setExtensions(e.extensions)}setShaderParts(e){return this.fragmentShader=mi.replace(x.FRAGMENT_HEAD,e.get(x.FRAGMENT_HEAD)||"").replace(x.FRAGMENT_MAIN_UV,e.get(x.FRAGMENT_MAIN_UV)||"").replace(x.FRAGMENT_MAIN_IMAGE,e.get(x.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=gi.replace(x.VERTEX_HEAD,e.get(x.VERTEX_HEAD)||"").replace(x.VERTEX_MAIN_SUPPORT,e.get(x.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(e){for(const t of e.entries())this.defines[t[0]]=t[1];return this.needsUpdate=!0,this}setUniforms(e){for(const t of e.entries())this.uniforms[t[0]]=t[1];return this}setExtensions(e){this.extensions={};for(const t of e)this.extensions[t]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(e){this.encodeOutput!==e&&(e?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(e){return this.encodeOutput}setOutputEncodingEnabled(e){this.encodeOutput=e}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}setDeltaTime(e){this.uniforms.time.value+=e}adoptCameraSettings(e){this.copyCameraSettings(e)}copyCameraSettings(e){e&&(this.uniforms.cameraNear.value=e.near,this.uniforms.cameraFar.value=e.far,e instanceof Ct?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(e,t){const s=this.uniforms;s.resolution.value.set(e,t),s.texelSize.value.set(1/e,1/t),s.aspect.value=e/t}static get Section(){return x}};function Xe(e,t,s){for(const i of t){const r="$1"+e+i.charAt(0).toUpperCase()+i.slice(1),n=new RegExp("([^\\.])(\\b"+i+"\\b)","g");for(const a of s.entries())a[1]!==null&&s.set(a[0],a[1].replace(n,r))}}function Si(e,t,s){let i=t.getFragmentShader(),r=t.getVertexShader();const n=i!==void 0&&/mainImage/.test(i),a=i!==void 0&&/mainUv/.test(i);if(s.attributes|=t.getAttributes(),i===void 0)throw new Error(`Missing fragment shader (${t.name})`);if(a&&s.attributes&K.CONVOLUTION)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${t.name})`);if(!n&&!a)throw new Error(`Could not find mainImage or mainUv function (${t.name})`);{const o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,l=s.shaderParts;let c=l.get(x.FRAGMENT_HEAD)||"",d=l.get(x.FRAGMENT_MAIN_UV)||"",u=l.get(x.FRAGMENT_MAIN_IMAGE)||"",f=l.get(x.VERTEX_HEAD)||"",p=l.get(x.VERTEX_MAIN_SUPPORT)||"";const _=new Set,M=new Set;if(a&&(d+=`	${e}MainUv(UV);
`,s.uvTransformation=!0),r!==null&&/mainSupport/.test(r)){const y=/mainSupport *\([\w\s]*?uv\s*?\)/.test(r);p+=`	${e}MainSupport(`,p+=y?`vUv);
`:`);
`;for(const v of r.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const E of v[1].split(/\s*,\s*/))s.varyings.add(E),_.add(E),M.add(E);for(const v of r.matchAll(o))M.add(v[1])}for(const y of i.matchAll(o))M.add(y[1]);for(const y of t.defines.keys())M.add(y.replace(/\([\w\s,]*\)/g,""));for(const y of t.uniforms.keys())M.add(y);M.delete("while"),M.delete("for"),M.delete("if"),t.uniforms.forEach((y,v)=>s.uniforms.set(e+v.charAt(0).toUpperCase()+v.slice(1),y)),t.defines.forEach((y,v)=>s.defines.set(e+v.charAt(0).toUpperCase()+v.slice(1),y));const g=new Map([["fragment",i],["vertex",r]]);Xe(e,M,s.defines),Xe(e,M,g),i=g.get("fragment"),r=g.get("vertex");const w=t.blendMode;if(s.blendModes.set(w.blendFunction,w),n){t.inputColorSpace!==null&&t.inputColorSpace!==s.colorSpace&&(u+=t.inputColorSpace===C?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),t.outputColorSpace!==it?s.colorSpace=t.outputColorSpace:t.inputColorSpace!==null&&(s.colorSpace=t.inputColorSpace);const y=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;u+=`${e}MainImage(color0, UV, `,s.attributes&K.DEPTH&&y.test(i)&&(u+="depth, ",s.readDepth=!0),u+=`color1);
	`;const v=e+"BlendOpacity";s.uniforms.set(v,w.opacity),u+=`color0 = blend${w.blendFunction}(color0, color1, ${v});

	`,c+=`uniform float ${v};

`}if(c+=i+`
`,r!==null&&(f+=r+`
`),l.set(x.FRAGMENT_HEAD,c),l.set(x.FRAGMENT_MAIN_UV,d),l.set(x.FRAGMENT_MAIN_IMAGE,u),l.set(x.VERTEX_HEAD,f),l.set(x.VERTEX_MAIN_SUPPORT,p),t.extensions!==null)for(const y of t.extensions)s.extensions.add(y)}}var bi=class extends O{constructor(e,...t){super("EffectPass"),this.fullscreenMaterial=new xi(null,null,null,e),this.listener=s=>this.handleEvent(s),this.effects=[],this.setEffects(t),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(e){for(const t of this.effects)t.mainScene=e}set mainCamera(e){this.fullscreenMaterial.copyCameraSettings(e);for(const t of this.effects)t.mainCamera=e}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(e){this.fullscreenMaterial.encodeOutput=e}get dithering(){return this.fullscreenMaterial.dithering}set dithering(e){const t=this.fullscreenMaterial;t.dithering=e,t.needsUpdate=!0}setEffects(e){for(const t of this.effects)t.removeEventListener("change",this.listener);this.effects=e.sort((t,s)=>s.attributes-t.attributes);for(const t of this.effects)t.addEventListener("change",this.listener)}updateMaterial(){const e=new ps;let t=0;for(const a of this.effects)if(a.blendMode.blendFunction===m.DST)e.attributes|=a.getAttributes()&K.DEPTH;else{if(e.attributes&a.getAttributes()&K.CONVOLUTION)throw new Error(`Convolution effects cannot be merged (${a.name})`);Si("e"+t++,a,e)}let s=e.shaderParts.get(x.FRAGMENT_HEAD),i=e.shaderParts.get(x.FRAGMENT_MAIN_IMAGE),r=e.shaderParts.get(x.FRAGMENT_MAIN_UV);const n=/\bblend\b/g;for(const a of e.blendModes.values())s+=a.getShaderCode().replace(n,`blend${a.blendFunction}`)+`
`;e.attributes&K.DEPTH?(e.readDepth&&(i=`float depth = readDepth(UV);

	`+i),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,e.colorSpace===C&&(i+=`color0 = sRGBToLinear(color0);
	`),e.uvTransformation?(r=`vec2 transformedUv = vUv;
`+r,e.defines.set("UV","transformedUv")):e.defines.set("UV","vUv"),e.shaderParts.set(x.FRAGMENT_HEAD,s),e.shaderParts.set(x.FRAGMENT_MAIN_IMAGE,i),e.shaderParts.set(x.FRAGMENT_MAIN_UV,r);for(const[a,o]of e.shaderParts)o!==null&&e.shaderParts.set(a,o.trim().replace(/^#/,`
#`));this.skipRendering=t===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(e)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(e,t=re){this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.depthPacking=t;for(const s of this.effects)s.setDepthTexture(e,t)}render(e,t,s,i,r){for(const n of this.effects)n.update(e,t,i);if(!this.skipRendering||this.renderToScreen){const n=this.fullscreenMaterial;n.inputBuffer=t.texture,n.time+=i*this.timeScale,e.setRenderTarget(this.renderToScreen?null:s),e.render(this.scene,this.camera)}}setSize(e,t){this.fullscreenMaterial.setSize(e,t);for(const s of this.effects)s.setSize(e,t)}initialize(e,t,s){this.renderer=e;for(const i of this.effects)i.initialize(e,t,s);this.updateMaterial(),s!==void 0&&s!==ee&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(const e of this.effects)e.removeEventListener("change",this.listener),e.dispose()}handleEvent(e){switch(e.type){case"change":this.recompile();break}}},yi=class extends O{constructor(e,t,{renderTarget:s,resolutionScale:i=1,width:r=D.AUTO_SIZE,height:n=D.AUTO_SIZE,resolutionX:a=r,resolutionY:o=n}={}){super("NormalPass"),this.needsSwap=!1,this.renderPass=new pt(e,t,new Rt);const l=this.renderPass;l.ignoreBackground=!0,l.skipShadowMapUpdate=!0;const c=l.getClearPass();c.overrideClearColor=new X(7829503),c.overrideClearAlpha=1,this.renderTarget=s,this.renderTarget===void 0&&(this.renderTarget=new N(1,1,{minFilter:pe,magFilter:pe}),this.renderTarget.texture.name="NormalPass.Target");const d=this.resolution=new D(this,a,o,i);d.addEventListener("change",u=>this.setSize(d.baseWidth,d.baseHeight))}set mainScene(e){this.renderPass.mainScene=e}set mainCamera(e){this.renderPass.mainCamera=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,s,i,r){const n=this.renderToScreen?null:this.renderTarget;this.renderPass.render(e,n,n)}setSize(e,t){const s=this.resolution;s.setBaseSize(e,t),this.renderTarget.setSize(s.width,s.height)}};const Ei=h.createContext(null),qe=e=>(e.getAttributes()&K.CONVOLUTION)===K.CONVOLUTION,_i=Me.memo(h.forwardRef(({children:e,camera:t,scene:s,resolutionScale:i,enabled:r=!0,renderPriority:n=1,autoClear:a=!0,depthBuffer:o,enableNormalPass:l,stencilBuffer:c,multisampling:d=8,frameBufferType:u=Ot},f)=>{const{gl:p,scene:_,camera:M,size:g}=oe(),w=s||_,y=t||M,[v,E,I]=h.useMemo(()=>{const z=Ft(),L=new fs(p,{depthBuffer:o,stencilBuffer:c,multisampling:d>0&&z?d:0,frameBufferType:u});L.addPass(new pt(w,y));let j=null,F=null;return l&&(F=new yi(w,y),F.enabled=!1,L.addPass(F),i!==void 0&&z&&(j=new vi({normalBuffer:F.texture,resolutionScale:i}),j.enabled=!1,L.addPass(j))),[L,F,j]},[y,p,o,c,d,u,w,l,i]);h.useEffect(()=>v==null?void 0:v.setSize(g.width,g.height),[v,g]),ie((z,L)=>{if(r){const j=p.autoClear;p.autoClear=a,c&&!a&&p.clearStencil(),v.render(L),p.autoClear=j}},r?n:0);const q=h.useRef(null);h.useLayoutEffect(()=>{var z;const L=[],j=(z=q.current)==null?void 0:z.__r3f;if(j&&v){const F=j.objects;for(let Q=0;Q<F.length;Q++){const ne=F[Q];if(ne instanceof Be){const Le=[ne];if(!qe(ne)){let me=null;for(;(me=F[Q+1])instanceof Be&&!qe(me);)Le.push(me),Q++}const vt=new bi(y,...Le);L.push(vt)}else ne instanceof O&&L.push(ne)}for(const Q of L)v==null||v.addPass(Q);E&&(E.enabled=!0),I&&(I.enabled=!0)}return()=>{for(const F of L)v==null||v.removePass(F);E&&(E.enabled=!1),I&&(I.enabled=!1)}},[v,e,y,E,I]),h.useEffect(()=>{const z=p.toneMapping;return p.toneMapping=Pt,()=>{p.toneMapping=z}},[p]);const Z=h.useMemo(()=>({composer:v,normalPass:E,downSamplingPass:I,resolutionScale:i,camera:y,scene:w}),[v,E,I,i,y,w]);return h.useImperativeHandle(f,()=>v,[v]),T.jsx(Ei.Provider,{value:Z,children:T.jsx("group",{ref:q,children:e})})}));let wi=0;const Ze=new WeakMap,Ti=(e,t)=>Me.forwardRef(function({blendFunction:i=t==null?void 0:t.blendFunction,opacity:r=t==null?void 0:t.opacity,...n},a){let o=Ze.get(e);if(!o){const d=`@react-three/postprocessing/${e.name}-${wi++}`;It({[d]:e}),Ze.set(e,o=d)}const l=oe(d=>d.camera),c=Me.useMemo(()=>{var d,u;return[...(d=t==null?void 0:t.args)!=null?d:[],...(u=n.args)!=null?u:[{...t,...n}]]},[JSON.stringify(n)]);return T.jsx(o,{camera:l,"blendMode-blendFunction":i,"blendMode-opacity-value":r,...n,ref:a,args:c})}),Mi=Ti(di,{blendFunction:m.ADD}),Ai={color:[6,.5,2],toneMapped:!1},Ri={color:[10,1,10],toneMapped:!1};function Pi(){return T.jsx("div",{className:"w-full h-full bg-transparent",children:T.jsxs(zt,{camera:{position:[0,0,10]},children:[T.jsx(ss,{speed:4,rotationIntensity:1,floatIntensity:2,children:T.jsx(Ui,{})}),T.jsx(ns,{saturation:0,count:800,speed:.5}),T.jsx(_i,{children:T.jsx(Mi,{mipmapBlur:!0,luminanceThreshold:1,radius:.7})})]})})}function Ui(e){const t=h.useMemo(()=>new Lt(0,0,3,1.15,0,2*Math.PI,!1,0).getPoints(100),[]);return T.jsxs("group",{...e,children:[T.jsx(be,{worldUnits:!0,points:t,color:"turquoise",lineWidth:.3}),T.jsx(be,{worldUnits:!0,points:t,color:"turquoise",lineWidth:.3,rotation:[0,0,1]}),T.jsx(be,{worldUnits:!0,points:t,color:"turquoise",lineWidth:.3,rotation:[0,0,-1]}),T.jsx(we,{position:[0,0,.5],speed:6}),T.jsx(we,{position:[0,0,.5],rotation:[0,0,Math.PI/3],speed:6.5}),T.jsx(we,{position:[0,0,.5],rotation:[0,0,-Math.PI/3],speed:7}),T.jsx(ts,{args:[.55,64,64],children:T.jsx("meshBasicMaterial",{...Ai})})]})}function we({radius:e=2.75,speed:t=6,...s}){const i=h.useRef();return ie(r=>{const n=r.clock.getElapsedTime()*t;i.current.position.set(Math.sin(n)*e,Math.cos(n)*e*Math.atan(n)/Math.PI/1.25,0)}),T.jsx("group",{...s,children:T.jsx(Jt,{local:!0,width:5,length:6,color:new X(2,1,10),attenuation:r=>r*r,children:T.jsxs("mesh",{ref:i,children:[T.jsx("sphereGeometry",{args:[.25]}),T.jsx("meshBasicMaterial",{...Ri})]})})})}export{Pi as default};
