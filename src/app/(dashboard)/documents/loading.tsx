import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function DocumentsLoading() {
  return (
    <section className="w-full">
      {/* Header Loading */}
      <div className="flex items-center justify-between p-4">
        <Skeleton className="h-10 w-36" />
      </div>

      {/* Documents Grid Loading */}
      <div className="grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="p-0">
              {/* Document Preview Loading */}
              <div className="h-48 w-full bg-gray-100">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mb-2 inline-block h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                    <Skeleton className="mx-auto h-3 w-20" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {/* Title Loading */}
                <Skeleton className="h-5 w-full" />

                {/* Metadata Loading */}
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>

                {/* Date Loading */}
                <Skeleton className="h-3 w-24" />

                {/* Actions Loading */}
                <div className="flex items-center justify-between pt-2">
                  <Skeleton className="h-8 w-16" />
                  <div className="flex gap-1">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
