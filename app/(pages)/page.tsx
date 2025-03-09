import { auth } from "@/auth";
import HomePage from "../components/home";
import LandingPage from "../components/landing-page";

export default async function Page() {
  const session = await auth(); 
  if(!session || !session.user) return  <LandingPage/>
  return <HomePage/>;
}
