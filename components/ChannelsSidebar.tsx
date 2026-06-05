import { motion } from "framer-motion";
import { TeamsSidebarProps } from "@/components/TeamsSidebar";
import { Hash, Search, ChevronLeft, Plus } from "lucide-react";

export function ChannelsSidebar({
  teams,
  activeTeamId,
  setActiveTeamId,
  onSearchChange,
  onCreateChannel,
  onCreateTeam,
  showBack = false,
}: TeamsSidebarProps) {
  const currentTeam = teams?.find(team => team._id === activeTeamId);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: 280 }}
      exit={{ width: 0 }}
      transition={{ duration: 0.3 }}
      className="w-[280px] border-r bg-muted/20 flex flex-col"
    >
      <div className="h-14 border-b flex items-center px-4 gap-3">
        {showBack ? (
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Hash className="w-5 h-5 text-muted-foreground" />
        )}
        <span className="font-semibold">{currentTeam?.name || "Channels"}</span>
      </div>

      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search channels..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {currentTeam && (
          <>
            <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
              Channels
            </div>
            <div className="space-y-1">
              {currentTeam.channels?.map((channel: any) => (
                <motion.div
                  key={channel._id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTeamId(channel._id)}
                  className={`
                    flex items-center gap-3 p-2 rounded cursor-pointer text-sm
                    ${activeTeamId === channel._id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}
                  `}
                >
                  <Hash className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{channel.name}</span>
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCreateChannel(activeTeamId)}
                className="w-full flex items-center gap-3 p-2 rounded hover:bg-muted text-sm text-muted-foreground"
              >
                <Plus className="w-4 h-4" />
                <span>Add channel</span>
              </motion.button>
            </div>
          </>
        )}
      </div>

      {showBack && (
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            <button
              onClick={() => setActiveTeamId(null)}
              className="flex-1 text-sm font-medium hover:text-primary transition-colors"
            >
              Back to Channels
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}