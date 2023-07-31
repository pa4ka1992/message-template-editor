export const splitNodeText = (node: HTMLTextAreaElement) => {
  const cursorPosition = node?.selectionStart;
  const currentText = node?.value;
  const startText = currentText?.slice(0, cursorPosition);
  const endText = currentText?.slice(cursorPosition);

  return { startText, endText, cursorPosition };
};
