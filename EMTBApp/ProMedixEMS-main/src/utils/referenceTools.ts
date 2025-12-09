export const getToolIcon = (category: string): string => {
  const icons: Record<string, string> = {
    calculator: '🧮',
    protocol: '📋',
    drug: '💊',
    assessment: '🩺',
    procedure: '⚡',
    reference: '📚'
  };
  return icons[category] || '📄';
};

export const formatToolCategory = (category: string): string => {
  return category.charAt(0).toUpperCase() + category.slice(1);
};