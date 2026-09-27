-- ====================================================================
-- SEED DE PRODUTOS REALISTAS DE TV BOX & STICK (PREÇOS ABAIXO DO MERCADO)
-- ====================================================================

TRUNCATE TABLE public.products CASCADE;

INSERT INTO public.products (id, nome, descricao, categoria, preco, imagem_url, estoque, destaque, badge, ativo) VALUES
('30000000-0000-0000-0000-000000000001', 
 'Tv Box Smart Pro Android 4k Wi-fi Transforme Sua Tv Em Smart', 
 'Transforme qualquer TV comum em uma Smart TV 4K Ultra HD de alta velocidade. Acompanha controle remoto multifuncional, cabo HDMI e fonte de alimentação. Conexão Wi-Fi rápida e suporte total aos melhores aplicativos de streaming.', 
 'acessorios_tv', 
 69.90, 
 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80', 
 85, true, '57% OFF • Mais Vendido', true),

('30000000-0000-0000-0000-000000000002', 
 'Smart Tv Box Pró 4k Android C/ Play Store Baixa Aplicativos', 
 'Versão Pro de alta performance com Android atualizado, Play Store liberada para baixar qualquer aplicativo, processador Quad-Core e transmissão 4K fluida sem travamentos no futebol ao vivo.', 
 'acessorios_tv', 
 99.90, 
 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&auto=format&fit=crop&q=80', 
 60, true, '60% OFF • Edição Pro', true),

('30000000-0000-0000-0000-000000000003', 
 'Tv Box Smart Pro Android 4k Transforme Sua Tv Em Smart Wifi', 
 'Receptor inteligente 4K de resposta ultra rápida, design compacto premium, 4 portas USB, saída de áudio digital e Wi-Fi dual band otimizado para máxima estabilidade em transmissões 4K.', 
 'acessorios_tv', 
 67.90, 
 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80', 
 100, false, '57% OFF • Menor Preço', true),

('30000000-0000-0000-0000-000000000004', 
 'Aparelho Smart Tv Box Stick Android 4k Wi-fi C/play Store Y9 Stick', 
 'Dongle TV Stick 4K formato pendrive ultra discreto. Conecta direto na porta HDMI atrás da TV com controle remoto via Bluetooth, suporte a comando de voz e Play Store instalada.', 
 'acessorios_tv', 
 89.90, 
 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&auto=format&fit=crop&q=80', 
 50, true, '66% OFF • Formato Stick', true);
