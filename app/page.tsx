import { redirect } from "next/navigation";

export default function RootIndex() {
  // The Shop tab is where this assignment lives; send people straight there.
  redirect("/shop");
}
