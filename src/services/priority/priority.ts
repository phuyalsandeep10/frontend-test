export interface Priority {
  id: number;
  name: string;
  bg_color: string;
  fg_color: string;
}

export interface PriorityResponse {
  success: boolean;
  data: Priority[];
}
