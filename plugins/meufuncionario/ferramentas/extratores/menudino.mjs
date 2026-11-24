import fs from 'fs';
const M='d1904404-e43e-4c34-a39b-3689c36a4dad', B='https://madeirasburger.menudino.com';
const out=process.argv[2];
const j=u=>fetch(B+u).then(r=>r.json());
const slug=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
const CAT={'Variedades':'Variedades','Porções (Todas Fritas em Óleo de Algodão)':'Porções','Soda Italiana 400ML':'Soda Italiana','Cervejas':'Cervejas','Signature Burger':'Signature Burger','Classicos':'Clássicos','Refrigerantes | Energéticos':'Refrigerantes e Energéticos'};
const ORD=['Signature Burger','Classicos','Porções (Todas Fritas em Óleo de Algodão)','Refrigerantes | Energéticos','Soda Italiana 400ML','Cervejas','Variedades'];
const cats=(await j('/api/bff/catalog/categories/'+M)).items; const mc=[], fotos=[];
for(const cn of ORD){const c=cats.find(x=>x.name===cn); if(!c) continue;
 const sj=await j(`/api/bff/catalog/items/${M}/${c.id}/summary?SellOnline=true&SellLocal=false`);
 const lst=(sj.items||sj||[]).filter(i=>!i.isPaused).sort((a,b)=>a.sortIndex-b.sortIndex); const prods=[];
 for(const it of lst){const d=await j(`/api/bff/catalog/items/detailed?MerchantId=${M}&Id=${it.id}&IncludeWizard=true&OnlyActive=true&SellOnline=true&SellLocal=false`);
  const niv=(d.itemGroups||[]).sort((a,b)=>a.sortIndex-b.sortIndex).map(g=>{const ops=(g.itemOptionsGroup||[]).sort((a,b)=>a.sortIndex-b.sortIndex).map(o=>[(o.itemChild?.name||o.answerForCustomer||'').trim(),Number(o.price)||0]).filter(o=>o[0]);const mx=g.maxQtyAnswer||ops.length;return{titulo:(g.description||'').trim(),min:g.isRequired?1:0,max:Math.min(mx,ops.length),tp:'somar',opcoes:ops}}).filter(n=>n.opcoes.length);
  const nome=d.name.trim(); prods.push([nome,Number(d.salePrice||it.salePrice)||0,(d.description||'').replace(/\s+/g,' ').trim(),/Refrig|Soda|Cerveja/.test(cn)?1:0,niv]);
  if(it.hasPhoto&&it.largeImageUrl) fotos.push(`55563|${slug(nome)}|https://${it.largeImageUrl}`);
  await new Promise(r=>setTimeout(r,200));}
 mc.push([CAT[cn],prods]);}
fs.writeFileSync(out+'/madeira.json',JSON.stringify(mc)); fs.writeFileSync(out+'/lista-madeira.txt',fotos.join('\n')+'\n');
console.log(mc.map(c=>c[0]+'('+c[1].length+')').join(' '), 'fotos', fotos.length);
