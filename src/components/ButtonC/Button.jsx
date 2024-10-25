import "./Button.css";

export const Button = ({ title, className, ...props }) => {
  return (
    <div className="button-submit">
      <button type="submit" className={`button ${className}`} {...props}>
        {title}
      </button>
    </div>
  );
};
