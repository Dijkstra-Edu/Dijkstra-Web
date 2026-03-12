/**
 * Role constants matching backend Role enum
 */

export type Role =
  | "GLOBAL_ADMIN"
  | "LOCAL_ADMIN"
  | "TEAM_LEAD"
  | "ORGANIZATION_READ"
  | "PERSONAL_READ"
  | "PERSONAL_WRITE";

export const ROLE_OPTIONS: { value: Role; label: string }[] = [
  { value: "GLOBAL_ADMIN", label: "Global Admin" },
  { value: "LOCAL_ADMIN", label: "Local Admin" },
  { value: "TEAM_LEAD", label: "Team Lead" },
  { value: "ORGANIZATION_READ", label: "Organization Read" },
  { value: "PERSONAL_READ", label: "Personal Read" },
  { value: "PERSONAL_WRITE", label: "Personal Write" },
];

export const ALL_ROLES: Role[] = ROLE_OPTIONS.map((r) => r.value);

