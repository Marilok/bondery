import { BonderyIcon } from "@bondery/branding";
import { Flex, Text } from "@mantine/core";
import Link from "next/link";

type LogoProps = {
  /** Size of the icon in pixels */
  iconSize?: number;
  /** Font size for the text */
  textSize?: string;
  /** Whether to show the text label */
  showText?: boolean;
  /** URL to link to (defaults to "/") */
  href?: string;
  /** Text color */
  textColor?: string;
};

/**
 * Reusable Logo component displaying the Bondery icon and optionally text
 * Can be used throughout the application with consistent branding
 */
export function Logo({
  iconSize = 32,
  textSize = "lg",
  showText = true,
  href = "/",
  textColor = "white",
}: LogoProps) {
  return (
    <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
      <Flex align="center" gap="xs">
        <BonderyIcon width={iconSize} height={iconSize} />
        {showText && (
          <Text fw={700} size={textSize} c={textColor}>
            Bondery
          </Text>
        )}
      </Flex>
    </Link>
  );
}
