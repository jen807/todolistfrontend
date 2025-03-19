import { Box } from "@chakra-ui/react";
import Header from "../components/Header";

const Home = () => {
  return (
    <Box
      maxW={"450px"}
      w={"100%"}
      margin={"0 auto"}
      bgColor={"white"}
      minH={"100vh"}
      h={"100%"}
    >
      <Header />
    </Box>
  );
};

export default Home;
