"use client";

import { useRouter, useSearchParams } from "next/navigation";

const AdminPage = () => {
  const router = useRouter();
  const handleChange = () => {
    router.push("/?role=user");
  };
  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={() => handleChange()}>change</button>
    </div>
  );
};

export default AdminPage;
