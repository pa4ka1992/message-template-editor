import { FC, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export const TextField: FC = () => {
  const [value, setValue] = useState('');

  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // console.log(ref.current?.selectionStart);
  });

  return <TextareaAutosize ref={ref} value={value} onChange={(e) => setValue(e.target.value)} />;
};
