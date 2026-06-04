import { Button } from '@muzammil328/ui';

export function ModalFormActionButton({
  onClose,
  loading,
  label,
  view,
}: {
  onClose?: () => void;
  loading?: boolean;
  label?: string;
  view?: boolean;
}) {
  return (
    <div className="flex justify-end space-x-2">
      <Button type="button" onClick={onClose} disabled={loading}>
        {view ? 'Close' : 'Cancel'}
      </Button>
      {!view && (
        <Button type="submit" loading={loading}>
          {label}
        </Button>
      )}
    </div>
  );
}
