import { redirect } from "next/navigation"

export default function OverviewPage() {
  // Redirect to the About page as the default
  redirect("/overview/about")
}
