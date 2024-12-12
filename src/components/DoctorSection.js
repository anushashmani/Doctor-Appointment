import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/data";
import { Button } from "./ui/button";
import Link from "next/link";
import { getRequest } from "@/actions/requests";
import DoctorCard from "./DoctorCard";

export default async function DoctorsSection({ isHome }) {
  const { requests } = await getRequest("accepted");

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Doctors You Need</h1>

        {isHome ? (
          <Link href={"/doctors"}>
            <Button>See All</Button>
          </Link>
        ) : (
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 my-3 mt-10 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <DoctorCard key={request._id} request={request} isAdmin={false} />
        ))}
      </div>
    </div>
  );
}
