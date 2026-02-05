import { Field, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"

type iconALignType = 'inline-end' | 'inline-start';

interface InputInputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    icon?: React.ReactNode;
    iconALign?: iconALignType;

}
export function InputInputGroup({
    label,
    icon,
    iconALign,
    ...props
} : InputInputGroupProps) {
  return (
    <Field>
      {label && <FieldLabel htmlFor="input-group-url">{label}</FieldLabel>}
      <InputGroup>
        <InputGroupInput id="input-group-url" placeholder="Search" />
        {
            icon && <InputGroupAddon align={iconALign}>
                        {icon}
                    </InputGroupAddon>
        }
        
      </InputGroup>
    </Field>
  )
}
export default InputInputGroup;