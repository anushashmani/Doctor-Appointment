import connectDB from "@/lib/connectDB";
import { appointments } from "@/lib/data";
import { AppointmentModel } from "@/lib/models/AppointmentModel";
import { UserModel } from "@/lib/models/UserModel";
import { RequestModel } from "@/lib/models/RequestModel";
import { ReadonlyURLSearchParams } from "next/navigation";

export async function POST(req) {
  await connectDB();
  try {
    const obj = await req.json();

    let newAppointment = await new AppointmentModel({ ...obj });

    newAppointment = await newAppointment.save();

    return Response.json(
      {
        error: false,
        msg: "Your Appointment is booked, You will soon have confirmation",
        appointment: newAppointment,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        error: true,
        msg: "Something Went Wrong",
      },
      { status: 400 }
    );
  }
}
export async function GET(req) {
  await connectDB();
  const query = {};
  const doctor = req?.nextUrl?.searchParams?.get("doctor");
  const user = req?.nextUrl?.searchParams?.get("user");
  const status = req?.nextUrl?.searchParams?.get("status");
  const now = Date.now();

  if (doctor) {
    const doctorRequest = await RequestModel.findOne({ user: doctor });
    query.request = doctorRequest._id;
  }
  if (status && status !== "upcoming" && status !== "past")
    query.status = status;

  if (status && status == "upcoming") {
    query.date = { $gt: now };
    query.status = "accepted";
  }
  if (status && status == "past") {
    query.date = { $lt: now };
  }

  const stats = {
    accepted: await AppointmentModel.find({
      status: "accepted",
    }).countDocuments(),
    cancelled: await AppointmentModel.find({
      status: "cancelled",
    }).countDocuments(),
    pending: await AppointmentModel.find({
      status: "pending",
    }).countDocuments(),
  };

  if (user) query.user = user;

  const appointments = await AppointmentModel.find(query)
    .populate("user") // Populate user directly in AppointmentModel
    .populate({
      path: "request",
      populate: { path: "user", model: "Users" }, // Populate user inside request
    })
    .lean();

  return Response.json(
    {
      error: false,
      msg: "Appointments Fetched Successfully",
      appointments,
      stats,
    },
    { status: 200 }
  );
}

export async function PUT(req) {
  await connectDB();
  try {
    const { id, status } = await req.json();

    const update = await AppointmentModel.findOneAndUpdate(
      { _id: id },
      { status: status }
    ).exec();

    return Response.json(
      {
        error: false,
        msg: "Appointment Updated Successfully",
        appointment: update,
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        error: true,
        msg: "Something Went Wrong",
      },
      { status: 400 }
    );
  }
}
export async function DELETE(req) {}
