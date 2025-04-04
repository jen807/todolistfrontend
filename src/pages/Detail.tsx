import { Box, Button, Text, useToast } from "@chakra-ui/react";
import Container from "../components/Container";
import Header from "../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ITodoEditValid, ITodos } from "../types";
import { getTodoDetail } from "../api";

const Detail = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery<ITodos>({
    queryKey: ["detail", id],
    queryFn: getTodoDetail,
  });

  // console.log(data);

  const nav = useNavigate();
  const toast = useToast();

  const mutation = useMutation({
    onSuccess: () => {
      toast({
        title: "삭제",
        description: "삭제되었습니다.",
        status: "success",
      });
      nav("/");
    },
    onError: () => {
      toast({
        title: "에러",
        description: "삭제에 실패하였습니다.",
        status: "error",
      });
    },
  });

  const onClickDelete = () => {
    mutation.mutate({ id: Number(id) });
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

      {!isLoading ? (
        <>
          <Container>
            <Text>{data?.title}</Text>
            <Text>{data?.payload}</Text>
          </Container>

          <Link to={`/detail/${id}/edit`} state={"good"}>
            <Button>수정하기</Button>
          </Link>

          <Button onClick={onClickDelete}>삭제하기</Button>
        </>
      ) : (
        "loading"
      )}
    </Box>
  );
};

export default Detail;
