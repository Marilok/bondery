"use client";

import { useState } from "react";
import { Container, Paper, Text, Button, Stack, Anchor, Center, Space } from "@mantine/core";
import { IconBrandGithubFilled, IconBrandLinkedin, IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { createBrowswerSupabaseClient } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { INTEGRATION_PROVIDERS } from "@/lib/config";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const t = useTranslations("LoginPage");
  const [loading, setLoading] = useState(false);
  const supabase = createBrowswerSupabaseClient();

  const getProviderIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      github: IconBrandGithubFilled,
      linkedin: IconBrandLinkedin,
    };
    return icons[iconName] || IconBrandGithubFilled;
  };

  const activeProviders = INTEGRATION_PROVIDERS.filter((p) => p.active);

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
        message: err instanceof Error ? err.message : t("UnexpectedErrorMessage"),
        color: "red",
        icon: <IconX size={18} />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Container size={460} p={0}>
        <Stack align="center">
          {/* Logo Section */}
          <Logo iconSize={56} textSize="2rem" href="/" />
          <Space />

          {/* Login Card */}
          <Paper
            withBorder
            shadow="lg"
            p="xl"
            radius="lg"
            w="100%"
            style={{
              backgroundColor:
                "light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))",
            }}
          >
            <Stack gap="md">
              <Text size="md" c="dimmed" ta="center">
                {t("Description")}
              </Text>

              <Stack gap="xs">
                {activeProviders.map((provider) => {
                  const Icon = getProviderIcon(provider.icon);
                  return (
                    <Button
                      key={provider.provider}
                      fullWidth
                      leftSection={<Icon size={20} />}
                      onClick={() =>
                        handleOAuthLogin(provider.providerKey as "github" | "linkedin_oidc")
                      }
                      size="lg"
                      loading={loading}
                      disabled={loading}
                      style={{ backgroundColor: provider.backgroundColor }}
                    >
                      {t("ContinueWith", { provider: provider.displayName })}
                    </Button>
                  );
                })}
              </Stack>
            </Stack>
          </Paper>

          {/* Terms Section */}
          <Text c="dimmed" size="xs" ta="center" maw={380}>
            {t.rich("TermsText", {
              termsLink: (chunks) => (
                <Anchor href="/terms" component={Link} size="xs">
                  {chunks}
                </Anchor>
              ),
              privacyLink: (chunks) => (
                <Anchor component={Link} href="/privacy" size="xs">
                  {chunks}
                </Anchor>
              ),
            })}
          </Text>
        </Stack>
      </Container>
    </div>
  );
}
