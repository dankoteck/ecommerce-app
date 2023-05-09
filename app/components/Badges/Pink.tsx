export default function Pink({
  children,
}: {
  children: string | React.ReactElement;
}) {
  return (
    <span className="bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-1.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
      {children}
    </span>
  );
}
