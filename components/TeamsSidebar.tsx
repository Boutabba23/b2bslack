import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Hash, Plus, Search, ChevronLeft } from "lucide-react";

export function TeamsSidebar({
  teams,
  activeTeamId,
  setActiveTeamId,
  onSearchChange,
  onCreateChannel,
  onCreateTeam,
  showBack = false,
}: TeamsSidebarProps) {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 320 }}
      exit={{ width: 0 }}
      transition={{ duration: 0.3 }}
      className="w-[320px] border-r bg-muted/20 flex flex-col"
    >
      <div className="h-14 border-b flex items-center px-4 gap-3">
        <Users className="w-5 h-5 text-muted-foreground" />
        <span className="font-semibold">Your Workspace</span>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search teams..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-2">
        {teams?.map((team) => (
          <motion.div
            key={team._id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTeamId(team._id)}
            className={`
              flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
              ${activeTeamId === team._id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
            `}
          >
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{team.name}</p>
              <p className="text-xs opacity-75 truncate">
                {team.description || "No description"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {showBack && (
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            <button
              onClick={() => setActiveTeamId(null)}
              className="flex-1 text-sm font-medium hover:text-primary transition-colors"
            >
              Back to Teams
            </button>
          </div>
        </div>
      )}

      <div className="p-4 border-t">
        <Button onClick={onCreateTeam} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Create Team
        </Button>
      </div>
    </motion.div>
  );
}

interface TeamsSidebarProps {
  teams: any[];
  activeTeamId: string | null;
  setActiveTeamId: (teamId: string | null) => void;
  onSearchChange: (search: string) => void;
  onCreateChannel: (teamId: string) => void;
  onCreateTeam: () => void;
  showBack?: boolean;
}