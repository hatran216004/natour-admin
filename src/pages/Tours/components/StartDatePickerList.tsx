import { DayPicker } from 'react-day-picker';
import Row from '../../../components/Row';
import Input from '../../../components/Input';

export interface StartDate {
  date: Date;
  participants: number;
  soldOut: boolean;
}

interface Props {
  value: StartDate[];
  onChange: (value: StartDate[]) => void;
}

export default function StartDatePickerList({ value, onChange }: Props) {
  const handleChange = (index: number, updated: Partial<StartDate>) => {
    const updatedList = [...value];
    updatedList[index] = { ...updatedList[index], ...updated };
    onChange(updatedList);
  };

  const handleAdd = () => {
    onChange([...value, { date: new Date(), participants: 0, soldOut: false }]);
  };

  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="font-medium text-gray-900 text-sm">Start Dates</label>
      {value.map((item, index) => (
        <Row key={index} className="items-center space-x-4">
          <DayPicker
            value={item.date}
            onChange={(date) => handleChange(index, { date: date as Date })}
            minDate={new Date()}
            className="text-sm"
          />
          <Input
            type="number"
            label="Participants"
            inputSize="md"
            value={item.participants}
            onChange={(e) =>
              handleChange(index, { participants: Number(e.target.value) })
            }
          />
          <label className="text-sm flex items-center space-x-2">
            <input
              type="checkbox"
              checked={item.soldOut}
              onChange={(e) =>
                handleChange(index, { soldOut: e.target.checked })
              }
            />
            <span>Sold Out</span>
          </label>
          <button
            type="button"
            onClick={() => handleRemove(index)}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </Row>
      ))}
      <button
        type="button"
        onClick={handleAdd}
        className="text-blue-600 text-sm underline mt-2"
      >
        + Add Start Date
      </button>
    </div>
  );
}
