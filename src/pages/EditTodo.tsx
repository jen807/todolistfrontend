import { Box, Button, Input, Text, Textarea, useToast } from "@chakra-ui/react";
import Container from "../components/Container";
import Header from "../components/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ITodoEditValid, ITodos } from "../types";
import { editTodo, getTodoDetail } from "../api";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import dayjs from "dayjs";

export const EditTodo = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<ITodos>({
    queryKey: ["detail", id],
    queryFn: getTodoDetail,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ITodoEditValid>();

  const date = dayjs(data?.date);
  const year = date.year();
  const month = date.month() + 1;
  const day = date.date();

  useEffect(() => {
    if (data) {
      setValue("title", data?.title);
      setValue("payload", data?.title);
      setValue(
        "date",
        `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
          2,
          "0"
        )}`
      );
    }
  }, [data, setValue, year, month, day]);

  const toast = useToast();
  const nav = useNavigate();

  const mutation = useMutation({
    mutationFn: editTodo,
    onSuccess: () => {
      toast({
        title: "수정",
        description: "수정하였습니다.",
        status: "success",
      });
      nav(`/detail/${id}`);
    },
    onError: () => {
      toast({
        title: "에러",
        description: "수정할 수 없습니다.",
        status: "error",
      });
    },
  });

  const onSubmit = (data: ITodoEditValid) => {
    const { date, payload, title } = data;
    mutation.mutate({
      id: Number(id),
      date,
      payload,
      title,
    });
  };

  const location = useLocation();

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
        <Text fontSize={"30px"} fontWeight={"700"} mb={"30px"}>
          Edit Todo
        </Text>
        <Box onSubmit={handleSubmit(onSubmit)} as="form">
          <Input
            {...register("title", {
              required: false,
            })}
          />

          <Textarea
            {...register("payload", {
              required: false,
            })}
            mt={5}
          />

          <Input
            {...register("date", {
              required: false,
            })}
            mt={"5"}
            type="date"
          />

          <Button mt={"5"} type="submit">
            수정하기
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
