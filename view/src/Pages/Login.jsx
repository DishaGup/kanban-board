import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  Box,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  Flex,
  HStack,
  Text,
  Center,
  useToast,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserRequest } from "../Redux/action";

const initial = {
  email: "",
  password: "",
};

export const Login = () => {
  const [showpass1, setShowpass1] = useState(false);
  const [formData, setFormData] = useState(initial);
  let [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { error, token } = useSelector((store) => store.reducer);
  console.log(error);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUserRequest(formData))
      .then((res) => {
        if (res && res.data && res.data.message === "Login Successful") {
          toast({
            title: "Login Successful",
            description: `Welcome ${res.data.message}`,
            position: "top",
            status: "success",
            variant: "top-accent",
            duration: 2000,
            isClosable: true,
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          toast({
            title: "Wrong Credentials",
            position: "top-right",
            status: "error",
            variant: "top-accent",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Server Error",
          position: "top-right",
          status: "error",
          variant: "top-accent",
          duration: 2000,
          isClosable: true,
        });
      });
    // console.log(formData)
    setFormData(initial);
  };
  return (
    <Box height={"100vh"} padding={"20px"}>
      <Box
        margin={"80px auto"}
        backgroundColor={"white"}
        width={{ sm: "90vw", md: "80vw", lg: "40vw" }}
        borderRadius={"5px"}
        boxShadow={"md"}
        padding={"20px"}
        border={"2px solid #76FF03"}
      >
        <Center mb="10px">
          <Text
            textDecoration={"underline"}
            as={"h2"}
            fontWeight={"500"}
            fontSize={"1.5rem"}
          >
            Login
          </Text>
        </Center>

        <form onSubmit={handleSubmit}>
          <Flex
            flexDirection={"column"}
            gap={{ base: "10px", lg: "20px" }}
            padding={{ sm: "30px", md: "50px", lg: "40px" }}
          >
            <FormControl isRequired>
              <SimpleGrid
                margin={"auto"}
                gridTemplateColumns={{ base: "1fr", sm: "repeat(2,1fr)" }}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Email</Text>
                </FormLabel>
                <Input
                  border={"1px dotted gray"}
                  type={"email"}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={"Enter Your Email"}
                ></Input>
              </SimpleGrid>
            </FormControl>

            <FormControl isRequired>
              <SimpleGrid
                gridTemplateColumns={{ base: "1fr", sm: "repeat(2,1fr)" }}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Password</Text>
                </FormLabel>
                <HStack>
                  <Input
                    name="password"
                    border={"1px dotted gray"}
                    placeholder="Type Password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showpass1 ? "text" : "password"}
                  ></Input>
                  <Button onClick={() => setShowpass1((prev) => !prev)}>
                    {showpass1 ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </Button>
                </HStack>
              </SimpleGrid>
            </FormControl>

            <FormControl>
              <Stack
                width={"50%"}
                margin={"auto"}
                spacing={10}
                mt={"30px"}
                pt={2}
              >
                <Button
                  type={"submit"}
                  variant="outline"
                  size="lg"
                  border={"1px solid #7CB342"}
                  color={"#76FF03"}
                  borderRadius="5px"
                  _hover={{
                    bg: "#7CB342",
                    color: "white",
                  }}
                >
                  Login
                </Button>
              </Stack>
            </FormControl>
            <Box>
              <Text>
                Don't have an account?{" "}
                <Link style={{ textDecoration: "underline" }} to={"/register"}>
                  Register{" "}
                </Link>
              </Text>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};
