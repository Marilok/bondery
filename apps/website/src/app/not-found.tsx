"use client";

import { Button, Container, Stack, Text, Title } from "@mantine/core";
import { IconHome } from "@tabler/icons-react";
import Link from "next/link";

export default function Page() {
  return (
    <Container size="sm" py="xl">
      <Stack align="center" justify="center" gap="xl" style={{ minHeight: "60vh" }}>
        <Stack align="center" gap="md">
          <Title order={1} ta="center">
            Page Not Found
          </Title>
          <Text size="lg" c="dimmed" ta="center">
            The page you are looking for does not exist.
          </Text>
        </Stack>
        <Button component={Link} href="/" size="lg" leftSection={<IconHome size={20} />}>
          Back to Home
        </Button>
      </Stack>
    </Container>
  );
}
