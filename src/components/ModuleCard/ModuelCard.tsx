import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const ModuelCard = ({ title, icon: Icon, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center justify-center p-12 bg-white rounded-2xl 
      border border-gray-100 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1.5 
      hover:shadow-md active:scale-98 w-full min-h-60 hover:cursor-pointer"
    >
      <div className="text-sky-500 transition-transform duration-300 group-hover:scale-105 mb-6">
        <Icon size={52} strokeWidth={1.5} />
      </div>

      <span
        className="relative text-xl font-semibold text-slate-800 pb-1 after:absolute 
        after:bottom-0 after:left-1/2 after:h-0.75 after:w-0 after:bg-sky-500 after:transition-all 
        after:duration-300 group-hover:after:w-3/4 group-hover:after:left-[12.5%]"
      >
        {title}
      </span>
    </button>
  );
};
