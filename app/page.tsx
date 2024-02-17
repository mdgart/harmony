import HarmonyLogo from '@/app/ui/harmony-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-cover p-6"
      style={{ backgroundImage: "url('/crowd.png')" }}
    >
      <div className="flex max-w-4xl flex-col items-center rounded-lg bg-white bg-opacity-90 p-4 shadow-lg backdrop-blur-lg">
        <div className="flex h-52 w-full shrink-0 items-center justify-center">
          <HarmonyLogo />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 p-8 md:flex-grow md:p-8">
          <Link
            href="/login"
            className="flex items-center gap-5 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
