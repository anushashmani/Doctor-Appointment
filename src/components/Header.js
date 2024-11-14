import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { auth, signOut } from "../../auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Header() {
  const session = await auth();
  console.log("session", session);
  return (
    <div className="bg-secondary py-3">
      <div className="flex container mx-auto justify-between p-2 items-center">
        <h1 className="text-xl font-mono">LOGO</h1>
        {session ? (
          <Menubar className="h-12">
            <MenubarMenu>
              <MenubarTrigger className={"border-none"}>
                <Image
                  src={session?.user?.image}
                  height={40}
                  width={40}
                  className="rounded-full"
                  alt="google-img"
                />
              </MenubarTrigger>
              <MenubarContent>
                <Link href={"/profile"}>
                  <MenubarItem>Profile</MenubarItem>
                </Link>
                <MenubarSeparator />
                <Link href={"/appointments"}>
                  <MenubarItem>My Appointment</MenubarItem>
                </Link>

                <MenubarSeparator />
                <form
                  action={async () => {
                    "use server";
                    await signOut("google");
                  }}
                >
                  <Button variant={"outline"}>Logout</Button>
                </form>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ) : (
          <Link href={"/signin"}>
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
}
