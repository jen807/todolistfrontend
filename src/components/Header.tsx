import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useUser from "../lib/useUser";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { userLogout } from "../api";
import { useToast } from "@chakra-ui/react";

const Header = () => {
  const { user, isLoading, isLoggedIn } = useUser();
  const toast = useToast();

  const mutation = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      toast({
        title: "로그아웃",
        description: "로그아웃 하였습니다",
        status: "success",
      });
    },
    onError: () => {
      toast({
        title: "실패",
        description: "로그아웃에 실패 하였습니다",
        status: "error",
      });
    },
  });

  const onClickLogout = () => {
    mutation.mutate();
  };
  console.log(user);
  return (
    <HStack
      h={"60px"}
      borderBottom={"1px solid #eee"}
      justifyContent={"space-between"}
      px={"20px"}
    >
      <Text fontSize={"18px"} fontWeight={"700"}>
        <Link to={"/"}>TODO</Link>
      </Text>
      <Box>
        <Menu>
          <MenuButton>
            <Avatar name={user?.username} w={"35px"} h={"35px"} />
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link to={"/"}>Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to={"#"}>Edit</Link>
            </MenuItem>
            <MenuItem onClick={onClickLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </HStack>
  );
};

export default Header;
