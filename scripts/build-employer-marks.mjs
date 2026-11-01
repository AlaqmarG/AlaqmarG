import {readFile,writeFile} from 'node:fs/promises';
const root=new URL('../assets/brands/',import.meta.url);
// Presentation canvases, not new logos: preserve all original brand artwork.
const sources=[
 ['rbc','rbc.svg','image/svg+xml',21,24],
 ['boltable','boltable-mark.png','image/png',26,26],
];
for(const [name,file,mime,w,h] of sources){
 const bytes=await readFile(new URL(file,root));
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="0 0 32 32"><image x="${(32-w)/2}" y="${(32-h)/2}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" xlink:href="data:${mime};base64,${bytes.toString('base64')}"/></svg>`;
 await writeFile(new URL(`${name}-badge.svg`,root),svg);
}
// Crop only transparent padding in the SVG viewport; retain the original PNG bytes.
const shiloh=await readFile(new URL('shiloh-official-current.png',root));
for(const dark of [false,true]){
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="104" height="32" viewBox="0 0 1601 493"><defs><filter id="white" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/></filter></defs><image x="-225" y="-258" width="2100" height="1008" ${dark?'filter="url(#white)"':''} xlink:href="data:image/png;base64,${shiloh.toString('base64')}"/></svg>`;
 await writeFile(new URL(`shiloh-badge${dark?'-dark':''}.svg`,root),svg);
}
const p=new URL('SOURCES.json',root),data=JSON.parse(await readFile(p,'utf8'));
const brock=await readFile(new URL('brock.svg',root),'utf8');
for(const dark of [false,true]){
 const svg=brock.replace(/<rect class="st0" width="152" height="92"\/>/,'').replace('.st1{fill:#FFFFFF;}',`.st1{fill:${dark?'#FFFFFF':'#CC0000'};}`);
 await writeFile(new URL(`brock-mark${dark?'-dark':''}.svg`,root),svg);
}
if(!data.sources.some(s=>s.file==='brock.svg'))data.sources.push({file:'brock.svg',url:'https://upload.wikimedia.org/wikipedia/commons/8/8a/Brock_University_Logo_2022.svg',originalSource:'https://brocku.ca/wp-content/themes/brocku-mu-base/images/brocku-logo-rgb.svg',note:'Brock-authored 2022 SVG mirrored on Wikimedia. Presentation variants remove the red rectangular backing and retain original letter paths in red (light) or white (dark).'});
if(!data.sources.some(s=>s.file==='boltable-mark.png'))data.sources.push({file:'boltable-mark.png',url:'https://www.boltablestudio.com/favicon.ico',note:'Official compact mark. Response is PNG; bytes preserved with matching extension.'});
if(!data.sources.some(s=>s.file==='shiloh-official-current.png'))data.sources.push({file:'shiloh-official-current.png',url:'https://static.wixstatic.com/media/d36aec_cec1868f048d4f27b6b05b69156a6ee6~mv2.png',note:'Transparent wordmark from official careers homepage; SVG viewport removes empty padding. Dark variant presents original shapes in white.'});
data.presentation='Background-free marks; no white tiles or borders. RBC and Boltable preserve original colours; Shiloh uses its transparent wordmark with a white silhouette for dark backgrounds. SVG wrappers embed source bytes.';
await writeFile(p,JSON.stringify(data,null,2));
console.log('Built background-free employer marks.');
