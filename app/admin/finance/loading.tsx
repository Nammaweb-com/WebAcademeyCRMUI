export default function Loading() {
  return (
    <div className="p-6 space-y-4">
      <div className="h-8 w-64 rounded-md bg-muted" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-28 rounded-md bg-muted" />
        <div className="h-28 rounded-md bg-muted" />
        <div className="h-28 rounded-md bg-muted" />
      </div>
      <div className="h-10 w-52 rounded-md bg-muted" />
      <div className="h-64 rounded-md bg-muted" />
    </div>
  )
}
