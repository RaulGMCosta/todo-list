import { Checked } from "./icons/checked";
import { Unchecked } from "./icons/unchecked";

type ItemProps = {
    label: string;
    checked?: boolean;
    onClick?: () => void;
};

function FilterItem({ label, checked, onClick }: ItemProps) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center flex-1 px-4 py-2 rounded-md transition-all duration-150 focus:outline-none
                ${checked ? 'bg-blue-600 text-white border border-blue-700 shadow-md' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
        >
            {label}
        </button>
    );
}

type Props = {
    filter: "all" | "completed" | "uncompleted",
    setFilter: (filter: "all" | "completed" | "uncompleted") => void,
};

export function Filters({ filter, setFilter }: Props) {
    return (
        <div className="flex flex-row w-full gap-2 mt-6 text-lg">
            <FilterItem
                label="Todos"
                checked={filter === "all"}
                onClick={() => setFilter("all")}
            />
            <FilterItem
                label="Pendentes"
                checked={filter === "uncompleted"}
                onClick={() => setFilter("uncompleted")}
            />
            <FilterItem
                label="Completos"
                checked={filter === "completed"}
                onClick={() => setFilter("completed")}
            />
        </div>
    );
}
