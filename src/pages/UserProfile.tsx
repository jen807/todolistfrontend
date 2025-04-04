import {
  Avatar,
  Box,
  Button,
  Heading,
  HStack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoLockClosedSharp } from "react-icons/io5";
import { CgLogOut } from "react-icons/cg";
import Header from "../components/Header";
import useUser from "../lib/useUser";

const UserProfile = () => {
  const { user } = useUser();

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
      <Box px={"20px"} pt={"50px"}>
        <HStack borderBottomWidth={1} pb={"30px"}>
          <Avatar src={"#"} name={user?.username} size={"2xl"} />
          <Box ml={"30px"}>
            <Heading color={"gray.800"}>{user?.username}</Heading>
            <Text color={"gray.400"}>{user?.email}</Text>

            <Link to={`/profile/edit`}>
              <Button colorScheme="green" mt={"15px"}>
                Edit Profile
              </Button>
            </Link>
          </Box>
        </HStack>

        <VStack
          alignItems={"flex-start"}
          mt={"30px"}
          bgColor={"gray.100"}
          rounded={"md"}
          px={"5px"}
          py={"10px"}
        >
          <HStack
            w="100%"
            justifyContent={"space-between"}
            align={"center"}
            py={"3px"}
            cursor={"pointer"}
            borderBottomWidth={1}
          >
            <Tag mb={"7px"}>
              <Box fontSize={"20px"} color={"gray.500"}>
                {/* <IoLockClosedSharp /> */}
              </Box>
              <Text mt={"4px"} ml={"5px"} fontSize={"16px"} color={"gray.600"}>
                <Link to={"change-password/"}>비밀번호 변경</Link>
              </Text>
            </Tag>
            <Box>{/* <IoIosArrowForward /> */}</Box>
          </HStack>

          <HStack
            w="100%"
            justifyContent={"space-between"}
            align={"center"}
            py={"3px"}
            cursor={"pointer"}
          >
            <Tag>
              <Box fontSize={"20px"} color={"red.600"}>
                {/* <CgLogOut /> */}
              </Box>
              <Text ml={"5px"} fontSize={"16px"} color={"gray.600"}>
                로그아웃
              </Text>
            </Tag>
            <Box>{/* <IoIosArrowForward /> */}</Box>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default UserProfile;
