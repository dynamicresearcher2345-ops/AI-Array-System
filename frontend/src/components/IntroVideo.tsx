export default function IntroVideo() {
  return (
    <div className="video-shell" aria-label="Damru AI introduction preview">
      <div className="video-surface">
        <div className="video-topline">Introductory Presentation</div>
        <div className="video-glow" />
        <button className="play-button" type="button" aria-label="Play intro video">
          <span>▶</span>
        </button>
        <div className="video-meta">
          <span>Damru AI Systems</span>
          <strong>Unified intelligence • research • automation</strong>
        </div>
      </div>
    </div>
  );
}
