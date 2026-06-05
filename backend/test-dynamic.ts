async function main() {
  const m = await import('@muzammil328/services');
  console.log('broadcastExcept:', typeof m.broadcastExcept);
  console.log('emitToAll:', typeof m.emitToAll);
}
main();
