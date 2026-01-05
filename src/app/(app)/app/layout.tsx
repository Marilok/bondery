import { AppShell, AppShellMain, AppShellNavbar } from "@mantine/core";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NavigationSidebarContent } from "@/components/NavigationSidebar";

async function getUserData() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      userName: "User",
      avatarUrl: null,
    };
  }

  const firstName = user.user_metadata?.name || "";
  const middleName = user.user_metadata?.middlename || "";
  const lastName = user.user_metadata?.surname || "";
  const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ");

  return {
    userName: fullName || user.email || "User",
    avatarUrl: user.user_metadata?.avatar_url || null,
  };
}

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userName, avatarUrl } = await getUserData();

  return (
    <AppShell
      padding="md"
      navbar={{
        width: 280,
        breakpoint: "sm",
      }}
    >
      <AppShellNavbar p="md">
        <NavigationSidebarContent userName={userName} avatarUrl={avatarUrl} />
      </AppShellNavbar>
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
}
