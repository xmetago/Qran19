import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import AvatarCustomizer from "./AvatarCustomizer";

interface AuthModalProps {
  open?: boolean;
  onClose?: () => void;
  defaultTab?: "login" | "signup";
}

const AuthModal: React.FC<AuthModalProps> = ({
  open = true,
  onClose = () => {},
  defaultTab = "login",
}) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab);
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
  const [signupData, setSignupData] = useState<any>(null);

  const handleLoginSubmit = (values: any) => {
    // This would typically handle authentication logic
    console.log("Login submitted:", values);
    onClose();
  };

  const handleSignupSubmit = (values: any) => {
    // Store signup data and show avatar customizer
    setSignupData(values);
    setShowAvatarCustomizer(true);
  };

  const handleAvatarSave = (avatarConfig: any) => {
    // Combine signup data with avatar config and complete registration
    console.log("Registration completed with:", {
      ...signupData,
      avatar: avatarConfig,
    });
    setShowAvatarCustomizer(false);
    onClose();
  };

  const handleAvatarCancel = () => {
    setShowAvatarCustomizer(false);
  };

  return (
    <>
      <Dialog
        open={open && !showAvatarCustomizer}
        onOpenChange={(isOpen) => !isOpen && onClose()}
      >
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              {activeTab === "login" ? "Sign In" : "Create Account"}
            </DialogTitle>
          </DialogHeader>

          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "login" | "signup")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-0">
              <LoginForm
                onLogin={handleLoginSubmit}
                onSwitchToSignup={() => setActiveTab("signup")}
              />
            </TabsContent>

            <TabsContent value="signup" className="mt-0">
              <SignupForm
                onSubmit={handleSignupSubmit}
                onLoginClick={() => setActiveTab("login")}
              />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {showAvatarCustomizer && (
        <AvatarCustomizer
          open={showAvatarCustomizer}
          onClose={handleAvatarCancel}
          onSave={handleAvatarSave}
        />
      )}
    </>
  );
};

export default AuthModal;
