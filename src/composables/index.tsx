import { useFormContext } from "react-hook-form";
import { formatDate } from "date-fns";
import { CalendarIcon, CheckIcon, Trash2 } from "lucide-react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import dayjs from "dayjs";


type InputFormBasicType = {
  name: string;
  placeholder?: string;
  label?: string | JSX.Element;
  description?: string | React.ReactNode;
  className?: string;
  disabled?: boolean
  type?: string
  onChange?: (value: string) => void;
};

interface InputFormInterface extends InputFormBasicType { }

export const InputForm = ({
  name,
  label,
  placeholder,
  description,
  className,
  type = "text"
}: InputFormInterface) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full flex-1", className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} type={type} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface CheckboxFormInterface extends InputFormBasicType { }

export const CheckBoxForm = ({
  name,
  description,
  label,
}: CheckboxFormInterface) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
        </FormItem>
      )}
    />
  );
};

interface RadioGroupFormInterface extends InputFormBasicType {
  children: React.ReactNode;
}

export const RadioGroupForm = ({
  name,
  label,
  children,
}: RadioGroupFormInterface) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              {children}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
interface RadioGroupItemFormInterface {
  value: string;
  label?: string;
}

export const RadioGroupItemForm = ({
  value,
  label,
}: RadioGroupItemFormInterface) => {
  return (
    <FormItem className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem value={value} />
      </FormControl>
      <FormLabel className="font-normal">{label}</FormLabel>
    </FormItem>
  );
};

export interface SelectFormInterface extends InputFormBasicType {
  options: { key: string; value: string | number }[];
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  position?: "item-aligned" | "popper"
}

export const SelectForm = ({
  name,
  label,
  description,
  placeholder,
  options,
  disabled,
  className,
  side = 'bottom',
  align = 'start',
  position = 'item-aligned',
  onChange
}: SelectFormInterface) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <Select disabled={disabled} onValueChange={(value) => {
              field.onChange(value);
              if (onChange) {
                onChange(value);
              }
            }} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent position={position} align={align} side={side}>
              {options?.map((item, index) => (
                <SelectItem key={index} value={item.key}>
                  {item.value}
                </SelectItem>
              ))}

              {/* <RenderEach
                of={options}
                render={(item, index) => (
                  <SelectItem key={index} value={item.key}>
                    {item.value}
                  </SelectItem>
                )}
              /> */}
            </SelectContent>
          </Select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface SwitchFormInterface extends InputFormBasicType { }

export const SwitchForm = ({
  name,
  description,
  label,
}: SwitchFormInterface) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <div className="space-y-0.5">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

interface TextareaFormInterface extends InputFormBasicType { }

export const TextareaForm = ({
  name,
  description,
  label,
  placeholder,
}: TextareaFormInterface) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface InputDateFormInterface extends InputFormBasicType { }

export const InputDateForm = ({
  name,
  className,
  description,
  label,
}: InputDateFormInterface) => {
  const { control, trigger, setValue, resetField } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-1 flex-col", className)}>
          <FormLabel>{label}</FormLabel>
          <Popover onOpenChange={() => trigger(name)}>
            <PopoverTrigger asChild>
              <FormControl
                onClick={(e) => {
                  e.stopPropagation();
                  trigger(name, { shouldFocus: true });
                  resetField(name);
                }}
              >
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left font-normal first-letter:capitalize justify-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    <>
                      <span className="flex-1">
                        {dayjs(field.value).format('DD/MM/YYYY')}{" "}
                      </span>
                      <Trash2
                        onClick={(e) => {
                          e.stopPropagation();
                          setValue(name, undefined, { shouldValidate: true });
                          resetField(name);
                        }}
                        className="ml-auto h-4 w-4 opacity-50 mr-2 hover:stroke-red-900"
                      />
                    </>
                  ) : (
                    <span className="flex-1">Selecciona una fecha</span>
                  )}

                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01 00:00:00")
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

interface InputDateTimeFormInterface {
  name: string;
  className?: string;
  description?: string;
  label: string;
}
export const InputDateTimeForm: React.FC<InputDateTimeFormInterface> = ({
  name,
  className,
  description,
  label,
}) => {
  const { control, trigger, setValue, resetField } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newDate = e.target.value;
          const time = field.value ? dayjs(field.value).format('HH:mm') : '00:00';
          const newDateTime = `${newDate}T${time}`;
          field.onChange(newDateTime);
        };

        const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newTime = e.target.value;
          const date = field.value ? dayjs(field.value).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD');
          const newDateTime = `${date}T${newTime}`;
          field.onChange(newDateTime);
        };

        const handleClear = () => {
          setValue(name, undefined, { shouldValidate: true });
          resetField(name);
        };

        return (
          <FormItem className={cn("flex flex-1 flex-col", className)}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-2">
                <input
                  type="date"
                  value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : ''}
                  onChange={handleDateChange}
                  className="form-input w-full"
                />
                <input
                  type="time"
                  value={field.value ? dayjs(field.value).format('HH:mm') : ''}
                  onChange={handleTimeChange}
                  className="form-input w-full"
                />
                {field.value && (
                  <Trash2
                    onClick={handleClear}
                    className="ml- h-4 w-4 opacity-50 hover:stroke-red-900 cursor-pointer"
                  />
                )}
              </div>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
interface IComboboxFormInterface extends InputFormBasicType {
  options: { value: string; label: string }[];
}

export const ComboboxForm = ({
  name,
  options,
  className,
  description,
  label,
  placeholder,
}: IComboboxFormInterface) => {
  const { control, setValue } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? options.find((option) => option.value === field.value)
                      ?.label
                    : "Selecciona una opción"}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder={placeholder || "Selecciona una opción"}
                  className="h-9"
                />
                <CommandEmpty>No se encontro opciones.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {options.map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          setValue(name, option.value);
                        }}
                      >
                        {option.label}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            option.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
