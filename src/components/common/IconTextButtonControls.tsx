import { Button, Badge } from '@mui/material';
import type { ReactNode } from 'react';

type IconTextButtonProps = {
  icon: ReactNode;
  text?: string;
  badgeContent?: number;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  sx?: object;
};

const IconTextButton = ({
  icon,
  text,
  badgeContent,
  onClick,
  disabled = false,
  size = 'medium',
  sx = {},
}: IconTextButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="text"
      color="inherit"
      disabled={disabled}
      size={size}
      startIcon={
        badgeContent !== undefined ? (
          <Badge badgeContent={badgeContent} color="secondary">
            {icon}
          </Badge>
        ) : (
          icon
        )
      }
      sx={sx}
    >
      {text}
    </Button>
  );
};

export default IconTextButton;
