import {
  Container,
  Title,
  Text,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Textarea,
  FileInput,
  Tooltip,
} from "@mantine/core";
import classes from "../styles/Login.module.css";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useState } from "react";
import { modals } from "@mantine/modals";

const Register = () => {
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      address: "",
      phone: "",
    },
    validate: {
      // password: (v) => (v === form.values.confirmPassword ? null : 'Password and Confirm Password must be the same' ),
      confirmPassword: (v) =>
        v === form.values.password
          ? null
          : "Password and Confirm Password must be the same",
      name: (value) =>
        value.length < 3 ? "Name must have at least 3 letters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      phone: (value) =>
        /^\+\d+$/.test(value)
          ? null
          : "Phone number should be provided in form of +xxx--- with country code",
      password: (value) => {
        if (value.length < 5) {
          return "Password must more than 5 character";
        }
        if (!/[a-z]/.test(value)) {
          return "Password must contain at least one lowercase letter";
        }
        if (!/[A-Z]/.test(value)) {
          return "Password must contain at least one uppercase letter";
        }
        if (!/[0-9]/.test(value)) {
          return "Password must contain at least one number";
        }
        if (!/[^a-zA-Z0-9]/.test(value)) {
          return "Password must contain at least one symbol";
        }
        return null;
      },
    },
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();

    // Append form fields to FormData
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("profilePicture", values.profilePicture);

    const response = await fetch("/api/user", {
      method: "POST",
      body: formData,
    });
    const responseDate = await response.json();
    if (response.ok) {
      form.reset();
      router.push("/login");
      modals.closeAll();
      notifications.show({
        color: "green",
        title: "Success",
        message: responseDate.message || "User created successfully! 🌟",
      });
    } else {
      notifications.show({
        color: "red",
        title: "Failure",
        message: responseDate.error || "Failed to create user.",
      });
    }

    setLoading(false);
  };

  return (
    <Container size={700} my={40}>
      <Title ta="center" className={classes.title}>
        Registration Form!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do you have an account ?{" "}
        <Anchor size="sm" component="a" href="/login">
          login hear
        </Anchor>
      </Text>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values))}
        method="POST"
        style={{ padding: "0 20px" }}
      >
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="Your Email"
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
          <PasswordInput
            mt="md"
            label="Confirm Password"
            placeholder="Confirm Your password"
            required
            {...form.getInputProps("confirmPassword")}
          />
          <TextInput
            label="Name"
            placeholder="Your Full Name"
            required
            {...form.getInputProps("name")}
          />
          <FileInput
            label="Profile Picture"
            placeholder="Profile Picture"
            required
            {...form.getInputProps("profilePicture")}
          />
          <Textarea
            label="Address"
            placeholder="Your Address"
            required
            {...form.getInputProps("address")}
          />
          <TextInput
            label="Phone No"
            placeholder="Your Phone No"
            required
            {...form.getInputProps("phone")}
          />
          <Tooltip label={Object.values(form.errors).join(", ")}>
            <Button
              fullWidth
              mt="xl"
              type="submit"
              loading={loading}
              disabled={!form.isValid()}
            >
              Register
            </Button>
          </Tooltip>
        </Paper>
      </form>
    </Container>
  );
};

export default Register;
