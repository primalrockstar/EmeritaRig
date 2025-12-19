export interface PcrEvent {
  reportId: string;
  scenarioId: string;
  module: number;
  score: number;
  timeSpent: number;
  deficiencies: string[];
  strengths: string[];
  timestamp: Date;
  passed: boolean;
}

export interface PcrAnalytics {
  totalReports: number;
  averageScore: number;
  passRate: number;
  moduleProgress: {
    [moduleId: number]: {
      completed: number;
      passed: number;
      averageScore: number;
      commonDeficiencies: string[];
    }
  };
  recentActivity: PcrEvent[];
}

export class PcrTracker {
  private static instance: PcrTracker;

  static getInstance(): PcrTracker {
    if (!PcrTracker.instance) {
      PcrTracker.instance = new PcrTracker();
    }
    return PcrTracker.instance;
  }

  trackPcrSubmission(event: PcrEvent): void {
    // Store PCR-specific data
    const pcrData = this.getPcrData();

    if (!pcrData.reports) pcrData.reports = [];
    if (!pcrData.modules) pcrData.modules = {};

    // Add the report
    pcrData.reports.push(event);

    // Keep only last 100 reports
    if (pcrData.reports.length > 100) {
      pcrData.reports = pcrData.reports.slice(-100);
    }

    // Update module statistics
    const moduleId = event.module;
    if (!pcrData.modules[moduleId]) {
      pcrData.modules[moduleId] = {
        reports: [],
        deficiencies: {},
        totalScore: 0
      };
    }

    const module = pcrData.modules[moduleId];
    module.reports.push(event);
    module.totalScore += event.score;

    // Track common deficiencies
    event.deficiencies.forEach(deficiency => {
      module.deficiencies[deficiency] = (module.deficiencies[deficiency] || 0) + 1;
    });

    // Keep only last 50 reports per module
    if (module.reports.length > 50) {
      module.reports = module.reports.slice(-50);
    }

    // Save to localStorage
    localStorage.setItem('pcrAnalytics', JSON.stringify(pcrData));

    // Dispatch update event
    window.dispatchEvent(new CustomEvent('pcrUpdate'));
  }

  getAnalytics(): PcrAnalytics {
    const data = this.getPcrData();
    const reports = data.reports || [];
    const modules = data.modules || {};

    if (reports.length === 0) {
      return {
        totalReports: 0,
        averageScore: 0,
        passRate: 0,
        moduleProgress: {},
        recentActivity: []
      };
    }

    const totalScore = reports.reduce((sum: number, report: PcrEvent) => sum + report.score, 0);
    const passedReports = reports.filter((report: PcrEvent) => report.passed).length;

    // Calculate module progress
    const moduleProgress: { [moduleId: number]: any } = {};
    Object.entries(modules).forEach(([moduleIdStr, moduleData]: [string, any]) => {
      const moduleId = parseInt(moduleIdStr);
      const moduleReports = moduleData.reports || [];
      const modulePassed = moduleReports.filter((r: PcrEvent) => r.passed).length;
      const moduleScore = moduleReports.reduce((sum: number, r: PcrEvent) => sum + r.score, 0);

      // Get most common deficiencies
      const deficiencies = Object.entries(moduleData.deficiencies || {})
        .sort(([,a], [,b]) => (b as number) - (a as number))
        .slice(0, 5)
        .map(([deficiency]) => deficiency);

      moduleProgress[moduleId] = {
        completed: moduleReports.length,
        passed: modulePassed,
        averageScore: moduleReports.length > 0 ? moduleScore / moduleReports.length : 0,
        commonDeficiencies: deficiencies
      };
    });

    return {
      totalReports: reports.length,
      averageScore: totalScore / reports.length,
      passRate: (passedReports / reports.length) * 100,
      moduleProgress,
      recentActivity: reports.slice(-10).reverse() // Last 10 reports, most recent first
    };
  }

  getModuleStatus(moduleId: number): {
    unlocked: boolean;
    reason?: string;
    progress?: string;
  } {
    const analytics = this.getAnalytics();

    switch (moduleId) {
      case 1:
        return { unlocked: true }; // Always unlocked

      case 2:
        const mod1Passed = analytics.moduleProgress[1]?.passed || 0;
        return {
          unlocked: mod1Passed >= 3,
          reason: mod1Passed < 3 ? `Complete 3 Module 1 scenarios (${mod1Passed}/3)` : undefined
        };

      case 3:
        const analystScenarios = this.getAnalystScenarioCount();
        return {
          unlocked: analystScenarios >= 10,
          reason: analystScenarios < 10 ? `Complete 10 analyst scenarios (${analystScenarios}/10)` : undefined,
          progress: `${analystScenarios}/10 scenarios`
        };

      default:
        return { unlocked: false };
    }
  }

  getRecommendedActions() {
    const actions: Array<{
      id: string;
      title: string;
      description: string;
      priority: 'high' | 'medium' | 'low';
      moduleId?: number;
    }> = [];
    const analytics = this.getAnalytics();

    // Check for incomplete modules
    for (let moduleId = 1; moduleId <= 3; moduleId++) {
      const status = this.getModuleStatus(moduleId);
      if (!status.unlocked && status.reason) {
        actions.push({
          id: `unlock-module-${moduleId}`,
          title: `Unlock Module ${moduleId}`,
          description: status.reason!,
          priority: 'high' as const,
          moduleId
        });
      }
    }

    // Check for weak areas
    Object.entries(analytics.moduleProgress).forEach(([moduleIdStr, progress]) => {
      const moduleId = parseInt(moduleIdStr);
      if (progress.averageScore < 80 && progress.completed > 0) {
        actions.push({
          id: `improve-module-${moduleId}`,
          title: `Improve Module ${moduleId} Performance`,
          description: `Your average score is ${Math.round(progress.averageScore)}%`,
          priority: progress.averageScore < 60 ? 'high' : 'medium',
          moduleId
        });
      }
    });

    // Check for practice needs
    if (analytics.totalReports === 0) {
      actions.push({
        id: 'start-pcr-practice',
        title: 'Start PCR Practice',
        description: 'Begin your PCR documentation training',
        priority: 'high'
      });
    } else if (analytics.recentActivity.length > 0) {
      const lastReport = analytics.recentActivity[0];
      if (!lastReport.passed) {
        actions.push({
          id: 'practice-failed-scenario',
          title: 'Practice Failed Scenario',
          description: `Improve your score on ${lastReport.scenarioId}`,
          priority: 'high'
        });
      }
    }

    return actions.slice(0, 5); // Return top 5 recommendations
  }

  private getPcrData(): any {
    try {
      return JSON.parse(localStorage.getItem('pcrAnalytics') || '{}');
    } catch {
      return {};
    }
  }

  private getAnalystScenarioCount(): number {
    // This would track analyst scenarios separately
    // For now, we'll use a simple counter
    try {
      return parseInt(localStorage.getItem('analystScenariosCompleted') || '0');
    } catch {
      return 0;
    }
  }

  incrementAnalystScenarios(): void {
    const current = this.getAnalystScenarioCount();
    localStorage.setItem('analystScenariosCompleted', (current + 1).toString());
    window.dispatchEvent(new CustomEvent('pcrUpdate'));
  }
}

// Export helper functions
export const calculatePcrScore = (scoreResult: any): PcrEvent => {
  return {
    reportId: `pcr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    scenarioId: scoreResult.scenarioId || 'unknown',
    module: scoreResult.module || 1,
    score: scoreResult.totalScore || 0,
    timeSpent: scoreResult.timeSpent || 0,
    deficiencies: scoreResult.deductions || [],
    strengths: scoreResult.strengths || [],
    timestamp: new Date(),
    passed: (scoreResult.totalScore || 0) >= 85
  };
};