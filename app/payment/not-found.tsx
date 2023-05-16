import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid max-w-2xl px-4 py-16 mx-auto bg-white sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 place-items-center">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Order Not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          {"Sorry, we couldn't find the order you're looking for."}
        </p>
        <div className="flex items-center justify-center mt-10 gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Back to shopping
          </Link>
          <Link href="/support" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
