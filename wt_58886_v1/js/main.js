document.querySelectorAll(".post").forEach(post => {
	const postId = post.dataset.postId;
	const ratings = post.querySelectorAll(".post-rating");
	const likeRating = ratings[0];

	ratings.forEach(rating => {
		const button = rating.querySelector(".post-rating-button");
		const count = rating.querySelector(".post-rating-count");

		button.addEventListener("click", async () => {
			if (rating.classList.contains("post-rating-selected")) {
				return;
			}

			count.textContent = Number(count.textContent) + 1;

			ratings.forEach(rating => {
				if (rating.classList.contains("post-rating-selected")) {
					const count = rating.querySelector(".post-rating-count");

					count.textContent = Math.max(0, Number(count.textContent) - 1);
					rating.classList.remove("post-rating-selected");
				}
			});

			rating.classList.add("post-rating-selected");

			const likeOrDislike = likeRating === rating ? "like" : "dislike";
			const response = await fetch(`/posts/${postId}/${likeOrDislike}`);
			const body = await response.json();
		});
	});
});
const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
