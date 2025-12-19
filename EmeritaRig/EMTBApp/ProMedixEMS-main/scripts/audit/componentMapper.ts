import fs from 'fs';
import path from 'path';

interface ComponentInfo {
  name: string;
  filePath: string;
  type: 'page' | 'component' | 'hook' | 'service' | 'util' | 'type';
  dependencies: string[];
  sizeKB: number;
  lastModified: string;
  exports: string[];
}

class ComponentMapper {
  private projectRoot: string;
  private components: ComponentInfo[] = [];

  constructor(rootPath: string) {
    this.projectRoot = rootPath;
  }

  async analyze(): Promise<void> {
    console.log('🔍 Analyzing project structure...');

    // Walk through src directory
    await this.walkDirectory(path.join(this.projectRoot, 'src'));

    // Generate report
    this.generateReport();
  }

  private async walkDirectory(dirPath: string): Promise<void> {
    const items = await fs.promises.readdir(dirPath, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dirPath, item.name);

      if (item.isDirectory()) {
        await this.walkDirectory(fullPath);
      } else if (this.isSourceFile(item.name)) {
        await this.analyzeFile(fullPath);
      }
    }
  }

  private isSourceFile(filename: string): boolean {
    return /\.(ts|tsx|js|jsx)$/.test(filename);
  }

  private async analyzeFile(filePath: string): Promise<void> {
    try {
      const stats = await fs.promises.stat(filePath);
      const content = await fs.promises.readFile(filePath, 'utf-8');

      const component: ComponentInfo = {
        name: path.basename(filePath, path.extname(filePath)),
        filePath: path.relative(this.projectRoot, filePath),
        type: this.determineType(filePath, content),
        dependencies: this.extractDependencies(content),
        sizeKB: Math.round(stats.size / 1024),
        lastModified: stats.mtime.toISOString().split('T')[0],
        exports: this.extractExports(content)
      };

      this.components.push(component);
    } catch (error) {
      console.error(`Error analyzing ${filePath}:`, error);
    }
  }

  private determineType(filePath: string, content: string): ComponentInfo['type'] {
    const filename = path.basename(filePath).toLowerCase();

    if (filename.includes('page') || filename.includes('Page')) return 'page';
    if (filename.includes('hook') || filename.includes('use')) return 'hook';
    if (filename.includes('service') || filename.includes('api')) return 'service';
    if (filename.includes('type') || filename.includes('interface')) return 'type';
    if (filename.includes('util') || filename.includes('helper')) return 'util';

    // Check content for React component patterns
    if (content.includes('React.FC') ||
        content.includes('export default function') ||
        content.includes('export default class')) {
      return 'component';
    }

    return 'component';
  }

  private extractDependencies(content: string): string[] {
    const imports: string[] = [];

    // Match import statements
    const importRegex = /import.*from\s+['"](.+?)['"]/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      imports.push(match[1]);
    }

    return imports.slice(0, 5); // Top 5 dependencies
  }

  private extractExports(content: string): string[] {
    const exports: string[] = [];

    // Match export statements
    const exportRegex = /export\s+(?:default\s+)?(?:const|let|var|function|class|interface|type)\s+(\w+)/g;
    let match;
    while ((match = exportRegex.exec(content)) !== null) {
      exports.push(match[1]);
    }

    return exports;
  }

  private generateReport(): void {
    console.log('\n📊 COMPONENT ANALYSIS REPORT');
    console.log('='.repeat(50));

    console.log(`\n📈 Total Components: ${this.components.length}`);

    const byType = this.components.reduce((acc, comp) => {
      acc[comp.type] = (acc[comp.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log('\n🔢 By Type:');
    Object.entries(byType).forEach(([type, count]) => {
      console.log(`  ${type}: ${count}`);
    });

    console.log('\n📁 Largest Components (>50KB):');
    this.components
      .filter(c => c.sizeKB > 50)
      .sort((a, b) => b.sizeKB - a.sizeKB)
      .slice(0, 5)
      .forEach(comp => {
        console.log(`  ${comp.name} (${comp.filePath}): ${comp.sizeKB}KB`);
      });

    console.log('\n🔄 Most Imported Dependencies:');
    const allDeps = this.components.flatMap(c => c.dependencies);
    const depCount = allDeps.reduce((acc, dep) => {
      acc[dep] = (acc[dep] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.entries(depCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([dep, count]) => {
        console.log(`  ${dep}: ${count} imports`);
      });

    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      totalComponents: this.components.length,
      breakdownByType: byType,
      components: this.components
    };

    fs.writeFileSync(
      path.join(this.projectRoot, 'audit-report.json'),
      JSON.stringify(report, null, 2)
    );

    console.log('\n✅ Detailed report saved to audit-report.json');
  }
}

// Run the mapper
const mapper = new ComponentMapper(process.cwd());
mapper.analyze();