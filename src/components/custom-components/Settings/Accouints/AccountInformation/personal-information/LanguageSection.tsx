import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LanguageSection() {
  return (
    <div className="mt-6">
      <label className="text-brand-dark text-[16px] leading-[26px] font-medium">
        Language
      </label>
      <Select defaultValue="English">
        <SelectTrigger className="h-9 w-[80%] border-neutral-300 bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="English">English</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
