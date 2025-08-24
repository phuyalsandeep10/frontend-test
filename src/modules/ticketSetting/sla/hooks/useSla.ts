import { create } from 'zustand';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiConfigs/axiosInstance';

type PriorityData = {
  created_at: string;
  name: string;
  resolution_time: number;
  id: number;
  response_time: number;
  priority_id: number | null;
  priority: {
    level: number;
    fg_color: string;
    id: number;
    name: string;
    bg_color: string;
  } | null;
};

type SlaState = {
  slaList: PriorityData[];
  setSlaList: (data: PriorityData[]) => void;
};

export const useSlaStore = create<SlaState>((set) => ({
  slaList: [],
  setSlaList: (data) => set({ slaList: data }),
}));

export const useSla = () => {
  const setSlaList = useSlaStore((state) => state.setSlaList);

  return useQuery({
    queryKey: ['sla'],
    queryFn: async () => {
      const res = await axiosInstance.get('/tickets/sla');
      setSlaList(res.data.data);
      return res.data.data as PriorityData[];
    },
  });
};
