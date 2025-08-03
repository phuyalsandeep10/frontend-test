// @/services/team/useTeamStore.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Team } from './team';

interface TeamState {
  teams: Team[];
  loading: boolean;
  error: string | null;
  setTeams: (teams: Team[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTeamStore = create(
  immer<TeamState>((set) => ({
    teams: [],
    loading: false,
    error: null,
    setTeams: (teams) =>
      set((state) => {
        state.teams = teams;
      }),
    setLoading: (loading) =>
      set((state) => {
        state.loading = loading;
      }),
    setError: (error) =>
      set((state) => {
        state.error = error;
      }),
  })),
);
