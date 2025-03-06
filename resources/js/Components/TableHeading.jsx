import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";

export default function TableHeading({name,sortable = true,sort_field = null, sort_direction = null,children, sortChanged = () => {}}) {
    return (
        <th onClick={e => sortChanged('id')}>
            <div className="px-3 py-2 flex items-center justify-between gap-1 cursor-pointer">
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon
                            className={"w-4 " + (sort_field === name && sort_direction === "asc" ? "text-blue-50" : " ")}/>
                        <ChevronDownIcon
                            className={"w-4 -mt-2 " + (sort_field === name && sort_direction === "desc" ? "text-blue-50" : " ")}/>
                    </div>

                )}

            </div>
        </th>
    )
}
