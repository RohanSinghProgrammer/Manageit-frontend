import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, KeyRound } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { toast } = useToast()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Add your API call to send OTP here
      toast({
        title: "OTP Sent",
        description: "Please check your email for the OTP",
      })
      setStep(2)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send OTP",
      })
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Add your API call to verify OTP here
      toast({
        title: "OTP Verified",
        description: "Please enter your new password",
      })
      setStep(3)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid OTP",
      })
    }
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      })
      return
    }
    try {
      // Add your API call to reset password here
      toast({
        title: "Success",
        description: "Password reset successful",
      })
      // Redirect to login page
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reset password",
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            {step === 1 && "Enter your email to receive a reset code"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Enter your new password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-8"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Reset Code
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="relative">
                <KeyRound className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  className="pl-8"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Verify OTP
              </Button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="password"
                  placeholder="New Password"
                  className="pl-8"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  className="pl-8"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

