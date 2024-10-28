import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users2, Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate("/auth/login");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight">
          Manage your projects with
          <span className="text-indigo-600"> ease</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          Streamline your workflow, collaborate with your team, and deliver
          projects on time with our powerful project management solution.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <Button onClick={handleGetStarted} size="lg" className="gap-2">
            Get Started <ArrowRight className="size-4" />
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything you need to manage your projects
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Our comprehensive suite of features helps you stay organized and
              productive
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <LayoutDashboard className="size-12 text-indigo-600" />
              <h3 className="mt-4 text-xl font-semibold">
                Intuitive Dashboard
              </h3>
              <p className="mt-2 text-gray-600 text-center">
                Get a clear overview of your projects and tasks at a glance
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <Users2 className="size-12 text-indigo-600" />
              <h3 className="mt-4 text-xl font-semibold">Team Collaboration</h3>
              <p className="mt-2 text-gray-600 text-center">
                Work seamlessly with your team members in real-time
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-gray-50 rounded-lg">
              <Calendar className="size-12 text-indigo-600" />
              <h3 className="mt-4 text-xl font-semibold">Task Management</h3>
              <p className="mt-2 text-gray-600 text-center">
                Organize and track tasks with powerful management tools
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mt-4 text-xl text-indigo-100">
              Join thousands of teams already using our platform
            </p>
            <div className="mt-8">
              <Button onClick={handleGetStarted} size="lg" variant="secondary" className="gap-2">
                Start Free Trial <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
