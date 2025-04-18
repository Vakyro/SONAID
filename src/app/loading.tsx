export default function Loading() {
  return (
    <div className="fixed inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-background p-4 rounded-lg shadow-lg flex flex-col items-center gap-2">
        <span className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent"></span>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
