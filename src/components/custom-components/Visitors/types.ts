export type Visitor = {
  lat: number;
  lng: number;
  count: number;
};

export type CurrentVisitorsProps = {
  title: string;
  description: string;
  highlightText: string;
  buttonText: string;
  buttonIcon?: React.ReactNode;
};

export type FilterComponentProps = {
  statusOptions: string[];
  sortOptions: string[];
  onStatusChange?: (selectedStatuses: string[]) => void;
  onSortChange?: (selectedSort: string) => void;
  statusLabel?: string;
  sortLabel?: string;
  className?: string;
  getSortIcon?: (option: string, isSelected: boolean) => React.ReactNode;
};

export type HeadingProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

export interface Activity {
  label: string;
  subLabel?: string;
  timestamp: string;
}

export interface VisitorDetailModalProps {
  name: string;
  image: string;
  details: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  activity: Activity[];
  onClose: () => void;
  onStartChat: () => void;
  style?: React.CSSProperties;
}

export interface VisitorDetailsProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}
