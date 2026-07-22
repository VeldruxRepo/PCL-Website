import { useMemo, useState } from "react";

import data from "../data/site-content.json";
import { Arrow } from "../components/ui/Arrow";
import { Container } from "../components/ui/Container";

const reviewFilters = ["All", "Results", "CRO", "Design", "Development", "Quality", "Team", "Speed"];

export function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleReviews = useMemo(
    () =>
      activeFilter === "All"
        ? data.reviewsPage
        : data.reviewsPage.filter((review) => review.category === activeFilter),
    [activeFilter],
  );

  return (
    <main className="reviews-page">
      <section className="reviews-hero">
        <Container>
          <p className="eyebrow">FOUNDER REVIEWS</p>
          <h1>Founders on the work after the click.</h1>
          <p>
            Real growth does not come from prettier pages alone. It comes from clearer offers,
            stronger proof, faster journeys, and post-click systems built around customer intent.
          </p>

          <div className="review-filters" aria-label="Review categories">
            {reviewFilters.map((filter) => (
              <button
                className={activeFilter === filter ? "is-active" : ""}
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="reviews-wall">
        <Container>
          <div className="review-grid">
            {visibleReviews.map((review) => (
              <article className="review-card" key={`${review.name}-${review.category}`}>
                <div className="review-stars" aria-label="Five star review">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <blockquote>“{review.quote}”</blockquote>
                <div className="review-card__footer">
                  <strong>{review.name}</strong>
                  <span>{review.category}</span>
                </div>
                <p>{review.result}</p>
              </article>
            ))}
          </div>

          <div className="reviews-page__cta">
            <a className="button button--dark" href="#contact">
              Start a post-click project <Arrow />
            </a>
            <a className="button button--secondary" href="/">
              Back to homepage <Arrow />
            </a>
          </div>
        </Container>
      </section>
    </main>
  );
}
