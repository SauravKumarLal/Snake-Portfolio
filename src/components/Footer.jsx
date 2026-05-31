export default function Footer() {
  return (
    <footer id="contact" className="footer">
      <div className="footer-inner">
        <p className="section-label">/Contact</p>
        <h2 className="footer-heading">Let's build something.</h2>
        <div className="footer-links">
          <a href="mailto:sauravkrlal@gmail.com" className="footer-link">
            Email
          </a>
          <a
            href="https://linkedin.com/in/sauravkrlal"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/SauravKumarLal"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub
          </a>
          <a
            href="https://leetcode.com/sauravkrlal/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            LeetCode
          </a>
        </div>
        <p className="footer-copy">© 2026 Saurav Kumar Lal</p>
      </div>
    </footer>
  );
}
