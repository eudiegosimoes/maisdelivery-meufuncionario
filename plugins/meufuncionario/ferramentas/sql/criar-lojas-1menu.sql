-- OPCIONAL: só serve para quem usa o 1menu (outro produto do autor). Franqueados que usam só o Mais Delivery podem ignorar este arquivo.
-- Cria lojas no 1menu ligadas a lojas JÁ criadas no MD (Mais Delivery).
-- Trocar: city_id (19 = Aripuanã), md_app_city, o marketplace '842' (Aripuanã),
-- a tabela de bairros do MD e a lista "bairro:taxa".
-- active = true  -> loja com cardápio (aparece no 1menu)
-- active = false -> pré-cadastro sem cardápio (escondida)
-- dias: 0=domingo ... 6=sábado (ex.: '123456' = seg a sáb)
-- Segmentos 1menu: 1 Lanches, 3 Marmitaria, 4 Doceria, 5 Lanchonete, 6 Açaiteria,
-- 7 Espetinhos, 8 Hamburgueria, 9 Restaurantes, 10 Pizzaria, 11 Sorveteria,
-- 12 Comida Japonesa, 13 Gás e Água, 14 Bebidas, 15 Hortifruti

with d(nome,slug,seg,descr,logo,wa,sid,ini,fim,dias,rua,num,bairro,tmin,tmax,pick,deliv,ativo) as (values
 ('Nome da Loja','nome-da-loja-cidade',9,'Descrição curta','https://maisdeliveryfranquia.com.br/api/imagens/restaurantes/XXXX.png','+5566999999999','129999','11:00','22:00','0123456','Rua X','123','Centro',30,50,true,true,false)
),
ins as (insert into establishments (name, slug, city_id, segment_id, description, logo, active, whatsapp_number, operating_hours, use_operating_hours, payment_methods_config, channel_delivery_enabled, channel_pickup_enabled, channel_totem_enabled, channel_curbside_enabled, mobile_menu_enabled, delivery_address_json, delivery_neighborhood, delivery_eta_min, delivery_eta_max, mais_delivery_enabled, mais_delivery_store_id, mais_delivery_credential_key, mais_delivery_sync_stock_enabled, md_app_marketplace_id, md_app_city, commission_config, channel_commissions, verified, color, order_position)
 select d.nome, d.slug, 19, d.seg, d.descr, d.logo, d.ativo, d.wa,
  (select jsonb_object_agg(w.dn, case when position(((w.o-1)::int)::text in d.dias)>0 then jsonb_build_object('isOpen',true,'intervals',jsonb_build_array(jsonb_build_object('start',d.ini,'end',d.fim))) else '{"isOpen":false,"intervals":[]}'::jsonb end) from unnest(array['sunday','monday','tuesday','wednesday','thursday','friday','saturday']) with ordinality w(dn,o)), false,
  '{"cash":{"enabled":true,"name":"Dinheiro"},"credit":{"enabled":true,"name":"Maquininha"},"debit":{"enabled":true,"name":"Maquininha"},"pix":{"enabled":false}}'::jsonb,
  d.deliv, d.pick, false, false, true,
  jsonb_build_object('zip','78325-000','street',d.rua,'number',d.num,'complement','','reference','','neighborhood',d.bairro,'city','Aripuanã','state','MT'),
  d.bairro, d.tmin, d.tmax, true, d.sid, 'mais_delivery_prod', true, '842', 'Aripuanã',
  '{"isActive":true,"commissionType":"percentage","percentageRate":5}'::jsonb,
  '{"chat":{"enabled":false},"kiosk":{"enabled":false},"delivery":{"model":"percentage","enabled":true,"percentageRate":10}}'::jsonb,
  true,'from-primary to-primary-hover',0
 from d where not exists (select 1 from establishments e where e.mais_delivery_store_id=d.sid) returning id, mais_delivery_store_id),
z as (insert into establishment_delivery_zones (establishment_id, external_neighborhood_id, name, fixed_fee, active, display_order, source)
 select ins.id, b.mdid, b.name, split_part(x.v,':',2)::numeric, true, x.o-1, 'manual' from ins,
  unnest(string_to_array('16758:7,16776:7,19697:7,195949:20,19702:7,16777:9,16778:9,19706:9,16780:7,19700:20,19710:9,186091:8,186113:20,19715:15,16781:7',',')) with ordinality x(v,o)
  join backup.md_aripuana_bairros_20261109 b on b.mdid=split_part(x.v,':',1) returning establishment_id)
select ins.id, ins.mais_delivery_store_id, (select count(*) from z where z.establishment_id=ins.id) bairros from ins order by ins.id;

-- Depois:
-- (a) loja COM cardápio: puxar o cardápio do MD
-- SELECT net.http_post(url := 'https://phyejnfwhnnkndrinxli.supabase.co/functions/v1/sync-mais-delivery-catalog-pull',
--   headers := jsonb_build_object('Content-Type','application/json','x-md-scheduler','1','x-md-scheduler-secret',(SELECT value FROM public.platform_secrets WHERE key='md_scheduler_secret')),
--   body := jsonb_build_object('establishmentId', <id>, 'fetchAppCatalog', true), timeout_milliseconds := 150000);
-- (b) loja SEM cardápio: carimbar para o robô não travar a fila
-- UPDATE establishments SET mais_delivery_last_pull_at = now() WHERE id IN (...);
