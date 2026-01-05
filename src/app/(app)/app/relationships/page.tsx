import { mockContacts } from "@/lib/mockData";
import { RelationshipsClient } from "./RelationshipsClient";

async function getContacts() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const contacts = mockContacts.map((contact) => ({
    ...contact,
    lastInteraction: new Date(contact.lastInteraction),
  }));

  const totalCount = contacts.filter((c) => !c.myself).length;

  return { contacts, totalCount };
}

export default async function RelationshipsPage() {
  const { contacts, totalCount } = await getContacts();

  return (
    <RelationshipsClient initialContacts={contacts} totalCount={totalCount} />
  );
}
