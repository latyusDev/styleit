import { useState } from 'react';
import { Clock } from 'lucide-react';

const TimeInput = ({ value = '', onChange, className = '', error = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const parseTime = (timeStr) => {
    if (!timeStr || timeStr.trim() === '') return { hours: null, minutes: null, period: null };
    const parts = timeStr.split(' ');
    const [hours, minutes] = parts[0].split(':').map(Number);
    if (parts[1]) return { hours, minutes, period: parts[1] };
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return { hours: displayHours, minutes, period };
  };

  const { hours: initialHours, minutes: initialMinutes, period: initialPeriod } = parseTime(value);

  const [selectedHours, setSelectedHours] = useState(initialHours);
  const [selectedMinutes, setSelectedMinutes] = useState(initialMinutes);
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);

  const hoursList = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutesList = Array.from({ length: 60 }, (_, i) => i);

  const isSelected = selectedHours !== null && selectedMinutes !== null && selectedPeriod !== null;

  const formatTime = () => {
    if (!isSelected) return null;
    const paddedHours = selectedHours.toString().padStart(2, '0');
    const paddedMinutes = selectedMinutes.toString().padStart(2, '0');
    return `${paddedHours}:${paddedMinutes} ${selectedPeriod}`;
  };

  const handleTimeChange = (h, m, p) => {
    setSelectedHours(h);
    setSelectedMinutes(m);
    setSelectedPeriod(p);

    if (h !== null && m !== null && p !== null) {
      const paddedHours = h.toString().padStart(2, '0');
      const paddedMinutes = m.toString().padStart(2, '0');
      onChange?.(`${paddedHours}:${paddedMinutes} ${p}`);
    } else {
      onChange?.('');
    }
  };

  const displayValue = formatTime();

  return (
    <div className={`relative ${className}`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between px-4 py-3 border rounded-lg bg-white cursor-pointer transition-colors ${
          error ? 'border-red-500 hover:border-red-600' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <span className={`font-medium ${!isSelected ? 'text-gray-400' : 'text-gray-700'}`}>
          {displayValue ?? '00:00'}
        </span>
        <Clock className={`size-5 ${error ? 'text-red-400' : 'text-gray-400'}`} />
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Hour</label>
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md">
                  {hoursList.map((hour) => (
                    <div
                      key={hour}
                      onClick={() => handleTimeChange(hour, selectedMinutes ?? 0, selectedPeriod ?? 'AM')}
                      className={`px-3 py-2 cursor-pointer hover:bg-pink-50 transition-colors ${
                        selectedHours === hour ? 'bg-primary text-white hover:bg-pink-600' : 'text-gray-700'
                      }`}
                    >
                      {hour}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Minute</label>
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-md">
                  {minutesList.map((minute) => (
                    <div
                      key={minute}
                      onClick={() => handleTimeChange(selectedHours ?? 12, minute, selectedPeriod ?? 'AM')}
                      className={`px-3 py-2 cursor-pointer hover:bg-pink-50 transition-colors ${
                        selectedMinutes === minute ? 'bg-primary text-white hover:bg-pink-600' : 'text-gray-700'
                      }`}
                    >
                      {minute.toString().padStart(2, '0')}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Period</label>
                <div className="border border-gray-200 rounded-md">
                  {['AM', 'PM'].map((period) => (
                    <div
                      key={period}
                      onClick={() => handleTimeChange(selectedHours ?? 12, selectedMinutes ?? 0, period)}
                      className={`px-3 py-2 cursor-pointer hover:bg-pink-50 transition-colors ${
                        selectedPeriod === period ? 'bg-primary text-white hover:bg-pink-400' : 'text-gray-700'
                      }`}
                    >
                      {period}
                    </div>
                  ))}

                </div>
                  {/* here */}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TimeInput;