import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import Header from "../components/Header";
import Container from "../components/Container";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { ITodos } from "../types";
import { getTodos } from "../api";
import TimeCounting from "time-counting";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isLoading } = useQuery<ITodos[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // console.log(data);

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
      </Container>
    </Box>
  );
};

export default Home;
