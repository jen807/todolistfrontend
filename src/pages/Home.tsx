import {
  Box,
  Button,
  HStack,
  Input,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Header from "../components/Header";
import Container from "../components/Container";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ICreateTodo, ITodos } from "../types";
import { createTodo, getTodos } from "../api";
import TimeCounting from "time-counting";
import { Link, useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { title } from "process";

const Home = () => {
  const { data, isLoading } = useQuery<ITodos[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // const todos = data?.reverse();

  // console.log(data);
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateTodo>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      toast({
        title: "등록",
        description: "할일 등록",
        status: "success",
      });
      queryClient.refetchQueries({
        queryKey: ["todos"],
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "실패",
        description: "등록 실패",
        status: "error",
      });
    },
  });

  const onSubmit = (data: ICreateTodo) => {
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

      <Container>
        <VStack
          mb={"30px"}
          color={"gray.700"}
          fontSize={"30px"}
          fontWeight={"700"}
          alignItems={"flex-start"}
          spacing={"-1.5"}
        >
          <Box>Hi, There!</Box>
          <Box>What to do?</Box>
        </VStack>

        {!isLoading ? (
          <Box>
            {data?.map((todo) => (
              <Box key={todo.id} borderBottomWidth={1} p={"15px"}>
                <Link to={`/detail/${todo.id}`}>
                  <HStack
                    fontWeight={"700"}
                    fontSize={"18px"}
                    justifyContent={"space-between"}
                  >
                    <Text>{todo.title}</Text>
                    {/* <BsThreeDotsVertical /> */}
                  </HStack>

                  <Text
                    color={"gray.400"}
                    noOfLines={2}
                    fontSize={"14px"}
                    mt={"5px"}
                  >
                    {todo.payload}
                  </Text>

                  <Text fontSize={"sm"} color={"green.400"} mt={"10px"}>
                    {TimeCounting(todo.created_at, { lang: "ko" })}
                  </Text>
                </Link>
              </Box>
            ))}
          </Box>
        ) : (
          "loading"
        )}

        <Box
          onClick={onOpen}
          pos={"fixed"}
          bottom={"100px"}
          left={"50%"}
          transform={"translateX(-50%)"}
          rounded={"full"}
          bgColor={"green.300"}
          w={"60px"}
          h={"60px"}
          color={"white"}
          fontSize={"30px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          +
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>할일을 등록하세요!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box as="form" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  {...register("title", {
                    required: "필수입니다.",
                  })}
                  placeholder="제목을 적어주세요"
                />
                <Textarea
                  {...register("payload", {
                    required: "필수입니다.",
                  })}
                  mt={"10px"}
                  placeholder="내용을 입력해주세요"
                />
                <Input
                  {...register("date", {
                    required: "필수입니다.",
                  })}
                  type="date"
                  mt={"10px"}
                />
                <ModalFooter transform={"translateX(25px)"}>
                  <Button colorScheme="gray" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button type={"submit"} bgColor={"green.300"}>
                    등록하기
                  </Button>
                </ModalFooter>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </Box>
  );
};

export default Home;
