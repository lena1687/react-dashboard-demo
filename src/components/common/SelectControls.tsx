import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export type SelectOption = {
  id: string;
  name: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
};

type SelectControlsProps = {
  label: string;
  options: SelectOption[];
  value: string;
  onChangeValue: (value: string) => void;
  isLoading?: boolean;
  isError?: boolean;
  error?: unknown;
};

const SelectControls = ({
  label,
  options,
  value,
  onChangeValue,
  isLoading,
  isError,
  error,
}: SelectControlsProps) => {
  const textValue = isLoading || isError ? '' : value || '';

  return (
    <FormControl sx={{ my: 3, minWidth: 200 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        value={textValue}
        onChange={(e) => onChangeValue(e.target.value)}
        disabled={isLoading || isError}
        autoWidth
        label={label}
      >
        {isError && (
          <MenuItem value="" disabled>
            Error loading options: {(error as Error).message}
          </MenuItem>
        )}
        {isLoading && (
          <MenuItem value="" disabled>
            Loading options...
          </MenuItem>
        )}
        {!isLoading &&
          !isError && [
            <MenuItem value="">All options</MenuItem>,
            ...options.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            )),
          ]}
      </Select>
    </FormControl>
  );
};

export default SelectControls;
