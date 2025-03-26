import React from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  Text,
  Image,
  useToast,
} from "@chakra-ui/react";
import logo from "../imgs/logo.png";
import { useForm } from "react-hook-form";
import { ILogin } from "../types";
import { data, useNavigate } from "react-router-dom";
import { title } from "process";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogin } from "../api";

const Login = () => {
  const [show, setShow] = React.useState(false);
  const nav = useNavigate();
  const handleClick = () => setShow(!show);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ILogin>();

  const toast = useToast();

  const mutation = useMutation({
    mutationFn: userLogin,
    onSuccess: () => {
      toast({
        title: "로그인",
        description: "로그인하였습니다.",
        status: "success",
      });

      queryClient.refetchQueries({
        queryKey: ["me"],
      });

      nav("/");
    },
    onError: () => {
      toast({
        title: "에러",
        description: "로그인에 실패하였습니다.",
        status: "error",
      });
    },
  });

  const onLoginSubmit = (data: ILogin) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <Box
      onSubmit={handleSubmit(onLoginSubmit)}
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

      <Box as="form" display={"flex"} flexDirection={"column"}>
        <Box marginBottom={"30px"}>
          <Input
            {...register("username", {
              required: "아이디는 필수 입니다",
            })}
            placeholder="ID"
            marginBottom={"10px"}
          />
          {errors.username?.message}

          <InputGroup size="md">
            <Input
              {...register("password", {
                required: "패스워드는 필수 입니다",
              })}
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
        <Button
          type="submit"
          bgColor={"#000"}
          color={"#fff"}
          colorScheme="green"
        >
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
