import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Dashboard() {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full px-8 py-12 flex flex-col justify-center items-center text-center">
        <CardHeader>
          <CardTitle className="text-2xl">No sites added</CardTitle>
          <CardDescription>
            Add your site to manage your site&apos;s feedbacks
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button>Add your Site</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
