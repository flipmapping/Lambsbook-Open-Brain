import { format } from "date-fns";
import { type Thought } from "@workspace/api-client-react/src/generated/api.schemas";
import { Badge } from "./ui";
import { Pin, Trash2, Edit3, MoreHorizontal } from "lucide-react";
import { useDeleteThought } from "@/hooks/use-thoughts";
import { useState } from "react";
import { ThoughtForm } from "./thought-form";

interface ThoughtCardProps {
  thought: Thought;
}

export function ThoughtCard({ thought }: ThoughtCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const deleteMutation = useDeleteThought();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this thought?")) {
      deleteMutation.mutate({ id: thought.id });
    }
  };

  return (
    <>
      <div className="group relative bg-card border border-border/50 rounded-xl p-5 glow-hover break-inside-avoid mb-4 flex flex-col gap-3">
        {/* Header Actions */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {thought.category && (
              <Badge variant="secondary" className="bg-white/5 hover:bg-white/10 text-white/70">
                {thought.category}
              </Badge>
            )}
            {thought.pinned && (
              <Badge variant="default" className="gap-1 px-2">
                <Pin className="w-3 h-3 fill-current" /> Pinned
              </Badge>
            )}
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 -mt-1 -mr-1">
            <button 
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
              title="Edit"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button 
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="text-foreground whitespace-pre-wrap leading-relaxed">
          {thought.content}
        </div>

        {/* Footer */}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {thought.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="text-[10px] py-0 border-white/10 text-muted-foreground">
                #{tag}
              </Badge>
            ))}
          </div>
          <span className="text-[11px] font-mono text-muted-foreground/50 shrink-0">
            {format(new Date(thought.createdAt), "MMM d, HH:mm")}
          </span>
        </div>
      </div>

      {isEditing && (
        <ThoughtForm 
          initialData={thought}
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </>
  );
}
