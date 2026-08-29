export function BordaEnergia() {
  const recursos = ['Projetos ilimitados', 'Domínio próprio incluído', 'Suporte prioritário 24/7'];
  return (
    <div className='flex min-h-[500px] items-center justify-center p-10' style={{ background: 'radial-gradient(ellipse at 50% 38%,#17171f 0%,#09090b 70%)' }}>
      <style>{`@keyframes energiaGirar{to{transform:rotate(360deg)}}`}</style>
      <div className='relative overflow-hidden rounded-[20px] bg-[#232330] p-[1.5px] shadow-[0_0_70px_rgba(139,92,246,.16),0_20px_50px_rgba(0,0,0,.5)]'>
        <div
          className='absolute -inset-[120%]'
          style={{
            background: 'conic-gradient(from 0deg,rgba(139,92,246,0) 0deg,rgba(139,92,246,0) 200deg,#8b5cf6 255deg,#22d3ee 300deg,rgba(34,211,238,0) 335deg,rgba(139,92,246,0) 360deg)',
            animation: 'energiaGirar 4s linear infinite',
          }}
        />
        <div className='relative w-[330px] rounded-[18.5px] bg-[#0e0e14] p-7'>
          <div className='mb-[18px] flex items-center justify-between'>
            <span className='text-[11px] font-bold tracking-[.14em] text-[#a78bfa]'>PULSE PRO</span>
            <span className='rounded-full border border-[rgba(34,211,238,.25)] bg-[rgba(34,211,238,.1)] px-2.5 py-1 text-[10px] font-semibold text-[#22d3ee]'>Mais popular</span>
          </div>
          <div className='mb-1.5 flex items-baseline gap-1.5'>
            <b className='text-[40px] font-bold tracking-[-.02em] text-[#fafafa]'>R$ 49</b>
            <span className='text-sm text-[#71717a]'>/mês</span>
          </div>
          <p className='mb-5 text-[13px] text-[#a1a1aa]'>Para times que precisam de velocidade e controle total.</p>
          <ul className='mb-6 flex flex-col gap-3'>
            {recursos.map((r) => (
              <li key={r} className='flex items-center gap-2.5 text-[13px] text-[#d4d4d8]'>
                <span className='flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-[rgba(139,92,246,.15)] text-[11px] text-[#a78bfa]'>✓</span>
                {r}
              </li>
            ))}
          </ul>
          <button className='w-full cursor-pointer rounded-xl border-0 bg-gradient-to-br from-[#8b5cf6] to-[#6366f1] p-3 text-center text-sm font-semibold text-white'>Assinar agora</button>
        </div>
      </div>
    </div>
  );
}
