const requireTheme = (theme: "dark" | "light") => {
  switch (theme) {
    case "light":
      require("rsuite/dist/styles/rsuite-default.css");
      break;
    case "dark":
    default:
      require("rsuite/dist/styles/rsuite-dark.css");
      break;
  }
};

export default requireTheme;
