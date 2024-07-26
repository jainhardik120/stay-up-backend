import Image from "next/image";
import NewSlideForm from "./components/NewSlideForm";
import NotificationForm from "./components/NotificationForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1>Stay Up Admin Panel</h1>
      <NewSlideForm />
      <NotificationForm />
    </div>
  );
}
