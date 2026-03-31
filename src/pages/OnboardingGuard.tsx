/* import { Navigate } from "react-router-dom"; */
/* import { useSelector } from "react-redux";
import type { RootState } from "@/store"; */

export default function OnboardingGuard({ children }: any) {
  /* const role = useSelector((state: RootState) => state.registrationState.role);
 */
  /* if (!role) {
    return <Navigate to="/onboarding" replace />;
  } */

  return children;
}
