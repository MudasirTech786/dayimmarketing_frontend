"use client";
import MainFooter from "@/app/dayim-signature-apartments/components/footer/MainFooter";
import NavBar from "@/app/dayim-signature-apartments/components/Navbar";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { getCookie, setCookie } from "cookies-next";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  useEffect(() => {
    const user = getCookie("logged-in-user");
    if (user) {
      router.push("/dayim-signature-apartments/residences2");
    }
  }, []);
  return (
    <div className="min-h-screen w-full ">
      <NavBar videoBg={false} />

      <div className="flex items-center justify-center mt-[150px] ">
        <div className="space-y-3 border border-second rounded-sm shadow-md w-[500px] flex flex-col items-center justify-center p-10">
          <h2 className="text-4xl font-bold text-second">Sign in</h2>
          <div className="w-full">
            <LoginForm />
          </div>
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-second hover:underline">
              Register
            </Link>{" "}
          </p>
          {/* <DevTool control={control} /> */}
        </div>
      </div>

      <footer className="mt-20">
        <MainFooter />
      </footer>
    </div>
  );
};

export default LoginPage;
