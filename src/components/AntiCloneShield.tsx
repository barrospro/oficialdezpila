import { useEffect } from "react";

export function AntiCloneShield() {
  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      // 1. Mensagem de aviso de direitos autorais no console
      const bannerStyleTitle = "color: #970202; font-size: 22px; font-weight: 900;";
      const bannerStyleBody = "color: #e2e8f0; font-size: 12px; font-family: monospace;";
      
      console.log("%c🛑 ACESSO RESTRITO // DEZPILA SECURITY", bannerStyleTitle);
      console.log(
        "%cEste sistema, código, design e marca são protegidos por direitos autorais.\nA cópia ou engenharia reversa não autorizada acarretará em medidas legais.",
        bannerStyleBody
      );

      // Em dispositivos móveis ou telas pequenas (< 1024px), não intercepta atalhos de teclado nem menu de contexto
      const isMobile = window.innerWidth < 1024 || "ontouchstart" in window;
      if (isMobile) {
        return;
      }

      // 2. Bloqueio de atalhos de teclado de inspeção (Apenas Desktop)
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

      // 3. Prevenção de clique com botão direito em elementos visuais no Desktop
      const handleContextMenu = (e: MouseEvent) => {
        const target = e.target as HTMLElement | null;
        if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
          return;
        }
        e.preventDefault();
      };

      // 4. Prevenção de arrastar imagens no Desktop
      const handleDragStart = (e: DragEvent) => {
        e.preventDefault();
      };

      window.addEventListener("keydown", handleKeyDown, { capture: true });
      window.addEventListener("contextmenu", handleContextMenu);
      window.addEventListener("dragstart", handleDragStart);

      return () => {
        window.removeEventListener("keydown", handleKeyDown, { capture: true });
        window.removeEventListener("contextmenu", handleContextMenu);
        window.removeEventListener("dragstart", handleDragStart);
      };
    } catch {
      // Ignora silenciosamente quaisquer restrições de ambiente
    }
  }, []);

  return null;
}
