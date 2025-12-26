import { Button } from "@/components/ui/button";
import { Play } from 'lucide-react';
import { toast } from "sonner";
import { WorkflowService } from '@/services/api';

/**
 * WorkflowTriggerButton Component
 * 
 * Button to trigger a test n8n workflow.
 * Useful for testing backend integration.
 */

export function WorkflowTriggerButton() {
    const handleTrigger = async () => {
        try {
            await WorkflowService.trigger('n8n-healthcheck', {
                someData: 'hello world'
            });
            toast.success("Workflow started!", {
                description: "Check your n8n execution log."
            });
        } catch (error) {
            console.error(error);
            toast.error("Failed to start workflow", {
                description: "Is the backend running and authenticated?"
            });
        }
    };

    return (
        <Button 
            variant="ghost" 
            className="w-full justify-start gap-2 px-2 text-muted-foreground hover:text-foreground"
            onClick={handleTrigger}
        >
            <Play className="h-5 w-5" />
            <span>Test Workflow</span>
        </Button>
    );
}
