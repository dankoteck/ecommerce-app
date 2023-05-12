import { Attribute } from "@prisma/client";
import Accordion from "~/app/components/Accordion";

type Props = {
  title: string;
  items:
    | {
        id: string;
        name: string;
        value: string;
      }[]
    | Attribute[];
};

export default function ProductHighLight({ title, items }: Props) {
  if (items.length === 0) return null;

  return (
    <div className="pl-4">
      <Accordion
        defaultOpen
        title={<h4 className="text-sm font-medium">{title}</h4>}
      >
        <div className="pl-8 text-sm border-t border-gray-100 text-slate-400">
          <dl className="divide-y divide-gray-100">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-1 gap-1 px-4 py-6">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {item.name}
                </dt>
                <dd className="col-span-2 text-sm leading-6 text-gray-500">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Accordion>
    </div>
  );
}
