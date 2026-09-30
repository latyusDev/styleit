import { Skeleton } from "@/components/ui/skeleton";

const CommentLoader = () => {
  return (
    <div className="w-full space-y-6">

      {/* =========================
          PARENT COMMENT
      ========================== */}
      <div className="flex gap-3">

        {/* Avatar */}
        <Skeleton className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-sidebar" />

        <div className="flex-1 space-y-2">
          <Skeleton className="w-full h-16  rounded bg-gradient-to-tr from-primary to-sidebar" />
        </div>
      </div>

      {/* =========================
          CHILD REPLY (1 LEVEL)
      ========================== */}
      <div className="flex gap-3 pl-8">

        {/* Thread line curve */}
        <div className="absolute left-4 w-4 h-6 border-l border-b border-gray-200 rounded-bl-lg" />

        {/* Avatar */}
        <Skeleton className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-sidebar" />

        <div className="flex-1 space-y-2">
          {/* Body */}
          <Skeleton className="w-full h-10 rounded bg-gradient-to-tr from-primary to-sidebar" />
        </div>
      </div>

    </div>
  );
};

export default CommentLoader;
