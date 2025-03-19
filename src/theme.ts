import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: {
    "html, body": {
      color: "gray.800",
      lineHeight: "tall",
      letterSpacing: "-1px",
      backgroundColor: "#eee",
    },
    a: {
      color: "gray.800",
    },
  },
};

const theme = extendTheme({ styles });

export default theme;
