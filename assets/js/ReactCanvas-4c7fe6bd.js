import{r as d,bk as Me,d as Te,j as M}from"./index-ce305ae4.js";import{R as ve,I as vt,F as Ne,a as Ae,b as ie,W as mt,B as ze,S as Qe,V as D,c as H,U as He,d as Ue,e as A,f as Ye,g as J,h as Je,M as et,L as gt,i as oe,j as X,k as Ce,l as k,O as xt,u as se,n as yt,m as St,A as bt,v as wt,o as Et,p as ee,q as z,r as _t,s as Mt,t as Tt,w as At,x as W,E as De,y as tt,N as it,z as re,G as fe,H as Ut,J as Bt,K as Fe,Q as Rt,T as pe,X as le,Y as ue,Z as zt,_ as b,$ as st,a0 as rt,a1 as te,a2 as Ct,a3 as Dt,a4 as Pt,a5 as Lt,C as It,a6 as Ot}from"./constants-13c91d7e.js";let ae;function Nt(){var e;if(ae!==void 0)return ae;try{let t;const i=document.createElement("canvas");return ae=!!(window.WebGL2RenderingContext&&(t=i.getContext("webgl2"))),t&&((e=t.getExtension("WEBGL_lose_context"))==null||e.loseContext()),ae}catch{return ae=!1}}const nt=(()=>parseInt(ve.replace(/\D+/g,"")))(),at=nt>=125?"uv1":"uv2",Ge=new ze,ce=new D;class Pe extends vt{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],i=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],s=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(s),this.setAttribute("position",new Ne(t,3)),this.setAttribute("uv",new Ne(i,2))}applyMatrix4(t){const i=this.attributes.instanceStart,s=this.attributes.instanceEnd;return i!==void 0&&(i.applyMatrix4(t),s.applyMatrix4(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let i;t instanceof Float32Array?i=t:Array.isArray(t)&&(i=new Float32Array(t));const s=new Ae(i,6,1);return this.setAttribute("instanceStart",new ie(s,3,0)),this.setAttribute("instanceEnd",new ie(s,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t,i=3){let s;t instanceof Float32Array?s=t:Array.isArray(t)&&(s=new Float32Array(t));const r=new Ae(s,i*2,1);return this.setAttribute("instanceColorStart",new ie(r,i,0)),this.setAttribute("instanceColorEnd",new ie(r,i,i)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new mt(t.geometry)),this}fromLineSegments(t){const i=t.geometry;return this.setPositions(i.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ze);const t=this.attributes.instanceStart,i=this.attributes.instanceEnd;t!==void 0&&i!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Ge.setFromBufferAttribute(i),this.boundingBox.union(Ge))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Qe),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,i=this.attributes.instanceEnd;if(t!==void 0&&i!==void 0){const s=this.boundingSphere.center;this.boundingBox.getCenter(s);let r=0;for(let n=0,a=t.count;n<a;n++)ce.fromBufferAttribute(t,n),r=Math.max(r,s.distanceToSquared(ce)),ce.fromBufferAttribute(i,n),r=Math.max(r,s.distanceToSquared(ce));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}class ot extends Pe{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){const i=t.length-3,s=new Float32Array(2*i);for(let r=0;r<i;r+=3)s[2*r]=t[r],s[2*r+1]=t[r+1],s[2*r+2]=t[r+2],s[2*r+3]=t[r+3],s[2*r+4]=t[r+4],s[2*r+5]=t[r+5];return super.setPositions(s),this}setColors(t,i=3){const s=t.length-i,r=new Float32Array(2*s);if(i===3)for(let n=0;n<s;n+=i)r[2*n]=t[n],r[2*n+1]=t[n+1],r[2*n+2]=t[n+2],r[2*n+3]=t[n+3],r[2*n+4]=t[n+4],r[2*n+5]=t[n+5];else for(let n=0;n<s;n+=i)r[2*n]=t[n],r[2*n+1]=t[n+1],r[2*n+2]=t[n+2],r[2*n+3]=t[n+3],r[2*n+4]=t[n+4],r[2*n+5]=t[n+5],r[2*n+6]=t[n+6],r[2*n+7]=t[n+7];return super.setColors(r,i),this}fromLine(t){const i=t.geometry;return this.setPositions(i.attributes.position.array),this}}class Le extends H{constructor(t){super({type:"LineMaterial",uniforms:He.clone(He.merge([Ue.common,Ue.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new A(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
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
					#include <${nt>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(i){this.uniforms.diffuse.value=i}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(i){i===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(i){this.uniforms.linewidth.value=i}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(i){!!i!="USE_DASH"in this.defines&&(this.needsUpdate=!0),i===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(i){this.uniforms.dashScale.value=i}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(i){this.uniforms.dashSize.value=i}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(i){this.uniforms.dashOffset.value=i}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(i){this.uniforms.gapSize.value=i}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(i){this.uniforms.opacity.value=i}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(i){this.uniforms.resolution.value.copy(i)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(i){!!i!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),i===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(t)}}const ge=new J,ke=new D,Ve=new D,U=new J,B=new J,F=new J,xe=new D,ye=new et,R=new gt,We=new D,he=new ze,de=new Qe,G=new J;let V,Y;function je(e,t,i){return G.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),G.multiplyScalar(1/G.w),G.x=Y/i.width,G.y=Y/i.height,G.applyMatrix4(e.projectionMatrixInverse),G.multiplyScalar(1/G.w),Math.abs(Math.max(G.x,G.y))}function Ht(e,t){const i=e.matrixWorld,s=e.geometry,r=s.attributes.instanceStart,n=s.attributes.instanceEnd,a=Math.min(s.instanceCount,r.count);for(let o=0,l=a;o<l;o++){R.start.fromBufferAttribute(r,o),R.end.fromBufferAttribute(n,o),R.applyMatrix4(i);const h=new D,c=new D;V.distanceSqToSegment(R.start,R.end,c,h),c.distanceTo(h)<Y*.5&&t.push({point:c,pointOnLine:h,distance:V.origin.distanceTo(c),object:e,face:null,faceIndex:o,uv:null,[at]:null})}}function Ft(e,t,i){const s=t.projectionMatrix,n=e.material.resolution,a=e.matrixWorld,o=e.geometry,l=o.attributes.instanceStart,h=o.attributes.instanceEnd,c=Math.min(o.instanceCount,l.count),u=-t.near;V.at(1,F),F.w=1,F.applyMatrix4(t.matrixWorldInverse),F.applyMatrix4(s),F.multiplyScalar(1/F.w),F.x*=n.x/2,F.y*=n.y/2,F.z=0,xe.copy(F),ye.multiplyMatrices(t.matrixWorldInverse,a);for(let f=0,p=c;f<p;f++){if(U.fromBufferAttribute(l,f),B.fromBufferAttribute(h,f),U.w=1,B.w=1,U.applyMatrix4(ye),B.applyMatrix4(ye),U.z>u&&B.z>u)continue;if(U.z>u){const v=U.z-B.z,w=(U.z-u)/v;U.lerp(B,w)}else if(B.z>u){const v=B.z-U.z,w=(B.z-u)/v;B.lerp(U,w)}U.applyMatrix4(s),B.applyMatrix4(s),U.multiplyScalar(1/U.w),B.multiplyScalar(1/B.w),U.x*=n.x/2,U.y*=n.y/2,B.x*=n.x/2,B.y*=n.y/2,R.start.copy(U),R.start.z=0,R.end.copy(B),R.end.z=0;const T=R.closestPointToPointParameter(xe,!0);R.at(T,We);const g=Je.lerp(U.z,B.z,T),_=g>=-1&&g<=1,S=xe.distanceTo(We)<Y*.5;if(_&&S){R.start.fromBufferAttribute(l,f),R.end.fromBufferAttribute(h,f),R.start.applyMatrix4(a),R.end.applyMatrix4(a);const v=new D,w=new D;V.distanceSqToSegment(R.start,R.end,w,v),i.push({point:w,pointOnLine:v,distance:V.origin.distanceTo(w),object:e,face:null,faceIndex:f,uv:null,[at]:null})}}}class lt extends Ye{constructor(t=new Pe,i=new Le({color:Math.random()*16777215})){super(t,i),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,i=t.attributes.instanceStart,s=t.attributes.instanceEnd,r=new Float32Array(2*i.count);for(let a=0,o=0,l=i.count;a<l;a++,o+=2)ke.fromBufferAttribute(i,a),Ve.fromBufferAttribute(s,a),r[o]=o===0?0:r[o-1],r[o+1]=r[o]+ke.distanceTo(Ve);const n=new Ae(r,2,1);return t.setAttribute("instanceDistanceStart",new ie(n,1,0)),t.setAttribute("instanceDistanceEnd",new ie(n,1,1)),this}raycast(t,i){const s=this.material.worldUnits,r=t.camera;r===null&&!s&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const n=t.params.Line2!==void 0&&t.params.Line2.threshold||0;V=t.ray;const a=this.matrixWorld,o=this.geometry,l=this.material;Y=l.linewidth+n,o.boundingSphere===null&&o.computeBoundingSphere(),de.copy(o.boundingSphere).applyMatrix4(a);let h;if(s)h=Y*.5;else{const u=Math.max(r.near,de.distanceToPoint(V.origin));h=je(r,u,l.resolution)}if(de.radius+=h,V.intersectsSphere(de)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),he.copy(o.boundingBox).applyMatrix4(a);let c;if(s)c=Y*.5;else{const u=Math.max(r.near,he.distanceToPoint(V.origin));c=je(r,u,l.resolution)}he.expandByScalar(c),V.intersectsBox(he)!==!1&&(s?Ht(this,i):Ft(this,r,i))}onBeforeRender(t){const i=this.material.uniforms;i&&i.resolution&&(t.getViewport(ge),this.material.uniforms.resolution.value.set(ge.z,ge.w))}}class Gt extends lt{constructor(t=new ot,i=new Le({color:Math.random()*16777215})){super(t,i),this.isLine2=!0,this.type="Line2"}}const Se=d.forwardRef(function({points:t,color:i="black",vertexColors:s,linewidth:r,lineWidth:n,segments:a,dashed:o,...l},h){const c=oe(E=>E.size),u=d.useMemo(()=>a?new lt:new Gt,[a]),[f]=d.useState(()=>new Le),p=d.useMemo(()=>{const E=a?new Pe:new ot,T=t.map(g=>{const _=Array.isArray(g);return g instanceof D?[g.x,g.y,g.z]:g instanceof A?[g.x,g.y,0]:_&&g.length===3?[g[0],g[1],g[2]]:_&&g.length===2?[g[0],g[1],0]:g});if(E.setPositions(T.flat()),s){const g=s.map(_=>_ instanceof X?_.toArray():_);E.setColors(g.flat())}return E},[t,a,s]);return d.useLayoutEffect(()=>{u.computeLineDistances()},[t,u]),d.useLayoutEffect(()=>{o?f.defines.USE_DASH="":delete f.defines.USE_DASH,f.needsUpdate=!0},[o,f]),d.useEffect(()=>()=>p.dispose(),[p]),d.createElement("primitive",Me({object:u,ref:h},l),d.createElement("primitive",{object:p,attach:"geometry"}),d.createElement("primitive",Me({object:f,attach:"material",color:i,vertexColors:!!s,resolution:[c.width,c.height],linewidth:r??n,dashed:o},l)))});var kt=Object.defineProperty,Vt=(e,t,i)=>t in e?kt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,y=(e,t,i)=>(Vt(e,typeof t!="symbol"?t+"":t,i),i);function be(e,t,i,s,r){let n;if(e=e.subarray||e.slice?e:e.buffer,i=i.subarray||i.slice?i:i.buffer,e=t?e.subarray?e.subarray(t,r&&t+r):e.slice(t,r&&t+r):e,i.set)i.set(e,s);else for(n=0;n<e.length;n++)i[n+s]=e[n];return i}function Wt(e){return e instanceof Float32Array?e:e instanceof Ce?e.getAttribute("position").array:e.map(t=>{const i=Array.isArray(t);return t instanceof D?[t.x,t.y,t.z]:t instanceof A?[t.x,t.y,0]:i&&t.length===3?[t[0],t[1],t[2]]:i&&t.length===2?[t[0],t[1],0]:t}).flat()}class jt extends Ce{constructor(){super(),y(this,"type","MeshLine"),y(this,"isMeshLine",!0),y(this,"positions",[]),y(this,"previous",[]),y(this,"next",[]),y(this,"side",[]),y(this,"width",[]),y(this,"indices_array",[]),y(this,"uvs",[]),y(this,"counters",[]),y(this,"widthCallback",null),y(this,"_attributes"),y(this,"_points",[]),y(this,"points"),y(this,"matrixWorld",new et),Object.defineProperties(this,{points:{enumerable:!0,get(){return this._points},set(t){this.setPoints(t,this.widthCallback)}}})}setMatrixWorld(t){this.matrixWorld=t}setPoints(t,i){if(t=Wt(t),this._points=t,this.widthCallback=i??null,this.positions=[],this.counters=[],t.length&&t[0]instanceof D)for(let s=0;s<t.length;s++){const r=t[s],n=s/(t.length-1);this.positions.push(r.x,r.y,r.z),this.positions.push(r.x,r.y,r.z),this.counters.push(n),this.counters.push(n)}else for(let s=0;s<t.length;s+=3){const r=s/(t.length-1);this.positions.push(t[s],t[s+1],t[s+2]),this.positions.push(t[s],t[s+1],t[s+2]),this.counters.push(r),this.counters.push(r)}this.process()}compareV3(t,i){const s=t*6,r=i*6;return this.positions[s]===this.positions[r]&&this.positions[s+1]===this.positions[r+1]&&this.positions[s+2]===this.positions[r+2]}copyV3(t){const i=t*6;return[this.positions[i],this.positions[i+1],this.positions[i+2]]}process(){const t=this.positions.length/6;this.previous=[],this.next=[],this.side=[],this.width=[],this.indices_array=[],this.uvs=[];let i,s;this.compareV3(0,t-1)?s=this.copyV3(t-2):s=this.copyV3(0),this.previous.push(s[0],s[1],s[2]),this.previous.push(s[0],s[1],s[2]);for(let r=0;r<t;r++){if(this.side.push(1),this.side.push(-1),this.widthCallback?i=this.widthCallback(r/(t-1)):i=1,this.width.push(i),this.width.push(i),this.uvs.push(r/(t-1),0),this.uvs.push(r/(t-1),1),r<t-1){s=this.copyV3(r),this.previous.push(s[0],s[1],s[2]),this.previous.push(s[0],s[1],s[2]);const n=r*2;this.indices_array.push(n,n+1,n+2),this.indices_array.push(n+2,n+1,n+3)}r>0&&(s=this.copyV3(r),this.next.push(s[0],s[1],s[2]),this.next.push(s[0],s[1],s[2]))}this.compareV3(t-1,0)?s=this.copyV3(1):s=this.copyV3(t-1),this.next.push(s[0],s[1],s[2]),this.next.push(s[0],s[1],s[2]),!this._attributes||this._attributes.position.count!==this.counters.length?this._attributes={position:new k(new Float32Array(this.positions),3),previous:new k(new Float32Array(this.previous),3),next:new k(new Float32Array(this.next),3),side:new k(new Float32Array(this.side),1),width:new k(new Float32Array(this.width),1),uv:new k(new Float32Array(this.uvs),2),index:new k(new Uint16Array(this.indices_array),1),counters:new k(new Float32Array(this.counters),1)}:(this._attributes.position.copyArray(new Float32Array(this.positions)),this._attributes.position.needsUpdate=!0,this._attributes.previous.copyArray(new Float32Array(this.previous)),this._attributes.previous.needsUpdate=!0,this._attributes.next.copyArray(new Float32Array(this.next)),this._attributes.next.needsUpdate=!0,this._attributes.side.copyArray(new Float32Array(this.side)),this._attributes.side.needsUpdate=!0,this._attributes.width.copyArray(new Float32Array(this.width)),this._attributes.width.needsUpdate=!0,this._attributes.uv.copyArray(new Float32Array(this.uvs)),this._attributes.uv.needsUpdate=!0,this._attributes.index.copyArray(new Uint16Array(this.indices_array)),this._attributes.index.needsUpdate=!0),this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setAttribute("position",this._attributes.position),this.setAttribute("previous",this._attributes.previous),this.setAttribute("next",this._attributes.next),this.setAttribute("side",this._attributes.side),this.setAttribute("width",this._attributes.width),this.setAttribute("uv",this._attributes.uv),this.setAttribute("counters",this._attributes.counters),this.setIndex(this._attributes.index),this.computeBoundingSphere(),this.computeBoundingBox()}advance({x:t,y:i,z:s}){const r=this._attributes.position.array,n=this._attributes.previous.array,a=this._attributes.next.array,o=r.length;be(r,0,n,0,o),be(r,6,r,0,o-6),r[o-6]=t,r[o-5]=i,r[o-4]=s,r[o-3]=t,r[o-2]=i,r[o-1]=s,be(r,6,a,0,o-6),a[o-6]=t,a[o-5]=i,a[o-4]=s,a[o-3]=t,a[o-2]=i,a[o-1]=s,this._attributes.position.needsUpdate=!0,this._attributes.previous.needsUpdate=!0,this._attributes.next.needsUpdate=!0}}const $t=`
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
`,Kt=(()=>parseInt(ve.replace(/\D+/g,"")))(),Xt=Kt>=154?"colorspace_fragment":"encodings_fragment",qt=`
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
`;class Zt extends H{constructor(t){super({uniforms:{...Ue.fog,lineWidth:{value:1},map:{value:null},useMap:{value:0},alphaMap:{value:null},useAlphaMap:{value:0},color:{value:new X(16777215)},gradient:{value:[new X(16711680),new X(65280)]},opacity:{value:1},resolution:{value:new A(1,1)},sizeAttenuation:{value:1},dashArray:{value:0},dashOffset:{value:0},dashRatio:{value:.5},useDash:{value:0},useGradient:{value:0},visibility:{value:1},alphaTest:{value:0},repeat:{value:new A(1,1)}},vertexShader:$t,fragmentShader:qt}),y(this,"lineWidth"),y(this,"map"),y(this,"useMap"),y(this,"alphaMap"),y(this,"useAlphaMap"),y(this,"color"),y(this,"gradient"),y(this,"resolution"),y(this,"sizeAttenuation"),y(this,"dashArray"),y(this,"dashOffset"),y(this,"dashRatio"),y(this,"useDash"),y(this,"useGradient"),y(this,"visibility"),y(this,"repeat"),this.type="MeshLineMaterial",Object.defineProperties(this,{lineWidth:{enumerable:!0,get(){return this.uniforms.lineWidth.value},set(i){this.uniforms.lineWidth.value=i}},map:{enumerable:!0,get(){return this.uniforms.map.value},set(i){this.uniforms.map.value=i}},useMap:{enumerable:!0,get(){return this.uniforms.useMap.value},set(i){this.uniforms.useMap.value=i}},alphaMap:{enumerable:!0,get(){return this.uniforms.alphaMap.value},set(i){this.uniforms.alphaMap.value=i}},useAlphaMap:{enumerable:!0,get(){return this.uniforms.useAlphaMap.value},set(i){this.uniforms.useAlphaMap.value=i}},color:{enumerable:!0,get(){return this.uniforms.color.value},set(i){this.uniforms.color.value=i}},gradient:{enumerable:!0,get(){return this.uniforms.gradient.value},set(i){this.uniforms.gradient.value=i}},opacity:{enumerable:!0,get(){return this.uniforms.opacity.value},set(i){this.uniforms.opacity.value=i}},resolution:{enumerable:!0,get(){return this.uniforms.resolution.value},set(i){this.uniforms.resolution.value.copy(i)}},sizeAttenuation:{enumerable:!0,get(){return this.uniforms.sizeAttenuation.value},set(i){this.uniforms.sizeAttenuation.value=i}},dashArray:{enumerable:!0,get(){return this.uniforms.dashArray.value},set(i){this.uniforms.dashArray.value=i,this.useDash=i!==0?1:0}},dashOffset:{enumerable:!0,get(){return this.uniforms.dashOffset.value},set(i){this.uniforms.dashOffset.value=i}},dashRatio:{enumerable:!0,get(){return this.uniforms.dashRatio.value},set(i){this.uniforms.dashRatio.value=i}},useDash:{enumerable:!0,get(){return this.uniforms.useDash.value},set(i){this.uniforms.useDash.value=i}},useGradient:{enumerable:!0,get(){return this.uniforms.useGradient.value},set(i){this.uniforms.useGradient.value=i}},visibility:{enumerable:!0,get(){return this.uniforms.visibility.value},set(i){this.uniforms.visibility.value=i}},alphaTest:{enumerable:!0,get(){return this.uniforms.alphaTest.value},set(i){this.uniforms.alphaTest.value=i}},repeat:{enumerable:!0,get(){return this.uniforms.repeat.value},set(i){this.uniforms.repeat.value.copy(i)}}}),this.setValues(t)}copy(t){return super.copy(t),this.lineWidth=t.lineWidth,this.map=t.map,this.useMap=t.useMap,this.alphaMap=t.alphaMap,this.useAlphaMap=t.useAlphaMap,this.color.copy(t.color),this.gradient=t.gradient,this.opacity=t.opacity,this.resolution.copy(t.resolution),this.sizeAttenuation=t.sizeAttenuation,this.dashArray=t.dashArray,this.dashOffset=t.dashOffset,this.dashRatio=t.dashRatio,this.useDash=t.useDash,this.useGradient=t.useGradient,this.visibility=t.visibility,this.alphaTest=t.alphaTest,this.repeat.copy(t.repeat),this}}const ut={width:.2,length:1,decay:1,local:!1,stride:0,interval:1},Qt=(e,t=1)=>(e.set(e.subarray(t)),e.fill(-1/0,-t),e);function Yt(e,t){const{length:i,local:s,decay:r,interval:n,stride:a}={...ut,...t},o=d.useRef(),[l]=d.useState(()=>new D);d.useLayoutEffect(()=>{e&&(o.current=Float32Array.from({length:i*10*3},(u,f)=>e.position.getComponent(f%3)))},[i,e]);const h=d.useRef(new D),c=d.useRef(0);return se(()=>{if(e&&o.current){if(c.current===0){let u;s?u=e.position:(e.getWorldPosition(l),u=l);const f=1*r;for(let p=0;p<f;p++)u.distanceTo(h.current)<a||(Qt(o.current,3),o.current.set(u.toArray(),o.current.length-3));h.current.copy(u)}c.current++,c.current=c.current%n}}),o}const Jt=d.forwardRef((e,t)=>{const{children:i}=e,{width:s,length:r,decay:n,local:a,stride:o,interval:l}={...ut,...e},{color:h="hotpink",attenuation:c,target:u}=e,f=oe(w=>w.size),p=oe(w=>w.scene),E=d.useRef(null),[T,g]=d.useState(null),_=Yt(T,{length:r,decay:n,local:a,stride:o,interval:l});d.useEffect(()=>{const w=(u==null?void 0:u.current)||E.current.children.find(L=>L instanceof xt);w&&g(w)},[_,u]);const S=d.useMemo(()=>new jt,[]),v=d.useMemo(()=>{var w;const L=new Zt({lineWidth:.1*s,color:h,sizeAttenuation:1,resolution:new A(f.width,f.height)});let q;if(i)if(Array.isArray(i))q=i.find(Z=>{const I=Z;return typeof I.type=="string"&&I.type==="meshLineMaterial"});else{const Z=i;typeof Z.type=="string"&&Z.type==="meshLineMaterial"&&(q=Z)}return typeof((w=q)==null?void 0:w.props)=="object"&&L.setValues(q.props),L},[s,h,f,i]);return d.useEffect(()=>{v.uniforms.resolution.value.set(f.width,f.height)},[f]),se(()=>{_.current&&S.setPoints(_.current,c)}),d.createElement("group",null,yt(d.createElement("mesh",{ref:t,geometry:S,material:v}),p),d.createElement("group",{ref:E},i))});function ei(e,t){const i=e+"Geometry";return d.forwardRef(({args:s,children:r,...n},a)=>{const o=d.useRef(null);return d.useImperativeHandle(a,()=>o.current),d.useLayoutEffect(()=>void(t==null?void 0:t(o.current))),d.createElement("mesh",Me({ref:o},n),d.createElement(i,{attach:"geometry",args:s}),r)})}const ti=ei("sphere"),ii=d.forwardRef(({children:e,enabled:t=!0,speed:i=1,rotationIntensity:s=1,floatIntensity:r=1,floatingRange:n=[-.1,.1],...a},o)=>{const l=d.useRef(null),h=d.useRef(Math.random()*1e4);return se(c=>{var u,f;if(!t||i===0)return;const p=h.current+c.clock.getElapsedTime();l.current.rotation.x=Math.cos(p/4*i)/8*s,l.current.rotation.y=Math.sin(p/4*i)/8*s,l.current.rotation.z=Math.sin(p/4*i)/20*s;let E=Math.sin(p/4*i)/10;E=Je.mapLinear(E,-.1,.1,(u=n==null?void 0:n[0])!==null&&u!==void 0?u:-.1,(f=n==null?void 0:n[1])!==null&&f!==void 0?f:.1),l.current.position.y=E*r,l.current.updateMatrix()}),d.createElement("group",a,d.createElement("group",{ref:St([l,o]),matrixAutoUpdate:!1},e))});class si extends H{constructor(){super({uniforms:{time:{value:0},fade:{value:1}},vertexShader:`
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
	      #include <${wt>=154?"colorspace_fragment":"encodings_fragment"}>
      }`})}}const ri=e=>new D().setFromSpherical(new Et(e,Math.acos(1-Math.random()*2),Math.random()*2*Math.PI)),ni=d.forwardRef(({radius:e=100,depth:t=50,count:i=5e3,saturation:s=0,factor:r=4,fade:n=!1,speed:a=1},o)=>{const l=d.useRef(),[h,c,u]=d.useMemo(()=>{const p=[],E=[],T=Array.from({length:i},()=>(.5+.5*Math.random())*r),g=new X;let _=e+t;const S=t/i;for(let v=0;v<i;v++)_-=S*Math.random(),p.push(...ri(_).toArray()),g.setHSL(v/i,s,.9),E.push(g.r,g.g,g.b);return[new Float32Array(p),new Float32Array(E),new Float32Array(T)]},[i,t,r,e,s]);se(p=>l.current&&(l.current.uniforms.time.value=p.clock.getElapsedTime()*a));const[f]=d.useState(()=>new si);return d.createElement("points",{ref:o},d.createElement("bufferGeometry",null,d.createElement("bufferAttribute",{attach:"attributes-position",args:[h,3]}),d.createElement("bufferAttribute",{attach:"attributes-color",args:[c,3]}),d.createElement("bufferAttribute",{attach:"attributes-size",args:[u,1]})),d.createElement("primitive",{ref:l,object:f,attach:"material",blending:bt,"uniforms-fade-value":n,depthWrite:!1,transparent:!0,vertexColors:!0}))});/**
 * postprocessing v6.37.5 build Thu Jul 03 2025
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2025 Raoul van Rüschen
 * @license Zlib
 */var we=1/1e3,ai=1e3,oi=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(e){typeof document<"u"&&document.hidden!==void 0&&(e?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=e)}get delta(){return this._delta*we}get fixedDelta(){return this._fixedDelta*we}set fixedDelta(e){this._fixedDelta=e*ai}get elapsed(){return this._elapsed*we}update(e){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(e!==void 0?e:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(e){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},li=(()=>{const e=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),t=new Float32Array([0,0,2,0,0,2]),i=new Ce;return i.setAttribute("position",new k(e,3)),i.setAttribute("uv",new k(t,2)),i})(),P=class Be{static get fullscreenGeometry(){return li}constructor(t="Pass",i=new Fe,s=new Rt){this.name=t,this.renderer=null,this.scene=i,this.camera=s,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(t){if(this.rtt===t){const i=this.fullscreenMaterial;i!==null&&(i.needsUpdate=!0),this.rtt=!t}}set mainScene(t){}set mainCamera(t){}setRenderer(t){this.renderer=t}isEnabled(){return this.enabled}setEnabled(t){this.enabled=t}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(t){let i=this.screen;i!==null?i.material=t:(i=new Ye(Be.fullscreenGeometry,t),i.frustumCulled=!1,this.scene===null&&(this.scene=new Fe),this.scene.add(i),this.screen=i)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(t){this.fullscreenMaterial=t}getDepthTexture(){return null}setDepthTexture(t,i=re){}render(t,i,s,r,n){throw new Error("Render method not implemented!")}setSize(t,i){}initialize(t,i,s){}dispose(){for(const t of Object.keys(this)){const i=this[t];(i instanceof W||i instanceof st||i instanceof rt||i instanceof Be)&&this[t].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},ui=class extends P{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(e,t,i,s,r){const n=e.state.buffers.stencil;n.setLocked(!1),n.setTest(!1)}},ci=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <colorspace_fragment>
#include <dithering_fragment>
}`,ct="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",ht=class extends H{constructor(){super({name:"CopyMaterial",uniforms:{inputBuffer:new b(null),opacity:new b(1)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ci,vertexShader:ct})}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}getOpacity(e){return this.uniforms.opacity.value}setOpacity(e){this.uniforms.opacity.value=e}},hi=class extends P{constructor(e,t=!0){super("CopyPass"),this.fullscreenMaterial=new ht,this.needsSwap=!1,this.renderTarget=e,e===void 0&&(this.renderTarget=new W(1,1,{minFilter:pe,magFilter:pe,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=t}get resize(){return this.autoResize}set resize(e){this.autoResize=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(e){this.autoResize=e}render(e,t,i,s,r){this.fullscreenMaterial.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){this.autoResize&&this.renderTarget.setSize(e,t)}initialize(e,t,i){i!==void 0&&(this.renderTarget.texture.type=i,i!==ee?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":e!==null&&e.outputColorSpace===z&&(this.renderTarget.texture.colorSpace=z))}},$e=new X,dt=class extends P{constructor(e=!0,t=!0,i=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=e,this.depth=t,this.stencil=i,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(e,t,i){this.color=e,this.depth=t,this.stencil=i}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(e){this.overrideClearColor=e}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(e){this.overrideClearAlpha=e}render(e,t,i,s,r){const n=this.overrideClearColor,a=this.overrideClearAlpha,o=e.getClearAlpha(),l=n!==null,h=a>=0;l?(e.getClearColor($e),e.setClearColor(n,h?a:o)):h&&e.setClearAlpha(a),e.setRenderTarget(this.renderToScreen?null:t),e.clear(this.color,this.depth,this.stencil),l?e.setClearColor($e,o):h&&e.setClearAlpha(o)}},di=class extends P{constructor(e,t){super("MaskPass",e,t),this.needsSwap=!1,this.clearPass=new dt(!1,!1,!0),this.inverse=!1}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get inverted(){return this.inverse}set inverted(e){this.inverse=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(e){this.inverted=e}render(e,t,i,s,r){const n=e.getContext(),a=e.state.buffers,o=this.scene,l=this.camera,h=this.clearPass,c=this.inverted?0:1,u=1-c;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),a.stencil.setFunc(n.ALWAYS,c,4294967295),a.stencil.setClear(u),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?h.render(e,null):(h.render(e,t),h.render(e,i))),this.renderToScreen?(e.setRenderTarget(null),e.render(o,l)):(e.setRenderTarget(t),e.render(o,l),e.setRenderTarget(i),e.render(o,l)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(n.EQUAL,1,4294967295),a.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),a.stencil.setLocked(!0)}},fi=class{constructor(t=null,{depthBuffer:i=!0,stencilBuffer:s=!1,multisampling:r=0,frameBufferType:n}={}){this.renderer=null,this.inputBuffer=this.createBuffer(i,s,n,r),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new hi,this.depthTexture=null,this.passes=[],this.timer=new oi,this.autoRenderToScreen=!0,this.setRenderer(t)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(t){const i=this.inputBuffer,s=this.multisampling;s>0&&t>0?(this.inputBuffer.samples=t,this.outputBuffer.samples=t,this.inputBuffer.dispose(),this.outputBuffer.dispose()):s!==t&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(i.depthBuffer,i.stencilBuffer,i.texture.type,t),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(t){if(this.renderer=t,t!==null){const i=t.getSize(new A),s=t.getContext().getContextAttributes().alpha,r=this.inputBuffer.texture.type;r===ee&&t.outputColorSpace===z&&(this.inputBuffer.texture.colorSpace=z,this.outputBuffer.texture.colorSpace=z,this.inputBuffer.dispose(),this.outputBuffer.dispose()),t.autoClear=!1,this.setSize(i.width,i.height);for(const n of this.passes)n.initialize(t,s,r)}}replaceRenderer(t,i=!0){const s=this.renderer,r=s.domElement.parentNode;return this.setRenderer(t),i&&r!==null&&(r.removeChild(s.domElement),r.appendChild(t.domElement)),s}createDepthTexture(){const t=this.depthTexture=new _t;return this.inputBuffer.depthTexture=t,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(t.format=Mt,t.type=Tt):t.type=At,t}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(const t of this.passes)t.setDepthTexture(null)}}createBuffer(t,i,s,r){const n=this.renderer,a=n===null?new A:n.getDrawingBufferSize(new A),o={minFilter:pe,magFilter:pe,stencilBuffer:i,depthBuffer:t,type:s},l=new W(a.width,a.height,o);return r>0&&(l.ignoreDepthForMultisampleCopy=!1,l.samples=r),s===ee&&n!==null&&n.outputColorSpace===z&&(l.texture.colorSpace=z),l.texture.name="EffectComposer.Buffer",l.texture.generateMipmaps=!1,l}setMainScene(t){for(const i of this.passes)i.mainScene=t}setMainCamera(t){for(const i of this.passes)i.mainCamera=t}addPass(t,i){const s=this.passes,r=this.renderer,n=r.getDrawingBufferSize(new A),a=r.getContext().getContextAttributes().alpha,o=this.inputBuffer.texture.type;if(t.setRenderer(r),t.setSize(n.width,n.height),t.initialize(r,a,o),this.autoRenderToScreen&&(s.length>0&&(s[s.length-1].renderToScreen=!1),t.renderToScreen&&(this.autoRenderToScreen=!1)),i!==void 0?s.splice(i,0,t):s.push(t),this.autoRenderToScreen&&(s[s.length-1].renderToScreen=!0),t.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){const l=this.createDepthTexture();for(t of s)t.setDepthTexture(l)}else t.setDepthTexture(this.depthTexture)}removePass(t){const i=this.passes,s=i.indexOf(t);if(s!==-1&&i.splice(s,1).length>0){if(this.depthTexture!==null){const a=(l,h)=>l||h.needsDepthTexture;i.reduce(a,!1)||(t.getDepthTexture()===this.depthTexture&&t.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&s===i.length&&(t.renderToScreen=!1,i.length>0&&(i[i.length-1].renderToScreen=!0))}}removeAllPasses(){const t=this.passes;this.deleteDepthTexture(),t.length>0&&(this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!1),this.passes=[])}render(t){const i=this.renderer,s=this.copyPass;let r=this.inputBuffer,n=this.outputBuffer,a=!1,o,l,h;t===void 0&&(this.timer.update(),t=this.timer.getDelta());for(const c of this.passes)c.enabled&&(c.render(i,r,n,t,a),c.needsSwap&&(a&&(s.renderToScreen=c.renderToScreen,o=i.getContext(),l=i.state.buffers.stencil,l.setFunc(o.NOTEQUAL,1,4294967295),s.render(i,r,n,t,a),l.setFunc(o.EQUAL,1,4294967295)),h=r,r=n,n=h),c instanceof di?a=!0:c instanceof ui&&(a=!1))}setSize(t,i,s){const r=this.renderer,n=r.getSize(new A);(t===void 0||i===void 0)&&(t=n.width,i=n.height),(n.width!==t||n.height!==i)&&r.setSize(t,i,s);const a=r.getDrawingBufferSize(new A);this.inputBuffer.setSize(a.width,a.height),this.outputBuffer.setSize(a.width,a.height);for(const o of this.passes)o.setSize(a.width,a.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(const t of this.passes)t.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose(),P.fullscreenGeometry.dispose()}},$={NONE:0,DEPTH:1,CONVOLUTION:2},x={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},pi=class{constructor(){this.shaderParts=new Map([[x.FRAGMENT_HEAD,null],[x.FRAGMENT_MAIN_UV,null],[x.FRAGMENT_MAIN_IMAGE,null],[x.VERTEX_HEAD,null],[x.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=$.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=tt}},Ee=!1,Ke=class{constructor(e=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(e),this.meshCount=0,this.replaceMaterial=t=>{if(t.isMesh){let i;if(t.material.flatShading)switch(t.material.side){case ue:i=this.materialsFlatShadedDoubleSide;break;case le:i=this.materialsFlatShadedBackSide;break;default:i=this.materialsFlatShaded;break}else switch(t.material.side){case ue:i=this.materialsDoubleSide;break;case le:i=this.materialsBackSide;break;default:i=this.materials;break}this.originalMaterials.set(t,t.material),t.isSkinnedMesh?t.material=i[2]:t.isInstancedMesh?t.material=i[1]:t.material=i[0],++this.meshCount}}}cloneMaterial(e){if(!(e instanceof H))return e.clone();const t=e.uniforms,i=new Map;for(const r in t){const n=t[r].value;n.isRenderTargetTexture&&(t[r].value=null,i.set(r,n))}const s=e.clone();for(const r of i)t[r[0]].value=r[1],s.uniforms[r[0]].value=r[1];return s}setMaterial(e){if(this.disposeMaterials(),this.material=e,e!==null){const t=this.materials=[this.cloneMaterial(e),this.cloneMaterial(e),this.cloneMaterial(e)];for(const i of t)i.uniforms=Object.assign({},e.uniforms),i.side=zt;t[2].skinning=!0,this.materialsBackSide=t.map(i=>{const s=this.cloneMaterial(i);return s.uniforms=Object.assign({},e.uniforms),s.side=le,s}),this.materialsDoubleSide=t.map(i=>{const s=this.cloneMaterial(i);return s.uniforms=Object.assign({},e.uniforms),s.side=ue,s}),this.materialsFlatShaded=t.map(i=>{const s=this.cloneMaterial(i);return s.uniforms=Object.assign({},e.uniforms),s.flatShading=!0,s}),this.materialsFlatShadedBackSide=t.map(i=>{const s=this.cloneMaterial(i);return s.uniforms=Object.assign({},e.uniforms),s.flatShading=!0,s.side=le,s}),this.materialsFlatShadedDoubleSide=t.map(i=>{const s=this.cloneMaterial(i);return s.uniforms=Object.assign({},e.uniforms),s.flatShading=!0,s.side=ue,s})}}render(e,t,i){const s=e.shadowMap.enabled;if(e.shadowMap.enabled=!1,Ee){const r=this.originalMaterials;this.meshCount=0,t.traverse(this.replaceMaterial),e.render(t,i);for(const n of r)n[0].material=n[1];this.meshCount!==r.size&&r.clear()}else{const r=t.overrideMaterial;t.overrideMaterial=this.material,e.render(t,i),t.overrideMaterial=r}e.shadowMap.enabled=s}disposeMaterials(){if(this.material!==null){const e=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(const t of e)t.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return Ee}static set workaroundEnabled(e){Ee=e}},K=-1,C=class extends De{constructor(e,t=K,i=K,s=1){super(),this.resizable=e,this.baseSize=new A(1,1),this.preferredSize=new A(t,i),this.target=this.preferredSize,this.s=s,this.effectiveSize=new A,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){const e=this.baseSize,t=this.preferredSize,i=this.effectiveSize,s=this.scale;t.width!==K?i.width=t.width:t.height!==K?i.width=Math.round(t.height*(e.width/Math.max(e.height,1))):i.width=Math.round(e.width*s),t.height!==K?i.height=t.height:t.width!==K?i.height=Math.round(t.width/Math.max(e.width/Math.max(e.height,1),1)):i.height=Math.round(e.height*s)}get width(){return this.effectiveSize.width}set width(e){this.preferredWidth=e}get height(){return this.effectiveSize.height}set height(e){this.preferredHeight=e}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(e){this.s!==e&&(this.s=e,this.preferredSize.setScalar(K),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getScale(){return this.scale}setScale(e){this.scale=e}get baseWidth(){return this.baseSize.width}set baseWidth(e){this.baseSize.width!==e&&(this.baseSize.width=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseWidth(){return this.baseWidth}setBaseWidth(e){this.baseWidth=e}get baseHeight(){return this.baseSize.height}set baseHeight(e){this.baseSize.height!==e&&(this.baseSize.height=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(e){this.baseHeight=e}setBaseSize(e,t){(this.baseSize.width!==e||this.baseSize.height!==t)&&(this.baseSize.set(e,t),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(e){this.preferredSize.width!==e&&(this.preferredSize.width=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(e){this.preferredWidth=e}get preferredHeight(){return this.preferredSize.height}set preferredHeight(e){this.preferredSize.height!==e&&(this.preferredSize.height=e,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(e){this.preferredHeight=e}setPreferredSize(e,t){(this.preferredSize.width!==e||this.preferredSize.height!==t)&&(this.preferredSize.set(e,t),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}copy(e){this.s=e.scale,this.baseSize.set(e.baseWidth,e.baseHeight),this.preferredSize.set(e.preferredWidth,e.preferredHeight),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height)}static get AUTO_SIZE(){return K}},m={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},vi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb+y.rgb,y.a),opacity);}",mi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,y.a*opacity);}",gi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4((x.rgb+y.rgb)*0.5,y.a),opacity);}",xi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.xy,xHSL.z));return mix(x,vec4(z,y.a),opacity);}",yi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb,b=y.rgb;vec3 z=mix(step(0.0,b)*(1.0-min(vec3(1.0),(1.0-a)/b)),vec3(1.0),step(1.0,a));return mix(x,vec4(z,y.a),opacity);}",Si="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb,b=y.rgb;vec3 z=step(0.0,a)*mix(min(vec3(1.0),a/max(1.0-b,1e-9)),vec3(1.0),step(1.0,b));return mix(x,vec4(z,y.a),opacity);}",bi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(min(x.rgb,y.rgb),y.a),opacity);}",wi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(abs(x.rgb-y.rgb),y.a),opacity);}",Ei="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb/max(y.rgb,1e-12),y.a),opacity);}",_i="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4((x.rgb+y.rgb-2.0*x.rgb*y.rgb),y.a),opacity);}",Mi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=min(x.rgb,1.0);vec3 b=min(y.rgb,1.0);vec3 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,b));return mix(x,vec4(z,y.a),opacity);}",Ti="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(step(1.0,x.rgb+y.rgb),y.a),opacity);}",Ai="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.x,xHSL.yz));return mix(x,vec4(z,y.a),opacity);}",Ui="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(1.0-y.rgb,y.a),opacity);}",Bi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(y.rgb*(1.0-x.rgb),y.a),opacity);}",Ri="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(max(x.rgb,y.rgb),y.a),opacity);}",zi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(clamp(y.rgb+x.rgb-1.0,0.0,1.0),y.a),opacity);}",Ci="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(min(x.rgb+y.rgb,1.0),y.a),opacity);}",Di="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(clamp(2.0*y.rgb+x.rgb-1.0,0.0,1.0),y.a),opacity);}",Pi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.xy,yHSL.z));return mix(x,vec4(z,y.a),opacity);}",Li="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb*y.rgb,y.a),opacity);}",Ii="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(1.0-abs(1.0-x.rgb-y.rgb),y.a),opacity);}",Oi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}",Ni="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(2.0*y.rgb*x.rgb,1.0-2.0*(1.0-y.rgb)*(1.0-x.rgb),step(0.5,x.rgb));return mix(x,vec4(z,y.a),opacity);}",Hi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 y2=2.0*y.rgb;vec3 z=mix(mix(y2,x.rgb,step(0.5*x.rgb,y.rgb)),max(y2-1.0,vec3(0.0)),step(x.rgb,y2-1.0));return mix(x,vec4(z,y.a),opacity);}",Fi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(min(x.rgb*x.rgb/max(1.0-y.rgb,1e-12),1.0),y.rgb,step(1.0,y.rgb));return mix(x,vec4(z,y.a),opacity);}",Gi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.x,yHSL.y,xHSL.z));return mix(x,vec4(z,y.a),opacity);}",ki="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(x.rgb+y.rgb-min(x.rgb*y.rgb,1.0),y.a),opacity);}",Vi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 a=x.rgb;vec3 b=y.rgb;vec3 y2=2.0*b;vec3 w=step(0.5,b);vec3 c=a-(1.0-y2)*a*(1.0-a);vec3 d=mix(a+(y2-1.0)*(sqrt(a)-a),a+(y2-1.0)*a*((16.0*a-12.0)*a+3.0),w*(1.0-step(0.25,a)));vec3 z=mix(c,d,w);return mix(x,vec4(z,y.a),opacity);}",Wi="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",ji="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,vec4(max(x.rgb+y.rgb-1.0,0.0),y.a),opacity);}",$i="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 z=mix(max(1.0-min((1.0-x.rgb)/(2.0*y.rgb),1.0),0.0),min(x.rgb/(2.0*(1.0-y.rgb)),1.0),step(0.5,y.rgb));return mix(x,vec4(z,y.a),opacity);}",Ki=new Map([[m.ADD,vi],[m.ALPHA,mi],[m.AVERAGE,gi],[m.COLOR,xi],[m.COLOR_BURN,yi],[m.COLOR_DODGE,Si],[m.DARKEN,bi],[m.DIFFERENCE,wi],[m.DIVIDE,Ei],[m.DST,null],[m.EXCLUSION,_i],[m.HARD_LIGHT,Mi],[m.HARD_MIX,Ti],[m.HUE,Ai],[m.INVERT,Ui],[m.INVERT_RGB,Bi],[m.LIGHTEN,Ri],[m.LINEAR_BURN,zi],[m.LINEAR_DODGE,Ci],[m.LINEAR_LIGHT,Di],[m.LUMINOSITY,Pi],[m.MULTIPLY,Li],[m.NEGATION,Ii],[m.NORMAL,Oi],[m.OVERLAY,Ni],[m.PIN_LIGHT,Hi],[m.REFLECT,Fi],[m.SATURATION,Gi],[m.SCREEN,ki],[m.SOFT_LIGHT,Vi],[m.SRC,Wi],[m.SUBTRACT,ji],[m.VIVID_LIGHT,$i]]),Xi=class extends De{constructor(e,t=1){super(),this._blendFunction=e,this.opacity=new b(t)}getOpacity(){return this.opacity.value}setOpacity(e){this.opacity.value=e}get blendFunction(){return this._blendFunction}set blendFunction(e){this._blendFunction=e,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(e){this.blendFunction=e}getShaderCode(){return Ki.get(this.blendFunction)}},Re=class extends De{constructor(e,t,{attributes:i=$.NONE,blendFunction:s=m.NORMAL,defines:r=new Map,uniforms:n=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=e,this.renderer=null,this.attributes=i,this.fragmentShader=t,this.vertexShader=o,this.defines=r,this.uniforms=n,this.extensions=a,this.blendMode=new Xi(s),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=tt,this._outputColorSpace=it}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(e){this._inputColorSpace=e,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e,this.setChanged()}set mainScene(e){}set mainCamera(e){}getName(){return this.name}setRenderer(e){this.renderer=e}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(e){this.attributes=e,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(e){this.fragmentShader=e,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(e){this.vertexShader=e,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(e,t=re){}update(e,t,i){}setSize(e,t){}initialize(e,t,i){}dispose(){for(const e of Object.keys(this)){const t=this[e];(t instanceof W||t instanceof st||t instanceof rt||t instanceof P)&&this[e].dispose()}}},Ie={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},qi=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,Zi="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",Qi=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],Yi=class extends H{constructor(e=new J){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new b(null),texelSize:new b(new J),scale:new b(1),kernel:new b(0)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:qi,vertexShader:Zi}),this.setTexelSize(e.x,e.y),this.kernelSize=Ie.MEDIUM}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.inputBuffer=e}get kernelSequence(){return Qi[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(e){this.uniforms.scale.value=e}getScale(){return this.uniforms.scale.value}setScale(e){this.uniforms.scale.value=e}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(e){this.uniforms.kernel.value=e}setKernel(e){this.kernel=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t,e*.5,t*.5)}setSize(e,t){const i=1/e,s=1/t;this.uniforms.texelSize.value.set(i,s,i*.5,s*.5)}},Ji=class extends P{constructor({kernelSize:e=Ie.MEDIUM,resolutionScale:t=.5,width:i=C.AUTO_SIZE,height:s=C.AUTO_SIZE,resolutionX:r=i,resolutionY:n=s}={}){super("KawaseBlurPass"),this.renderTargetA=new W(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";const a=this.resolution=new C(this,r,n,t);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new Yi,this._blurMaterial.kernelSize=e,this.copyMaterial=new ht}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(e){this._blurMaterial=e}get dithering(){return this.copyMaterial.dithering}set dithering(e){this.copyMaterial.dithering=e}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(e){this.blurMaterial.kernelSize=e}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get scale(){return this.blurMaterial.scale}set scale(e){this.blurMaterial.scale=e}getScale(){return this.blurMaterial.scale}setScale(e){this.blurMaterial.scale=e}getKernelSize(){return this.kernelSize}setKernelSize(e){this.kernelSize=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,i,s,r){const n=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,h=this.blurMaterial,c=h.kernelSequence;let u=t;this.fullscreenMaterial=h;for(let f=0,p=c.length;f<p;++f){const E=f&1?l:o;h.kernel=c[f],h.inputBuffer=u.texture,e.setRenderTarget(E),e.render(n,a),u=E}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=u.texture,e.setRenderTarget(this.renderToScreen?null:i),e.render(n,a)}setSize(e,t){const i=this.resolution;i.setBaseSize(e,t);const s=i.width,r=i.height;this.renderTargetA.setSize(s,r),this.renderTargetB.setSize(s,r),this.blurMaterial.setSize(e,t)}initialize(e,t,i){i!==void 0&&(this.renderTargetA.texture.type=i,this.renderTargetB.texture.type=i,i!==ee?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):e!==null&&e.outputColorSpace===z&&(this.renderTargetA.texture.colorSpace=z,this.renderTargetB.texture.colorSpace=z))}static get AUTO_SIZE(){return C.AUTO_SIZE}},es=`#include <common>
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
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);l*=low*high;
#elif defined(THRESHOLD)
l=smoothstep(threshold,threshold+smoothing,l)*l;
#endif
#ifdef COLOR
gl_FragColor=vec4(texel.rgb*clamp(l,0.0,1.0),l);
#else
gl_FragColor=vec4(l);
#endif
}`,ts=class extends H{constructor(e=!1,t=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:ve.replace(/\D+/g,"")},uniforms:{inputBuffer:new b(null),threshold:new b(0),smoothing:new b(1),range:new b(null)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:es,vertexShader:ct}),this.colorOutput=e,this.luminanceRange=t}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}get threshold(){return this.uniforms.threshold.value}set threshold(e){this.smoothing>0||e>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=e}getThreshold(){return this.threshold}setThreshold(e){this.threshold=e}get smoothing(){return this.uniforms.smoothing.value}set smoothing(e){this.threshold>0||e>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=e}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(e){this.smoothing=e}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(e){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(e){e?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(e){return this.colorOutput}setColorOutputEnabled(e){this.colorOutput=e}get useRange(){return this.luminanceRange!==null}set useRange(e){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(e){e!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=e,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(e){this.luminanceRange=e}},is=class extends P{constructor({renderTarget:e,luminanceRange:t,colorOutput:i,resolutionScale:s=1,width:r=C.AUTO_SIZE,height:n=C.AUTO_SIZE,resolutionX:a=r,resolutionY:o=n}={}){super("LuminancePass"),this.fullscreenMaterial=new ts(i,t),this.needsSwap=!1,this.renderTarget=e,this.renderTarget===void 0&&(this.renderTarget=new W(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");const l=this.resolution=new C(this,a,o,s);l.addEventListener("change",h=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(e,t,i,s,r){const n=this.fullscreenMaterial;n.inputBuffer=t.texture,e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){const i=this.resolution;i.setBaseSize(e,t),this.renderTarget.setSize(i.width,i.height)}initialize(e,t,i){i!==void 0&&i!==ee&&(this.renderTarget.texture.type=i,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},ss=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.0555555
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,rs="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",ns=class extends H{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new b(null),texelSize:new b(new A)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ss,vertexShader:rs})}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},as=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,os="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",ls=class extends H{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new b(null),supportBuffer:new b(null),texelSize:new b(new A),radius:new b(.85)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:as,vertexShader:os})}set inputBuffer(e){this.uniforms.inputBuffer.value=e}set supportBuffer(e){this.uniforms.supportBuffer.value=e}get radius(){return this.uniforms.radius.value}set radius(e){this.uniforms.radius.value=e}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},us=class extends P{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new W(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new ns,this.upsamplingMaterial=new ls,this.resolution=new A}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(e){if(this.levels!==e){const t=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let i=0;i<e;++i){const s=t.clone();s.texture.name="Downsampling.Mipmap"+i,this.downsamplingMipmaps.push(s)}this.upsamplingMipmaps.push(t);for(let i=1,s=e-1;i<s;++i){const r=t.clone();r.texture.name="Upsampling.Mipmap"+i,this.upsamplingMipmaps.push(r)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(e){this.upsamplingMaterial.radius=e}render(e,t,i,s,r){const{scene:n,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:h,upsamplingMipmaps:c}=this;let u=t;this.fullscreenMaterial=o;for(let f=0,p=h.length;f<p;++f){const E=h[f];o.setSize(u.width,u.height),o.inputBuffer=u.texture,e.setRenderTarget(E),e.render(n,a),u=E}this.fullscreenMaterial=l;for(let f=c.length-1;f>=0;--f){const p=c[f];l.setSize(u.width,u.height),l.inputBuffer=u.texture,l.supportBuffer=h[f].texture,e.setRenderTarget(p),e.render(n,a),u=p}}setSize(e,t){const i=this.resolution;i.set(e,t);let s=i.width,r=i.height;for(let n=0,a=this.downsamplingMipmaps.length;n<a;++n)s=Math.round(s*.5),r=Math.round(r*.5),this.downsamplingMipmaps[n].setSize(s,r),n<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[n].setSize(s,r)}initialize(e,t,i){if(i!==void 0){const s=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(const r of s)r.texture.type=i;if(i!==ee)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(e!==null&&e.outputColorSpace===z)for(const r of s)r.texture.colorSpace=z}}dispose(){super.dispose();for(const e of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))e.dispose()}},cs=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 texel=texture2D(map,uv);outputColor=vec4(texel.rgb*intensity,texel.a);}`,hs=class extends Re{constructor({blendFunction:e=m.SCREEN,luminanceThreshold:t=.9,luminanceSmoothing:i=.025,mipmapBlur:s=!1,intensity:r=1,radius:n=.85,levels:a=8,kernelSize:o=Ie.LARGE,resolutionScale:l=.5,width:h=C.AUTO_SIZE,height:c=C.AUTO_SIZE,resolutionX:u=h,resolutionY:f=c}={}){super("BloomEffect",cs,{blendFunction:e,uniforms:new Map([["map",new b(null)],["intensity",new b(r)]])}),this.renderTarget=new W(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new Ji({kernelSize:o}),this.luminancePass=new is({colorOutput:!0}),this.luminanceMaterial.threshold=t,this.luminanceMaterial.smoothing=i,this.mipmapBlurPass=new us,this.mipmapBlurPass.enabled=s,this.mipmapBlurPass.radius=n,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=s?this.mipmapBlurPass.texture:this.renderTarget.texture;const p=this.resolution=new C(this,u,f,l);p.addEventListener("change",E=>this.setSize(p.baseWidth,p.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(e){this.resolution.preferredWidth=e}get height(){return this.resolution.height}set height(e){this.resolution.preferredHeight=e}get dithering(){return this.blurPass.dithering}set dithering(e){this.blurPass.dithering=e}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(e){this.blurPass.kernelSize=e}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(e){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(e){this.uniforms.get("intensity").value=e}getIntensity(){return this.intensity}setIntensity(e){this.intensity=e}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}update(e,t,i){const s=this.renderTarget,r=this.luminancePass;r.enabled?(r.render(e,t),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(e,r.renderTarget):this.blurPass.render(e,r.renderTarget,s)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(e,t):this.blurPass.render(e,t,s)}setSize(e,t){const i=this.resolution;i.setBaseSize(e,t),this.renderTarget.setSize(i.width,i.height),this.blurPass.resolution.copy(i),this.luminancePass.setSize(e,t),this.mipmapBlurPass.setSize(e,t)}initialize(e,t,i){this.blurPass.initialize(e,t,i),this.luminancePass.initialize(e,t,i),this.mipmapBlurPass.initialize(e,t,i),i!==void 0&&(this.renderTarget.texture.type=i,e!==null&&e.outputColorSpace===z&&(this.renderTarget.texture.colorSpace=z))}},ft=class extends P{constructor(e,t,i=null){super("RenderPass",e,t),this.needsSwap=!1,this.clearPass=new dt,this.overrideMaterialManager=i===null?null:new Ke(i),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(e){this.scene=e}set mainCamera(e){this.camera=e}get renderToScreen(){return super.renderToScreen}set renderToScreen(e){super.renderToScreen=e,this.clearPass.renderToScreen=e}get overrideMaterial(){const e=this.overrideMaterialManager;return e!==null?e.material:null}set overrideMaterial(e){const t=this.overrideMaterialManager;e!==null?t!==null?t.setMaterial(e):this.overrideMaterialManager=new Ke(e):t!==null&&(t.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(e){this.overrideMaterial=e}get clear(){return this.clearPass.enabled}set clear(e){this.clearPass.enabled=e}getSelection(){return this.selection}setSelection(e){this.selection=e}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(e){this.ignoreBackground=e}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(e){this.skipShadowMapUpdate=e}getClearPass(){return this.clearPass}render(e,t,i,s,r){const n=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,h=n.background,c=e.shadowMap.autoUpdate,u=this.renderToScreen?null:t;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(e.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(n.background=null),this.clearPass.enabled&&this.clearPass.render(e,t),e.setRenderTarget(u),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(e,n,a):e.render(n,a),a.layers.mask=l,n.background=h,e.shadowMap.autoUpdate=c}},ds=`#include <packing>
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
gl_FragColor=vec4(n[index],d[index]);}`,fs="uniform vec2 texelSize;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vUv0=uv;vUv1=vec2(uv.x,uv.y+texelSize.y);vUv2=vec2(uv.x+texelSize.x,uv.y);vUv3=uv+texelSize;gl_Position=vec4(position.xy,1.0,1.0);}",ps=class extends H{constructor(){super({name:"DepthDownsamplingMaterial",defines:{DEPTH_PACKING:"0"},uniforms:{depthBuffer:new b(null),normalBuffer:new b(null),texelSize:new b(new A)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ds,vertexShader:fs})}set depthBuffer(e){this.uniforms.depthBuffer.value=e}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=re){this.depthBuffer=e,this.depthPacking=t}set normalBuffer(e){this.uniforms.normalBuffer.value=e,e!==null?this.defines.DOWNSAMPLE_NORMALS="1":delete this.defines.DOWNSAMPLE_NORMALS,this.needsUpdate=!0}setNormalBuffer(e){this.normalBuffer=e}setTexelSize(e,t){this.uniforms.texelSize.value.set(e,t)}setSize(e,t){this.uniforms.texelSize.value.set(1/e,1/t)}},vs=class extends P{constructor({normalBuffer:e=null,resolutionScale:t=.5,width:i=C.AUTO_SIZE,height:s=C.AUTO_SIZE,resolutionX:r=i,resolutionY:n=s}={}){super("DepthDownsamplingPass");const a=new ps;a.normalBuffer=e,this.fullscreenMaterial=a,this.needsDepthTexture=!0,this.needsSwap=!1,this.renderTarget=new W(1,1,{minFilter:fe,magFilter:fe,depthBuffer:!1,type:Ut}),this.renderTarget.texture.name="DepthDownsamplingPass.Target",this.renderTarget.texture.generateMipmaps=!1;const o=this.resolution=new C(this,r,n,t);o.addEventListener("change",l=>this.setSize(o.baseWidth,o.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}setDepthTexture(e,t=re){this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.depthPacking=t}render(e,t,i,s,r){e.setRenderTarget(this.renderToScreen?null:this.renderTarget),e.render(this.scene,this.camera)}setSize(e,t){const i=this.resolution;i.setBaseSize(e,t),this.renderTarget.setSize(i.width,i.height),this.fullscreenMaterial.setSize(e,t)}initialize(e,t,i){const s=e.getContext();if(!(s.getExtension("EXT_color_buffer_float")||s.getExtension("EXT_color_buffer_half_float")))throw new Error("Rendering to float texture is not supported.")}},ms=`#include <common>
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
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}float getViewZ(const in float depth){
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
}`,gs="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",xs=class extends H{constructor(e,t,i,s,r=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:ve.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new b(null),depthBuffer:new b(null),resolution:new b(new A),texelSize:new b(new A),cameraNear:new b(.3),cameraFar:new b(1e3),aspect:new b(1),time:new b(0)},blending:te,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:r}),e&&this.setShaderParts(e),t&&this.setDefines(t),i&&this.setUniforms(i),this.copyCameraSettings(s)}set inputBuffer(e){this.uniforms.inputBuffer.value=e}setInputBuffer(e){this.uniforms.inputBuffer.value=e}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(e){this.uniforms.depthBuffer.value=e}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(e){this.defines.DEPTH_PACKING=e.toFixed(0),this.needsUpdate=!0}setDepthBuffer(e,t=re){this.depthBuffer=e,this.depthPacking=t}setShaderData(e){this.setShaderParts(e.shaderParts),this.setDefines(e.defines),this.setUniforms(e.uniforms),this.setExtensions(e.extensions)}setShaderParts(e){return this.fragmentShader=ms.replace(x.FRAGMENT_HEAD,e.get(x.FRAGMENT_HEAD)||"").replace(x.FRAGMENT_MAIN_UV,e.get(x.FRAGMENT_MAIN_UV)||"").replace(x.FRAGMENT_MAIN_IMAGE,e.get(x.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=gs.replace(x.VERTEX_HEAD,e.get(x.VERTEX_HEAD)||"").replace(x.VERTEX_MAIN_SUPPORT,e.get(x.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(e){for(const t of e.entries())this.defines[t[0]]=t[1];return this.needsUpdate=!0,this}setUniforms(e){for(const t of e.entries())this.uniforms[t[0]]=t[1];return this}setExtensions(e){this.extensions={};for(const t of e)this.extensions[t]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(e){this.encodeOutput!==e&&(e?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(e){return this.encodeOutput}setOutputEncodingEnabled(e){this.encodeOutput=e}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}setDeltaTime(e){this.uniforms.time.value+=e}adoptCameraSettings(e){this.copyCameraSettings(e)}copyCameraSettings(e){e&&(this.uniforms.cameraNear.value=e.near,this.uniforms.cameraFar.value=e.far,e instanceof Ct?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(e,t){const i=this.uniforms;i.resolution.value.set(e,t),i.texelSize.value.set(1/e,1/t),i.aspect.value=e/t}static get Section(){return x}};function Xe(e,t,i){for(const s of t){const r="$1"+e+s.charAt(0).toUpperCase()+s.slice(1),n=new RegExp("([^\\.])(\\b"+s+"\\b)","g");for(const a of i.entries())a[1]!==null&&i.set(a[0],a[1].replace(n,r))}}function ys(e,t,i){let s=t.getFragmentShader(),r=t.getVertexShader();const n=s!==void 0&&/mainImage/.test(s),a=s!==void 0&&/mainUv/.test(s);if(i.attributes|=t.getAttributes(),s===void 0)throw new Error(`Missing fragment shader (${t.name})`);if(a&&i.attributes&$.CONVOLUTION)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${t.name})`);if(!n&&!a)throw new Error(`Could not find mainImage or mainUv function (${t.name})`);{const o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,l=i.shaderParts;let h=l.get(x.FRAGMENT_HEAD)||"",c=l.get(x.FRAGMENT_MAIN_UV)||"",u=l.get(x.FRAGMENT_MAIN_IMAGE)||"",f=l.get(x.VERTEX_HEAD)||"",p=l.get(x.VERTEX_MAIN_SUPPORT)||"";const E=new Set,T=new Set;if(a&&(c+=`	${e}MainUv(UV);
`,i.uvTransformation=!0),r!==null&&/mainSupport/.test(r)){const S=/mainSupport *\([\w\s]*?uv\s*?\)/.test(r);p+=`	${e}MainSupport(`,p+=S?`vUv);
`:`);
`;for(const v of r.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(const w of v[1].split(/\s*,\s*/))i.varyings.add(w),E.add(w),T.add(w);for(const v of r.matchAll(o))T.add(v[1])}for(const S of s.matchAll(o))T.add(S[1]);for(const S of t.defines.keys())T.add(S.replace(/\([\w\s,]*\)/g,""));for(const S of t.uniforms.keys())T.add(S);T.delete("while"),T.delete("for"),T.delete("if"),t.uniforms.forEach((S,v)=>i.uniforms.set(e+v.charAt(0).toUpperCase()+v.slice(1),S)),t.defines.forEach((S,v)=>i.defines.set(e+v.charAt(0).toUpperCase()+v.slice(1),S));const g=new Map([["fragment",s],["vertex",r]]);Xe(e,T,i.defines),Xe(e,T,g),s=g.get("fragment"),r=g.get("vertex");const _=t.blendMode;if(i.blendModes.set(_.blendFunction,_),n){t.inputColorSpace!==null&&t.inputColorSpace!==i.colorSpace&&(u+=t.inputColorSpace===z?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),t.outputColorSpace!==it?i.colorSpace=t.outputColorSpace:t.inputColorSpace!==null&&(i.colorSpace=t.inputColorSpace);const S=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;u+=`${e}MainImage(color0, UV, `,i.attributes&$.DEPTH&&S.test(s)&&(u+="depth, ",i.readDepth=!0),u+=`color1);
	`;const v=e+"BlendOpacity";i.uniforms.set(v,_.opacity),u+=`color0 = blend${_.blendFunction}(color0, color1, ${v});

	`,h+=`uniform float ${v};

`}if(h+=s+`
`,r!==null&&(f+=r+`
`),l.set(x.FRAGMENT_HEAD,h),l.set(x.FRAGMENT_MAIN_UV,c),l.set(x.FRAGMENT_MAIN_IMAGE,u),l.set(x.VERTEX_HEAD,f),l.set(x.VERTEX_MAIN_SUPPORT,p),t.extensions!==null)for(const S of t.extensions)i.extensions.add(S)}}var Ss=class extends P{constructor(e,...t){super("EffectPass"),this.fullscreenMaterial=new xs(null,null,null,e),this.listener=i=>this.handleEvent(i),this.effects=[],this.setEffects(t),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(e){for(const t of this.effects)t.mainScene=e}set mainCamera(e){this.fullscreenMaterial.copyCameraSettings(e);for(const t of this.effects)t.mainCamera=e}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(e){this.fullscreenMaterial.encodeOutput=e}get dithering(){return this.fullscreenMaterial.dithering}set dithering(e){const t=this.fullscreenMaterial;t.dithering=e,t.needsUpdate=!0}setEffects(e){for(const t of this.effects)t.removeEventListener("change",this.listener);this.effects=e.sort((t,i)=>i.attributes-t.attributes);for(const t of this.effects)t.addEventListener("change",this.listener)}updateMaterial(){const e=new pi;let t=0;for(const a of this.effects)if(a.blendMode.blendFunction===m.DST)e.attributes|=a.getAttributes()&$.DEPTH;else{if(e.attributes&a.getAttributes()&$.CONVOLUTION)throw new Error(`Convolution effects cannot be merged (${a.name})`);ys("e"+t++,a,e)}let i=e.shaderParts.get(x.FRAGMENT_HEAD),s=e.shaderParts.get(x.FRAGMENT_MAIN_IMAGE),r=e.shaderParts.get(x.FRAGMENT_MAIN_UV);const n=/\bblend\b/g;for(const a of e.blendModes.values())i+=a.getShaderCode().replace(n,`blend${a.blendFunction}`)+`
`;e.attributes&$.DEPTH?(e.readDepth&&(s=`float depth = readDepth(UV);

	`+s),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,e.colorSpace===z&&(s+=`color0 = sRGBToLinear(color0);
	`),e.uvTransformation?(r=`vec2 transformedUv = vUv;
`+r,e.defines.set("UV","transformedUv")):e.defines.set("UV","vUv"),e.shaderParts.set(x.FRAGMENT_HEAD,i),e.shaderParts.set(x.FRAGMENT_MAIN_IMAGE,s),e.shaderParts.set(x.FRAGMENT_MAIN_UV,r);for(const[a,o]of e.shaderParts)o!==null&&e.shaderParts.set(a,o.trim().replace(/^#/,`
#`));this.skipRendering=t===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(e)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(e,t=re){this.fullscreenMaterial.depthBuffer=e,this.fullscreenMaterial.depthPacking=t;for(const i of this.effects)i.setDepthTexture(e,t)}render(e,t,i,s,r){for(const n of this.effects)n.update(e,t,s);if(!this.skipRendering||this.renderToScreen){const n=this.fullscreenMaterial;n.inputBuffer=t.texture,n.time+=s*this.timeScale,e.setRenderTarget(this.renderToScreen?null:i),e.render(this.scene,this.camera)}}setSize(e,t){this.fullscreenMaterial.setSize(e,t);for(const i of this.effects)i.setSize(e,t)}initialize(e,t,i){this.renderer=e;for(const s of this.effects)s.initialize(e,t,i);this.updateMaterial(),i!==void 0&&i!==ee&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(const e of this.effects)e.removeEventListener("change",this.listener),e.dispose()}handleEvent(e){switch(e.type){case"change":this.recompile();break}}},bs=class extends P{constructor(e,t,{renderTarget:i,resolutionScale:s=1,width:r=C.AUTO_SIZE,height:n=C.AUTO_SIZE,resolutionX:a=r,resolutionY:o=n}={}){super("NormalPass"),this.needsSwap=!1,this.renderPass=new ft(e,t,new Bt);const l=this.renderPass;l.ignoreBackground=!0,l.skipShadowMapUpdate=!0;const h=l.getClearPass();h.overrideClearColor=new X(7829503),h.overrideClearAlpha=1,this.renderTarget=i,this.renderTarget===void 0&&(this.renderTarget=new W(1,1,{minFilter:fe,magFilter:fe}),this.renderTarget.texture.name="NormalPass.Target");const c=this.resolution=new C(this,a,o,s);c.addEventListener("change",u=>this.setSize(c.baseWidth,c.baseHeight))}set mainScene(e){this.renderPass.mainScene=e}set mainCamera(e){this.renderPass.mainCamera=e}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}getResolutionScale(){return this.resolution.scale}setResolutionScale(e){this.resolution.scale=e}render(e,t,i,s,r){const n=this.renderToScreen?null:this.renderTarget;this.renderPass.render(e,n,n)}setSize(e,t){const i=this.resolution;i.setBaseSize(e,t),this.renderTarget.setSize(i.width,i.height)}};const ws=d.createContext(null),qe=e=>(e.getAttributes()&$.CONVOLUTION)===$.CONVOLUTION,Es=Te.memo(d.forwardRef(({children:e,camera:t,scene:i,resolutionScale:s,enabled:r=!0,renderPriority:n=1,autoClear:a=!0,depthBuffer:o,enableNormalPass:l,stencilBuffer:h,multisampling:c=8,frameBufferType:u=Pt},f)=>{const{gl:p,scene:E,camera:T,size:g}=oe(),_=i||E,S=t||T,[v,w,L]=d.useMemo(()=>{const I=Nt(),O=new fi(p,{depthBuffer:o,stencilBuffer:h,multisampling:c>0&&I?c:0,frameBufferType:u});O.addPass(new ft(_,S));let j=null,N=null;return l&&(N=new bs(_,S),N.enabled=!1,O.addPass(N),s!==void 0&&I&&(j=new vs({normalBuffer:N.texture,resolutionScale:s}),j.enabled=!1,O.addPass(j))),[O,N,j]},[S,p,o,h,c,u,_,l,s]);d.useEffect(()=>v==null?void 0:v.setSize(g.width,g.height),[v,g]),se((I,O)=>{if(r){const j=p.autoClear;p.autoClear=a,h&&!a&&p.clearStencil(),v.render(O),p.autoClear=j}},r?n:0);const q=d.useRef(null);d.useLayoutEffect(()=>{var I;const O=[],j=(I=q.current)==null?void 0:I.__r3f;if(j&&v){const N=j.objects;for(let Q=0;Q<N.length;Q++){const ne=N[Q];if(ne instanceof Re){const Oe=[ne];if(!qe(ne)){let me=null;for(;(me=N[Q+1])instanceof Re&&!qe(me);)Oe.push(me),Q++}const pt=new Ss(S,...Oe);O.push(pt)}else ne instanceof P&&O.push(ne)}for(const Q of O)v==null||v.addPass(Q);w&&(w.enabled=!0),L&&(L.enabled=!0)}return()=>{for(const N of O)v==null||v.removePass(N);w&&(w.enabled=!1),L&&(L.enabled=!1)}},[v,e,S,w,L]),d.useEffect(()=>{const I=p.toneMapping;return p.toneMapping=Dt,()=>{p.toneMapping=I}},[p]);const Z=d.useMemo(()=>({composer:v,normalPass:w,downSamplingPass:L,resolutionScale:s,camera:S,scene:_}),[v,w,L,s,S,_]);return d.useImperativeHandle(f,()=>v,[v]),M.jsx(ws.Provider,{value:Z,children:M.jsx("group",{ref:q,children:e})})}));let _s=0;const Ze=new WeakMap,Ms=(e,t)=>Te.forwardRef(function({blendFunction:s=t==null?void 0:t.blendFunction,opacity:r=t==null?void 0:t.opacity,...n},a){let o=Ze.get(e);if(!o){const c=`@react-three/postprocessing/${e.name}-${_s++}`;Lt({[c]:e}),Ze.set(e,o=c)}const l=oe(c=>c.camera),h=Te.useMemo(()=>{var c,u;return[...(c=t==null?void 0:t.args)!=null?c:[],...(u=n.args)!=null?u:[{...t,...n}]]},[JSON.stringify(n)]);return M.jsx(o,{camera:l,"blendMode-blendFunction":s,"blendMode-opacity-value":r,...n,ref:a,args:h})}),Ts=Ms(hs,{blendFunction:m.ADD}),As={color:[6,.5,2],toneMapped:!1},Us={color:[10,1,10],toneMapped:!1};function Ds(){return M.jsx("div",{className:"w-full h-full bg-transparent",children:M.jsxs(It,{camera:{position:[0,0,10]},children:[M.jsx(ii,{speed:4,rotationIntensity:1,floatIntensity:2,children:M.jsx(Bs,{})}),M.jsx(ni,{saturation:0,count:800,speed:.5}),M.jsx(Es,{children:M.jsx(Ts,{mipmapBlur:!0,luminanceThreshold:1,radius:.7})})]})})}function Bs(e){const t=d.useMemo(()=>new Ot(0,0,3,1.15,0,2*Math.PI,!1,0).getPoints(100),[]);return M.jsxs("group",{...e,children:[M.jsx(Se,{worldUnits:!0,points:t,color:"turquoise",lineWidth:.3}),M.jsx(Se,{worldUnits:!0,points:t,color:"turquoise",lineWidth:.3,rotation:[0,0,1]}),M.jsx(Se,{worldUnits:!0,points:t,color:"turquoise",lineWidth:.3,rotation:[0,0,-1]}),M.jsx(_e,{position:[0,0,.5],speed:6}),M.jsx(_e,{position:[0,0,.5],rotation:[0,0,Math.PI/3],speed:6.5}),M.jsx(_e,{position:[0,0,.5],rotation:[0,0,-Math.PI/3],speed:7}),M.jsx(ti,{args:[.55,64,64],children:M.jsx("meshBasicMaterial",{...As})})]})}function _e({radius:e=2.75,speed:t=6,...i}){const s=d.useRef();return se(r=>{const n=r.clock.getElapsedTime()*t;s.current.position.set(Math.sin(n)*e,Math.cos(n)*e*Math.atan(n)/Math.PI/1.25,0)}),M.jsx("group",{...i,children:M.jsx(Jt,{local:!0,width:5,length:6,color:new X(2,1,10),attenuation:r=>r*r,children:M.jsxs("mesh",{ref:s,children:[M.jsx("sphereGeometry",{args:[.25]}),M.jsx("meshBasicMaterial",{...Us})]})})})}export{Ds as default};
//# sourceMappingURL=ReactCanvas-4c7fe6bd.js.map
