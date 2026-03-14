import { useState } from "react";
import { useLocation } from "wouter";
import { Button, Input } from "@/components/ui";
import { BrainCircuit, Search, Plus, Loader2, Sparkles, Hash } from "lucide-react";
import { useListThoughts, useListCategories } from "@/hooks/use-thoughts";
import { ThoughtCard } from "@/components/thought-card";
import { ThoughtForm } from "@/components/thought-form";

export default function Home() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const currentCategory = searchParams.get("category") || "";
  const currentSearch = searchParams.get("search") || "";
  
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch data
  const { data: thoughts, isLoading: isLoadingThoughts } = useListThoughts({
    category: currentCategory || undefined,
    search: currentSearch || undefined,
  });
  
  const { data: categories, isLoading: isLoadingCategories } = useListCategories();

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    if (searchInput) params.set("search", searchInput);
    else params.delete("search");
    setLocation(`/?${params.toString()}`);
  };

  const handleCategorySelect = (cat: string) => {
    const params = new URLSearchParams(window.location.search);
    if (currentCategory === cat) {
      params.delete("category"); // toggle off
    } else {
      params.set("category", cat);
    }
    setLocation(`/?${params.toString()}`);
  };

  // Sort pinned to top
  const sortedThoughts = thoughts ? [...thoughts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }) : [];

  return (
    <div className="min-h-screen flex w-full overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-border bg-card/30 hidden md:flex flex-col h-screen sticky top-0 shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary shadow-[0_0_15px_-3px_hsl(var(--primary)/0.5)]">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <h1 className="font-display font-bold text-lg tracking-tight">Open Brain</h1>
        </div>

        <div className="px-4 pb-4">
          <Button 
            className="w-full justify-start gap-2 h-11"
            onClick={() => setIsFormOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Capture Thought
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar">
          <div>
            <h3 className="text-xs font-mono font-semibold text-muted-foreground mb-3 px-2 tracking-wider">FILTERS</h3>
            <div className="space-y-1">
              <button
                onClick={() => handleCategorySelect("")}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!currentCategory ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'}`}
              >
                All Thoughts
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-semibold text-muted-foreground mb-3 px-2 tracking-wider">CATEGORIES</h3>
            {isLoadingCategories ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
              </div>
            ) : categories?.length === 0 ? (
              <p className="text-xs text-muted-foreground px-3">No categories yet.</p>
            ) : (
              <div className="space-y-1">
                {categories?.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentCategory === cat ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'}`}
                  >
                    <Hash className="w-3 h-3 opacity-50" />
                    <span className="truncate">{cat}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10 shrink-0 flex items-center justify-between px-4 md:px-8 gap-4">
          <div className="md:hidden flex items-center gap-3">
             <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <BrainCircuit className="w-5 h-5" />
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search thoughts..." 
              className="pl-10 h-11 bg-card/50 border-white/5 rounded-full"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </form>

          <div className="md:hidden">
            <Button size="icon" onClick={() => setIsFormOpen(true)}>
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 no-scrollbar">
          
          {/* Status Headers */}
          {(currentCategory || currentSearch) && (
            <div className="mb-6 flex items-center gap-2 text-sm font-mono text-muted-foreground">
              Showing results for: 
              {currentCategory && <span className="text-primary bg-primary/10 px-2 py-0.5 rounded">category:{currentCategory}</span>}
              {currentSearch && <span className="text-foreground bg-white/10 px-2 py-0.5 rounded">search:"{currentSearch}"</span>}
              <button 
                onClick={() => setLocation("/")}
                className="ml-2 underline hover:text-foreground"
              >
                Clear
              </button>
            </div>
          )}

          {isLoadingThoughts ? (
            <div className="w-full h-64 flex flex-col items-center justify-center gap-4 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="font-mono text-sm">Accessing neural net...</p>
            </div>
          ) : sortedThoughts.length === 0 ? (
            <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center text-center max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-primary/50" />
              </div>
              <h2 className="font-display text-xl font-medium mb-2 text-foreground">A Blank Canvas</h2>
              <p className="text-muted-foreground text-sm mb-8">
                Your mind capture platform is empty. Start capturing ideas, concepts, and fleeting thoughts.
              </p>
              <Button onClick={() => setIsFormOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                Capture First Thought
              </Button>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 pb-20">
              {sortedThoughts.map((thought) => (
                <ThoughtCard key={thought.id} thought={thought} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Forms */}
      {isFormOpen && (
        <ThoughtForm 
          onSuccess={() => setIsFormOpen(false)} 
          onCancel={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
}
