import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  Calendar,
  BarChart3,
  Clock,
  Plus,
  Edit3,
  Trash2,
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  Github,
  Mail,
  Phone,
  LucideIcon,
} from "lucide-react";
import useIsMobile from "../hooks/isMobile";
import FeatureCard from "../components/Landing/FeatureCard";
import StepCard from "@/components/Landing/StepCard";
import DemoSubjectCard from "@/components/Landing/DemoSubjectCard";
import { Button } from "@chakra-ui/react";
import Footer from "@/components/Landing/Footer";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const isMobile = useIsMobile();

  const navigate = useNavigate();

  const numOfFloats = isMobile ? 6 : 12;

  useEffect(() => {
    // Simulate loading
    const loadingTimer = setTimeout(() => setLoading(false), 2000);
    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  // Loader Component
  const Loader: React.FC = () => (
    <div className="fixed inset-0 bg-gray-50 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-red-400 border-b-transparent rounded-full animate-spin animation-delay-150"></div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          AttendanceTracker
        </h2>
        <p className="text-gray-600">Loading your attendance solution...</p>
      </div>
    </div>
  );

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-red-400 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">
                Attendance Tracker
              </span>
            </div>
            <Button
              position="relative"
              overflow="hidden"
              px={6}
              py={2}
              borderRadius="full"
              fontWeight="semibold"
              color="gray.800"
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              transition="all 0.3s ease"
              _hover={{
                boxShadow: "xl",
                borderColor: "transparent",
                color: "white",
                bgGradient: "linear(to-r, yellow.400, red.500)",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative pt-32 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center"
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating attendance cards */}
          {Array.from({ length: numOfFloats }).map((_, i) => (
            <div
              key={i}
              className={`absolute bg-white/2 backdrop-blur-sm rounded-xl p-3 border border-white/10 animate-float-${
                i % 3
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
            >
              <div className="flex items-center space-x-2 text-white/50 text-xs">
                <div
                  className={`w-2 h-2 rounded-full ${
                    i % 3 === 0
                      ? "bg-green-400"
                      : i % 3 === 1
                      ? "bg-yellow-400"
                      : "bg-red-400"
                  }`}
                ></div>
                <span>
                  {i % 3 === 0 ? "Present" : i % 3 === 1 ? "85%" : "Absent"}
                </span>
              </div>
            </div>
          ))}

          <div className="absolute -top-48 -left-24 w-[600px] h-[600px] bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-64 right-0 w-[500px] h-[500px] bg-gradient-to-r from-red-400/15 to-yellow-400/15 rounded-full blur-3xl animate-pulse-slower"></div>

          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-8 h-full">
              {Array.from({ length: 48 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center">
                  <CheckCircle
                    className="w-4 h-4 text-white animate-pulse"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center flex flex-col items-center justify-center">
          <div className="mb-6">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 text-white/90 text-sm mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Track Smart, Study Smarter
            </div>
          </div>

          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Never Lose Track of Your{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-gradient">
                Classes
              </span>
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-full animate-expand"></div>
            </span>
          </p>

          <div className="mt-3">
            <p className="text-lg sm:text-lg md:text-2xl text-white/80 mb-10 max-w-4xl mx-auto leading-relaxed">
              Effortless attendance tracking designed for students. One tap to
              record, smart calculations to keep you informed, and automatic
              management to keep you focused.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 mt-4">
            <button
              className="group relative px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20"
              onClick={() => navigate("/register")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <span className="relative z-10 flex items-center p-2 text-orange-500 group-hover:text-white transition-colors duration-300">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button
              className="group relative px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm bg-white/10 border border-white/20"
              onClick={() => {
                const demoSection = document.getElementById("demo");
                if (demoSection) {
                  demoSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <span className="relative z-10 flex items-center p-2 text-orange-500 group-hover:text-white transition-colors duration-300">
                <Calendar className="mr-2 w-5 h-5" />
                View Demo
              </span>
            </button>
          </div>

          {/* Stats Preview */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">85%</div>
              <div className="text-white/70 text-sm">Avg Attendance</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">2.3k+</div>
              <div className="text-white/70 text-sm">Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">50+</div>
              <div className="text-white/70 text-sm">Universities</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-white">99%</div>
              <div className="text-white/70 text-sm">Accuracy</div>
            </div>
          </div> */}
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50 text-sm animate-bounce flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center mb-2">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
          <span>Scroll to explore</span>
        </div>

        <style>{`
          @keyframes float-0 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes float-1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-3deg); }
          }
          @keyframes float-2 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(2deg); }
          }
          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); opacity: 0.2; }
            50% { transform: scale(1.1); opacity: 0.3; }
          }
          @keyframes pulse-slower {
            0%, 100% { transform: scale(1); opacity: 0.15; }
            50% { transform: scale(1.05); opacity: 0.25; }
          }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes expand {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
          }
          .animate-float-0 { animation: float-0 3s ease-in-out infinite; }
          .animate-float-1 { animation: float-1 4s ease-in-out infinite; }
          .animate-float-2 { animation: float-2 3.5s ease-in-out infinite; }
          .animate-pulse-slow { animation: pulse-slow 8s infinite ease-in-out; }
          .animate-pulse-slower { animation: pulse-slower 12s infinite ease-in-out; }
          .animate-gradient { 
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          .animate-expand { 
            animation: expand 2s ease-out 0.5s both;
            transform-origin: left;
          }
        `}</style>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16">
            <div>
              <p className="text-2xl md:text-5xl font-bold text-gray-800 mb-6">
                Why Students Love It
              </p>
            </div>
            <div className="mt-5">
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Built by students, for students. Simple features that actually
                make a difference.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Target}
              title="One-Tap Tracking"
              description="Mark attendance with a single tap. No complicated forms or lengthy processes."
              delay={0}
            />
            <FeatureCard
              icon={BarChart3}
              title="Smart Calculations"
              description="Automatically calculates attendance percentage and shows how many classes you can miss."
              delay={100}
            />
            <FeatureCard
              icon={Calendar}
              title="Auto Management"
              description="Subjects automatically delete when sessions end. No manual cleanup needed."
              delay={200}
            />
            <FeatureCard
              icon={Edit3}
              title="Easy Editing"
              description="Update subject details anytime. Flexible and forgiving to changes."
              delay={300}
            />
            <FeatureCard
              icon={TrendingUp}
              title="Progress Tracking"
              description="Visual progress indicators help you stay motivated and on track."
              delay={400}
            />
            <FeatureCard
              icon={Users}
              title="Student-Friendly"
              description="Designed specifically for student workflows and academic requirements."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16">
            <p className="text-2xl md:text-5xl font-bold text-gray-800 mb-4">
              How It Works
            </p>
            <div className="mt-5">
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get started in seconds. It's that simple.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              step="1"
              title="Add Your Subjects"
              description="Enter subject name, total classes, and session dates. Takes less than 30 seconds."
              delay={0}
            />
            <StepCard
              step="2"
              title="Track Daily"
              description="After each class, simply tap 'Attended' or 'Missed'. That's it!"
              delay={200}
            />
            <StepCard
              step="3"
              title="Stay Informed"
              description="Check your attendance percentage anytime and see how many classes you can afford to miss."
              delay={400}
            />
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-16">
            <p className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              See It In Action
            </p>
            <div className="mt-5">
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Clean, intuitive interface that gets out of your way
              </p>
            </div>
          </div>

          <div className="w-full max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-yellow-400 to-red-400 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <p className="text-2xl font-bold text-white mb-2">Live Demo</p>
                <p className="text-white/80">
                  This is how your attendance tracking will look
                </p>
              </div>
              <DemoSubjectCard />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-400 to-red-400">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <p className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Control?
          </p>
          <div className="mt-5">
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who never stress about attendance
              anymore. Start tracking today!
            </p>
          </div>
          <button
            className="group backdrop-blur-sm bg-white/70 border border-white/20 relative px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            onClick={() => navigate("/register")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            <span className="relative z-10 flex items-center p-2 text-red-600 group-hover:text-white transition-colors duration-300">
              Start tracking Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-150 {
          animation-delay: 150ms;
        }
      `}</style>
    </div>
  );
};

export default Landing;
