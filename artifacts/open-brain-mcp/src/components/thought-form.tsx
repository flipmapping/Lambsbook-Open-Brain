import { useState, useEffect } from "react";
import { Button, Input, Textarea } from "./ui";
import { BrainCircuit, Pin, X } from "lucide-react";
import { useCreateThought, useUpdateThought } from "@/hooks/use-thoughts";
import { type Thought } from "@workspace/api-client-react/src/generated/api.schemas";
import { formatTags } from "@/lib/utils";

interface ThoughtFormProps {
  initialData?: Thought;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ThoughtForm({ initialData, onSuccess, onCancel }: ThoughtFormProps) {
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [tagsStr, setTagsStr] = useState(initialData?.tags?.join(", ") || "");
  const [pinned, setPinned] = useState(initialData?.pinned || false);

  const createMutation = useCreateThought();
  const updateMutation = useUpdateThought();

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const payload = {
      content: content.trim(),
      category: category.trim() || "Uncategorized",
      tags: formatTags(tagsStr),
      pinned,
    };

    try {
      if (initialData) {
        await updateMutation.mutateAsync({
          id: initialData.id,
          data: payload,
        });
      } else {
        await createMutation.mutateAsync({
          data: payload,
        });
      }
      onSuccess();
    } catch (error) {
      console.error("Failed to save thought", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <div className="flex items-center gap-2 text-primary font-display font-medium">
            <BrainCircuit className="w-5 h-5" />
            {initialData ? "Refine Thought" : "Capture Thought"}
          </div>
          <button 
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-white/5 text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground font-mono">CONTENT</label>
            <Textarea 
              autoFocus
              placeholder="What's on your mind? Use markdown if you like..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] text-base"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground font-mono">CATEGORY</label>
              <Input 
                placeholder="e.g. Project Ideas"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground font-mono">TAGS (COMMA SEPARATED)</label>
              <Input 
                placeholder="e.g. urgent, frontend, concept"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                className="font-mono text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={() => setPinned(!pinned)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                pinned ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Pin className={`w-4 h-4 ${pinned ? "fill-primary" : ""}`} />
              {pinned ? "Pinned to top" : "Pin thought"}
            </button>

            <div className="flex items-center gap-3">
              <Button type="button" variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" isLoading={isPending}>
                {initialData ? "Update" : "Capture"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
