import { useEffect } from "react";

export function AntiCloneShield() {
  useEffect(() => {
    // 1. Mensagem de aviso de direitos autorais no console
    const bannerStyleTitle = "color: #970202; font-size: 26px; font-weight: 900; text-shadow: 0 0 10px rgba(151,2,2,0.8);";
    const bannerStyleBody = "color: #e2e8f0; font-size: 13px; font-family: monospace; line-height: 1.6;";
    
    console.log("%c🛑 ACESSO RESTRITO // DEZPILA SECURITY", bannerStyleTitle);
    console.log(
      "%cEste sistema, código, design e marca são protegidos por direitos autorais e propriedade intelectual.\nA cópia, clonagem, scraping ou engenharia reversa não autorizada acarretará em medidas judiciais.",
      bannerStyleBody
    );

    // 2. Bloqueio de atalhos de teclado de inspeção (F12, Ctrl+U, Ctrl+Shift+I/J/C, Ctrl+S)
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl + Shift + I / J / C (DevTools & Console) ou Cmd + Option + I / J / C no Mac
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ["I", "i", "J", "j", "C", "c"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl + U (Ver Código Fonte) ou Cmd + Option + U
      if ((e.ctrlKey || e.metaKey) && ["U", "u"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Ctrl + S (Salvar Página HTML)
      if ((e.ctrlKey || e.metaKey) && ["S", "s"].includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // 3. Prevenção de clique com botão direito em elementos visuais (permitindo inputs e botões de cópia)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      // Permite botão direito somente se for campo de texto editável
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }
      e.preventDefault();
    };

    // 4. Prevenção de arrastar imagens e conteúdos
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // 5. Monitor de DevTools
    let devtoolsOpen = false;
    const threshold = 160;
    const checkDevTools = () => {
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;
      if (widthDiff || heightDiff) {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          console.clear();
          console.log("%c🛑 DEZPILA // PROTEÇÃO ATIVA", bannerStyleTitle);
        }
      } else {
        devtoolsOpen = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("dragstart", handleDragStart);
    const interval = setInterval(checkDevTools, 1500);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("dragstart", handleDragStart);
      clearInterval(interval);
    };
  }, []);

  return null;
}
