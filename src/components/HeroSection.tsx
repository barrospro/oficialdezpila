import devicesMockup from "@/assets/devices-mockup.png";

export function HeroSection() {
  return (
    <section className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3">
            <span className="bg-brand text-brand-foreground font-bold px-3 py-1 rounded text-sm">DEZ</span>
            <span className="text-3xl font-extrabold text-brand glow-text tracking-wide">DEZPILA</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            CONTEÚDO ILIMITADO POR{" "}
            <span className="highlight-box">UM VALOR QUE</span>{" "}
            <span className="highlight-box">CABE NO SEU BOLSO!</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg">
            Tenha acesso a mais de 2 mil canais, incluindo Netflix, Disney+, HBO Max e mais, por um preço acessível! Com a DezPila, você economiza e assiste com qualidade, estabilidade e suporte dedicado.
          </p>
          <a href="#planos" className="btn-brand text-lg" style={{ animation: "pulse-glow 2s ease-in-out infinite" }}>
            ADQUIRA O SEU AGORA
          </a>
        </div>
        <div className="flex-1" style={{ animation: "float 6s ease-in-out infinite" }}>
          <img
            src={devicesMockup}
            alt="DezPila em múltiplos dispositivos"
            width={1024}
            height={768}
            className="w-full max-w-xl mx-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
