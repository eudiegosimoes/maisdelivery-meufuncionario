import fs from 'fs';
const [,,slug,sid,out]=process.argv;
const tj=await fetch('https://api.anota.ai/noauth/access//get-token/'+slug).then(r=>r.json()); const tok=tj.token||tj.data?.token;
const d=(await fetch('https://api.anota.ai/clientauth/nm-category/menu-merchant',{headers:{Authorization:tok}}).then(r=>r.json())).data;
const t=s=>(s||'').replace(/[\p{Extended_Pictographic}\u2B50\uFE0F\u200D]/gu,'').replace(/\s+/g,' ').trim();
const sl=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
const img=o=>{for(const k of Object.keys(o)){ if(/image|img|photo/i.test(k)&&typeof o[k]==='string'&&/^http/.test(o[k])) return o[k]; if(/image/i.test(k)&&o[k]&&typeof o[k]==='object'){const u=JSON.stringify(o[k]).match(/https?:[^"]+/i); if(u) return u[0];}} return '';};
const aux=new Map(d.menu.menu_aux.map(c=>[c.category_id,c])); const TP={0:'somar',1:'media_somar',2:'maior_substituir'}; const cats=[], fotos=[];
for(const c of d.menu.menu.filter(c=>!c.only_pdv).sort((a,b)=>a.order-b.order)){ const prods=[];
 for(const it of c.itens.filter(i=>!i.out).sort((a,b)=>a.order-b.order)){
  const niv=(it.next_steps||[]).map(ns=>{const g=aux.get(ns.category); if(!g) return null; const ops=g.itens.filter(x=>!x.out).map(x=>[t(x.title),Number(x.price)||0]); let tp=TP[ns.price_model]??'somar'; if(!Number(it.price)&&ns.min>=1&&tp==='somar') tp='substituir'; return {titulo:t(g.title).replace(/:$/,''),min:ns.min,max:Math.min(ns.max,ops.length),tp,opcoes:ops};}).filter(n=>n&&n.opcoes.length);
  let v=Number(it.price)||0; if(!v&&niv.length){const n0=niv.find(n=>n.min>=1); if(n0) v=Math.min(...n0.opcoes.map(o=>o[1]).filter(x=>x>0));}
  const nome=t(it.title).slice(0,45).trim(); prods.push([nome,v,t(it.description),/bebida|refri|cerveja|suco|drink|caf[eé]|água|agua/i.test(c.title)?1:0,niv]);
  const im=img(it); if(im) fotos.push(`${sid}|${sl(nome)}|${im}`);}
 if(prods.length) cats.push([t(c.title),prods]);}
fs.writeFileSync(out+'/cardapio.json',JSON.stringify(cats)); fs.writeFileSync(out+'/fotos.txt',fotos.join('\n')+'\n');
const e=d.establishment||{}; console.log('LOJA:',e.name,'|',JSON.stringify(e.address||e.addresses||'').slice(0,200));
console.log(cats.map(c=>c[0]+'('+c[1].length+')').join(', '),'| fotos',fotos.length);
for(const c of cats){console.log('\n## '+c[0]); for(const p of c[1]) console.log(p[0],p[1],p[4].length?':: '+p[4].map(n=>n.titulo+' '+n.min+'-'+n.max+'x'+n.opcoes.length+(n.tp!=='somar'?' '+n.tp:'')).join(' | '):'');}
