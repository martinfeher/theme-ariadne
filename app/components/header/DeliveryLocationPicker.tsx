'use client';

import { useId, useState } from 'react';
import { Check, ChevronDown, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { HEADER_LOCATION_OPTIONS } from '@/lib/header-locations';
import { cn } from '@/lib/utils';
import { useHydrated } from '@/app/hooks/useHydrated';

type DeliveryLocationPickerProps = {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
};

export default function DeliveryLocationPicker({
  value,
  onValueChange,
  className,
}: DeliveryLocationPickerProps) {
  const t = useTranslations('Header');
  const listboxId = useId();
  const [open, setOpen] = useState(false);
  const hydrated = useHydrated();
  const selected = HEADER_LOCATION_OPTIONS.find((option) => option.value === value);

  const triggerButton = (
    <button
      type="button"
      role="combobox"
      aria-expanded={open}
      aria-controls={open ? listboxId : undefined}
      aria-label={t('deliveryCityPlaceholder')}
      aria-haspopup="listbox"
      className={cn(
        'flex h-10 shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white pl-1.5 pr-3 text-left transition-colors',
        'w-[210px] hover:border-gray-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-200/80 cursor-pointer',
        className
      )}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
        <MapPin className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      </span>

      <span
        className={cn(
          'min-w-0 flex-1 truncate text-sm',
          selected ? 'font-medium text-gray-700' : 'text-gray-500'
        )}
      >
        {selected ? selected.label : t('deliveryCityPlaceholder')}
      </span>

      <ChevronDown
        className={cn(
          'h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200',
          open && 'rotate-180'
        )}
        strokeWidth={1.75}
        aria-hidden
      />
    </button>
  );

  if (!hydrated) {
    return triggerButton;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>

      <PopoverContent
        className="z-[70] w-[min(var(--radix-popover-trigger-width),14rem)] p-0"
        align="start"
        sideOffset={6}
      >
        <Command>
          <CommandInput placeholder={t('locationSearchPlaceholder')} />
          <CommandList id={listboxId}>
            <CommandEmpty>{t('locationNotFound')}</CommandEmpty>
            <CommandGroup>
              {HEADER_LOCATION_OPTIONS.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  className="cursor-pointer"
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4 text-green-600',
                      value === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                    strokeWidth={2}
                    aria-hidden
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
