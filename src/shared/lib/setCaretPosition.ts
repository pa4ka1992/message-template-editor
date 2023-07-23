export const setCaretPosition = (pos: number, ctrl?: HTMLTextAreaElement) => {
  if (ctrl) {
    ctrl.focus();
    ctrl.setSelectionRange(pos, pos);
  }
};
