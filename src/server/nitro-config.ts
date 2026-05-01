// Constantes compartilhadas entre cliente e servidor para o fluxo de Pix.
// Mantidas em arquivo neutro (sem .server) para que o frontend possa importar
// sem violar o import-protection do TanStack.
export const PIX_TIMEOUT_MS = 20 * 60 * 1000; // 20 minutos