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
import { ILogin, ISignUp } from "../types";
import { data, Link, useNavigate } from "react-router-dom";
import { title } from "process";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userLogin, userSignUp } from "../api";

const SignUp = () => {
  const [show, setShow] = React.useState(false);
  const nav = useNavigate();
  const handleClick = () => setShow(!show);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignUp>();

  const toast = useToast();

  const mutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: () => {
      toast({
        title: "회원가입",
        description: "회원가입 되셨습니다.",
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
        description: "회원가입에 실패하였습니다.",
        status: "error",
      });
    },
  });

  const onSingUpSubmit = (data: ISignUp) => {
    console.log(data);
    mutation.mutate(data);
  };

  return (
    <Box
      onSubmit={handleSubmit(onSingUpSubmit)}
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
        Sign Up
      </Text>

      <Box
        as="form"
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        padding={"0 40px"}
      >
        <Box marginBottom={"30px"}>
          <Input
            {...register("username", {
              required: "아이디는 필수 입니다",
            })}
            placeholder="Enter ID"
            marginBottom={"20px"}
          />
          {errors.username?.message}
          <Input
            {...register("name", {
              required: "유저네임는 필수 입니다",
            })}
            placeholder="Enter Username"
            marginBottom={"20px"}
          />
          {errors.name?.message}
          <Input
            {...register("email", {
              required: "이메일은 필수 입니다",
            })}
            placeholder="Enter Email"
            marginBottom={"20px"}
          />
          {errors.email?.message}

          <Box>
            <InputGroup size="md" marginBottom={"10px"}>
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

            {/* <InputGroup size="md">
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
            </InputGroup> */}
          </Box>
        </Box>
        <Button
          type="submit"
          bgColor={"#000"}
          color={"#fff"}
          colorScheme="green"
        >
          Sign Up
        </Button>
        <Link to={"/login"}>
          <Text
            marginTop={"5px"}
            fontSize={"14px"}
            _hover={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Click here for Login
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default SignUp;
