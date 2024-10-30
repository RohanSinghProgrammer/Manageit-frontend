import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Navbar from "./components/Navbar";
import CreateBoardDialog from "./components/reateBoardDialog";

const organizations = ["Organization 1", "Organization 2", "Organization 3"];
const boards = [
  { name: "Board 1", bgImage: "/images/board1.jpg" },
  { name: "Board 2", bgImage: "/images/board2.jpg" },
  { name: "Board 3", bgImage: "/images/board3.jpg" },
];

const Organizations = () => {
  const [selectedOrg, setSelectedOrg] = useState(organizations[0]);
  const [isCreateBoardDialogOpen, setIsCreateBoardDialogOpen] = useState(false);

  const handleCreateBoard = (name: string) => {
    console.log(`Creating board: ${name}`);
  };

  return (
    <>
      <Navbar
        organizations={organizations}
        currentOrg={selectedOrg}
        onOrgChange={setSelectedOrg}
      />
      <div className="flex min-h-[calc(100vh-72px)] bg-gray-100">
        <aside className="w-64 bg-white/80 backdrop-blur-sm shadow-lg hidden md:block overflow-auto border-r border-gray-100">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Organizations</h2>
            <ul className="space-y-3">
              {organizations.map((org) => (
                <li
                  key={org}
                  className={`px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                    selectedOrg === org
                      ? "bg-gradient-to-r from-black to-gray-700 text-white shadow-md"
                      : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => setSelectedOrg(org)}
                >
                  {org}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{selectedOrg} Boards</h1>
            <Button
              className="flex items-center space-x-2"
              onClick={() => setIsCreateBoardDialogOpen(true)}
            >
              <span>+ Create Board</span>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board) => (
              <Card key={board.name} className="relative">
                <img
                  src={board.bgImage}
                  alt={board.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <CardContent className="relative z-10 p-4">
                  <CardTitle className="text-xl font-bold">
                    {board.name}
                  </CardTitle>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
      <CreateBoardDialog
        isOpen={isCreateBoardDialogOpen}
        onClose={() => setIsCreateBoardDialogOpen(false)}
        onCreateBoard={handleCreateBoard}
      />
    </>
  );
};

export default Organizations;
