export function emitTest() {
  console.log('hit the test action');
  return { type: 'EMIT_TEST' }
};
