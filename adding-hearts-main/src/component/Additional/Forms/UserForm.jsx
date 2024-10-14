import {
  Box,
  FileInput,
  SimpleGrid,
  TextInput,
  Button,
  Tooltip,
  Group,
  Title,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState, useEffect } from "react";
import RichText from "../RichText/RichText";
import { PrimaryColor } from "@/styles/color";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

const UserForm = ({ data, action }) => {
  const [loading, setLoading] = useState(false);
  console.log({ data });
  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      name: data?.name,
      address: data?.address,
      phone: data?.phone,
    },
    validate: {
      name: (value) =>
        value.length < 3 ? "Name must have at least 3 letters" : null,
      phone: (value) =>
        /^\+\d+$/.test(value)
          ? null
          : "Phone number should be provided in form of +xxx--- with country code",
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);

    const formData = new FormData();

    // Append form fields to FormData
    formData.append("name", values.name);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("profilePicture", values.profilePicture);
    data.id && formData.append("id", data.id);

    const method =
      action === "add" ? "POST" : action === "update" ? "PUT" : null;

    if (!method) {
      notifications.show({
        color: "red",
        title: "Failure",
        message: "Invalid action.",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user", {
        method: method, // POST or PUT
        body: formData,
        // No need to set Content-Type; FormData handles it automatically
      });
      const responseDate = await response.json();
      if (response.ok) {
        form.reset();
        modals.closeAll();
        notifications.show({
          color: "green",
          title: "Success",
          message: responseDate.message || "User data updated successfully! 🌟",
        });
      } else {
        notifications.show({
          color: "red",
          title: "Failure",
          message: responseDate.error || "Failed to updated user data .",
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Group>
          <Title order={5}>Email</Title>
          <Title order={6}>{data.email}</Title>
        </Group>
        <SimpleGrid
          cols={{ base: 1, sm: 1, lg: 2 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          <TextInput
            label="Name"
            placeholder="Your Full Name"
            required
            {...form.getInputProps("name")}
          />
          <FileInput
            label="Profile Picture"
            placeholder="Update Profile Picture"
            description={`Uploaded file: ${
              data?.profilePicture
                ? data?.profilePicture.split("\\").pop().split("/").pop()
                : ""
            }`}
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
        </SimpleGrid>

        <Tooltip label={Object.values(form.errors).join(", ")}>
          <Button
            type="submit"
            mt="sm"
            color={PrimaryColor}
            loading={loading}
            disabled={!form.isValid()}
          >
            {" "}
            Submit
          </Button>
        </Tooltip>
      </form>
    </>
  );
};

export default UserForm;
