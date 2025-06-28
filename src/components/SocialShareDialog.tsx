
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Share2, Mail, Copy, CheckCircle } from 'lucide-react';
import { Task } from '@/pages/Index';
import { toast } from '@/hooks/use-toast';

interface SocialShareDialogProps {
  task: Task;
  onEmailShare: (emails: string[]) => void;
}

export const SocialShareDialog = ({ task, onEmailShare }: SocialShareDialogProps) => {
  const [emails, setEmails] = useState('');
  const [copied, setCopied] = useState(false);

  const taskUrl = `${window.location.origin}?task=${task.id}`;

  const handleEmailShare = () => {
    const emailList = emails.split(',').map(email => email.trim()).filter(email => email);
    if (emailList.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one email address.",
        variant: "destructive",
      });
      return;
    }
    onEmailShare(emailList);
    setEmails('');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(taskUrl);
      setCopied(true);
      toast({
        title: "Link Copied",
        description: "Task link copied to clipboard!",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy link.",
        variant: "destructive",
      });
    }
  };

  const shareViaGmail = () => {
    const subject = encodeURIComponent(`Task: ${task.title}`);
    const body = encodeURIComponent(`Check out this task: ${task.title}\n\n${task.description}\n\nView task: ${taskUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Share Task
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900">{task.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emails">Share via Email</Label>
            <div className="flex gap-2">
              <Input
                id="emails"
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                placeholder="Enter email addresses (comma separated)"
                className="flex-1"
              />
              <Button onClick={handleEmailShare} size="sm">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Quick Share</Label>
            <div className="flex gap-2">
              <Button onClick={shareViaGmail} variant="outline" className="flex-1">
                <Mail className="h-4 w-4 mr-2" />
                Gmail
              </Button>
              <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                {copied ? (
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
