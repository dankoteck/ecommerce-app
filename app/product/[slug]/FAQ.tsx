import Accordion from "~/app/components/Accordion";

export default function FAQ({
  list,
}: {
  list: {
    q: string;
    a: string;
  }[];
}) {
  return (
    <div className="flex flex-col">
      <h2 className="pb-6 text-2xl border-b border-b-slate-200">
        Frequently asked questions
      </h2>

      {list.map((item) => (
        <div key={item.q} className="border-b border-b-slate-200">
          <Accordion
            title={<h4 className="text-base font-medium">{item.q}</h4>}
          >
            <p className="px-4 mb-6 text-gray-500">{item.a}</p>
          </Accordion>
        </div>
      ))}
    </div>
  );
}
