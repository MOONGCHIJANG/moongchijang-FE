export type ExampleProps = {
  title: string;
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
  text?: string;
};

const sizeStyles: Record<NonNullable<ExampleProps['size']>, string> = {
  small: 'text-sm px-3 py-1',
  medium: 'text-base px-4 py-2',
  large: 'text-lg px-6 py-3',
};

export const Example = ({
  title = 'Title',
  primary = false,
  size = 'medium',
  text,
}: ExampleProps) => {
  return (
    <div
      className={`
        rounded-md border
        ${sizeStyles[size]}
        ${
          primary
            ? 'bg-blue-300 text-white border-blue-300'
            : 'bg-white text-gray-900 border-gray-300'
        }
      `}
    >
      <h2 className="font-bold">{title}</h2>
      {text && <p className="mt-1">{text}</p>}
    </div>
  );
};
