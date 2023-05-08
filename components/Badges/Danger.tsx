export default function DangerBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="bg-red-100 text-red-500 text-xs ml-2 px-1.5 py-0.5 rounded">
      {children}
    </span>
  );
}
