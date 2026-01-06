"use client";

import { Avatar, Group, Text, Stack, Box } from "@mantine/core";
import {
  IconSettings,
  IconTopologyFull,
  IconChartDots3,
  IconMap,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { NavLinkItem } from "@/components/NavLinkItem";

interface NavigationSidebarContentProps {
  userName: string;
  avatarUrl: string | null;
}

const navLinks = [
  {
    href: "/app/relationships",
    label: "Relationships",
    icon: IconTopologyFull,
  },
  {
    href: "/app/network",
    label: "Network graph",
    icon: IconChartDots3,
  },
  {
    href: "/app/map",
    label: "Map",
    icon: IconMap,
  },
  {
    href: "/app/settings",
    label: "Settings",
    icon: IconSettings,
  },
];

export function NavigationSidebarContent({
  userName,
  avatarUrl,
}: NavigationSidebarContentProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Branding Card */}
      <Group mb="md">
        <Image
          src="/bondee-logo.svg"
          alt="Bondee logo"
          width={40}
          height={40}
          priority
        />
        <Box style={{ flex: 1 }}>
          <Text size="sm" fw={600}>
            Bondee
          </Text>
          <Text size="xs" c="dimmed">
            Build bonds that last
          </Text>
        </Box>
      </Group>

      {/* Navigation Links */}
      <Stack gap="xs" mb="auto">
        {navLinks.map((link) => (
          <NavLinkItem
            key={link.href}
            {...link}
            active={pathname === link.href}
          />
        ))}
      </Stack>

      {/* User Avatar Card */}
      <Group mt="auto">
        <Avatar
          src={avatarUrl}
          alt="User avatar"
          color="blue"
          radius="xl"
          size="md"
          name={userName}
        />
        <Text size="sm" fw={500}>
          {userName}
        </Text>
      </Group>
    </>
  );
}
