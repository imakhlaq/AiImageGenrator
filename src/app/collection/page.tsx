import axios from "axios";
import Image from "next/image";
import { Suspense } from "react";
import AllImages from "@/components/AllImages";

async function Page() {
  const { data } = await axios.get<Collection[]>(
    "http://localhost:3000/api/collection",
  );

  return (
    <Suspense fallback={<h3>Loadingggg</h3>}>
      <AllImages data={data} />
    </Suspense>
  );
}

export default Page;
