import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IChildren {
  children: ReactNode;
}

const Container = ({ children }: IChildren) => {
  return (
    <Box px={"20px"} pt={"30px"}>
      {children}
    </Box>
  );
};

export default Container;
