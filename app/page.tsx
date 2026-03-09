import { redirect } from "next/navigation";

export default function Home() {
  redirect("/domains/tenant1.localhost:3000");
}
