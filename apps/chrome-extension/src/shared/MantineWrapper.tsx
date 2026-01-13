import React from "react";
import { MantineProvider } from "@mantine/core";
import { bonderyTheme } from "@bondery/branding";
import "@mantine/core/styles.css";
import "@bondery/branding/src/styles.css";

interface MantineWrapperProps {
  children: React.ReactNode;
}

export function MantineWrapper({ children }: MantineWrapperProps) {
  return <MantineProvider theme={bonderyTheme}>{children}</MantineProvider>;
}
