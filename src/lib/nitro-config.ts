// Constantes compartilhadas entre cliente e servidor para o fluxo de Pix.
// Mantidas em arquivo neutro para que o frontend possa importar sem violar
// a proteção de imports do TanStack.
export const PIX_TIMEOUT_MS = 20 * 60 * 1000; // 20 minutos