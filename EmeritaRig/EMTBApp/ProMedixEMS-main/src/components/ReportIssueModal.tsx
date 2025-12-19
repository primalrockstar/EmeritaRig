import React, { useState } from 'react';
import { X, AlertTriangle, FileText, Clock, MessageSquare, Send } from 'lucide-react';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: 'question' | 'flashcard' | 'scenario' | 'study_note' | 'medication' | 'calculator';
  contentId: string;
  contentTitle?: string;
}

interface IssueReport {
  contentType: string;
  contentId: string;
  issueType: 'clinical_error' | 'typo' | 'outdated' | 'unclear' | 'other';
  description: string;
  userId?: string;
  userEmail?: string;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  contentType,
  contentId,
  contentTitle
}) => {
  const [issueType, setIssueType] = useState<IssueReport['issueType']>('clinical_error');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const issueTypes = [
    {
      value: 'clinical_error' as const,
      label: 'Clinical/Medical Error',
      description: 'Incorrect medical information, wrong dosage, unsafe practice',
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      color: 'border-red-200 bg-red-50 dark:bg-red-900/20'
    },
    {
      value: 'typo' as const,
      label: 'Typo/Grammar Error',
      description: 'Spelling mistakes, grammar issues, formatting problems',
      icon: <FileText className="w-5 h-5 text-orange-500" />,
      color: 'border-orange-200 bg-orange-50 dark:bg-orange-900/20'
    },
    {
      value: 'outdated' as const,
      label: 'Outdated Protocol',
      description: 'Information that doesn\'t match current NHTSA 2022 guidelines',
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      color: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20'
    },
    {
      value: 'unclear' as const,
      label: 'Unclear Explanation',
      description: 'Confusing wording, needs better clarification',
      icon: <MessageSquare className="w-5 h-5 text-purple-500" />,
      color: 'border-purple-200 bg-purple-50 dark:bg-purple-900/20'
    },
    {
      value: 'other' as const,
      label: 'Other Issue',
      description: 'Something else not covered above',
      icon: <AlertTriangle className="w-5 h-5 text-gray-500" />,
      color: 'border-gray-200 bg-gray-50 dark:bg-gray-900/20'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const report: IssueReport = {
        contentType,
        contentId,
        issueType,
        description,
        // In a real app, get from auth context
        userId: 'current-user-id',
        userEmail: 'user@example.com'
      };

      // TODO: Replace with actual API call
      console.log('Submitting issue report:', report);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSubmitted(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setSubmitted(false);
        setDescription('');
        setIssueType('clinical_error');
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Failed to submit report:', error);
      // Handle error - show error message
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-lg w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Report Issue</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Help us improve: {contentType} {contentId}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Report Submitted!</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Thank you for helping us maintain quality. We'll review this within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Content Info */}
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Reporting Issue With:</h4>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  <div><strong>Type:</strong> {contentType}</div>
                  <div><strong>ID:</strong> {contentId}</div>
                  {contentTitle && <div><strong>Title:</strong> {contentTitle}</div>}
                </div>
              </div>

              {/* Issue Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  What type of issue are you reporting?
                </label>
                <div className="space-y-2">
                  {issueTypes.map((type) => (
                    <label
                      key={type.value}
                      className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                        issueType === type.value
                          ? `${type.color} border-current`
                          : 'border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="issueType"
                        value={type.value}
                        checked={issueType === type.value}
                        onChange={(e) => setIssueType(e.target.value as IssueReport['issueType'])}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {type.icon}
                          <span className="font-medium text-slate-900 dark:text-white">{type.label}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{type.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Please describe the issue in detail
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide as much detail as possible to help us understand and fix the issue..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  rows={4}
                  required
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Include specific details, references to protocols, or suggestions for improvement.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !description.trim()}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Report
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <AlertTriangle className="w-3 h-3" />
            <span>
              Critical clinical errors are reviewed within 24 hours.
              Quality reports may earn you "Quality Guardian" status and rewards.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Report Issue Button Component
interface ReportIssueButtonProps {
  contentType: 'question' | 'flashcard' | 'scenario' | 'study_note' | 'medication' | 'calculator';
  contentId: string;
  contentTitle?: string;
  variant?: 'button' | 'link' | 'icon';
  className?: string;
}

export const ReportIssueButton: React.FC<ReportIssueButtonProps> = ({
  contentType,
  contentId,
  contentTitle,
  variant = 'button',
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  if (variant === 'icon') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 ${className}`}
          title="Report an issue with this content"
        >
          <AlertTriangle className="w-4 h-4" />
        </button>
        <ReportIssueModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          contentType={contentType}
          contentId={contentId}
          contentTitle={contentTitle}
        />
      </>
    );
  }

  if (variant === 'link') {
    return (
      <>
        <button
          onClick={handleClick}
          className={`text-sm text-red-600 hover:text-red-700 underline ${className}`}
        >
          Report Issue
        </button>
        <ReportIssueModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          contentType={contentType}
          contentId={contentId}
          contentTitle={contentTitle}
        />
      </>
    );
  }

  // Default button variant
  return (
    <>
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-colors ${className}`}
      >
        <AlertTriangle className="w-4 h-4" />
        Report Issue
      </button>
      <ReportIssueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contentType={contentType}
        contentId={contentId}
        contentTitle={contentTitle}
      />
    </>
  );
};