import { InputFieldProps } from '@/types';

const InputField: React.FC<InputFieldProps> = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export { InputField };
