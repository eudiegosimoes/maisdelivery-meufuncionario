import fs from 'fs';
const [,,inp,out]=process.argv; const d=JSON.parse(fs.readFileSync(inp,'utf8'));
const C=Object.fromEntries(d.choices.map(c=>[c.id_store_choice,c]));
const t=s=>(s||'').replace(/\s+/g,' ').trim();
const cats={};
for(const i of d.items.sort((a,b)=>a.order-b.order)){
  const v=i.variations.find(v=>v.enabled==='Y'); if(!v) continue;
  const cn=t(i.category_item.desc_store_category_item); const ord=i.category_item.order;
  const niv=i.choices.sort((a,b)=>a.order-b.order).map(x=>C[x.id_store_choice]).filter(Boolean).map(c=>{const ops=c.choice_items.filter(o=>o.enabled==='Y').sort((a,b)=>a.order-b.order).map(o=>[t(o.desc_store_choice_item),Number(o.variations?.[0]?.aditional_price)||0]); return {titulo:t(c.desc_store_choice),min:c.min_choices||0,max:Math.min(c.max_choices||ops.length,ops.length),tp:'somar',opcoes:ops}}).filter(n=>n.opcoes.length);
  (cats[cn]=cats[cn]||{ord,prods:[]}).prods.push([t(i.desc_store_item),Number(v.price)||0,t(i.detail),/Bebida/i.test(cn)?1:0,niv]);
}
const mc=Object.entries(cats).sort((a,b)=>a[1].ord-b[1].ord).map(([n,c])=>[n,c.prods]);
fs.writeFileSync(out,JSON.stringify(mc));
console.log(mc.map(c=>c[0]+'('+c[1].length+')').join(', '));
console.log('com grupo:',mc.flatMap(c=>c[1]).filter(p=>p[4].length).map(p=>p[0]+': '+p[4].map(n=>n.titulo+' '+n.min+'-'+n.max+'x'+n.opcoes.length+(n.opcoes.some(o=>o[1])?' $':'')).join(' | ')).join('\n'));
