import { TextAreaInputType } from '@/types';

const TextAreaField: React.FC<TextAreaInputType> = ({ label, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        rows={3}
        value={value}
        onChange={onChange}
        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export { TextAreaField };
