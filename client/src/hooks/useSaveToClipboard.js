const useSaveToClipBoard = async (value) => {
  if (navigator.clipboard && value) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (error) {
      return error;
    }
  } else {
    return false;
  }
};

export default useSaveToClipBoard;
