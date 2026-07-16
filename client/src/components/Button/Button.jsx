import { Link } from "react-router-dom";
import "./_button.scss";

const EXTERNAL_RE = /^(https?:|mailto:|tel:)/;

const Button = ({
  children,
  variant = "primary", // 'primary' | 'outline' | 'ghost'
  size = "md", // 'sm' | 'md' | 'lg'
  href,
  onClick,
  className = "",
  ...rest
}) => {
  // Callers may pass a full class string (e.g. "btn md primary"); otherwise
  // build one from the variant/size props.
  const cls = className.trim()
    ? `btn ${className}`
    : `btn ${variant} ${size}`;

  if (href) {
    // External links and same-page anchors use a plain <a>;
    // internal routes use the router Link to avoid full page reloads.
    if (EXTERNAL_RE.test(href) || href.startsWith("#")) {
      return (
        <a href={href} className={cls} onClick={onClick} {...rest}>
          {children}
        </a>
      );
    }
    const to = href.startsWith("/") ? href : `/${href}`;
    return (
      <Link to={to} className={cls} onClick={onClick} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
