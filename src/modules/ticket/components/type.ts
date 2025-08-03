type Status = 'Unassigned' | 'Assigned' | 'Solved' | 'Spam' | (string & {}); // Accept any other string,

export type TicketCardProps = {
  id?: number;
  email: string;
  timeAgo: string;
  title: string;
  priority: string;
  status: Status;
  avatarUrl?: string;
  created_by?: string;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
};
