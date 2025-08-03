// @/services/team/team.ts
export interface Team {
  id: number;
  name: string;
  description: string;
  organization_id: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  created_by_id: number | null;
  updated_by_id: number | null;
  deleted_at: string | null;
}

export type TeamResponse = Team[]; // Since your API returns an array
