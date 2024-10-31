import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Navbar from "./components/Navbar";
import CreateBoardDialog from "./components/CreateBoardDialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Layout, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const organizations = ["Organization 1", "Organization 2", "Organization 3"];
const boards = [
  { name: "Board 1", bgImage: "/images/board1.jpg" },
  { name: "Board 2", bgImage: "/images/board2.jpg" },
  { name: "Board 3", bgImage: "/images/board3.jpg" },
];

const Organizations = () => {
  const [selectedOrg, setSelectedOrg] = useState(organizations[0]);
  const [isCreateBoardDialogOpen, setIsCreateBoardDialogOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

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
        <aside className="w-64 bg-white shadow-sm hidden md:block overflow-auto">
          <div className="p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4 px-2">Organizations</h2>
            <Accordion 
              type="single" 
              collapsible 
              className="space-y-1"
              value={openAccordion}
              onValueChange={setOpenAccordion}
            >
              {organizations.map((org) => (
                <AccordionItem key={org} value={org}>
                  <AccordionTrigger
                    className={`px-3 py-2.5 hover:no-underline ${
                      selectedOrg === org && openAccordion !== org
                        ? "bg-gray-900 text-white rounded-md"
                        : "text-gray-700 hover:bg-gray-50 rounded-md"
                    }`}
                    onClick={() => setSelectedOrg(org)}
                  >
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded bg-gray-200 mr-3 flex items-center justify-center">
                        {org.charAt(0)}
                      </div>
                      <span className="font-medium">{org}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="py-1">
                      <div className="flex items-center px-4 py-2 text-sm text-gray-900 bg-gray-100 transition-colors cursor-pointer">
                        <Layout className="h-4 w-4 mr-2" />
                        <span className="ml-6">Boards</span>
                      </div>
                      <div 
                        className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => navigate("/organizations/123/teams")}
                      >
                        <Users className="h-4 w-4 mr-2" />
                        <span className="ml-6">Teams</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
              <Card 
                key={board.name} 
                className="relative cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() => navigate("/organizations/123/board/123")}
              >
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
