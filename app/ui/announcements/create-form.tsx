'use client';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createAnnouncement } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createAnnouncement, initialState);
  return (
    <form action={dispatch}>
      <input type="hidden" name="author" value={1} />
      <div id="content-error" aria-live="polite" aria-atomic="true">
        {state.errors?.author &&
          state.errors.author.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Enter Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="string"
                placeholder="Enter Title"
                aria-describedby="title-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div id="title-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Enter Content
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="content"
                name="content"
                type="string"
                placeholder="Enter Content"
                aria-describedby="title-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div id="content-error" aria-live="polite" aria-atomic="true">
              {state.errors?.content &&
                state.errors.content.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the announcement status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="true"
                  name="is_published"
                  type="radio"
                  value="true"
                  aria-describedby="is_published-error"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="true"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  True <CheckIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="false"
                  name="is_published"
                  type="radio"
                  value="false"
                  aria-describedby="is_published-error"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="false"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  False <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
          <div id="is_published-error" aria-live="polite" aria-atomic="true">
            {state.errors?.is_published &&
              state.errors.is_published.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div id="error" aria-live="polite" aria-atomic="true">
            {state.message && (
              <p className="mt-2 text-sm text-red-500" key={state.message}>
                {state.message}
              </p>
            )}
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/announcements"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Announcement</Button>
      </div>
    </form>
  );
}
