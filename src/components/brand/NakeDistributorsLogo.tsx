import React from 'react';
import { MakeDistributorsLogo, LogoVariant, LogoSize } from './MakeDistributorsLogo';

export interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero' | number;
  variant?: 'dark' | 'light' | 'icon' | 'blue-monochrome' | 'white-monochrome' | 'social-square' | 'monochrome-dark' | 'monochrome-light';
  showWordmark?: boolean;
  animated?: boolean;
  className?: string;
  tagline?: boolean | string;
}

export const NakeDistributorsLogo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'light',
  showWordmark = true,
  className = '',
  tagline = false,
}) => {
  // Normalize legacy variants
  let normalizedVariant: LogoVariant = 'light';
  if (variant === 'dark' || variant === 'monochrome-dark') {
    normalizedVariant = 'dark';
  } else if (variant === 'monochrome-light' || variant === 'blue-monochrome') {
    normalizedVariant = 'blue-monochrome';
  } else if (variant === 'white-monochrome') {
    normalizedVariant = 'white-monochrome';
  } else if (variant === 'icon') {
    normalizedVariant = 'icon';
  } else if (variant === 'social-square') {
    normalizedVariant = 'social-square';
  }

  // Normalize size
  let normalizedSize: LogoSize = 'md';
  if (typeof size === 'string' && ['xs', 'sm', 'md', 'lg', 'xl', 'hero'].includes(size)) {
    normalizedSize = size as LogoSize;
  } else if (typeof size === 'number') {
    if (size <= 24) normalizedSize = 'xs';
    else if (size <= 32) normalizedSize = 'sm';
    else if (size <= 42) normalizedSize = 'md';
    else if (size <= 52) normalizedSize = 'lg';
    else normalizedSize = 'xl';
  }

  return (
    <MakeDistributorsLogo
      variant={normalizedVariant}
      size={normalizedSize}
      showWordmark={showWordmark}
      tagline={tagline}
      className={className}
    />
  );
};

export const NakeDistributorsLogoIcon: React.FC<{
  size?: number;
  variant?: 'dark' | 'light' | 'monochrome-dark' | 'monochrome-light';
  className?: string;
}> = ({ variant = 'light', className = '' }) => {
  return (
    <MakeDistributorsLogo
      variant="icon"
      size="sm"
      showWordmark={false}
      className={className}
    />
  );
};

export default NakeDistributorsLogo;
export { MakeDistributorsLogo };
