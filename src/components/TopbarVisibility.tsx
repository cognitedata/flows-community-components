import { useLocation } from "react-router-dom";

export function TopbarVisibility({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const pathname = location.pathname;
  const hideTopbar = pathname.startsWith("/eos/shift-handover-app");
  return <>{!hideTopbar && children}</>;
}
