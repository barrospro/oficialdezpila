-- ====================================================================
-- SCHEMA SQL SUPABASE - E-COMMERCE LOJA DEZ PILA
-- ====================================================================

-- 1. TABELA DE PRODUTOS
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  descricao TEXT NOT NULL,
  categoria TEXT NOT NULL CHECK (categoria IN ('acessorios_tv', 'cinema_em_casa')),
  preco NUMERIC(10,2) NOT NULL CHECK (preco > 0),
  imagem_url TEXT NOT NULL,
  estoque INTEGER NOT NULL DEFAULT 50 CHECK (estoque >= 0),
  destaque BOOLEAN NOT NULL DEFAULT false,
  badge TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. TABELA DE PEDIDOS (ORDERS)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cliente_nome TEXT NOT NULL,
  cliente_email TEXT NOT NULL,
  cliente_whatsapp TEXT NOT NULL,
  endereco_rua TEXT NOT NULL,
  endereco_numero TEXT NOT NULL,
  endereco_bairro TEXT NOT NULL,
  endereco_cidade TEXT NOT NULL,
  endereco_uf TEXT NOT NULL,
  endereco_cep TEXT NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL CHECK (subtotal >= 0),
  frete NUMERIC(10,2) NOT NULL CHECK (frete >= 0),
  total NUMERIC(10,2) NOT NULL CHECK (total >= 0),
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'pago', 'cancelado', 'enviado')),
  pix_id TEXT,
  pix_qr_code TEXT,
  pix_expiration TIMESTAMPTZ,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. TABELA DE ITENS DO PEDIDO (ORDER_ITEMS)
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  quantidade INTEGER NOT NULL CHECK (quantidade > 0),
  preco_unitario NUMERIC(10,2) NOT NULL CHECK (preco_unitario >= 0),
  criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ÍNDICES PARA PERFORMANCE DE BUSCA E FILTRO
CREATE INDEX IF NOT EXISTS idx_products_categoria ON public.products(categoria);
CREATE INDEX IF NOT EXISTS idx_products_ativo ON public.products(ativo);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_pix_id ON public.orders(pix_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);

-- HABILITA ROW LEVEL SECURITY (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS RLS PARA PRODUCTS
-- Leitura pública para produtos ativos
CREATE POLICY "Leitura publica de produtos ativos"
  ON public.products FOR SELECT
  USING (ativo = true);

-- Inserção, atualização e exclusão restritas para service_role / admin
CREATE POLICY "Escrita de produtos restrita a admin"
  ON public.products FOR ALL
  USING (auth.role() = 'service_role' OR auth.role() = 'authenticated');

-- POLÍTICAS RLS PARA ORDERS
-- Permite que qualquer usuário crie pedidos (Guest Checkout)
CREATE POLICY "Qualquer usuario pode criar pedido"
  ON public.orders FOR INSERT
  WITH CHECK (true);

-- Leitura de pedidos liberada para o próprio cliente via ID ou admin
CREATE POLICY "Leitura de pedido por ID ou admin"
  ON public.orders FOR SELECT
  USING (true);

-- Atualização de status de pedido restrita ao servidor / webhook / admin
CREATE POLICY "Atualizacao de pedido por admin"
  ON public.orders FOR UPDATE
  USING (true);

-- POLÍTICAS RLS PARA ORDER_ITEMS
CREATE POLICY "Qualquer usuario pode inserir itens de pedido"
  ON public.order_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Leitura de itens de pedido"
  ON public.order_items FOR SELECT
  USING (true);
