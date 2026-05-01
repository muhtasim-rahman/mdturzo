// ================================================
// pages/contact.js
// ================================================
import { contactFormHTML, updateContactAuth } from './home.js';
import { initContactForm }                    from '../js/contact-form.js';
import { onUser }                             from '../js/auth.js';

export function renderPage() {
  return `
<div class="page-wrap">
  <section class="section contact-section">
    <div class="container">
      <div style="margin-bottom:3rem" data-aos>
        <span class="section-label">// get_in_touch</span>
        <h1 class="section-title">Let's <span>Connect</span></h1>
        <div class="divider"></div>
        <p class="section-sub">Have a project idea? Want to collaborate? Drop me a message.</p>
      </div>

      <div class="contact-layout">
        <!-- Info -->
        <div class="contact-info" data-aos="slide-left">
          <div>
            <h3 style="font-size:1.05rem;margin-bottom:.6rem">Ready to work together?</h3>
            <p style="font-size:.9rem;color:var(--text-muted);line-height:1.8">
              I'm open to freelance projects, collaborations, and learning opportunities.
              All work done with honesty, quality, and Halal ethics. In sha Allah.
            </p>
          </div>
          <div class="contact-links">
            ${[
              ['mailto:mdturzo.dev@gmail.com','ri-mail-line','Email (Primary)','mdturzo.dev@gmail.com'],
              ['https://github.com/muhtasim-rahman','ri-github-fill','GitHub','muhtasim-rahman'],
              ['https://linkedin.com/in/mdturzo999','ri-linkedin-fill','LinkedIn','mdturzo999'],
              ['https://facebook.com/mdturzo999','ri-facebook-fill','Facebook','mdturzo999'],
              ['https://t.me/mdturzo16','ri-telegram-fill','Telegram','@mdturzo16'],
              ['https://instagram.com/mdturzo999','ri-instagram-line','Instagram','mdturzo999'],
            ].map(([href,ico,lbl,val])=>`
              <a href="${href}" class="clink" target="_blank" rel="noopener">
                <div class="clink-icon"><i class="${ico}"></i></div>
                <div><p class="clink-label">${lbl}</p><p class="clink-val">${val}</p></div>
                <i class="ri-external-link-line clink-arrow"></i>
              </a>`).join('')}
          </div>
        </div>

        <!-- Form (reuse from home) -->
        ${contactFormHTML()}
      </div>
    </div>
  </section>
</div>`;
}

export function initPage() {
  initContactForm();
  onUser(updateContactAuth);
}
