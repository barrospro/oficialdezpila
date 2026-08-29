type Service = {
  name: string;
  price: string;
};

const services: Service[] = [
  { name: "Netflix", price: "R$ 44,90" },
  { name: "HBO Max", price: "R$ 44,90" },
  { name: "Prime Video", price: "R$ 19,90" },
  { name: "Disney+", price: "R$ 49,90" },
  { name: "Apple TV+", price: "R$ 29,90" },
  { name: "Telecine", price: "R$ 29,90" },
  { name: "Combate", price: "R$ 49,90" },
  { name: "Premiere", price: "R$ 59,90" },
  { name: "Sky", price: "R$ 139,90" },
  { name: "Paramount+", price: "R$ 34,90" },
  { name: "Crunchyroll", price: "R$ 19,90" },
  { name: "Claro TV", price: "R$ 65,40" },
];

function ServiceLogo({ name }: { name: string }) {
  switch (name) {
    case "Netflix":
      return (
        <div className="flex items-center justify-center gap-1.5 font-heading font-black tracking-wider text-[#E50914] text-base uppercase">
          <svg className="h-5 w-4 fill-[#E50914]" viewBox="0 0 24 24">
            <path d="M5.398 0v24l4.577-2.584V9.827L14.73 24l4.757-2.686V0h-4.577v14.173L10.155 0H5.398z" />
          </svg>
          <span>NETFLIX</span>
        </div>
      );
    case "HBO Max":
      return (
        <div className="flex items-center justify-center gap-1 font-heading font-black tracking-tight text-white text-base">
          <span className="text-[#9900EF] text-lg font-black">HBO</span>
          <span className="text-white font-extrabold lowercase text-xs bg-[#9900EF]/30 px-1 rounded border border-[#9900EF]/50">
            max
          </span>
        </div>
      );
    case "Prime Video":
      return (
        <div className="flex flex-col items-center justify-center leading-none">
          <div className="flex items-center gap-1 font-heading font-bold text-white text-sm tracking-tight">
            <span>prime</span>
            <span className="text-[#00A8E1] font-extrabold">video</span>
          </div>
          <svg className="h-2 w-12 text-[#00A8E1] fill-current -mt-0.5" viewBox="0 0 60 12">
            <path d="M2 3c15 6 35 6 54 0 1-.3 2 .5 1 1-14 7-38 7-56 0-1-.5 0-1.3 1-1z" />
          </svg>
        </div>
      );
    case "Disney+":
      return (
        <div className="flex items-center justify-center gap-0.5 font-heading font-black text-white text-base tracking-tight">
          <span className="italic font-serif text-lg text-[#0063E5] font-black">Disney</span>
          <span className="text-[#0063E5] font-black text-lg">+</span>
        </div>
      );
    case "Apple TV+":
      return (
        <div className="flex items-center justify-center gap-1 font-heading font-bold text-white text-sm">
          <svg className="h-4 w-4 fill-white" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.91.13-9.79-1.92-14.64-6.15-3.17-2.76-7.05-7.43-11.64-14.02-6.42-9.2-11.22-19.78-14.4-31.74-3.18-11.97-4.78-23.36-4.78-34.19 0-14.75 3.53-26.96 10.59-36.64 7.05-9.69 16.03-14.63 26.93-14.85 5.03 0 10.37 1.25 16.03 3.75 5.66 2.5 9.77 3.75 12.33 3.75 2.12 0 6.33-1.33 12.63-4 6.31-2.67 11.45-3.88 15.42-3.64 12.08.97 21.6 5.71 28.56 14.22-10.74 6.49-16.01 15.54-15.82 27.15.19 9.07 3.63 16.59 10.32 22.56 6.7 5.97 14.62 9.29 23.77 9.96-2.4 7.04-5.63 14.26-9.69 21.65zM119.22 31.09c0-7.39 2.68-14.54 8.04-21.46 5.37-6.92 12.18-11.02 20.44-12.3 1.01 8.52-1.74 16.32-8.25 23.4-6.51 7.08-13.91 10.87-22.23 11.36h-2c0-.33 0-66 2-1h0z" />
          </svg>
          <span>tv+</span>
        </div>
      );
    case "Telecine":
      return (
        <div className="flex items-center justify-center gap-1 font-heading font-black text-[#E30613] text-sm tracking-wider uppercase">
          <span className="h-2 w-2 rounded-full bg-[#E30613] animate-pulse" />
          <span>TELE CINE</span>
        </div>
      );
    case "Combate":
      return (
        <div className="flex items-center justify-center gap-1 font-heading font-black text-[#D40000] text-xs tracking-widest uppercase bg-[#D40000]/10 px-2 py-0.5 rounded border border-[#D40000]/30">
          <span>COMBATE</span>
        </div>
      );
    case "Premiere":
      return (
        <div className="flex items-center justify-center gap-1 font-heading font-black text-[#008037] text-sm tracking-wider uppercase">
          <span className="text-[#008037] font-black text-base">P</span>
          <span>PREMIERE</span>
        </div>
      );
    case "Sky":
      return (
        <div className="flex items-center justify-center font-heading font-black text-[#E60000] text-lg tracking-tighter uppercase italic">
          <span>SKY</span>
        </div>
      );
    case "Paramount+":
      return (
        <div className="flex items-center justify-center gap-1 font-heading font-black text-[#0064FF] text-xs tracking-tight uppercase">
          <span className="text-sm font-black">★</span>
          <span>PARAMOUNT+</span>
        </div>
      );
    case "Crunchyroll":
      return (
        <div className="flex items-center justify-center gap-1.5 font-heading font-bold text-[#FF6600] text-xs tracking-tight">
          <div className="h-3.5 w-3.5 rounded-full border-2 border-[#FF6600] flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-[#FF6600]" />
          </div>
          <span className="font-extrabold uppercase">crunchyroll</span>
        </div>
      );
    case "Claro TV":
      return (
        <div className="flex items-center justify-center gap-1 font-heading font-black text-[#DA291C] text-sm tracking-wider uppercase">
          <span className="text-[#DA291C]">Claro</span>
          <span className="text-white text-xs font-bold bg-[#DA291C] px-1 rounded">tv</span>
        </div>
      );
    default:
      return <span className="font-bold text-sm">{name}</span>;
  }
}

export function PriceComparison() {
  return (
    <section id="comparativo" className="px-6 lg:px-12 py-24 relative z-10 border-t border-border">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <p className="font-code text-brand text-xs uppercase tracking-widest mb-4 font-bold">
            Análise de Mercado // Comparativo Real
          </p>
          <h2 className="section-title text-center mb-4">
            Isso é o que você pagaria
            <br />
            <span className="text-muted-foreground">se assinasse tudo separado:</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-16">
          {services.map((s) => (
            <div
              key={s.name}
              className="card-surface text-center py-5 px-3 flex flex-col items-center justify-between min-h-[100px] border border-border/80 hover:border-brand/40 transition-all hover:shadow-[0_0_20px_rgba(255,59,48,0.1)]"
            >
              <div className="flex-1 flex items-center justify-center w-full py-1">
                <ServiceLogo name={s.name} />
              </div>
              <p className="text-muted-foreground font-code text-xs font-semibold mt-2">
                {s.price}/mês
              </p>
            </div>
          ))}
        </div>

        <div className="text-center space-y-6">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest font-code">
            Total Combinado
          </p>
          <p className="text-5xl md:text-6xl font-bold line-through text-muted-foreground/40 tabular-nums font-code">
            R$ 589,30
          </p>

          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-brand/10 blur-xl rounded-full" />
            <p className="relative text-2xl md:text-3xl font-bold uppercase tracking-tight">
              Com a DezPila você paga apenas
            </p>
          </div>

          <div className="flex items-start gap-1 justify-center">
            <span className="text-2xl font-bold mt-3 text-muted-foreground font-code">R$</span>
            <span className="text-8xl md:text-9xl font-bold text-brand tabular-nums tracking-tighter font-code glow-text">
              10
            </span>
            <div className="flex flex-col justify-start mt-4">
              <span className="text-3xl font-bold text-brand tabular-nums tracking-tighter font-code">
                ,00
              </span>
              <span className="text-sm font-semibold uppercase text-muted-foreground font-code">
                /mês
              </span>
            </div>
          </div>

          <div className="pt-6">
            <a href="#planos" className="btn-brand text-lg">
              ADQUIRA O SEU AGORA
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
