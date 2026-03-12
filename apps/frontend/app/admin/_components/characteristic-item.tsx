interface ItemProps {
  label: string;
  value: string;
}

export default function CharacteristicItem({ label, value }: ItemProps) {
  return (
    <div className="text-lg">
      <span className="font-medium">{label}</span> {value}
    </div>
  );
}
