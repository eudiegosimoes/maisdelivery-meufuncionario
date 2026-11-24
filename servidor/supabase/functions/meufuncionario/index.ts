// Edge Function do Supabase: servidor MCP do Meu Funcionário com checagem de licença.
// Deploy: supabase functions deploy meufuncionario --no-verify-jwt
// (a autenticação é a chave de licença, não o JWT do Supabase)
import { createClient } from 'npm:@supabase/supabase-js@2';
import { atender } from './nucleo/mcp.js';

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, {
  auth: { persistSession: false },
});

Deno.serve((req) =>
  atender(req, {
    buscarLicenca: async (hash: string) => {
      const { data } = await supabase
        .from('licencas')
        .select('cidade, id_marketplace, status, validade, limite_lojas')
        .eq('chave_hash', hash)
        .maybeSingle();
      return data;
    },
    registrarUso: async (hash: string, ferramenta: string) => {
      await supabase.from('uso').insert({ chave_hash: hash, ferramenta });
    },
  }),
);
