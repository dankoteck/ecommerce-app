export default function Info({
  children,
}: {
  children: string | React.ReactElement;
}) {
  return (
    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-1.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
      {children}
    </span>
  );
}
