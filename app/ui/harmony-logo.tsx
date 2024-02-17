import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function HarmonyLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src="/htSignIn.png" // Assuming the image is in the public folder and named 'logo.png'
        alt="Logo"
        width={400} // Adjust the size as needed
        height={400} // Adjust the size as needed
      />
    </div>
  );
}
