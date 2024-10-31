import { Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import CreateBoardDialog from "../../organizations/components/CreateBoardDialog";

const Navbar = () => {
  const [isCreateBoardDialogOpen, setIsCreateBoardDialogOpen] = useState(false);

  const handleCreateBoard = (name: string) => {
    console.log(`Creating board: ${name}`);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <img className="h-8 w-8" src="/logo.svg" alt="Logo" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                Board
              </span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 md:flex md:items-center">
              <NavLink
                to="/organizations/123/board/123"
                className={({ isActive }) =>
                  isActive
                    ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                }
              >
                Boards
              </NavLink>
              <NavLink
                to="/organizations/123/teams"
                className={({ isActive }) =>
                  isActive
                    ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                }
              >
                Teams
              </NavLink>
              <Button
                variant="outline"
                className="inline-flex items-center gap-x-2 text-sm font-medium"
                onClick={() => setIsCreateBoardDialogOpen(true)}
              >
                <Plus className="size-4" />
                Create
              </Button>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="size-5" />
            </Button>
            <div className="ml-3 relative">
              <div>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateBoardDialog
        isOpen={isCreateBoardDialogOpen}
        onClose={() => setIsCreateBoardDialogOpen(false)}
        onCreateBoard={handleCreateBoard}
      />
    </nav>
  );
};

export default Navbar;
