import { redirect } from "next/navigation"

export default function HomePage() {
  // Redirect to the new overview section
  redirect("/overview/about")
}