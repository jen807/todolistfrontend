import React from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import logo from "../imgs/logo.png";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box
      maxW={"450px"}
      w={"100%"}
      margin={"0 auto"}
      bgColor={"white"}
      minH={"100vh"}
      h={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={"70px"}
    >
      <Text fontSize={"55px"} fontWeight={"bold"}>
        Login
      </Text>
      <Image src={logo} alt="Logo" w={"35%"} h={"35%"} />

      <Box display={"flex"} flexDirection={"column"}>
        <Box marginBottom={"30px"}>
          <Input placeholder="ID" marginBottom={"10px"} />

          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Button bgColor={"#000"} color={"#fff"} colorScheme="green">
          Login
        </Button>
        <Text marginTop={"5px"} fontSize={"14px"}>
          Click here for sign up
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
