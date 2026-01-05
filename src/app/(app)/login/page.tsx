"use client";

import { useState } from "react";
import {
  Container,
  Paper,
  Title,
  Text,
  Button,
  Stack,
  Center,
  Box,
  Anchor,
} from "@mantine/core";
import {
  IconBrandGithubFilled,
  IconBrandLinkedin,
  IconX,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { createBrowswerSupabaseClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function LoginPage() {
  const t = useTranslations("LoginPage");
  const [loading, setLoading] = useState(false);
  const supabase = createBrowswerSupabaseClient();

  const handleOAuthLogin = async (provider: "github" | "linkedin_oidc") => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        notifications.show({
          title: t("AuthenticationError"),
          message: error.message,
          color: "red",
          icon: <IconX size={18} />,
        });
      }
    } catch (err) {
      notifications.show({
        title: t("UnexpectedError"),
        message:
          err instanceof Error ? err.message : t("UnexpectedErrorMessage"),
        color: "red",
        icon: <IconX size={18} />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Container size={420}>
        <Paper withBorder shadow="md" p={30} radius="md">
          <Stack gap="md">
            <Title order={2} ta="center">
              {t("Title")}
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              {t("Description")}
            </Text>

            <Stack gap="sm">
              <Button
                fullWidth
                leftSection={<IconBrandGithubFilled size={20} />}
                onClick={() => handleOAuthLogin("github")}
                loading={loading}
                disabled={loading}
                color="black"
              >
                {t("ContinueWithGithub")}
              </Button>

              <Button
                fullWidth
                leftSection={<IconBrandLinkedin size={20} />}
                onClick={() => handleOAuthLogin("linkedin_oidc")}
                loading={loading}
                disabled={loading}
                style={{ backgroundColor: "#0A66C2" }}
              >
                Continue with LinkedIn
              </Button>
            </Stack>

            <Text c="dimmed" size="xs" ta="center">
              {t.rich("TermsText", {
                termsLink: (chunks) => (
                  <Anchor href="/terms" component={Link}>
                    {chunks}
                  </Anchor>
                ),
                privacyLink: (chunks) => (
                  <Anchor component={Link} href="/privacy">
                    {chunks}
                  </Anchor>
                ),
              })}
            </Text>
          </Stack>
        </Paper>
      </Container>
    </div>
  );
}
