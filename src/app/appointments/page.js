import { columns } from "@/components/AppointmentsTable/column.js";
import { AppointmentTable } from "@/components/AppointmentsTable/data-table.js";
import { appointments } from "@/lib/data";

export default function Appointments() {
  return (
    <div className="container mx-auto">
      <div className="my-20">
        <AppointmentTable columns={columns} data={appointments} />
      </div>
    </div>
  );
}
