const categories = [
  { emoji: "🎥", title: "Filmes incríveis", desc: "Assista a clássicos, lançamentos e grandes produções vencedoras de prêmios, tudo em alta definição." },
  { emoji: "📺", title: "Séries imperdíveis", desc: "Descubra séries aclamadas e sucessos do momento, com temporadas completas para maratonar." },
  { emoji: "⚽", title: "Esportes ao vivo", desc: "Todos os canais de esporte, futebol, artes marciais e muito mais em tempo real!" },
  { emoji: "👶", title: "Canais infantis", desc: "Toda a lista para a criançada se divertir, além de Disney+ e muito mais!" },
  { emoji: "⚔️", title: "Animes CrunchRoll", desc: "Lista enorme com todos os animes do momento atualizados em qualidade HD." },
  { emoji: "📡", title: "+2.000 Canais ao vivo", desc: "Canais de TV aberta, fechada e internacionais, tudo em uma única plataforma." },
];

export function ContentSection() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="section-title mb-4">
          O conteúdo de vários serviços de streaming em uma única plataforma!
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">A DezPila tem de tudo!</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="card-surface hover:border-brand transition-colors duration-300 group">
              <div className="text-4xl mb-4">{cat.emoji}</div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-brand transition-colors">{cat.title}</h3>
              <p className="text-muted-foreground text-sm">{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
