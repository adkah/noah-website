const videos = document.querySelectorAll<HTMLVideoElement>("video[data-src]");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      const video = entry.target as HTMLVideoElement;
      video.src = video.dataset.src ?? "";
      video.load();
      void video.play().catch(() => undefined);
      observer.unobserve(video);
    }
  }, { rootMargin: "200px 0px" });

  videos.forEach((video) => observer.observe(video));
} else {
  videos.forEach((video) => {
    video.src = video.dataset.src ?? "";
  });
}
