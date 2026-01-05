"use client";

import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Group,
  TextInput,
  Paper,
  Loader,
  Center,
} from "@mantine/core";
import {
  IconTopologyFull,
  IconSearch,
  IconPlus,
} from "@tabler/icons-react";
import { useState, useDeferredValue } from "react";
import ContactsTable from "@/components/ContactsTable";
import { ColumnVisibilityMenu } from "./components/ColumnVisibilityMenu";
import { SortMenu, SortOrder } from "./components/SortMenu";
import { ColumnConfig } from "./components/SortableColumnItem";

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  title?: string;
  place?: string;
  description: string;
  avatarColor: string;
  lastInteraction: Date;
  connections?: string[];
  phone?: string;
  email?: string;
  linkedin?: string;
  instagram?: string;
  whatsapp?: string;
  facebook?: string;
}

interface RelationshipsClientProps {
  initialContacts: Contact[];
  totalCount: number;
}

export function RelationshipsClient({ initialContacts, totalCount }: RelationshipsClientProps) {
  const [contacts] = useState<Contact[]>(initialContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [columns, setColumns] = useState<ColumnConfig[]>([
    { key: "avatar", label: "Avatar", visible: true },
    { key: "name", label: "Name", visible: true },
    { key: "title", label: "Title", visible: true },
    { key: "place", label: "Place", visible: true },
    { key: "shortNote", label: "Short Note", visible: true },
    { key: "lastInteraction", label: "Last Interaction", visible: true },
    { key: "social", label: "Social Media", visible: true },
  ]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("nameAsc");

  // Defer the columns update to prevent UI freezing when toggling visibility
  const deferredColumns = useDeferredValue(columns);
  const visibleColumns = deferredColumns.filter((c) => c.visible);

  const filteredContacts = contacts
    .filter((contact) =>
      `${contact.firstName} ${contact.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortOrder) {
        case "nameAsc":
          return a.firstName.localeCompare(b.firstName);
        case "nameDesc":
          return b.firstName.localeCompare(a.firstName);
        case "surnameAsc":
          return a.lastName.localeCompare(b.lastName);
        case "surnameDesc":
          return b.lastName.localeCompare(a.lastName);
        case "interactionAsc":
          return a.lastInteraction.getTime() - b.lastInteraction.getTime();
        case "interactionDesc":
          return b.lastInteraction.getTime() - a.lastInteraction.getTime();
        default:
          return 0;
      }
    });

  const handleSelectAll = () => {
    if (selectedIds.size === filteredContacts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredContacts.map((c) => c.id)));
    }
  };

  const handleSelectOne = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const allSelected =
    filteredContacts.length > 0 && selectedIds.size === filteredContacts.length;
  const someSelected =
    selectedIds.size > 0 && selectedIds.size < filteredContacts.length;

  return (
    <Container size="xl">
      <Stack gap="xl">
        <Group gap="sm">
          <IconTopologyFull size={32} stroke={1.5} />
          <Title order={1}>My Relationships</Title>
        </Group>

        <Paper withBorder shadow="sm" radius="md" p="md">
          <Stack gap="md">
            <Group justify="space-between">
              <Text size="sm" c="dimmed">
                Total contacts: <b>{totalCount}</b>
              </Text>
              <Button leftSection={<IconPlus size={16} />}>
                Add Relationship
              </Button>
            </Group>

            <Group>
              <TextInput
                placeholder="Search by name..."
                leftSection={<IconSearch size={16} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                style={{ flex: 1 }}
              />
              <ColumnVisibilityMenu columns={columns} setColumns={setColumns} />
              <SortMenu sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </Group>

            <ContactsTable
              contacts={filteredContacts}
              selectedIds={selectedIds}
              visibleColumns={visibleColumns}
              onSelectAll={handleSelectAll}
              onSelectOne={handleSelectOne}
              allSelected={allSelected}
              someSelected={someSelected}
              showSelection={true}
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
