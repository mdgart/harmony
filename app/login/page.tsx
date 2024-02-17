import HarmonyLogoHorizontal from '@/app/ui/harmony-logo-horizzontal';
import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5">
        <div className="flex h-20 w-full items-end rounded-lg p-3 md:h-36">
          <HarmonyLogoHorizontal />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
