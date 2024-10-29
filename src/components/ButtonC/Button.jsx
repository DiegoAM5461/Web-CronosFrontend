import "./Button.css";

export const Button = ({ title, className, onClick }) => {
  return (
    <div className="button-submit">
      <button type="submit" className={className} onClick={onClick}>
        {title}
      </button>
    </div>
  );
};
