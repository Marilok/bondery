import type { Metadata } from "next";
import "./globals.css";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { NextIntlClientProvider } from "next-intl";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  createTheme,
  Paper,
} from "@mantine/core";

const theme = createTheme({
  cursorType: "pointer",

  primaryColor: "branding-primary",
  colors: {
    "branding-primary": [
      "#faedff",
      "#edd9f7",
      "#d8b1ea",
      "#c186dd",
      "#ae62d2",
      "#a34bcb",
      "#9d3fc9",
      "#8931b2",
      "#7a2aa0",
      "#6b218d",
    ],
  },
  components: {
    Menu: {
      defaultProps: {
        shadow: "md",
      },
    },
    Button: {
      defaultProps: {
        className: "button-scale-effect",
      },
    },
    Input: {
      defaultProps: {
        className: "input-scale-effect",
      },
    },
    Checkbox: {
      defaultProps: {
        classNames: {
          card: "button-scale-effect",
        },
      },
    },
    Paper: {
      defaultProps: {
        radius: "md",
      },
    },
    NavLink: {
      defaultProps: {
        className: "button-scale-effect rounded-sm",
        // TODO: match sm, md, lg... sizes of tailwind with mantine
      },
    },
  },
});
import "dayjs/locale/en";
import { DatesProvider } from "@mantine/dates";

export const metadata: Metadata = {
  title: "Bondee",
  description: "Build bonds that last forever.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get user language and timezone from settings
  let locale = "en";
  let userTimezone = "UTC";

  try {
    const { headers: getHeaders } = await import("next/headers");
    const { getBaseUrl } = await import("@/lib/config");
    const baseUrl = getBaseUrl();
    const headersList = await getHeaders();

    const response = await fetch(`${baseUrl}/api/settings`, {
      cache: "no-store",
      headers: headersList,
    });

    if (response.ok) {
      const result = await response.json();
      if (result?.data?.timezone) {
        userTimezone = result.data.timezone;
      }
      if (result?.data?.language) {
        locale = result.data.language;
      }
    }
  } catch (error) {
    // Silently fail and use defaults
    console.error("Failed to load user settings:", error);
  }

  // Load translation messages
  let messages;
  try {
    messages = (await import(`../../translations/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    messages = (await import(`../../translations/en.json`)).default;
  }

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript
          nonce="8IBTHwOdqNKAWeKl7plt8g=="
          defaultColorScheme="auto"
        />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto" theme={theme}>
          <ModalsProvider>
            <NextIntlClientProvider
              locale={locale}
              timeZone={userTimezone}
              messages={messages}
            >
              <DatesProvider settings={{ locale }}>
                <Notifications autoClose={5000} position="top-center" />
                {children}
              </DatesProvider>
            </NextIntlClientProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
