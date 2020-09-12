import React from "react";
import { Formik, Form } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box, Button } from "@chakra-ui/core";
import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";

interface registerProps { }

const Register: React.FC<registerProps> = ({ }) => {
  const [{ }, register] = useRegisterMutation()
  return (
    <Wrapper variant="regular">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          const response = await register(values)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box>
              <InputField
                name="username"
                placeholder="Enter username"
                label="Username"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Enter password"
                label="Password"
                type="password"
              />
            </Box>
            <Box mt={4}>
              <Button
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
