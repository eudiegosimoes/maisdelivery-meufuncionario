import fs from 'fs';
const [,,slug,sid,out]=process.argv; const B=`https://pitellanches.stbl.com.br/estoque/v2/app`.replace('pitellanches',slug); const SUF='?format=json&app_variant=mobile&is_app=1';
const H={Origin:`https://${slug}.mandarpedido.com`};
const j=async u=>{for(let i=0;i<4;i++){try{const r=await fetch(B+u,{headers:H}); const t=await r.text(); if(t) return JSON.parse(t);}catch(e){} await new Promise(r=>setTimeout(r,1500));} throw new Error('falhou '+u)};
const t=s=>(s||'').replace(/[\p{Extended_Pictographic}⭐️‍]/gu,'').replace(/\s+/g,' ').trim();
const sl=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
const list=(await j('/products/list/'+SUF)).products;
const cats={}, fotos=[];
for(const p of list.sort((a,b)=>a.category_order-b.category_order||a.order-b.order)){
  if(p.sold_out) continue;
  let nome=t(p.name), preco=Number(p.promotional_price||p.price)||0, desc='', niv=[], img=p.url_image;
  if(p.product_type==='combo'){
    // Combo: preço base = soma do mais barato de cada etapa; cada etapa vira
    // nível obrigatório com o que passa do mais barato (pizza = média dos sabores).
    const c=(await j('/combo/details/'+SUF+'&id='+p.id)).combo; desc=t(c.description||p.details); img=c.url_image||img; preco=0;
    for(const s of c.steps.sort((a,b)=>a.order-b.order)){
      const ps=Array.isArray(s.products)?s.products:[s.products];
      const fl=ps.flatMap(x=>x.flavors_combo_values||[]);
      const ops=fl.length?fl.map(f=>[t(f.name),Number(f.combo_value)||0]):ps.map(x=>[t(x.product_name),Number(x.combo_value)||0]);
      const mn=Math.min(...ops.map(o=>o[1])); preco+=mn;
      const max=Math.min(s.max_products||1,ops.length);
      niv.push({titulo:t(s.description),min:Math.min(s.min_products||1,max),max,tp:fl.length&&max>1?'media_somar':'somar',opcoes:ops.map(([n,v])=>[n,+(v-mn).toFixed(2)])});
    }
  } else if(p.product_type==='pizza'){
    const z=(await j('/pizza/size-details'+SUF+'&size_id='+p.id)).pizza_size;
    desc=`${z.slice_quantity} fatias, até ${z.flavor_quantity} sabor${z.flavor_quantity>1?'es':''}`; preco=Number(z.minimum_price)||preco;
    for(const g of z.groups.sort((a,b)=>(a.type==='Sabores'?-1:0)-(b.type==='Sabores'?-1:0))){
      const ops=g.items.map(i=>[t(i.name),Number(i.price)||0]);
      if(g.type==='Sabores') niv.push({titulo:z.flavor_quantity>1?`Escolha até ${z.flavor_quantity} sabores`:'Escolha o sabor',min:1,max:z.flavor_quantity,tp:z.flavor_quantity>1?'media_substituir':'substituir',opcoes:ops});
      else niv.push({titulo:t(g.type==='Bordas'?'Borda':g.name),min:g.min,max:Math.min(g.max||ops.length,ops.length),tp:'somar',opcoes:ops});
    }
  } else {
    const d=(await j('/product/details/'+SUF+'&id='+p.id)).product; desc=t(d.details||p.details);
    niv=(d.groups||[]).map(g=>{const ops=g.items.map(i=>[t(i.name),Number(i.price)||0]);return {titulo:t(g.name),min:g.min||0,max:Math.min(g.max||ops.length,ops.length),tp:'somar',opcoes:ops}}).filter(n=>n.opcoes.length);
    img=d.image_url||img;
  }
  const cn=t(p.category_name); (cats[cn]=cats[cn]||[]).push([nome,preco,desc,/Bebida|Suco/i.test(cn)?1:0,niv]);
  if(img) fotos.push(`${sid}|${sl(nome)}|${img}`);
  await new Promise(r=>setTimeout(r,250));
}
const mc=Object.entries(cats);
fs.writeFileSync(out+'/cardapio.json',JSON.stringify(mc)); fs.writeFileSync(out+'/fotos.txt',fotos.join('\n')+'\n');
console.log(mc.map(c=>c[0]+'('+c[1].length+')').join(', '),'| fotos',fotos.length);
for(const p of mc.flatMap(c=>c[1]).filter(p=>p[4].length)) console.log(p[0],p[1],'::',p[4].map(n=>n.titulo+' '+n.min+'-'+n.max+'x'+n.opcoes.length+(n.tp!=='somar'?' '+n.tp:'')).join(' | '));
