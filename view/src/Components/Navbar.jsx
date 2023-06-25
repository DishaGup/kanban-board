import {
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
  Stack,
  HStack,
  IconButton,
  Button,
} from "@chakra-ui/react";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { USER_LOGOUT_SUCCESS } from "../Redux/actionTypes";

import { FcSearch, FcUnlock, FcLock } from "react-icons/fc";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";
import { searchTaskInfo } from "../Redux/action";
import SearchBarResults from "./SearchBarResults";

export const Navbar = () => {
  const toast = useToast();
  const { userDetails, token, TaskData } = useSelector(
    (store) => store.reducer
  );
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTask, setSearchTask] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const defaultLinkStyle = { color: "black" };
  const activeLinkStyle = {
    color: "#2E7D32",
    textDecoration: "underline",
    fontWeight: "500",
  };

  const handleSearch = (e) => {
    setSearchTask(e.target.value);
  };

  const debouncedSearch = debounce((query) => {

if(!token || token =="") {
return   setTimeout(() => {
  toast({
    title: "Please Login",
    description:"token not found",
    status: "info",
    duration: 3000,
    isClosable: true,
  });
}, 2000);
}


    if (query === "" || query.length < 2) {
      setTimeout(() => {
        toast({
          title: "Minimum 3 characters required",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
      }, 2000);
      setSearchResults([]);
    } else {
      let res = dispatch(searchTaskInfo(query, TaskData));
      setSearchResults(res);
    }
  }, 500);

  useEffect(() => {
    debouncedSearch(searchTask);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTask]);

  //console.log(searchResults)
  return (
    <>
      <Flex
        width={"100%"}
        margin={"auto"}
        justifyContent={"space-around"}
        alignItems={"center"}
        bg={"#B2FF59"}
        padding={"10px"}
        borderBottom={"2px solid #388E3C"}
      >
        <Menu display={{ base: "block", lg: "none" }} color="black">
          <MenuButton
            as={IconButton}
            icon={<GiHamburgerMenu />}
            transition="all 0.2s"
            borderRadius="md"
            border="1px solid black"
            fontSize={"20px"}
            p={2}
            bg="0 0"
            _hover={{ bg: "0 0" }}
            align="center"
            display={{ base: "block", lg: "none" }}
          ></MenuButton>
          <MenuList align="left" ml="5px" pl="14px" fontSize={"18px"}>
            {token && token != "" ? (
              <MenuItem
                onClick={() => {
                  toast({
                    title: "Logged Out Successfully",
                    position: "top",
                    description: "Redirecting to  Home Page....",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                  });
                  dispatch({ type: USER_LOGOUT_SUCCESS });
                  navigate("/login");
                }}
                icon={<FcUnlock />}
              >
                <Text>Log Out</Text>
              </MenuItem>
            ) : (
              <NavLink
                to={"/login"}
                style={({ isActive }) => {
                  return isActive ? activeLinkStyle : defaultLinkStyle;
                }}
                end
              >
                {" "}
                <MenuItem icon={<FcUnlock />}>
                  <Text>Log In</Text>
                </MenuItem>
              </NavLink>
            )}

          { !token && token !="" &&   <NavLink
              to={"/register"}
              style={({ isActive }) => {
                return isActive ? activeLinkStyle : defaultLinkStyle;
              }}
              end
            >
              {" "}
              <MenuItem icon={<FcLock />}>
                <Text>Sign Up</Text>{" "}
              </MenuItem>
            </NavLink>

          }
          </MenuList>
        </Menu>

        <NavLink
          to={"/"}
          style={({ isActive }) => {
            return isActive ? activeLinkStyle : defaultLinkStyle;
          }}
          end
        >
          <Text fontSize={"1.3rem"}>Board</Text>
        </NavLink>
      {
        !token && token == "" &&   <NavLink
        to={"/register"}
        style={({ isActive }) => {
          return isActive ? activeLinkStyle : defaultLinkStyle;
        }}
        end
      >
        <Text display={{ base: "none", lg: "block" }} fontSize={"1.3rem"}>
          Sign Up
        </Text>
      </NavLink>

      }
        {/* ) : ( */}

        {token && token != "" ? (
          <Button
            onClick={() => {
              toast({
                title: "Logged Out Successfully",
                position: "top",
                description: "Redirecting to  Home Page....",
                status: "success",
                duration: 4000,
                isClosable: true,
              });
              dispatch({ type: USER_LOGOUT_SUCCESS });
              navigate("/login");
            }}
            //  icon={<FcUnlock />}
          >
            <Text>Log Out</Text>
          </Button>
        ) : (
          <NavLink
            display={{ base: "none", lg: "block" }}
            to={"/login"}
            style={({ isActive }) => {
              return isActive ? activeLinkStyle : defaultLinkStyle;
            }}
            end
          >
            <Text display={{ base: "none", lg: "block" }} fontSize={"1.3rem"}>
              Login
            </Text>
          </NavLink>
        )}
        <HStack>
          <Input
            type="search"
            minLength={3}
            border='2px solid white'
            _placeholder={{ color: "white" }}
            onChange={handleSearch}
            placeholder="Search..."
          />
        </HStack>
      </Flex>

      {searchResults && searchResults.length >= 1 && (
        <SearchBarResults data={searchResults} />
      )}
    </>
  );
};
