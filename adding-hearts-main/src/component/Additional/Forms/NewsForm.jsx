import {
  Box,
  FileInput,
  SimpleGrid,
  TextInput,
  Button,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState, useEffect } from "react";
import RichText from "../RichText/RichText";
import { PrimaryColor } from "@/styles/color";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";

const NewsForm = ({ data, action }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    validateInputOnBlur: true,
    initialValues: {
      title: data?.title,
      cover: data?.cover,
      detail: data?.detail,
    },
    validate: {
      title: (value) =>
        value?.length < 20 ? "Title must be greater than 20 character" : null,
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);

    const formData = new FormData();

    // Append form fields to FormData
    formData.append("title", values.title);
    formData.append("detail", values.detail);
    formData.append("cover", values.cover);
    data?.id && formData.append("id", data.id);

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
      const response = await fetch("/api/news", {
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
          message: responseDate.message || "News submitted successfully! 🌟",
        });
      } else {
        notifications.show({
          color: "red",
          title: "Failure",
          message: responseDate.error || "Failed to submit news.",
        });
      }
    } catch (error) {
      console.error("Error submitting news:", error);
    }

    setLoading(false);
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <SimpleGrid
          cols={{ base: 1, sm: 1, lg: 2 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          <TextInput
            label="Title"
            placeholder="Title"
            required
            {...form.getInputProps("title")}
          />
          <FileInput
            label="Cover Photo"
            placeholder="Add Cover Photo"
            description={`Uploaded file: ${
              form.values.cover && action == "update"
                ? form.values.cover.split("\\").pop().split("/").pop()
                : ""
            }`}
            required
            {...form.getInputProps("cover")}
          />
        </SimpleGrid>
        <RichText
          value={form.values.detail} // Pass the detail value from the form
          onChange={(value) => form.setFieldValue("detail", value)} // Update form detail value when changed
        />
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

export default NewsForm;
