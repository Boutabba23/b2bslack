"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { SendMessage } from "@/components/SendMessage";
import { MessageList } from "@/components/MessageList";
import { TeamsSidebar } from "@/components/TeamsSidebar";
import { MessageSquare, Hash, ChevronLeft, Users, Settings, Plus } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export function HomeContent() {
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  const [teamSearch, setTeamSearch] = useState("");
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamDescription, setNewTeamDescription] = useState("");

  const user = useQuery(api.functions.getUser);
   const teams = useQuery(api.functions.getTeams);
   const teamsFiltered = teams?.filter(team => 
     team.name.toLowerCase().includes(teamSearch.toLowerCase())
   );
   const channels = activeTeamId ? useQuery(api.functions.getChannels, { teamId: activeTeamId }) : null;
   const messages = activeChannelId ? useQuery(
     api.functions.getMessages,
     { channelId: activeChannelId }
   ) : null;
  
  const createTeamMutation = useMutation(api.functions.createTeam);
  const createChannelMutation = useMutation(api.functions.createChannel);

  const handleCreateTeam = async () => {
    if (!newTeamName.trim()) return;
    await createTeamMutation({ name: newTeamName, description: newTeamDescription });
    setNewTeamName("");
    setNewTeamDescription("");
    setShowCreateTeamModal(false);
  };

  const handleCreateChannel = async (teamId: string) => {
    const channelName = prompt("Enter channel name:");
    if (!channelName?.trim()) return;
    
    const type = confirm("Is this a private channel?") ? "private" : "public";
    await createChannelMutation({
      teamId,
      name: channelName,
      type,
    });
  };

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">Slack B2B</h1>
          <p className="text-muted-foreground mb-8">Connect with your team in real-time</p>
          <Link href="/auth/signin">
            <Button size="lg" className="text-lg">
              Sign in to get started
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {activeTeamId ? (
        <TeamsSidebar
          teams={teamsFiltered}
          activeTeamId={activeTeamId}
          setActiveTeamId={setActiveTeamId}
          onSearchChange={setTeamSearch}
          onCreateChannel={handleCreateChannel}
          onCreateTeam={() => setShowCreateTeamModal(true)}
          showBack={true}
        />
      ) : (
        <TeamsSidebar
          teams={teamsFiltered}
          activeTeamId={activeTeamId}
          setActiveTeamId={setActiveTeamId}
          onSearchChange={setTeamSearch}
          onCreateTeam={() => setShowCreateTeamModal(true)}
          showBack={false}
        />
      )}

      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center px-4 gap-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            <span className="font-bold text-lg">Slack B2B</span>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              {user.username}
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!activeTeamId ? (
            <motion.div
              key="teams"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 p-6 overflow-auto"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-3xl font-bold">Your Teams</h1>
                  <Button onClick={() => setShowCreateTeamModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Team
                  </Button>
                </div>

                {teams?.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <p className="text-muted-foreground mb-4">
                        You haven't joined any teams yet
                      </p>
                      <Button onClick={() => setShowCreateTeamModal(true)}>
                        Create your first team
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {teams?.map((team) => (
                      <Card
                        key={team._id}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => setActiveTeamId(team._id)}
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            {team.name}
                          </CardTitle>
                          <CardDescription>
                            {team.description || "No description"}
                          </CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                )}

                {showCreateTeamModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-md">
                      <CardHeader>
                        <CardTitle>Create New Team</CardTitle>
                        <CardDescription>
                          Enter details for your new team workspace
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Team Name</label>
                          <Input
                            placeholder="Enter team name..."
                            value={newTeamName}
                            onChange={(e) => setNewTeamName(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Description (optional)</label>
                          <Input
                            placeholder="What's your team about?"
                            value={newTeamDescription}
                            onChange={(e) => setNewTeamDescription(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setShowCreateTeamModal(false);
                              setNewTeamName("");
                              setNewTeamDescription("");
                            }}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleCreateTeam}>Create Team</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </motion.div>
          ) : !activeChannelId ? (
            <motion.div
              key="channels"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 p-6 overflow-auto"
            >
              <div className="max-w-4xl mx-auto h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => setActiveTeamId(null)}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <h1 className="text-2xl font-bold">Channels</h1>
                  </div>
                  <Button onClick={() => activeTeamId && createChannelMutation({ teamId: activeTeamId, name: 'general', type: 'public' })}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Channel
                  </Button>
                </div>

                <div className="flex-1 space-y-2">
                  {channels?.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      <Hash className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No channels yet</p>
                      <Button variant="outline" className="mt-4" onClick={() => activeTeamId && createChannelMutation({ teamId: activeTeamId, name: 'general', type: 'public' })}>
                        Create your first channel
                      </Button>
                    </div>
                  ) : (
                    channels?.map((channel) => (
                      <div
                        key={channel._id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                        onClick={() => setActiveChannelId(channel._id)}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Hash className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{channel.name}</p>
                          {channel.description && (
                            <p className="text-sm text-muted-foreground">{channel.description}</p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <div key="chat" className="flex-1 flex flex-col overflow-hidden">
              <div className="h-14 border-b flex items-center px-4 gap-3">
                <Button variant="ghost" size="icon" onClick={() => setActiveChannelId(null)}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Hash className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium">
                  {channels?.find(c => c._id === activeChannelId)?.name}
                </span>
              </div>
              
              <div className="flex-1 overflow-auto">
                {messages ? (
                  <MessageList messages={messages} />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    Loading messages...
                  </div>
                )}
              </div>

              <div className="p-4 border-t">
                <SendMessage channelId={activeChannelId} teamId={activeTeamId} />
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
