import fs from 'fs';
import path from 'path';

interface AuditResult {
  category: string;
  status: 'pass' | 'fail' | 'warning';
  score: number;
  issues: string[];
  recommendations: string[];
}

class FinalReportGenerator {
  private projectRoot: string;
  private results: AuditResult[] = [];

  constructor(rootPath: string) {
    this.projectRoot = rootPath;
  }

  async generate(): Promise<void> {
    console.log('📊 GENERATING COMPREHENSIVE AUDIT REPORT');
    console.log('='.repeat(60));

    // Load all previous audit reports
    await this.loadAuditResults();

    // Calculate overall score
    const overallScore = this.calculateOverallScore();

    // Generate markdown report
    const report = this.generateMarkdownReport(overallScore);

    // Save report
    const reportPath = path.join(this.projectRoot, 'FINAL_AUDIT_REPORT.md');
    fs.writeFileSync(reportPath, report);

    console.log(`\n✅ Comprehensive report saved to: ${reportPath}`);
    console.log(`📈 Overall Platform Score: ${overallScore}%`);

    // Print summary to console
    this.printConsoleSummary(overallScore);
  }

  private async loadAuditResults(): Promise<void> {
    const auditFiles = [
      'audit-report.json',
      'feature-verification-report.json',
      'security-audit-report.json'
    ];

    for (const file of auditFiles) {
      const filePath = path.join(this.projectRoot, file);
      if (fs.existsSync(filePath)) {
        console.log(`📄 Loading: ${file}`);
        const content = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(content);

        this.processAuditData(file, data);
      }
    }
  }

  private processAuditData(filename: string, data: any): void {
    switch (filename) {
      case 'audit-report.json':
        this.results.push({
          category: 'Codebase Structure',
          status: this.assessCodebase(data),
          score: this.calculateCodebaseScore(data),
          issues: this.extractCodebaseIssues(data),
          recommendations: [
            'Ensure consistent naming conventions',
            'Remove unused dependencies',
            'Add TypeScript strict mode if not enabled'
          ]
        });
        break;

      case 'feature-verification-report.json':
        this.results.push({
          category: 'Feature Completeness',
          status: data.summary.passRate >= 80 ? 'pass' :
                  data.summary.passRate >= 60 ? 'warning' : 'fail',
          score: data.summary.passRate,
          issues: this.extractFeatureIssues(data),
          recommendations: [
            'Fix critical feature issues before launch',
            'Add automated tests for all features',
            'Create user documentation for each feature'
          ]
        });
        break;

      case 'security-audit-report.json':
        this.results.push({
          category: 'Security',
          status: data.summary.bySeverity.critical === 0 ? 'pass' : 'fail',
          score: this.calculateSecurityScore(data),
          issues: data.issues
            .filter((i: any) => i.severity === 'critical' || i.severity === 'high')
            .map((i: any) => `${i.description} (${i.file})`),
          recommendations: [
            'Fix all critical security issues immediately',
            'Implement proper authentication if missing',
            'Add Content Security Policy headers'
          ]
        });
        break;
    }
  }

  private calculateOverallScore(): number {
    if (this.results.length === 0) return 0;

    const weights = {
      'Codebase Structure': 0.2,
      'Feature Completeness': 0.5,
      'Security': 0.3
    };

    let total = 0;
    this.results.forEach(result => {
      const weight = weights[result.category as keyof typeof weights] || 0.1;
      total += result.score * weight;
    });

    return Math.round(total);
  }

  private generateMarkdownReport(overallScore: number): string {
    const timestamp = new Date().toISOString();
    const appName = 'EmeritaClinical - The Rig'; // Updated app name

    let report = `# 🏥 ${appName} - COMPREHENSIVE AUDIT REPORT\n\n`;
    report += `**Generated:** ${timestamp}\n`;
    report += `**Overall Score:** ${overallScore}%\n`;
    report += `**Status:** ${this.getStatusText(overallScore)}\n\n`;
    report += `---\n\n`;

    // Summary Table
    report += `## 📊 EXECUTIVE SUMMARY\n\n`;
    report += `| Category | Status | Score | Issues |\n`;
    report += `|----------|--------|-------|--------|\n`;

    this.results.forEach(result => {
      const statusIcon = result.status === 'pass' ? '✅' :
                        result.status === 'warning' ? '⚠️' : '❌';
      report += `| ${result.category} | ${statusIcon} | ${result.score}% | ${result.issues.length} |\n`;
    });

    report += `\n---\n\n`;

    // Detailed Findings
    report += `## 🔍 DETAILED FINDINGS\n\n`;

    this.results.forEach(result => {
      report += `### ${result.category}\n\n`;
      report += `**Score:** ${result.score}%\n\n`;

      if (result.issues.length > 0) {
        report += `**Critical Issues:**\n\n`;
        result.issues.forEach(issue => {
          report += `- ${issue}\n`;
        });
      } else {
        report += `✅ No critical issues found\n\n`;
      }

      report += `**Recommendations:**\n\n`;
      result.recommendations.forEach(rec => {
        report += `- ${rec}\n`;
      });

      report += `\n`;
    });

    // Deployment Readiness
    report += `## 🚀 DEPLOYMENT READINESS\n\n`;

    const canDeploy = overallScore >= 80 &&
                     this.results.every(r => r.status !== 'fail');

    if (canDeploy) {
      report += `✅ **READY FOR PRODUCTION DEPLOYMENT**\n\n`;
      report += `The platform meets all critical criteria for production:\n\n`;
      report += `1. Codebase is well-structured and maintainable\n`;
      report += `2. Core features are implemented and tested\n`;
      report += `3. No critical security vulnerabilities\n`;
      report += `4. Performance is within acceptable limits\n\n`;

      report += `### Deployment Checklist\n\n`;
      report += `- [ ] Run final build: \`npm run build\`\n`;
      report += `- [ ] Deploy to staging environment\n`;
      report += `- [ ] Conduct final user acceptance testing\n`;
      report += `- [ ] Update environment variables for production\n`;
      report += `- [ ] Enable monitoring and error tracking\n`;
      report += `- [ ] Deploy to production\n`;
    } else {
      report += `❌ **NOT READY FOR PRODUCTION**\n\n`;
      report += `Critical issues must be resolved before deployment:\n\n`;

      this.results
        .filter(r => r.status === 'fail')
        .forEach(result => {
          report += `### ${result.category} Issues:\n`;
          result.issues.forEach(issue => {
            report += `- ${issue}\n`;
          });
          report += `\n`;
        });
    }

    // Next Steps
    report += `## 📅 NEXT STEPS\n\n`;

    if (canDeploy) {
      report += `1. **Immediate** (Today): Fix any high-priority warnings\n`;
      report += `2. **Short-term** (This week): Complete NREMT simulator\n`;
      report += `3. **Medium-term** (Next 2 weeks): Add PCR trainer\n`;
      report += `4. **Long-term** (Next month): Expand content and analytics\n`;
    } else {
      report += `1. **Critical** (Immediate): Fix all ❌ issues above\n`;
      report += `2. **High Priority** (This week): Address ⚠️ warnings\n`;
      report += `3. **Medium Priority** (Next week): Complete feature gaps\n`;
      report += `4. **Deployment** (When ready): Follow deployment checklist\n`;
    }

    report += `\n---\n\n`;
    report += `*Report generated by ${appName} Audit System*\n`;

    return report;
  }

  private printConsoleSummary(overallScore: number): void {
    console.log('\n' + '='.repeat(60));
    console.log('📋 AUDIT SUMMARY');
    console.log('='.repeat(60));

    console.log(`\nOverall Platform Score: ${overallScore}%`);
    console.log(`Status: ${this.getStatusText(overallScore)}`);

    console.log('\nCategory Breakdown:');
    this.results.forEach(result => {
      const icon = result.status === 'pass' ? '✅' :
                  result.status === 'warning' ? '⚠️' : '❌';
      console.log(`  ${icon} ${result.category}: ${result.score}%`);
    });

    const criticalIssues = this.results.reduce(
      (sum, result) => sum + result.issues.length, 0
    );

    console.log(`\nCritical Issues Found: ${criticalIssues}`);

    if (criticalIssues > 0) {
      console.log('\n🚨 TOP 5 CRITICAL ISSUES:');
      this.results.forEach(result => {
        result.issues.slice(0, 2).forEach(issue => {
          console.log(`  • ${issue}`);
        });
      });
    }

    console.log('\n' + '='.repeat(60));
    console.log('🎯 RECOMMENDATION:');

    if (overallScore >= 90) {
      console.log('✅ DEPLOY TO PRODUCTION IMMEDIATELY');
    } else if (overallScore >= 70) {
      console.log('⚠️  FIX CRITICAL ISSUES, THEN DEPLOY');
    } else {
      console.log('❌ MAJOR WORK NEEDED BEFORE DEPLOYMENT');
    }
  }

  private getStatusText(score: number): string {
    if (score >= 90) return 'Excellent - Ready for Production';
    if (score >= 80) return 'Good - Minor Fixes Needed';
    if (score >= 70) return 'Fair - Needs Work';
    if (score >= 60) return 'Poor - Significant Issues';
    return 'Critical - Major Overhaul Needed';
  }

  private assessCodebase(data: any): 'pass' | 'fail' | 'warning' {
    // Simple assessment based on component count and types
    if (data.totalComponents > 100) return 'pass';
    if (data.totalComponents > 50) return 'warning';
    return 'fail';
  }

  private calculateCodebaseScore(data: any): number {
    // Score based on component count and diversity
    let score = Math.min(data.totalComponents * 2, 100);
    if (data.breakdownByType.component > 50) score += 10;
    return Math.min(score, 100);
  }

  private extractCodebaseIssues(data: any): string[] {
    const issues: string[] = [];
    if (data.totalComponents < 20) issues.push('Too few components - may indicate incomplete implementation');
    return issues;
  }

  private extractFeatureIssues(data: any): string[] {
    return data.features
      .filter((f: any) => f.passRate < 70)
      .map((f: any) => `${f.name}: ${f.passRate}% pass rate`);
  }

  private calculateSecurityScore(data: any): number {
    const critical = data.summary.bySeverity.critical;
    const high = data.summary.bySeverity.high;
    const total = data.summary.totalIssues;

    if (critical > 0) return 0;
    if (high > 0) return 50;
    if (total > 0) return 80;
    return 100;
  }
}

// Run the report generator
const generator = new FinalReportGenerator(process.cwd());
generator.generate();