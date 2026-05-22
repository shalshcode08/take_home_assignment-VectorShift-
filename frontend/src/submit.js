// submit.js

import { Send } from 'lucide-react';

export const SubmitButton = () => {
  return (
    <div className="submit">
      <button type="submit" className="submit_button">
        <Send size={14} strokeWidth={2} />
        Submit
      </button>
    </div>
  );
};
