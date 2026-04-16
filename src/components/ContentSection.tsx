const categories = [
  {
    id: "01",
    title: "Cinema 4K HDR",
    desc: "Lançamentos mundiais direto do cinema para sua casa. +45.000 títulos atualizados diariamente em qualidade absurda.",
    stat: { label: "ARQUIVOS", value: "> 45K" },
  },
  {
    id: "02",
    title: "Esportes Ao Vivo",
    desc: "Brasileirão, Champions, NBA, UFC e todos os pay-per-view liberados em tempo real. Zero delay, qualidade máxima.",
    stat: { label: "LATÊNCIA", value: "< 2ms" },
    highlighted: true,
  },
  {
    id: "03",
    title: "Séries Completas",
    desc: "Temporadas completas com múltiplas faixas de áudio e legendas embutidas. Maratone sem interrupções.",
    stat: { label: "EPISÓDIOS", value: "ILIMITADO" },
  },
  {
    id: "04",
    title: "Canais Infantis",
    desc: "Disney+, Cartoon Network e toda a programação infantil com filtro parental integrado para a segurança da criançada.",
    stat: { label: "CANAIS", value: "> 200" },
  },
  {
    id: "05",
    title: "Animes CrunchyRoll",
    desc: "Lista enorme com todos os animes do momento atualizados. Naruto, One Piece, Demon Slayer e muito mais em HD.",
    stat: { label: "CATÁLOGO", value: "COMPLETO" },
  },
  {
    id: "06",
    title: "+2.000 Canais TV",
    desc: "TV aberta, fechada e internacionais. Todos os canais premium das operadoras em uma única plataforma.",
    stat: { label: "STATUS", value: "ONLINE" },
  },
];

export function ContentSection() {
  return (
    <section className="py-24 px-6 lg:px-12 relative z-10 border-t border-border">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="section-title">
              O Arsenal{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-muted-foreground">
                Completo
              </span>
            </h2>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground font-code text-xs uppercase tracking-widest mb-2">
              Categorias Monitoradas
            </p>
            <div className="font-code text-sm text-brand font-bold tabular-nums">
              [SYS_OK: {categories.length} ATIVAS]
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`group relative p-8 card-surface ${cat.highlighted ? "border-brand/30 shadow-[inset_0_0_20px_var(--brand-glow)]" : ""}`}
            >
              <div className="absolute top-0 right-0 p-4 font-code text-xs text-brand/40 group-hover:text-brand transition-colors">
                {cat.id}
              </div>
              <h3 className="text-2xl font-bold uppercase mb-4 group-hover:text-brand transition-colors">
                {cat.title}
              </h3>
              <p className="text-muted-foreground mb-6 font-medium text-pretty text-sm">
                {cat.desc}
              </p>
              <div
                className={`font-code text-xs flex justify-between border-t pt-4 ${cat.highlighted ? "border-brand/20 text-brand" : "border-border text-muted-foreground"}`}
              >
                <span>{cat.stat.label}:</span>
                <span className={cat.highlighted ? "" : "text-foreground"}>
                  {cat.stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
