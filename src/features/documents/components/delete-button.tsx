import { useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"

import deleteDocument from "../server/actions/delete-document"

export default function DeleteButton({ fileName }: { fileName: string }) {
  const [isPending, startTransition] = useTransition()

  async function handleDelete() {
    startTransition(async () => {
      const response = await deleteDocument(fileName)

      if (response.status === "success") {
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    })
  }

  return (
    <form action={handleDelete} className="w-full">
      <Button
        disabled={isPending}
        variant={"destructive"}
        type="submit"
        className="w-full cursor-pointer"
      >
        {isPending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  )
}
