import classNames from 'classnames';

export default function FileDragAndDrop({
  cssClasses = '',
  onUpdateBackground
}: {
  cssClasses?: string;
  onUpdateBackground?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={classNames('flex items-center justify-center', cssClasses)}>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col p-2 items-center justify-center rounded-lg cursor-pointer bg-[rgba(226,232,240,0.4)]"
      >
        <div className="flex items-center justify-center gap-2">
          <svg
            className="w-6 h-6 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p>Upload image</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={() => onUpdateBackground?.(true)}
        />
      </label>
    </div>
  );
}
