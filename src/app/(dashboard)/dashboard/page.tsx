import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default async function Dashboard() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full px-8 py-12 flex flex-col justify-center items-center text-center">
        <CardHeader>
          <CardTitle className={cn("text-xl leading-5 font-semibold")}>
            You don&apos;t have any sites added yet
          </CardTitle>
        </CardHeader>
        <div>
          <Image
            alt="empty sites"
            src={"./EmptyState.svg"}
            width={240}
            height={240}
          />
        </div>
        <CardFooter>
          <Button>Add your Site</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
