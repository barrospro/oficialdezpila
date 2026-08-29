import { useState } from "react";
import { Mail, Eye, EyeOff, Check } from "lucide-react";

export function FormLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [lembrar, setLembrar] = useState(true);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mx-auto w-full max-w-sm rounded-3xl border border-white/[0.07] bg-gradient-to-b from-[#14161f] to-[#0e0f17] p-9 shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
    >
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-xl font-extrabold text-white shadow-[0_8px_20px_rgba(99,102,241,0.4)]">
        P
      </div>
      <h1 className="mb-1.5 text-2xl font-extrabold tracking-tight text-slate-100">
        Bem-vindo de volta
      </h1>
      <p className="mb-7 text-sm text-slate-400">
        Entre na sua conta para continuar criando.
      </p>

      <label className="mb-2 ml-0.5 block text-[12.5px] font-semibold text-slate-300">
        E-mail
      </label>
      <div className="relative mb-[18px]">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="voce@empresa.com"
          className="w-full rounded-xl border-[1.5px] border-indigo-300/20 bg-white/[0.04] py-3.5 pl-4 pr-11 text-sm text-slate-100 outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.14)]"
        />
        <Mail className="absolute right-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-500" />
      </div>

      <label className="mb-2 ml-0.5 block text-[12.5px] font-semibold text-slate-300">
        Senha
      </label>
      <div className="relative mb-[18px]">
        <input
          type={verSenha ? "text" : "password"}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Sua senha"
          className="w-full rounded-xl border-[1.5px] border-indigo-300/20 bg-white/[0.04] py-3.5 pl-4 pr-11 text-sm text-slate-100 outline-none focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.14)]"
        />
        <button
          type="button"
          onClick={() => setVerSenha((v) => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
          aria-label={verSenha ? "Ocultar senha" : "Mostrar senha"}
        >
          {verSenha ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
        </button>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setLembrar((v) => !v)}
          className="flex items-center gap-2.5 text-[13px] text-slate-400"
        >
          <span
            className={
              "flex h-[18px] w-[18px] items-center justify-center rounded-md border-[1.5px] transition-colors " +
              (lembrar
                ? "border-indigo-400 bg-indigo-500 text-white"
                : "border-indigo-300/30 bg-indigo-500/10 text-transparent")
            }
          >
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
          Lembrar de mim
        </button>
        <a href="#" className="text-[13px] font-semibold text-indigo-300 hover:text-indigo-200">
          Esqueci a senha
        </a>
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 py-4 text-[15px] font-bold text-white shadow-[0_10px_26px_rgba(99,102,241,0.35)] transition-transform hover:-translate-y-0.5"
      >
        Entrar
      </button>

      <p className="mt-6 text-center text-[13px] text-slate-400">
        Não tem conta?{" "}
        <a href="#" className="font-semibold text-violet-300 hover:text-violet-200">
          Criar agora
        </a>
      </p>
    </form>
  );
}
