type IconTypeCardProps = {
  readonly icon?: string;
};
export default function IconTypeCard({ icon }: IconTypeCardProps) {
  return (
    <div className="p-3 bg-white rounded-lg">
      <span className="size-5">{icon}</span>
    </div>
  );
}
