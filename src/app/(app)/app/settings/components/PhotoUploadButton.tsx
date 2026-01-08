"use client";

import { Group, Text } from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { useTranslations } from "next-intl";
import { PhotoUploadModal } from "./PhotoUploadModal";
import { PhotoConfirmModal } from "./PhotoConfirmModal";
import { UserAvatar } from "@/components/UserAvatar";

interface PhotoUploadButtonProps {
  avatarUrl: string | null;
  userName: string;
}

export function PhotoUploadButton({
  avatarUrl,
  userName,
}: PhotoUploadButtonProps) {
  const t = useTranslations("SettingsPage.Profile");

  const handlePhotoSelect = (file: File, preview: string, modalId: string) => {
    // Update the existing modal to show confirmation step
    modals.open({
      modalId,
      title: (
        <Group gap="xs">
          <IconPhoto size={20} stroke={1.5} />
          <Text fw={600}>{t("UpdateProfilePhoto")}</Text>
        </Group>
      ),
      children: (
        <PhotoConfirmModal
          preview={preview}
          onCancel={() => modals.close(modalId)}
          onConfirm={() => handlePhotoConfirm(file, modalId)}
          translations={{
            UpdateProfilePhoto: t("UpdateProfilePhoto"),
            Cancel: t("Cancel"),
            ConfirmPhoto: t("ConfirmPhoto"),
          }}
        />
      ),
      centered: true,
      size: "md",
      withCloseButton: true,
    });
  };

  const handlePhotoConfirm = async (file: File, modalId: string) => {
    modals.close(modalId);

    const loadingNotification = notifications.show({
      title: t("UploadingPhoto"),
      message: t("PleaseWait"),
      loading: true,
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/account/photo", {
        method: "POST",
        body: formData,
      });

      notifications.hide(loadingNotification);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to upload photo");
      }

      notifications.show({
        title: t("UpdateSuccess"),
        message: t("PhotoUpdateSuccess"),
        color: "green",
      });

      // Force full page reload to update all avatars
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      notifications.show({
        title: t("UpdateError"),
        message: error instanceof Error ? error.message : t("PhotoUpdateError"),
        color: "red",
      });
    }
  };

  const openUploadModal = () => {
    const modalId = "photo-upload-modal";
    modals.open({
      modalId,
      title: (
        <Group gap="xs">
          <IconPhoto size={20} stroke={1.5} />
          <Text fw={600}>{t("TitleModal")}</Text>
        </Group>
      ),
      children: (
        <PhotoUploadModal
          onPhotoSelect={(file, preview) =>
            handlePhotoSelect(file, preview, modalId)
          }
          translations={{
            TitleModal: t("TitleModal"),
            AttachProfilePhoto: t("AttachProfilePhoto"),
            UpdateError: t("UpdateError"),
            InvalidFile: t("InvalidFile"),
            DragImageHere: t("DragImageHere"),
          }}
        />
      ),
      centered: true,
      size: "md",
      withCloseButton: true,
    });
  };

  return (
    <UserAvatar
      avatarUrl={avatarUrl}
      userName={userName}
      size="lg"
      style={{ cursor: "pointer" }}
      onClick={openUploadModal}
    />
  );
}
