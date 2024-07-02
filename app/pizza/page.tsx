import PizzaContainer from "@/components/organisms/PizzaContainer";

export default function Pizza() {
  return (
    <main className="flex flex-col items-center justify-center container mx-auto py-1 min-h-[100vh]">
      <div className="mt-5">
        <PizzaContainer />
      </div>
    </main>
  );
}
