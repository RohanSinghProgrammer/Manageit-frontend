import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2, Search, User } from "lucide-react";
import Navbar from "../board/components/Navbar";
import AddMemberDialog from "./components/AddMemberDialog";
import EditMemberDialog from "./components/EditMemberDialog";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

const Teams = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      avatarUrl: "https://github.com/shadcn.png",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Member",
      avatarUrl: "https://github.com/shadcn.png",
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isEditMemberOpen, setIsEditMemberOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", role: "" });
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const handleAddMember = () => {
    setMembers([...members, { ...newMember, id: Date.now().toString() }]);
    setNewMember({ name: "", email: "", role: "" });
    setIsAddMemberOpen(false);
  };

  const handleEditMember = () => {
    if (editingMember) {
      setMembers(
        members.map((member) =>
          member.id === editingMember.id ? editingMember : member
        )
      );
      setEditingMember(null);
      setIsEditMemberOpen(false);
    }
  };

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
              <p className="text-gray-500">
                Manage your team members and their roles.
              </p>
            </div>

            <AddMemberDialog
              isOpen={isAddMemberOpen}
              onOpenChange={setIsAddMemberOpen}
              newMember={newMember}
              onNewMemberChange={setNewMember}
              onAddMember={handleAddMember}
            />

            <EditMemberDialog
              isOpen={isEditMemberOpen}
              onOpenChange={setIsEditMemberOpen}
              editingMember={editingMember}
              onEditingMemberChange={setEditingMember}
              onEditMember={handleEditMember}
            />
          </div>

          <Card>
            <CardHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search members..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={member.avatarUrl} />
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-gray-500">
                                {member.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditingMember(member);
                                  setIsEditMemberOpen(true);
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleRemoveMember(member.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Teams;
