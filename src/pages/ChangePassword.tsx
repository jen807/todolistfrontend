import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../api";
import { IChangePassword } from "../types";

const ChangePassword = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IChangePassword>();

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast({
        title: "비밀번호 변경 완료",
        description: "다시 로그인 해주세요!",
        status: "success",
      });
      navigate("/login");
    },
    onError: () => {
      toast({
        title: "오류",
        description: "비밀번호를 다시 확인해주세요",
        status: "error",
      });
    },
  });

  const onSubmit = (data: IChangePassword) => {
    mutation.mutate(data);
  };
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

      <VStack as="form" p="20px" onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>현재 비밀번호</FormLabel>
          <Input
            type="password"
            {...register("current_password", { required: true })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>새 비밀번호</FormLabel>
          <Input
            type="password"
            {...register("new_password", { required: true })}
          />
        </FormControl>
        <Button type="submit" mt="20px" colorScheme="green" w="100%">
          비밀번호 변경
        </Button>
      </VStack>
    </Box>
  );
};

export default ChangePassword;
