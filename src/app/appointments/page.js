import DoctorAppointmentCard from "@/components/DoctorAppointmentCard/DoctorAppointmentCard";
import PatientAppointmentCard from "@/components/PatientAppointmentCard/PatientAppointmentCard";
import AppointmentFilterTabs from "@/components/Tabs/Tabs";
import { auth } from "../../../auth";
import { getAppointments } from "@/actions/appointment";
import { redirect } from "next/navigation";

export default async function Appointments({ searchParams }) {
  const session = await auth();

  if (!session) redirect("/");

  const { status } = searchParams;
  console.log("session=>", session);
  const { appointments, stats } = await getAppointments(
    session.user.role == "doctor" ? "doctor" : "user",
    session.user._id,
    status
  );
  const isDoctor = session.user.role == "doctor";
  return (
    <div className="container mx-auto">
      <h1 className="font-bold text-2xl mt-10">
        {isDoctor ? "Patients Appointments" : "Your Doctors Appointments"}
      </h1>
      <AppointmentFilterTabs status={status} />

      {isDoctor && (
        <>
          <div className="flex gap-4">
            <div className="shadow flex-grow p-3 rounded border">
              <h1 className="font font-bold text-2xl">
                Pending : {stats.pending}
              </h1>
            </div>
            <div className="shadow flex-grow p-3 rounded border">
              <h1 className="font font-bold text-2xl">
                Accepted : {stats.accepted}
              </h1>
            </div>
            <div className="shadow flex-grow p-3 rounded border">
              <h1 className="font font-bold text-2xl">
                Cancelled : {stats.cancelled}
              </h1>
            </div>
          </div>
        </>
      )}
      <div className="my-10 grid grid-cols-3 gap-4">
        {appointments?.map((appointment) =>
          isDoctor ? (
            <DoctorAppointmentCard
              key={appointment._id}
              appointment={appointment}
            />
          ) : (
            <PatientAppointmentCard
              key={appointment._id}
              appointment={appointment}
            />
          )
        )}
      </div>
    </div>
  );
}
