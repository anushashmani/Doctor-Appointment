import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "../../auth";

export default async function HeroSection() {
  const session = await auth();

  return (
    <section className="my-10 text-gray-600 body-font">
      <div className="container flex flex-col items-center mx-auto md:flex-row">
        <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-3/4 md:pr-16 md:items-start md:text-left md:mb-0">
          <h1 className="mb-4 text-xl font-semibold text-gray-900 sm:text-2xl">
            DOCTOR APPOINTMENT SYSTEM
            <br className="hidden lg:inline-block" />
            BY BATCH-11
          </h1>
          <p className="mb-8 leading-relaxed">
            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air
            plant cold-pressed tacos poke beard tote bag. Heirloom echo park
            mlkshk tote bag selvage hot chicken authentic tumeric truffaut
            hexagon try-hard chambray.
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline">Find Doctor You Need</Button>
            <Link href={session ? "/doctors/apply" : "/signin"}>
              <Button>Apply as Doctor</Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-end w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            height={400}
            width={400}
            src="https://images.unsplash.com/photo-1605684954998-685c79d6a018?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZG9jdG9yfGVufDB8fDB8fHww"
          />
        </div>
      </div>
    </section>
  );
}
