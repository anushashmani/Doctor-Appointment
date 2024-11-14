import connectDB from "@/lib/connectDB";
import { RequestModel } from "@/lib/models/RequestModel";
import { UserModel } from "@/lib/models/UserModel";

export async function POST(req) {
  await connectDB();
  try {
    const obj = await req.json();

    let isUserRequestedBefore = await RequestModel.findOne({
      user: obj.user,
    });
    if (isUserRequestedBefore) {
      return Response.json(
        {
          error: true,
          msg: "You had already applied as a doctor",
        },
        { status: 403 }
      );
    }

    let newRequest = await new RequestModel({ ...obj });
    newRequest = await newRequest.save();

    return Response.json(
      {
        error: false,
        msg: "Request Register Successfully",
        user: newRequest,
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
  const status = req?.nextUrl?.searchParams?.get("status");
  if (status && status != "all") {
    query.status = status;
  }

  const requests = await RequestModel.find(query).populate("user");
  return Response.json(
    {
      error: false,
      msg: "Requests fetched Successfully",
      requests,
    },
    { status: 200 }
  );
}

export async function PUT(req) {
  await connectDB();
  try {
    const obj = await req.json();
    let { id, status } = obj;
    const request = await RequestModel.findOne({ _id: id });

    await UserModel.findOneAndUpdate({ _id: request.user }, { role: "doctor" });
    const updated = await RequestModel.findOneAndUpdate(
      {
        _id: id,
      },
      { status: status }
    ).exec();

    return Response.json(
      {
        error: false,
        msg: "Requests updated Successfully",
        request: updated,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        error: false,
        msg: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {}
