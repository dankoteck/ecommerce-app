import {
  MapPinIcon,
  PaperClipIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";

export default function Textarea({
  label,
  onFinish,
}: {
  label: string;
  onFinish: (evt: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <>
      <form onSubmit={onFinish}>
        <label
          htmlFor="comment"
          className="block mb-2 text-sm font-medium text-left text-black"
        >
          {label}
        </label>
        <div className="w-full mb-4 bg-white border rounded-lg border-slate-200">
          <div className="px-4 py-2 bg-white rounded-t-lg">
            <textarea
              id="comment"
              rows={6}
              maxLength={100}
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 resize-none focus:ring-0"
              placeholder="Describe your issue right here..."
              required
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-indigo-500 rounded-lg focus:ring-4 focus:ring-indigo-200 hover:bg-indigo-700"
            >
              Submit
            </button>
            <div className="flex pl-0 space-x-1 sm:pl-2">
              <button
                type="button"
                className="inline-flex justify-center p-2 text-gray-400 rounded cursor-pointer hover:text-gray-900"
              >
                <PaperClipIcon className="w-5 h-5 font-medium" />
                <span className="sr-only">Attach file</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center p-2 text-gray-400 rounded cursor-pointer hover:text-gray-900"
              >
                <MapPinIcon className="w-5 h-5 font-medium" />
                <span className="sr-only">Set location</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center p-2 text-gray-400 rounded cursor-pointer hover:text-gray-900"
              >
                <PhotoIcon className="w-5 h-5 font-medium" />
                <span className="sr-only">Upload image</span>
              </button>
            </div>
          </div>
        </div>
      </form>
      {/* <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">
        Remember, contributions to this topic should follow our{" "}
        <a
          href="#"
          className="text-blue-600 dark:text-blue-500 hover:underline"
        >
          Community Guidelines
        </a>
        .
      </p> */}
    </>
  );
}
