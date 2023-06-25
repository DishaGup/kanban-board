import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcCheckmark, FcCancel } from "react-icons/fc";
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
  FormHelperText,
  FormErrorMessage,
  useToast,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserRequest } from "../Redux/action";
const initialState = {
  password: "",
  email: "",
  confirmpassword: "",
};
export const Register = () => {
  const [formData, setData] = useState(initialState);
  const [showpass1, setShowpass1] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();

 const { token, TaskData, loading, error, SingleTaskData } = useSelector(
    (store) => store.reducer
  );
  //making an object from input values
  const handleChange = (e) => {
    let { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //passing formData to Database

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmpassword) {
      return toast({
        title: "Error in Creating Your Account",
        description: "Password doesn't match",
        position: "top",
        status: "error",
        variant: "top-accent",
        duration: 4000,
        isClosable: true,
      });
    }

    dispatch(registerUserRequest(formData))
      .then((res) => {
       
        toast({
          title: `${res.data.message}`,
          position: "top",
          description: "We've created Account for you.",
          status: "success",
          variant: "top-accent",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      })
      .catch((err) =>{
    
        toast({
          title: "Error in Creating Your Account",
          position: "top",
          status: "error",
          variant: "top-accent",
          duration: 3000,
          isClosable: true,
        })}
      );
   

    setData(initialState);
  };

  return (
    <Box padding={"20px"}>
      <Box
  
        margin={"auto"}
        mt={{ sm: "5%", md: "5%", lg: "3%" }}
        width={{ sm: "90vw", md: "80vw", lg: "45vw" }}
        borderRadius={"5px"}
        boxShadow={"md"}
        backgroundColor={"white"}
        border={"2px solid #76FF03"}
        p='15px'
      >
        <Center mt={"20px"}>
          <Text as={"h2"} fontWeight={"500"} fontSize={"1.5rem"}>
            Create New Account
          </Text>
        </Center>

        <form onSubmit={handleSubmit}>
          <Flex
            flexDirection={"column"}
            gap={{base:'10px',lg:"20px"}}
            padding={{ sm: "50px", md: "50px", lg: "40px" }}
          >
     

            <FormControl isRequired>
              <SimpleGrid
                 gridTemplateColumns={{base:'1fr',sm:"repeat(2,1fr)"}}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Email</Text>{" "}
                </FormLabel>

                <Input
                  placeholder="Email"
                  name="email"
                  border={"1px dotted #8BC34A"}
                  type={"email"}
                  value={formData.email}
                  onChange={handleChange}
                />
              </SimpleGrid>
              <FormHelperText align="left">
                We'll never share your email.
              </FormHelperText>
            </FormControl>

       
            <FormControl isRequired>
              <SimpleGrid
               gridTemplateColumns={{base:'1fr',sm:"repeat(2,1fr)"}}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Password</Text>
                </FormLabel>
                <HStack>
                  <Input
                    border={"1px dotted #8BC34A"}
                    placeholder="Password"
                    name="password"
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

            <FormControl isRequired>
              <SimpleGrid
                  gridTemplateColumns={{base:'1fr',sm:"repeat(2,1fr)"}}
                alignItems={"center"}
              >
                <FormLabel>
                  <Text as={"span"}>Confirm Password</Text>
                </FormLabel>
                <HStack>
                  <Input
                    border={"1px dotted gray"}
                    name="confirmpassword"
                    placeholder="Confirm Password"
                    value={formData.confirmpassword}
                    onChange={handleChange}
                    type="text"
                  />

                  <Button>
                    {formData.password == formData.confirmpassword ? (
                      <FcCheckmark boxsize={6} />
                    ) : (
                      <FcCancel boxsize={6} />
                    )}
                  </Button>
                </HStack>
              </SimpleGrid>

              <FormHelperText>
                {formData.password == formData.confirmpassword
                  ? "Please make sure password matches.."
                  : "*Password is not matching"}
              </FormHelperText>
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
                  Register
                </Button>
              </Stack>
            </FormControl>
            <Box>
              <Text>
                Already have an account?{" "}
                <Link style={{ textDecoration: "underline" }} to={"/login"}>
                  Login{" "}
                </Link>
              </Text>
            </Box>
          </Flex>
        </form>
      </Box>
    </Box>
  );
};
