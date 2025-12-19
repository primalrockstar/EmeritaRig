import React from 'react';
import { Shield, AlertTriangle, Info } from 'lucide-react';

export interface ScopeWarningProps {
  type: 'info' | 'warning' | 'critical';
  title?: string;
  message: string;
  compact?: boolean;
}

/**
 * Reusable scope of practice warning component
 * Provides clear visual indicators about EMT-B scope compliance
 */
export const ScopeWarning: React.FC<ScopeWarningProps> = ({ 
  type, 
  title, 
  message,
  compact = false 
}) => {
  const configs = {
    info: {
      color: 'bg-blue-900/10 border-blue-500/30 text-blue-900 dark:text-blue-300',
      icon: Info,
      defaultTitle: '💡 Educational Note'
    },
    warning: {
      color: 'bg-yellow-900/10 border-yellow-500/30 text-yellow-900 dark:text-yellow-300',
      icon: AlertTriangle,
      defaultTitle: '⚠️ Scope Advisory'
    },
    critical: {
      color: 'bg-red-900/10 border-red-500/30 text-red-900 dark:text-red-300',
      icon: Shield,
      defaultTitle: '🚨 Beyond EMT-B Scope'
    }
  };

  const config = configs[type];
  const Icon = config.icon;
  const displayTitle = title || config.defaultTitle;

  if (compact) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${config.color} text-xs`}>
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span>{message}</span>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border p-4 ${config.color}`}>
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold mb-1">{displayTitle}</h4>
          <div className="text-sm leading-relaxed">{message}</div>
        </div>
      </div>
    </div>
  );
};

/**
 * Pre-configured scope warnings for common scenarios
 */
export const SCOPE_WARNINGS = {
  // EMT-B focused content
  emtCore: (
    <ScopeWarning
      type="info"
      title="✅ EMT-B Core Content"
      message="This content is within your scope of practice as an EMT-B and is critical for NREMT exam success."
    />
  ),

  // Bonus/Advanced content
  bonusContent: (
    <ScopeWarning
      type="warning"
      title="⭐ Bonus Educational Content"
      message="Some topics in this section may be beyond EMT-B scope. They're included for comprehensive understanding and career advancement. Always verify your local protocols and certification level before performing any procedure."
    />
  ),

  // Advanced procedures
  advancedProcedure: (
    <ScopeWarning
      type="critical"
      title="🚨 Advanced Procedure - Not EMT-B Scope"
      message="This procedure requires advanced certification (AEMT or Paramedic). As an EMT-B, you may observe or assist ALS providers, but you CANNOT perform this independently. This content is educational only."
    />
  ),

  // Advanced medications
  advancedMedication: (
    <ScopeWarning
      type="critical"
      title="🚨 Advanced Medication - Not EMT-B Scope"
      message="This medication requires advanced certification. EMT-B personnel typically cannot administer this independently. You may assist under direct ALS supervision per local protocols. Study for career knowledge, not current practice."
    />
  ),

  // Protocol verification
  verifyProtocol: (
    <ScopeWarning
      type="warning"
      message="Always verify local protocols and standing orders. Scope of practice varies by state, region, and medical direction."
      compact
    />
  ),

  // NREMT focus
  nremtFocus: (
    <ScopeWarning
      type="info"
      message="This content aligns with NHTSA 2022 National Model EMS Clinical Guidelines and NREMT exam standards."
      compact
    />
  ),

  // Study recommendations
  studyPriority: (
    <ScopeWarning
      type="info"
      title="📚 Study Recommendation"
      message="Focus on EMT-B content for your NREMT exam. Advanced topics help you understand the full EMS system and work effectively with ALS teams, but they're not required for certification."
    />
  )
};

export default ScopeWarning;
