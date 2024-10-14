import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import classes from "../styles/Login.module.css";
import { useForm } from "@mantine/form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { modals } from "@mantine/modals";

export default function Login({ mode }) {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      email: "",
      password: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  // const [login, { isLoading, isSuccess, error }] = useLoginUserMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form.values;
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });
    if (result?.ok) {
      mode == "modal" ? modals.closeAll() : router.push("/");
    }
    if (result?.error) setErrorMessage(result?.error);
  };
  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="a" href="/register">
          Create account
        </Anchor>
      </Text>
      <form onSubmit={handleSubmit} method="POST">
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="email"
            placeholder="Your email"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            mt="md"
            label="Password"
            placeholder="Your password"
            required
            {...form.getInputProps("password")}
          />

          <Group justify="space-between" mt="lg">
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit" disabled={!form.isValid()}>
            Sign in
          </Button>
          {errorMessage && <Text color="red">{errorMessage}</Text>}
        </Paper>
      </form>
    </Container>
  );
}
