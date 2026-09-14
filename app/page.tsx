import HomeApp from "@/components/HomeApp";
import HomeInfo from "@/components/HomeInfo";

// Server page so the explainer renders as plain HTML; the interactive generator
// lives in the client component.
export default function Page() {
  return <HomeApp info={<HomeInfo />} />;
}
