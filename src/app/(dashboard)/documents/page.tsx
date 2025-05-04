import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DocumentCard from "@/features/documents/components/document-card"
import { DocumentUploadDialog } from "@/features/documents/components/document-uploud-dialog"
import getResumes from "@/features/documents/server/data-access/get-resumes"

export default async function DocumentsPage() {
  const resumesData = await getResumes()

  return (
    <section>
      <Tabs defaultValue="tab-1" className="w-full">
        <div className="flex items-center justify-between p-4">
          <TabsList className="gap-1 bg-transparent">
            <TabsTrigger
              value="tab-1"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer rounded-full data-[state=active]:shadow-none"
            >
              Resumes
            </TabsTrigger>
            <TabsTrigger
              value="tab-2"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground cursor-pointer rounded-full data-[state=active]:shadow-none"
            >
              Cover Letters
            </TabsTrigger>
          </TabsList>
          <DocumentUploadDialog />
        </div>
        <TabsContent value="tab-1">
          <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {resumesData.map((resume) => (
              <DocumentCard key={resume.id} resume={resume} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="tab-2">
          <p className="text-muted-foreground p-4 text-center text-xs">
            {resumesData.map((resume) => (
              <DocumentCard key={resume.id} resume={resume} />
            ))}
          </p>
        </TabsContent>
      </Tabs>
    </section>
  )
}
