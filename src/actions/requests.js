"use server";

import { revalidatePath } from "next/cache";

export async function addRequest(data) {
  let add = await fetch(`${process.env.BASE_URI}api/requests`, {
    method: "POST",
    body: JSON.stringify(data),
  });

  add = add.json();

  return add;
}
export async function getRequest(status) {
  let requests = await fetch(
    `${process.env.BASE_URI}api/requests?status=${status ? status : ""}`,
    {
      cache: "no-cache",
    }
  );
  requests = requests.json();

  return requests;
}
export async function getSingleRequest(id) {
  let request = await fetch(`${process.env.BASE_URI}api/requests/${id}`, {
    cache: "no-cache",
  });
  request = request.json();

  return request;
}

export async function updateRequest(id, status) {
  let requests = await fetch(`${process.env.BASE_URI}api/requests`, {
    method: "PUT",
    body: JSON.stringify({ id, status }),
  });
  requests = requests.json();
  revalidatePath("/admin/requests");
  return requests;
}
