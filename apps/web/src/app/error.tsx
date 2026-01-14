"use client";

import { Button, Container, Stack, Text, Title } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();

  const errorTitle = searchParams.get("title") || "Something went wrong";
  const errorDescription =
    searchParams.get("description") || "An unexpected error occurred. Please try again later.";

  return (
    <Container size="sm" py="xl">
      <Stack align="center" justify="center" gap="xl" style={{ minHeight: "60vh" }}>
        <Stack align="center" gap="md">
          <Title order={1} size="h1" ta="center">
            {errorTitle}
          </Title>
          <Text size="lg" c="dimmed" ta="center">
            {errorDescription}
          </Text>
        </Stack>
        <Button component={Link} href="/" size="lg" leftSection={<IconHome size={20} />}>
          Back to Home
        </Button>
      </Stack>
    </Container>
  );
}
