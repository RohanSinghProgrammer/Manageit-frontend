import { useState } from "react";
import { ChevronDown, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  organizations: string[];
  currentOrg: string;
  onOrgChange: (org: string) => void;
}

const Navbar: FC<NavbarProps> = ({
  organizations,
  currentOrg,
  onOrgChange,
}) => {
  const navigate = useNavigate();
  const [selectedOrg, setSelectedOrg] = useState<string>(currentOrg);

  const handleOrgChange = (org: string) => {
    setSelectedOrg(org);
    onOrgChange(org);
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
        <Select value={selectedOrg} onValueChange={handleOrgChange}>
          <SelectTrigger className="flex items-center space-x-2">
            <span>{selectedOrg}</span>
            <ChevronDown className="w-4 h-4" />
          </SelectTrigger>
          <SelectContent className="absolute mt-2 w-48 bg-white shadow-lg rounded-md py-1">
            {organizations.map((org) => (
              <SelectItem
                key={org}
                value={org}
                className={`block px-4 py-2 text-sm cursor-pointer ${
                  selectedOrg === org ? "bg-gray-100" : ""
                }`}
              >
                {org}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Avatar
        onClick={() => navigate(`/${selectedOrg}/user-management/${123}`)}
        className="cursor-pointer"
      >
        <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
        <AvatarFallback>
          <User className="w-6 h-6" />
        </AvatarFallback>
      </Avatar>
    </nav>
  );
};

export default Navbar;
