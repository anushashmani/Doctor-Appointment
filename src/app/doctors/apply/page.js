import DoctorForm from "@/components/ApplyForm";
import { auth } from "../../../../auth";

export default async function ApplyAsDoctor() {
  const session = await auth();
  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-2xl mt-10">
        Apply as a Doctor in our Platform
      </h1>
      <h1 className="text-secondary-foreground mt-5">
        Apply as a Doctor in our Platform
      </h1>

      <DoctorForm session={session} />
    </div>
  );
}
