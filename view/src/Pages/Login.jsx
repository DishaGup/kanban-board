import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserRequest } from "../Redux/action";
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
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const initialFormData = {
  email: "",
  password: "",
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const navigate = useNavigate();
  const toast = useToast();
  const { error } = useSelector((store) => store.reducer);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUserRequest(formData));
      toast({
        title: "Login Successful",
        description: `Welcome ${formData.email}`,
        position: "top",
        status: "success",
        variant: "top-accent",
        duration: 2000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      toast({
        title: "Wrong Credentials",
        position: "top-right",
        status: "error",
        variant: "top-accent",
        duration: 2000,
        isClosable: true,
      });
    }
    setFormData(initialFormData);
  };

  return (
    <Box height="100vh" padding="20px">
      <Box
        margin="80px auto"
        backgroundColor="white"
        width={{ sm: "90vw", md: "80vw", lg: "40vw" }}
        borderRadius="5px"
        boxShadow="md"
        padding="20px"
        border="2px solid #76FF03"
      >
        <Center mb="10px">
          <Text
            textDecoration="underline"
            as="h2"
            fontWeight="500"
            fontSize="1.5rem"
          >
            Login
          </Text>
        </Center>

        <form onSubmit={handleSubmit}>
          <Flex
            flexDirection="column"
            gap={{ base: "10px", lg: "20px" }}
            padding={{ sm: "30px", md: "50px", lg: "40px" }}
          >
            <FormControl isRequired>
              <SimpleGrid
                margin="auto"
                gridTemplateColumns={{ base: "1fr", sm: "repeat(2,1fr)" }}
                alignItems="center"
              >
                <FormLabel>
                  <Text as="span">Email</Text>
                </FormLabel>
                <Input
                  border="1px dotted gray"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                />
              </SimpleGrid>
            </FormControl>

            <FormControl isRequired>
              <SimpleGrid
                gridTemplateColumns={{ base: "1fr", sm: "repeat(2,1fr)" }}
                alignItems="center"
              >
                <FormLabel>
                  <Text as="span">Password</Text>
                </FormLabel>
                <HStack>
                  <Input
                    name="password"
                    border="1px dotted gray"
                    placeholder="Type Password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                  />
                  <Button onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </Button>
                </HStack>
              </SimpleGrid>
            </FormControl>

            <FormControl>
              <Stack width="50%" margin="auto" spacing={10} mt="30px" pt={2}>
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  border="1px solid #7CB342"
                  color="#76FF03"
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
                <Link style={{ textDecoration: "underline" }} to="/register">
                  Register
                </Link>
              </Text>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};
