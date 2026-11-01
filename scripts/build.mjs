import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const assets=new URL('../assets/',import.meta.url);
const PERIOD=14,REST=7;
const themes={light:{ink:'#1f3945',muted:'#526773',line:'#d8e0e3',accent:'#17798b',mint:'#438e77',amber:'#a76a24'},dark:{ink:'#e5edf0',muted:'#a6b7c1',line:'#303d48',accent:'#7bcbd7',mint:'#97d2b7',amber:'#e0af69'}};
const projects={
  'project-csc':{title:'Brock CSC portal',description:'Events and tools for the club.',tech:'Web platform'},
  'project-halt':{title:'Storefront Lab',description:'Team AI storefront prototype.',tech:'Python / Gemini / TypeScript'},
  'project-ar':{title:'Git Out of Town',description:'A shared AR canvas in real places.',tech:'Swift / ARKit'},
  'project-optisack':{title:'Parallel Knapsack',description:'Exploring when parallelism pays off.',tech:'C++ / OpenMP / MPI'},
};
const round=n=>Number(n.toFixed(3));
function build(module,{dark=false,narrow=false,still=false,time=REST}={}){
  const p=themes[dark?'dark':'light'],W=narrow?420:840;
  const H=module==='identity'?(narrow?94:82):module==='off-clock'?(narrow?168:100):(narrow?92:70);
  let serial=0;const css=[];
  const text=(x,y,s,size=15,color=p.ink,attrs='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" ${attrs}>${s}</text>`;
  const style=s=>`transform:translate(${round(s.x||0)}px,${round(s.y||0)}px) rotate(${round(s.angle||0)}deg);`;
  // These state samplers supply both CSS keyframes and exact snapshot geometry.
  function motion(sample,content){const id=`m${serial++}`,s=sample(time);if(!still)css.push(`.${id}{animation:${id} ${PERIOD}s linear infinite}@keyframes ${id}{${Array.from({length:57},(_,i)=>`${round(i/56*100)}%{${style(sample(i/4))}}`).join('')}}`);return `<g class="${id}" transform="translate(${round(s.x||0)} ${round(s.y||0)}) rotate(${round(s.angle||0)})">${content}</g>`;}
  const cycle=t=>t/PERIOD*Math.PI*2;
  function icon(){
    const symbols={
      'project-csc':'<rect x="5" y="8" width="29" height="26" rx="3"/><path d="M5 16h29M12 5v7m15-7v7M12 22h3m7 0h3m-13 6h3m7 0h3"/>',
      'project-ar':'<path d="M5 14V6h8m13 0h8v8m0 12v8h-8m-13 0H5v-8m7 0 7-14 8 14m-12-5h9"/>',
      'project-optisack':'<path d="M4 11h10l8 9h13M4 29h10l8-9m-4-9h16m-16 18h16"/><path d="m30 7 4 4-4 4m0 10 4 4-4 4"/>',
      'project-halt':'<rect x="5" y="7" width="29" height="27" rx="3"/><path d="M5 14h29M10 10h1m3 0h1m4 11h9m-9 7h9"/><circle cx="12" cy="21" r="2"/><circle cx="12" cy="28" r="2"/>',
    };
    return `<g transform="translate(3 9)" stroke="${p.accent}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none">${symbols[module]}</g>`;
  }
  function radar(x,y){return `<g transform="translate(${x} ${y})"><g fill="none" stroke="${p.line}"><circle r="24"/><circle r="14"/><path d="M-27 0h54M0-27v54"/></g>${motion(t=>({angle:t/PERIOD*360}),`<path d="M0 0V-24A24 24 0 0 1 24 0Z" fill="${p.accent}" opacity=".12"/><path d="M0 0V-24" stroke="${p.accent}"/>`)}${motion(t=>({x:Math.cos(cycle(t))*16,y:Math.sin(cycle(t))*12,angle:t/PERIOD*360+90}),`<path d="M0-4 1-1 4 1v1L1 1v2l1 1H-2l1-1V1l-3 1V1l3-2Z" fill="${p.accent}"/>`)}</g>`;}
  function ship(x,y){return `<g transform="translate(${x} ${y})">${motion(t=>({y:Math.sin(cycle(t)*2)*1.3,angle:Math.sin(cycle(t))*2}),`<path d="M-20 11h40l-6 7h-27Z" fill="${p.ink}"/><path d="M0 10V-23" stroke="${p.ink}" stroke-width="1.4"/><path d="M-3-18-19 7h16Z" fill="${p.mint}"/><path d="M4-11 17 7H4Z" fill="${p.amber}"/>`)}<path d="M-24 25q6-2 12 0t12 0m9-3q6-2 12 0t12 0" stroke="${p.accent}" opacity=".55" fill="none"/></g>`;}
  let body='';
  if(module==='identity'){
    body=text(0,narrow?35:33,'Alaqmar Gandhi',narrow?29:32,p.ink,'font-weight="700" letter-spacing="-.8"')+text(1,narrow?65:61,'Software engineering / AI-powered products',narrow?17:16,p.muted);
  }else if(module==='off-clock'){
    body=radar(27,44)+text(69,35,'VATSIM UK',narrow?20:19,p.ink,'font-weight="650"')+text(69,61,'Earned S2 · virtual ATC',narrow?17:15,p.muted);
    if(narrow)body+=ship(27,125)+text(69,120,'Sea of Thieves',20,p.ink,'font-weight="650"')+text(69,146,'Still a favourite.',17,p.muted);
    else body+=ship(456,44)+text(500,35,'Sea of Thieves',19,p.ink,'font-weight="650"')+text(500,61,'Still a favourite.',15,p.muted);
  }else{
    const info=projects[module];if(!info)throw Error(`Unknown module: ${module}`);
    const x=narrow?56:60;
    body=icon()+text(x,25,info.title,narrow?21:20,p.ink,'font-weight="650" letter-spacing="-.25"');
    if(narrow){body+=text(x,50,info.description,17,p.muted)+text(x,75,info.tech,16,p.accent);}
    else body+=text(x,49,info.description,15,p.muted)+text(W-4,25,info.tech,14,p.muted,'text-anchor="end"');
    body+=`<path d="M${x} ${H-1}H${W}" stroke="${p.line}"/>`;
  }
  const reduce=Array.from({length:serial},(_,i)=>`.m${i}{animation:none}`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" fill="none"><style>text{font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}${css.join('')}${serial?`@media(prefers-reduced-motion:reduce){${reduce}}`:''}</style>${body}</svg>\n`;
}
const args=process.argv.slice(2);
function option(name){const s=args.find(a=>a.startsWith(name+'='));if(s)return s.slice(name.length+1);const i=args.indexOf(name);return i>=0?args[i+1]:undefined;}
const snapshot=option('--snapshot');
if(snapshot===undefined){
  await mkdir(assets,{recursive:true});
  const inlineIcons={
    code:'<path d="m7 7-5 5 5 5m10-10 5 5-5 5m-3-13-4 18"/>',
    ai:'<circle cx="4" cy="5" r="2"/><circle cx="4" cy="19" r="2"/><path d="m6 5 6 7-6 7m6-7h4"/><rect x="16" y="7" width="7" height="10" rx="1.5"/><path d="M18 10h3m-3 3h2"/>'
  };
  for(const [name,shape] of Object.entries(inlineIcons))await writeFile(new URL(`inline-${name}.svg`,assets),`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#28899b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${shape}</svg>\n`,'utf8');
}
if(snapshot!==undefined){const time=Number(snapshot),output=option('--output'),module=option('--module')||'identity';if(!Number.isFinite(time)||time<0||time>PERIOD||!output)throw Error('Use --module name --snapshot 0..14 --output path.svg [--dark] [--narrow]');await writeFile(output,build(module,{dark:args.includes('--dark'),narrow:args.includes('--narrow'),still:true,time}),'utf8');console.log(`Snapshot: ${output}`);}
else{await mkdir(assets,{recursive:true});for(const module of ['identity',...Object.keys(projects),'off-clock'])for(const dark of [false,true])for(const narrow of [false,true]){const name=`${module}${narrow?'-narrow':''}${dark?'-dark':''}.svg`;await writeFile(new URL(name,assets),build(module,{dark,narrow}),'utf8');console.log(`Built ${fileURLToPath(new URL(name,assets))}`);}}
