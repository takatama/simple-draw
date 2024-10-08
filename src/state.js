export const createState = ({
  elements,
  actions,
  pencilColor,
  bgColor,
  thickness,
  eraserSize,
}) => {
  const { bgCanvas, fgCanvas } = elements;
  const { applyUndo, clearCanvas } = actions;

  const state = {
    pencilColor,
    bgColor,
    thickness,
    eraserSize,
    undoStack: [],
    mode: null,
  };

  state.save = () => {
    const stateSnapshot = {
      background: bgCanvas.toDataURL(),
      drawing: fgCanvas.toDataURL(),
      pencilColor: state.pencilColor,
      bgColor: state.bgColor,
    };
    state.undoStack.push(stateSnapshot);
  };

  state.undo = () => {
    if (state.undoStack.length > 0) {
      const lastState = state.undoStack.pop();
      state.pencilColor = lastState.pencilColor;
      state.bgColor = lastState.bgColor;
      applyUndo(state, lastState);
    }
  };

  state.clearCanvas = () => {
    clearCanvas(state.bgColor);
    state.undoStack = [];
  };

  return state;
};
